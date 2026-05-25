# Fact sheet & Translation audit — `three-things-when-fx-shakes`

| Field | Value |
|-------|--------|
| **Slug** | three-things-when-fx-shakes |
| **Title (KO)** | 환율의 변동성 속에서 일본 부동산 투자자가 지켜야 할 3가지 원칙 |
| **Cursor validate** | `pnpm validate:post three-things-when-fx-shakes` → FAIL |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 2 | 60% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 3 | 2% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 4 | 75% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 5 | 22% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |

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
| 1 | 2026년 | Present | Present | Y | Ensure numerical alignment |
| 2 | 60% | Present | Present | Y | Ensure numerical alignment |
| 3 | 2% | Present | Present | Y | Ensure numerical alignment |
| 4 | 75% | Present | Present | Y | Ensure numerical alignment |
| 5 | 22% | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/three-things-when-fx-shakes.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

### JA quality (`src/data/blog/ja/three-things-when-fx-shakes.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

## Severity

- [ ] **T0** — Wrong facts / misleading translation of numbers
- [   ] **T1** — Tone gate fail or major readability
- [   ] **T2** — Minor calque, caption, table wording
- [ x ] **T3** — OK / style nits only

---

## Sign-off

- [ ] All claims verified or softened
- [ ] `pnpm validate:post` exit 0
- [ ] Ready for Cursor sign-off
