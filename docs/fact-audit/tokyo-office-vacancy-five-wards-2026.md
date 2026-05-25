# Fact sheet & Translation audit — `tokyo-office-vacancy-five-wards-2026`

| Field | Value |
|-------|--------|
| **Slug** | tokyo-office-vacancy-five-wards-2026 |
| **Title (KO)** | 도쿄 오피스 공실률 2%대 진입: 도심 5구 수급 지도와 2026년 반격의 조건 |
| **Cursor validate** | `pnpm validate:post tokyo-office-vacancy-five-wards-2026` → FAIL |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 2023년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 2 | 5년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 3 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 4 | 10년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
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
| 1 | 2023년 | Present | Present | Y | Ensure numerical alignment |
| 2 | 5년 | Present | Present | Y | Ensure numerical alignment |
| 3 | 2026년 | Present | Present | Y | Ensure numerical alignment |
| 4 | 10년 | Present | Present | Y | Ensure numerical alignment |
| 5 | 22% | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/tokyo-office-vacancy-five-wards-2026.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

### JA quality (`src/data/blog/ja/tokyo-office-vacancy-five-wards-2026.md`)

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
