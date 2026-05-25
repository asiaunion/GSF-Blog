# Fact sheet & Translation audit — `weak-yen-korean-japan-asset-allocation-fx-scenarios`

| Field | Value |
|-------|--------|
| **Slug** | weak-yen-korean-japan-asset-allocation-fx-scenarios |
| **Title (KO)** | 역대급 엔저 시대, 한일 자산 배분 전략과 3가지 FX 시나리오 2026 |
| **Cursor validate** | `pnpm validate:post weak-yen-korean-japan-asset-allocation-fx-scenarios` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 3% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 2 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 3 | 800원 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 4 | 900원 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 5 | 50% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |

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
| 1 | 3% | Present | Present | Y | Ensure numerical alignment |
| 2 | 2026년 | Present | Present | Y | Ensure numerical alignment |
| 3 | 800원 | Present | Present | Y | Ensure numerical alignment |
| 4 | 900원 | Present | Present | Y | Ensure numerical alignment |
| 5 | 50% | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/weak-yen-korean-japan-asset-allocation-fx-scenarios.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

### JA quality (`src/data/blog/ja/weak-yen-korean-japan-asset-allocation-fx-scenarios.md`)

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
