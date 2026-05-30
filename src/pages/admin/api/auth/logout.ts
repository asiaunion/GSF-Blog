/**
 * POST /admin/api/auth/logout
 * JWT jti를 블랙리스트에 등록 → 세션 쿠키 삭제
 *
 * @see §8 로그아웃
 */

import type { APIRoute } from "astro";
import {
  verifyJwt,
  revokeJwt,
  buildClearCookie,
  AUTH_COOKIE_NAME,
} from "../../../../admin/lib/auth";
import {
  parseCookies,
  isCsrfAttack,
  csrfErrorResponse,
  getClientIp,
} from "../../../../admin/lib/security";
import { dbExecute } from "../../../../admin/lib/db";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // CSRF 검증
  if (isCsrfAttack(request)) return csrfErrorResponse();

  const cookies = parseCookies(request.headers.get("cookie"));
  const token = cookies[AUTH_COOKIE_NAME];

  if (token) {
    const payload = await verifyJwt(token).catch(() => null);
    if (payload?.jti) {
      // jti 블랙리스트 등록
      await revokeJwt(payload.jti);

      // 감사 로그
      await dbExecute(
        "INSERT INTO audit_log (user_email, action, ip) VALUES (?, ?, ?)",
        [payload.sub ?? "unknown", "logout", getClientIp(request)]
      ).catch(() => {});
    }
  }

  const headers = new Headers({ Location: "/admin/login/" });
  headers.append("Set-Cookie", buildClearCookie());

  return new Response(null, { status: 302, headers });
};
