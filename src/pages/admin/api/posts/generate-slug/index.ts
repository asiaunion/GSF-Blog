import type { APIRoute } from "astro";
import { checkRateLimit, isCsrfAttack, rateLimitResponse, csrfErrorResponse, getClientIp, RATE_LIMITS } from "@/admin/lib/security";

export const prerender = false;

/**
 * POST /admin/api/posts/generate-slug/
 * 제목(title)을 받아 Gemini Flash로 의미 기반 영문 kebab-case 슬러그 생성
 * 요청: { title: string }
 * 응답: { slug: string }
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    if (isCsrfAttack(request)) return csrfErrorResponse();

    const ip = getClientIp(request);
    if (checkRateLimit(`generate_slug_${ip}`, RATE_LIMITS.posts)) {
      return rateLimitResponse();
    }

    const body = await request.json();
    const title = (body.title as string | undefined)?.trim();

    if (!title) {
      return new Response(JSON.stringify({ error: "제목이 비어 있습니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = import.meta.env.GEMINI_API_KEY;
    if (!apiKey) {
      // API 키 없을 때 폴백: 간단한 romanization 시도
      const fallbackSlug = generateFallbackSlug(title);
      return new Response(JSON.stringify({ slug: fallbackSlug }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Gemini Flash API 호출
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
                  text: `Convert the following blog post title to a concise, meaningful English kebab-case slug (URL-friendly).
Rules:
- Use only lowercase English letters, numbers, and hyphens
- 3 to 6 words maximum
- Capture the core meaning, not a literal word-by-word translation
- No articles (a, an, the), prepositions, or filler words unless essential
- No trailing or leading hyphens

Title: "${title}"

Respond with ONLY the slug, nothing else.`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 50,
            temperature: 0.2,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      throw new Error("Gemini API 호출 실패");
    }

    const geminiData = await geminiRes.json();
    const rawSlug = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    // 슬러그 정제: 영문 소문자, 숫자, 하이픈만 허용
    const cleanSlug = rawSlug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 80);

    if (!cleanSlug) {
      return new Response(JSON.stringify({ slug: generateFallbackSlug(title) }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ slug: cleanSlug }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("POST /admin/api/posts/generate-slug 에러:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

/**
 * Gemini API 키 없을 때 간단한 폴백 슬러그 생성
 * 한국어를 포함한 특수 문자를 하이픈으로 치환
 */
function generateFallbackSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[가-힣]/g, (char) => {
      // 간단한 한국어 처리: 유니코드 코드포인트 기반 숫자로 치환 (임시)
      return char.charCodeAt(0).toString(16);
    })
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60) || `post-${Date.now().toString(36)}`;
}
