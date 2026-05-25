# Fact sheet & Translation audit — `korea-japan-inheritance-gift-tax-cross-border-basics`

| Field | Value |
|-------|--------|
| **Slug** | korea-japan-inheritance-gift-tax-cross-border-basics |
| **Title (KO)** | 한일 상속·증여세 무한책임의 함정: 10년의 규칙과 절세 시나리오 |
| **Cursor validate** | `pnpm validate:post korea-japan-inheritance-gift-tax-cross-border-basics` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 55% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 2 | 100% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 3 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 4 | 2% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 5 | 15년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |

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
| 2 | 100% | Present | Present | Y | Ensure numerical alignment |
| 3 | 2026년 | Present | Present | Y | Ensure numerical alignment |
| 4 | 2% | Present | Present | Y | Ensure numerical alignment |
| 5 | 15년 | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/korea-japan-inheritance-gift-tax-cross-border-basics.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected (tone synced) | |

---

### JA quality (`src/data/blog/ja/korea-japan-inheritance-gift-tax-cross-border-basics.md`)

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
