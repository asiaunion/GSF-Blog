# GSF-Ark — Weekly Status

---

## [HUB] 프로젝트 요약 (전체 현황판용 공통 필드)

| 필드 | 값 |
|------|-----|
| 최종 업데이트 | 2026-07-17 |
| 프로젝트명 | GSF-Ark |
| 상태 | 🟢 AdSense 7/7 재보류 — **D-001 Cursor 확정**: 게이트A/B·네이버주력·JA신규동결·Phase A′. Playbook+SEO_SPRINT |
| 목표 + 기한 | Phase A′ 4주(refresh70/네이버) → ~8/12 게이트A 판정 |
| 이번 주 최우선 액션 | ① Week0 GSC 부트스트랩 ② 백로그#1 risky-claims+네이버 ③ 내부링크0 7편 ④ Joseph: 네이버SA·Bing |
| 다음 체크포인트 | 2026-08-12 게이트 A/B · JA soft sunset 여부 |
| 블로커 | hreflang 방어 배포 전 KO+EN 전용 신규 금지 (방어 코드 착수됨) |

---

## 📌 미결 백로그 — Joseph 다음 착수 (2026-07-06 저장)

> **SSOT:** textlint 로드맵 [`docs/JA_TERMINOLOGY.md`](docs/JA_TERMINOLOGY.md) · 전수 교정 [`GSF-OS/AG_TASK_ark-trilingual-proofread-20260705.md`](../GSF-OS/AG_TASK_ark-trilingual-proofread-20260705.md)  
> **완료:** KO Phase 1 · JA LLM Phase 3 · JA textlint **Wave 0–7** (main `736685b`, prod 반영)  
> **일시 중단:** Joseph 지시 — 추후 순서대로 재개

| 우선 | 과제 | 규모·조건 | 담당 | 상태 | SSOT |
|:---:|------|-----------|------|------|------|
| **1** | **JA textlint Wave 8** — `no-mix-dearu-desumasu` | ~**285건** · 블로그 です/ます 톤 혼용 · **`preferInList` 옵션 Joseph 협의 선행** | Joseph → AG → Cursor | 🔜 미착수 | `JA_TERMINOLOGY.md` Wave 8 |
| 2 | JA textlint Wave 9 — `max-ten` · `sentence-length` · `max-kanji-continuous-len` | ~17 + ~55 + TBD · **완화 옵션** 검토 후 활성화 | AG → Cursor | 🔜 미착수 | `JA_TERMINOLOGY.md` Wave 9 |
| 3 | EN Phase 2 전수 교정 | 50편 · codespell CI + LLM 배치 10×5 | AG → Cursor | 🔜 미착수 | `feat/proofread-en-batch-1` · `PROOFREAD_REPORT_EN_20260705.md` |
| 4 | KO soft terminology 확정 | lint **103건** soft warning → Joseph 확정 후 hard 전환 여부 | Joseph | 🔜 미착수 | `docs/KO_TERMINOLOGY.md` |
| 5 | hero OG JPEG 42건 생성 및 참조 갱신 | 본문 무변경, ogImage 1줄 수정 | AG → Cursor | ✅ 완료 | `chore/hero-og-jpeg` |
| — | textlint **의도적 미활성** | `ja-no-weak-phrase` · `no-exclamation-question-mark` — Joseph 톤 충돌 | — | ⏸ 보류 | `JA_TERMINOLOGY.md` |

**Joseph 한 줄 재개:** `GSF-Ark JA textlint Wave 8 착수` (톤 협의 후) 또는 `EN Phase 2 착수`

---

## 🔴 이번 주 필수 액션

| 기한 | 항목 | 상태 |
|------|------|------|
| 6/19 | E-E-A-T 페이지 + About + Author Box + Essay 1 + 핫픽스 | ✅ 라이브 (`49648c9`) — [`SESSION_CLOSURE`](docs/GSF_ARK_SESSION_CLOSURE_20260619.md) |
| 6/23 | (원계획) E-E-A-T 배포 | ✅ 6/19 조기 완료 |
| 7/2 | GSFArk AdSense 재제출 | ✅ 완료 — 검토 요청 제출 완료, 결과 대기 중 |
| 7/10~15 | tokyokorean.net Plan B 런칭 + AdSense 신청 | ⏸ **보류** — D-001 게이트B(70%색인+유입2주) 전 신청 안 함 |
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

## 📋 AdSense 현황 (2026-06-30 재확인)

| 항목 | 상태 |
|------|------|
| 신청 횟수 | 5차 (조치 필요 통보 수신, 6건 전수 확인 — 5/11、6/15 동일 정형 템플릿, 구체 사유 비공개) |
| 기술 결함 | ✅ 전부 해소 (admin sitemap, consent-gate, ads.txt) — **6/30 라이브 직접 재확인 완료** |
| GSC 404 54건 | ✅ 전부 레거시 URL(tags/resources/PDF) — 6/21 이미 redirect/410 처리, 유효성검사 진행 중 |
| 재제출 상태 | **7/2 제출 완료** — 결과 대기 중 |
| GSC 색인 큐 | ✅ Day 1–6 **49/49** + Essay 3 EN/KO/JA **3/3** (Joseph, 6/26) |
| GSC 색인 추세 | ⚠️ 개요화면 6/12 스냅샷 기준(116개) — 실제 최신값은 더 높을 가능성, 큐 반영 후 1~2주 뒤 재측정 |

