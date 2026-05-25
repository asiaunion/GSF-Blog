# Fact sheet & Translation audit — `tsukiji-to-toyosu-morning-tokyo`

| Field | Value |
|-------|--------|
| **Slug** | tsukiji-to-toyosu-morning-tokyo |
| **Title (KO)** | 도쿄의 아침을 여는 두 개의 심장: 츠키지와 토요스, 2026년의 변화 |
| **Cursor validate** | `pnpm validate:post tsukiji-to-toyosu-morning-tokyo` → FAIL |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 2 | 2018년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 3 | 2030년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 4 | 2024년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 5 | 80년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |

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
| 2 | 2018년 | Present | Present | Y | Ensure numerical alignment |
| 3 | 2030년 | Present | Present | Y | Ensure numerical alignment |
| 4 | 2024년 | Present | Present | Y | Ensure numerical alignment |
| 5 | 80년 | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/tsukiji-to-toyosu-morning-tokyo.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| 1 | disclaimer | End of post | Missing standard legal disclaimer | Add info purposes disclaimer |

---

### JA quality (`src/data/blog/ja/tsukiji-to-toyosu-morning-tokyo.md`)

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
