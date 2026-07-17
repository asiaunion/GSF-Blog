# §1–4 SEO 스프린트 — 작업 지시서 (2026-07)

> **작성**: Cursor · 2026-07-17  
> **상태**: 🟢 Joseph 지시 · 복수 에이전트 실행용  
> **SSOT 상위**: [`CONTENT_PUBLISHING_PROCESS_2026-07.md`](./CONTENT_PUBLISHING_PROCESS_2026-07.md) **§0.1 HARD/FLEX**  
> **글쓰기 규칙**: [`SEO_WRITING_GUIDE_2026-07.md`](./SEO_WRITING_GUIDE_2026-07.md) §1–§6  
> **배경**: [`ADSENSE_APPROVAL_PLAYBOOK_2026-07.md`](./ADSENSE_APPROVAL_PLAYBOOK_2026-07.md) · 게이트 A는 **재신청 직전** 판정 — 본 스프린트는 **그 전까지** §1–4 표면을 고치는 작업

---

## 0. Joseph용 한 페이지 요약

### 이 스프린트가 하는 일

기존 글 **52편 전체를 다시 쓰는 것이 아닙니다.**  
각 글에서 **검색자가 먼저 보는 표면 4가지**만 “검색자의 언어”로 맞춥니다.

| § | 무엇 | 예 |
|---|------|-----|
| **1** | 진단 | “완전 분석/정복” = 판매 언어 → 검색어(부촌·아파트·특징)가 title에 없음 |
| **2** | **title** | `세타가야구 부촌은 어디인가 — 메구로·세타가야 집값과 주거 환경 [2026]` |
| **3** | **도입 ~200자** | 첫 1–2문장 = 타깃 쿼리에 대한 **직답**(지명·숫자·기준일). 그다음부터 기존 논지 |
| **4** | **H2 3–5개** | SERP·네이버에서 수집한 **질문형 소제목** (장식용 소제목 금지) |

**건드리지 않는 것 (HARD):** 본문 spine·데이터 표·가설·citeSources·slug/URL·허브 배치.

### Joseph가 실제로 하는 일

1. 에이전트가 채워 둔 **브리프/초안**에서 title·도입·H2를 **채택/수정/기각** (빈칸에서 쓰지 않음)  
2. 도입에 **경험 디테일 1개**만 주입 (에이전트가 “여기 필요”라고 표시한 곳)  
3. **루브릭 5문항** Yes 확인 (§5)  
4. AG 반영·배포 후 **네이버 HTML 붙여넣기·발행** (그 주 손댄 slug 우선)  
5. **AdSense 재신청은 하지 않음** — 게이트 통과 전까지

### 편수·속도

**주 N편 상한 없음 (FLEX).** 여력·복수 에이전트·스프린트 창에 맞게 가속 가능.  
다만 **재신청 직전 ~2주**에는 title·표면 **대량** 변경 금지, **하루 수십 편 일괄** 금지.

---

## 1. §1–4가 무엇인지 (에이전트 공통 정의)

### 1.1 “신 SEO 전략”의 핵심

**옛 습관:** 글을 다 쓴 뒤 문학적·은유형 title → GSC 평균순위 ~63, “완전 분석” 15편.  
**새 습관:** **이길 쿼리**를 먼저 정하고 → title·도입·H2를 **검색자가 타이핑한 단어**로 맞춘 뒤 → 기존 본문 데이터는 그대로 둔다.

### 1.2 파일에서 손대는 위치

| 항목 | 파일 위치 | 비고 |
|------|-----------|------|
| title | frontmatter `title:` | H1으로 렌더 — title=H1 정합 |
| meta | frontmatter `description:` | title과 동시 갱신 권고 |
| 도입 | frontmatter `---` **직후** 본문 첫 1–3문단 | ~200자(한글 감각 2–4문장) |
| H2 | 본문 `## …` 줄 | 3–5개를 질문형으로. **해당 ## 아래 본문 절은 기본 유지** |
| modDatetime | frontmatter | 반영 시 JST로 갱신 |
| EN | `src/data/blog/en/{slug}.md` | KO 확정 후 **같은 세션** 정합(직역 톤 조정) |
| JA | 기존 URL만 · 신규 금지 | KO 선행 · 여력 시 |

**KO 원고 경로:** `src/data/blog/ko/{slug}.md`

### 1.3 본문을 “안 고친다”의 정확한 의미

