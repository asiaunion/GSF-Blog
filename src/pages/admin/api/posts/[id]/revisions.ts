import type { APIRoute } from "astro";
import { dbExecute } from "@/admin/lib/db";

export const prerender = false;

// GET /admin/api/posts/:id/revisions/
export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "포스트 ID가 누락되었습니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // post_translations를 조인하여 해당 포스트에 연동된 모든 언어의 수정 이력을 조회
    const result = await dbExecute(
      `SELECT rh.id, rh.translation_id, rh.body_md_snapshot, rh.edited_by, rh.created_at
       FROM revision_history rh
       JOIN post_translations pt ON rh.translation_id = pt.id
       WHERE pt.post_id = ?
       ORDER BY rh.created_at DESC`,
      [id]
    );

    // 반환 데이터 포맷팅
    const revisions = result.rows.map((row) => ({
      id: row.id,
      translation_id: row.translation_id,
      body_md_snapshot: row.body_md_snapshot,
      edited_by: row.edited_by,
      created_at: row.created_at,
    }));

    return new Response(JSON.stringify(revisions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("GET /admin/api/posts/[id]/revisions 에러:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
