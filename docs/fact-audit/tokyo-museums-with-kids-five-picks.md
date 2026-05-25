# Fact sheet & Translation audit — `tokyo-museums-with-kids-five-picks`

| Field | Value |
|-------|--------|
| **Slug** | tokyo-museums-with-kids-five-picks |
| **Title (KO)** | 아이와 함께하는 도쿄 지적 탐험: 2026년 에듀테인먼트 뮤지엄 BEST 5 |
| **Cursor validate** | `pnpm validate:post tokyo-museums-with-kids-five-picks` → FAIL |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |

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

---

## Translation audit

### EN quality (`src/data/blog/en/tokyo-museums-with-kids-five-picks.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| 1 | disclaimer | End of post | Missing standard legal disclaimer | Add info purposes disclaimer |

---

### JA quality (`src/data/blog/ja/tokyo-museums-with-kids-five-picks.md`)

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
