# GSF-Ark — Weekly Status

---

## [HUB] 프로젝트 요약 (전체 현황판용 공통 필드)

| 필드 | 값 |
|------|-----|
| 최종 업데이트 | 2026-06-23 (세션 P) |
| 프로젝트명 | GSF-Ark |
| 상태 | 🟢 E-E-A-T + GSC 기술 보완 완료 — AdSense 재제출 대기 |
| 목표 + 기한 | AdSense 계정 활성화 → GSFArk 추가 등록 (2026 Q3) |
| 이번 주 최우선 액션 | Essay 2 배포 준비 (6/26 AG) · GSC 색인 요청 (Joseph, 6/26) |
| 다음 체크포인트 | 6/26 Essay 2 live / 7/3 Essay 3 live / 7/10 AdSense 재신청 / GSC 404 재확인 (1~2주 후) |
| 블로커 | 없음 |

---

## 🔴 이번 주 필수 액션

| 기한 | 항목 | 상태 |
|------|------|------|
| 6/19 | E-E-A-T 페이지 + About + Author Box + Essay 1 + 핫픽스 | ✅ 라이브 (`49648c9`) — [`SESSION_CLOSURE`](docs/GSF_ARK_SESSION_CLOSURE_20260619.md) |
| 6/26 | Essay 2 배포 (AG) | 🔜 AG 담당 |
| 6/30 | Essay 2·3 초안 작성 | ✅ Claude 완료 (GPT 수정 반영) |
| 7/3 | Essay 3 배포 (AG) | 🔜 AG 담당 |
| 6/26 | GSC 색인 요청 — E-E-A-T + Essay 1~3 EN/KO/JA | 🔄 진행 중 — 6/26 완료 예정 |
| **7/10** | **GSFArk AdSense 재신청** | ⏳ 고정일 |
| 7/13~15 | Plan B tokyokorean.net AdSense 신청 | ⏳ GSFArk 후 3~5일 |
| 매주 화/목 | 발행 목표 주 2회 유지 | 🔄 진행 중 |

---

## 📅 예약 배포 체크리스트 (Joseph — AG 배포 전 확인)

브랜치: `feat/eeat-essay-2-3-phase-a` · Phase A 커밋 `67ba48a` · 현재 `draft: true`

### Essay 2 — **2026-06-26 (목) 09:00 JST**

| # | 단계 | 담당 | 상태 |
|---|------|------|------|
| 1 | KO/EN/JA `draft: false` 전환 (`buying-property-japan-checklist-before-you-commit`) | AG | ⬜ |
| 2 | `pnpm validate:post buying-property-japan-checklist-before-you-commit` (exit 0) | AG/Cursor | ⬜ |
| 3 | `feat/eeat-essay-2-3-phase-a` → **main merge** + push | Joseph 승인 후 AG | ⬜ |
| 4 | Vercel prod 배포 확인 (gsfark.com) | Joseph | ⬜ |
| 5 | `_handoff.md` append | AG | ⬜ |
| 6 | GSC 색인 요청에 Essay 2 URL 포함 (Joseph 진행 중 → 6/26 완료) | Joseph | 🔄 |

### Essay 3 — **2026-07-03 (목) 10:00 JST**

| # | 단계 | 담당 | 상태 |
|---|------|------|------|
| 1 | KO/EN/JA `draft: false` 전환 (`why-i-chose-nihonbashi`) | AG | ⬜ |
| 2 | `pnpm validate:post why-i-chose-nihonbashi` (exit 0) | AG/Cursor | ⬜ |
| 3 | main merge + push (Essay 2 이후 동일 브랜치 또는 main 직접) | Joseph 승인 후 AG | ⬜ |
| 4 | Vercel prod 배포 확인 | Joseph | ⬜ |
| 5 | `_handoff.md` append | AG | ⬜ |

---

## ✅ 2026-06-18 — RE 트랙 공식 마감

