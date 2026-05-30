import type { APIRoute } from "astro";
import { getBlogFiles } from "@/admin/lib/github";
import { dbExecute, dbBatch } from "@/admin/lib/db";
import { createPostSchema } from "@/admin/schemas/api-schemas";

export const prerender = false;

// GET /admin/api/posts/
export const GET: APIRoute = async ({ request, locals }) => {
  try {
    // 1. Turso DB에서 posts와 translations 조회
    const dbResult = await dbExecute(`
      SELECT p.id, p.slug, p.category, p.tags, p.status, p.author, p.git_sha, p.created_at, p.updated_at,
             t.lang, t.title
      FROM posts p
      LEFT JOIN post_translations t ON p.id = t.post_id
    `);

    // posts 데이터를 그룹핑
    const postsMap = new Map<string, any>();
    for (const row of dbResult.rows) {
      const id = row.id as string;
      if (!postsMap.has(id)) {
        postsMap.set(id, {
          id,
          slug: row.slug as string,
          category: row.category as string,
          tags: JSON.parse((row.tags as string) || "[]"),
          status: row.status as string,
          author: row.author as string,
          git_sha: (row.git_sha as string) || null,
          created_at: row.created_at as string,
          updated_at: row.updated_at as string,
          translations: {},
        });
      }

      if (row.lang) {
        postsMap.get(id).translations[row.lang as string] = {
          title: row.title as string,
        };
      }
    }

    // 2. GitHub API를 통해 Git의 실제 파일 목록 조회
    let gitFiles: any[] = [];
    try {
      gitFiles = await getBlogFiles();
    } catch (gitError) {
      console.error("GitHub 파일 목록 조회 실패:", gitError);
      // GitHub API가 실패하더라도 DB 데이터는 노출할 수 있도록 함
    }

    // Git 파일 분류: slug별로 묶어서 어떤 언어 버전이 있는지, SHA가 무엇인지 매핑
    // Git 파일 경로 형식: src/data/blog/{lang}/{slug}.md 또는 src/data/blog/{lang}/{slug}.mdx
    const gitPostsMap = new Map<string, { sha: Record<string, string>; path: Record<string, string>; langs: string[] }>();
    
    for (const file of gitFiles) {
      const match = file.path.match(/^src\/data\/blog\/([a-z]{2})\/([^/]+)\.(md|mdx)$/);
      if (match) {
        const lang = match[1];
        const slug = match[2];
        
        if (!gitPostsMap.has(slug)) {
          gitPostsMap.set(slug, { sha: {}, path: {}, langs: [] });
        }
        
        const gitInfo = gitPostsMap.get(slug)!;
        gitInfo.sha[lang] = file.sha;
        gitInfo.path[lang] = file.path;
        gitInfo.langs.push(lang);
      }
    }

    // 3. DB 데이터와 Git 데이터를 병합
    const mergedList: any[] = [];
    const processedDbSlugs = new Set<string>();

    // DB에 있는 포스트 처리
    for (const [id, post] of postsMap.entries()) {
      processedDbSlugs.add(post.slug);
      
      const gitInfo = gitPostsMap.get(post.slug);
      if (gitInfo) {
        // DB에도 있고 Git에도 있는 경우
        // 대표 타이틀 결정 (기본값 ko -> en -> ja 순)
        const displayTitle = post.translations.ko?.title || post.translations.en?.title || post.translations.ja?.title || post.slug;
        
        // 대표 git_sha가 Git의 ko 버전 sha와 일치하는지 판단 (한국어 정본 기준)
        const isSynced = post.git_sha === (gitInfo.sha.ko || gitInfo.sha.en || gitInfo.sha.ja || null);
        
        mergedList.push({
          ...post,
          displayTitle,
          isDbOnly: false,
          isGitOnly: false,
          gitLangs: gitInfo.langs,
          gitShas: gitInfo.sha,
          isSynced,
        });
      } else {
        // DB에만 있고 Git에는 없는 경우 [DB 드래프트]
        const displayTitle = post.translations.ko?.title || post.translations.en?.title || post.translations.ja?.title || post.slug;
        mergedList.push({
          ...post,
          displayTitle,
          isDbOnly: true,
          isGitOnly: false,
          gitLangs: [],
          gitShas: {},
          isSynced: false,
        });
      }
    }

    // Git에만 있고 DB에는 없는 포스트 처리
    for (const [slug, gitInfo] of gitPostsMap.entries()) {
      if (!processedDbSlugs.has(slug)) {
        // Git에만 있는 순수 발행 글
        mergedList.push({
          id: `git-${slug}`,
          slug,
          category: "investment", // 임시 디폴트
          tags: [],
          status: "published",
          author: "satoru",
          git_sha: gitInfo.sha.ko || gitInfo.sha.en || gitInfo.sha.ja || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          translations: {},
          displayTitle: slug,
          isDbOnly: false,
          isGitOnly: true,
          gitLangs: gitInfo.langs,
          gitShas: gitInfo.sha,
          isSynced: true,
        });
      }
    }

    // 최신 생성순 정렬 (ID 또는 created_at 기준)
    mergedList.sort((a, b) => b.created_at.localeCompare(a.created_at));

    return new Response(JSON.stringify(mergedList), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("GET /admin/api/posts 에러:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// POST /admin/api/posts/
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const user = (locals as any).user;
    const author = user?.name || "satoru";
    const body = await request.json();

    const result = createPostSchema.safeParse(body);
    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error.format() }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { slug, category, title, lang } = result.data;

    // slug 중복 검사
    const checkDup = await dbExecute("SELECT id FROM posts WHERE slug = ?", [slug]);
    if (checkDup.rows.length > 0) {
      return new Response(JSON.stringify({ error: "이미 존재하는 포스트 slug입니다." }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const postId = Math.random().toString(36).substring(2, 10); // 8자리 랜덤 ID 생성 (SQLite randomblob 8바이트 매핑 대용)
    const now = new Date().toISOString();

    // posts 및 translations 데이터 원자적 배치 삽입
    await dbBatch([
      {
        sql: `INSERT INTO posts (id, slug, category, tags, status, author, created_at, updated_at)
              VALUES (?, ?, ?, '[]', 'draft', ?, ?, ?)`,
        args: [postId, slug, category, author, now, now],
      },
      {
        sql: `INSERT INTO post_translations (post_id, lang, title, body_md, frontmatter, updated_at)
              VALUES (?, ?, ?, '', '{}', ?)`,
        args: [postId, lang, title, now],
      },
      // 다른 지원 언어들도 빈 레코드로 채워 초기화
      ...["ko", "en", "ja"]
        .filter((l) => l !== lang)
        .map((l) => ({
          sql: `INSERT INTO post_translations (post_id, lang, title, body_md, frontmatter, updated_at)
                VALUES (?, ?, '', '', '{}', ?)`,
          args: [postId, l, now],
        })),
    ]);

    return new Response(
      JSON.stringify({
        id: postId,
        slug,
        category,
        status: "draft",
        created_at: now,
        updated_at: now,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("POST /admin/api/posts 에러:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
