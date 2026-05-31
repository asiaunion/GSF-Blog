/**
 * workers/notion-poller/src/index.ts
 *
 * Cloudflare Worker — Notion DB 폴링 + GitHub Actions dispatch
 *
 * 환경:
 *   - BLOGS_CONFIG (var): JSON 배열, 블로그별 설정 (token 제외)
 *   - NOTION_TOKEN (secret): GSF-Blog Notion Integration Token
 *   - WIFE_NOTION_TOKEN (secret): 아내 블로그 Notion Integration Token
 *   - CF_WORKER_GITHUB_TOKEN (secret): GitHub Fine-grained PAT (actions:write)
 */

export interface Env {
  BLOGS_CONFIG: string;
  NOTION_TOKEN: string;
  WIFE_NOTION_TOKEN?: string;
  CF_WORKER_GITHUB_TOKEN: string;
}

interface BlogConfig {
  id: string;
  notionDatabaseId: string;
  githubRepo: string;
  workflowFile: string;
  imageStorage: "vercel-blob" | "cf-r2";
  domain: string;
}

// ── 상태값 ────────────────────────────────────────────────────────────
const STATUS_PUBLISH_REQUEST = "발행요청";
const STATUS_PROCESSING = "처리중";
const STATUS_PUBLISH_APPROVED = "발행승인";
const STATUS_PUBLISHED = "발행완료";

// ── Notion Token 선택 ─────────────────────────────────────────────────
function getNotionToken(blogId: string, env: Env): string {
  if (blogId === "wife-blog" && env.WIFE_NOTION_TOKEN) {
    return env.WIFE_NOTION_TOKEN;
  }
  return env.NOTION_TOKEN;
}

// ── Notion API 호출 ───────────────────────────────────────────────────
async function notionRequest(
  path: string,
  method: string,
  token: string,
  body?: unknown
): Promise<Response> {
  return fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

// ── Notion DB 쿼리: 특정 status 페이지 목록 ──────────────────────────
async function queryNotionByStatus(
  databaseId: string,
  status: string,
  token: string
): Promise<Array<{ id: string; slug: string; properties: Record<string, any> }>> {
  const res = await notionRequest(
    `/databases/${databaseId}/query`,
    "POST",
    token,
    {
      filter: {
        property: "status",
        select: { equals: status },
      },
      page_size: 10,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error(`Notion DB 쿼리 실패 (${res.status}): ${err}`);
    return [];
  }

  const data = await res.json();
  return (data.results || []).map((page: any) => {
    const slugProp = page.properties?.slug;
    const slug =
      slugProp?.type === "rich_text"
        ? slugProp.rich_text?.[0]?.plain_text || ""
        : "";
    return { id: page.id, slug, properties: page.properties };
  });
}

// ── Notion 페이지 status 업데이트 ────────────────────────────────────
async function updateNotionStatus(
  pageId: string,
  status: string,
  token: string
): Promise<void> {
  const res = await notionRequest(`/pages/${pageId}`, "PATCH", token, {
    properties: {
      status: { select: { name: status } },
    },
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`Notion status 업데이트 실패 (${pageId}): ${err}`);
  }
}

// ── Notion 페이지 코멘트 작성 ────────────────────────────────────────
async function addNotionComment(
  pageId: string,
  message: string,
  token: string
): Promise<void> {
  await notionRequest("/comments", "POST", token, {
    parent: { page_id: pageId },
    rich_text: [{ type: "text", text: { content: message } }],
  });
}

// ── GitHub Actions workflow_dispatch 트리거 ───────────────────────────
async function triggerGitHubWorkflow(
  repo: string,
  workflowFile: string,
  inputs: Record<string, string>,
  githubToken: string
): Promise<boolean> {
  const [owner, repoName] = repo.split("/");
  const url = `https://api.github.com/repos/${owner}/${repoName}/actions/workflows/${workflowFile}/dispatches`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "User-Agent": "gsf-notion-poller/1.0",
    },
    body: JSON.stringify({ ref: "main", inputs }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`GitHub Actions 트리거 실패 (${res.status}): ${err}`);
    return false;
  }

  return true;
}

// ── GitHub PR merge (발행승인 경로) ──────────────────────────────────
async function mergeFeatureBranch(
  repo: string,
  slug: string,
  githubToken: string
): Promise<boolean> {
  const [owner, repoName] = repo.split("/");

  // 1. feature branch 이름 패턴으로 오픈 PR 검색
  const prListRes = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}/pulls?state=open&head=${owner}:notion/publish-${slug}`,
    {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "gsf-notion-poller/1.0",
      },
    }
  );

  if (!prListRes.ok) {
    console.error(`PR 목록 조회 실패: ${await prListRes.text()}`);
    return false;
  }

  const prs = await prListRes.json();

  // 정확한 브랜치 이름 패턴 매칭 (notion/publish-{slug} 또는 notion/publish-{slug}-{timestamp})
  const pr = (prs as any[]).find((p: any) =>
    p.head?.ref?.startsWith(`notion/publish-${slug}`)
  );

  if (!pr) {
    console.error(`slug "${slug}"에 해당하는 오픈 PR이 없습니다.`);
    return false;
  }

  // 2. PR merge
  const mergeRes = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}/pulls/${pr.number}/merge`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "gsf-notion-poller/1.0",
      },
      body: JSON.stringify({
        merge_method: "squash",
        commit_title: `feat(notion): [${slug}] Notion 발행승인 → main 병합`,
        commit_message: `Notion 발행 파이프라인: ${slug}\nPR #${pr.number} squash merge`,
      }),
    }
  );

  if (!mergeRes.ok) {
    const err = await mergeRes.text();
    console.error(`PR merge 실패: ${err}`);
    return false;
  }

  return true;
}

