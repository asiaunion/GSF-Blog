# Fact sheet & Translation audit — `tokyo-yokohama-fuji-transport-pass`

| Field | Value |
|-------|--------|
| **Slug** | tokyo-yokohama-fuji-transport-pass |
| **Title (KO)** | 일본 교통 패스, 도쿄와 요코하마, 후지산까지 한번에 |
| **Cursor validate** | `pnpm validate:post tokyo-yokohama-fuji-transport-pass` → FAIL |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 10만원 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 2 | 2만엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 3 | 5,090엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 4 | 10,180엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |

---

## Sources audit

| URL in `sources` | Tier (gov/public/media) | Used in body? |
|------------------|-------------------------|---------------|
| [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | gov | [ ] |

**references ⊆ sources**: [ ] confirmed

---

## Factual drift (ko ↔ en ↔ ja)

| # | Item (KO) | EN | JA | Match? | Fix hint |
|---|-----------|----|----|--------|----------|
| 1 | 10만원 | Present | Present | Y | Ensure numerical alignment |
| 2 | 2만엔 | Present | Present | Y | Ensure numerical alignment |
| 3 | 5,090엔 | Present | Present | Y | Ensure numerical alignment |
| 4 | 10,180엔 | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/tokyo-yokohama-fuji-transport-pass.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| 1 | disclaimer | End of post | Missing standard legal disclaimer | Add info purposes disclaimer |

---

### JA quality (`src/data/blog/ja/tokyo-yokohama-fuji-transport-pass.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

## Severity

- [ ] **T0** — Wrong facts / misleading translation of numbers
- [   ] **T1** — Tone gate fail or major readability
- [ x ] **T2** — Minor calque, caption, table wording
- [   ] **T3** — OK / style nits only

---

## Sign-off

- [ ] All claims verified or softened
- [ ] `pnpm validate:post` exit 0
- [ ] Ready for Cursor sign-off
