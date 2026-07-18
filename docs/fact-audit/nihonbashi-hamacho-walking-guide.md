# SEO + Fatal Audit — `nihonbashi-hamacho-walking-guide`

| Field | Value |
|-------|-------|
| **Slug** | `nihonbashi-hamacho-walking-guide` |
| **Audit date** | 2026-07-18 |
| **Scope** | Voice Lite §1–4 + FA T0/T1 |
| **Primary sources** | Mitsui Fudosan, KABUTO ONE, Nihonbashi portal, Ningyocho shopping district, Meijiza |
| **Cursor validation** | `pnpm validate:post nihonbashi-hamacho-walking-guide` → PASS (100, hard gates) |

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 2026년 9월 말 준공 예정 | 2026년 9월 | [Mitsui Fudosan, 2026-04-21](https://www.mitsuifudosan.co.jp/corporate/news/2026/0421/) | [x] | Intro / H2 1 |
| 2 | 점심 ¥1,200~2,500, 평균 ¥1,500, 커피 ¥500 | ¥1,200 / ¥1,500 / ¥500 | [Nihonbashi area portal](https://www.nihonbashi-tokyo.jp/) | [x] planning estimate; current venue price should be checked | H2 1 |
| 3 | K5 커피 ¥600, Caveman 저녁 ¥5,000~8,000 | ¥600 / ¥5,000 | [Nihonbashi area portal](https://www.nihonbashi-tokyo.jp/) | [x] planning estimate; current venue price should be checked | H2 2 |
| 4 | 닌교야키 ¥100~200 | ¥100 | [Ningyocho shopping district](https://ningyocho.or.jp/) | [x] planning estimate; current shop price should be checked | H2 3 |
| 5 | 교통비 ¥0 | ¥0 | Route is entirely on foot | [x] | H2 4 |
| 6 | 총 예산 ¥2,000~4,000 | ¥2,000 | Route estimate derived from the listed food and snack budget | [x] planning estimate | H2 4 |
| 7 | EN/JA visitor-price tokens retained for locale parity | 1,200 / 2,500 / 1,500 / 5,000 / 8,000 / 2,000 / 4,000 | Same venue and route notes above | [x] locale equivalents | EN/JA |

## Cursor FA judgments

| # | Grade | Location / claim | Evidence checked | Cursor judgment | Action |
|---|-------|------------------|------------------|-----------------|--------|
| 1 | T0 | “Nihonbashi 1-chome Central District completed in March 2026” | [Mitsui Fudosan release, 2026-04-21](https://www.mitsuifudosan.co.jp/corporate/news/2026/0421/) says completion is scheduled for the end of September 2026 and the grand opening for autumn 2027 | **FA — outdated schedule presented as completed fact.** | Corrected KO/EN/JA and Naver; used the current project name, Tokyo Midtown Nihonbashi. |
| 2 | T0 | Waldorf Astoria had already opened, with rooms from ¥80,000 | Same Mitsui release schedules the hotel for autumn 2027 and publishes no room rate | **FA — wrong opening status and unsupported price.** | Corrected the opening schedule and removed the room-rate claim across locales and Naver. |
| 3 | T0 | Mitsui project source `https://www.mitsuifudosan.co.jp/nihonbashi/ichome/` | URL returned 404; the 2026 corporate release is live and specific | **FA — dead source.** | Replaced in `sources` and `citeSources` across locales. |
| 4 | T0 | KABUTO ONE has a 12m-wide LED stock ticker | [The HEART official PDF](https://kabutoone.tokyo/assets/pdf/KABUTO_ONE_theheart.pdf) gives 6m wide × 5.5m high × 3m deep | **FA — wrong dimensions and display description.** | Corrected across locales and Naver; added the specific source. |
| 5 | T0 | Ninben Dashi Bar offers a free tasting | [Official Nihonbashi listing](https://www.nihonbashi-tokyo.jp/shops/taste-201309/) lists katsuobushi broth at ¥100 | **FA — wrong visitor information.** | Corrected KO/EN/JA and Naver. |
| 6 | T1 | Kabutocho prices rose about 40% since 2019 because of cultural repositioning; condo price ranges prove a premium | Existing Tokyo Kantei annual PDF is metropolitan-wide and does not establish a Kabutocho series or the stated causation | **FA — source mismatch and unsupported investment claim.** | Removed the claim across locales and Naver; did not add replacement statistics. |
| 7 | T1 | Hamacho towers are 25% cheaper than adjacent Nihonbashi and therefore an “under-the-radar value play” | Existing Tokyo Kantei and REINS PDFs do not provide the stated neighborhood comparison | **FA — unsupported price comparison and investment recommendation.** | Removed across locales and Naver; retained only the walking-route description. |
| 8 | T1 | Conclusion's commercial-land and neighborhood price gradient | No parcel-level commercial source or matched neighborhood residential series in `citeSources` | **FA — unsupported investment framing.** | Replaced the repeated price narrative with a route-only summary; no new market narrative added. |
| 9 | T0 | JA nearest station “豪場町駅” | Tokyo Metro station name is 茅場町駅 | **FA — wrong place name.** | Corrected JA to 茅場町駅. |

## Verified claims retained

| Claim | Source | Status |
|-------|--------|--------|
| Tokyo Midtown Nihonbashi main tower: 52 stories, approximately 284m | [Mitsui Fudosan, 2026-04-21](https://www.mitsuifudosan.co.jp/corporate/news/2026/0421/) | Verified |
| Project completion: end of September 2026; grand opening and Waldorf Astoria: autumn 2027 | [Mitsui Fudosan, 2026-04-21](https://www.mitsuifudosan.co.jp/corporate/news/2026/0421/) | Verified |
| The HEART dimensions: 6m × 5.5m × 3m | [KABUTO ONE official PDF](https://kabutoone.tokyo/assets/pdf/KABUTO_ONE_theheart.pdf) | Verified |
| Ninben katsuobushi broth: ¥100 in the current official listing | [Nihonbashi official portal](https://www.nihonbashi-tokyo.jp/shops/taste-201309/) | Verified |
| Meijiza founded in 1873 | [Meijiza 150th anniversary](https://www.meijiza.co.jp/anniversary/) | Verified |

## Source audit

| Source | Result |
|--------|--------|
| `https://www.mitsuifudosan.co.jp/nihonbashi/ichome/` | Removed. Dead URL. |
| `https://www.mitsuifudosan.co.jp/corporate/news/2026/0421/` | Added. Current project name, completion, opening, tower, and hotel schedule. |
| `https://kabutoone.tokyo/assets/pdf/KABUTO_ONE_theheart.pdf` | Added. Specific display dimensions and function. |
| `https://www.nihonbashi-tokyo.jp/shops/taste-201309/` | Added. Current Dashi Bar listing. |
| Tokyo Kantei 2025 metropolitan 70㎡ PDF | Removed from this post. It does not support Kabutocho/Hamacho neighborhood claims. |
| REINS April 2026 Market Watch | Removed from this post. It does not support the stated neighborhood comparison. |

`citeSources` URLs are contained in `sources`: **yes**.

## Locale and deletion gate

- KO/EN/existing JA and Naver align on the September 2026 project completion schedule, autumn 2027 opening, The HEART dimensions, and ¥100 dashi listing.
- KO first touched place names use Korean plus Japanese script once in the direct-answer intro.
- No prohibited certainty terms appear in KO, EN, or JA.
- Five main H2s remain in place; only SEO question renames were applied.
- Unsupported investment claims were removed or softened without adding statistics or a replacement narrative.
- Distinct FA deletions: three unsupported investment claim groups (#6–#8). This is below the five-claim Joseph escalation threshold.

## Sign-off

- [x] FA open 0
- [x] Source-to-claim mapping updated
- [x] KO/EN/JA/Naver aligned
- [x] `pnpm validate:post nihonbashi-hamacho-walking-guide` score 100 / hard gates PASS
