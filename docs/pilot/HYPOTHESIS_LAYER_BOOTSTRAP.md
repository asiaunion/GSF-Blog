# Hypothesis Layer · Context Bootstrap (Ep.10+)

> **용도**: Joseph·Cursor·AG가 **새 세션**에서도 Ep.10~15 파일럿을 같은 방식으로 이어가기 위한 **복원 진입점**.  
> **한 줄**: 워크플로는 [`JOSEPH_AUTHOR_OPS.md`](../JOSEPH_AUTHOR_OPS.md) · 사고 흐름은 [`REASONING_OS.md`](../REASONING_OS.md) · KO 형식은 [`KO_VNEXT_WRITING.md`](../KO_VNEXT_WRITING.md).

---

## Ep.10 레퍼런스 (잠금 완료)

| 항목 | 경로 |
|------|------|
| Slug | `tokyo-kokubunji-kunitachi-fuchu-tachikawa` |
| KO (locked) | `src/data/blog/ko/tokyo-kokubunji-kunitachi-fuchu-tachikawa.md` |
| Decision Log | `.blog-agent-stage/tokyo-kokubunji-kunitachi-fuchu-tachikawa/decision-log.md` |
| Manifest | `docs/verification/manifests/ep10-tokyo-kokubunji-kunitachi-fuchu-tachikawa.manifest.json` |
| Research pack | `docs/verification/research-packs/tokyo-kokubunji-kunitachi-fuchu-tachikawa.md` |
| Fact sheet | `docs/fact-audit/tokyo-kokubunji-kunitachi-fuchu-tachikawa.md` |
| Pilot 회고 | [`hypothesis-layer-pilot-log.md`](./hypothesis-layer-pilot-log.md) § Ep.10 |
| T3 | Joseph **동의함** (2026-06-27) — decision-log § T3 |

**검증 (Ep.10 기준):** `pnpm validate:post tokyo-kokubunji-kunitachi-fuchu-tachikawa` exit 0 · `draft: true` (AG 발행 대기)

---

## Ep.11 예정 (시리즈 prologue)

| Field | Value |
|-------|--------|
| Theme | 다마 외곽 가성비 존 |
| Cities (prologue) | 八王子·町田·多摩·稲城 등 |
| Slug | **아직 미등록** — `tokyo-series-episodes.json`에 Ep.11 행 추가 시 확정 |

Ep.11 시작 시 **먼저** `tokyo-series-episodes.json` + `hypothesis-layer-pilot-slugs.json`에 slug 등록.

---

## Ep.11+ 시작 체크리스트 (Cursor)

```bash
cd projects/GSF-Ark

# 1) Phase 0
pnpm analyze:episode -- --episode ep11 --write   # 또는 --skip-api

# 2) Decision Log 스캐폴드
cp docs/templates/blog-decision-log.md \
   .blog-agent-stage/<slug>/decision-log.md

# 3) Phase 0 snapshot 채움 → Joseph 티키타카 → Phase 2 Lock

# 4) KO (vNext spine — Ep.10과 동일 순서)
#    SSOT: docs/KO_VNEXT_WRITING.md

# 5) Gates
pnpm verify:decision-log --slug <slug>
pnpm scaffold:manifest -- --slug <slug> --write   # benchmarks 병합 후
pnpm validate:post <slug>
```

---

## 읽기 순서 (새 Cursor 세션)

1. [`JOSEPH_AUTHOR_OPS.md`](../JOSEPH_AUTHOR_OPS.md) — Phase 0~5
2. [`REASONING_OS.md`](../REASONING_OS.md) — Question→Writing
3. [`JOSEPH_AUTHENTIC_VOICE.md`](../JOSEPH_AUTHENTIC_VOICE.md) — 허구 L5 금지 · 판단 과정 공개
4. [`KO_VNEXT_WRITING.md`](../KO_VNEXT_WRITING.md) — spine 고정
5. Ep.10 decision-log + KO — **형식·톤 레퍼런스**
6. `.blog-agent-stage/<new-slug>/decision-log.md` — **이번 편 SSOT**

---

## 역할 (파일럿)

| 역할 | Ep.10~15 |
|------|----------|
| KO 초안 | **Cursor** |
| EN/JA · deploy | **AG** |
| Joseph | Data review · 티키타카 · Hypothesis Lock · Authenticity · T3 동의 |
| ChatGPT | 구조·톤 리뷰 (선택) |

---

## Joseph에게 붙여넣기 (Ep.11 시작 시)

```text
Ep.11 Hypothesis Layer 파일럿 — Ep.10과 동일 방식.
먼저 읽기: docs/pilot/HYPOTHESIS_LAYER_BOOTSTRAP.md
레퍼런스 KO: tokyo-kokubunji-kunitachi-fuchu-tachikawa (vNext locked)
```

---

## changelog

| 날짜 | 내용 |
|------|------|
| 2026-06-27 | Ep.10 handoff · Ep.11 bootstrap 초안 |
