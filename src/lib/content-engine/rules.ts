const HARD_CLAIM_PATTERNS = [
  /반드시/g,
  /확실히 보장/g,
  /무조건/g,
  /must insist/gi,
  /guaranteed/gi,
  /絶対に/gi,
  /必ず/gi,
];

export function softenHardClaims(text: string) {
  let next = text;
  next = next.replaceAll("반드시", "우선");
  next = next.replaceAll("무조건", "가능하면");
  next = next.replaceAll("must insist", "may prioritize");
  next = next.replaceAll("guaranteed", "potential");
  next = next.replaceAll("絶対に", "優先的に");
  next = next.replaceAll("必ず", "まず");
  return next;
}

export function containsHardClaims(text: string) {
  return HARD_CLAIM_PATTERNS.some(pattern => pattern.test(text));
}

export function disclaimerFor(locale: "ko" | "en" | "ja") {
  if (locale === "ko") {
    return "<small>※ 본 글은 정보 제공 목적의 개인적 분석이며, 특정 투자 상품의 매수·매도를 권유하지 않습니다.</small>";
  }
  if (locale === "ja") {
    return "<small>※ 本記事は情報提供を目的とした個人的見解であり、特定商品の売買を推奨するものではありません。</small>";
  }
  return "<small>※ This article is for informational purposes only and does not constitute investment advice.</small>";
}
