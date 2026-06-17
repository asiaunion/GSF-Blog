#!/usr/bin/env node
/**
 * MLIT XPT002 지가공시·지가조사 포인트 연도별 시계열 — 보조 A_auxiliary
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { collectLandPrice, EPISODE_WARDS, WARD_CODE, CACHE_DIR, loadEnv } from "./mlit-collector.mjs";
import { buildCagrMetrics, parseWardArgs, sleep } from "./lib/mlit-series-math.mjs";

const BENCHMARKS = path.join(process.cwd(), "docs/verification/tokyo-ward-series-benchmarks.json");

async function seriesForWard(ward, fromYear, toYear, noCache) {
  const series = {};
  const pointCounts = {};
  const changeRates = {};

  for (let year = fromYear; year <= toYear; year += 1) {
    try {
      const land = await collectLandPrice(ward, year, noCache);
      if (!land.point_count) continue;
      series[year] = Math.round(land.price_stats?.avg ?? 0);
      pointCounts[year] = land.point_count;
      if (land.avg_change_rate != null) changeRates[year] = land.avg_change_rate;
      await sleep(350);
    } catch (e) {
      process.stderr.write(`⚠️ ${ward} ${year}: ${e.message}\n`);
    }
  }

  const metrics = buildCagrMetrics(series);

  return {
    ward,
    aggregation: "tile sample point average (XPT002; ≠ 행정구 전체)",
    unit: "円/㎡",
    series,
    point_counts: pointCounts,
    yoy_change_rate: changeRates,
    yoy_pct: metrics.yoy_pct,
    cagr_span_years: metrics.cagr_span_years,
    cagr_full: metrics.cagr_full,
    cagr_5y: metrics.cagr_5y,
    cagr_10y: metrics.cagr_10y,
    blog_primary: false,
    footnote_required: true,
    auxiliary_note: "타일 내 공시지가 포인트 평균 — 맨션 성약가와 직접 비교 금지",
    fetched_at: new Date().toISOString().slice(0, 10),
    source: "MLIT XPT002 [A_auxiliary]",
  };
}

async function mergeIntoBenchmarks(wardSeriesList) {
  const benchmarks = JSON.parse(await readFile(BENCHMARKS, "utf8"));
  benchmarks.schema_version = "1.3";
  benchmarks.last_updated = new Date().toISOString().slice(0, 10);

  if (!benchmarks.land_price_timeseries) {
    benchmarks.land_price_timeseries = {
      source: "MLIT XPT002 API",
      tier: "A_auxiliary",
      unit: "円/㎡",
      note: "타일 샘플 공시지가 포인트 평균 — 구 경계와 불일치 가능",
      wards: {},
    };
  }

  for (const row of wardSeriesList) {
    benchmarks.land_price_timeseries.wards[row.ward] = {
      series: row.series,
      point_counts: row.point_counts,
      yoy_change_rate: row.yoy_change_rate,
      yoy_pct: row.yoy_pct,
      cagr_full: row.cagr_full,
      cagr_5y: row.cagr_5y,
      cagr_10y: row.cagr_10y,
      cagr_span_years: row.cagr_span_years,
      blog_primary: false,
      footnote_required: true,
      fetched_at: row.fetched_at,
    };
  }

  await writeFile(BENCHMARKS, `${JSON.stringify(benchmarks, null, 2)}\n`);
}

async function main() {
  await loadEnv();
  let args;
  try {
    args = parseWardArgs(process.argv, EPISODE_WARDS, WARD_CODE);
    if (!process.argv.includes("--to")) args.to = 2026;
  } catch (e) {
    console.error(e.message);
    console.error("Usage: mlit-land-price-series.mjs --ward 北区 | --all-wards [--from 2005] [--to 2026] [--write]");
    process.exit(2);
  }

  const results = [];
  for (const ward of args.wards) {
    process.stderr.write(`\n🏞️ 地価 ${ward} ${args.from}–${args.to}\n`);
    const row = await seriesForWard(ward, args.from, args.to, args.noCache);
    results.push(row);
    const cachePath = path.join(CACHE_DIR, `land-series-${ward}-${args.from}-${args.to}.json`);
    await mkdir(path.dirname(cachePath), { recursive: true });
    await writeFile(cachePath, `${JSON.stringify(row, null, 2)}\n`);
  }

  if (args.write) {
    await mergeIntoBenchmarks(results);
    process.stderr.write(`✅ benchmarks land_price_timeseries updated\n`);
  }

  console.log(JSON.stringify({ ok: true, write: args.write, wards: results.length }, null, 2));
}

main().catch(err => { console.error(err); process.exit(2); });
