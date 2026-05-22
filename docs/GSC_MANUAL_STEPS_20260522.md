# Google Search Console — 수동 완료 가이드 (2026-05-22)

자동 브라우저 시도 결과: **Google 로그인 필요** (에이전트 세션에 Search Console 세션 없음).

## 1. 속성 확인

1. https://search.google.com/search-console 접속 (gsfark.com 소유 계정)
2. 속성: **URL prefix** `https://gsfark.com/` 또는 **Domain** `gsfark.com`
3. 소유권: `public/google21b29b3e517c0ba5.html` 이미 배포됨

## 2. Sitemap 제출

| 항목 | 값 |
|------|-----|
| 제출 URL | `https://gsfark.com/sitemap-index.xml` |
| 확인 | `curl -sL https://gsfark.com/sitemap-index.xml` → 200 |

**경로:** Sitemaps → 새 사이트맵 추가 → 위 URL 입력 → 제출

## 3. URL 검사 (6건)

각 URL에 대해 **URL 검사** → **색인 생성 요청** (필요 시):

1. https://gsfark.com/
2. https://gsfark.com/topics/
3. https://gsfark.com/ko/posts/macro-barrier-and-super-scarce-real-estate-selection/
4. https://gsfark.com/posts/macro-barrier-and-super-scarce-real-estate-selection/
5. https://gsfark.com/ja/posts/macro-barrier-and-super-scarce-real-estate-selection/
6. https://gsfark.com/ko/about/

## 4. 기록 템플릿 (완료 후 `APLUS_VERIFICATION_CHECKLIST` §3.4에 반영)

| URL | 색인 상태 | 비고 |
|-----|----------|------|
| `/` | | |
| `/topics/` | | |
| macro-barrier KO | | |
| macro-barrier EN | | |
| macro-barrier JA | | |
| `/ko/about/` | | |

## 5. Sitemap 상태 템플릿

| 사이트맵 | 제출일 | 발견 URL | 상태 |
|----------|--------|----------|------|
| sitemap-index.xml | | | |

---

*에이전트는 로그인 후 재실행 시 브라우저로 제출 상태만 스냅샷 가능합니다.*
