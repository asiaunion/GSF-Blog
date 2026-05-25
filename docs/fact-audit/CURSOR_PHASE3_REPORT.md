# Cursor Phase 3 — Infrastructure & batch reverify

> **Date:** 2026-05-25  
> **Branch:** `feat/fact-audit-wave-a`  
> **Roadmap:** [`BLOG_TRUST_AND_QUALITY_ROADMAP.md`](../BLOG_TRUST_AND_QUALITY_ROADMAP.md)

---

## Executive summary

| Layer | Result | Notes |
|-------|--------|-------|
| **Format gates (T0)** | **35/35 PASS** | `pnpm validate:batch` (`SKIP_VALIDATE_BUILD=1`, `SKIP_TRUST_VERIFY=1`) |
| **Production build** | **PASS** | `pnpm run build` (2026-05-25) |
| **Trust gates (T1–T3, no fetch)** | **1/35 pass** | `pnpm trust:summary` — 34 fail until AG 2.5b |
| **Full trust (publish bar)** | Pending AG 2.5b | `pnpm validate:post <slug>` without skip |
| **INDEX validate column** | **35 PASS** | `pnpm trust:update-index` |

**Status phrase:** Trust infra + format batch complete — **AG 2.5b + full trust pass + user merge** pending.

---

## 1. Prior AG/Cursor waves (reference)

Earlier session validated **14/14** slugs (Wave A/B/C subset) with build — see git history / `AG_PHASE2_FIX_REPORT.md`. This report adds **repo-wide** automation and **35/35** format gate sync.

---

## 2. Format validation (35 slugs)

```bash
pnpm validate:batch
# → pass: 35, fail: 0
```

Gates: references, risky claims, ko-length 1200–4000 (disclaimer excluded), tone, disclaimer, tier sources, `tier-source-quality` score.

---

## 3. Trust automation delivered (Phase 0 / P1)

| Component | Path |
|-----------|------|
| Trust gates | `src/lib/validation/trustGates.ts` |
| Fact sheet parse | `src/lib/validation/factSheet.ts` |
| T3 fetch + fuzzy | `src/lib/validation/sourceVerification.ts` |
| Source scoring | `src/lib/validation/tiering.ts` |
| Wired into | `pnpm validate:post` |
| CI (format) | `.github/workflows/blog-validate.yml` |
| CI (integrity) | `.github/workflows/blog-content-integrity.yml` |
| Cursor rule | `.cursor/rules/blog-trust-quality.mdc` |

**Policy:** UNCERTAIN = hard block. Generic `mlit.go.jp/` homepage URLs fail `trust-tier1-url-specificity`.

### Trust batch (no network)

Run: `pnpm trust:summary` — reports coverage / parity / URL specificity without HTTP (T3 fetch skipped).

Most slugs **fail** trust until AG fills Claims with specific URLs — **expected**.

---

## 4. Build

```bash
pnpm run build   # PASS — astro check + build + pagefind (2026-05-25)
```

Merge checklist: [`MERGE_READINESS.md`](../MERGE_READINESS.md).

---

## 5. INDEX & P0 spots

- **INDEX:** `pnpm trust:update-index` — all `validate` cells **PASS** (format gates only).
- **P0 URL spots:** template [`P0_URL_SPOT_CHECKS.md`](./P0_URL_SPOT_CHECKS.md) — fill after AG 2.5b URLs.

---

## 6. AG / user next steps

| Step | Owner | Doc |
|------|--------|-----|
| AG 2.5b all 35 | AG | [`AG_PHASE2_5B_HANDOFF.md`](../AG_PHASE2_5B_HANDOFF.md) |
| Full trust reverify | Cursor | [`CURSOR_PHASE3_REVERIFY_PROMPT.md`](../CURSOR_PHASE3_REVERIFY_PROMPT.md) |
| Merge to main | User | [`MERGE_READINESS.md`](../MERGE_READINESS.md) |

---

## 7. Commands cheat sheet

```bash
pnpm validate:batch
pnpm trust:summary
pnpm trust:update-index
SKIP_TRUST_VERIFY=1 pnpm validate:post <slug>
pnpm validate:post <slug>          # publish bar
pnpm trust:verify-sources <slug>
pnpm check:source-links [slug]
```

---

> **Cursor 3차 인프라·배치 완료 — validate 35/35 (format), trust 전수 PASS는 AG 2.5b 후, 커밋 대기**
