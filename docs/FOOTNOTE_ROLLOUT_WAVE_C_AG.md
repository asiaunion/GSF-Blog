# Wave C — numbered footnotes rollout (AG instructions)

> **Pilot reference:** `tokyo-real-estate-investment-complete-guide` (ko/en/ja) — copy the same `citeSources` + `<sup class="source-ref">` pattern.  
> **Prerequisites:** Wave A (Tokyo cluster 6) and Wave B (REIT·rates 4) are **done** on `main`.  
> **Cursor:** AG finishes → user sends: `Wave C slug <name> — 발행 전 검증 부탁` or `Wave C 배치 C1 완료 — Cursor 검증 부탁`  
> **Do not** split a post by chapter; complete **one slug (ko + en + ja)** per AG session.

See also: [`FOOTNOTE_ROLLOUT_WAVE_A_AG.md`](./FOOTNOTE_ROLLOUT_WAVE_A_AG.md) (fixed rules + pillar URL cheat sheet).

---

## Status (2026-05-27)

| Wave | Slugs | Status |
|------|-------|--------|
| A | 6 Tokyo cluster (+ `tokyo-meguro-setagaya` separate) | ✅ Done |
| B | 4 REIT·rates | ✅ Done |
| **C** | **24 remaining** (no `citeSources` yet) | **AG in progress** |

---

## Fixed rules (non‑negotiable)

Read first: repo root [`AGENTS.md`](../AGENTS.md) · [`docs/fact-audit/T3_POLICY.md`](./fact-audit/T3_POLICY.md)

| Rule | Detail |
|------|--------|
| Locales | `src/data/blog/{ko,en,ja}/<slug>.md` — **same slug** |
| Footnote count | **4~6 per post** (not pillar-level 17) |
| `sources` | Every URL in `citeSources` (`url`, `portal`, `secondaryUrl`) must appear in `sources: []` |
| Archive in `sources` | Use **`https://gsfark.com/assets/sources/...`** — not bare `/assets/...` (schema requires valid URL) |
| `citeSources.archive` | May use relative `/assets/sources/...` |
| `citeSources` | Numbered list; order = footnote #1, #2, … |
| Inline HTML | `<sup class="source-ref"><a href="#source-N" id="cite-N">N</a></sup>` on **first** mention only |
| Second ref same # | `<sup class="source-ref"><a href="#source-N">N</a></sup>` (no duplicate `id="cite-N"`) |
| Disclaimer | **Never** add `## 면책` / footer disclaimer in `.md` |
| Diagrams | **`/assets/images/blog/diagrams/*.webp` only** — no `.svg` |
| URLs | No homepage-only URLs as sole cite |
| ISA / MOJ | `https://www.moj.go.jp/isa/...` — not `isa.go.jp` paths that 301 to home |
| T3 | Do **not** bulk `[x]` all 35 fact sheets or run full fetch ON |
| Handoff | `[AG→Cursor] Wave C slug: <slug> / ko·en·ja citeSources+footnotes 반영 / validate:post 요청` |

**Session pace:** 5~7 slugs per AG session; **one slug = ko + en + ja complete** before next slug.

---

## Topic URL cheat sheet (Wave C)

| Topic | Primary | Archive (if file exists under `public/`) |
|-------|---------|------------------------------------------|
| Kantei 中古マンション | `https://www.kantei.ne.jp/wp-content/uploads/c2025.pdf` | `https://gsfark.com/assets/sources/kantei-2025-chukomansion.pdf` |
| REINS Market Watch | `https://www.reins.or.jp/pdf/trend/mw/mw_202604_summary.pdf` | `https://gsfark.com/assets/sources/reins-202604-marketwatch.pdf` |
| Miki Tokyo office | `https://www.e-miki.com/rent/assets/market/tokyo.xlsx` | `https://gsfark.com/assets/sources/miki-202603-tokyo-office-market.xlsx` |
| MOJ visa / ISA | `https://www.moj.go.jp/isa/...` (specific page) | — |
| NTA tax | `https://www.nta.go.jp/taxes/shiraberu/...` | — |
| BOJ rates / FX | `https://www.boj.or.jp/en/statistics/...` (deep link) | — |
| MLIT earthquake / building | `https://www.mlit.go.jp/...` (specific stat/PDF) | — |
| JNTO inbound | `https://www.jnto.go.jp/statistics/...` | — |
| Tokyo rental guide | `https://www.juutakuseisaku.metro.tokyo.lg.jp/juutaku_seisaku/tintai/pdf/310-6-jyuutaku_eng.pdf` | — |
| Livable closing costs | `money_plan.html`, `g12987` | — |

