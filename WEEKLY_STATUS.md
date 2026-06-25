# GSF-Ark — Weekly Status

---

## [HUB] 프로젝트 요약 (전체 현황판용 공통 필드)

| 필드 | 값 |
|------|-----|
| 최종 업데이트 | 2026-06-24 (GSC 색인 큐 49/49 완료) |
| 프로젝트명 | GSF-Ark |
| 상태 | 🟢 E-E-A-T Essay 1·2 **라이브** · Ep08 **라이브** — Essay 3 draft 대기 — AdSense 재제출 대기 |
| 목표 + 기한 | AdSense 계정 활성화 → GSFArk 추가 등록 (2026 Q3) |
| 이번 주 최우선 액션 | Joseph 라이브 스팟 체크 → **7월 초 AdSense 재제출** |
| 다음 체크포인트 | 7/초 AdSense 재제출 / 7/10~15 Plan B 런칭 + 신청 / Wave 3 (Joseph 지시 시) |
| 블로커 | 없음 — 기술·E-E-A-T 배포 완료 (`main` `49648c9`) |

---

## 🔴 이번 주 필수 액션

| 기한 | 항목 | 상태 |
|------|------|------|
| 6/19 | E-E-A-T 페이지 + About + Author Box + Essay 1 + 핫픽스 | ✅ 라이브 (`49648c9`) — [`SESSION_CLOSURE`](docs/GSF_ARK_SESSION_CLOSURE_20260619.md) |
| 6/23 | (원계획) E-E-A-T 배포 | ✅ 6/19 조기 완료 |
| 7/초 | GSFArk AdSense 재제출 | ⏳ 대기 |
| 7/10~15 | tokyokorean.net Plan B 런칭 + AdSense 신청 | 🔄 AG 준비 중 |
| 매주 화/목 | 발행 목표 주 2회 유지 | 🔄 진행 중 |

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
| 재제출 예정 | 7월 초 (E-E-A-T 페이지 + Essay 1 배포 후) |
| GSC 색인 큐 | ✅ Day 1–6 **49/49** 요청 완료 (Joseph, 6/24) — Coverage 1~2주 후 재확인 |
| GSC 색인 추세 | ⚠️ 116개 기준 — 큐 반영 후 1~2주 뒤 재측정 |

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

## ✍️ E-E-A-T Essay 파이프라인 (브랜치·배포 SSOT)

> **Claude §7A:** Ark·Essay·AdSense 관련 세션 시 **이 블록 필수**. `main`에 파일이 없어도 **브랜치에 초안이 있을 수 있음** — conversation_search·Relevant chats로 「미작성」 추론 금지.

