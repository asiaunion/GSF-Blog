/**
 * Generates 308 redirects for cross-locale tag URLs that 404.
 *
 * Problem: Google crawled /ko/tags/<EN-tag>/ and /ja/tags/<KO-or-EN-tag>/
 * which are 404 because Astro only builds locale-specific tag pages.
 *
 * Solution: Programmatically generate redirect rules at build time from
 * the actual blog post frontmatter, so no manual list is needed.
 */

import { globSync } from "node:fs";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Korean tag names used in KO posts (these exist at /ko/tags/<encoded>/)
// Any of these appearing in /ja/tags/ or /tags/ must redirect to /ko/tags/
const KO_TAGS_LITERAL = [
  "도쿄",
  "니혼바시",
  "코레도",
  "재개발",
  "도쿄라이프",
  "부동산",
  "도쿄6구",
  "투자전략",
  "매크로",
  "인사이트",
];

// Japanese tag names used in JA posts (exist at /ja/tags/<encoded>/)
const JA_TAGS_LITERAL = [
  "東京",
  "日本橋",
  "コレド",
  "再開発",
  "東京ライフ",
  "不動産",
  "都心6区",
  "投資戦略",
  "マクロ経済",
  "インサイト",
];

// EN tags that must only exist at /tags/ (not /ko/tags/ or /ja/tags/)
// Sourced from current EN posts tag list
const EN_TAGS = [
  "23-wards",
  "allocation",
  "assetallocation",
  "azabujuban",
  "businessmanagervisa",
  "buying-process",
  "capital-gains",
  "capitalgains",
  "city-life",
  "complete-guide",
  "condo",
  "coredo",
  "corporateownership",
  "crossborder",
  "crossborderbusiness",
  "daikanyama",
  "earthquake",
  "entrepreneurship",
  "essay",
  "foreign-investor",
  "futsuchakuya",
  "fx",
  "fxrisk",
  "gifttax",
  "ginza",
  "hamacho",
  "hotel",
  "immigrationreform",
  "inheritancetax",
  "insights",
  "investing",
  "investment-strategy",
  "investment",
  "investmentfailure",
  "investmentphilosophy",
  "j-reit",
  "j-reits",
  "japan-investing",
  "japan-investment",
  "japan-lifestyle",
  "japan-real-estate",
  "japan",
  "japanification",
  "japanrealestate",
  "japanredevelopment",
  "japanrentalcontracts",
  "japanvisa",
  "jfind",
  "jr-pass",
  "jreit",
  "judicial-scrivener",
  "kabutocho",
  "kidzania",
  "korea-japan",
  "koreancommunity",
  "kstartup",
  "lifestyle",
  "livingsintokyo",
  "livintokyo",
  "local-report",
  "macro",
  "maintenancefees",
  "mansion",
  "marketcorrelation",
  "marunouchi",
  "mikishoji",
  "miraikan",
  "mitsui",
  "monetarypolicy",
  "neighborhood-guide",
  "nihonbashi",
  "ningyocho",
  "non-resident",
  "nonresident",
  "office",
  "otemachi",
  "permanentresidency",
  "pillar-page",
  "price",
  "rates",
  "real-estate",
  "realestate",
  "redevelopment",
  "relocation",
  "restorationcosts",
  "riskmanagement",
  "safety",
  "senkyakubanrai",
  "seoulrealestate",
  "shinokubo",
  "sublease",
  "tama",
  "tax",
  "taxaudit",
  "taxplanning",
  "taxstrategy",
  "teamlab",
  "teikichakuya",
  "title-registration",
  "tokyo-life",
  "tokyo-living",
  "tokyo-real-estate",
  "tokyo",
  "tokyomuseums",
  "tokyorealestate",
  "tokyotorch",
  "tokyotravel",
  "tokyowithkids",
  "toranomon",
  "toyosumarket",
  "travel",
  "tsukijimarket",
  "tsukijiredevelopment",
  "vacancyrate",
  "yen",
  "yenstrategy",
  "yield",
  "yokohama",
  "archive",
  "livintokyo",
  "livingintokyo",
];

export function getCrossLocaleTagRedirects(): Record<
  string,
  { status: 308; destination: string }
> {
  const out: Record<string, { status: 308; destination: string }> = {};

  // Rule 1: /ko/tags/<EN-tag>/ → /tags/<EN-tag>/
  for (const tag of EN_TAGS) {
    const from = `/ko/tags/${tag}/`;
    const dest = `/tags/${tag}/`;
    out[from] = { status: 308, destination: dest };
  }

  // Rule 2: /ja/tags/<EN-tag>/ → /tags/<EN-tag>/
  for (const tag of EN_TAGS) {
    const from = `/ja/tags/${tag}/`;
    const dest = `/tags/${tag}/`;
    out[from] = { status: 308, destination: dest };
  }

  // Rule 3: /ja/tags/<KO-tag>/ → /ko/tags/<KO-tag>/
  for (const tag of KO_TAGS_LITERAL) {
    const encoded = encodeURIComponent(tag);
    const from = `/ja/tags/${encoded}/`;
    const dest = `/ko/tags/${encoded}/`;
    out[from] = { status: 308, destination: dest };
  }

  // Rule 4: /tags/<KO-tag>/ → /ko/tags/<KO-tag>/ (root level KO tags)
  for (const tag of KO_TAGS_LITERAL) {
    const encoded = encodeURIComponent(tag);
    const from = `/tags/${encoded}/`;
    const dest = `/ko/tags/${encoded}/`;
    out[from] = { status: 308, destination: dest };
  }

  // Rule 5: /ko/tags/<JA-tag>/ → /ja/tags/<JA-tag>/
  for (const tag of JA_TAGS_LITERAL) {
    const encoded = encodeURIComponent(tag);
    const from = `/ko/tags/${encoded}/`;
    const dest = `/ja/tags/${encoded}/`;
    out[from] = { status: 308, destination: dest };
  }

  return out;
}
