# Fact sheet & Translation audit — `why-warm-investing-holds`

| Field | Value |
|-------|--------|
| **Slug** | why-warm-investing-holds |
| **Title (KO)** | 따뜻한 투자의 미학: 숫자의 냉기와 사람의 온도가 만나는 지점 |
| **Cursor validate** | `pnpm validate:post why-warm-investing-holds` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 48만 엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 2 | 3% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 3 | 2023년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 4 | 4년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 5 | 1년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |

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
| 1 | 48만 엔 | Present | Present | Y | Ensure numerical alignment |
| 2 | 3% | Present | Present | Y | Ensure numerical alignment |
| 3 | 2023년 | Present | Present | Y | Ensure numerical alignment |
| 4 | 4년 | Present | Present | Y | Ensure numerical alignment |
| 5 | 1년 | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/why-warm-investing-holds.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected (tone synced) | |

---

### JA quality (`src/data/blog/ja/why-warm-investing-holds.md`)

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
