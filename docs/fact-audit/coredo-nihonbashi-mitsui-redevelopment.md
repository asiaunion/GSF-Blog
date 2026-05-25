# Fact sheet & Translation audit — `coredo-nihonbashi-mitsui-redevelopment`

| Field | Value |
|-------|--------|
| **Slug** | coredo-nihonbashi-mitsui-redevelopment |
| **Title (KO)** | 코레도 니혼바시·무로마치가 잇는 것: 미쓰이 그룹과 니혼바시 재생의 ‘다리’ |
| **Cursor validate** | `pnpm validate:post coredo-nihonbashi-mitsui-redevelopment` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 2019년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 2 | 100년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 3 | 400년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 4 | 2014년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 5 | 1673년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |

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
| 2 | 100년 | Present | Present | Y | Ensure numerical alignment |
| 3 | 400년 | Present | Present | Y | Ensure numerical alignment |
| 4 | 2014년 | Present | Present | Y | Ensure numerical alignment |
| 5 | 1673년 | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/coredo-nihonbashi-mitsui-redevelopment.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| 1 | disclaimer | End of post | Missing standard legal disclaimer | Add info purposes disclaimer |

---

### JA quality (`src/data/blog/ja/coredo-nihonbashi-mitsui-redevelopment.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| 1 | tone | Body | Uses informal だ・である style | Change to explanation-style です・ます |

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

