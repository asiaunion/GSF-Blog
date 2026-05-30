import type { APIRoute } from "astro";
import { dbExecute, dbBatch } from "@/admin/lib/db";
import { verifyJwt, AUTH_COOKIE_NAME } from "@/admin/lib/auth";
import { getBlogFileContent, getFileSha } from "@/admin/lib/github";

export const prerender = false;

// Frontmatter 파싱 헬퍼 함수
function parseMarkdown(markdown: string) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: markdown };
  
  const fmText = match[1];
  const body = match[2];
  
  const frontmatter: Record<string, any> = {};
  const titleMatch = fmText.match(/title:\s*['"]?(.*?)['"]?$/m);
  if (titleMatch) {
    frontmatter.title = titleMatch[1];
  }
  const categoryMatch = fmText.match(/category:\s*['"]?(.*?)['"]?$/m);
  if (categoryMatch) {
    frontmatter.category = categoryMatch[1];
  }
  const tagsMatch = fmText.match(/tags:\s*\[(.*?)\]/m);
  if (tagsMatch) {
    frontmatter.tags = tagsMatch[1].split(',').map(s => s.replace(/['"]/g, '').trim());
  }

  return { frontmatter, body: body.trim() };
}

export const POST: APIRoute = async (context) => {
  try {
    const token = context.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const session = await verifyJwt(token);
    if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const slug = context.params.id; // slug is passed as id
    if (!slug) return new Response(JSON.stringify({ error: "Post slug is required" }), { status: 400 });

    const langs = ["ko", "en", "ja"];
    const foundLangs: string[] = [];
    const contents: Record<string, { frontmatter: any, body: string, sha: string }> = {};

    for (const lang of langs) {
      for (const ext of [".mdx", ".md"]) {
        const path = `src/data/blog/${lang}/${slug}${ext}`;
        const sha = await getFileSha(path);
        if (sha) {
          const raw = await getBlogFileContent(path);
          contents[lang] = { ...parseMarkdown(raw), sha };
          foundLangs.push(lang);
          break;
        }
      }
    }

    if (foundLangs.length === 0) {
      return new Response(JSON.stringify({ error: "GitHub에서 해당 포스트를 찾을 수 없습니다." }), { status: 404 });
    }

    // Check if post exists in DB
    const checkPost = await dbExecute("SELECT id FROM posts WHERE slug = ?", [slug]);
    let postId = "";
    
    const now = new Date().toISOString();
    const statements = [];

    const gitShas: Record<string, string> = {};
    for (const l of foundLangs) gitShas[l] = contents[l].sha;
    const author = session.name || "satoru";
    const category = contents.ko?.frontmatter.category || "investment";
    const tags = contents.ko?.frontmatter.tags || [];

    if (checkPost.rows.length > 0) {
      postId = checkPost.rows[0].id as string;
      statements.push({
        sql: `UPDATE posts SET git_sha = ?, status = 'draft', updated_at = ? WHERE id = ?`,
        args: [JSON.stringify(gitShas), now, postId]
      });
    } else {
      postId = Math.random().toString(36).substring(2, 10);
      statements.push({
        sql: `INSERT INTO posts (id, slug, category, tags, status, author, git_sha, created_at, updated_at)
              VALUES (?, ?, ?, ?, 'draft', ?, ?, ?, ?)`,
        args: [postId, slug, category, JSON.stringify(tags), author, JSON.stringify(gitShas), now, now]
      });
    }

    // Insert or update translations
    for (const lang of langs) {
      if (foundLangs.includes(lang)) {
        const title = contents[lang].frontmatter.title || slug;
        const bodyMd = contents[lang].body;
        
        // check if translation exists
        const checkTrans = await dbExecute("SELECT id FROM post_translations WHERE post_id = ? AND lang = ?", [postId, lang]);
        if (checkTrans.rows.length > 0) {
          statements.push({
            sql: `UPDATE post_translations SET title = ?, body_md = ?, updated_at = ? WHERE post_id = ? AND lang = ?`,
            args: [title, bodyMd, now, postId, lang]
          });
        } else {
          statements.push({
            sql: `INSERT INTO post_translations (post_id, lang, title, body_md, frontmatter, updated_at) VALUES (?, ?, ?, ?, '{}', ?)`,
            args: [postId, lang, title, bodyMd, now]
          });
        }
      } else {
        // ensure empty translation exists
        const checkTrans = await dbExecute("SELECT id FROM post_translations WHERE post_id = ? AND lang = ?", [postId, lang]);
        if (checkTrans.rows.length === 0) {
          statements.push({
            sql: `INSERT INTO post_translations (post_id, lang, title, body_md, frontmatter, updated_at) VALUES (?, ?, '', '', '{}', ?)`,
            args: [postId, lang, now]
          });
        }
      }
    }

    await dbBatch(statements);

    // Audit log
    await dbExecute(
      "INSERT INTO audit_log (user_email, action, target, ip, user_agent) VALUES (?, ?, ?, ?, ?)",
      [session.sub || "unknown", "import", slug, context.clientAddress || "", context.request.headers.get("user-agent") || ""]
    );

    return new Response(JSON.stringify({ success: true, id: postId }), { status: 200 });

  } catch (error: any) {
    console.error("Import error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
