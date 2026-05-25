# T3 fetch ON — deferred 11 slugs

> **Status:** Intentionally deferred (2026-05-25). CI and merge use fetch-skipped trust gates (**35/35**). P0 spot checks: **12/12 PASS**.

## Why deferred

Batch `SKIP_TRUST_VERIFY=0` fails **`trust-source-alignment`** when any **unverified** Claims row does not match its tier-1 URL. These 11 slugs have hundreds of `[ ]` rows sharing one URL per slug; P0 primary claims already pass.

**Not a deployment blocker** — production pipeline matches `SKIP_TRUST_VERIFY=1` / `TRUST_SKIP_SOURCE_FETCH=1`.

## Slugs (24/35 → skip full row-by-row T3)

| slug | Blocking claims (approx.) |
|------|---------------------------|
| `ginza-marunouchi-walk-dna` | coverage fixed; alignment rows still `[ ]` if fetch ON |
| `japan-corporate-vs-personal-rental-after-tax-sketch` | ~40 |
| `japan-visa-paths-permanent-business-manager-asset-holders` | ~27 |
| `nihonbashi-hamacho-walking-guide` | ~51 |
| `tokyo-6-wards-real-estate-insight` | ~25 |
| `tokyo-korean-community-beyond-shinokubo` | ~10 |
| `tokyo-mansion-tsubo-chiyoda-chuo-minato` | ~55 |
| `tokyo-real-estate-investment-complete-guide` | ~50 |
| `tokyo-shinjuku-shibuya-bunkyo` | ~155 |
| `tokyo-ward-guide-series-prologue` | ~40 |
| `weak-yen-korean-japan-asset-allocation-fx-scenarios` | ~32 |

## If you resume later (pick one policy)

### A. Pragmatic (recommended)

1. Keep CI on fetch-skipped gates.
2. For each slug, only maintain **P0-style primary claims** + facts cited in KO body prose.
3. Trim or mark `Present` for auto-extracted noise rows (years duplicated per locale column).

### B. Row-by-row verification

```bash
pnpm trust:verify-sources <slug>   # inspect FAIL/UNCERTAIN
# Fix URL per claim OR narrow Claims table
node scripts/bulk-t3-mark-passing.mjs <slug>   # auto-[x] on PASS only
```

### C. Gate change (product decision)

- Require T3 only for claims with `section: Body` and a non-generic URL, or
- Treat `UNCERTAIN` as non-blocking (FAIL only).

Document the chosen policy in `src/lib/validation/trustGates.ts` before enabling fetch ON in CI.

## Commands

```bash
# Current production check
SKIP_VALIDATE_BUILD=1 SKIP_TRUST_VERIFY=1 pnpm validate:batch

# Measure fetch ON (expect 24/35 until policy B/C)
SKIP_VALIDATE_BUILD=1 SKIP_TRUST_VERIFY=0 node scripts/batch-validate-posts.mjs
```
