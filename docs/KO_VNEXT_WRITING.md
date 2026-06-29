# KO vNext — Hypothesis Layer 글 형식 (SSOT)

> **상태**: v1.1 (2026-06-29) · Ep.10 benchmark lock  
> **편집 철학**: [`JOSEPH_AUTHENTIC_VOICE.md`](./JOSEPH_AUTHENTIC_VOICE.md) §편집 철학  
> **워크플로**: [`REASONING_OS.md`](./REASONING_OS.md) · [`JOSEPH_AUTHOR_OPS.md`](./JOSEPH_AUTHOR_OPS.md) · [`BLOG_AG_CURSOR_WORKFLOW.md`](./BLOG_AG_CURSOR_WORKFLOW.md)  
> **레거시 형식** (Ep.01~09 등): [`Joseph_Blog_Writing_SOP.md`](../Joseph_Blog_Writing_SOP.md) §1 — Hypothesis Layer 파일럿(Ep.10~)은 **본 문서 우선**

---

## 적용 범위

- Hypothesis Layer 파일럿: Ep.10~15 ([`pilot/hypothesis-layer-pilot-slugs.json`](./pilot/hypothesis-layer-pilot-slugs.json))
- MLIT Tokyo 에피소드 KO (Cursor 초안 → 보이스 편집)
- 에세이도 동일 spine 사용 가능 (Evidence branch만 fact sheet)

**기준 글 (benchmark, locked)**: `src/data/blog/ko/tokyo-kokubunji-kunitachi-fuchu-tachikawa.md`

Ep.11~ 초안·편집본은 **구조·톤·독자 난이도**를 Ep.10과 비교한다. 「좋은 글」 여부보다 **기준 대비 일치**를 우선한다.

---

## 섹션 spine (순서 고정)

Ep.10 이후 **이 순서를 바꾸지 않는다**. 내용·표만 주제에 맞게 채운다.

```text
1. 프롤로그 (시리즈 맥락 1~2문단)
2. ## 먼저 결론          ← bullet 4~6개, Final insight 선행
3. ## 왜 이 글을 쓰는가   ← 선입견 → 검증 의도
4.   (+ 출발 가설 1~2문장, 무인칭 OK)
5. ## 처음 생각과 데이터가 바꾼 점
6.   출발 가설 + 확인 표 (트리거·관찰)
7. ## 목차
8. ## 1~N 본문          ← 시·주제별 표 + 해석
9. ## 같은 데이터, 다른 해석
10. ## 이런 분께 / 추천하지 않습니다
11. ## Joseph's View
12. (시리즈 링크·다음 편)
13. ## 데이터 기준 시점   ← 하단
14. <small> 면책
```

---

## 섹션별 작성 규칙

### 먼저 결론

- Decision Log **Final insight (one sentence)**를 bullet로 분해한다.
- 독자가 본문을 읽기 **전에** 핵심 판단을 안다.
- 수치는 manifest/research-pack에 있는 것만. n&lt;30 구간은 「방향」으로만.

### 왜 이 글을 쓰는가

- 흔한 **false assumption** 한 줄로 시작 (예: 「다마 = 싼 외곽」).
- **Question → Hypothesis** 흐름: 「정말 그럴까?」→ 「町名 단위로 확인했다」.
- 직후 **출발 가설 1~2문장** (무인칭). Joseph 1인칭은 Joseph 제공 시만.

### 처음 생각과 데이터가 바꾼 점

| 확인한 내용 | 데이터가 보여준 점 |
|-------------|-------------------|
| (핵심 수치·대비) | (가설과 충돌·수정 포인트) |

- 내부 Trigger·Decision Log와 동기화하되, **본문에는 독자용 표현만** 쓴다.
- **데이터가 먼저 나오지 않는다** — 표 제목이 「바꾼 점」임을 드러낸다.

### 본문 (시·주제별 블록)

- 표 앞에 **읽는 법** 한 줄 (시 평균 vs 町名 등).
- 시·구역마다 해석 라벨 **로테이션** (동일 문구 반복 금지):

| 예시 라벨 | 용도 |
|-----------|------|
| 여기서 주목할 점 | 예상 밖 고가·저가 |
| 예상과 달랐던 부분 | 소득≠가격 등 |
| 해석이 갈리는 지점 | 양면 해석 가능 |
| 데이터를 보며 인상이 바뀐 부분 | 시 평균 착시 깨짐 |

- **멈춤 문장** 2~3개/편: 「여기서 잠깐 멈춰 보겠습니다」 등 — 정보 추가가 아니라 독자가 따라오게 함.
- 표·건수 해석: 「역 도보 ○분」 단정 대신 **왜 町名 단위 데이터를 쓰는지** 한 줄로 설명 (Ep.10 본정 37건 예시).
- **허구 현장 금지**: 「가보니」「체감상」 없이 공개 자료·MLIT만.
- **내부 코드 금지** (독자 본문): T1/L1/베타/Decision Log 직접 인용 ❌

