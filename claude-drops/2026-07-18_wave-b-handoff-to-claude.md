# Wave B SEO+FA — Claude 핸드오프 (Cursor → Claude)

> **날짜:** 2026-07-18  
> **발신:** Cursor (Joseph 승인: Wave B 전체 진행 · Claude 작업 / Cursor 검증)  
> **SSOT:** `docs/s14-sprint/SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md`  
> **보드:** `docs/s14-sprint/FATAL_AUDIT_BOARD.md` · `OPEN_QUEUE.md`  
> **Voice:** Lite only (`JOSEPH_AUTHENTIC_VOICE.md` v1.3 · 2026-07-18 잠금)  
> **로그:** drop만 · WEEKLY/_handoff 직접 수정 금지 · 종료 시 「저장하고 세션 종료」

---

## Joseph → Claude 붙여넣기용 (아래부터)

```
Wave B SEO+FA를 진행한다. Cursor가 검증·배포하고, 너는 slug당 drop만 쓴다. repo 파일 직접 수정·validate·deploy 금지.

## 목적
도쿄 워드 가이드 Ep.1–10에 §1–4(SEO) + Fatal Audit(T0/T1만) Voice Lite 패스.
Wave A(Tier1)는 이미 닫힘. Voice Full·spine 전면 재작성·새 수치 창작·AdSense 재신청 금지.

## SSOT (반드시 읽고 준수)
1. docs/s14-sprint/SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md
2. docs/s14-sprint/FATAL_AUDIT_BOARD.md (Wave B + preflight H3 표)
3. docs/SEO_WRITING_GUIDE_2026-07.md (§1–4)
4. docs/JOSEPH_AUTHENTIC_VOICE.md v1.3 (Lite만)

## 대상 slug (이 순서 · 한 slug = drop 1파일)

| Ep | slug | 비고 |
|----|------|------|
| 1 | tokyo-core-3-wards-chiyoda-chuo-minato | scan:md 반복 H3 신호 |
| 2 | tokyo-shinjuku-shibuya-bunkyo | 동상 |
| 3 | tokyo-meguro-setagaya | Tier0 §1–4 이미 live · SEO는 미세조정만 · FA 필수 |
| 4 | tokyo-shinagawa-ota | Tier0 §1–4 이미 live · SEO는 미세조정만 · FA 필수 |
| 5 | tokyo-toshima-nakano-suginami | scan:md 반복 H3 |
| 6 | tokyo-taito-sumida-koto | 동상 |
| 7 | tokyo-kita-arakawa-itabashi-nerima | 동상 |
| 8 | tokyo-adachi-katsushika-edogawa | 동상 |
| 9 | tokyo-musashino-mitaka-chofu | 동상 |
| 10 | tokyo-kokubunji-kunitachi-fuchu-tachikawa | Ep.10 · H3 신호 표 밖이어도 동일 패스 |

### SKIP (손대지 말 것)
- tokyo-ward-guide-series-prologue (B1 deferred · Tier0 대량 재터치 금지)
- tokyo-hachioji-hino-akishima (Ep.11 / Tier1 #3 · surface done)
- tokyo-machida-tama-inagi (Ep.12 · Voice Full 벤치마크 · surface done)

## drop 경로·파일명
claude-drops/YYYY-MM-DD_wave-b_{slug}.md
예: claude-drops/2026-07-18_wave-b_tokyo-core-3-wards-chiyoda-chuo-minato.md

## drop 필수 4섹션 (slug당)
A. 쿼리/SERP 정찰 (목표 쿼리 1개 + 근거)
B. §1–4 초안 2안 (title / description / 도입~200자 직답 / 질문형 H2 3–5) — KO 기준, EN·JA 의미 정합 메모
C. FA 표 (아래 열). **판정(Cursor) 열은 비워 둔다.**
D. Voice Lite 자가체크 (직답 먼저 · 발견서술 ≤1 · 지명 병기 KO·손댄 첫 등장 1회 · 반드시/guaranteed/絶対に 금지)

FA 표 열:
| # | 등급 | 위치(H2/문장) | 문제 유형 | 확인 시도 소스 URL 또는 `확인 불가` | 제안 조치 | 판정(Cursor) |

## HARD
1. 1차=SEO §1–4 · 2차=FA(T0/T1)만. spine 전면 금지 · 대체 서술 신설 금지.
2. 삭제 claim ≥5 또는 FA로 H2 구조 변경 → drop에 「Joseph 사전 1줄 필요」 명시 · 그 slug는 반영 보류.
3. 반복 H3: 자동 FA 금지. 의도적 비교 템플릿이면 「유지」로 표기. 실제 중복 본문·깨진 구조만 FA.
4. 수치·단체명·법률은 출처 URL 없으면 FA(완화/삭제). 새 통계 창작 금지.
5. KO `반드시` / EN `guaranteed` / JA `絶対に` 금지.
6. 페이싱: 가이던스 2–3 slug/일 · 상한 없음 · 하루 수십 편 일괄 금지. 한 세션에 여러 drop OK이나 **완성도 우선**.
7. GPT 블라인드 FA는 별도. 너는 Claude 목록만. GPT에게 네 drop을 보여주지 말 것.
8. repo의 src/data/blog · fact-audit · naver-drafts 직접 수정 금지. drop만.

## Cursor가 이어서 할 일 (너는 하지 않음)
합집합 판정 → 파일 반영 → pnpm validate:post → prod → IndexNow → FATAL_AUDIT_BOARD/OPEN_QUEUE → hub:log

## 세션 종료
「저장하고 세션 종료」. drop만 남기고 WEEKLY/_handoff 직접 수정하지 말 것.
완료 요약: 쓴 drop 파일명 목록 · Joseph 에스컬레이션 slug · 다음 미착수 Ep 번호.
```

---

## Cursor 메모 (Joseph용)

- 역할: Claude = R1 drop · Cursor = R2b 판정 + R6 검증/배포 (AG 없으면 Cursor가 반영 대행 = D5)
- 동결(~07-29) 전: title/도입/H2 SEO+FA 허용. 동결 후: 대량 표면 중지 · T0+YMYL T1만 Joseph 승인 핫픽스.
- Ep.3·4는 Tier0 표면 이미 있음 → Claude SEO 2안은 “유지 vs 미세조정” 중심으로 받아도 됨. FA는 풀스캔.
- 첫 검증 우선순위 제안: Ep.1 → Ep.2 → … 순서대로 Cursor merge.