| 항목 | 내용 |
|------|------|
| RE-1 ~ RE-6 W2-N1 | ✅ 완료 (registry·pilot·다마 26시·우선 8시 benchmarks) |
| 八王子 XST001 | reprobe 완료 — API 공백 확정 · [`xst001-hachioji-reprobe-20260618.json`](docs/verification/data/xst001-hachioji-reprobe-20260618.json) |
| SSOT | [`docs/REGION_EXPANSION_CLOSURE.md`](docs/REGION_EXPANSION_CLOSURE.md) |
| 다음 활성 | **Wave 3 콘텐츠** — Runbook §RE-7 |
| 백로그 | 다마 18시 점진 수집(BL-1) · Phase 4 이연(BL-4) |

---

## ✅ 2026-06-15 완료 작업

| 항목 | 내용 | 커밋 |
|------|------|------|
| sitemap admin URL 제거 | astro.config.ts filter 1줄 추가 | 0d84582 |
| 라이브 검증 | sitemap 151→147개 (admin 4개 정확히 감소) | — |
| ads.txt 상태 | 라이브 200 + 정상 pub-ID 확인 | — |

---

## 📋 AdSense 현황 (2026-06-15 기준)

| 항목 | 상태 |
|------|------|
| 신청 횟수 | 5차 (조치 필요 통보 수신) |
| 기술 결함 | ✅ 전부 해소 (admin sitemap, consent-gate, ads.txt) |
| 재제출 예정 | **7월 10일 고정** (Essay 2 6/26 + Essay 3 7/3 배포 후 1주 숫성) |
| Plan B 신청 | 7/13~15 (GSFArk 후 3~5일) |
| GSC 색인 추세 | 116개 유지 — 기술 보완(404 리디렉션·robots.txt) 배포 완료, 1~2주 후 재확인 |
| GSC 404 보완 | ✅ 완료 (441d963, df0307e, aeccf2f) — 54건 → 10건 이하 예상 |

---

## 🆕 Plan B — tokyokorean.net

| 항목 | 내용 |
|------|------|
| 목적 | Non-YMYL 블로그로 AdSense 계정 먼저 활성화 |
| 도메인 | tokyokorean.net (확정) |
| 플랫폼 | Astro-Lite + Vercel (무료) |
| 언어 | 한국어 단일 |
| 니치 | 한국인의 일본 생활·문화·한일 비교 |
| 콘텐츠 목표 | 15~20편 게시 후 신청 |
| 타임라인 | 6/15~7/10 구축·콘텐츠 → 7/10~15 런칭 + 신청 |
| AG 지시서 | `docs/AG_TASK_2026-06-15_planb-tokyokorean.md` |
| 계정 활성화 후 | GSFArk.com 동일 계정 추가 등록 예정 |

---

## ✍️ 콘텐츠 발행 현황

| 항목 | 값 |
|------|-----|
| 발행 목표 | 주 2회 이상 (화/목) |
| 현재 총 발행 수 | 37기사 (Ep.07 포함, 2026-06-19) |
| 소셜 자동 배포 | ✅ 정상 가동 중 |
| 언어 | 日/韓/英 3언어 |

---

## 📈 과제 로드맵 (우선순위 순)

| 순위 | 과제 | 상태 | 비고 |
|------|------|------|------|
| 1 | AdSense 계정 활성화 | 🔄 진행 중 | Plan A(GSFArk 재제출) + Plan B(tokyokorean.net) 병행 |
| 2 | tokyokorean.net 런칭 | 🔄 AG 준비 중 | 7/10~15 목표 |
| 3 | GSC 색인 하락 모니터링 | 🔄 관찰 중 | 116개 → 2주 후 재확인 |
| 4 | SEO 최적화 | ⬜ 미착수 | 승인 후 착수 |
| 5 | 발행 지속성 유지 | 🔄 진행 중 | 주 2회 화/목 |

---

## 📊 KPI (미정 — 별도 논의 예정)

> ⚠️ KPI 항목 및 측정 방식은 별도 세션에서 확정 예정.

---

## 📅 주간 루틴 (고정)

| 주기 | 항목 |
|------|------|
| 매주 화/목 | 발행 1건 이상 |
| 매주 | 소셜 자동 배포 정상 가동 확인 |
| 수시 | 애드센스 메일함 확인 |
| 6/30 | Essay 2·3 초안 완료 (Claude 담당) |

---

## 🗂️ 관련 문서

