# SEO + Fatal Audit — `korea-resident-japan-property-capital-gains-tax`

**Audit date:** 2026-07-18
**Locales:** KO / EN / existing JA
**Scope:** SEO §1–4 + Fatal Audit T0/T1, Voice Lite
**Status:** PASS — Cursor validation score 100, hard gates PASS

---

## Cursor FA judgments

| # | 등급 | 위치·기존 주장 | 공식 대조 | 조치 | 판정(Cursor) |
|---|---|---|---|---|---|
| 1 | T0 | 한국 거주자는 모두 한국 신고 의무 | 소득세법 제118조의2는 양도일까지 계속 5년 이상 국내 주소·거소를 둔 거주자로 한정 | KO/EN/JA·Naver에 5년 요건 추가 | 수정 완료 |
| 2 | T0 | 외국납부세액공제 근거를 소득세법 제57조로 인용 | 국외자산 양도소득 전용 근거는 제118조의6이며 세액공제·필요경비 산입 중 선택 | source/citeSources와 본문 교정 | 수정 완료 |
| 3 | T1 YMYL | 일본 신고 완료 → 한국 신고 → 공제라는 고정 순서 | 양국 신고기한은 불일치할 수 있고 제118조의6은 납부했거나 납부할 세액을 규정 | 최초 신고·증빙 보완·경정청구 확인으로 완화 | 수정 완료 |
| 4 | T1 | 비거주자는 주민세 면제라고 일괄 단정 | NTA 3208/3211은 주민세율을 병기하며 개인의 지방세 의무는 주소·기준일 사실관계 필요 | 30.63%·15.315%를 국세율로 한정 | 수정 완료 |
| 5 | T1 | 계약일을 며칠·몇 주 조정하면 세율 변경 | 장단기 판정은 양도한 해 1월 1일 기준 | 연말과 다음 해 사이로 한정 | 수정 완료 |
| 6 | T1 | 법인 매각은 단일 법인세율 | 일본 법인 과세는 국세·지방세 및 법인 조건에 따라 달라짐 | 단일세율 단정 완화 | 수정 완료 |
| 7 | T1 | No.2024(기한 후 신고)를 정상 확정신고 기한 근거로 사용 | NTA No.1932가 비거주자의 일본 부동산 매각·기한·납세관리인을 직접 설명 | 출처를 No.1932로 교체 | 수정 완료 |
| 8 | T1 | 관련 서류를 영구 보관 | 영구 보관 근거 없음 | 법정 보관기간에 맞춰 보관으로 완화 | 수정 완료 |

---

## Claims

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---|---|---|---|---|
| 1 | 2021년 5월 1일 | 202151 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3202.htm | [x] | 장단기 예시 |
| 2 | 2026년 6월 1일 | 202661 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3202.htm | [x] | 장단기 예시 |
| 3 | 2026년 1월 1일 | 202611 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3202.htm | [x] | 장단기 예시 |
| 4 | 단기 30.63% | 30.63pct | https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3211.htm | [x] | 국세율 |
| 5 | 장기 15.315% | 15.315pct | https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3208.htm | [x] | 국세율 |
| 6 | 매매 대금 총액의 10.21% | 10.21pct | https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2884.htm | [x] | 원천징수 |
| 7 | 매매 대금이 100,000,000엔 이하 | 100000000 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2884.htm | [x] | 원천징수 예외 |
| 8 | 계속 5년 이상 국내에 주소 또는 거소 | 5y | http://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsId=001565&lsJoLnkSeq=1000820843&print=print | [x] | 한국 과세 범위 |
| 9 | 양도일이 속하는 달의 말일부터 2개월 | 2mo | https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308 | [x] | 한국 예정신고 |
| 10 | 2026년 7월 4일 | 202674 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3202.htm | [x] | 데이터 기준 시점 |

**citeSources ⊆ sources:** [x] confirmed across KO / EN / JA

---

## Locale and Naver parity

- KO / EN / JA use the same nine official frontmatter sources and claim sequence.
- All locales state the Korean continuous-five-year condition, Article 118-6 election, and relief limits.
- All locales limit 30.63% / 15.315% to Japanese national tax and separate possible local-tax facts.
- All locales preserve the same 10.21% withholding exception and NTA No.1932 filing guidance.
- Naver mirrors the corrected title intent, five-year Korean condition, withholding exception, and foreign-tax-relief limits.
- No claim deletion; no H2 added or removed. Existing six numbered H2s were renamed as questions.

---

## Sign-off

- [x] FA open 0
- [x] All corrected claims verified or softened
- [x] Hard-gate words absent from touched files
- [x] `pnpm validate:post korea-resident-japan-property-capital-gains-tax` score 100 / hard gates PASS
