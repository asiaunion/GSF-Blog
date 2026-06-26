# Reasoning OS — GSF-Ark 분석·글쓰기 워크플로

> **상태**: v1.0 (2026-06-27) · Ep.10 파일럿 검증 · Joseph + ChatGPT + Cursor  
> **실행 SSOT**: [`JOSEPH_AUTHOR_OPS.md`](./JOSEPH_AUTHOR_OPS.md)  
> **KO 출력 형식**: [`KO_VNEXT_WRITING.md`](./KO_VNEXT_WRITING.md)  
> **철학**: [`GSF-OS/Wiki/GSF_Ark_Data_First_Author_Layer.md`](../../GSF-OS/Wiki/GSF_Ark_Data_First_Author_Layer.md) · [`GSF-OS/Wiki/Reasoning_OS.md`](../../GSF-OS/Wiki/Reasoning_OS.md)

---

## 한 줄 정의

> **데이터는 질문을 검증하고, Joseph의 판단은 브랜드를 만든다.**

Reasoning OS는 **글 종류(MLIT · 에세이)마다 다른 파이프라인**이 아니라, **증거 수집 분기만 다르고 사고 흐름은 동일**한 단일 워크플로다.

---

## 사고 흐름 (불변)

```text
Question        — 왜 이 글인가? 무엇이 의심스러운가?
    ↓
Hypothesis      — 선입견·작업 가설 (데이터 전·중)
    ↓
Evidence        — L1 데이터 → L2 패턴 (분기: MLIT manifest / 에세이 fact sheet)
    ↓
Interpretation  — 티키타카 · JOL · Trigger 해석
    ↓
Insight         — Hypothesis Lock · Final insight (one sentence)
    ↓
Writing         — KO vNext (결론 선행 · 가설 수정 드러내기 · Joseph's View)
```

**예전 모델** (분석 보고서형):

```text
데이터 → 설명 → 결론
```

**Reasoning OS 모델** (분석가 글):

```text
가설 → 데이터 → 생각 수정 → 판단
```

---

## Ops 단계 매핑

| Reasoning OS | JOSEPH_AUTHOR_OPS | 산출물 |
|--------------|-------------------|--------|
| Question | Phase 0 질문 · Why this topic | Decision Log · Open questions |
| Hypothesis | Phase 1 티키타카 · Initial assumption | `## Tiki-taka log` |
| Evidence | Phase 0 snapshot · Phase 3 manifest/fact | research-pack · manifest claims |
| Interpretation | Phase 1~2 · Trigger · Pattern | Hypothesis · Personal rule |
| Insight | Phase 2 Hypothesis Lock | Final insight (one sentence) |
| Writing | Phase 4 KO · Phase 4-A Authenticity | `src/data/blog/ko/<slug>.md` |

**증거 분기만 다름**

| 글 유형 | Evidence branch |
|---------|-----------------|
| MLIT Tokyo 에피소드 | `analyze:episode` → research-pack → manifest (A/B tier) |
| 에세이 · MLIT 없음 | L1 URL 수집 → fact sheet · tier-1 spot-check |

MLIT gate·manifest 승인·`verify:episode`는 **그대로 유지**한다. Reasoning OS는 그 위에 **사고 순서**를 얹는 레이어다.

---

## Joseph 목소리 배치 (브랜드 규칙)

ChatGPT Ep.10 리뷰 + Joseph Authenticity 규칙을 합친 운영 원칙:

| 구간 | 역할 | 허용 | 금지 |
|------|------|------|------|
| **앞 20%** | 질문·출발 가설 | 무인칭 가설 · Decision Log 인용 · Joseph가 준 1~2문장 | 허구 「저도 예전에 가보니…」 |
| **본문** | Evidence + 해석 | 「Joseph가 Tn에서…」 · 로테이션 라벨 | 데이터 앞에 결론 없이 표만 나열 |
| **뒤 10%** | Joseph's View | Final insight echo · 앞으로의 판단 · 한 줄 정리 | Decision Log 요약만 반복 |

Joseph 1인칭 서사를 강화하려면 **Joseph가 직접 문장을 제공**한 뒤 삽입한다. Cursor/AG가 기억·체감을 창작하지 않는다.

---

## Decision Log = Reasoning 기록 (글 아님)

Decision Log는 **Hypothesis Evolution Log**다.

필수 체인:

```text
Initial Assumption → Trigger (data) → Hypothesis → Verification → Final Insight
```

- 티키타카 **전**에 Initial assumption을 적을 수 있다.
- Trigger는 **tier-1 / Joseph 확인** 데이터만.
- KO 초안은 Final insight를 **echo**하되, Decision Log 문장을 그대로 복붙하지 않는다.

검증: `pnpm verify:decision-log --slug <slug>`

---

## Evidence Hierarchy (본문 서술 순서)

| Level | 유형 | Reasoning OS에서의 위치 |
|-------|------|-------------------------|
| L1 | Verified Data | Evidence |
| L2 | Pattern | Evidence → Interpretation 경계 |
| L3 | Hypothesis | Interpretation |
| L4 | Field verification | Interpretation (선택) |
| L5 | Experience | Insight 뒷받침만 (선택) |

L5 없이 L1→L3→Writing도 완전히 유효하다. Ep.10은 L1~L3 중심.

---

## 에이전트 역할

| 역할 | Reasoning OS에서 |
|------|------------------|
| **Joseph** | Question · Interpretation · Insight 승인 · Authenticity |
| **Cursor** | Evidence 정리 · Decision Log · KO vNext 편집 · gate |
| **ChatGPT** | 구조·톤 리뷰 (파일럿) — SSOT 변경은 Ops 문서 경유 |
| **AG** | EN/JA · hero · 배포 (파일럿 중 KO는 Cursor) |
| **Claude** | (선택) 반대 가설 · 누락 evidence |

❌ Research 요약 글  
✅ Joseph의 질문·가설·증거·결론을 **읽기 좋은 분석 글로 편집**

---

## 파일럿 · 반복 = 브랜드

Ep.10 (`tokyo-kokubunji-kunitachi-fuchu-tachikawa`)로 구조를 **잠근다**.

이후 Ep.11~:

- 큰 섹션 순서 변경 ❌
- 동일 spine 반복 ✅
- 시·주제만 바뀌고 **질문 → 가설 → 데이터 → Joseph 판단** 기대치 유지 ✅

회고: [`pilot/hypothesis-layer-pilot-log.md`](./pilot/hypothesis-layer-pilot-log.md)

---

## 관련 문서

| 문서 | 용도 |
|------|------|
| [`JOSEPH_AUTHOR_OPS.md`](./JOSEPH_AUTHOR_OPS.md) | Phase 0~5 실행 |
| [`KO_VNEXT_WRITING.md`](./KO_VNEXT_WRITING.md) | KO 섹션·체크리스트 |
| [`JOSEPH_AUTHENTIC_VOICE.md`](./JOSEPH_AUTHENTIC_VOICE.md) | Joseph vs AI · Evidence First · EEAT |
| [`templates/blog-decision-log.md`](./templates/blog-decision-log.md) | Decision Log 템플릿 |
| [`BLOG_AG_CURSOR_WORKFLOW.md`](./BLOG_AG_CURSOR_WORKFLOW.md) | 검증·배포 |
| [`.agents/skills/deploy-blog/SKILL.md`](../.agents/skills/deploy-blog/SKILL.md) | Step 4 KO |
