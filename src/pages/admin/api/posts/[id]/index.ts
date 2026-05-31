import type { APIRoute } from "astro";
import { dbExecute, dbBatch } from "@/admin/lib/db";
import { updatePostSchema } from "@/admin/schemas/api-schemas";
import { checkRateLimit, isCsrfAttack, rateLimitResponse, csrfErrorResponse, getClientIp, RATE_LIMITS } from "@/admin/lib/security";

export const prerender = false;

// GET /admin/api/posts/:id/
export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "포스트 ID가 누락되었습니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1. posts 조회
    const postRes = await dbExecute("SELECT * FROM posts WHERE id = ?", [id]);
    if (postRes.rows.length === 0) {
      return new Response(JSON.stringify({ error: "포스트를 찾을 수 없습니다." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const post = postRes.rows[0];

    // 2. Translations 조회
    const transRes = await dbExecute("SELECT * FROM post_translations WHERE post_id = ?", [id]);
    
    const translations: Record<string, any> = {};
    for (const row of transRes.rows) {
      translations[row.lang as string] = {
        id: row.id,
        title: row.title,
        body_md: row.body_md,
        frontmatter: JSON.parse((row.frontmatter as string) || "{}"),
        updated_at: row.updated_at,
      };
    }

    const merged = {
      id: post.id,
      slug: post.slug,
      category: post.category,
      tags: JSON.parse((post.tags as string) || "[]"),
      status: post.status,
      author: post.author,
      git_sha: post.git_sha || null,
      created_at: post.created_at,
      updated_at: post.updated_at,
      translations,
    };

    return new Response(JSON.stringify(merged), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("GET /admin/api/posts/[id] 에러:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// PUT /admin/api/posts/:id/
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    if (isCsrfAttack(request)) return csrfErrorResponse();
    
    const ip = getClientIp(request);
    if (checkRateLimit(`posts_${ip}`, RATE_LIMITS.posts)) {
      return rateLimitResponse();
    }

    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "포스트 ID가 누락되었습니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    const result = updatePostSchema.safeParse(body);
    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error.format() }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { slug, category, tags, status, lang, title, body_md } = result.data;

    // posts 존재 여부 확인
    const checkPost = await dbExecute("SELECT * FROM posts WHERE id = ?", [id]);
    if (checkPost.rows.length === 0) {
      return new Response(JSON.stringify({ error: "포스트를 찾을 수 없습니다." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // slug 중복 검사 (본인 제외)
    const checkSlug = await dbExecute("SELECT id FROM posts WHERE slug = ? AND id != ?", [slug, id]);
    if (checkSlug.rows.length > 0) {
      return new Response(JSON.stringify({ error: "이미 다른 포스트에서 사용 중인 slug입니다." }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    // translations 테이블에서 해당 lang의 기존 내용 조회 (revision_history 스냅샷 백업용)
    const checkTrans = await dbExecute("SELECT id, body_md FROM post_translations WHERE post_id = ? AND lang = ?", [id, lang]);
    let translationId = "";
    let prevBodyMd = "";

    if (checkTrans.rows.length > 0) {
      translationId = checkTrans.rows[0].id as string;
      prevBodyMd = (checkTrans.rows[0].body_md as string) || "";
    }

    const now = new Date().toISOString();
    const statements = [];

    // 1. posts 테이블 업데이트
    statements.push({
      sql: `UPDATE posts 
            SET slug = ?, category = ?, tags = ?, status = ?, updated_at = ?
            WHERE id = ?`,
      args: [slug, category, JSON.stringify(tags), status, now, id],
    });

    // 2. post_translations 테이블 업데이트
    if (translationId) {
      statements.push({
        sql: `UPDATE post_translations
              SET title = ?, body_md = ?, updated_at = ?
              WHERE id = ?`,
        args: [title, body_md, now, translationId],
      });

      // 3. 세션 2-C: 마크다운 내용 변경 감지 시 revision_history 백업 추가
      // (단, 빈 콘텐츠에서 최초 저장 시나 아예 바뀐 점이 없을 때는 무분별한 이력 생성을 막기 위해 필터링)
      if (body_md !== prevBodyMd && prevBodyMd.trim() !== "") {
        statements.push({
          sql: `INSERT INTO revision_history (translation_id, body_md_snapshot, edited_by, created_at)
                VALUES (?, ?, 'admin-cms', ?)`,
          args: [translationId, prevBodyMd, now],
        });
      }
    } else {
      // 혹시 번역 데이터가 유실되었거나 없는 경우 신규 생성
      statements.push({
        sql: `INSERT INTO post_translations (post_id, lang, title, body_md, frontmatter, updated_at)
              VALUES (?, ?, ?, ?, '{}', ?)`,
        args: [id, lang, title, body_md, now],
      });
    }

    await dbBatch(statements);

    return new Response(
      JSON.stringify({
        success: true,
        message: "성공적으로 저장되었습니다.",
        updated_at: now,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("PUT /admin/api/posts/[id] 에러:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// DELETE /admin/api/posts/:id/
export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "포스트 ID가 누락되었습니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 포스트 존재 여부 확인
    const checkPost = await dbExecute("SELECT id FROM posts WHERE id = ?", [id]);
    if (checkPost.rows.length === 0) {
      return new Response(JSON.stringify({ error: "포스트를 찾을 수 없습니다." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // DB 관계 정리: post_memos.source_post_id → NULL (ON DELETE 지시어 없음)
    await dbBatch([
      {
        sql: "UPDATE post_memos SET source_post_id = NULL WHERE source_post_id = ?",
        args: [id],
      },
      {
        // revision_history는 post_translations 참조 → 먼저 삭제
        sql: "DELETE FROM revision_history WHERE translation_id IN (SELECT id FROM post_translations WHERE post_id = ?)",
        args: [id],
      },
      {
        sql: "DELETE FROM post_translations WHERE post_id = ?",
        args: [id],
      },
      {
        sql: "DELETE FROM posts WHERE id = ?",
        args: [id],
      },
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("DELETE /admin/api/posts/[id] 에러:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
