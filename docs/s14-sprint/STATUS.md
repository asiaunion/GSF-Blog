# §1–4 스프린트 — 진행 상태

> SSOT 지시서: [`SEO_S14_SPRINT_WORK_INSTRUCTION_2026-07.md`](../SEO_S14_SPRINT_WORK_INSTRUCTION_2026-07.md)  
> **Tier 0 R3 확정:** [`R3_LOCK_TIER0_2026-07-17.md`](./R3_LOCK_TIER0_2026-07-17.md) ← **AG R4는 이 파일**

**범례:** `pending` → `r1` → `draft` → `joseph` → `merged` → `live` → `naver` → `done`

| slug | tier | 타깃 쿼리 | R1 | 초안 | Joseph | KO | EN | live | 네이버 URL | 원장 |
|------|------|-----------|----|------|--------|----|----|------|------------|------|
| tokyo-meguro-setagaya | G1 | 세타가야구 부촌 | done | done | **done** | live | live | **live** | [naver](https://blog.naver.com/gsfark/224349752172) | **done** |
| tokyo-shinagawa-ota | G2 | 오타구 아파트 시세 | done | done | **done** | live | live | **live** | [naver](https://blog.naver.com/gsfark/224349753801) | **done** |
| tokyo-ward-guide-series-prologue | G3 | 도쿄 23구 특징 비교 | done | done | **done** | live | live | **live** | [naver](https://blog.naver.com/gsfark/224349747832) | **done** |
| japan-shinchiku-vs-chuko-mansion-investor-guide | #1 | 일본 신축 중고 맨션 차이 | done | done | **done** | live | live | **live** | [naver](https://blog.naver.com/gsfark/224349002310) | **done** |
| korea-japan-inheritance-gift-tax-cross-border-basics | #2 | 한일 상속세 이중과세 | done | done | — | live | live | **live** | | **done** (§1–4·Cursor) |
| tokyo-hachioji-hino-akishima | #3 | 하치오지 집값 | done | done | — | live | live | **live** | | **done** (§1–4·Cursor) |
| tokyo-korean-community-beyond-shinokubo | #6 | | | | | | | | | |

## Joseph 판단 필요

- Tier 0 (사이트 + 네이버): **닫힘** — KO/EN live + 네이버 3URL.
- **열린 큐:** [`OPEN_QUEUE.md`](./OPEN_QUEUE.md)
  - **지금:** 이전 에피소드 네이버 선발행 → Ep.12 네이버(보류) · Tier 1 **#6** `tokyo-korean-community-beyond-shinokubo` §1–4 (+네이버 동주)
  - **병행:** N2(GSC 선택) · Gate A 레퍼럴 2주 (네이버 방금 발행으로 분자 시작)

## 이번 배치 메모

- 2026-07-17: Joseph 경험 G1·G2·G3 Cursor 세션에 주입 → `R3_LOCK_TIER0_2026-07-17.md`
- AG: 해당 파일만 보고 title/도입/H2 반영. 본문 전면 금지.
- 2026-07-17 21:58: EN G1 도입 직답 선배치 교정 + G2 `aiModel` 제거 + prod + IndexNow(canonical `/posts/`). Cursor 교차검증 PASS.
- 2026-07-17 22:50: Joseph — Tier 0 네이버 G1–G3 붙여넣기 완료 → STATUS/OPEN_QUEUE N1 done.

## 쿼리 원장 (Query Ledger) - R4

```text
tokyo-meguro-setagaya | q="세타가야구 부촌" | §1-4 2026-07-17 | 다음점검 +14d | diff=(Joseph/AG)
tokyo-shinagawa-ota | q="오타구 아파트 시세" | §1-4 2026-07-17 | 다음점검 +14d | diff=(Joseph/AG)
tokyo-ward-guide-series-prologue | q="도쿄 23구 특징 비교" | §1-4 2026-07-17 | 다음점검 +14d | diff=(Joseph/AG)
tokyo-meguro-setagaya (en) | q="Setagaya rich area" | §1-4 2026-07-17 | 다음점검 +14d | diff=(Joseph/AG)
tokyo-shinagawa-ota (en) | q="Ota Ward apartments" | §1-4 2026-07-17 | 다음점검 +14d | diff=(Joseph/AG)
tokyo-ward-guide-series-prologue (en) | q="Tokyo 23 Wards" | §1-4 2026-07-17 | 다음점검 +14d | diff=(Joseph/AG)
japan-shinchiku-vs-chuko-mansion-investor-guide | q="일본 신축 중고 맨션 차이" | §1-4 2026-07-18 | 다음점검 +14d | diff=(Cursor)
korea-japan-inheritance-gift-tax-cross-border-basics | q="한일 상속세 이중과세" | §1-4 2026-07-18 | 다음점검 +14d | diff=(Cursor)
tokyo-hachioji-hino-akishima | q="하치오지 집값" | §1-4 2026-07-18 | 다음점검 +14d | diff=(Cursor)
```

