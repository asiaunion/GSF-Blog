# KO vNext — Hypothesis Layer 글 형식 (SSOT)

> **상태**: v1.0 (2026-06-27) · Ep.10 검증·Joseph 확정  
> **워크플로**: [`REASONING_OS.md`](./REASONING_OS.md) · [`JOSEPH_AUTHOR_OPS.md`](./JOSEPH_AUTHOR_OPS.md)  
> **레거시 형식** (Ep.01~09 등): [`Joseph_Blog_Writing_SOP.md`](../Joseph_Blog_Writing_SOP.md) §1 — Hypothesis Layer 파일럿(Ep.10~)은 **본 문서 우선**

---

## 적용 범위

- Hypothesis Layer 파일럿: Ep.10~15 ([`pilot/hypothesis-layer-pilot-slugs.json`](./pilot/hypothesis-layer-pilot-slugs.json))
- MLIT Tokyo 에피소드 KO (Cursor 초안)
- 에세이도 동일 spine 사용 가능 (Evidence branch만 fact sheet)

**참조 초안 (locked)**: `src/data/blog/ko/tokyo-kokubunji-kunitachi-fuchu-tachikawa.md`

---

## 섹션 spine (순서 고정)

Ep.10 이후 **이 순서를 바꾸지 않는다**. 내용·표만 주제에 맞게 채운다.

```text
1. 프롤로그 (시리즈 맥락 1~2문단)
2. ## 먼저 결론          ← bullet 4~6개, Final insight 선행
3. ## 왜 이 글을 쓰는가   ← 선입견 → 검증 의도
4.   (+ 출발 가설 1~2문장, 무인칭 OK)
5. ## 처음 세운 가설과 데이터가 바꾼 점
6.   Initial assumption + Trigger 표
7. ## 목차
8. ## 1~N 본문          ← Evidence L1→L2→L3
9. ## 반대 가설과 그 한계
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

### 처음 세운 가설과 데이터가 바꾼 점

| 트리거 | 관찰 |
|--------|------|
| (L1 수치) | (가설과 충돌·수정 포인트) |

- Trigger = Hypothesis Lock의 Trigger와 동기화.
- **데이터가 먼저 나오지 않는다** — 표 제목이 「바꾼 점」임을 드러낸다.

### 본문 (시·주제별 블록)

- 표 앞에 **읽는 법** 한 줄 (시 평균 vs 町名 등).
- 시·구역마다 해석 라벨 **로테이션** (동일 문구 반복 금지):

| 예시 라벨 | 용도 |
|-----------|------|
| 이번 표에서 가장 눈에 띈 점 | 예상 밖 고가·저가 |
| 가설과 맞지 않았던 부분 | 소득≠가격 등 |
| 해석이 갈리는 지점 | 양면 해석 가능 |
| 여기서 생각이 바뀐 부분 | 시 평균 착시 깨짐 |

- Joseph 티키타카 인용: 「Joseph가 T2에서…」 — Decision Log 근거 명시.
- **허구 현장 금지**: 「가보니」「체감상」 없이 공개 자료·MLIT만.

### 반대 가설과 그 한계

- Bear case 1~2개 + **성립 조건** (금리·정책·베타 랠리 등).
- Joseph_Blog_Writing_SOP §1 「4-1) 반대 가설」과 동일 정신.

### 이런 분께 / 추천하지 않습니다

- 독자 self-selection. 투자 권유·후보군 push 금지 (Joseph Phase 2 톤).

### Joseph's View

```markdown
> Decision Log·티키타카를 바탕으로 정리한 **데이터 검토 후 판단**입니다.
> 현장담·허구 경험은 포함하지 않습니다.

**이번 데이터로 가장 크게 수정된 생각**
**앞으로도 유지하려는 판단**
**아직 확신하기 어려운 부분** (T3 등 미확정 시 명시)
**독자가 먼저 확인하면 좋은 것** (체크리스트)
**한 줄로 정리하면** — Final insight echo (필수)
```

- Decision Log 요약만이 아니라 **앞으로의 읽기 원칙** 한 줄 포함.
- 칼럼형 1인칭 강화는 Joseph 직접 문장 제공 후 삽입.

### 데이터 기준 시점

- 표로 기준일·출처 명시 (본문 상단이 아닌 **하단**).
- `citeSources` frontmatter와 일치.

---

## 톤 · 형식

- **합니다체** (`pnpm validate:post` ko-formal-tone).
- 단정·보장형 금지 (SOP §2).
- 인구·소득 등 **배경 숫자**는 본문에서 톤 다운 (Ep.10 Joseph 지시).
- 표면 Yield: 구조 비교용, 투자 권유 아님 명시.

---

## Phase 4 체크리스트 (KO 초안 완료 전)

Decision Log · manifest 대조:

- [ ] `pnpm verify:decision-log --slug <slug>` exit 0
- [ ] vNext spine §1~13 순서 준수
- [ ] Final insight → 「먼저 결론」+ Joseph's View 「한 줄」 echo
- [ ] Trigger 표 = Phase 2 Trigger
- [ ] manifest claims 수치만 (창작 없음)
- [ ] L1→L2→L3 순서 본문에 드러남
- [ ] 허구 L5/L4 없음 (없으면 명시적 disclaimer)
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

1. 결론 선행 — 데이터 끝에 결론 ❌  
2. 가설 → 데이터 → 수정 — 분석의 긴장감  
3. Joseph's View + 한 줄 echo — 브랜드 앵커  
4. 큰 구조 반복 — Ep.11~ 동일 spine  
5. Joseph 1인칭 — 제공분만, Cursor 창작 ❌
