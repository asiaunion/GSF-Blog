# SEO + Fatal Audit Board

> **Owner:** Cursor  
> **SSOT:** [`SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md`](./SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md)  
> **범위:** SEO §1–4 1차 + FA(T0/T1)만 본문 교정  
> **상태값:** `open` → `scanned` → `joseph` → `applied` → `verified` → `live` → `done`

## Wave A — Tier 1

| 순서 | slug | 상태 | 캘리브레이션 | Claude | GPT blind | Cursor FA | Joseph | AG/백업 | 검증 |
|------|------|------|----------------|--------|-----------|-----------|--------|---------|------|
| 1 | `buying-property-japan-checklist-before-you-commit` (#5) | done | 정식 1 | done | done | done | n/a(삭제0) | Cursor 반영 | live |
| 2 | `tokyo-moving-contracts-two-notes` (#7) | done | 정식 2 | delayed→Cursor backup | delayed→Cursor backup | done | n/a | Cursor 반영 | live |
| 3 | `korea-resident-japan-property-capital-gains-tax` (#8) | open | 준캘리브(YMYL) | pending | pending | pending | pending | pending | pending |
| 4 | `tokyo-office-vacancy-five-wards-2026` (#9) | open | — | pending | pending | pending | pending | pending | pending |
| 5 | `nihonbashi-hamacho-walking-guide` (#10) | open | — | pending | pending | pending | pending | pending | pending |
| 6 | `tokyo-real-estate-investment-complete-guide` (#4) | open | 허브 마지막 | pending | pending | pending | pending | pending | pending |
| 7 | `j-reit-five-things-to-know` (#4b) | open | 허브 마지막 | pending | pending | pending | pending | pending | pending |

## Completed calibration evidence

| slug | 완료 | 주요 FA |
|------|------|---------|
| `korea-japan-inheritance-gift-tax-cross-border-basics` (#2) | 2026-07-18 | 10년 과세·7년 합산·2028 개편·조약 교정 |
| `tokyo-hachioji-hino-akishima` (#3) | 2026-07-18 | 중복 표·계산 기준 불일치 수익률·인과 단정 |
| `tokyo-korean-community-beyond-shinokubo` (#6) | 2026-07-18 | 단체명·미검증 인구/수요·투자 기회 주장 |
| `buying-property-japan-checklist-before-you-commit` (#5) | 2026-07-18 | 죽은 MLIT URL · 내진=건축확인일 · REINS 공개경로 · 중개업자 귀속 |
| `tokyo-moving-contracts-two-notes` (#7) | 2026-07-18 | citeSources 복제·GTN 순위·수락률·6년 단정 · Cursor backup |

## Wave B preflight signals — 도쿄 시리즈

`npm run scan:md`가 반복 H3를 탐지했다. 여러 도시를 같은 틀로 비교해 의도적으로 같은 H3를 쓴 경우도 있으므로 **자동 FA 판정 금지**. 각 slug SEO+FA 패스에서 실제 중복 본문·깨진 구조인지 사람이 확인한다.

| slug | 신호 | 상태 |
|------|------|------|
| `tokyo-adachi-katsushika-edogawa` | KO/EN/JA 반복 H3 | triage |
| `tokyo-core-3-wards-chiyoda-chuo-minato` | KO/EN/JA 반복 H3 | triage |
| `tokyo-kita-arakawa-itabashi-nerima` | KO/EN/JA 반복 H3 | triage |
| `tokyo-meguro-setagaya` | KO/EN/JA 반복 H3 | triage |
| `tokyo-musashino-mitaka-chofu` | KO/EN/JA 반복 H3 | triage |
| `tokyo-shinagawa-ota` | KO/EN/JA 반복 H3 | triage |
| `tokyo-shinjuku-shibuya-bunkyo` | KO/EN/JA 반복 H3 | triage |
| `tokyo-taito-sumida-koto` | KO/EN/JA 반복 H3 | triage |
| `tokyo-toshima-nakano-suginami` | KO/EN/JA 반복 H3 | triage |

## Voice Full 상위 큐 (별도 계획)

SSOT: [`VOICE_FULL_PLAN_2026-07.md`](./VOICE_FULL_PLAN_2026-07.md)

FA 삭제로 글이 얇아졌거나 Reader First 전면 편집이 필요한 글만 올린다. 이번 SEO+FA 패스에서는 실행하지 않는다.

| 우선 | slug | 등재 사유 | 상태 |
|------|------|-----------|------|
| 1 | `tokyo-korean-community-beyond-shinokubo` | 미검증 claim 다수 삭제로 구조·분량 재평가 필요 | queued |

## Wave B — 에피소드 (§1–4 + FA, 동결 규칙 적용)

~2026-07-29 이후: title/도입/H2 **대량** 중지. FA는 T0 + YMYL성 T1만 Joseph 승인 핫픽스. 그 전에는 가이던스 2–3/일.

| 순서 | slug | 상태 | 비고 |
|------|------|------|------|
| B1 | `tokyo-ward-guide-series-prologue` | deferred | Tier0 이미 §1–4 live · 대량 재터치 금지 |
| B2 | Ep.1–10 series posts | open queue | `scan:md` 반복 H3 신호 표 참고 · 사람 판정 후 |
| B3 | Ep.11–12 | done surface | #3·Ep.12 이미 SEO/Voice 처리 |

## Wave C — 백필

Wave A/B 밖 잔여 슬러그. Gate A·동결 해제 후 §1–4+FA. 신규 JA 발행 없음.

## 운영 잠금

- 페이싱 가이던스 2–3 slug/일, 상한 없음
- 삭제 claim 5건 이상 또는 H2 구조 변경 → Joseph 사전 1줄
- GPT/AG 문제 시 Claude/Cursor 백업
- ~07-29 이후 T0 + YMYL성 T1만 Joseph 승인 핫픽스
- Naver 대기 3편 초과 시 오래된 것부터 발행
