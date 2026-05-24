# Fact audit (AG phase 1 → Cursor phase 2)

| Phase | Owner | Output |
|-------|--------|--------|
| 1 | **AG** | `INDEX.md`, `<slug>.md` (fact + **translation** audit drafts), `AG_PHASE1_REPORT.md` |
| 2 | **Cursor** | URL verification, EN/JA fixes, `src/data/blog/**` edits, `pnpm validate:post` pass |

**AG prompt:** [`../AG_BATCH_FACT_CHECK_PROMPT.md`](../AG_BATCH_FACT_CHECK_PROMPT.md)

**Templates:**
- [`../templates/blog-fact-sheet.md`](../templates/blog-fact-sheet.md)
- [`../templates/blog-translation-audit.md`](../templates/blog-translation-audit.md)

Do not treat AG drafts as verified until Cursor sign-off.
