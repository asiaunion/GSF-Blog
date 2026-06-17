#!/usr/bin/env node
/**
 * Cross-ward comparison table for investment / episode research.
 *
 * Usage:
 *   node scripts/compare-wards.mjs --episode ep07
 *   node scripts/compare-wards.mjs --wards 北区,荒川区,足立区
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { EPISODE_WARDS, loadEnv } from "./mlit-collector.mjs";

const root = process.cwd();
const BENCHMARKS = path.join(root, "docs/verification/tokyo-ward-series-benchmarks.json");

function parseArgs(argv) {
  const out = { wards: [], episode: "", format: "md" };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--") continue;
    if (a === "--wards") out.wards = (argv[++i] ?? "").split(",").map(s => s.trim()).filter(Boolean);
    else if (a === "--episode") out.episode = (argv[++i] ?? "").toLowerCase();
    else if (a === "--json") out.format = "json";
  }
  return out;
}

function yieldProxy(rent1r, est70) {
  if (!rent1r || !est70) return null;
  return Math.round(((rent1r * 12) / est70) * 1000) / 10;
}

async function main() {
  await loadEnv();
  const args = parseArgs(process.argv);
  let wards = args.wards;
  if (args.episode) {
    wards = EPISODE_WARDS[args.episode];
    if (!wards) {
      console.error(`Unknown episode: ${args.episode}`);
      process.exit(1);
    }
  }
  if (!wards.length) {
    console.error("Usage: compare-wards.mjs --episode ep07 | --wards 北区,荒川区");
    process.exit(2);
  }

  const b = JSON.parse(await readFile(BENCHMARKS, "utf8"));
  const rows = wards.map(ward => {
    const m = b.mlit_mansion_2025_q1_q4?.wards?.[ward];
    const st = b.station_passengers?.wards?.[ward];
    const pop = b.population_forecast?.wards?.[ward];
    const dis = b.disaster_risk?.wards?.[ward];
    const suumo = b.suumo_rent_new_build_station_5min?.wards?.[ward];
    const tradeTs = b.mlit_trade_price_timeseries?.wards?.[ward];
    const landTs = b.land_price_timeseries?.wards?.[ward];
    return {
      ward,
      est_70sqm: m?.est_70sqm,
      ward_avg_sqm: m?.ward_avg_sqm,
      count: m?.count,
      trade_cagr_10y: tradeTs?.cagr_10y ?? tradeTs?.cagr_full,
      land_cagr_10y: landTs?.cagr_10y ?? landTs?.cagr_full,
      top_station: st?.top_station,
      top_passengers: st?.top_passengers,
      pop_change: pop?.change_pct,
      flood: dis?.flood,
      liquefaction: dis?.liquefaction,
      rent_1r: suumo?.["1R"],
      yield_proxy_pct: yieldProxy(suumo?.["1R"], m?.est_70sqm),
    };
  });

  if (args.format === "json") {
    console.log(JSON.stringify({ ok: true, rows }, null, 2));
    return;
  }

  const header = "| 구 | 70㎡(万) | ㎡단가(成約) | 거래수 | 取引CAGR10y | 地価CAGR10y | Top역 | 인구Δ | 1R | Yield% |";
  const sep = "|---|---:|---:|---:|---:|---:|---|---:|---:|---:|";
  const body = rows
    .map(r =>
      `| ${r.ward} | ${r.est_70sqm ?? "—"} | ${r.ward_avg_sqm ?? "—"} | ${r.count ?? "—"} | ${r.trade_cagr_10y ?? "—"} | ${r.land_cagr_10y ?? "—"} | ${r.top_station ?? "—"} | ${r.pop_change ?? "—"} | ${r.rent_1r ?? "—"} | ${r.yield_proxy_pct ?? "—"} |`
    )
    .join("\n");

  console.log([header, sep, body].join("\n"));
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
