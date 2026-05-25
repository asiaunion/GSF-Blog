# Fact sheet & Translation audit — `nihonbashi-hamacho-supermarket-peacock-city-life`

| Field | Value |
|-------|--------|
| **Slug** | nihonbashi-hamacho-supermarket-peacock-city-life |
| **Title (KO)** | 니혼바시 하마초의 숨은 보물, 피콕 수퍼마켓: 도심에서 누리는 신선한 장보기 |
| **Cursor validate** | `pnpm validate:post nihonbashi-hamacho-supermarket-peacock-city-life` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 2% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |

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
| 1 | 2% | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/nihonbashi-hamacho-supermarket-peacock-city-life.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected (disclaimer added) | |

---

### JA quality (`src/data/blog/ja/nihonbashi-hamacho-supermarket-peacock-city-life.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected (tone fixed) | |

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
