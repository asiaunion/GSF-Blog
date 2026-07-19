# Voice Full Execution Board — Wave A+B

> Joseph 승인: 2026-07-18  
> SSOT: `VOICE_FULL_PLAN_2026-07.md` · `JOSEPH_AUTHENTIC_VOICE.md` v1.3  
> 파이프: Claude 주도 → GPT 완성도 리뷰 → Claude 통합 → AG 반영/1차 검증 → Cursor 최종 검증/배포

## 상태값

`queued` → `claude` → `gpt-review` → `claude-final` → `ag-applied` → `cursor-verified` → `live`

## 대상

- 합집합 23편: Wave A 11편 + Wave B 프롤로그/Ep.1–12, Ep.11 중복 제외.
- 실행 22편: Ep.12는 이미 Voice Full benchmark이므로 `reference`.
- title·description·slug·H2 spine은 원칙적으로 동결한다. Voice Full은 본문 리듬·Reader First·판단 과정·공통장치 편집이다.

## 실행 큐

| 배치 | 순서 | slug | 상태 | 비고 |
|------|------|------|------|------|
| P0 | 1 | `tokyo-korean-community-beyond-shinokubo` | live | #6 파일럿 · Cursor 검증(100/PASS·build ok·spine 동결)→prod |
| B1 | 2 | `tokyo-core-3-wards-chiyoda-chuo-minato` | live | Ep.1 · Cursor 검증(100/PASS·build ok·spine 동결·새사실0)→prod |
| B1 | 3 | `tokyo-shinjuku-shibuya-bunkyo` | live | Ep.2 · Cursor 검증(100/PASS·build ok·spine 동결·새사실0)→prod |
| B1 | 4 | `tokyo-musashino-mitaka-chofu` | live | Ep.9 · Cursor 검증(100/PASS·YMYL 단정형 완화·수치 보존)→prod |
| B2 | 5 | `tokyo-meguro-setagaya` | live | Ep.3 · Cursor 검증(100/PASS·YMYL 완화·출처 동결)→prod |
| B2 | 6 | `tokyo-shinagawa-ota` | live | Ep.4 · Cursor 검증(100/PASS·EN/JA 누락분 Cursor 보완·리니어 헤지 유지)→prod |
| B2 | 7 | `tokyo-toshima-nakano-suginami` | live | Ep.5 · Cursor 검증(100/PASS·권유 어휘 완화·수치 보존)→prod |
| B3 | 8 | `tokyo-taito-sumida-koto` | live | Ep.6 · Cursor 검증(100/PASS·지진 헤지 유지·수치 보존)→prod |
| B3 | 9 | `tokyo-kita-arakawa-itabashi-nerima` | live | Ep.7 · Cursor 검증(100/PASS·FA-zero 유지·spine 동결)→prod |
| B3 | 10 | `tokyo-adachi-katsushika-edogawa` | live | Ep.8 · Cursor 검증(100/PASS·FA-zero 유지·권유0)→prod |
| B4 | 11 | `tokyo-kokubunji-kunitachi-fuchu-tachikawa` | live | Ep.10 · Cursor 검증(100/PASS·최소 개입 1건 준수)→prod |
| B4 | 12 | `tokyo-hachioji-hino-akishima` | live | Ep.11 · Cursor 검증(100/PASS·재진술만·naver 신규)→prod |
| B4 | 13 | `tokyo-ward-guide-series-prologue` | live | 프롤로그 · Cursor 검증(100/PASS·구조 동결·재배치만)→prod |
| REF | — | `tokyo-machida-tama-inagi` | reference | Ep.12 · 재작성 금지 · 최종 비교 |
| A1 | 14 | `korea-japan-inheritance-gift-tax-cross-border-basics` | live | YMYL · Cursor 검증(100/PASS·사실층 동결·오해→데이터 3건·naver Cursor 재생성)→prod |
| A1 | 15 | `korea-resident-japan-property-capital-gains-tax` | live | YMYL · Cursor 검증(100/PASS·5년·제118조의6 보존·대표문장/노트/콜백)→prod |
| A1 | 16 | `buying-property-japan-checklist-before-you-commit` | cursor-verified | no-op 확정(GPT A+ · Cursor 게이트 승인 2026-07-19) · 변경 0건이라 AG/배포 스킵 · 본문 현행 live 유지 |
| A2 | 17 | `tokyo-moving-contracts-two-notes` | live | GPT 9.5/10 · AG 반영 → Cursor 검증(100/PASS·새사실0·spine 동결)→prod (2026-07-19) |
| A2 | 18 | `japan-shinchiku-vs-chuko-mansion-investor-guide` | live | GPT 9.4/10 · AG 반영 → Cursor 검증(100/PASS·단정표현 재조정 확인·naver 발견문장 버그 Cursor 수정)→prod (2026-07-19) |
| A2 | 19 | `j-reit-five-things-to-know` | live | GPT 9.6/10 · AG 반영 → Cursor 검증(100/PASS·8953 alt 유지 확인)→prod (2026-07-19) |
| A3 | 20 | `tokyo-office-vacancy-five-wards-2026` | claude-final | GPT 9.7/10, 3건 중 2채택+1부분채택(주거시장 확장 새인과라 기각, "이 표" 범위로 한정) · AG Launch 대기 |
| A3 | 21 | `tokyo-real-estate-investment-complete-guide` | live(FA fix only) | Voice Full no-op(GPT 9.9 동의) 유지 · Cursor FA 게이트: #1 "Q1 2026"→"2026년 3월 월별" 3로케일 교정(citeSources·자매글과 정합, validation 우회하던 오표기)+fact-audit row1 날짜토큰 동기화(100/PASS)→prod · #2 마무리 섹션 EN/JA 추가 완료(Joseph (a) 승인 2026-07-19, 로케일 대칭 회복)·#3 공급부족/엘리트수요 인과 = OPEN_QUEUE **F3** 별도 FA 패스 등록(Joseph 동의) |
| A3 | 22 | `nihonbashi-hamacho-walking-guide` | claude-final | GPT 9.6/10, 제안 3건 전부 채택(대표문장 재조정·실전팁·마무리 보강, 전부 3인칭) · 노트문장 스킵 유지(GPT도 동일판단) · AG Launch 대기 |

## slug별 필수 산출물

1. Claude initial/final drop: 기존 사실층과 변경된 문단을 분리한 최종 편집 패키지.
2. GPT review: 70/30, Reader First, 시그니처 라인, 중간 질문, 3줄 문단, 노트 문장, 여운 있는 끝의 누락만 검토.
3. AG applied: KO/EN/기존 JA 의미 정합, fact-audit·Naver 동기화, `validate:post` 1차 PASS.
4. Cursor verified: diff에서 새 사실·새 수치·허구 경험·YMYL 권유가 없는지 확인하고 최종 gate.

## 중단·승인 게이트

- 사실 claim 삭제 ≥5 또는 H2 구조 변경: Joseph 사전 1줄.
- Claude/GPT가 새 통계·새 인과·현장 경험을 추가: 반려.
- GPT는 조언자이며 Claude 원고를 직접 덮어쓰지 않는다. Claude가 채택/기각 이유를 남긴다.
- 파일럿 #6이 Joseph 라이브 읽기를 통과하기 전에는 B1 이후 repo 일괄 반영을 시작하지 않는다.
- AG는 commit/prod 금지. Cursor PASS 후에만 배포한다.
