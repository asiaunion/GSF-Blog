# Joseph Author Ops — 실행 SSOT

> **상태**: v1.1 (2026-06-27) · Hypothesis Layer 파일럿 Ep.10~15  
> **철학 (불변)**: [`GSF-OS/Wiki/Joseph_Operating_Layer.md`](../../GSF-OS/Wiki/Joseph_Operating_Layer.md) · [`GSF_Ark_Data_First_Author_Layer.md`](../../GSF-OS/Wiki/GSF_Ark_Data_First_Author_Layer.md) · [`GSF-OS/Wiki/Reasoning_OS.md`](../../GSF-OS/Wiki/Reasoning_OS.md)  
> **글 형식 (KO 섹션·톤)**: Hypothesis Layer → [`KO_VNEXT_WRITING.md`](./KO_VNEXT_WRITING.md) · 레거시 → [`Joseph_Blog_Writing_SOP.md`](../Joseph_Blog_Writing_SOP.md)  
> **워크플로 SSOT**: **본 문서**

---

## 핵심 원칙

1. **가설은 먼저 쓰지 않는다.** 데이터를 본 뒤, 질문·답(티키타카)을 거쳐 가설이 나온다.
2. **Decision Log는 산문 초안이 아니다.** 데이터 스냅샷 + 티키타카 + 가설 진화 기록.
3. **AI는 편집자.** Joseph의 질문·가설·증거·결론을 Evidence Hierarchy 순으로 정리한다.
4. **스킵 불가.** 파일럿 슬러그는 `decision-log` hard gate 적용 ([`pilot/hypothesis-layer-pilot-slugs.json`](./pilot/hypothesis-layer-pilot-slugs.json)).

---

## 파일럿 (Ep.10~15)

| 항목 | 내용 |
|------|------|
| KO 초안 담당 | **Cursor** (AG KO 초안 일시 중단) |
| Joseph | Data Review 참여 · 티키타카 · Decision Log 승인 · Authenticity Check |
| Claude | 가설·구조 브레인스토밍 (선택) |
| EN/JA | 파일럿 후반 또는 Go 이후 AG 복귀 |
| 회고 | [`pilot/hypothesis-layer-pilot-log.md`](./pilot/hypothesis-layer-pilot-log.md) 편당 기록 |

---

## 공통 파이프라인 (MLIT · 에세이 동일) — Reasoning OS

> **사고 흐름 SSOT**: [`REASONING_OS.md`](./REASONING_OS.md)  
> Question → Hypothesis → Evidence → Interpretation → Insight → Writing

```text
Phase 0  Data Discovery     — Evidence (분기: MLIT / 에세이 L1)
Phase 1  Tiki-taka          — Interpretation (Joseph + Cursor/Claude)
Phase 2  Hypothesis Lock    — Insight (Trigger·Hypothesis·Final Insight)
Phase 3  Verification       — manifest(MLIT) / fact sheet · tier-1
Phase 4  KO draft           — Writing: vNext spine · Evidence L1→L2→L3
Phase 4-A Authenticity      — Joseph: 추론 체인·Final Insight echo · narrative lock
Phase 5+   EN/JA · hero · Cursor validate · deploy
```

**Ep.10 이후 KO 형식**: [`KO_VNEXT_WRITING.md`](./KO_VNEXT_WRITING.md) — Ep.10으로 spine 잠금, Ep.11~ 동일 반복.

**Ep.10처럼 주제·지역이 정해진 경우**: Phase 0부터 시작한다. 주제 확정 ≠ 가설 확정.

---

## Phase 0 — Data Discovery

**담당**: Cursor (MLIT 에피소드) 또는 Cursor+Joseph (에세이)

### MLIT Tokyo 에피소드

```bash
cd projects/GSF-Ark
pnpm analyze:episode -- --episode ep10 --write    # API 필요 시
# 또는 캐시만: --skip-api
pnpm research:pack -- --episode ep10 --write
```

산출:

- `docs/verification/research-packs/<slug>.md`
- `docs/verification/manifests/ep10-*.manifest.json` (scaffold 후 Joseph 승인)

Cursor가 **Data snapshot** 섹션을 Decision Log에 요약한다 (수치 창작 금지 — manifest/research-pack만).

### 에세이 / MLIT 없는 글

L1 후보를 먼저 수집한다: BOJ·e-Stat·국토交通省·도쿄도·REINS·Joseph가 **직접 확인한** 자료.  
수집 후 동일하게 Data snapshot → 티키타카.

---

## Phase 1 — Tiki-taka (데이터 기반 질문·답)

목적: 전문가처럼 **데이터를 보며** 이상·패턴·질문을 끌어낸다.