// ── 블로그별 폴링 처리 ────────────────────────────────────────────────
async function processBlog(config: BlogConfig, env: Env): Promise<void> {
  const token = getNotionToken(config.id, env);
  console.log(`🔍 [${config.id}] Notion DB 폴링 시작`);

  // ── 발행요청 처리 ─────────────────────────────────────────────────
  const publishRequests = await queryNotionByStatus(
    config.notionDatabaseId,
    STATUS_PUBLISH_REQUEST,
    token
  );

  for (const page of publishRequests) {
    console.log(`📄 [${config.id}] 발행요청 감지: ${page.slug} (${page.id})`);

    // 중복 트리거 방지: "처리중"으로 먼저 변경
    await updateNotionStatus(page.id, STATUS_PROCESSING, token);

    // GitHub Actions 트리거
    const triggered = await triggerGitHubWorkflow(
      config.githubRepo,
      config.workflowFile,
      {
        notion_page_id: page.id,
        slug: page.slug,
        blog_id: config.id,
      },
      env.CF_WORKER_GITHUB_TOKEN
    );

    if (!triggered) {
      // 실패 시 원래 상태로 복원
      await updateNotionStatus(page.id, STATUS_PUBLISH_REQUEST, token);
      await addNotionComment(
        page.id,
        "❌ GitHub Actions 트리거에 실패했습니다. 잠시 후 다시 시도하거나 수동으로 실행해주세요.",
        token
      );
    } else {
      console.log(`✅ [${config.id}] GitHub Actions 트리거 성공: ${page.slug}`);
    }
  }

  // ── 발행승인 처리 ─────────────────────────────────────────────────
  const publishApprovals = await queryNotionByStatus(
    config.notionDatabaseId,
    STATUS_PUBLISH_APPROVED,
    token
  );

  for (const page of publishApprovals) {
    console.log(`✅ [${config.id}] 발행승인 감지: ${page.slug} (${page.id})`);

    // 중복 처리 방지: "처리중"으로 먼저 변경
    await updateNotionStatus(page.id, STATUS_PROCESSING, token);

    // PR 찾아서 merge
    const merged = await mergeFeatureBranch(
      config.githubRepo,
      page.slug,
      env.CF_WORKER_GITHUB_TOKEN
    );

    if (!merged) {
      // merge 실패 시 원래 상태로 복원
      await updateNotionStatus(page.id, STATUS_PUBLISH_APPROVED, token);
      await addNotionComment(
        page.id,
        `❌ main merge에 실패했습니다. PR이 존재하는지 확인하거나 수동으로 merge해주세요.\n(slug: ${page.slug})`,
        token
      );
    } else {
      // merge 성공 → 발행완료 상태 설정
      await updateNotionStatus(page.id, STATUS_PUBLISHED, token);
      await addNotionComment(
        page.id,
        `🎉 발행 완료! ${config.domain}에 라이브됩니다.\n역동기화가 곧 실행됩니다.`,
        token
      );
      console.log(`🚀 [${config.id}] 발행 완료: ${page.slug}`);
    }
  }
}

// ── Cloudflare Worker 진입점 ──────────────────────────────────────────
export default {
  // HTTP 요청 핸들러 (수동 트리거 / 헬스체크)
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response("OK", { status: 200 });
    }

    if (url.pathname === "/trigger" && request.method === "POST") {
      // 수동 트리거 (cron 대기 없이 즉시 실행)
      await this.scheduled(null as any, env, null as any);
      return new Response("Triggered", { status: 200 });
    }

    return new Response("GSF Notion Poller v1.0", { status: 200 });
  },

  // Cron 핸들러 (1분마다 자동 실행)
  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext): Promise<void> {
    let configs: BlogConfig[];

    try {
      configs = JSON.parse(env.BLOGS_CONFIG);
    } catch {
      console.error("BLOGS_CONFIG 파싱 실패 — wrangler.toml 확인 필요");
      return;
    }

    // 모든 블로그 순차 처리 (병렬 처리 시 rate limit 위험)
    for (const config of configs) {
      try {
        await processBlog(config, env);
      } catch (err) {
        console.error(`[${config.id}] 처리 중 오류:`, err);
      }
    }
  },
};
