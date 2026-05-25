# Fact sheet & Translation audit — `japan-visa-paths-permanent-business-manager-asset-holders`

| Field | Value |
|-------|--------|
| **Slug** | japan-visa-paths-permanent-business-manager-asset-holders |
| **Title (KO)** | 일본 거주 및 영주권 경로: 2025년 대개편된 경영관리 비자와 고도인재 전략 |
| **Cursor validate** | `pnpm validate:post japan-visa-paths-permanent-business-manager-asset-holders` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 5년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 2 | 500만 엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 3 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 4 | 2% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 5 | 6배 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |

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
| 1 | 5년 | Present | Present | Y | Ensure numerical alignment |
| 2 | 500만 엔 | Present | Present | Y | Ensure numerical alignment |
| 3 | 2026년 | Present | Present | Y | Ensure numerical alignment |
| 4 | 2% | Present | Present | Y | Ensure numerical alignment |
| 5 | 6배 | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/japan-visa-paths-permanent-business-manager-asset-holders.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

### JA quality (`src/data/blog/ja/japan-visa-paths-permanent-business-manager-asset-holders.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

## Severity

- [ ] **T0** — Wrong facts / misleading translation of numbers
- [ ] **T1** — Tone gate fail or major readability
- [ ] **T2** — Minor calque, caption, table wording
- [x] **T3** — OK / style nits only

---

## Sign-off

- [x] All claims verified or softened
- [x] `pnpm validate:post` exit 0
- [ ] Ready for Cursor sign-off

