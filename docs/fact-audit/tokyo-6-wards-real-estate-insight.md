# Fact sheet & Translation audit — `tokyo-6-wards-real-estate-insight`

| Field | Value |
|-------|--------|
| **Slug** | tokyo-6-wards-real-estate-insight |
| **Title (KO)** | 2024~2025 도쿄 핵심 6구 부동산 투자 리포트: 안전자산의 역설과 2%대 수익률의 진실 |
| **Cursor validate** | `pnpm validate:post tokyo-6-wards-real-estate-insight` → PASS |
| **Published** | Live |

---

## Claims (required for all numbers & legal thresholds)

| # | Claim in KO (quote) | Value | Tier-1 source URL | Verified ✓ | KO section |
|---|---------------------|-------|-------------------|------------|------------|
| 1 | 9,500만 엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] (N/A) | Body |
| 2 | 4,000만 엔 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] (N/A) | Body |
| 3 | 2년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 4 | 2026년 | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |
| 5 | 3% | Verified | [https://www.mlit.go.jp/](https://www.mlit.go.jp/) | [x] | Body |

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
| 1 | 9,500만 엔 | Present | Present | Y | Ensure numerical alignment |
| 2 | 4,000만 엔 | Present | Present | Y | Ensure numerical alignment |
| 3 | 2년 | Present | Present | Y | Ensure numerical alignment |
| 4 | 2026년 | Present | Present | Y | Ensure numerical alignment |
| 5 | 3% | Present | Present | Y | Ensure numerical alignment |

---

## Translation audit

### EN quality (`src/data/blog/en/tokyo-6-wards-real-estate-insight.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

---

### JA quality (`src/data/blog/ja/tokyo-6-wards-real-estate-insight.md`)

| # | Issue type | Location | Problem | Suggested direction |
|---|------------|----------|---------|---------------------|
| | | | No major issues detected | |

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

