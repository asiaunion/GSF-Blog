/**
 * Admin 보안 헬퍼
 * Rate Limit, CSRF 검증, Origin 헤더 검증
 * 세션 1-C에서 구현 예정
 *
 * @see §11 보안 아키텍처 (5계층)
 * @see §11-B API 보안 (CSRF, Rate Limit)
 */

// TODO(세션 1-C): Rate Limit, CSRF 구현
// TODO(세션 5-B): 전 엔드포인트 적용 검증

export type RateLimitConfig = {
  windowMs: number;
  maxRequests: number;
};

/** 엔드포인트별 Rate Limit 설정 (§11-C 기준) */
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  auth: { windowMs: 60_000, maxRequests: 10 },
  posts: { windowMs: 60_000, maxRequests: 60 },
  publish: { windowMs: 60_000, maxRequests: 5 },
  expand: { windowMs: 60_000, maxRequests: 10 },
  upload: { windowMs: 60_000, maxRequests: 20 },
};
