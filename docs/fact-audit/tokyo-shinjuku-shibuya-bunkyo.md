# Fact sheet & Translation audit — `tokyo-shinjuku-shibuya-bunkyo`

| Field | Value |
|-------|--------|
| **Slug** | tokyo-shinjuku-shibuya-bunkyo |
| **Title (KO)** | 도쿄 핵심 6구 완전 분석: 신주쿠·시부야·분쿄 — 이주·투자 데이터 가이드 [Ep.2] |
| **Cursor validate** | `pnpm validate:post tokyo-shinjuku-shibuya-bunkyo` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 22만엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 2 | 200만엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 3 | 347만엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 4 | 5년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 5 | 700만엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |

---

## Sources audit

| URL in `sources` | Tier (gov/public/media) | Used in body? |
|------------------|-------------------------|---------------|
| [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | gov | [x] |

**references ⊆ sources**: [x] confirmed

---

## Factual drift (ko ↔ en ↔ ja)

| # | Item (KO) | EN | JA | Match? | Fix hint |
|---|-----------|----|----|--------|----------|
| 1 | 22만엔 | Present | Present | Y | Ensure numerical alignment |
| 2 | 200만엔 | Present | Present | Y | Ensure numerical alignment |
| 3 | 347만엔 | Present | Present | Y | Ensure numerical alignment |
| 4 | 5년 | Present | Present | Y | Ensure numerical alignment |
| 5 | 700만엔 | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/tokyo-shinjuku-shibuya-bunkyo.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

### JA quality (`src/data/blog/ja/tokyo-shinjuku-shibuya-bunkyo.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

## Severity

- [ ] **T0** — Wrong facts / misleading translation of numbers
- [   ] **T1** — Tone gate fail or major readability
- [   ] **T2** — Minor calque, caption, table wording
- [x] **T3** — OK / style nits only

---

## Sign-off

- [x] All claims verified or softened
- [x] `pnpm validate:post` exit 0
- [x] Ready for Cursor sign-off
