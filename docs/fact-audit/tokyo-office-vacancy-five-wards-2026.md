# SEO + Fatal Audit — `tokyo-office-vacancy-five-wards-2026`

| Field | Value |
|-------|-------|
| **Slug** | `tokyo-office-vacancy-five-wards-2026` |
| **Audit date** | 2026-07-18 |
| **Scope** | Voice Lite §1–4 + FA T0/T1 |
| **Primary source** | 三鬼商事 東京ビジネス地区 月次データ |
| **Cursor validation** | `pnpm validate:post tokyo-office-vacancy-five-wards-2026` → PASS (100, hard gates) |

## Claims

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 2026년 3월 도쿄 도심 5구 평균 오피스 공실률 | 2026년 3월 | [https://www.tokyo-takken.or.jp/re-port/81557](https://www.tokyo-takken.or.jp/re-port/81557) | [x] | Intro / H2 1 |
| 2 | 도쿄 도심 5구 평균 오피스 공실률 | 2.22% | [https://www.tokyo-takken.or.jp/re-port/81557](https://www.tokyo-takken.or.jp/re-port/81557) | [x] | Intro / H2 1 |

## Cursor FA judgments

| # | Grade | Location / claim | Evidence checked | Cursor judgment | Action |
|---|-------|------------------|------------------|-----------------|--------|
| 1 | T0 | “Q1 2026 vacancy was 2.22%” | [Miki Shoji monthly workbook](https://www.e-miki.com/rent/assets/market/tokyo.xlsx): `2026年03月` Tokyo Business District = `2.22` | **FA — wrong period label.** The value is March, not a Q1 average. | Corrected KO/EN/JA and Naver to “March 2026.” |
| 2 | T0 | Effective rent rose, free-rent periods shrank, landlord bargaining power reached a post-pandemic peak | Miki workbook columns are average vacancy and average asking rent only | **FA — source mismatch.** The linked source does not report effective rent, concessions, or bargaining power. | Reframed to state the source boundary; removed the false citation. |
| 3 | T0 | REINS Market Watch cross-checks Tokyo office leasing | [REINS April 2026 PDF](https://www.reins.or.jp/pdf/trend/mw/mw_202604_summary.pdf) covers metropolitan used condominiums and used detached homes | **FA — mismatched source.** It cannot validate office leasing demand. | Removed from `sources`/`citeSources`/`references`; retained a warning in the reading routine. |
| 4 | T0 | Generic MLIT statistics page proves a second-half 2026 office supply gap | `https://www.mlit.go.jp/en/statistics/index.html/` returned 404 and no cited office-supply table was archived | **FA — dead and unsupported.** | Removed from frontmatter and changed the body claim to “not established.” |
| 5 | T1 | Sakura Stage was immediately absorbed by IT firms; Minato landmarks completed lease-up; Grade B secondary vacancy persists | No building-level leasing source in `citeSources` | **FA — unsupported demand/causal claims.** | Softened across locales and Naver; marked building-level evidence as required. |
| 6 | T1 | Chiyoda demand, Shibuya premium, Chuo/Shinjuku practical demand and reconstruction timing are established by the monthly table | Miki workbook contains ward vacancy and asking-rent series, not tenant sectors or project schedules | **FA — unsupported causation/forecast.** | Softened; kept only what the monthly table can support. |
| 7 | T1 | Flight to quality and hybrid work explain vacancy duration, floor-area use, and rent | No tenant survey, occupied-area series, or building-grade vacancy source in `citeSources` | **FA — unsupported causal claims.** | Recast as hypotheses requiring separate evidence. |
| 8 | T0 | BOJ 0.75%, JGB ≈2.43%, TSE REIT ≈1,916, inbound 10.68M in the freshness block | None of these figures appears in `citeSources` | **FA — unsupported numbers.** | Removed from KO/EN/JA; retained only sourced March vacancy. |
| 9 | T1 | Japanese locale used `必ず` in investment checks | SSOT bans `絶対に`; Voice Lite also favors non-coercive wording | **FA/voice — locale drift and excessive certainty.** | Replaced with neutral verification wording. |

## Verified numeric claims

| Claim | Source text | Status |
|-------|-------------|--------|
| Tokyo central five-ward average vacancy rate = **2.22% in March 2026** | Miki workbook row `2026年03月`, column `東京ビジネス地区 平均空室率(％)` = `2.22` | Verified |
| Source metric is **average asking rent**, not effective rent | Miki workbook header `平均賃料（円/坪）`; no effective-rent or free-rent field | Verified |

## Source audit

| Source | Result |
|--------|--------|
| `https://www.e-miki.com/rent/assets/market/tokyo.xlsx` | Kept. Direct source for monthly five-ward vacancy and asking rent. |
| `https://www.tokyo-takken.or.jp/re-port/81557` | Kept. Public-interest association report corroborating March 2026 vacancy and asking-rent metrics. |
| `https://www.reins.or.jp/pdf/trend/mw/mw_202604_summary.pdf` | Removed. Residential resale report; mismatched to office leasing. |
| `https://www.mlit.go.jp/en/statistics/index.html/` | Removed. Dead URL and no specific office pipeline evidence. |
| Miki rent portal | Kept as portal only. Not used to claim effective rent or concessions. |

`citeSources` URLs are contained in `sources`: **yes**.

## Locale and deletion gate

- KO/EN/existing JA aligned on March 2026, 2.22%, and the distinction between asking and effective rent.
- KO first touched place-name occurrence uses Korean ward names once; no repeated English glosses.
- No Korean `반드시`, English `guaranteed`, or Japanese `絶対に`.
- Main H2 count remains four; only SEO question renames were applied.
- Unsupported market claims were softened rather than replaced with a new narrative.
- Numeric deletions: four unsupported macro/tourism figures in one freshness block. This stays below the five-claim Joseph escalation threshold.

## Sign-off

- [x] FA open 0
- [x] Source-to-claim mapping updated
- [x] KO/EN/JA/Naver aligned
- [x] `pnpm validate:post tokyo-office-vacancy-five-wards-2026` score 100 / hard gates PASS