| 문서 | 용도 |
|------|------|
| `docs/AG_TASK_2026-06-15_adsense-sitemap-fix.md` | sitemap admin 제거 AG 지시서 |
| `docs/AG_TASK_2026-06-15_planb-tokyokorean.md` | Plan B tokyokorean.net AG 지시서 |
| `docs/AG_TASK_2026-06-19_adsense-pages.md` | E-E-A-T 페이지 추가 + About 수정 + Author Box AG 지시서 |
| `docs/GSF_ARK_SESSION_CLOSURE_20260619.md` | **2026-06-19 세션 마감** — AdSense E-E-A-T 라이브 스냅샷 |
| `docs/AG_TASK_2026-06-19_deploy-bundle.md` | E-E-A-T + essay 통합 배포 번들 |
| `docs/kpi-archive/` | 주간 KPI 기록 (확정 후 운영) |
| `docs/REGION_EXPANSION_PLAN.md` | RE 트랙 — 지역 SSOT 일반화·수도권 파일럿 AG 슬라이스 |
| `docs/REGION_EXPANSION_AG_RUNBOOK.md` | RE AG 실행 runbook (단계별 §RE-N 착수) |

---

## 📝 작업 로그

### 2026-06-21
- Essay 2·3 데드라인 확정: 6월 30일 (Claude 담당)
- E-E-A-T 에세이 2편(Checklist) 및 3편(Nihonbashi) Phase A 검수/번역/수정
- MLIT 지진 기준 Fact Sheet 보강
- 화자 일치 및 1인칭 화법(We->I/my wife) 전면 수정
- 히어로 이미지 생성 및 WebP/OG 포맷 변환
- ogImage 및 frontmatter 검증 후 배포 대기 상태로 커밋
- Author Profile 연락처 추가 (3언어) — Cursor 완료
- GSC 404 54건 분석 + Cursor Brief 작성·완료 (커밋 441d963, df0307e, aeccf2f)
- GSC 색인 현황: 116개 유지 — 기술 보완 후 1~2주 재확인 예정
- Joseph GSC 수동 작업: URL 검사 → 색인 요청 Day 2 E-E-A-T 우선 (하루 10건) 진행 중
- **Essay 2 초안** 완료 (GPT 수정 반영): `buying-property-japan-checklist-before-you-commit.md`
- **Essay 3 초안** 완료 (GPT 수정 반영): `why-i-chose-nihonbashi.md`
- AdSense 재신청 일정 확정: **7월 10일** (Cursor·Claude 정렬) — Plan B 7/13~15
- admin sitemap 제외 확인: astro.config.ts 정상 (✅)

### 2026-06-20
- topics.astro h1 mt-9 추가 — 로고와 본문 붙어보이는 문제 수정

### 2026-06-19 (세션 마감) — AdSense E-E-A-T **라이브** + 핫픽스

| 항목 | 내용 | 커밋/참고 |
|------|------|-----------|
| **PR #24** | mission/methodology/author + essay 3언어 + About | `1defc35` merge |
| **Author EN** | `/author/joseph-kim/` 200 복구 · Joseph. KIM | `470ffac` |
| **About E-E-A-T** | 니혼바시·타임라인·pillar·출처 문단 | `e48b8c0` |
| **Author Card** | 포스트 하단 4 CTA | `16c9155` |
| **타임라인 링크** | accent + 분리 CTA 줄 | `cdd40bb`, `49648c9` |
| **SSOT** | [`GSF_ARK_SESSION_CLOSURE_20260619.md`](docs/GSF_ARK_SESSION_CLOSURE_20260619.md) | `main` `49648c9` |
| **다음** | Joseph 라이브 스팟 → 7월 초 AdSense 재제출 | |

### 2026-06-19 — AdSense E-E-A-T 작업 설계 + Essay 1 초안

| 항목 | 내용 | 파일 |
|------|------|------|
| GPT 제안 검토 | mission·methodology·author·About·Essay 5편 항목별 검증 완료 | — |
| AG 지시서 | E-E-A-T 페이지 4개 TASK 작성 | `docs/AG_TASK_2026-06-19_adsense-pages.md` |
| Essay 1 초안 | "What Surprised Me Most About Buying Property in Japan" (draft:true) | `src/data/blog/en/buying-property-japan-surprises-foreign-investor.md` |
| About en.md 발견 | 2026 니혼바시 콘도 매입 경험 기재 확인 → Essay 소재 활용 | — |
| 재제출 일정 | 6/29~30 → 7월 초로 조정 (E-E-A-T 작업 완료 후) | — |

