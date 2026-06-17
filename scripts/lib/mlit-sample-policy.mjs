/**
 * MLIT 성약가 표본 건수(n) — benchmarks·verify·research-pack 공통 SSOT
 */

export const SAMPLE_SIZE_POLICY = {
  version: 1,
  tiers: [
    { min: 100, blog_primary: true, footnote_required: false, scaffold_claim: true, body_numeric: true },
    { min: 30, blog_primary: true, footnote_required: true, scaffold_claim: true, body_numeric: true },
    { min: 10, blog_primary: false, footnote_required: false, scaffold_claim: false, body_numeric: false },
    { min: 0, blog_primary: false, footnote_required: false, scaffold_claim: false, body_numeric: false },
  ],
  notes: {
    gte100: "본문 수치 직접 인용 가능",
    gte30: "본문 인용 시 n=XX건 각주 필수",
    lt30: "본문 수치 금지 — 서술만",
    lt10: "manifest claim 생성 제외",
  },
};

export function policyForCount(n) {
  const count = Number(n) || 0;
  for (const tier of SAMPLE_SIZE_POLICY.tiers) {
    if (count >= tier.min) return { ...tier, count };
  }
  return { ...SAMPLE_SIZE_POLICY.tiers.at(-1), count };
}

export function blogPrimaryForCount(n) {
  return policyForCount(n).blog_primary;
}

export function footnoteRequiredForCount(n) {
  return policyForCount(n).footnote_required;
}

export function shouldScaffoldClaim(n) {
  return policyForCount(n).scaffold_claim;
}

export function formatWriterConstraintsBlock() {
  return `## Writer constraints (mandatory)

### Sample size (n)
| n | Rule |
|---|------|
| ≥100 | Numeric quote OK in body |
| 30–99 | Quote OK with footnote "n=XX건 기준" |
| <30 | No body numbers — qualitative only |
| <10 | Omit from manifest |

### 町名 labeling (XIT001 price)
- FORBIDDEN: "○○역 주변 저평가", "역세권 대비 단가", NearestStation inference
- REQUIRED: "○○町（町名）平均 ○○万円/㎡", "MLIT成約価格・町名別集計 (n=…)"

### Other
- XKT* / XPT002: tile sample ≠ administrative ward boundary
- Yield proxy: pre-tax surface yield; excludes management fees and vacancy
- Transit minutes: tier C unless user_capture`;
}