- ✅ title / description / 도입 앞부분 / ## 제목 줄(질문형 H2)  
- ✅ H2 **아래** 2–4문장 **추가**는 여력 시만 (기본 트랙 아님)  
- ❌ 섹션 전체 재서술 · 표·수치 새로 창작 · spine(논지 구조) 전면 교체  
- ❌ risky-claims를 더 키우는 권유·보장 표현

---

## 2. HARD / FLEX (위반 시 중단)

### HARD — 반드시 지킬 것

1. 범위 = §1–4 표면 (위 표). 본문 전면 재작성 금지.  
2. 재신청 직전 **~2주**: title·도입·H2 **대량** 변경 중지.  
3. **하루·한 배치**에 수십 편 동시 `modDatetime` 금지 (며칠에 나눠 배포).  
4. YMYL: title·도입·H2에 **추천/사야/확실/무조건/살 것인가** 류 신설 금지.  
5. slug·URL·category·허브 재배정 금지.  
6. JA **신규** 페이지 금지 · AdSense **재신청** 금지 (Joseph 명시 전).  
7. 우선순위: **GSC 실측 G → Sprint 백로그 #1–#10 → 백필 #11+** (아무 글이나 무작위 X).

### FLEX — 팀이 정해도 되는 것

- 주당 몇 편 · 배치 vs 매일 1편 · Claude/GPT 초안 비율  
- §1–4를 **한 패스에 전부** 할지, title만 먼저 할지 (기본 = **한 패스 번들** 권장)  
- EN/JA를 같은 날 할지 다음 날 할지  

---

## 3. 우선순위 큐 (스프린트 순서)

### Tier 0 — 최우선 (GSC 실측, 코호트 G)

| 순 | slug | 타깃 쿼리 (Week 0) | GSC 힌트 |
|----|------|-------------------|----------|
| G1 | `tokyo-meguro-setagaya` | 세타가야구 부촌 / 메구로 세타가야 집값 | A대역 ~24위 |
| G2 | `tokyo-shinagawa-ota` | 오타구 아파트 / 오타구 시나가awa 집값 | 노출 13 · ~30위 |
| G3 | `tokyo-ward-guide-series-prologue` | 도쿄 23구 특징 / 23구 집값 비교 | ~50.5위 |

> 네이버 초안: `naver-drafts/{slug}-naver.html` — **HTML** 붙여넣기. `prologue` 초안에 placeholder 있으면 **Joseph 확인 전 게시 금지**.

### Tier 1 — Sprint 백로그 (게이트·미색인·네이버 앵글)

| # | slug | 비고 |
|---|------|------|
| 1 | `japan-shinchiku-vs-chuko-mansion-investor-guide` | risky-claims + §1–4 (일부 W1-A 반영됐을 수 있음 — **잔여 title/도입/H2만** 점검) |
| 2 | `korea-japan-inheritance-gift-tax-cross-border-basics` | 미색인 · 세무 클러스터 |
| 3 | `tokyo-hachioji-hino-akishima` | 미색인 · 네이버 초안 **있음** |
| 4 | `tokyo-real-estate-investment-complete-guide` (+ 절차 의도 분리) | 허브-상세 — title 의도 분리 위주 |
| 5 | `buying-property-japan-checklist-before-you-commit` | 구매 의도 |
| 6 | `tokyo-korean-community-beyond-shinokubo` | 네이버 ◎ |
| 7 | `tokyo-moving-contracts-two-notes` | tokyoLife |
| 8 | `korea-resident-japan-property-capital-gains-tax` | #2 클러스터 |
| 9 | `tokyo-office-vacancy-five-wards-2026` | 데이터 신선도 |
| 10 | `nihonbashi-hamacho-walking-guide` | 허브 앵커 |

### Tier 2 — 백필 큐

