# §1–4 / Gate A — Open Queue (Cursor 상기용 SSOT)

> **Owner:** Cursor  
> **목적:** Joseph에게 Tier 0 잔여 · Tier 1 백로그 · Gate A 창을 **잊히지 않게** 세션마다 상기  
> **갱신:** 항목 완료 시 `status` → `done` + `hub:log --author=Cursor`  
> **상위:** [`STATUS.md`](./STATUS.md) · [`SEO_S14_SPRINT_WORK_INSTRUCTION_2026-07.md`](../SEO_S14_SPRINT_WORK_INSTRUCTION_2026-07.md) · PROCESS §0.1

**캘린더 앵커:** Gate A 판정 ~**2026-08-12** → 재신청 직전 **~2주 표면 대량 변경 동결** 시작 ≈ **2026-07-29**  
그 전까지 Tier 1 §1–4 소진 여지. 편수 = FLEX.

---

## Now (P0 — 다음 세션 최우선)

| ID | status | 과제 | 완료 조건 |
|----|--------|------|-----------|
| N1 | open | Tier 0 **네이버** HTML 붙여넣기 발행 (G1→G2→G3) | `STATUS.md` `네이버 URL` 3칸 채움 · ALL v4 HTML |
| N2 | open | Tier 0 GSC URL 검사(선택) · IndexNow 후 색인 상태 확인 | GSC에서 3 slug EN/KO 상태 메모 |

## Next (P1 — Tier 1 백로그 #1–#10 · §1–4만)

배치 권고: **#1·#2** → **#3·#6** → **#5·#7·#4** → **#8·#9·#10**  
(원장: `SEO_SPRINT_PROPOSAL_2026-07.md` §4.2)

| # | status | slug | 주 액션(HARD=§1–4) |
|---|--------|------|-------------------|
| 1 | open | `japan-shinchiku-vs-chuko-mansion-investor-guide` | title·도입·H2 (+ risky-claims면책은 별도 Gate 항목과 정합) |
| 2 | open | `korea-japan-inheritance-gift-tax-cross-border-basics` | title·도입·H2 · 색인 재요청 |
| 3 | open | `tokyo-hachioji-hino-akishima` | title·도입·H2 |
| 4 | open | `tokyo-real-estate-investment-complete-guide` (+절차/비용 의도 분리) | 허브 title/도입·내부링크 정합 (**본문 전면 금지**) |
| 4b | open | `j-reit-five-things-to-know` | Week4 여유 · title·내부링크 |
| 5 | open | `buying-property-japan-checklist-before-you-commit` | title·도입·질문형 H2 |
| 6 | open | `tokyo-korean-community-beyond-shinokubo` | title·도입·H2 + **네이버 동주** |
| 7 | open | `tokyo-moving-contracts-two-notes` | title·도입·H2 |
| 8 | open | `korea-resident-japan-property-capital-gains-tax` | title·도입·H2 · #2 상호링크 |
| 9 | open | `tokyo-office-vacancy-five-wards-2026` | title·도입·H2 (수치=citeSources만) |
| 10 | open | `nihonbashi-hamacho-walking-guide` | title·도입·H2 · hub 내부링크 |

## Monitor (P2 — 병행)

| ID | status | 과제 |
|----|--------|------|
| G1 | open | Gate A: 네이버/티스토리 **레퍼럴 2주 연속** (GA4) |
| G2 | open | Gate A: GSC 28d 임계 · risky-claims · 리다이렉트 |
| G3 | open | **~07-29 이후** title·표면 **대량** 변경 중지 (소규모 정합만) |
| G4 | open | AdSense **재신청 금지** until Gate A 통과 + Joseph 명시 |

## Done (닫힘)

| ID | done | 비고 |
|----|------|------|
| T0-KO | 2026-07-17 | G1–G3 KO §1–4 prod |
| T0-EN | 2026-07-17 | G1–G3 EN §1–4 prod + IndexNow canonical |

---

## Cursor 상기 규칙 (이 파일)

1. GSF-Ark 관련 세션 **부트** 시 `status: open`의 **P0 1줄 + P1 다음 1건**을 Joseph에게 말함.  
2. Joseph가 「다음」「뭐하지」「백로그」라고 하면 이 표 기준으로 제안.  
3. 세션 **종료/마무리** 시 open 잔여를 1줄로 다시 상기.  
4. 완료 시 이 파일 + `STATUS.md` 동시 갱신.
