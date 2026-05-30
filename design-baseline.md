# GSF-Blog Design Baseline

## Approved States

- **2026-05-30**: GSF-Blog Admin CMS Design Reskin Unified with Astro Paper Theme - Tag: `v-approved-20260530-admin-design-unification`
  - Admin 대시보드 및 리스트/에디터 등 전체 CMS 컴포넌트의 하드코딩된 Tailwind 색상(slate, indigo, emerald)을 블로그 공통 CSS 변수(--background, --foreground, --accent, --muted, --border 등) 기반의 `bg-background`, `text-foreground`, `bg-card-bg` 클래스로 완전 교체.
  - 화려한 그라데이션, backdrop-blur, 거대한 그림자(shadow-xl) 등을 모두 걷어내고 블로그 프론트엔드와 일치하는 평면적이고 심플한(Flat Minimal) 디자인으로 재정비.
  - 다크모드/라이트모드 토글 설정(`localStorage.getItem("theme")`)을 Admin 페이지 접속 시 실시간으로 상속받아, 블로그 테마와 어드민 테마가 동일하게 유지되도록 통일.

- **2026-05-30**: GSF-Blog Admin CMS P2 Post List, Editor, Auto-save & Revisions Complete - Tag: `v-approved-20260530-admin-cms-p2-complete`
  - DB 드래프트와 GitHub API 발행 목록을 지능적으로 실시간 병합하는 `PostList.tsx` 컴포넌트 및 API 완비.
  - 마크다운 WYSIWYG 에디터인 Milkdown Crepe의 마운트 구조(`root` 엘리먼트 타겟팅) 설계 및 탭 전환 시 인스턴스 소멸/재마운트 처리를 통한 다국어(ko/en/ja) 동적 탭 에디터 구현 완료.
  - 1초 주기 본문 Polling 감지 및 타이핑 종료 2초 후 자동저장 기능, 그리고 본문 변경 감지 시 `revision_history` 에 이전 스냅샷을 자동 백업하는 감사 연동 완료.
  - 슬라이드식 사이드바 `RevisionPanel.tsx` 를 통해 과거 버전을 조회하고 임의의 시점으로 본문을 즉시 롤백하는 복원 기능 통합 완료.
- **2026-05-30**: GSF-Blog Admin CMS P1 Infrastructure & Google OAuth Verification Complete - Tag: `v-approved-20260530-admin-cms-p1-complete`
  - Google Cloud Console OAuth 2.0 및 Redirect URI (`http://localhost:4321/admin/api/auth/callback/`) 연동 성공.
  - Astro `trailingSlash: "always"` 환경에서 발생할 수 있는 404 에러를 방지하기 위해 미들웨어 및 모든 인증 API, 로그인/대시보드 템플릿의 하드코딩된 리다이렉트 경로와 버튼 링크를 끝 슬래시(`/`) 주소로 통일 및 패치 완료.
  - 화이트리스트(`ADMIN_EMAILS=asiaunion@gmail.com,mayumiot@gmail.com`)에 등록된 승인된 계정으로 대시보드 진입(성함: Seung-Ju Kim) 정상 작동 확인.
  - 비인가 계정 시도 시 `?error=forbidden`과 함께 403 차단 화면 작동 확인 및 `/robots.txt` 내 `Disallow: /admin/` 반영 성공.
  - 로그아웃 시 JWT jti 블랙리스트 처리 및 세션 쿠키 삭제와 로그인 리다이렉트 안전 동작 확인.