### 2026-06-19 (이전) — Ep.07 배포 · Hero 게이트 · Vercel lockfile

| 항목 | 내용 | 커밋/참고 |
|------|------|-----------|
| **Ep.07 라이브** | `tokyo-kita-arakawa-itabashi-nerima` KO/EN/JA | `8f7b7b2` |
| 검증 | `verify:og-social` ✅ · `validate:post` ✅ (Cursor) | fact sheet 131건 |
| Hero | `hero.webp` + `hero-og.jpg` (1200×630) · `ogImage` `.jpg` | |
| **Hero hard gate** | `validationGates.ts` hero gates · manifest `hero_waived_by` · `orchestrator` slug | 이 커밋 |
| **Vercel 빌드 수정** | `ERR_PNPM_OUTDATED_LOCKFILE` — `@turf/turf`, `xlsx` lockfile 누락 | `9a2dff5` |
| 라이브 URL | https://gsfark.com/ko/posts/tokyo-kita-arakawa-itabashi-nerima/ → **200** | |
| **백로그** | `verify:episode:gate` secondary 12 + draft_coverage 11 (primary 0 실패, 비차단) | 다음 에피소드 전 동기화 권장 |
| **다음** | LinkedIn Post Inspector (KO·EN) · Ep.08 manifest | |

### 2026-06-18
- Phase 3 (urban-planning) 23구 데이터 파이프라인 구축 및 연동 완료
- 재개발 가능성(redevelopment-potential) 및 규제 환경(urban-constraints) 분석 스크립트 작성
- Benchmarks schema 1.9 판올림 및 research-pack 주입 로직 반영
- **Region Expansion (RE) 계획 확정** — Phase 4 이연, 파일럿 神奈川3+狛江1
- **Region Expansion (RE) 완료** — 인프라/API 범용화 성공, 파일럿 4구 데이터 수집 및 E2E 검증 완료

### 2026-06-17
- Ep.06 KO/EN/JA 초안 작성 및 히어로 이미지 생성
- Threads EN/KO 게시 완료
- LinkedIn EN/KO 게시 완료
- LinkedIn OG 이미지 캐시 오염 패턴 KI 저장
- _post_now.py Threads image 페이로드 수정

### 2026-06-15
- AdSense "조치 필요" 통보 수신 확인
- 라이브 sitemap 점검 → admin URL 4개 여전히 포함 확인
- AG: astro.config.ts sitemap filter admin 제외 1줄 추가 (커밋 0d84582)
- 라이브 검증 완료: sitemap 151→147개, admin grep 빈 결과
- ads.txt 라이브 정상 확인 (200 + 정상 pub-ID)
- AdSense Audit v2 재검토 → 실제 원인: ads.txt 공백(5/8~5/22) + consent-gate(5/27~6/4) + 반복 재신청 패턴
- Author Card 라이브 확인 → 포스트 하단 정상 표시 (E-E-A-T 문제 없음)
- AdSense 재제출 전략 확정: 6/29~30 (2주 cool-off)
- Plan B 전략 확정: tokyokorean.net, Astro-Lite, 한국어 단일, Non-YMYL
- AG 지시서 2개 저장 완료
- GSC 색인 하락 확인: 130개대 → 120개대 → 116개 (모니터링 필요)

### 2026-06-13
- AdSense 기술 Audit v2 실행 및 보고서 작성
- 결함 발견: admin URL 4개 sitemap 포함, ads.txt 이력 재구성
- 현재 심사 대기 결정

### 2026-06-10
- reschedule_all.py 실행으로 34개 포스트 SNS 전체 재예약
- 히어로 섹션 2컬럼 리디자인 + ui/hero-2col→main 머지
- CTR 개선: 8개 포스트 EN/KO/JA title·description 업데이트

### 2026-06-09
- 소셜 배포 파이프라인 점검 (Buffer rate limit 해소 확인)
- sns_scheduler.py Threads 이미지 누락 버그 수정

### 2026-06-14
- GSF 폴더 구조 개편: GSF-Blog → GSF-Ark
- CLAUDE.md, projects.registry.yaml 경로 업데이트
