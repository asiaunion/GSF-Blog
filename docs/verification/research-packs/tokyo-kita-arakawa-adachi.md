# Research pack: tokyo-kita-arakawa-adachi

- Episode: Ep.07
- Generated: 2026-06-17
- Wards: 北区, 荒川区, 足立区
- SSOT: docs/verification/tokyo-ward-series-benchmarks.json

## Executive summary

- **北区**: 70㎡≈6272万 · ㎡89.6 · n=585 · CAGR5y=—% · 인구Δ=3.2%% · 1R=— · Yield≈—%
- **荒川区**: 70㎡≈6027万 · ㎡86.1 · n=510 · CAGR5y=—% · 인구Δ=-0.8%% · 1R=— · Yield≈—%
- **足立区**: 70㎡≈4151万 · ㎡59.3 · n=920 · CAGR5y=—% · 인구Δ=-0.7%% · 1R=— · Yield≈—%

## Ward comparison table

| 구 | 70㎡(万) | ㎡단가 | 거래수 | Top역 | 승하차/일 | 인구Δ | 홍수 | 액상화 | 1R임대 | Yield% |
|---|---:|---:|---:|---|---:|---|:---:|:---:|---:|---:|
| 北区 | 6272 | 89.6 | 585 | 東十条 | 44082 | 3.2% | Y | Y | — | — |
| 荒川区 | 6027 | 86.1 | 510 | 北千住 | 501818 | -0.8% | Y | Y | — | — |
| 足立区 | 4151 | 59.3 | 920 | 竹ノ塚 | 65257 | -0.7% | Y | Y | — | — |

## Price timeseries (MLIT XIT001)

### 北区

| Year | ㎡단가 | n | YoY% |
|---|---:|---:|---:|
| 2021 | 69 | 369 | — |
| 2022 | 74.5 | 387 | 8 |
| 2023 | 81.6 | 387 | 9.5 |
| 2024 | 83.1 | 464 | 1.8 |
| 2025 | 89.6 | 585 | 7.8 |

### 荒川区

| Year | ㎡단가 | n | YoY% |
|---|---:|---:|---:|
| 2021 | 68.5 | 316 | — |
| 2022 | 71 | 310 | 3.6 |
| 2023 | 74.3 | 328 | 4.6 |
| 2024 | 81.4 | 328 | 9.6 |
| 2025 | 86.1 | 510 | 5.8 |

### 足立区

| Year | ㎡단가 | n | YoY% |
|---|---:|---:|---:|
| 2021 | 47.4 | 548 | — |
| 2022 | 49.1 | 560 | 3.6 |
| 2023 | 53.5 | 575 | 9 |
| 2024 | 56.2 | 643 | 5 |
| 2025 | 59.3 | 920 | 5.5 |


## 町名 price distribution (NOT station-level)

### 北区

| 町名 (北区) | n | ㎡단가(万) | blog_primary |
|---|---:|---:|:---:|
| 滝野川 | 93 | 93.7 | Y |
| 志茂 | 44 | 88 | Y |
| 浮間 | 39 | 68.5 | Y |
| 東十条 | 37 | 71.8 | Y |
| 豊島 | 35 | 73.9 | Y |
| 赤羽北 | 33 | 74.2 | Y |
| 王子 | 32 | 100 | Y |
| 西ケ原 | 27 | 102.1 | N |

### 荒川区

| 町名 (荒川区) | n | ㎡단가(万) | blog_primary |
|---|---:|---:|:---:|
| 東日暮里 | 110 | 98.4 | Y |
| 南千住 | 107 | 82.9 | Y |
| 西日暮里 | 82 | 107 | Y |
| 荒川 | 76 | 76.9 | Y |
| 町屋 | 47 | 75.8 | Y |
| 東尾久 | 46 | 69.5 | Y |
| 西尾久 | 42 | 67.6 | Y |

### 足立区

| 町名 (足立区) | n | ㎡단가(万) | blog_primary |
|---|---:|---:|:---:|
| 梅田 | 58 | 62.7 | Y |
| 綾瀬 | 55 | 72.7 | Y |
| 東和 | 42 | 51.9 | Y |
| 中央本町 | 42 | 43.4 | Y |
| 新田 | 37 | 60.1 | Y |
| 西新井本町 | 33 | 48.7 | Y |
| 小台 | 29 | 48.4 | N |
| 大谷田 | 29 | 39.6 | N |


## Demand & risk notes

- **北区**: top station 東十条 · flood=Y · liquefaction=Y (tile sample)
- **荒川区**: top station 北千住 · flood=Y · liquefaction=Y (tile sample)
- **足立区**: top station 竹ノ塚 · flood=Y · liquefaction=Y (tile sample)

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