- **2026-05-23**: Redesign Tokyo Real Estate Cost Stack SVG charts & fix missing xmlns namespaces - Tag: `v-approved-20260523-fix-tokyo-cost-stack-chart`
  - `japan-real-estate-three-things` 포스트에 삽입된 비용 구조 SVG 차트를 고품격 100% 수직 스택형 바 차트로 전면 재디자인 및 다국어(ko/en/ja) 동기화 완료.
  - `public/assets/images/blog/svg/` 아래에 있는 전체 SVG 도표 파일(총 43개)의 네임스페이스 선언 누락 오류(`xmlns="http://www.w3.org/2000/svg"`)를 파이썬 스크립트로 일괄 치료하여 엑스박스 렌더링 에러를 완벽하게 차단.
  - 프리뷰 파일 생성: `ko-japan-real-estate-three-things.png`, `en-japan-real-estate-three-things.png`, `ja-japan-real-estate-three-things.png` (artifacts 디렉토리 보존).
- **2026-05-22**: A+ verification (Lighthouse + §3 checklist) - Tag: `v-approved-20260522-aplus-91`
  - Mobile Lighthouse: macro-barrier KO 95/90/100/100; `/en/*` legacy 308 → unprefixed EN.
  - 체크리스트: `docs/APLUS_VERIFICATION_CHECKLIST_20260522.md` (Overall **91**).
- **2026-05-22**: Data charts pipeline (macro-barrier) — CSV → Python WebP → MDX figure - Tag: `v-approved-20260522-charts-webp`
  - 인라인 MDX SVG 및 `MacroBarrierChart.astro` 제거; Shiki 코드 블록 렌더링 이슈 해소.
  - 보조 차트: Economist 레이아웃 + GSF 그린 팔레트(Seoul `#047857`, Outskirts `#a7f3d0`), 직접 라벨(Seoul '25 Q2 피크 / Outskirts '25 Q2–Q3 사이).
  - `MacroMicroMatrix`는 MDX 본문(서론 직후)에만 배치; `PostDetails` 자동 삽입 없음.
  - 문서: `docs/CHARTS_AND_VISUALS.md`, `scripts/charts/README.md`, `docs/antigravity-knowledge/gsf_blog_data_charts_pipeline/`.
- **2026-05-22**: GSF-Blog P3 최종 보완 및 P4 3-Pass 번역 CLI 구현 완료 - Tag: `v-approved-20260522-p0-p5-complete`
  - 일본어(JA) 마크다운 번역본들의 frontmatter 및 본문 내 잔존 한글(자모, 한국어 조사, 미세 오타 등) 전수 교정 및 일본어 현지화 정제 완료.
  - 마크다운 본문 내에 Lighthouse 95+ 웹 접근성(a11y) 기준을 준수하는 다크/라이트 테마 자동 호환 인라인 SVG 차트 보강 및 정량 데이터 CSV(`public/data/macro-barrier-chart-source.csv`) 동봉.
  - Zero-Dependency 기반의 3-Pass 번역 CLI 오케스트레이터 구현 (`scripts/translate/` 내 CLI 스크립트군) 및 명령어 가이드 README.md 작성 완료. `--yes` 자동 저장 플래그, 미승인 시 `exit 1` 프로세스 에러 전파 및 `OLLAMA_HOST` 동적 주소 터널링 지원.
  - 로컬 `pnpm run build` 최종 무결성 테스트 100% 성공 확인 (Pagefind 인덱싱 및 Sitemap 정상 빌드).
- **2026-05-22**: Macro-Micro Matrix card componentization & AdSense P0 layout recovery - Tag: `v-approved-20260522-p1-p2-complete`
  - 인라인 스타일이 선언되어 유지보수가 어려웠던 3개 국어 매트릭스 카드 블록을 `.macro-micro-matrix` 스타일과 `<div class="macro-micro-matrix">` 구조로 정리하고, 스타일을 `global.css` 에 정의된 CSS 변수(--card-bg, --card-border, --card-accent) 및 Tailwind `@theme inline` 구조와 매핑하여 단일 컴포넌트 수준의 CSS 바인딩 구현.
  - 모바일(640px 이하) 환경에서 1열로 자동 stack되는 반응형 레이아웃 구현 및 다크/라이트 테마 자동 대응 확인.
  - Sitemap 500 에러 해결을 위해 `astro.config.ts` 에 sitemap 절대 경로 안전 파싱 적용 및 `ads.txt` 플레이스홀더 배포 완료.
