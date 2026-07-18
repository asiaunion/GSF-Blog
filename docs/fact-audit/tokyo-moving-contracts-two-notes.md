# Fact sheet — `tokyo-moving-contracts-two-notes`

| Field | Value |
|-------|--------|
| **Slug** | tokyo-moving-contracts-two-notes |
| **Title (KO)** | 일본 임대차 계약 주의사항 — 보통차가·정기차가·원상회복 [2026] |
| **Cursor validate** | PASS — 2026-07-18 SEO+FA calibration 2 |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 보통차가(普通借家)인지 정기차가(定期借家)인지 | ordinary vs fixed-term lease | https://www.juutakuseisaku.metro.tokyo.lg.jp/documents/d/juutakuseisaku/310-6-jyuutaku | [x] | Intro / H2-1 |
| 2 | 원상회복(原状回復) 부담이 어떻게 나뉘는지 | intentional/negligent vs normal wear | https://www.juutakuseisaku.metro.tokyo.lg.jp/documents/d/juutakuseisaku/310-6-jyuutaku_eng | [x] | H2-2 |
| 3 | 벽지(크로스) 내구년수를 6년으로 보는 경우가 많습니다 | useful life 6 years | https://www.mlit.go.jp/jutakukentiku/house/torikumi/honbun2.pdf | [x] | H2-2 |
| 4 | 잔존가치를 1엔 수준으로 보는 설명 | residual value ≈ ¥1 | https://www.mlit.go.jp/jutakukentiku/house/content/001611293.pdf | [x] | H2-2 |
| 5 | 퇴거 시 청소비 5만 엔(¥50,000) | example special clause ¥50,000 | https://www.juutakuseisaku.metro.tokyo.lg.jp/documents/d/juutakuseisaku/310-6-jyuutaku | [x] | H2-5 |
| 6 | 월세의 4~6배 | upfront cost range (experience) | https://www.juutakuseisaku.metro.tokyo.lg.jp/documents/d/juutakuseisaku/310-6-jyuutaku_eng | [x] | H2-3 |

## FA corrections (2026-07-18)

- citeSources 단일 PDF 복제 → 도쿄도 JA/EN + MLIT Q&A/본문
- GTN 순위·구별 수락률·구두=법적무효·조항무효 단정 완화/삭제
- 6년 규칙을 가이드라인 기준으로 완화
- KO `반드시` 제거

## Locale parity

| Item | KO | EN | JA |
|------|----|----|----|
| ¥50,000 / 5만 엔 | Y | Y | Y |
| 6년 가이드 | Y | Y | Y |
| 질문형 H2 | Y | Y | Y |

---

## Sign-off

- [x] Unsupported ranking / acceptance-rate claims removed or bounded
- [x] KO / EN / JA meaning aligned
- [x] `pnpm validate:post tokyo-moving-contracts-two-notes`
- [x] `pnpm build`
