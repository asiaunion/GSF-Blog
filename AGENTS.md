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

---

## ⚙️ GSF-Blog 고정 아키텍처 규칙 (SSOT) — 2026-05-25+

모든 에이전트는 예외 없이 아래의 확정 사양을 철저히 준수하여 작업해야 하며, 임의로 하위 정책(예: 레거시 면책 수동 삽입 등)으로 롤백하거나 수정하지 마십시오.

1. **하단 면책조항 원천 배제 (No footer disclaimer)**
   * 마크다운 본문(`.md`) 하단에 `## 면책 및 이용 안내`, `## Disclaimer`, `## 免責` 및 이탤릭 면책 조항을 절대로 삽입하거나 갱신하지 마십시오.
   * 면책은 `PostDetails.astro`에서 카테고리(`category: investment / safety / general`)에 매핑하여 상단 `PostDisclaimer`로 자동화 처리하며, SSOT 문구는 `src/lib/postDisclaimer.ts`에서 단일 관리됩니다.

2. **포스트 내 SVG 사용 금지 (No .svg in posts)**
   * 포스트 마크다운 내부에서 `.svg` 파일 링크나 인라인 `<svg>` 코드를 절대로 작성하지 마십시오.
   * 다이어그램과 차트는 오직 `scripts/` 파이프라인을 거쳐 빌드된 `/assets/images/blog/diagrams/*.webp` 파일만을 링크하여 사용해야 합니다.

3. **T3 P0-only 검증 (No full-sheet T3)**
   * 35개 전체 시트의 Claims를 fetch ON하고 전수 `[x]` 마킹을 완수하는 것은 비목표(deferred)입니다.
   * T3 검증은 오직 P0 12개 스팟에 대한 네트워크 스팟 체크(`node scripts/p0-spot-verify.mjs`)에 집중하며, 배치는 `SKIP_TRUST_VERIFY=1`로 수행하는 것이 canonical 표준 정책입니다.
   * 상세: [`docs/fact-audit/T3_POLICY.md`](docs/fact-audit/T3_POLICY.md) · 아카이브: [`docs/fact-audit/T3_DEFERRED_11_SLUGS.md`](docs/fact-audit/T3_DEFERRED_11_SLUGS.md)

**Diagram pipeline (after SVG edit):** `pnpm diagrams:sanitize` → `pnpm diagrams:render` → link `diagrams/*.webp` only. See [`docs/CHARTS_AND_VISUALS.md`](docs/CHARTS_AND_VISUALS.md) §8.

**Disclaimer categories:** `investment` | `safety` | `general` (maps `life` / `local` / `essay` in `src/lib/postDisclaimer.ts`).

---

**Trust roadmap:** [`docs/BLOG_TRUST_AND_QUALITY_ROADMAP.md`](docs/BLOG_TRUST_AND_QUALITY_ROADMAP.md)  
**Footnotes Wave A/B/C:** ✅ done — [`docs/GSF_BLOG_WAVE_C_FOOTNOTES_COMPLETE_20260527.md`](docs/GSF_BLOG_WAVE_C_FOOTNOTES_COMPLETE_20260527.md) (no Wave D)  
**Session archive:** [`docs/GSF_BLOG_SESSION_ARCHIVE_20260525.md`](docs/GSF_BLOG_SESSION_ARCHIVE_20260525.md)  
**AG bootstrap (copy-paste):** [`docs/AG_CONTEXT_BOOTSTRAP_SHORT.md`](docs/AG_CONTEXT_BOOTSTRAP_SHORT.md)  
**Workflow:** [`docs/BLOG_AG_CURSOR_WORKFLOW.md`](docs/BLOG_AG_CURSOR_WORKFLOW.md)