- **2026-05-22**: Improved visual quality, CSS card legibility and alert layout on macro-barrier post - Tag: `v-approved-20260522-improved-ui`
  - 서울-도쿄 랜드마크(남산타워, 도쿄타워)가 양립하는 부동산 투자 저널 격조의 통합 3D WebP 이미지로 교체 (`macro-barrier-and-super-scarce-real-estate-selection-hero.webp`).
  - CSS 카드 내 하드코딩 글씨색 제거 및 테마 상속 텍스트 스타일 적용, 카드 배경/테두리를 범용 중성 톤(`rgba(128, 128, 128, 0.05)` / `0.15`)으로 교체하고, 왼쪽 테두리와 제목 색상을 블로그의 고유 그린 정체성 색(`var(--color-accent)`)으로 통일하여 완성도 증대.
  - 난해한 3D 추상 일러스트(`capital-dust-collector.webp`) 및 캡션 완전 삭제.
  - 마크다운 파서 깨짐 현상 차단 및 가독성 확보를 위해 Alert Box를 일반 마크다운 인용 블록(`> **[IMPORTANT] 자본의 집진기(Dust Collector) 효과 :** 유동성 축소라는 강력한 압력이 가해질수록, 상위 1%의 초희소 자산으로 자본이 더욱 단단하게 밀착되는 현상입니다. 거시 악재가 오히려 핵심지의 안전자산 지위를 방어해 주는 방패가 됩니다.`)으로 다듬고, 카드와 Alert Box 내 불필요하거나 뜬금없는 이모지(⚠️, 👑)를 모두 깔끔하게 삭제하여 고급스러운 에디토리얼 레이아웃을 구축.
- **2026-05-18**: Markdown Strikethrough Fix (singleTilde disabled) - Tag: `v-approved-20260518-strikethrough-fix`
  - Verified via live site deployment: ![Verification Screenshot](/Users/gsf/.gemini/antigravity/brain/dfd883cc-2aeb-4df7-88b1-b9d9ead82626/strikethrough_fix_verification_1779098758381.png)



### Phase 3: 에디터 완성 (v-approved-20260530-admin-cms-p3-complete)
- **Editor.tsx Split View**: 좌측 Milkdown Crepe (마크다운 에디터) ↔ 우측 실시간 HTML PreviewPane ↔ 가장 우측 Frontmatter 설정 패널로 구성.
- **이미지 업로드 파이프라인**: Drag & Drop / 버튼 업로드 연동, `sharp` 기반 WebP 1920px 리사이즈 및 EXIF 제거 후 `@vercel/blob` 업로드. DB `media` 테이블에 내역 저장.
- **대시보드 및 메모**: Glassmorphism 대시보드에서 포스트 상태별 통계 및 최근 감사 로그(audit_log) 표시. 메모 전용 필터를 가진 `memos` 뷰어 구축 완료.

### Phase 4: 발행 파이프라인 통합 (v-approved-20260530-admin-cms-p4-complete)
- **GitHub API 연동 발행**: `src/admin/lib/github.ts` 를 통해 작성된 마크다운을 GitHub API 로 직접 Commit/Push (Vercel 자동 배포 트리거 연동).
- **빈 번역 건너뛰기 기능**: 제목이나 본문이 작성되지 않은 언어(예: 영어, 일본어 미작성 시)는 빈 파일로 배포하지 않도록 처리하여 안전성 확보.
- **감사 로그(Audit Log) 명시적 기록**: `publish`, `import` 행위가 발생할 때 `audit_log` 테이블에 사용자 이메일, IP 주소 및 User-Agent 기록.
- **가져오기(Import) 파이프라인**: GitHub Repository 에만 존재하고 DB 에는 없는 기존 `.mdx` 포스트들을 DB 와 동기화하는 로직 구현 완료.