| 편 | slug | 배포 예정 | 상태 | 브랜치 | 커밋 (validate) | 본문 경로 (브랜치 기준) |
|----|------|-----------|------|--------|-----------------|-------------------------|
| Essay 1 | `buying-property-japan-surprises-foreign-investor` | 6/19 ✅ | ✅ 라이브 + GSC (`main`) | `main` | `49648c9` | `src/data/blog/{en,ja,ko}/buying-property-japan-surprises-foreign-investor.md` |
| Essay 2 | `buying-property-japan-checklist-before-you-commit` | 6/24 ✅ | ✅ 라이브 + GSC (`main`) | `main` | `99520f4` | [KO](https://gsfark.com/ko/posts/buying-property-japan-checklist-before-you-commit/) · `draft: false` |
| Essay 3 | `why-i-chose-nihonbashi` | **6/26** | ✅ 라이브 (`main`) | `main` | `99520f4` (merge) | [KO](https://gsfark.com/ko/posts/why-i-chose-nihonbashi/) · `draft: false` |

**다음 액션:**
1. ~~Essay 2 배포~~ ✅ 6/24 AG (`99520f4`, pubDatetime hotfix `99b4e78`)
2. ~~Essay 2 GSC~~ ✅ 6/24 Joseph (EN/KO/JA 3 URL)
3. ~~Essay 3 (6/26):~~ ✅ 6/25 AG 배포 (`draft: false` + `validate:post` + `4ace7f7`)

---

## ✍️ 콘텐츠 발행 현황

| 항목 | 값 |
|------|-----|
| 발행 목표 | 주 2회 이상 (화/목) |
| 현재 총 발행 수 | 38기 (Essay 2 포함, 2026-06-24) |
| 소셜 자동 배포 | ✅ 정상 가동 중 |
| 언어 | 日/韓/英 3언어 |

---

## 📈 과제 로드맵 (우선순위 순)

| 순위 | 과제 | 상태 | 비고 |
|------|------|------|------|
| 1 | AdSense 계정 활성화 | 🔄 진행 중 | Plan A(GSFArk 재제출) + Plan B(tokyokorean.net) 병행 |
| 2 | tokyokorean.net 런칭 | 🔄 AG 준비 중 | 7/10~15 목표 |
| 3 | GSC 색인 큐·Coverage | ✅ 큐 49/49 완료 | 1~2주 후 Coverage 재확인 · Essay 2·3 6건은 7/4~9 |
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
| 6/29~30 | GSFArk AdSense 재제출 (목사님 직접) |

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
### 2026-06-25
- **Essay 3 라이브** — `why-i-chose-nihonbashi` KO/EN/JA (`draft: false` 전환 및 배포, 커밋 `4ace7f7`)

### 2026-06-24
- **GSC 색인 생성 요청 큐 종료** — Day 1–6 **49/49** 완료 (Joseph)
- **Ep08 라이브** — `tokyo-adachi-katsushika-edogawa` KO/EN/JA 배포 완료 (Joseph 확인)
- **Ep08 SNS 완료** — X EN/Threads EN·KO/LinkedIn EN·KO 전 플랫폼 게시 완료
- **E-E-A-T + Essay 1 GSC 색인** — Joseph Day 2 큐 완료 (author/contact/mission/methodology + Essay 1)
- **Essay 2 라이브** — `buying-property-japan-checklist-before-you-commit` KO/EN/JA (`99520f4` merge + publish, `99b4e78` pubDatetime)
- Essay 2 조기 배포 및 pubDatetime 수정
- 미래 시간 포스트 노출 누락 방지 KI 규칙 추가
- URL: https://gsfark.com/ko/posts/buying-property-japan-checklist-before-you-commit/
- **Essay 2 GSC 색인** — Joseph EN/KO/JA 3 URL 요청 완료
- Essay 3는 `main`에 `draft: true` 유지 — **6/26** AG 배포 예정

### 2026-06-23
- GSF-Blog를 GSF-Ark로 명칭 변경
- Ep.08 SNS 초안 텍스트 및 UTM 파라미터 재단장 (Buffer 업그레이드 이슈 해결)
- X KO 포스팅 성공 및 LinkedIn Inspector 확인 내역 기록(sns-log.json 및 _handoff.md)
- sns-draft 검증 하드게이트(pnpm validate:sns-draft) 규칙 메모리 도입

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
- Phase 3 (urban-planning) 23구 데이터 파이프라인(XKT014
- XKT023
- XKT024
- XKT030
- XKT002) 구축 및 연동 완료
- 재개발 가능성(redevelopment-potential) 및 규제 환경(urban-constraints) 분석 스크립트 작성
- Benchmarks schema 1.9 판올림 및 research-pack 주입 로직 반영
- **Region Expansion (RE) 계획 확정** — Phase 4 이연, 파일럿 神奈川3+狛江1, `docs/REGION_EXPANSION_PLAN.md` (Cursor 계획·검증 / AG 슬라이스 구현)
- **Region Expansion (RE) 완료** — 인프라/API 범용화 성공, 파일럿 4구(横浜西区, 川崎中原区, 鎌倉, 狛江) 데이터 수집 및 E2E 검증 완료
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
