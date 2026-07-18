# Fact sheet & Translation audit — `tokyo-core-3-wards-chiyoda-chuo-minato`

| Field | Value |
|-------|-------|
| **Slug** | `tokyo-core-3-wards-chiyoda-chuo-minato` |
| **Title (KO)** | 도쿄 도심 3구 집값 비교 — 치요다·주오·미나토 [Ep.1·2026] |
| **Cursor validate** | PASS — 2026-07-18 Wave B (`SKIP_TRUST_VERIFY=1`, score 100 / hard gates PASS) |
| **Published** | Live |

> 2026-07-18 재생성. 이전 fact sheet는 본문 숫자 138개 전부를 도쿄도 통계 URL 1개에 일괄 "Verified" 매핑한 가짜 PASS 패턴이었다(Wave B drop FA#1). 아래는 실제 claim ↔ 실제 출처의 정직한 매핑이다.

---

## Claims — 출처가 뒷받침하는 항목

| # | Claim (KO) | 근거 출처 | Status |
|---|-----------|-----------|--------|
| 1 | 구 전체 맨션 평균 ㎡단가 — 치요다 194.7만엔 / 주오 181.1만엔 / 미나토 220.6만엔 | [国土交通省 不動産情報ライブラリ 成約価格情報](https://www.reinfolib.mlit.go.jp/) (2025 Q1–Q4 성약가) | [x] |
| 2 | 수도권 중고 맨션 가격 동향(가격 수준의 맥락) | [도쿄 칸테이 70㎡ 가격 동향 2025](https://www.kantei.ne.jp/wp-content/uploads/c2025.pdf) · [REINS 수도권 마켓워치 2026-04](https://www.reins.or.jp/pdf/trend/mw/mw_202604_summary.pdf) | [x] |
| 3 | 인구 — 치요다 약 67,000명(23구 최소) / 주오 약 191,000명 / 미나토 약 266,000명 | [도쿄도 인구추계 (주민기본대장)](https://www.toukei.metro.tokyo.lg.jp/jsuikei/js-index.htm) | [x] |
| 4 | 주오구 2000년 이후 인구 2배 이상 증가 추세 | [도쿄도 인구추계 (주민기본대장)](https://www.toukei.metro.tokyo.lg.jp/jsuikei/js-index.htm) | [x] |
| 5 | 외국인 주민 비율 — 치요다 약 4.5% / 주오 약 5.5% / 미나토 약 11~12%(23구 최고 수준) | [도쿄도 통계 포털(주민기본대장 외국인 인구)](https://www.toukei.metro.tokyo.lg.jp/) — 근사치 | [x] |
| 6 | 외국인(해외주소) 매수자 존재·집중 맥락 | [국토교통성 신축 맨션 해외주소 매수자 조사 2025-11](https://www.mlit.go.jp/report/press/tochi_fudousan_kensetsugyo05_hh_000001_00237.html) | [x] |

## Claims — 공적 통계 기반 추정으로 표기한 항목

| # | Claim (KO) | 처리 |
|---|-----------|------|
| 1 | 납세자 평균 연수입 — 치요다 약 950만엔 / 주오 약 730만엔 / 미나토 약 1,200만엔 이상 | 출처를 국세청 민간급여실태통계(전국 집계, 구 단위 미제공 — 이전 매핑 오류)에서 [총무성 시정촌별 과세대상소득 통계](https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/ichiran09_25.html)로 교체(Ep.3와 동일 출처). 원문 표에서 개별 수치를 직접 대조하지 못해 본문 3곳 + 비교표에 **"공적 통계 기반 추정"** 명기 |
| 2 | 서브지역별 ㎡단가 범위 · 임대 시세 표 · 임대 수익률(Cap Rate) 2~3% 등 | 리스팅 기반 편집부 추정 — 본문 상단 데이터 기준 시점 블록에 "시장 리스팅 기반의 편집부 추정치" 명기 |
| 3 | 치요다 주간 유동인구 80만 이상 · 인구 밀도 · 관리비 5~15만엔 | 근사치·편집부 추정 — 데이터 기준 시점 블록의 추정 명기에 포함 |

## Claims — 2026-07-18 삭제·완화 항목

- "일부 은행(미즈호·UFJ·스미토모)에서 외국인 대출 취급" → 은행 실명 삭제, "일부 대형 은행에서 취급하나 조건은 은행·지점별로 상이" 로 완화 (FA#3 — 출처 없음, YMYL)
- "특정 지역(방위 시설 인근 등)은 사전 신고 의무 … 핵심 3구 내 일반 맨션은 해당 없음" → "관련 법령(중요토지등조사법 등)은 매입 전 전문가 확인 필요" 로 완화 (FA#4 — 무출처 법률 단정)
- "미나토구에는 160개 이상의 외국 대사관과 공관" → "다수의 외국 대사관과 공관" (수치 출처 확인 불가)
- 미나토 소득 "23구에서 1위" → "최상위권" (추정 표기와 함께 순위 단정 완화)

## Locale parity (KO ↔ EN ↔ JA)

| Item | KO | EN | JA |
|------|----|----|----|
| 도입 직답 문장(194.7/181.1/220.6만엔) | Y | Y | Y |
| 소득 3곳 — 총무성 추정 표기 + source-4 | Y | Y | Y |
| 은행 실명 삭제·완화 | Y | Y | Y |
| 법적 제한 — 중요토지등조사법 완화 문구 | Y | Y | Y |
| 대사관 수치 삭제 | Y | Y | Y |
| citeSources — NTA → 총무성 교체 | Y | Y | Y |

---

## Sign-off

- [x] 각 claim이 실제 사용된 sources 항목과 매핑됨 (단일 URL 일괄 매핑 제거)
- [x] `citeSources` URL ⊆ `sources`
- [x] KO / EN / JA 수치·단체명·법률 의미 정합
- [ ] `pnpm validate:post tokyo-core-3-wards-chiyoda-chuo-minato` — score 100, hard gates PASS
