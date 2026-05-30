/**
 * GitHub API 래퍼 (포스트 발행 + 임포트)
 * 세션 2-A, 4-A에서 구현 예정
 *
 * @see §14 세션 2-A: 포스트 목록 API + UI
 * @see §14 세션 4-A: 발행 파이프라인 (GitHub 커밋)
 */

// TODO(세션 2-A): GitHub 파일 목록 조회
// TODO(세션 4-A): GitHub 커밋 (발행) + SHA 충돌 감지

export type GitHubFile = {
  path: string;
  sha: string;
  name: string;
};
