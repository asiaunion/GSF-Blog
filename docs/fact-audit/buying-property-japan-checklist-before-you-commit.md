# Fact sheet — `buying-property-japan-checklist-before-you-commit`

| Field | Value |
|-------|--------|
| **Slug** | buying-property-japan-checklist-before-you-commit |
| **Title (KO)** | 일본 맨션 구매 주의사항 — 계약 전 확인할 10가지 [2026] |
| **Category** | essay (E-E-A-T) |
| **Cursor validate** | PASS — 2026-07-18 SEO+FA calibration |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 1981년 6월 이후의 새 내진 기준 / 건축 확인일 기준 | 1981-06-01 新耐震基準; 분류는 건축 확인일 | [MLIT housing performance reference PDF](https://www.mlit.go.jp/common/001204021.pdf) | [x] | Intro / §1 |
| 2 | 국토교통성은 실제 부동산 거래가격을 공개 | 부동산정보라이브러리·거래가격정보제도 | [MLIT transaction price info](https://www.mlit.go.jp/totikensangyo/totikensangyo_tk5_000069.html) · [Real Estate Information Library](https://www.reinfolib.mlit.go.jp/) | [x] | §7 |
| 3 | 일반인이 볼 수 있는 REINS Market Information | 공개 성약 정보 (broker REINS 본체와 구분) | [REINS Market Information](http://www.contract.reins.or.jp/) | [x] | §7 |
| 4 | 대부분 콘도미니엄에 수선적립금 | 가이드라인·관리 체크시트 | [修繕積立金 ガイドライン](https://www.mlit.go.jp/jutakukentiku/house/content/001747009.pdf) | [x] | §2 |
| 5 | 중개업자는 중요사항설명서를 제공해야 함 | 宅建業法 §35 | [MLIT consumer notice](https://www.mlit.go.jp/totikensangyo/const/1_6_bf_000013.html) | [x] | §8 |

## FA corrections (2026-07-18)

- Dead source `totikensangyo_fr2_000043.html` (404) → live MLIT PDF + transaction/RMI URLs
- 「완공」 → 「건축 확인」 (JA hedge 추가)
- REINS org homepage → REINS Market Information / 不動産情報ライブラリ
- 「모든/every/すべて」 → 「대부분/virtually every/ほとんど」
- 「매도인 측 중개사」 → 「중개업자 / brokerage / 宅地建物取引業者」
- JA 「旧耐震基準（旧耐震基準）」 중복 제거

## Locale parity

| Item | KO | EN | JA |
|------|----|----|----|
| 직답 도입 | Y | Y | Y |
| 건축 확인일 기준 | Y | Y | Y |
| 공개 거래데이터 경로 | Y | Y | Y |
| 질문형 H2 4개 | Y | Y | Y |

---

## Sign-off

- [x] Dead Tier-1 URL removed
- [x] KO / EN / JA meaning aligned
- [x] `pnpm validate:post buying-property-japan-checklist-before-you-commit`
- [x] `pnpm build`
