# Design: Part N Stable Pipeline + Ep.12 Calibration

> **Date:** 2026-07-17  
> **Author:** Cursor × Joseph  
> **Status:** Approved (roles · Mode C/B/V · GPT optional · Claude token-fallback)  
> **Ops SSOT:** [`../PART_N_STABLE_PIPELINE_2026-07.md`](../PART_N_STABLE_PIPELINE_2026-07.md)

## Intent

Stabilize new-post publishing by merging:

1. AUTHOR_OPS / Joseph Voice / KO vNext (quality spine)
2. PROCESS Part N + SEO_WRITING_GUIDE §1–4 (query surface)
3. Clear agent roles with a **graduation path** to Cursor verify-only

Ep.12 (`tokyo-machida-tama-inagi`) is the first calibration piece under **Mode C**.

## Locked decisions

| Decision | Lock |
|----------|------|
| Default KO owner (now) | **Cursor** (Voice + §1–4 baked into draft) |
| GPT voice pass | **Optional** mid-process only if Joseph asks |
| AG default | Data/manifest → after Auth: EN, images, validate, deploy, IndexNow, Naver, PKM, series links |
| JA | New pages frozen |
| Mode V (Cursor verify-only) | After **2 consecutive** Mode B Cursor 1st-PASS |
| Fail | Any Mode B Fail → roll back to Mode C for one episode |
| Claude fallback | Only when **Cursor token exhaustion** (or Joseph explicit) — same rubrics/gates; not a parallel default |
| Token policy | Prefer Cursor end-to-end for this process; manage usage so fallback stays rare |

## Modes

```
Mode C — Cursor writes KO; AG = data + post-Auth pipeline
Mode B — AG writes KO; Cursor editorial rubric (reject/fix); deploy needs Cursor PASS
Mode V — AG full pipeline; Cursor verify-only (mechanical + short rubric); PASS token required
```

## Pipeline (Mode C — Ep.12)

```
AG: MLIT · manifest · Decision Log
Joseph: hypothesis / manifest approve
Cursor: N1 SERP + N2 §1–4 skeleton lock
Cursor: KO body (vNext + Voice + §1–4)
[optional] Joseph+GPT one pass → Cursor re-align
Joseph: Authenticity
AG: EN · images · validate · deploy · IndexNow · Naver · PKM · prologue update
Cursor: post-deploy HARD verify
```

## Success criteria

- Ep.12 KO satisfies Voice 4 + vNext + §1–4 in one draft
- AG can run from Ep.12 instruction alone after Auth
- Next new posts copy the same pipeline; Mode B/V criteria are explicit in ops SSOT

## Out of scope (this design)

- Tier 1 refresh backlog execution (separate OPEN_QUEUE)
- AdSense reapply
- Full rewrite of AUTHOR_OPS Phase 0–2 internals
