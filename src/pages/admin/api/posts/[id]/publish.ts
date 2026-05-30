import type { APIRoute } from "astro";
import { dbExecute } from "@/admin/lib/db";
import { verifyJwt, AUTH_COOKIE_NAME } from "@/admin/lib/auth";
import { getFileSha, commitFile } from "@/admin/lib/github";
import { generateMarkdown } from "@/admin/lib/markdown-generator";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const token = context.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const session = await verifyJwt(token);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { id } = context.params;
    if (!id) {
      return new Response(JSON.stringify({ error: "Post ID is required" }), { status: 400 });
    }

    // Parse body for 'force' flag
    let force = false;
    try {
      const body = await context.request.json();
      force = body.force === true;
    } catch (e) {
      // ignore parsing error if empty
    }

    // Get post
    const postRes = await dbExecute(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    if (postRes.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    const post = postRes.rows[0];
    const slug = post.slug as string;

    // Get translations
    const transRes = await dbExecute(
      "SELECT * FROM post_translations WHERE post_id = ?",
      [id]
    );

    if (transRes.rows.length === 0) {
      return new Response(JSON.stringify({ error: "No translations found to publish" }), { status: 400 });
    }

    const savedShas = post.git_sha ? JSON.parse(post.git_sha as string) : {};
    const newShas: Record<string, string> = { ...savedShas };
    const conflicts: string[] = [];

    // 1. First Pass: Check for SHA conflicts
    const publishTasks = [];

    for (const row of transRes.rows) {
      const lang = row.lang as string;
      const title = row.title as string || "";
      const bodyMd = row.body_md as string || "";

      // 빈 내용(작성되지 않은 번역)은 GitHub에 빈 파일로 배포하지 않도록 건너뜁니다.
      if (!title.trim() && !bodyMd.trim()) {
        continue;
      }

      const frontmatterStr = row.frontmatter as string || "{}";
      const frontmatter = JSON.parse(frontmatterStr);
      
      // Override standard frontmatter fields from post
      frontmatter.slug = slug;
      frontmatter.category = post.category;
      frontmatter.tags = typeof post.tags === "string" ? JSON.parse(post.tags) : [];
      frontmatter.author = post.author;
      
      const markdown = generateMarkdown(frontmatter, row.body_md as string);
      const path = `src/data/blog/${lang}/${slug}.mdx`;

      const currentSha = await getFileSha(path);
      const expectedSha = savedShas[lang];

      if (!force && currentSha && expectedSha && currentSha !== expectedSha) {
        conflicts.push(lang);
      }

      publishTasks.push({
        lang,
        path,
        markdown,
        currentSha
      });
    }

    // If conflicts exist and not forcing, return 409
    if (conflicts.length > 0) {
      return new Response(JSON.stringify({
        error: "Conflict detected",
        conflicts
      }), { status: 409 });
    }

    // 2. Second Pass: Publish
    for (const task of publishTasks) {
      const message = `docs(blog): publish ${slug} (${task.lang}) via CMS`;
      const result = await commitFile(task.path, task.markdown, message, task.currentSha || undefined);
      newShas[task.lang] = result.contentSha;
    }

    // Update status and shas
    await dbExecute(
      "UPDATE posts SET status = 'published', git_sha = ?, updated_at = datetime('now') WHERE id = ?",
      [JSON.stringify(newShas), id]
    );

    // Audit log
    await dbExecute(
      "INSERT INTO audit_log (user_email, action, target, ip, user_agent) VALUES (?, ?, ?, ?, ?)",
      [session.sub || "unknown", "publish", slug, context.clientAddress || "", context.request.headers.get("user-agent") || ""]
    );

    return new Response(JSON.stringify({ success: true, shas: newShas }), { status: 200 });
  } catch (error: any) {
    console.error("Publish error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
