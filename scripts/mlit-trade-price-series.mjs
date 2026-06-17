#!/usr/bin/env node
/**
 * MLIT XIT001 不動産取引価格 (priceClassification=01) 연도별 시계열 — 보조 A_auxiliary
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { collectTradePrice, EPISODE_WARDS, WARD_CODE, CACHE_DIR, loadEnv } from "./mlit-collector.mjs";
import { blogPrimaryForCount, footnoteRequiredForCount, policyForCount, SAMPLE_SIZE_POLICY } from "./lib/mlit-sample-policy.mjs";
import { buildCagrMetrics, parseWardArgs, sleep } from "./lib/mlit-series-math.mjs";

const BENCHMARKS = path.join(process.cwd(), "docs/verification/tokyo-ward-series-benchmarks.json");

async function seriesForWard(ward, fromYear, toYear, noCache) {
  const series = {};
  const counts = {};
  const est70 = {};

  for (let year = fromYear; year <= toYear; year += 1) {
    try {
      const price = await collectTradePrice(ward, year, null, noCache);
      if (!price.count) continue;
      series[year] = price.ward_avg_sqm;
      counts[year] = price.count;
      est70[year] = price.est_70sqm;
      await sleep(400);
    } catch (e) {
      process.stderr.write(`⚠️ ${ward} ${year}: ${e.message}\n`);
    }
  }

  const metrics = buildCagrMetrics(series);
  const latestCount = metrics.last != null ? counts[metrics.last] : 0;
  const latestPolicy = policyForCount(latestCount);

  return {
    ward,
    price_classification: "01",
    aggregation: "ward average (XIT001 中古マンション等 · 不動産取引価格)",
    series,
    counts,
    est_70sqm: est70,
    yoy_pct: metrics.yoy_pct,
    cagr_span_years: metrics.cagr_span_years,
    cagr_full: metrics.cagr_full,
    cagr_5y: metrics.cagr_5y,
    cagr_10y: metrics.cagr_10y,
    blog_primary: false,
    footnote_required: true,
    auxiliary_note: "成約価格(02)와 정의·수준 상이 — 장기 추세·CAGR 보조용만",
    sample_policy_at_latest: latestPolicy,
    fetched_at: new Date().toISOString().slice(0, 10),
    source: "MLIT XIT001 不動産取引価格 [A_auxiliary]",
  };
}

async function mergeIntoBenchmarks(wardSeriesList) {
  const benchmarks = JSON.parse(await readFile(BENCHMARKS, "utf8"));
  benchmarks.schema_version = "1.3";
  benchmarks.last_updated = new Date().toISOString().slice(0, 10);
  benchmarks.sample_size_policy = SAMPLE_SIZE_POLICY;

  if (!benchmarks.mlit_trade_price_timeseries) {
    benchmarks.mlit_trade_price_timeseries = {
      source: "MLIT XIT001 API priceClassification=01",
      tier: "A_auxiliary",
      unit_sqm: "万円/㎡",
      note: "不動産取引価格 — 성약가(02)와 혼용 금지. 추세·CAGR 보조.",
      wards: {},
    };
  }

  for (const row of wardSeriesList) {
    benchmarks.mlit_trade_price_timeseries.wards[row.ward] = {
      series: row.series,
      counts: row.counts,
      est_70sqm: row.est_70sqm,
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
  } catch (e) {
    console.error(e.message);
    console.error("Usage: mlit-trade-price-series.mjs --ward 北区 | --episode ep07 | --all-wards [--from 2005] [--write]");
    process.exit(2);
  }

  const results = [];
  for (const ward of args.wards) {
    process.stderr.write(`\n📊 取引 ${ward} ${args.from}–${args.to}\n`);
    const row = await seriesForWard(ward, args.from, args.to, args.noCache);
    results.push(row);
    const cachePath = path.join(CACHE_DIR, `trade-series-${ward}-${args.from}-${args.to}.json`);
    await mkdir(path.dirname(cachePath), { recursive: true });
    await writeFile(cachePath, `${JSON.stringify(row, null, 2)}\n`);
  }

  if (args.write) {
    await mergeIntoBenchmarks(results);
    process.stderr.write(`✅ benchmarks mlit_trade_price_timeseries updated\n`);
  }

  console.log(JSON.stringify({ ok: true, write: args.write, wards: results.length }, null, 2));
}

main().catch(err => { console.error(err); process.exit(2); });
