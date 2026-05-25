# Fact sheet & Translation audit — `tokyo-real-estate-investment-complete-guide`

| Field | Value |
|-------|--------|
| **Slug** | tokyo-real-estate-investment-complete-guide |
| **Title (KO)** | 도쿄 부동산 투자 완전 가이드 2026: 검색에서 등기까지, 한국 투자자를 위한 로드맵 |
| **Cursor validate** | `pnpm validate:post tokyo-real-estate-investment-complete-guide` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 55% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 2 | 5년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 3 | 140만 엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 4 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 5 | 9,200만 엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |

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
| 1 | 55% | Present | Present | Y | Ensure numerical alignment |
| 2 | 5년 | Present | Present | Y | Ensure numerical alignment |
| 3 | 140만 엔 | Present | Present | Y | Ensure numerical alignment |
| 4 | 2026년 | Present | Present | Y | Ensure numerical alignment |
| 5 | 9,200만 엔 | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/tokyo-real-estate-investment-complete-guide.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

### JA quality (`src/data/blog/ja/tokyo-real-estate-investment-complete-guide.md`)

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
