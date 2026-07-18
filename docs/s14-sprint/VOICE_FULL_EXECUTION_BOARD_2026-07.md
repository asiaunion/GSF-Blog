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
| B4 | 11 | `tokyo-kokubunji-kunitachi-fuchu-tachikawa` | queued | Ep.10 · Voice 기준선·최소 개입 · B4 해제(07-19) |
| B4 | 12 | `tokyo-hachioji-hino-akishima` | queued | Ep.11 · FA 스캔 이력 없음·잠금표 강화·naver 신규 · B4 해제(07-19) |
| B4 | 13 | `tokyo-ward-guide-series-prologue` | queued | 프롤로그 · title/H2/목차/링크 동결 · B4 해제(07-19) |
| REF | — | `tokyo-machida-tama-inagi` | reference | Ep.12 · 재작성 금지 · 최종 비교 |
| A1 | 14 | `korea-japan-inheritance-gift-tax-cross-border-basics` | queued | YMYL · 사실 문장 의미 보존 |
| A1 | 15 | `korea-resident-japan-property-capital-gains-tax` | queued | YMYL · 세법 의미 보존 |
| A1 | 16 | `buying-property-japan-checklist-before-you-commit` | queued | 법률/거래 체크리스트 보존 |
| A2 | 17 | `tokyo-moving-contracts-two-notes` | queued | 계약 YMYL |
| A2 | 18 | `japan-shinchiku-vs-chuko-mansion-investor-guide` | queued | 내진 기준 의미 보존 |
| A2 | 19 | `j-reit-five-things-to-know` | queued | 투자 권유 톤 금지 |
| A3 | 20 | `tokyo-office-vacancy-five-wards-2026` | queued | 월간 2.22% 정의 보존 |
| A3 | 21 | `tokyo-real-estate-investment-complete-guide` | queued | 허브 spine 전면 금지 |
| A3 | 22 | `nihonbashi-hamacho-walking-guide` | queued | 장소 사실·개업일 보존 |

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
