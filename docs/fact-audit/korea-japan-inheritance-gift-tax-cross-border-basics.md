# Fact audit — `korea-japan-inheritance-gift-tax-cross-border-basics`

**Audit date:** 2026-07-18
**Locales:** KO / EN / JA
**Status:** PASS — Cursor validation and production build (2026-07-18)

## Claims (legal and numeric)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---|---|---|---|---|
| 1 | 일시거주자는 직전 15년 중 일본 주소 기간이 합계 10년 이하인 사람 | 15년 / 10년 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/sozoku/4138.htm | [x] | §1 |
| 2 | 10년은 자동 과세 결론이 아니라 양쪽 당사자 분류의 한 요소 | 10년 | https://www.nta.go.jp/english/taxes/others/02/15001.htm | [x] | Intro·§1 |
| 3 | 상속 개시일이 2026년 12월 31일까지이면 종전 3년 범위 | 2026년 12월 31일 | https://www.nta.go.jp/english/taxes/others/02/15001.htm | [x] | §2 |
| 4 | 단계 적용 시작일 | 2027년 1월 1일 | https://www.nta.go.jp/english/taxes/others/02/15001.htm | [x] | §2 |
| 5 | 단계 적용 종료일 | 2030년 12월 31일 | https://www.nta.go.jp/english/taxes/others/02/15001.htm | [x] | §2 |
| 6 | 단계 적용 기간의 합산 기산일 | 2024년 1월 1일 | https://www.nta.go.jp/english/taxes/others/02/15001.htm | [x] | §2 |
| 7 | 전면 7년 범위 적용 시작일 | 2031년 1월 1일 | https://www.nta.go.jp/english/taxes/others/02/15001.htm | [x] | §2 |
| 8 | 2028년은 입법과 시스템 준비를 전제로 한 목표 시점 | 2028년 | https://www.moleg.go.kr/lawinfo/makingInfo.mo?lawSeq=82156&lawType=TYPE5 | [x] | §3 |
| 9 | 최고세율 인하안은 유산취득세 전환안의 확정 일정이 아님 | 확정 일정 아님 | https://www.moleg.go.kr/lawinfo/makingInfo.mo?lawSeq=82156&lawType=TYPE5 | [x] | §3 |
| 10 | 한일 사이에 별도 상속·증여세 조약은 없음 | 별도 조약 없음 | https://taxlaw.nts.go.kr/st/USESTC001M.do | [x] | §4 |
| 11 | 한국 국내법 외국납부세액공제에는 계산식과 한도가 있음 | 한도 적용 | http://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=900418020 | [x] | §4 |

## Locale parity

- KO, EN and JA use the same seven official frontmatter sources and the same claim sequence.
- All locales reject the “ten years automatically means worldwide taxation” shortcut.
- All locales carry the same 2026 / 2027–2030 / 2031 gift-addback timeline.
- All locales describe Korea’s 2028 timing as conditional and separate the top-rate discussion from the reform schedule.
- All locales distinguish the income-tax treaty from inheritance/gift tax and note possible residual tax after domestic credits.
- KO introduces Japanese legal Kanji only after the Korean reading/name on first occurrence.
- Hero image, locale-specific diagram and three related links are preserved.

## Removed unsafe or irrelevant material

- Corporate-stock gifting, “golden time,” “point of no return,” “only way,” and mandatory simulation language
- The unrelated BOJ / JGB / REIT / office vacancy / inbound tourism freshness block
- Fear framing about wealth disappearing and unsupported universal taxpayer classifications

## Validation

- [x] Parent Cursor review
- [x] `pnpm validate:post korea-japan-inheritance-gift-tax-cross-border-basics` — score 100, hard gate PASS
- [x] `pnpm build` — complete, redirect gate PASS
- [x] Final PASS sign-off
