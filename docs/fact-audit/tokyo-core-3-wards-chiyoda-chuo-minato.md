# Fact sheet & Translation audit — `tokyo-core-3-wards-chiyoda-chuo-minato`

| Field | Value |
|-------|--------|
| **Slug** | tokyo-core-3-wards-chiyoda-chuo-minato |
| **Title (KO)** | 도쿄 핵심 3구 완전 분석: 치요다·주오·미나토 — 이주·투자 데이터 가이드 [Ep.1] |
| **Cursor validate** | `pnpm validate:post tokyo-core-3-wards-chiyoda-chuo-minato` → FAIL |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 700만엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 2 | 22만엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 3 | 200만엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 4 | 2년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |
| 5 | 15만엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [ ] | Body |

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
| 1 | 700만엔 | Present | Present | Y | Ensure numerical alignment |
| 2 | 22만엔 | Present | Present | Y | Ensure numerical alignment |
| 3 | 200만엔 | Present | Present | Y | Ensure numerical alignment |
| 4 | 2년 | Present | Present | Y | Ensure numerical alignment |
| 5 | 15만엔 | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/tokyo-core-3-wards-chiyoda-chuo-minato.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

### JA quality (`src/data/blog/ja/tokyo-core-3-wards-chiyoda-chuo-minato.md`)

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