[`CONTENT_SEO_STRATEGY_2026-07.md`](./CONTENT_SEO_STRATEGY_2026-07.md) 부록 C (#11–#20). Tier 0·1 소진 후.

### 면제

- **essay** 트랙: §1–4 강제 안 함. title 고유명사 ≥1 + 내부링크 ≥2만.  
- 관광 legacy 4편: 방치 결정 유지.  
- 코호트 **S** (`T4` 전면 uniqueness): 본 §1–4 스프린트와 **별도** — 소수만.

---

## 4. 슬러그 1편 처리 — 표준 파이프라인

한 slug = **한 티켓**. 상태는 `docs/s14-sprint/STATUS.md`(없으면 AG가 생성) 또는 주간 브리프에 기록.

```
[선정] → [R1 정찰] → [초안 §2·3·4] → [Joseph 루브릭] → [AG KO 반영] → [EN 정합]
  → [validate] → [배포] → [색인·IndexNow] → [네이버 게시] → [원장 1줄]
```

### Step R0 — 선정 (Claude / GPT / AG)

**입력:** `docs/gsc/week0_queries_28d_2026-07-17.csv` · 백로그 표 · 이미 완료 slug 목록  
**출력:** `slug | 타깃 쿼리 1개 | 선정 근거 (GSC 대역/백로그 #) | 담당`

**규칙:** 한 slug에 타깃 쿼리 **1개**. C대역·쿼리 접점 0이면 큐에서 제외.

---

### Step R1 — SERP 정찰 (Claude / GPT / AG · 쿼리당 ~5분)

**Joseph:** 구글·네이버 검색 창만 열어 주면 됨 (선택).

1. 타깃 쿼리를 **한국 구글** + **네이버**에 실검색.  
2. 상위 10개 구성을 본다.  
   - **막힘:** 전부 세무법인·정부·대형 포털만 → **더 긴 꼬리**로 바꾸고 R1 반복.  
   - **열림:** 포럼·지식iN·낡은 PDF·의도 어긋난 글이 섞임 → 이 쿼리로 확정.  
3. 수집 (복사해 티켓에 붙임):  
   - Google PAA(함께 찾는 질문) · 하단 관련 검색  
   - 네이버 자동완성 · 연관 검색어 · 지식iN 질문 제목  

**출력 템플릿:**

```markdown
## R1 — `{slug}`
- 타깃 쿼리: "..."
- 정찰: 열림 / 막힘 — (상위 10 한 줄 요약)
- PAA: ...
- 네이버 연관: ...
- H2 후보 원문 4–5개: ...
```

---

### Step R2 — §1–4 초안 (Claude / GPT 주력 · AG 보조)

**반드시 읽을 것:** 해당 slug KO 파일 전체(도입·## 목록·본문 수치 위치). **수치는 본문·citeSources에 있는 것만** 도입에 사용.

#### §2 title — 2안 제시

공식: `[쿼리 명사구 전방] + [검색자가 얻는 것] — 상투 접미어 제거`

- KO ~30자 전후 · `[2026]` 유지 시 유효성 확인  
- "완전 분석/정복/가이드" **삭제**  
- Before / After ① / After ② 형식으로 제시  

#### §3 도입 — 직답 골격

```markdown
[문장1–2: 쿼리 질문에 대한 직답 — 고유명사·숫자·(기준일). 출처=본문 기존 데이터]
[문장3~: "다만/그런데"로 기존 spine 연결]
**[Joseph: 경험 디테일 — 구체 질문: "___"]**
```

- "그래서 어디인데?"가 나오면 **실패** — 다시 작성.  
- 논지만 앞세우고 답이 없으면 **실패**.

#### §4 H2 — 3–5개 질문형

- R1 수집물에서 고르기 (머리로 창작 금지).  
- 기존 `## 1. 目黒区` 같은 **번호형 제목**은 질문형으로 **이름만** 바꿀 수 있음.  
- **## 아래 단락·표는 기본 그대로.**

**출력:** 주간 브리프 형식 [`docs/templates/weekly-content-brief.md`](./templates/weekly-content-brief.md) §1 후보 블록에 맞춤.

---

### Step R3 — Joseph 승인 (Joseph)

| 체크 | Joseph |
|------|--------|
| 타깃 쿼리 | ☐ 채택 ☐ 교체 |
| title | ☐ ① ☐ ② ☐ 수정: ___ |
| H2 | ☐ 3–5개 선택 |
| 도입 | ✍️ 경험 1블록 주입 |
| 루브릭 §5 | ☐ 5문항 Yes (아래) |

**루브릭 5문항** ([`SEO_WRITING_GUIDE_2026-07.md`](./SEO_WRITING_GUIDE_2026-07.md) §5):

1. 도입 200자에서 **쿼리의 답**을 얻는가?  
2. 상위 3 대비 **나은 점 1문장** 말할 수 있는가? → 원장 비고에 기록  
3. title에 **검색어 명사 원형**이 있는가?  
4. H2만 훑어도 **하위 질문**에 답하는 구조인가?  
5. 단정·권유·보장 **0건**인가?

**하나라도 No → AG 반영 금지.** 초안 에이전트가 수정 후 재제출.

**캘리브레이션:** 백로그 #1·#2 또는 G1·G2 **첫 2편**은 Joseph 또는 Claude **대조 검수** 후 패턴 고정. AG 단독 title 확정 금지.

---

### Step R4 — KO 반영 (AG)

1. `src/data/blog/ko/{slug}.md` 수정: `title`, `description`, `modDatetime`, 도입, `##` H2 줄.  
2. `pnpm validate:post {slug}` — exit 0 (필요 시 `SKIP_TRUST_VERIFY=1`은 AG_TASK 기존 규칙 따름).  
3. `pnpm build` 스모크 (Joseph 배포 지시 시).  
4. **커밋/배포:** Joseph 명시 요청 시만.

**AG 금지:** slug 변경 · YMYL 강화 · 본문 표 전면 수정 · JA 신규 · git push 임의.

---

### Step R5 — EN 정합 (AG · 같은 티켓)

`src/data/blog/en/{slug}.md` — KO title/도입 **의미 정합**. 직역 톤 그대로 두지 말고 EN 검색자 문장으로.  
JA는 KO 배포 후 **여력 시** 기존 URL만.

---

### Step R6 — 배포 후 세트 (AG · Joseph 일부)

| # | 작업 | 담당 |
|---|------|------|
| 1 | GSC **URL 검색** → 색인 요청 (해당 slug만) | AG (Joseph GSC 로그인) |
| 2 | IndexNow ping | AG — [`docs/ops/INDEXNOW.md`](./ops/INDEXNOW.md) |
| 3 | `docs/gsc/naver_post_queue_YYYY-Www.md` 해당 slug **상단** | AG |
| 4 | 네이버 **HTML** 초안 확인 · UTM CTA | AG 준비 → **Joseph 발행** |
| 5 | 쿼리 원장 1줄 | AG |

**원장 1줄 형식:**

```text
{slug} | q="{타깃쿼리}" | §1-4 {date} | 다음점검 +14d | diff=(Joseph/AG)
```

**네이버 규칙:** 사이트 title ≠ 네이버 제목. CTA = **개별** `https://gsfark.com/ko/posts/{slug}/?utm_source=naver&utm_medium=blog&utm_campaign=blog-broadcast`  
**그 주 손댄 slug = 그 주 네이버** (게이트 A 레퍼럴 분자).

---

### Step R7 — Cursor 검증 (배포 후)

- HARD §0.1 준수 · YMYL · title–H1 정합 · 도입 수치=citeSources 대응  
- 네이버 초안 placeholder·홈 링크 CTA 없음  
- 문제 시 Joseph/AG에 **구체 diff** 반려 (재논의 아님 — 수정만)

---

## 5. 역할 분담표

| 역할 | 하는 일 | 하지 않는 일 |
|------|---------|--------------|
| **Joseph** | 쿼리·title·H2 **채택** · 도입 경험 1블록 · 루브릭 · 네이버 **발행 클릭** · GSC/GA4 **로그인** | 전편 직접 초안 · AdSense 재신청 · slug 변경 |
| **Claude (Chat)** | R1 정리 · §2–4 초안 2안 · 브리프 작성 · 백로그/G 큐 우선순위 제안 · Joseph 질문 답 | repo 직접 commit (Joseph/AG 경유) |
| **GPT** | R1·§2–4 **초안 초고** (Claude와 병렬 가능) · SERP 수집 초안 | title 단독 확정 · 정책 문서 임의 변경 |
| **AG** | KO/EN 파일 반영 · validate/build · 색인·IndexNow · naver 큐·초안 · 원장 · Joseph UI 단계 지시 | title Joseph 승인 없이 확정 · prod deploy 임의 |
| **Cursor** | HARD/FLEX 감시 · 배포 후 검증 · 지시서·Playbook 정합 · hub:log | 주간 브리프 매일 작성 (AG/Claude) |

**Handoff:** AG 완료 시 `_handoff.md` 또는 ACTIVITY_LOG **3–5줄 + refs** (장문 금지).

---

## 6. 실물 예시 — `tokyo-meguro-setagaya` (G1)

### Before (현재)

- **title:** `메구로·세타가야구 완전 분석: 도쿄 고급 주거 투자 가이드 [2026]`  
- **도입:** "조용하고 세련된 도쿄의 일상을 꿈꿀 때…" → **쿼리 "세타가야구 부촌"에 답 없음**  
- **H2:** `## 1. 目黒区(메구로구)` — 질문형·SERP 정합 아님  

### After (방향 — R1 후 Joseph 확정)

- **title (안):** `세타가야구 부촌은 어디인가 — 메구로·세타가야 집값과 주거 환경 [2026]`  
- **도입 (안):** "세타가야에서 전통적 부촌으로 꼽히는 ○○ 일대는 … (본문·citeSources 수치). 다만 구 전체 평균과 …"  
- **H2 (안):** `세타가야구는 살기 좋은가` / `세이조 일대 집값은 얼마인가` / `메구로와 세타가야 중 어디가 나은가`  
- **본문:** §1·§2 아래 **표·데이터 절 유지**

---

## 7. 진행 상태 보드 (AG 유지)

`docs/s14-sprint/STATUS.md` — slug별 상태:

| slug | tier | R1 | 초안 | Joseph | KO | EN | 배포 | 네이버 | 원장 |
|------|------|----|------|--------|----|----|------|--------|------|
| tokyo-meguro-setagaya | G1 | | | | | | | | |

상태값: `pending` · `r1` · `draft` · `joseph` · `merged` · `live` · `naver` · `done`

---

## 8. 완료 정의 (slug 1편)

- [ ] §2 title + description + modDatetime  
- [ ] §3 도입 직답 + Joseph 경험 (해당 시)  
- [ ] §4 H2 3–5 질문형 (본문 전면 X)  
- [ ] 루브릭 5문항 Yes  
- [ ] `pnpm validate:post {slug}` OK  
- [ ] (Joseph 지시 시) prod 배포  
- [ ] GSC 색인 요청 + IndexNow  
- [ ] 네이버 게시 URL 큐 기록  
- [ ] 원장 1줄  

**스프린트 전체 완료:** Tier 0 전부 + Tier 1 중 **Joseph·팀이 정한 목표 편수** (동결 ~2주 전까지 G·백로그·상투 title 잔여 우선).

---

## 9. 자주 하는 실수 (금지)

| 실수 | 올바른 처리 |
|------|-------------|
| 본문 2000자 다시 씀 | §1–4만 |
| 도입에 **새** 통계 창작 | 본문·citeSources만 인용 |
| title에 "완전 분석" 유지 | 삭제 + 쿼리 명사 전방 |
| 네이버 = 사이트 title 복사 | 네이버는 **별도 제목** · HTML CTA |
| FAQ·내부링크를 **별도 프로젝트**로 | 같은 세션 번들 OK · 본 지시서 **필수 아님** |
| 게이트 전 AdSense 재신청 | **금지** |
| prologue naver placeholder 그대로 게시 | Joseph 확인 후 |

---

## 10. 관련 문서 · 파일

| 문서 | 용도 |
|------|------|
| [`CONTENT_PUBLISHING_PROCESS_2026-07.md`](./CONTENT_PUBLISHING_PROCESS_2026-07.md) §0.1 | HARD/FLEX SSOT |
| [`SEO_WRITING_GUIDE_2026-07.md`](./SEO_WRITING_GUIDE_2026-07.md) | §2–§5 실행·루브릭 |
| [`CONTENT_SEO_STRATEGY_2026-07.md`](./CONTENT_SEO_STRATEGY_2026-07.md) 부록 C | 백필 #11+ |
| [`SEO_SPRINT_PROPOSAL_2026-07.md`](./SEO_SPRINT_PROPOSAL_2026-07.md) §4.2 | 백로그 #1–#10 |
| [`docs/templates/weekly-content-brief.md`](./templates/weekly-content-brief.md) | 주간 티켓 형식 |
| [`docs/gsc/naver_post_queue_2026-W29.md`](./gsc/naver_post_queue_2026-W29.md) | 네이버 큐 (주차별 복제) |
| [`AG_TASK_2026-07-17_adsense-phase-a-week1.md`](./AG_TASK_2026-07-17_adsense-phase-a-week1.md) | W0·게이트 필수·색인 |

---

## 11. 에이전트 부트 한 줄

> **§1–4 스프린트:** G1→G2→G3 → 백로그 순. slug당 R1→초안→Joseph 루브릭→AG KO/EN→배포→네이버. **본문 전면 금지.** 편수 FLEX. SSOT=PROCESS §0.1 + WRITING_GUIDE.