| 역할 | 행동 |
|------|------|
| Cursor | Data snapshot 핵심 수치·비교 제시, "이 숫자가 왜 이상한가?" 질문 |
| Joseph | 직관·경험·추가 질문 (1~3문장씩 가볍게) |
| Claude | (선택) 반대 가설·누락 데이터 제안 |

**Decision Log `## Tiki-taka log`**에 Q/A를 누적한다. 형식:

```markdown
### T{n} — {짧은 주제}
- **Q (Cursor/Joseph):** …
- **A (Joseph):** …
- **데이터 근거:** (research-pack § / manifest claim id)
```

티키타카가 끝나면 Central question · Trigger · Hypothesis · Final insight를 **함께** 정리한다 (Joseph 최종 승인).

---

## Phase 2 — Hypothesis Lock

**SSOT**: `.blog-agent-stage/<slug>/decision-log.md`  
**템플릿**: [`templates/blog-decision-log.md`](./templates/blog-decision-log.md)

Joseph 승인 후 manifest에 기록:

```json
"gates": {
  "hypothesis_layer_by": "Joseph 2026-06-26",
  "hypothesis_layer_required": true
}
```

검증:

```bash
pnpm verify:decision-log --slug <slug>
```

---

## Phase 4 — KO draft (vNext)

**형식 SSOT**: [`KO_VNEXT_WRITING.md`](./KO_VNEXT_WRITING.md)

| 항목 | 규칙 |
|------|------|
| spine | 먼저 결론 → 왜 이 글 → 가설 vs 데이터 → 본문 → 독자 fit → Joseph's View |
| 수치 | manifest claims / research-pack만 |
| Joseph | 앞 20% 출발 가설 · 뒤 10% Joseph's View + Final insight echo |
| 금지 | 허구 현장 · Research 요약 톤 |

`gates.draft_started: true` 설정 후 Joseph **Phase 4-A** narrative lock.

---

## Phase 4-A — Authenticity · narrative lock

Joseph 체크 (decision-log `Authenticity pre-check`):

- L1→L2→L3 순서
- Final insight echo (먼저 결론 + Joseph's View 한 줄)
- 허구 L4/L5 없음

승인 후 **구조 변경 없이** manifest · hero · fact-sheet · validate만 진행.

---

## Phase 3~4 — MLIT vs Essay 분기

| 단계 | MLIT 에피소드 | 에세이 |
|------|---------------|--------|
| Phase 3 | manifest Joseph 승인 → Trigger/Hypothesis 재확인 | fact sheet + tier-1 |
| Phase 4 | manifest claims만 사용, L1→L2→L3 | 동일 Evidence Hierarchy |
| Cursor gate | `verify:episode` + `verify:decision-log` + `validate:post` | `verify:decision-log` + `validate:post` |

---

## Hard gates (파일럿)

| Gate | 명령 | 실패 시 |
|------|------|---------|
| decision-log-exists | `validate:post` 내장 | KO 검증 불가 |
| decision-log-complete | 필수 섹션·티키타카 1건 이상 | 동일 |
| hero-webp / hero-og | 기존 | 동일 |

면제: manifest `gates.decision_log_waived_by` (파일럿 기간 **사용 금지**).  
CI 일괄: `SKIP_DECISION_LOG_CHECK=1` (기존 35편 batch만).

---

## Ep.10 Quick start

| Field | Value |
|-------|--------|
| Episode | Ep.10 |
| Slug | `tokyo-kokubunji-kunitachi-fuchu-tachikawa` |
| Cities | 国分寺市 · 国立市 · 府中市 · 立川市 |
| Theme | 다마 교육·문화 벨트 |

```bash
pnpm analyze:episode -- --episode ep10 --write
pnpm verify:decision-log --slug tokyo-kokubunji-kunitachi-fuchu-tachikawa
# 티키타카·Hypothesis Lock 후
pnpm verify:episode --slug tokyo-kokubunji-kunitachi-fuchu-tachikawa
pnpm validate:post --stage tokyo-kokubunji-kunitachi-fuchu-tachikawa
```

---

## 관련

- [`REASONING_OS.md`](./REASONING_OS.md) — 사고 흐름 · 에이전트 역할
- [`KO_VNEXT_WRITING.md`](./KO_VNEXT_WRITING.md) — KO 섹션 spine (Ep.10+)
- [`pilot/HYPOTHESIS_LAYER_BOOTSTRAP.md`](./pilot/HYPOTHESIS_LAYER_BOOTSTRAP.md) — **새 세션·Ep.11+ 복원 진입점**
- [`BLOG_AG_CURSOR_WORKFLOW.md`](./BLOG_AG_CURSOR_WORKFLOW.md) — Cursor 검증·배포
- [`pilot/hypothesis-layer-pilot-log.md`](./pilot/hypothesis-layer-pilot-log.md)
- [`.agents/skills/deploy-blog/SKILL.md`](../.agents/skills/deploy-blog/SKILL.md)
