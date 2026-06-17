# Blog episode verification pipeline (Phase 1–3)

> **Status**: Implemented 2026-06-17  
> **Scope**: Where to Live in Tokyo (Ep.01~Ep.23) + YMYL posts with numeric claims  
> **Replaces**: Honor-system “[1차 확인] ✅” self-reports without artifacts

---

## Problem (Ep.06 incident)

| Failure mode | Example |
|--------------|---------|
| Trust tier inflation | Registry snapshot labeled [1차 확인] without re-fetch |
| Research → draft order collapse | Draft written before user asked “are numbers certain?” |
| Unverified quantitative claims | Sky Tree 3.8亿 from search snippet |
| Cross-episode re-research | Suginami 35min → corrected to 21min by user |

**Root cause**: Rules existed in skills/Wiki but were not **machine-enforced**.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Layer A (deterministic)                                      │
│  tokyo_mansion_stats_2025.json  +  benchmarks.json          │
│  → verify-episode-manifest.mjs (auto)                        │
├─────────────────────────────────────────────────────────────┤
│ Layer B (fetch HTML)                                           │
│  fetch-suumo-snapshot.mjs → .cache/verification/*.html       │
│  → snippet match in manifest                                 │
├─────────────────────────────────────────────────────────────┤
│ Layer C (estimate / bot-block)                               │
│  tier: secondary ONLY  OR  user_capture                      │
│  → Joseph screenshot/PDF before draft                        │
└─────────────────────────────────────────────────────────────┘

Roles:
  Research subagent → claims candidates (NO tier assignment)
  Main AG           → manifest.json (evidence required)
  Joseph            → manifest_approved_by
  Writer AG         → KO draft (manifest claims only)
  Cursor            → cursor_audit_passed (mandatory Ep.07+)
  Scripts           → verify-episode-manifest.mjs
```

---

## Phase 1 (this week) — DONE

| Item | Path |
|------|------|
| Series benchmarks SSOT | `docs/verification/tokyo-ward-series-benchmarks.json` |
| Manifest template | `docs/verification/manifest.template.json` |
| Ep.06 example manifest | `docs/verification/manifests/ep06-tokyo-taito-sumida-koto.manifest.json` |
| MLIT + manifest verifier | `scripts/verify-episode-manifest.mjs` |
| SUUMO snapshot fetcher | `scripts/fetch-suumo-snapshot.mjs` |
| deploy-blog Step 3-E rewrite | `.agents/skills/deploy-blog/SKILL.md` |
| Cursor audit gate | `docs/BLOG_AG_CURSOR_WORKFLOW.md` |

### Commands

```bash
pnpm verify:episode --slug tokyo-taito-sumida-koto
pnpm verify:episode --slug tokyo-taito-sumida-koto --require-gates
node scripts/fetch-suumo-snapshot.mjs sc_taito
```

---

## Phase 2 (2 weeks)

- [ ] Wire `verify:episode --require-gates` into CI / pre-commit for `src/data/blog/ko/tokyo-*.md`
- [ ] Auto-populate manifest A-layer claims from slug + ward list (AG helper script)
- [ ] Registry v1.5: link each SUUMO entry to `.cache/verification/` path
- [ ] Hallucination score: `failed_claims / total_primary_claims` per episode

---

## Phase 3 (series stabilization)

- [ ] PKM `verified: true` cards sync with manifest primary claims
- [ ] EN/JA numeric parity check against manifest (extend `locale-numeric-parity.mjs`)
- [ ] NotebookLM output → manifest import (optional)

---

## Gate sequence (mandatory Ep.07+)

| Step | Gate | Who sets |
|------|------|----------|
| 3-E | `c_tier_capture_requests` resolved or waived | Joseph |
| 3-E | `manifest_approved_by` | Joseph |
| 4 | `draft_started: true` (after manifest approval) | AG |
| Post-draft | `cursor_audit_passed: true` | Cursor |
| Pre-deploy | `pnpm verify:episode --require-gates` exit 0 | CI/script |
| Pre-deploy | `pnpm validate:post <slug>` exit 0 | CI/script |

**Forbidden**: AG saying “[1차 확인] complete” without `pnpm verify:episode` output attached.

---

## Manifest claim rules

1. Every **number in KO body** must map to a manifest `claim.id`.
2. `tier: primary` requires non-empty `evidence` (no agent self-report).
3. `layer: C` cannot use `tier: primary` except `method: user_capture`.
4. Cross-episode comparisons must use `benchmark_lookup` — no re-research.
5. New ward data → update `tokyo-ward-series-benchmarks.json` once, then reference.

---

## Related docs

- [`docs/verification/README.md`](./verification/README.md)
- [`docs/BLOG_AG_CURSOR_WORKFLOW.md`](./BLOG_AG_CURSOR_WORKFLOW.md)
- [`docs/BLOG_FACT_CHECK_WORKFLOW.md`](./BLOG_FACT_CHECK_WORKFLOW.md)
- `projects/GSF-OS/Wiki/Blog_Source_Verification_Rule.md` §8
- `projects/GSF-PKM/PKM/30 Resources/Tokyo-Wards-Source-Registry.md` [TWR-v1.5]
