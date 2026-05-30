/**
 * Astro 미들웨어
 * /admin/* 경로에 JWT 인증 게이트 적용
 *
 * @see §8 세션 검증 흐름
 * @see §10 애드센스 안전 조치
 */

import { defineMiddleware } from "astro:middleware";
import { verifyJwt, AUTH_COOKIE_NAME } from "./admin/lib/auth";
import { parseCookies } from "./admin/lib/security";

// 인증 없이 접근 가능한 /admin 하위 경로 (화이트리스트)
const PUBLIC_ADMIN_PATHS = new Set([
  "/admin/login",
  "/admin/login/",
  "/admin/api/auth/login",
  "/admin/api/auth/login/",
  "/admin/api/auth/callback",
  "/admin/api/auth/callback/",
]);

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);

  // /admin/* 경로만 처리
  if (!pathname.startsWith("/admin")) {
    return next();
  }

  // 공개 경로는 통과
  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return next();
  }

  // JWT 검증
  const cookies = parseCookies(context.request.headers.get("cookie"));
  const token = cookies[AUTH_COOKIE_NAME];

  if (!token) {
    return new Response(null, { status: 302, headers: { Location: "/admin/login/" } });
  }

  const payload = await verifyJwt(token).catch(() => null);

  if (!payload) {
    // 만료/위조/블랙리스트 — 로그인 페이지로
    const headers = new Headers({
      Location: "/admin/login/?error=session_expired",
    });
    // 만료된 쿠키 제거
    headers.append(
      "Set-Cookie",
      `${AUTH_COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/admin; Max-Age=0; Secure`
    );
    return new Response(null, { status: 302, headers });
  }

  // context.locals에 사용자 정보 주입 (페이지에서 Astro.locals.user로 접근)
  (context.locals as Record<string, unknown>).user = {
    email: payload.sub,
    name: payload.name,
    picture: payload.picture,
  };

  return next();
});
