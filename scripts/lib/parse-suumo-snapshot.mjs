/**
 * Parse SUUMO chintai soba snapshot HTML (신축 + 역 도보 1–5분 matrix).
 */

const MADORI_KEYS = {
  ワンルーム: "1R",
  "1K": "1K",
  "1DK": "1DK",
  "1LDK": "1LDK",
  "2K": "2K",
  "2DK": "2DK",
  "2LDK": "2LDK",
  "3K": "3K",
  "3DK": "3DK",
  "3LDK": "3LDK",
  "4K": "4K",
  "4DK": "4DK",
  "4LDK": "4LDK",
};

export function parseSuumoRentFromHtml(html) {
  const rents = {};
  const rowRe = /<tr class="js-graph-data" data-value="([\d.]+)">\s*<td>([^<]+)<\/td>/g;
  let m;
  while ((m = rowRe.exec(html)) !== null) {
    const value = parseFloat(m[1]);
    const label = m[2].trim();
    const key = MADORI_KEYS[label];
    if (key && Number.isFinite(value)) rents[key] = value;
  }
  const caption = html.match(/class="pagecaption"[^>]*>([^<]+)/)?.[1]?.trim() ?? null;
  return { rents, pagecaption: caption };
}

export function snapshotDateFromName(fileName) {
  const m = fileName.match(/-(\d{8})\.html$/);
  if (!m) return null;
  const d = m[1];
  return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
}

export function suumoCodeFromSnapshotName(fileName) {
  return fileName.match(/suumo-sc_([a-z_]+)-/)?.[1] ?? null;
}
