# GSF-Ark EN 전수 교정 리포트 (배치 1~5)

- 작성일자: 2026-07-05
- 작성자: AG (AntiGravity)
- 대상: `src/data/blog/en/` 내 50개 파일
- 선행: Phase 1 KO 50/50 완료 (`main` `4f6ef2d`, prod 배포 완료)
- 검증 상태: Cursor 검증 대기

## Layer 1 — codespell

- `.codespellrc` allowlist: Chanel, SME, Aoto, trough, theses
- 실행: `codespell src/data/blog/en` → 0건 목표

## 교정 내역 요약

| 파일명 | 줄 번호 | Before | After | 사유 | 확신도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ginza-weekend-walking-guide.md` | 79 | Kyobunkand (教文館) | Kyobunkan (教文館) | 고유명사 말미 'd' 오타 수정 (교분칸 서점 공식 로마자 표기) | 100% |
| `j-reit-five-things-to-know.md` | 129 | can factor in factors like | can consider factors like | 중복 어휘("factor in factors") 문법 오류 수정 | 100% |

### 배치 2/5 (파일 11~20)

| 파일명 | 줄 번호 | Before | After | 사유 | 확신도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `nihonbashi-hamacho-walking-guide.md` | 135 | 'Kilometer Zero' | 'Kilometre Zero' | 파일 내 L113 및 nihonbashi-the-origin-of-japan.md 전체 표기 'Kilometre'로 통일 | 100% |

### 배치 3/5 (파일 21~31: reading-korea-japan ~ tokyo-korean-community)

| 파일명 | 줄 번호 | Before | After | 사유 | 확신도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| (이상 없음) | — | — | — | 11개 파일 전수 검토, 수정 대상 없음 | — |


### 배치 4/5 (파일 32~41: tokyo-mansion-market-reins ~ tokyo-shinjuku-shibuya-bunkyo)

| 파일명 | 줄 번호 | Before | After | 사유 | 확신도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| (이상 없음) | — | — | — | 10개 파일 전수 검토, 수정 대상 없음 (F34 L144 tautology는 독자 설명용 의도적 표현으로 보류) | — |


### 배치 5/5 (파일 42~51: tokyo-small-rental-yield ~ why-warm-investing-holds)

| 파일명 | 줄 번호 | Before | After | 사유 | 확신도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `tokyo-taito-sumida-koto.md` | 106 | 1억 | ¥100 million | 영문 포스트 내 한국어 잔재 제거 | 100% |
| `tokyo-taito-sumida-koto.md` | 263 | 6,000만엔 | ¥60 million | 영문 포스트 내 한국어 잔재 제거 | 100% |
| `tokyo-ward-guide-series-prologue.md` | 110-113 | 1.5 million JPY (150만 JPY)+ (¥1.5M+) 등 | 1.5 million JPY (¥1.5M)+ 등 | 가격대 표의 괄호 안 한국어 잔재 일괄 제거 | 100% |
| `weak-yen-korean-japan-asset-allocation-fx-scenarios.md` | 49 | 100 million JPY (10,000만 JPY) | 100 million JPY | 영문 포스트 내 한국어 괄호 병기 제거 | 100% |

### Cursor 후속 (배치 5 보완)

| 파일명 | 줄 번호 | Before | After | 사유 | 확신도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `tokyo-taito-sumida-koto.md` | 89 | 2026년 4월 | April 2026 | 영문 본문 한글 일자 잔재 제거 | 100% |
| `tokyo-taito-sumida-koto.md` | 129 | 2024년 9월 21일 / 5,000万 / 127万 / 100만 | September 21, 2024 / 50 million / 1.27 million / 1 million | 영문 본문 한글·혼용 수량 표기 정리 | 100% |
| `tokyo-taito-sumida-koto.md` | 176 | 2024년 11월 | November 2024 | 영문 본문 한글 일자 잔재 제거 | 100% |
| `tokyo-taito-sumida-koto.md` | 178 | 2025년 3월 | March 2025 | 영문 본문 한글 일자 잔재 제거 | 100% |