**Do not** cite `mlit.go.jp`, `boj.or.jp`, or `jpx.co.jp` **homepages alone**.

---

## Wave C — 24 slugs (five batches)

### C1 — 23-ward & Nihonbashi investment (5) — **start here**

| # | Slug | Footnote hints |
|---|------|----------------|
| 1 | `tokyo-core-3-wards-chiyoda-chuo-minato` | Kantei PDF, ward population/income (ward or MIC Table 11) |
| 2 | `tokyo-shinjuku-shibuya-bunkyo` | Same pattern as core-3 |
| 3 | `tokyo-ward-guide-series-prologue` | Series frame; minimal stats; link to hub posts |
| 4 | `nihonbashi-the-origin-of-japan` | Historical / official Tokyo or cultural agency pages |
| 5 | `nihonbashi-mitsui-redevelopment-pipeline-three` | Redevelopment timeline; Tokyo Metro / Mitsui official PDFs |

---

### C2 — Nihonbashi · community · safety (5)

| # | Slug | Footnote hints |
|---|------|----------------|
| 1 | `coredo-nihonbashi-mitsui-redevelopment` | Redevelopment official sources |
| 2 | `nihonbashi-hamacho-walking-guide` | Local / ward guides |
| 3 | `nihonbashi-hamacho-supermarket-peacock-city-life` | Retail / ward stats if cited |
| 4 | `tokyo-korean-community-beyond-shinokubo` | Ward foreign-resident statistics |
| 5 | `tokyo-earthquake-vulnerable-five-areas` | MLIT seismic / hazard maps |

---

### C3 — FX · tax · visa (5)

| # | Slug | Footnote hints |
|---|------|----------------|
| 1 | `weak-yen-korean-japan-asset-allocation-fx-scenarios` | BOJ FX, official rate pages |
| 2 | `three-things-when-fx-shakes` | BOJ / macro stats |
| 3 | `korea-japan-inheritance-gift-tax-cross-border-basics` | NTA inheritance / gift pages |
| 4 | `japan-corporate-vs-personal-rental-after-tax-sketch` | NTA rental income (`joto/3211` etc.) |
| 5 | `japan-visa-paths-permanent-business-manager-asset-holders` | MOJ ISA deep links |

---

### C4 — Tokyo local · life (5)

| # | Slug | Footnote hints |
|---|------|----------------|
| 1 | `ginza-marunouchi-walk-dna` | Official tourism / district sources |
| 2 | `ginza-weekend-walking-guide` | Same |
| 3 | `tsukiji-to-toyosu-morning-tokyo` | Market / Tokyo official |
| 4 | `tokyo-five-sophisticated-spots` | Venue / tourism tier-1 |
| 5 | `tokyo-museums-with-kids-five-picks` | Museum official sites |

**Note:** Life/essay posts — footnote **2~4 quantitative claims** only; avoid investment-yield hype.

---

### C5 — Essay · transport (4)

| # | Slug | Footnote hints |
|---|------|----------------|
| 1 | `one-failure-three-lessons-postmortem` | Market stats only where cited |
| 2 | `reading-korea-japan-markets-together` | BOJ / JPX / official macro |
| 3 | `why-warm-investing-holds` | Light cites; author framing elsewhere |
| 4 | `tokyo-yokohama-fuji-transport-pass` | JR / operator official fare pages |

---

## AG completion checklist (per slug)

- [ ] `ko` / `en` / `ja` updated
- [ ] `sources` ⊇ all `citeSources` URLs (including `portal`)
- [ ] Archive paths in `sources` use `https://gsfark.com/assets/...`
- [ ] 4~6 footnotes; numbers match `citeSources` order
- [ ] No footer disclaimer; no new SVG
- [ ] EN **I** / JA ですます / no Korean in JA
- [ ] `[AG→Cursor]` handoff line in reply

---

## After Wave C (Cursor, not AG)

```bash
SKIP_TRUST_VERIFY=1 pnpm validate:post <slug>
```

User commits/deploys when ready (batch or per slug).

---

## Do not

- Finish all 24 slugs in one session
- Run `pnpm validate:post`, git commit, or push
- Re-edit completed Wave A/B slugs unless user asks
- Add footnotes to `/tags/` archive pages
