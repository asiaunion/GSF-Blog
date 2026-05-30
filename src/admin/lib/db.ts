/**
 * Admin DB 클라이언트 (Turso / libSQL)
 * 세션 1-B에서 실제 연결 구현 예정
 *
 * @see §14 세션 1-B: Turso DB 설정 + 스키마
 */

// TODO(세션 1-B): @libsql/client 임포트 + Turso 연결 구현
// import { createClient } from "@libsql/client";

export type DbClient = {
  execute: (query: string, args?: unknown[]) => Promise<unknown>;
};

/** placeholder — 세션 1-B에서 실제 클라이언트로 교체 */
export function getDb(): DbClient {
  throw new Error("DB not configured yet — implement in session 1-B");
}
