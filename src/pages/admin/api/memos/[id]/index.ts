import type { APIRoute } from "astro";
import { dbExecute } from "@/admin/lib/db";
import { checkRateLimit, isCsrfAttack, rateLimitResponse, csrfErrorResponse, getClientIp, RATE_LIMITS } from "@/admin/lib/security";

export const prerender = false;

// PUT /admin/api/memos/[id]/ — 메모 내용 수정
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    if (isCsrfAttack(request)) return csrfErrorResponse();

    const ip = getClientIp(request);
    if (checkRateLimit(`memos_${ip}`, RATE_LIMITS.posts)) {
      return rateLimitResponse();
    }

    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "메모 ID가 누락되었습니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    const content = (body.content as string | undefined)?.trim();
    if (!content) {
      return new Response(JSON.stringify({ error: "내용이 비어 있습니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 메모 존재 여부 확인
    const check = await dbExecute("SELECT id FROM post_memos WHERE id = ?", [id]);
    if (check.rows.length === 0) {
      return new Response(JSON.stringify({ error: "해당 메모를 찾을 수 없습니다." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await dbExecute("UPDATE post_memos SET content = ? WHERE id = ?", [content, id]);

    return new Response(JSON.stringify({ success: true, id, content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("PUT /admin/api/memos/[id] 에러:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// DELETE /admin/api/memos/[id]/ — 메모 삭제
export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: "메모 ID가 누락되었습니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 메모 존재 여부 확인
    const check = await dbExecute("SELECT id FROM post_memos WHERE id = ?", [id]);
    if (check.rows.length === 0) {
      return new Response(JSON.stringify({ error: "해당 메모를 찾을 수 없습니다." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await dbExecute("DELETE FROM post_memos WHERE id = ?", [id]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("DELETE /admin/api/memos/[id] 에러:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
