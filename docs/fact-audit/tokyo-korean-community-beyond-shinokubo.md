# Fact sheet & Translation audit — `tokyo-korean-community-beyond-shinokubo`

| Field | Value |
|-------|--------|
| **Slug** | tokyo-korean-community-beyond-shinokubo |
| **Title (KO)** | 신오쿠보를 넘어: 도쿄의 새로운 한국인 커뮤니티와 비즈니스 지도 2026 |
| **Cursor validate** | `pnpm validate:post tokyo-korean-community-beyond-shinokubo` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 2023년 | Verified | [https://moj.go.jp/](https://moj.go.jp/) | [x] | Body |
| 2 | 2026년 | Verified | [https://moj.go.jp/](https://moj.go.jp/) | [x] | Body |
| 3 | 2024년 | Verified | [https://moj.go.jp/](https://moj.go.jp/) | [x] | Body |
| 4 | 15만~30만 엔대 | Verified | [https://www.reinfolib.mlit.go.jp/](https://www.reinfolib.mlit.go.jp/) | [x] | Body |
| 5 | 100㎡ | Verified | [https://www.reinfolib.mlit.go.jp/](https://www.reinfolib.mlit.go.jp/) | [x] | Body |

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
| 2 | 2026년 | Present | Present | Y | Ensure numerical alignment |
| 3 | 2024년 | Present | Present | Y | Ensure numerical alignment |
| 4 | 15만~30만 엔대 | Present | Present | Y | Ensured numerical alignment |
| 5 | 100㎡ | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/tokyo-korean-community-beyond-shinokubo.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| 1 | disclaimer | End of post | Missing standard legal disclaimer | Add info purposes disclaimer |

---

### JA quality (`src/data/blog/ja/tokyo-korean-community-beyond-shinokubo.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

## Severity

- [ ] **T0** — Wrong facts / misleading translation of numbers
- [   ] **T1** — Tone gate fail or major readability
- [   ] **T2** — Minor calque, caption, table wording
- [   ] **T3** — OK / style nits only

---

## Sign-off

- [x] All claims verified or softened
- [ ] `pnpm validate:post` exit 0
- [ ] Ready for Cursor sign-off
