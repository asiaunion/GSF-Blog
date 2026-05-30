/**
 * GET /admin/api/auth/callback
 * Google OAuth 콜백: code 교환 → JWT 발급 → /admin 리다이렉트
 *
 * @see §8 Google OAuth 흐름 Step 4-7
 */

import type { APIRoute } from "astro";
import {
  validateOAuthCallback,
  createJwt,
  buildSessionCookie,
  buildClearCookie,
  AuthorizationError,
  OAUTH_STATE_COOKIE,
  OAUTH_VERIFIER_COOKIE,
} from "../../../../admin/lib/auth";
import {
  parseCookies,
  getClientIp,
  checkRateLimit,
  RATE_LIMITS,
  rateLimitResponse,
} from "../../../../admin/lib/security";
import { dbExecute } from "../../../../admin/lib/db";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const ip = getClientIp(request);
  if (checkRateLimit(`auth:${ip}`, RATE_LIMITS.auth)) {
    return rateLimitResponse();
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const errorParam = url.searchParams.get("error");

  // Google에서 에러 반환 시
  if (errorParam) {
    console.warn("[admin/auth/callback] OAuth error:", errorParam);
    return redirect("/admin/login?error=oauth_denied");
  }

  if (!code || !state) {
    return redirect("/admin/login?error=missing_params");
  }

  // 쿠키에서 state / codeVerifier 추출
  const cookies = parseCookies(request.headers.get("cookie"));
  const savedState = cookies[OAUTH_STATE_COOKIE];
  const codeVerifier = cookies[OAUTH_VERIFIER_COOKIE];

  // state 검증 (CSRF 방지)
  if (!savedState || savedState !== state) {
    return redirect("/admin/login?error=state_mismatch");
  }

  if (!codeVerifier) {
    return redirect("/admin/login?error=missing_verifier");
  }

  try {
    const user = await validateOAuthCallback(code, codeVerifier);
    const token = await createJwt(user);

    // 감사 로그 기록
    await dbExecute(
      "INSERT INTO audit_log (user_email, action, ip) VALUES (?, ?, ?)",
      [user.email, "login", ip]
    ).catch(() => {}); // 감사 로그 실패는 로그인 차단하지 않음

    // 쿠키 정리 + 세션 쿠키 설정
    const headers = new Headers({ Location: "/admin" });
    headers.append("Set-Cookie", buildSessionCookie(token));
    // OAuth 임시 쿠키 제거
    headers.append(
      "Set-Cookie",
      `${OAUTH_STATE_COOKIE}=; HttpOnly; Path=/admin; Max-Age=0`
    );
    headers.append(
      "Set-Cookie",
      `${OAUTH_VERIFIER_COOKIE}=; HttpOnly; Path=/admin; Max-Age=0`
    );

    return new Response(null, { status: 302, headers });
  } catch (err) {
    if (err instanceof AuthorizationError) {
      // 비인가 이메일 — 감사 로그에 기록
      await dbExecute(
        "INSERT INTO audit_log (user_email, action, ip) VALUES (?, ?, ?)",
        [err.message, "login_denied", ip]
      ).catch(() => {});
      return redirect("/admin/login?error=forbidden");
    }

    console.error("[admin/auth/callback]", err);
    return redirect("/admin/login?error=server_error");
  }
};

function redirect(location: string): Response {
  return new Response(null, { status: 302, headers: { Location: location } });
}