> **2026-06-30 Claude 점검 SSOT**: `_handoff.md` [2026-06-30] Claude — 7/3 AdSense 재제출 전 최종 점검 블록 (라이브+GSC+Gmail 전체 증거)

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
| Essay 3 | `why-i-chose-nihonbashi` | 6/25 ✅ | ✅ 라이브 + 홈·목록 + GSC (`main`) | `main` | `4ace7f7` | [KO](https://gsfark.com/ko/posts/why-i-chose-nihonbashi/) · `draft: false` |

**다음 액션:**
1. ~~Essay 2 배포~~ ✅ 6/24 AG (`99520f4`, pubDatetime hotfix `99b4e78`)
2. ~~Essay 2 GSC~~ ✅ 6/24 Joseph (EN/KO/JA 3 URL)
3. ~~Essay 3 배포~~ ✅ 6/25 AG (`4ace7f7`)
4. ~~Essay 3 홈·목록 노출~~ ✅ 6/26 Joseph 확인 (`pubDatetime` 10:00 JST)
5. ~~Essay 3 GSC~~ ✅ 6/26 Joseph (EN/KO/JA 3 URL)

---

## ✍️ 콘텐츠 발행 현황

| 항목 | 값 |
|------|-----|
| 발행 목표 | 주 2회 이상 (화/목) |
| 현재 총 발행 수 | 39기 (Essay 3 포함, 2026-06-25) |
| 소셜 자동 배포 | ✅ 정상 가동 중 |
| 언어 | 日/韓/英 3언어 |

---

## 📈 과제 로드맵 (우선순위 순)

| 순위 | 과제 | 상태 | 비고 |
|------|------|------|------|
| 1 | AdSense 계정 활성화 | 🔄 진행 중 | Plan A(GSFArk 재제출) + Plan B(tokyokorean.net) 병행 |
| 2 | tokyokorean.net 런칭 | 🔄 AG 준비 중 | 7/10~15 목표 |
| 3 | GSC 색인 큐·Coverage | ✅ Essay 3 GSC 완료 (6/26) | Coverage 1~2주 후 재확인 |
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
| 7/3 | GSFArk AdSense 재제출 (목사님 직접) |

---

## 🗂️ 관련 문서

| 문서 | 용도 |
|------|------|
| `docs/AG_TASK_2026-06-15_adsense-sitemap-fix.md` | sitemap admin 제거 AG 지시서 |
| `docs/AG_TASK_2026-06-15_planb-tokyokorean.md` | Plan B tokyokorean.net AG 지시서 |
| `docs/AG_TASK_2026-06-19_adsense-pages.md` | E-E-A-T 페이지 추가 + About 수정 + Author Box AG 지시서 |
| `docs/GSF_ARK_SESSION_CLOSURE_20260625.md` | **2026-06-25 세션 마감** — Essay 3 검증 + AdSense·Topic Hubs |
| `docs/AG_TASK_2026-06-19_deploy-bundle.md` | E-E-A-T + essay 통합 배포 번들 |
| `docs/kpi-archive/` | 주간 KPI 기록 (확정 후 운영) |
| `docs/REGION_EXPANSION_PLAN.md` | RE 트랙 — 지역 SSOT 일반화·수도권 파일럿 AG 슬라이스 |
| `docs/REGION_EXPANSION_AG_RUNBOOK.md` | RE AG 실행 runbook (단계별 §RE-N 착수) |

---

## 📝 작업 로그
### 2026-07-10
- 하단 풋터 Minimal Edition v2~v3 적용
- Ep.11 SNS 초안 5건 생성 완료
- social-broadcast 스킬 언어별 URL 하드 게이트 추가
- hero OG JPEG 42건 생성 및 참조 갱신 완료
- Related Posts 요약 제거 및 축소
- About the Author 및 소셜/구독 링크 2단 배치
- 댓글 박스 상하 여백 최소화

### 2026-07-09
- 하단 댓글 박스 여백 축소
- 작성자 프로필 타이틀 복원 및 이전글/다음글 논리 수정
- 하단 UI 뉴스레터 폼 축소 및 링크 재정렬
- Global Footer 정리
- 하단 UI 미세 조정
- 하단 UI 박스 폭 축소 버그 수정
- 하단 UI 우측 3열 스택 및 상하 여백 축소 배포
- 하단 UI 그리드 레이아웃 적용 배포 완료
- Minimal v3 하단 UI 미세 조정 배포 완료
- Post Footer Minimal v3 라이브 배포
- Post Footer Minimal v2 라이브 배포
- Ep.11 3언어 배포 완료
- Ep.11 3언어 배포 완료

### 2026-07-06
- JA textlint Wave 7 main merge + prod deploy
- JA textlint Wave 6 main merge + prod deploy
- JA textlint Wave 5 main merge + prod deploy
- Layer 3 lint-language.mjs — KO/JA/EN CI·validate 연동 (5745c19)
- Phase 3 JA 50/50 main merge + Vercel production deploy (30c95bb → gsfark.com)
### 2026-07-05
- Phase 2 EN 50/50 main merge + Vercel production deploy (1862e38 → gsfark.com)
- Phase 1 KO 50/50 main merge + Vercel production deploy (4f6ef2d → gsfark.com)
- Phase 0 proofread main merge·prod deploy
- 양도세 에피소드 출처 정밀 수정 및 본문 단순화 완료
- SNS Voice v1.0 톤앤매너 정밀 교정 적용 및 validate:sns-draft 통과

### 2026-07-04
- Where to Live 프롤로그·pending 문구 prod 배포 확인
- 양도세 에피소드 KO/EN/JA prod 배포
- Phase1~3 태그 직링크·taxonomy prod 배포
- Phase 1~3 태그 직링크 및 taxonomy 린트 배포 완료
- GSC 태그 리디렉션 루프 수정 prod 배포

### 2026-07-02
- AdSense 재제출 완료 (7/2)
### 2026-07-01
- Buttondown RSS Draft 자동화 파이프라인 구축 완료 (최근 7일 포스트 번들링
- GitHub Actions 연동)
- 뉴스레터 Final Copy 템플릿 문구 반영 (Data-first 톤 유지)
### 2026-06-30
- Buttondown 뉴스레터 템플릿 최종 문구(Final Copy) 반영
- Buttondown RSS Draft 마이너 버그 픽스 및 핸드오프 정리
- Buttondown RSS Draft 템플릿 적용
- Cursor 검증 피드백 반영 (Buttondown RSS Draft)
- Ep.10 3언어 배포·SNS 초안·AdSense 점검 완료
- EN/JA 번역 및 피드백 수정
- Ep.10 SNS Voice v1.0 최종 확정 초안 반영 및 로컬 백업 저장
- SNS Voice v1.0 규칙 및 프롬프트 가이드 문서화
- Astro 타임존 렌더링 버그 수정
- Ep.10 실시간 릴리스 배포 및 dossier:ward 데이터 적재
- 7/3 AdSense 재제출 전 최종 점검(Claude) — 라이브(ads.txt·sitemap·robots.txt·AdSense 스크립트)·GSC(색인 536건 사유·404 54건)·Gmail(GSC 알림 34건+AdSense 거절메일 6건 전수) 직접 확인, 결함 0건

### 2026-06-28
- Ep09 배포 완료 · Ep10 KO 초안 완료 (Cursor 6/28)
### 2026-06-27
- Social Broadcast: buying-property-japan-checklist-before-you-commit (X/LinkedIn/Threads 초안 생성 및 저장)
- 도쿄 에피소드 9 (무사시노·미타카·조후) 초안 및 EN/JA 번역 파일 생성
- Hero/OG 이미지 생성
- PKM Ward 카드 링크 업데이트
### 2026-06-26
- **Essay 3 홈·목록 노출** — Joseph 확인 (`why-i-chose-nihonbashi` EN/KO/JA)
- **Essay 3 GSC 색인** — Joseph EN/KO/JA 3 URL 색인 생성 요청 완료

### 2026-06-25
- **Topic Hubs 큐레이션** — `topicHubs.ts` 대표 글 12편 교체 · 커밋 `75a1930` · EN/KO/JA `/topics/` 라이브 검증
- **AdSense 준비 (Cursor)** — Privacy Policy 날짜 6/25 갱신 (`fc1e83b`) · ads.txt GSC URL 검사 = 사이트 문제 아님 확인 · **재제출일 7/3 합의**
- **Essay 3 라이브** — `why-i-chose-nihonbashi` KO/EN/JA (`draft: false` 전환 및 배포, 커밋 `4ace7f7`, `bbd58dd`)
- Zoho Mail JP Lite 도입 (Forever Free 일본 지원 종료 확인)
- contact@gsfark.com 생성 및 수발신 검증
- OnlyDomains DNS에 MX/SPF/DKIM/DMARC 레코드 설정 완료
- **Cursor 검증 완료** — `validate:post` 100·`verify:og-social` PASS · EN/KO/JA URL 200 · Vercel Production Ready · [`SESSION_CLOSURE`](docs/GSF_ARK_SESSION_CLOSURE_20260625.md)
- **홈·목록 노출** — `pubDatetime` 6/26 10:00 JST 스케줄 (직접 URL 접근 200, 목록·RSS는 6/26 이후)
- Essay 3 (why-i-chose-nihonbashi) KO/EN/JA draft: false 변경 및 6/25 날짜 적용 완료
- validate:post 검증 성공 (100점)
- WEEKLY_STATUS.md 및 _handoff.md 배포 내역 갱신

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
