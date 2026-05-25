# Fact sheet & Translation audit — `tokyo-earthquake-vulnerable-five-areas`

| Field | Value |
|-------|--------|
| **Slug** | tokyo-earthquake-vulnerable-five-areas |
| **Title (KO)** | 일본 도쿄 지진에서 취약한 5곳 |
| **Cursor validate** | `pnpm validate:post tokyo-earthquake-vulnerable-five-areas` → FAIL |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 2위 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 2 | 3초메 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 3 | 3 초메 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 4 | 2초메 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 5 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |

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
| 1 | 2위 | Present | Present | Y | Ensure numerical alignment |
| 2 | 3초메 | Present | Present | Y | Ensure numerical alignment |
| 3 | 3 초메 | Present | Present | Y | Ensure numerical alignment |
| 4 | 2초메 | Present | Present | Y | Ensure numerical alignment |
| 5 | 2026년 | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/tokyo-earthquake-vulnerable-five-areas.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| 1 | disclaimer | End of post | Missing standard legal disclaimer | Add info purposes disclaimer |

---

### JA quality (`src/data/blog/ja/tokyo-earthquake-vulnerable-five-areas.md`)

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
