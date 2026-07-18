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
| 3 | `korea-resident-japan-property-capital-gains-tax` (#8) | done | 준캘리브(YMYL) | Cursor backup | Cursor backup | done | n/a(삭제0) | Cursor 반영 | validate 100 |
| 4 | `tokyo-office-vacancy-five-wards-2026` (#9) | verified | — | Cursor backup | Cursor backup | done (삭제4·에스컬레이션 불필요) | n/a | Cursor 반영 | validate 100 |
| 5 | `nihonbashi-hamacho-walking-guide` (#10) | verified | — | Cursor backup | Cursor backup | done (삭제3·에스컬레이션 불필요) | n/a | Cursor 반영 | validate 100 |
| 6 | `tokyo-real-estate-investment-complete-guide` (#4) | verified | 허브 마지막·본문 전면 금지 준수 | Cursor backup | Cursor backup | done (FA 0·삭제0·링크 title 정합) | n/a | Cursor 반영 | validate 100 |
| 7 | `j-reit-five-things-to-know` (#4b) | verified | 허브 링크 대상 title 선확정 | Cursor backup | Cursor backup | done (T0/T1 교정·삭제4) | n/a(에스컬레이션 불필요) | Cursor 반영 | validate 100 |

## Completed calibration evidence

| slug | 완료 | 주요 FA |
|------|------|---------|
| `korea-japan-inheritance-gift-tax-cross-border-basics` (#2) | 2026-07-18 | 10년 과세·7년 합산·2028 개편·조약 교정 |
| `tokyo-hachioji-hino-akishima` (#3) | 2026-07-18 | 중복 표·계산 기준 불일치 수익률·인과 단정 |
| `tokyo-korean-community-beyond-shinokubo` (#6) | 2026-07-18 | 단체명·미검증 인구/수요·투자 기회 주장 |
| `buying-property-japan-checklist-before-you-commit` (#5) | 2026-07-18 | 죽은 MLIT URL · 내진=건축확인일 · REINS 공개경로 · 중개업자 귀속 |
| `tokyo-moving-contracts-two-notes` (#7) | 2026-07-18 | citeSources 복제·GTN 순위·수락률·6년 단정 · Cursor backup |
| `korea-resident-japan-property-capital-gains-tax` (#8) | 2026-07-18 | 한국 계속 5년 요건 · 제118조의6 · 신고순서 단정 · 주민세·법인세율 완화 |

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
| B2 | Ep.1–10 series posts | **done** (2026-07-18) | Claude drop → Cursor 판정·반영 · validate 100 · prod |
| B3 | Ep.11–12 | done surface | #3·Ep.12 이미 SEO/Voice 처리 |

### B2 세부 (Claude drop 2026-07-18 · Cursor 판정)

| Ep | slug | FA 판정 | 상태 |
|----|------|---------|------|
| 1 | `tokyo-core-3-wards-chiyoda-chuo-minato` | FA 4건(가짜 fact-audit·소득 오출처·은행 실명·중요토지법 무출처) + 도입 직답 — fact-audit 정직 재생성 · 소득 총무성 출처+추정 표기 · 은행 실명 삭제 · 법령 완화 | **verified · validate 100** (2026-07-18, `SKIP_TRUST_VERIFY=1`) |
| 2 | `tokyo-shinjuku-shibuya-bunkyo` | FA 3건(소득 오출처·신오쿠보 최다 단정·시부야 뿐/선점 완화) + 도입 직답 — 총무성 출처+추정 표기 · 신오쿠보/시부야 완화 · 선점 전략 삭제 | **verified · validate 100** (2026-07-18, `SKIP_TRUST_VERIFY=1`) |
| 3 | `tokyo-meguro-setagaya` | FA 2건(스타벅스 수치 완화·수익률 고지) · title 무변경 | **verified · validate 100** |
| 4 | `tokyo-shinagawa-ota` | FA 1건(리니어 2027 단정 완화) · FA#2 보류 · title 무변경 | **verified · validate 100** |
| 5 | `tokyo-toshima-nakano-suginami` | FA 1건(Joseph's View 유지·정답/강력 단정 완화) | **verified · validate 100** |
| 6 | `tokyo-taito-sumida-koto` | FA 1건(지진 주의 등급 무출처 → Ep.7/8 톤 통일) | **verified · validate 100** |
| 7 | `tokyo-kita-arakawa-itabashi-nerima` | FA 0 — 반복 H3는 의도적 템플릿 판정 | **done (無변경)** |
| 8 | `tokyo-adachi-katsushika-edogawa` | FA 0 — 검산 일치 · nav 정합은 Wave C 이월 | **done (無변경)** |
| 9 | `tokyo-musashino-mitaka-chofu` | **T0** KO 중복 섹션(H2 구조) — Joseph 승인 완료(2026-07-18) · KO 중복 블록 삭제·H2 5섹션 정합·TOC 앵커 수정 · 시리즈 목록 확인(이미 정합) · FA#2 T2 보류 | **verified · validate 100** (2026-07-18, `SKIP_TRUST_VERIFY=1`) |
| 10 | `tokyo-kokubunji-kunitachi-fuchu-tachikawa` | FA 0 — 시리즈 기준선 채택 | **done (無변경)** |

## Wave C — 백필

Wave A/B 밖 잔여 슬러그. Gate A·동결 해제 후 §1–4+FA. 신규 JA 발행 없음.

## 운영 잠금

- 페이싱 가이던스 2–3 slug/일, 상한 없음
- 삭제 claim 5건 이상 또는 H2 구조 변경 → Joseph 사전 1줄
- GPT/AG 문제 시 Claude/Cursor 백업
- ~07-29 이후 T0 + YMYL성 T1만 Joseph 승인 핫픽스
- Naver 대기 3편 초과 시 오래된 것부터 발행
