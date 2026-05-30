/**
 * POST /admin/api/auth/login
 * Google OAuth 인가 URL 생성 → 리다이렉트
 *
 * @see §8 Google OAuth 흐름 Step 1-3
 */

import type { APIRoute } from "astro";
import {
  createAuthorizationURL,
  buildOAuthCookies,
} from "../../../../admin/lib/auth";
import {
  checkRateLimit,
  RATE_LIMITS,
  rateLimitResponse,
  getClientIp,
} from "../../../../admin/lib/security";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  // Rate Limit: 10회/분
  const ip = getClientIp(request);
  if (checkRateLimit(`auth:${ip}`, RATE_LIMITS.auth)) {
    return rateLimitResponse();
  }

  try {
    const { url, state, codeVerifier } = await createAuthorizationURL();
    const [stateCookie, verifierCookie] = buildOAuthCookies(state, codeVerifier);

    const headers = new Headers({
      Location: url.toString(),
    });
    headers.append("Set-Cookie", stateCookie);
    headers.append("Set-Cookie", verifierCookie);

    return new Response(null, { status: 302, headers });
  } catch (err) {
    console.error("[admin/auth/login]", err);
    const errParam =
      err instanceof Error && err.message.includes("환경변수")
        ? "config"
        : "unknown";
    return new Response(null, {
      status: 302,
      headers: { Location: `/admin/login/?error=${errParam}` },
    });
  }
};
