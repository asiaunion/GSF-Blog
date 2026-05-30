import type { APIRoute } from "astro";
import { dbExecute, dbBatch } from "@/admin/lib/db";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse, getClientIp } from "@/admin/lib/security";
import { BlogAgentOrchestrator } from "@/lib/agent-workflow/orchestrator";
import { splitFrontmatter } from "@/lib/content-engine/generator";

export const prerender = false;

// POST /admin/api/memos/[id]/expand
export const POST: APIRoute = async ({ request, params, locals }) => {
  try {
    const memoId = params.id;
    if (!memoId) {
      return new Response(JSON.stringify({ error: "메모 ID가 필요합니다." }), { status: 400 });
    }

    // Rate Limiting 검사 (10회/분)
    const ip = getClientIp(request);
    if (checkRateLimit(`expand_${ip}`, RATE_LIMITS.expand)) {
      return rateLimitResponse();
    }

    // 1. 메모 내용 조회
    const memoResult = await dbExecute(`SELECT * FROM post_memos WHERE id = ?`, [memoId]);
    if (memoResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: "해당 메모를 찾을 수 없습니다." }), { status: 404 });
    }
    const memo = memoResult.rows[0];

    // 이미 확장된 메모인지 확인
    if (memo.status === "expanded") {
      return new Response(JSON.stringify({ error: "이미 살붙이기가 완료된 메모입니다." }), { status: 400 });
    }

    const rawMemo = memo.content as string;
    const keyword = rawMemo.substring(0, 30).replace(/\n/g, " ") + (rawMemo.length > 30 ? "..." : "");

    // 2. AG 워크플로우 호출
    const orchestrator = new BlogAgentOrchestrator();
    
    // start (research) -> memo -> draft_v1
    const state1 = await orchestrator.start(keyword);
    await orchestrator.addMemo(state1.workflowId, rawMemo);
    const state2 = await orchestrator.generateDraftV1(state1.workflowId);

    const draftOut = state2.outputs.DRAFT_V1 as any;
    if (!draftOut || !draftOut.koMarkdown) {
      throw new Error("AG가 초안을 생성하지 못했습니다.");
    }

    const koMarkdown = draftOut.koMarkdown;

    // 3. 마크다운에서 프론트매터 파싱하여 제목, 슬러그 추출
    const { frontmatter, body } = splitFrontmatter(koMarkdown);
    const title = frontmatter?.title || "새로 생성된 포스트";
    // slug가 없으면 id로 대체 (차후 편집 시 수정 가능하도록)
    const slugBase = (frontmatter?.slug || keyword.replace(/[^a-zA-Z0-9가-힣]/g, "-").toLowerCase()).substring(0, 50);
    const postId = Math.random().toString(36).substring(2, 10);
    const slug = `${slugBase}-${postId}`.replace(/-+/g, "-").replace(/^-|-$/g, "");
    
    const user = (locals as any).user;
    const author = user?.name || "satoru";
    const now = new Date().toISOString();

    // 4. DB에 포스트 및 번역 레코드 삽입, 메모 상태 업데이트
    await dbBatch([
      {
        sql: `INSERT INTO posts (id, slug, category, tags, status, author, created_at, updated_at)
              VALUES (?, ?, ?, '[]', 'draft', ?, ?, ?)`,
        args: [postId, slug, "essay", author, now, now], // 기본 카테고리 essay
      },
      {
        sql: `INSERT INTO post_translations (post_id, lang, title, body_md, frontmatter, updated_at)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [postId, "ko", title, body, JSON.stringify(frontmatter), now],
      },
      ...["en", "ja"].map((l) => ({
        sql: `INSERT INTO post_translations (post_id, lang, title, body_md, frontmatter, updated_at)
              VALUES (?, ?, '', '', '{}', ?)`,
        args: [postId, l, now],
      })),
      {
        sql: `UPDATE post_memos SET status = 'expanded' WHERE id = ?`,
        args: [memoId],
      }
    ]);

    return new Response(JSON.stringify({ postId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("POST /admin/api/memos/[id]/expand 에러:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
