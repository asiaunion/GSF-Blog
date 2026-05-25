# Merge readiness — `feat/fact-audit-wave-a` → `main`

> **Owner:** User (explicit merge/commit request only).  
> **Roadmap:** [`BLOG_TRUST_AND_QUALITY_ROADMAP.md`](./BLOG_TRUST_AND_QUALITY_ROADMAP.md) P0-4.

## Pre-merge checklist

| # | Criterion | Status | Command / note |
|---|-----------|--------|----------------|
| 1 | Format gates 35/35 | Run | `pnpm validate:batch` |
| 2 | Production build | Run | `pnpm run build` |
| 3 | INDEX validate column synced | Run | `pnpm trust:update-index` |
| 4 | AG 2.5b fact sheets (specific URLs) | AG | [`AG_PHASE2_CONTENT_FIX_PROMPT.md`](./AG_PHASE2_CONTENT_FIX_PROMPT.md) |
| 5 | Cursor Phase 3 sign-off | Cursor | [`CURSOR_PHASE3_REVERIFY_PROMPT.md`](./CURSOR_PHASE3_REVERIFY_PROMPT.md) |
| 6 | P0 URL spot checks documented | Cursor | [`fact-audit/P0_URL_SPOT_CHECKS.md`](./fact-audit/P0_URL_SPOT_CHECKS.md) |
| 7 | Trust PASS (publish bar) | Optional pre-merge | `pnpm validate:post <slug>` without `SKIP_TRUST_VERIFY` |

## Merge steps (user)

```bash
cd /Users/gsf/dev/Cursor/gsf-blog
git checkout main
git pull
git merge feat/fact-audit-wave-a
# resolve conflicts if any
pnpm validate:batch
pnpm run build
git push origin main
```

## Post-merge

- Vercel deploy from `main`
- Re-run `pnpm trust:update-index` on main if needed
- Weekly KPI: record `posts_validated_cursor` / `validate_failures` ([`WEEKLY_KPI_REVIEW.md`](./WEEKLY_KPI_REVIEW.md))
