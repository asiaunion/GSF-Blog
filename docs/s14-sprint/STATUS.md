# §1–4 스프린트 — 진행 상태

> SSOT 지시서: [`SEO_S14_SPRINT_WORK_INSTRUCTION_2026-07.md`](../SEO_S14_SPRINT_WORK_INSTRUCTION_2026-07.md)  
> **Tier 0 R3 확정:** [`R3_LOCK_TIER0_2026-07-17.md`](./R3_LOCK_TIER0_2026-07-17.md) ← **AG R4는 이 파일**

**범례:** `pending` → `r1` → `draft` → `joseph` → `merged` → `live` → `naver` → `done`

| slug | tier | 타깃 쿼리 | R1 | 초안 | Joseph | KO | EN | live | 네이버 URL | 원장 |
|------|------|-----------|----|------|--------|----|----|------|------------|------|
| tokyo-meguro-setagaya | G1 | 세타가야구 부촌 | done | done | **done** | live | live | **live** | | merged |
| tokyo-shinagawa-ota | G2 | 오타구 아파트 시세 | done | done | **done** | live | live | **live** | | merged |
| tokyo-ward-guide-series-prologue | G3 | 도쿄 23구 특징 비교 | done | done | **done** | live | live | **live** | | merged |
| japan-shinchiku-vs-chuko-mansion-investor-guide | #1 | (백로그) | | | | | | | | |
| korea-japan-inheritance-gift-tax-cross-border-basics | #2 | | | | | | | | | |
| tokyo-hachioji-hino-akishima | #3 | | | | | | | | | |
| tokyo-korean-community-beyond-shinokubo | #6 | | | | | | | | | |

## Joseph 판단 필요

- Tier 0 사이트 §1–4 (KO+EN): **닫힘** — prod live + IndexNow 200.
- **열린 큐 (Cursor 상기 SSOT):** [`OPEN_QUEUE.md`](./OPEN_QUEUE.md)  
  - **지금:** Tier 0 네이버 HTML 붙여넣기 (G1→G2→G3) → `네이버 URL` 열  
  - **그다음:** Tier 1 #1–#10 (§1–4만 · Gate 동결 ~07-29 전)

## 이번 배치 메모

- 2026-07-17: Joseph 경험 G1·G2·G3 Cursor 세션에 주입 → `R3_LOCK_TIER0_2026-07-17.md`
- AG: 해당 파일만 보고 title/도입/H2 반영. 본문 전면 금지.
- 2026-07-17 21:58: EN G1 도입 직답 선배치 교정 + G2 `aiModel` 제거 + prod + IndexNow(canonical `/posts/`). Cursor 교차검증 PASS.

## 쿼리 원장 (Query Ledger) - R4

```text
tokyo-meguro-setagaya | q="세타가야구 부촌" | §1-4 2026-07-17 | 다음점검 +14d | diff=(Joseph/AG)
tokyo-shinagawa-ota | q="오타구 아파트 시세" | §1-4 2026-07-17 | 다음점검 +14d | diff=(Joseph/AG)
tokyo-ward-guide-series-prologue | q="도쿄 23구 특징 비교" | §1-4 2026-07-17 | 다음점검 +14d | diff=(Joseph/AG)
tokyo-meguro-setagaya (en) | q="Setagaya rich area" | §1-4 2026-07-17 | 다음점검 +14d | diff=(Joseph/AG)
tokyo-shinagawa-ota (en) | q="Ota Ward apartments" | §1-4 2026-07-17 | 다음점검 +14d | diff=(Joseph/AG)
tokyo-ward-guide-series-prologue (en) | q="Tokyo 23 Wards" | §1-4 2026-07-17 | 다음점검 +14d | diff=(Joseph/AG)
```

