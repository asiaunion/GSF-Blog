import type { APIRoute } from "astro";
import { BlogAgentOrchestrator } from "@/lib/agent-workflow/orchestrator";

export const prerender = false;

const orchestrator = new BlogAgentOrchestrator();

type WorkflowAction =
  | "start"
  | "approve"
  | "memo"
  | "draft_v1"
  | "ko_final"
  | "translate"
  | "sync_ko_draft"
  | "sync_translations"
  | "prepare_publish"
  | "apply_publish"
  | "get";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as {
      action: WorkflowAction;
      workflowId?: string;
      keyword?: string;
      memo?: string;
      koMarkdown?: string;
      enMarkdown?: string;
      jaMarkdown?: string;
      extraSearchNotes?: string;
      gate?: "research" | "draft_v1" | "ko_final" | "translations" | "publish";
      token?: string;
      approver?: string;
    };
    const { action } = body;

    if (action === "start") {
      const state = await orchestrator.start(String(body.keyword ?? ""));
      return new Response(JSON.stringify({ ok: true, state }), { status: 200 });
    }

    if (!body.workflowId) {
      return new Response(JSON.stringify({ ok: false, error: "workflowId is required" }), {
        status: 400,
      });
    }

    if (action === "approve") {
      const state = await orchestrator.approve(body.workflowId, {
        gate: body.gate!,
        token: String(body.token ?? ""),
        approver: body.approver,
      });
      return new Response(JSON.stringify({ ok: true, state }), { status: 200 });
    }

    if (action === "memo") {
      const state = await orchestrator.addMemo(body.workflowId, String(body.memo ?? ""));
      return new Response(JSON.stringify({ ok: true, state }), { status: 200 });
    }

    if (action === "draft_v1") {
      const state = await orchestrator.generateDraftV1(body.workflowId);
      return new Response(JSON.stringify({ ok: true, state }), { status: 200 });
    }

    if (action === "ko_final") {
      const state = await orchestrator.generateKoFinal(
        body.workflowId,
        String(body.extraSearchNotes ?? "")
      );
      return new Response(JSON.stringify({ ok: true, state }), { status: 200 });
    }

    if (action === "translate") {
      const state = await orchestrator.generateTranslations(body.workflowId);
      return new Response(JSON.stringify({ ok: true, state }), { status: 200 });
    }

    if (action === "sync_ko_draft") {
      const state = await orchestrator.syncKoMarkdown(
        body.workflowId,
        String(body.koMarkdown ?? "")
      );
      return new Response(JSON.stringify({ ok: true, state }), { status: 200 });
    }

    if (action === "sync_translations") {
      const state = await orchestrator.syncTranslations(
        body.workflowId,
        String(body.enMarkdown ?? ""),
        String(body.jaMarkdown ?? "")
      );
      return new Response(JSON.stringify({ ok: true, state }), { status: 200 });
    }

    if (action === "prepare_publish") {
      const state = await orchestrator.preparePublish(body.workflowId);
      return new Response(JSON.stringify({ ok: true, state }), { status: 200 });
    }

    if (action === "apply_publish") {
      const state = await orchestrator.applyPublish(body.workflowId);
      return new Response(JSON.stringify({ ok: true, state }), { status: 200 });
    }

    if (action === "get") {
      const state = await orchestrator.get(body.workflowId);
      return new Response(JSON.stringify({ ok: true, state }), { status: 200 });
    }

    return new Response(JSON.stringify({ ok: false, error: "unsupported action" }), {
      status: 400,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return new Response(JSON.stringify({ ok: false, error: message }), { status: 500 });
  }
};
