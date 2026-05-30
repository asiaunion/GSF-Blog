/**
 * Admin 인증 모듈 (Arctic + JWT)
 * 세션 1-C에서 실제 구현 예정
 *
 * @see §8 인증 & 세션 상세 설계
 * @see §14 세션 1-C: 인증 + 미들웨어 + robots.txt
 */

// TODO(세션 1-C): Arctic Google OAuth + jose JWT + Turso 블랙리스트
// import * as arctic from "arctic";
// import * as jose from "jose";

export type AuthUser = {
  email: string;
  name: string;
  picture?: string;
};

export type JwtPayload = {
  sub: string;
  name: string;
  picture?: string;
  iat: number;
  exp: number;
  jti: string;
};
