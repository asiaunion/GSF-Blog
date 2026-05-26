# Fact sheet & Translation audit — `tokyo-meguro-setagaya`

| Field | Value |
|-------|--------|
| **Slug** | tokyo-meguro-setagaya |
| **Title (KO)** | 도쿄 서쪽 프리미엄 주거 벨트: 메구로·세타가야 — 이주·투자 데이터 가이드 [Ep.3] |
| **Cursor validate** | `SKIP_TRUST_VERIFY=1 pnpm validate:post tokyo-meguro-setagaya` → PASS |
| **Published** | Live (main) |

---

## Claims (headline — footnoted P0/P1)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 메구로 총인구 283,913명 | 283,913 | [Meguro ward statistics](https://www.city.meguro.tokyo.jp/smph/kurashi/toukei/index.html) | [x] | §1 인구 |
| 2 | 메구로 외국인 12,563명 / 4.42% | 12,563 / 4.42% | [Meguro ward statistics](https://www.city.meguro.tokyo.jp/smph/kurashi/toukei/index.html) | [x] | §1 외국인 |
| 3 | 세타가야 총인구 931,090명 | 931,090 | [Setagaya population](https://www.city.setagaya.lg.jp/01110/5199.html) | [x] | §2 인구 |
| 4 | 세타가야 외국인 31,177명 / 3.35% | 31,177 / 3.35% | [Setagaya population](https://www.city.setagaya.lg.jp/01110/5199.html) | [x] | §2 외국인 |
| 5 | 메구로 평균所得 778.7만 엔 | 778.7万 | [MIC municipal tax survey](https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/ichiran.html) | [x] | §1 소득 |
| 6 | 세타가야 평균所得 659.7만 엔 | 659.7万 | [MIC municipal tax survey](https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/ichiran.html) | [x] | §2 소득 |
| 7 | 메구로 구 평균 157만엔/㎡ | 157万/㎡ | [LIFULL HOME'S Tokyo used mansions](https://www.homes.co.jp/mansion/chuko/tokyo/) | [ ] | §1 매매 |
| 8 | 세타가야 구 평균 115만엔/㎡ | 115万/㎡ | [LIFULL HOME'S Tokyo used mansions](https://www.homes.co.jp/mansion/chuko/tokyo/) | [ ] | §2 매매 |
| 9 | 인구 비율 약 3.28배 | 3.28× | Meguro + Setagaya URLs (derived) | [x] | §3 비교 |

---

## Sources audit

| URL in `sources` | Tier | Used in body? |
|------------------|------|---------------|
| https://www.city.meguro.tokyo.jp/smph/kurashi/toukei/index.html | gov | [x] |
| https://www.city.setagaya.lg.jp/01110/5199.html | gov | [x] |
| https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/ichiran.html | gov | [x] |
| https://www.homes.co.jp/mansion/chuko/tokyo/ | market portal | [x] |
| https://suumo.jp/chintai/tokyo/ | market portal | [x] (secondaryUrl) |

**references ⊆ sources**: N/A (no `references` block)

---

## Notes

- Sub-area ㎡ bands and rent ranges are **editorial composites** from LIFULL/SUUMO indices (May 2026); ward averages footnoted as cite **#4**.
- Ward income figures: 令和6年度 municipal tax survey (published 2024 base year).
