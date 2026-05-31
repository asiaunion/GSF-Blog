import type { APIRoute } from "astro";
import { checkRateLimit, isCsrfAttack, rateLimitResponse, csrfErrorResponse, getClientIp, RATE_LIMITS } from "@/admin/lib/security";

export const prerender = false;

/**
 * POST /admin/api/posts/[id]/suggest-tags/
 * 본문 내용을 Gemini Flash로 분석하여 태그 5개 이내 추천
 * 요청: { body_md: string, title: string, category: string }
 * 응답: { tags: string[] }
 */
export const POST: APIRoute = async ({ params, request }) => {
  try {
    if (isCsrfAttack(request)) return csrfErrorResponse();

    const ip = getClientIp(request);
    if (checkRateLimit(`suggest_tags_${ip}`, RATE_LIMITS.posts)) {
      return rateLimitResponse();
    }

    const body = await request.json();
    const bodyMd = (body.body_md as string | undefined)?.trim() || "";
    const title = (body.title as string | undefined)?.trim() || "";
    const category = (body.category as string | undefined) || "";

    // 본문이 너무 짧으면 빈 태그 반환 (silent)
    if (bodyMd.length < 200) {
      return new Response(JSON.stringify({ tags: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = import.meta.env.GEMINI_API_KEY;
    if (!apiKey) {
      // API 키 없을 때 silent fail
      return new Response(JSON.stringify({ tags: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 본문 앞 1000자만 사용 (비용 최소화)
    const snippet = bodyMd.substring(0, 1000);

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze this blog post and suggest up to 5 relevant Korean tags.

Title: ${title}
Category: ${category}
Content (excerpt): ${snippet}

Rules:
- Tags must be in Korean (한국어)
- 1 to 3 characters per tag preferred
- No spaces within a tag
- Tags should be specific and relevant to the content
- Return ONLY a JSON array of strings, nothing else

Example response: ["도쿄", "부동산", "투자", "일본생활"]`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 100,
            temperature: 0.3,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      // API 실패 시 silent fail
      return new Response(JSON.stringify({ tags: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const geminiData = await geminiRes.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "[]";

    // JSON 파싱 시도
    let tags: string[] = [];
    try {
      // JSON 배열 추출 (불순물 제거)
      const match = rawText.match(/\[.*\]/s);
      if (match) {
        tags = JSON.parse(match[0]);
        if (!Array.isArray(tags)) tags = [];
        // 문자열만 필터링, 최대 5개
        tags = tags.filter((t) => typeof t === "string" && t.trim()).slice(0, 5);
      }
    } catch {
      tags = [];
    }

    return new Response(JSON.stringify({ tags }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    // 모든 에러 silent fail
    console.error("POST /admin/api/posts/[id]/suggest-tags 에러:", error);
    return new Response(JSON.stringify({ tags: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
