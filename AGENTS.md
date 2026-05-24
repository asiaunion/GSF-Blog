# GSF-Blog — Antigravity agent notes

**Canonical path:** `/Users/gsf/.gemini/antigravity/scratch/projects/GSF-Blog`

## Image work (auto — no extra user command)

Before changing `public/assets/images/blog/**`, `ogImage`, or post images:

1. Read `BLOG_IMAGE_RULES_1PAGE.md` (Option A checklist)
2. Load Knowledge **`gsf_blog_image_option_a`** (or `BLOG_IMAGE_INTENT_RULES.md`)
3. Follow `.cursor/rules/blog-images-option-a.mdc` when editing matching files

Global rules: `~/.gemini/config/rules/agent_rules.md`

**Never:** auto-pick from Downloads, same file for hero and body, heavy mosaic, couple selfie as hero.

## Write vs verify

| Phase | Owner |
|-------|--------|
| Draft KO/EN/JA, assets | **AG** |
| `pnpm validate:post <slug>` | **Cursor** |
| git commit / deploy | **User** (unless explicitly asked) |

See `docs/BLOG_AG_CURSOR_WORKFLOW.md`, `BLOG_AGENT_AUTOMATION_RUNBOOK.md`.
