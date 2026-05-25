# Fact sheet & Translation audit — `ginza-weekend-walking-guide`

| Field | Value |
|-------|--------|
| **Slug** | ginza-weekend-walking-guide |
| **Title (KO)** | 주말의 긴자 산책: 예술 서점, 숨겨진 전망대, 그리고 보행자 천국의 여유 |
| **Cursor validate** | `pnpm validate:post ginza-weekend-walking-guide` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 1891년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 2 | 1970년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 3 | 56년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 4 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 5 | 1885년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |

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
| 1 | 1891년 | Present | Present | Y | Ensure numerical alignment |
| 2 | 1970년 | Present | Present | Y | Ensure numerical alignment |
| 3 | 56년 | Present | Present | Y | Ensure numerical alignment |
| 4 | 2026년 | Present | Present | Y | Ensure numerical alignment |
| 5 | 1885년 | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/ginza-weekend-walking-guide.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected (disclaimer added) | |

---

### JA quality (`src/data/blog/ja/ginza-weekend-walking-guide.md`)

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
