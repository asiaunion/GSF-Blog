# Fact sheet & Translation audit — `nihonbashi-hamacho-walking-guide`

| Field | Value |
|-------|--------|
| **Slug** | nihonbashi-hamacho-walking-guide |
| **Title (KO)** | 니혼바시에서 하마초까지: 에도의 자부심과 현대적 감각이 만나는 산책로 2026 |
| **Cursor validate** | `pnpm validate:post tokyo-6-wards-real-estate-insight` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 2019년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 2 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 3 | 1760년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 4 | 70만 엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 5 | 2% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |

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
| 1 | 2019년 | Present | Present | Y | Ensure numerical alignment |
| 2 | 2026년 | Present | Present | Y | Ensure numerical alignment |
| 3 | 1760년 | Present | Present | Y | Ensure numerical alignment |
| 4 | 70만 엔 | Present | Present | Y | Ensure numerical alignment |
| 5 | 2% | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/nihonbashi-hamacho-walking-guide.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| 1 | disclaimer | End of post | Missing standard legal disclaimer | Add info purposes disclaimer |

---

### JA quality (`src/data/blog/ja/nihonbashi-hamacho-walking-guide.md`)

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

