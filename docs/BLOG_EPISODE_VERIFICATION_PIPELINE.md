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

## Phase 1 — DONE (2026-06-17)

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

## Phase 2 — DONE (2026-06-17)

- [x] Wire `verify:episode` into CI (`.github/workflows/verify-tokyo-episodes.yml`) + `scripts/verify-tokyo-changed.mjs`
- [x] Local pre-commit: `scripts/install-pre-commit-hook.sh`
- [x] Auto-populate manifest A-layer: `scripts/scaffold-episode-manifest.mjs` + `tokyo-series-episodes.json`
- [x] Registry v1.5: Ep.06 SUUMO entries + `docs/verification/snapshots/` committed paths
- [x] Hallucination score in `verify-episode-manifest.mjs` → `docs/verification/scores/<slug>.json`
- [x] CI-safe MLIT copy: `docs/verification/data/tokyo_mansion_stats_2025.json`

### Commands

```bash
pnpm scaffold:manifest -- --slug tokyo-taito-sumida-koto --write
pnpm verify:tokyo-changed
pnpm verify:tokyo:ci
VERIFY_REQUIRE_GATES=1 pnpm verify:tokyo-changed
sh scripts/install-pre-commit-hook.sh
node scripts/fetch-suumo-snapshot.mjs sc_taito --commit
```

---

## Phase 3 — DONE (2026-06-17)

- [x] PKM income card sync: `scripts/sync-manifest-pkm-income.mjs`
- [x] Manifest ↔ locale parity: `scripts/verify-manifest-locale-parity.mjs`
- [x] NotebookLM import: `scripts/import-notebooklm-claims.mjs`

### Commands

```bash
pnpm verify:pkm-income -- --slug tokyo-taito-sumida-koto
pnpm verify:manifest-parity -- --slug tokyo-taito-sumida-koto
node scripts/import-notebooklm-claims.mjs --slug <slug> --input research.json --write
```

---

## MLIT API integration (2026-06-17)

| Item | Path |
|------|------|
| 통합 수집기 | `scripts/mlit-collector.mjs` |
| PKM price merge | `scripts/merge-mlit-price-to-pkm.mjs` |
| Ark mirror | `scripts/sync-mlit-pkm-to-ark.mjs` |
| benchmarks v1.1 | `scripts/sync-mlit-to-benchmarks.mjs` |
| 투자 dossier | `scripts/render-ward-dossier.mjs` → PKM `RealEstate/Tokyo/wards/` |
| 분기 SOP | `docs/MLIT_DATA_REFRESH_SOP.md` |
| Drift CI | `.github/workflows/mlit-drift-check.yml` |

```bash
pnpm merge:mlit-pkm -- --episode ep07
pnpm sync:mlit-ark
pnpm sync:mlit-benchmarks -- --episode ep07 --write
pnpm dossier:ward -- --episode ep07
pnpm compare:wards -- --episode ep07
```

---



## Phase 4 — Analysis pack pipeline (2026-06-17)

| Item | Path |
|------|------|
| Sample size SSOT | `scripts/lib/mlit-sample-policy.mjs` |
| Price timeseries | `scripts/mlit-price-series.mjs` |
| Research pack | `scripts/render-episode-research-pack.mjs` → `docs/verification/research-packs/` |
| Orchestrator | `scripts/analyze-episode.mjs` |
| OG pre-deploy | `scripts/verify-og-social.mjs` |

```bash
pnpm analyze:episode -- --episode ep07 --write
pnpm mlit:price-series -- --episode ep07 --from 2018 --to 2025 --write
pnpm research:pack -- --episode ep07 --write
pnpm verify:og-social -- --slug tokyo-taito-sumida-koto
```

Execution order: Phase 1 (timeseries) → Phase 3 (research-pack) → Phase 2a·2b (districts in sync) → Phase 2c (scaffold claims).

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
