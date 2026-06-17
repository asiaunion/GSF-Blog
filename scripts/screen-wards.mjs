#!/usr/bin/env node
/**
 * 23구 investment screening from benchmarks SSOT.
 *
 * Usage:
 *   node scripts/screen-wards.mjs
 *   node scripts/screen-wards.mjs --max-price-sqm 100 --min-pop-change 0 --no-flood
 *   node scripts/screen-wards.mjs --json
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const BENCHMARKS = path.join(process.cwd(), "docs/verification/tokyo-ward-series-benchmarks.json");

function parseArgs(argv) {
  const out = {
    maxPriceSqm: null,
    minPopChange: null,
    noFlood: false,
    noLiquefaction: false,
    minYield: null,
    format: "md",
  };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--max-price-sqm") out.maxPriceSqm = parseFloat(argv[++i]);
    else if (a === "--min-pop-change") out.minPopChange = parseFloat(argv[++i]);
    else if (a === "--no-flood") out.noFlood = true;
    else if (a === "--no-liquefaction") out.noLiquefaction = true;
    else if (a === "--min-yield") out.minYield = parseFloat(argv[++i]);
    else if (a === "--json") out.format = "json";
  }
  return out;
}

function yieldProxy(rent1r, est70) {
  if (!rent1r || !est70) return null;
  return Math.round(((rent1r * 12) / est70) * 1000) / 10;
}

async function main() {
  const args = parseArgs(process.argv);
  const b = JSON.parse(await readFile(BENCHMARKS, "utf8"));
  const wards = Object.keys(b.mlit_mansion_2025_q1_q4?.wards ?? {});

  const rows = wards.map(ward => {
    const m = b.mlit_mansion_2025_q1_q4.wards[ward];
    const pop = b.population_forecast?.wards?.[ward];
    const dis = b.disaster_risk?.wards?.[ward];
    const suumo = b.suumo_rent_new_build_station_5min?.wards?.[ward];
    const ts = b.mlit_mansion_timeseries?.wards?.[ward];
    const y = yieldProxy(suumo?.["1R"], m?.est_70sqm);
    return {
      ward,
      ward_avg_sqm: m?.ward_avg_sqm,
      est_70sqm: m?.est_70sqm,
      count: m?.count,
      cagr_5y: ts?.cagr_5y,
      pop_change: pop?.change_pct,
      flood: dis?.flood,
      liquefaction: dis?.liquefaction,
      yield_pct: y,
      score: 0,
    };
  });

  const prices = rows.map(r => r.ward_avg_sqm).filter(v => v != null);
  const medianPrice = prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)] ?? 0;

  for (const r of rows) {
    let score = 0;
    if (r.ward_avg_sqm != null && r.ward_avg_sqm < medianPrice) score += 1;
    if (r.pop_change != null && r.pop_change > 0) score += 1;
    if (!r.flood) score += 1;
    if (!r.liquefaction) score += 1;
    if (r.yield_pct != null && r.yield_pct >= 4) score += 1;
    if (r.cagr_5y != null && r.cagr_5y > 0) score += 1;
    r.score = score;
  }

  let filtered = rows;
  if (args.maxPriceSqm != null) filtered = filtered.filter(r => r.ward_avg_sqm <= args.maxPriceSqm);
  if (args.minPopChange != null) filtered = filtered.filter(r => (r.pop_change ?? -999) >= args.minPopChange);
  if (args.noFlood) filtered = filtered.filter(r => !r.flood);
  if (args.noLiquefaction) filtered = filtered.filter(r => !r.liquefaction);
  if (args.minYield != null) filtered = filtered.filter(r => (r.yield_pct ?? 0) >= args.minYield);

  filtered.sort((a, b) => b.score - a.score || (a.ward_avg_sqm ?? 0) - (b.ward_avg_sqm ?? 0));

  if (args.format === "json") {
    console.log(JSON.stringify({ ok: true, medianPrice, rows: filtered }, null, 2));
    return;
  }

  const header = "| Rank | 구 | ㎡단가 | n | CAGR5y | 인구Δ | Yield | 홍수 | 액상화 | score |";
  const sep = "|---:|---|---:|---:|---:|---:|---:|:---:|:---:|---:|";
  const body = filtered.map((r, i) =>
    `| ${i + 1} | ${r.ward} | ${r.ward_avg_sqm ?? "—"} | ${r.count ?? "—"} | ${r.cagr_5y ?? "—"} | ${r.pop_change ?? "—"} | ${r.yield_pct ?? "—"} | ${r.flood ? "Y" : "—"} | ${r.liquefaction ? "Y" : "—"} | ${r.score} |`
  );
  console.log([`Median ㎡단가: ${medianPrice}`, "", header, sep, ...body].join("\n"));
}

main().catch(err => { console.error(err); process.exit(2); });