### 같은 데이터, 다른 해석

- 대안 읽기 1~2개 + **이번 표본에서 약한 이유** (금리·정책·시장 전체 흐름 등 성립 조건).
- 「반대 가설」 프레이밍 대신 **같은 데이터, 다른 해석** — 독자가 스스로 판단하도록 돕는다.

### 이런 분께 / 추천하지 않습니다

- 독자 self-selection. 투자 권유·후보군 push 금지 (Joseph Phase 2 톤).

### Joseph's View

```markdown
> 데이터를 검토하며 정리한 **판단**입니다. 현장담·허구 경험은 포함하지 않습니다.

**이번 글을 정리하며** — 붙잡았던 질문 → 자료 대조 → 생각 변화
**앞으로도 유지하려는 읽기**
**아직 확신하기 어려운 부분** (n<30 등)
**독자분들께 권하는 확인 순서** (체크리스트)
**한 줄로 정리하면** — Final insight echo (필수)
```

- **사고 과정**이 드러나야 한다 (질문 → 데이터 → 답이 달라짐).
- Decision Log 요약만이 아니라 **앞으로의 읽기 원칙** 한 줄 포함.
- 1인칭은 Joseph 톤 유지 · **과하지 않게** (편당 2~3회 목표).

### 데이터 기준 시점

- 표로 기준일·출처 명시 (본문 상단이 아닌 **하단**).
- `citeSources` frontmatter와 일치.

---

## 톤 · 형식

- **합니다체** (`pnpm validate:post` ko-formal-tone).
- 단정·보장형 금지 (SOP §2 · `반드시` 등 adsense-risky-claims).
- 인구·소득: **참고 자료**로 쓰고, 가격 설명의 주역으로 두지 않음.
- 표면 Yield: 구조 비교용, 투자 권유 아님 명시.
- KO 본문 **4,000자 이내** (면책 제외, `ko-length-target`).
- 표현 순환: 동네 · 입지 · 생활권 · 지역 · 벨트 — 한 표현만 반복하지 않음.

편집 철학 4원칙: [`JOSEPH_AUTHENTIC_VOICE.md`](./JOSEPH_AUTHENTIC_VOICE.md) §편집 철학

---

## 보이스 편집 체크리스트 (Ep.10 기준 · 발행 전)

- [ ] Ep.10 benchmark와 **방향·밀도** 비교
- [ ] 데이터가 주인공 (에세이 30%화 아님)
- [ ] 사고 과정 2~3곳 (처음 생각 → 바뀜)
- [ ] 멈춤 문장 2~3개
- [ ] 내부 코드·번역투 없음
- [ ] Joseph's View에 「왜 이 데이터를 봤는가」
- [ ] `pnpm validate:post <slug>` exit 0

---

## Phase 4 체크리스트 (KO 초안 완료 전)

Decision Log · manifest 대조:

- [ ] `pnpm verify:decision-log --slug <slug>` exit 0
- [ ] vNext spine §1~13 순서 준수
- [ ] Final insight → 「먼저 결론」+ Joseph's View 「한 줄」 echo
- [ ] Trigger 표 = Phase 2 Trigger
- [ ] manifest claims 수치만 (창작 없음)
- [ ] 본문에 evidence 흐름(시 평균 → 町名 → 맥락)이 드러남
- [ ] 허구 현장 없음 (없으면 명시적 disclaimer)
- [ ] 보이스 편집 체크리스트 통과
- [ ] `draft: true` · `gates.draft_started: true`

## Phase 4-A (Joseph Authenticity)

- [ ] Joseph 승인일 decision-log `Authenticity pre-check` 기록
- [ ] narrative lock 시 구조 변경 없이 발행 게이트만 진행

---

## 발행 전 (구조 외)

KO narrative lock ≠ 발행. 아래는 별도:

- manifest `claims` · `manifest_approved_by`
- hero webp + og jpg · `verify:og-social`
- `docs/fact-audit/<slug>.md`
- `pnpm validate:post <slug>` exit 0

---

## Ep.10에서 잠근 원칙 (변경 금지)

### 편집 철학 (중심축)

1. 데이터를 존중한다  
2. 사고 과정을 숨기지 않는다  
3. 독자가 스스로 판단하도록 돕는다  
4. 사람의 온도는 과장하지 않는다  

### 구조·운영

5. 결론 선행 — 데이터 끝에 결론 ❌  
6. 가설 → 데이터 → 수정 — 분석의 긴장감  
7. Joseph's View + 한 줄 echo — 브랜드 앵커  
8. 큰 구조 반복 — Ep.11~ 동일 spine  
9. Ep.10 = **기준 글** — 이후 편은 Ep.10 대비 품질·방향 검수  
10. Cursor 초안 + 보이스 편집 — 초안만으로 발행 ❌
