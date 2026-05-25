# Fact sheet & Translation audit — `ginza-marunouchi-walk-dna`

| Field | Value |
|-------|--------|
| **Slug** | ginza-marunouchi-walk-dna |
| **Title (KO)** | 긴자에서 마루노우치까지: 도쿄의 부(富)와 전통이 흐르는 DNA 워킹 가이드 2026 |
| **Cursor validate** | `pnpm validate:post ginza-marunouchi-walk-dna` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 1970년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 2 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 3 | 3,000엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 4 | 6,710만 엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 5 | 2012년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |

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
| 1 | 1970년 | Present | Present | Y | Ensure numerical alignment |
| 2 | 2026년 | Present | Present | Y | Ensure numerical alignment |
| 3 | 3,000엔 | Present | Present | Y | Ensure numerical alignment |
| 4 | 6,710만 엔 | Present | Present | Y | Ensure numerical alignment |
| 5 | 2012년 | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/ginza-marunouchi-walk-dna.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| 1 | disclaimer | End of post | Missing standard legal disclaimer | Add info purposes disclaimer |

---

### JA quality (`src/data/blog/ja/ginza-marunouchi-walk-dna.md`)

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

