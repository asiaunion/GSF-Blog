/**
 * 東京都の市 (23区外) — 全国地方公共団体コード SSOT
 * N03 の N03_007 は一部市で旧コード(13229等)와 불일치 → boundary는 name_ja/registry_code로 매칭
 */
export const TOKYO_TAMA_CITIES = [
  { code: "13201", name_ja: "八王子市", name_en_slug: "hachioji" },
  { code: "13202", name_ja: "立川市", name_en_slug: "tachikawa" },
  { code: "13203", name_ja: "武蔵野市", name_en_slug: "musashino" },
  { code: "13204", name_ja: "三鷹市", name_en_slug: "mitaka" },
  { code: "13205", name_ja: "青梅市", name_en_slug: "ome" },
  { code: "13206", name_ja: "府中市", name_en_slug: "fuchu" },
  { code: "13207", name_ja: "昭島市", name_en_slug: "akishima" },
  { code: "13208", name_ja: "調布市", name_en_slug: "chofu" },
  { code: "13209", name_ja: "町田市", name_en_slug: "machida" },
  { code: "13210", name_ja: "小金井市", name_en_slug: "koganei" },
  { code: "13211", name_ja: "小平市", name_en_slug: "kodaira" },
  { code: "13212", name_ja: "日野市", name_en_slug: "hino" },
  { code: "13213", name_ja: "東村山市", name_en_slug: "higashimurayama" },
  { code: "13214", name_ja: "国分寺市", name_en_slug: "kokubunji" },
  { code: "13215", name_ja: "国立市", name_en_slug: "kunitachi" },
  { code: "13218", name_ja: "福生市", name_en_slug: "fussa" },
  { code: "13219", name_ja: "狛江市", name_en_slug: "komae" },
  { code: "13220", name_ja: "東大和市", name_en_slug: "higashiyamato" },
  { code: "13221", name_ja: "清瀬市", name_en_slug: "kiyose" },
  { code: "13222", name_ja: "東久留米市", name_en_slug: "higashikurume" },
  { code: "13223", name_ja: "武蔵村山市", name_en_slug: "musashimurayama" },
  { code: "13224", name_ja: "多摩市", name_en_slug: "tama" },
  { code: "13225", name_ja: "稲城市", name_en_slug: "inagi" },
  { code: "13226", name_ja: "羽村市", name_en_slug: "hamura" },
  { code: "13227", name_ja: "あきる野市", name_en_slug: "akiruno" },
  { code: "13229", name_ja: "西東京市", name_en_slug: "nishitokyo" },
];

export const TOKYO_TAMA_CODES = TOKYO_TAMA_CITIES.map((c) => c.code);

export const TOKYO_TAMA_NAMES = new Set(TOKYO_TAMA_CITIES.map((c) => c.name_ja));

/** Wave 2 full sync 대상 (블로그 우선 시) — RE-6 Wave 2 SSOT */
export const TOKYO_TAMA_WAVE2_PRIORITY = [
  "13201", // 八王子市
  "13202", // 立川市
  "13203", // 武蔵野市
  "13204", // 三鷹市
  "13206", // 府中市
  "13208", // 調布市
  "13209", // 町田市
  "13229", // 西東京市
];

export const TOKYO_TAMA_WAVE2_NAMES = TOKYO_TAMA_WAVE2_PRIORITY.map(
  (code) => TOKYO_TAMA_CITIES.find((c) => c.code === code).name_ja
);
