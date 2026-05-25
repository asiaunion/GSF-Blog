/** Shared helpers for trust / fact / translation gates */

export function stripFrontmatter(markdown: string) {
  const lines = markdown.split("\n");
  if (lines[0]?.trim() !== "---") return markdown;
  const end = lines.findIndex((line, idx) => idx > 0 && line.trim() === "---");
  if (end < 0) return markdown;
  return lines.slice(end + 1).join("\n");
}

export function stripBoilerplateSections(markdown: string) {
  const markers = ["## 면책 및 이용 안내", "## Disclaimer", "## 免責"];
  let body = markdown;
  for (const marker of markers) {
    const idx = body.indexOf(marker);
    if (idx >= 0) body = body.slice(0, idx);
  }
  return body;
}

export function stripCodeAndLinks(text: string) {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*]\([^)]+\)/g, " ");
}

/** Normalize numeric claims for cross-locale / source matching */
export function normalizeNumericToken(raw: string) {
  let s = raw
    .toLowerCase()
    .replace(/[¥￥$,，、]/g, "")
    .replace(/\s+/g, "")
    .replace(/만엔|만원|万円|万원|億円|억원/g, "m")
    .replace(/천만|千万/g, "10m")
    .replace(/억|億/g, "100m")
    .replace(/約|약|approx\.?|~|〜|～|\-|–|—/g, "")
    .replace(/%/g, "pct")
    .replace(/년|年/g, "y")
    .replace(/월|月/g, "mo")
    .replace(/일|日/g, "d")
    .replace(/[^\d.a-z]/g, "");

  const num = parseFloat(s.replace(/[^\d.]/g, ""));
  if (Number.isFinite(num) && num > 0) {
    if (num >= 1_000_000) return String(Math.round(num));
    if (num >= 100 && Number.isInteger(num)) return String(Math.round(num));
    if (num < 1 && s.includes(".")) return num.toFixed(3).replace(/\.?0+$/, "");
    return String(num);
  }
  return s || raw.trim().toLowerCase();
}

export function extractNumericLiterals(text: string) {
  const cleaned = stripCodeAndLinks(text);

  const patterns = [
    /\d{4}년(?:\s*\d{1,2}월)?(?:\s*\d{1,2}일)?/g,
    /\d{4}年(?:\d{1,2}月)?(?:\d{1,2}日)?/g,
    /\d{1,3}(?:,\d{3})+(?:\.\d+)?\s*(?:만|万)\s*(?:엔|円|원)?/g,
    /\d+(?:\.\d+)?\s*(?:만|万)\s*(?:엔|円|원)/g,
    /\d{1,3}(?:,\d{3})*(?:\.\d+)?\s*(?:억|億)\s*(?:원|円)?/g,
    /\d+(?:\.\d+)?%/g,
    /\d{4}-\d{2}-\d{2}/g,
    /¥\s*\d{1,3}(?:,\d{3})*(?:\.\d+)?/g,
    /\d{1,3}(?:,\d{3})+(?:\.\d+)?/g,
  ];

  const found = new Set<string>();
  for (const pattern of patterns) {
    for (const match of cleaned.match(pattern) ?? []) {
      const t = match.trim();
      if (t.length >= 2) found.add(t);
    }
  }
  return Array.from(found);
}

export function isGenericHomepageUrl(url: string) {
  try {
    const u = new URL(url);
    const p = u.pathname.replace(/\/+$/, "") || "/";
    if (p === "/" || p === "/en" || p === "/english" || p === "/index.html") return true;
    if (/^\/(en|ja|ko)?\/?$/.test(p)) return true;
  } catch {
    return true;
  }
  return false;
}

export function htmlToPlainText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ");
}

export function countH2Sections(markdown: string) {
  const body = stripBoilerplateSections(stripFrontmatter(markdown));
  return (body.match(/^##\s+/gm) ?? []).length;
}
