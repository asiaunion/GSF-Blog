# Research pack: tokyo-taito-sumida-koto

- Episode: Ep.06
- Generated: 2026-06-17
- Wards: 台東区, 墨田区, 江東区
- SSOT: docs/verification/tokyo-ward-series-benchmarks.json

## Executive summary

- **台東区**: 70㎡≈7763万 · ㎡110.9 · n=729 · CAGR5y=—% · 인구Δ=8.4%% · 1R=11.4 · Yield≈1.8%
- **墨田区**: 70㎡≈6482万 · ㎡92.6 · n=719 · CAGR5y=—% · 인구Δ=9.1%% · 1R=10.3 · Yield≈1.9%
- **江東区**: 70㎡≈8400万 · ㎡120 · n=1952 · CAGR5y=—% · 인구Δ=6.4%% · 1R=10.9 · Yield≈1.6%

## Ward comparison table

| 구 | 70㎡(万) | ㎡단가 | 거래수 | Top역 | 승하차/일 | 인구Δ | 홍수 | 액상화 | 1R임대 | Yield% |
|---|---:|---:|---:|---|---:|---|:---:|:---:|---:|---:|
| 台東区 | 7763 | 110.9 | 729 | 浅草 | 162672 | 8.4% | Y | Y | 11.4 | 1.8 |
| 墨田区 | 6482 | 92.6 | 719 | 住吉 | 92207 | 9.1% | Y | Y | 10.3 | 1.9 |
| 江東区 | 8400 | 120 | 1952 | 葛西臨海公園 | 27292 | 6.4% | Y | Y | 10.9 | 1.6 |

## Price timeseries (MLIT XIT001)

### 台東区

| Year | ㎡단가 | n | YoY% |
|---|---:|---:|---:|
| 2021 | 83.5 | 457 | — |
| 2022 | 88.2 | 513 | 5.6 |
| 2023 | 94.8 | 513 | 7.5 |
| 2024 | 102 | 560 | 7.6 |
| 2025 | 110.9 | 729 | 8.7 |

### 墨田区

| Year | ㎡단가 | n | YoY% |
|---|---:|---:|---:|
| 2021 | 71.4 | 496 | — |
| 2022 | 78.2 | 500 | 9.5 |
| 2023 | 80.4 | 456 | 2.8 |
| 2024 | 84.4 | 496 | 5 |
| 2025 | 92.6 | 719 | 9.7 |

### 江東区

| Year | ㎡단가 | n | YoY% |
|---|---:|---:|---:|
| 2021 | 79.9 | 1410 | — |
| 2022 | 88.3 | 1481 | 10.5 |
| 2023 | 94.8 | 1548 | 7.4 |
| 2024 | 105 | 1495 | 10.8 |
| 2025 | 120 | 1952 | 14.3 |


## 町名 price distribution (NOT station-level)

### 台東区

| 町名 (台東区) | n | ㎡단가(万) | blog_primary |
|---|---:|---:|:---:|
| 浅草 | 63 | 104 | Y |
| 台東 | 57 | 125.6 | Y |
| 根岸 | 53 | 93.9 | Y |
| 千束 | 39 | 79.4 | Y |
| 東上野 | 38 | 141.6 | Y |
| 蔵前 | 37 | 123.6 | Y |
| 浅草橋 | 36 | 109.1 | Y |
| 入谷 | 33 | 102.1 | Y |

### 墨田区

| 町名 (墨田区) | n | ㎡단가(万) | blog_primary |
|---|---:|---:|:---:|
| 向島 | 64 | 89.1 | Y |
| 東向島 | 57 | 88.9 | Y |
| 江東橋 | 55 | 107.2 | Y |
| 緑 | 46 | 101.6 | Y |
| 八広 | 36 | 73.1 | Y |
| 立花 | 33 | 69.1 | Y |
| 亀沢 | 32 | 99.7 | Y |
| 千歳 | 32 | 113.2 | Y |

### 江東区

| 町名 (江東区) | n | ㎡단가(万) | blog_primary |
|---|---:|---:|:---:|
| 豊洲 | 320 | 185.4 | Y |
| 有明 | 217 | 165.1 | Y |
| 亀戸 | 186 | 93.3 | Y |
| 大島 | 149 | 84.8 | Y |
| 東雲 | 133 | 137.7 | Y |
| 南砂 | 113 | 76.7 | Y |
| 東砂 | 112 | 69.2 | Y |
| 東陽 | 109 | 97.4 | Y |


## Demand & risk notes

- **台東区**: top station 浅草 · flood=Y · liquefaction=Y (tile sample)
- **墨田区**: top station 住吉 · flood=Y · liquefaction=Y (tile sample)
- **江東区**: top station 葛西臨海公園 · flood=Y · liquefaction=Y (tile sample)

## Writer constraints (mandatory)

### Sample size (n)
| n | Rule |
|---|------|
| ≥100 | Numeric quote OK in body |
| 30–99 | Quote OK with footnote "n=XX건 기준" |
| <30 | No body numbers — qualitative only |
| <10 | Omit from manifest |

### 町名 labeling (XIT001 price)
- FORBIDDEN: "○○역 주변 저평가", "역세권 대비 단가", NearestStation inference
- REQUIRED: "○○町（町名）平均 ○○万円/㎡", "MLIT成約価格・町名別集計 (n=…)"

### Other
- XKT* / XPT002: tile sample ≠ administrative ward boundary
- Yield proxy: pre-tax surface yield; excludes management fees and vacancy
- Transit minutes: tier C unless user_capture

## Suggested manifest prefixes

- MLIT-{WARD}-70 · SUUMO-{WARD}-1R · STATION-{WARD}-TOP · PCT-{WARD}-VS-CHUO
- Timeseries claims: benchmark_lookup mlit_mansion_timeseries.wards.{ward}.cagr_5y (if blog_primary)