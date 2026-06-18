#!/usr/bin/env node
/**
 * Episode research pack for blog writers (MLIT + benchmarks SSOT).
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { collectPrice, EPISODE_WARDS, loadEnv } from "./mlit-collector.mjs";
import { formatWriterConstraintsBlock, policyForCount } from "./lib/mlit-sample-policy.mjs";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const BENCHMARKS = path.join(root, "docs/verification/tokyo-ward-series-benchmarks.json");
const EPISODES = path.join(root, "docs/verification/tokyo-series-episodes.json");
const OUT_DIR = path.join(root, "docs/verification/research-packs");

function parseArgs(argv) {
  const out = { slug: "", episode: "", year: 2025, write: false, noCache: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--slug") out.slug = argv[++i] ?? "";
    else if (a === "--episode") out.episode = (argv[++i] ?? "").toLowerCase();
    else if (a === "--year") out.year = parseInt(argv[++i] ?? "2025", 10);
    else if (a === "--write") out.write = true;
    else if (a === "--no-cache") out.noCache = true;
  }
  return out;
}

function yieldProxy(rent1r, est70) {
  if (!rent1r || !est70) return null;
  return Math.round(((rent1r * 12) / est70) * 1000) / 10;
}

async function compareTable(episodeKey) {
  const { stdout } = await execFileAsync("node", ["scripts/compare-wards.mjs", "--episode", episodeKey], { cwd: root });
  return stdout.trim();
}

function districtTable(districts, ward) {
  if (!districts?.length) return `_No 町名 breakdown for ${ward}_`;
  const lines = [
    `| 町名 (${ward}) | n | ㎡단가(万) | blog_primary |`,
    `|---|---:|---:|:---:|`,
  ];
  for (const d of districts.slice(0, 8)) {
    const pol = policyForCount(d.count);
    lines.push(`| ${d.name} | ${d.count} | ${d.avg_sqm} | ${pol.blog_primary ? "Y" : "N"} |`);
  }
  return lines.join("\n");
}

function timeseriesTable(ts, ward, valueLabel = "㎡단가") {
  const row = ts?.wards?.[ward];
  if (!row?.series) return `_No timeseries for ${ward}_`;
  const years = Object.keys(row.series).sort();
  const header = `| Year | ${valueLabel} | n | YoY% |`;
  const sep = `|---|---:|---:|---:|`;
  const countKey = row.counts ? "counts" : "point_counts";
  const body = years.map(y => {
    const yoy = row.yoy_pct?.[y] ?? "—";
    return `| ${y} | ${row.series[y]} | ${row[countKey]?.[y] ?? "—"} | ${yoy} |`;
  });
  const cagrNote = row.cagr_10y != null
    ? `\n_CAGR 10y: ${row.cagr_10y}% · 5y: ${row.cagr_5y ?? "—"}% · span: ${row.cagr_full ?? "—"}%_`
    : row.cagr_5y != null
      ? `\n_CAGR 5y: ${row.cagr_5y}% · full span: ${row.cagr_full ?? "—"}%_`
      : row.cagr_full != null
        ? `\n_CAGR full span (${row.cagr_span_years}y): ${row.cagr_full}%_`
        : "";
  return [header, sep, ...body].join("\n") + cagrNote;
}

async function buildPack(meta, benchmarks, wards, args) {
  const epKey = args.episode || `ep${String(meta?.episode || "").replace(/\D/g, "")}`.padStart(2, "0").replace(/^ep0$/, "ep01");
  const slug = args.slug || meta?.slug || "";
  const ts = benchmarks.mlit_mansion_timeseries;
  const tradeTs = benchmarks.mlit_trade_price_timeseries;
  const landTs = benchmarks.land_price_timeseries;
  const districtRows = {};

  for (const ward of wards) {
    try {
      const price = await collectPrice(ward, args.year, null, args.noCache);
      districtRows[ward] = price.districts ?? [];
    } catch {
      districtRows[ward] = [];
    }
  }

  const summaryRows = wards.map(ward => {
    const m = benchmarks.mlit_mansion_2025_q1_q4?.wards?.[ward];
    const suumo = benchmarks.suumo_rent_new_build_station_5min?.wards?.[ward];
    const pop = benchmarks.population_forecast?.wards?.[ward];
    const dis = benchmarks.disaster_risk?.wards?.[ward];
    const st = benchmarks.station_passengers?.wards?.[ward];
    return {
      ward,
      est_70sqm: m?.est_70sqm,
      ward_avg_sqm: m?.ward_avg_sqm,
      count: m?.count,
      cagr_5y: ts?.wards?.[ward]?.cagr_5y,
      cagr_full: ts?.wards?.[ward]?.cagr_full,
      trade_cagr_10y: tradeTs?.wards?.[ward]?.cagr_10y ?? tradeTs?.wards?.[ward]?.cagr_full,
      land_cagr_10y: landTs?.wards?.[ward]?.cagr_10y ?? landTs?.wards?.[ward]?.cagr_full,
      pop_change: pop?.change_pct,
      rent_1r: suumo?.["1R"],
      yield_pct: yieldProxy(suumo?.["1R"], m?.est_70sqm),
      top_station: st?.top_station,
      flood: dis?.flood,
      liquefaction: dis?.liquefaction,
      has_risk: (dis?.flood || dis?.liquefaction || dis?.storm_surge || dis?.tsunami || dis?.landslide) ? true : false,
      history_events: benchmarks.disaster_history?.wards?.[ward]?.total_events ?? 0,
      evac_count: benchmarks.evacuation_sites?.wards?.[ward]?.site_count ?? 0,
      evac_per_10k: benchmarks.evacuation_sites?.wards?.[ward]?.sites_per_10k_people ?? 0
    };
  });

  let compareMd = "";
  try {
    compareMd = await compareTable(epKey.startsWith("ep") ? epKey : `ep${meta.episode.replace(/\\D/g, "").padStart(2, "0")}`);
  } catch {
    compareMd = "_compare-wards unavailable_";
  }

  const appraisalHighlights = {};
  for (const w of wards) {
    const appraisalInfo = benchmarks.appraisal_comments?.wards?.[w];
    let topHighlights = [];
    if (appraisalInfo && appraisalInfo.json_path) {
      try {
        const raw = await readFile(path.join(root, appraisalInfo.json_path), "utf8");
        const data = JSON.parse(raw);
        if (Array.isArray(data)) {
          topHighlights = data.sort((a, b) => (b.change_rate || 0) - (a.change_rate || 0)).slice(0, 3);
        }
      } catch (e) {
        // ignore
      }
    }
    appraisalHighlights[w] = topHighlights;
  }

  const md = [
    `# Research pack: ${slug}`,
    ``,
    `- Episode: ${meta?.episode ?? args.episode}`,
    `- Generated: ${new Date().toISOString().slice(0, 10)}`,
    `- Wards: ${wards.join(", ")}`,
    `- SSOT: docs/verification/tokyo-ward-series-benchmarks.json`,
    ``,
    `## Executive summary`,
    ``,
    ...summaryRows.map(r =>
      `- **${r.ward}**: 70㎡≈${r.est_70sqm ?? "—"}万 · ㎡${r.ward_avg_sqm ?? "—"}(成約) · n=${r.count ?? "—"} · 成約CAGR=${r.cagr_5y ?? r.cagr_full ?? "—"}% · 取引CAGR10y=${r.trade_cagr_10y ?? "—"}% · 地価CAGR10y=${r.land_cagr_10y ?? "—"}% · 인구Δ=${r.pop_change ?? "—"} · 1R=${r.rent_1r ?? "—"} · Yield≈${r.yield_pct ?? "—"}%`
    ),
    ``,
    `## Ward comparison table`,
    ``,
    compareMd,
    ``,
    `## Price timeseries — 成約価格 (MLIT XIT001 · primary)`,
    ``,
    ...wards.flatMap(w => [`### ${w}`, ``, timeseriesTable(ts, w, "㎡단가(万)"), ``]),
    ``,
    `## Price timeseries — 取引価格 (MLIT XIT001 · auxiliary)`,
    ``,
    `_不動産取引価格情報 — 성약가와 정의·수준 상이. 장기 추세·CAGR 보조용._`,
    ``,
    ...wards.flatMap(w => [`### ${w}`, ``, timeseriesTable(tradeTs, w, "㎡단가(万)"), ``]),
    ``,
    `## Land price timeseries (MLIT XPT002 · auxiliary)`,
    ``,
    `_타일 내 공시지가 포인트 평균 (円/㎡) — 맨션 단가와 직접 비교 금지._`,
    ``,
    ...wards.flatMap(w => [`### ${w}`, ``, timeseriesTable(landTs, w, "円/㎡"), ``]),
    ``,
    `## 町名 price distribution (NOT station-level)`,
    ``,
    ...wards.flatMap(w => [`### ${w}`, ``, districtTable(districtRows[w], w), ``]),
    ``,
    `## Price Map (Spatial Heatmap)`,
    ``,
    ...wards.flatMap(w => [`### ${w}`, ``, `![${w} Price Map](/assets/images/blog/diagrams/heatmap-${w}.webp)`, ``]),
    ``,
    `## Appraisal Highlights (XCT001)`,
    ``,
    ...wards.flatMap(w => {
      const highlights = appraisalHighlights[w] || [];
      if (!highlights.length) return [`### ${w}`, ``, `_No appraisal comments for ${w}_`, ``];
      return [`### ${w}`, ``, ...highlights.map(c => `- ${c.address} (${Number(c.price_sqm).toLocaleString("ja-JP")} 円/㎡, 変動率: ${c.change_rate}%)`), ``];
    }),
    ``,
    `## Demand & risk notes`,
    ``,
    ...summaryRows.map(r =>
      `- **${r.ward}**: top station ${r.top_station ?? "—"} · flood=${r.flood ? "Y" : "N"} · liquefaction=${r.liquefaction ? "Y" : "N"} (tile sample)`
    ),
    ``,
    `## Disaster Risk vs History Matrix (XKT025~029 × XST001)`,
    ``,
    ...summaryRows.map(r =>
      `- **${r.ward}**: 상정(Risk)=${r.has_risk ? "O" : "X"}, 이력(History)=${r.history_events > 0 ? "O" : "X"} (${r.history_events} events)`
    ),
    ``,
    `## Evacuation Sites (XGT001)`,
    ``,
    ...summaryRows.map(r =>
      `- **${r.ward}**: ${r.evac_count} sites (${r.evac_per_10k} per 10k)${r.evac_count === 0 ? " — _(coverage: no_data / API 공백 가능)_" : ""}`
    ),
    ``,
    `## Policy Zone (Location Optimization - XKT003)`,
    ``,
    `_${benchmarks.location_optimization?.note ?? "23구 입지적정화계획 데이터 미고시 (coverage_status: not_applicable_tokyo23). 도쿄 외곽 및 타 현에서만 실증 확인."}_`,
    ``,
    formatWriterConstraintsBlock(),
    ``,
    `## Suggested manifest prefixes`,
    ``,
    `- MLIT-{WARD}-70 · SUUMO-{WARD}-1R · STATION-{WARD}-TOP · PCT-{WARD}-VS-CHUO`,
    `- Timeseries claims: 成約 → mlit_mansion_timeseries · 取引(보조) → mlit_trade_price_timeseries · 地価 → land_price_timeseries`,
  ].join("\n");

  const data = {
    slug,
    episode: meta?.episode,
    generated_at: new Date().toISOString().slice(0, 10),
    wards,
    summary: summaryRows,
    districts: districtRows,
    benchmarks_schema: benchmarks.schema_version,
  };

  return { md, data, slug };
}

async function main() {
  await loadEnv();
  const args = parseArgs(process.argv);
  const episodesDoc = JSON.parse(await readFile(EPISODES, "utf8"));
  const benchmarks = JSON.parse(await readFile(BENCHMARKS, "utf8"));

  let meta = null;
  let wards = [];
  if (args.slug) {
    meta = episodesDoc.episodes.find(e => e.slug === args.slug);
    wards = meta?.wards ?? [];
  }
  if (args.episode) {
    wards = EPISODE_WARDS[args.episode] ?? wards;
    meta = meta || episodesDoc.episodes.find(e =>
      e.wards?.every(w => wards.includes(w))
    );
  }
  if (!wards.length) {
    console.error("Usage: render-episode-research-pack.mjs --slug <slug> | --episode ep06 [--write]");
    process.exit(2);
  }

  const slug = args.slug || meta?.slug;
  const { md, data } = await buildPack(meta, benchmarks, wards, { ...args, slug });

  if (args.write && slug) {
    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(path.join(OUT_DIR, `${slug}.md`), md);
    await writeFile(path.join(OUT_DIR, `${slug}.data.json`), `${JSON.stringify(data, null, 2)}\n`);
    process.stderr.write(`✅ research-packs/${slug}.md\n`);
  } else {
    console.log(md);
  }

  console.log(JSON.stringify({ ok: true, slug, write: args.write }, null, 2));
}

main().catch(err => { console.error(err); process.exit(2); });
