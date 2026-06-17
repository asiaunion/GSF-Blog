#!/usr/bin/env node
/**
 * MLIT XIT001 연도별 맨션 성약가 시계열 + CAGR
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { collectPrice, EPISODE_WARDS, WARD_CODE, CACHE_DIR, loadEnv } from "./mlit-collector.mjs";
import { blogPrimaryForCount, footnoteRequiredForCount, policyForCount, SAMPLE_SIZE_POLICY } from "./lib/mlit-sample-policy.mjs";

const BENCHMARKS = path.join(process.cwd(), "docs/verification/tokyo-ward-series-benchmarks.json");

function parseArgs(argv) {
  const out = { ward: "", episode: "", allWards: false, from: 2015, to: 2025, write: false, noCache: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--ward") out.ward = argv[++i] ?? "";
    else if (a === "--episode") out.episode = (argv[++i] ?? "").toLowerCase();
    else if (a === "--all-wards") out.allWards = true;
    else if (a === "--from") out.from = parseInt(argv[++i] ?? "2015", 10);
    else if (a === "--to") out.to = parseInt(argv[++i] ?? "2025", 10);
    else if (a === "--write") out.write = true;
    else if (a === "--no-cache") out.noCache = true;
  }
  return out;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function cagr(startVal, endVal, years) {
  if (!startVal || !endVal || years <= 0 || startVal <= 0) return null;
  return Math.round((Math.pow(endVal / startVal, 1 / years) - 1) * 1000) / 10;
}

function yoyPct(prev, curr) {
  if (!prev || !curr) return null;
  return Math.round(((curr - prev) / prev) * 1000) / 10;
}

async function seriesForWard(ward, fromYear, toYear, noCache) {
  const series = {};
  const counts = {};
  const est70 = {};
  const blogPrimary = {};
  const footnoteRequired = {};

  for (let year = fromYear; year <= toYear; year += 1) {
    try {
      const price = await collectPrice(ward, year, null, noCache);
      if (!price.count) continue;
      series[year] = price.ward_avg_sqm;
      counts[year] = price.count;
      est70[year] = price.est_70sqm;
      blogPrimary[year] = blogPrimaryForCount(price.count);
      footnoteRequired[year] = footnoteRequiredForCount(price.count);
      await sleep(400);
    } catch (e) {
      process.stderr.write(`⚠️ ${ward} ${year}: ${e.message}\n`);
    }
  }

  const years = Object.keys(series).map(Number).sort((a, b) => a - b);
  const first = years[0];
  const last = years.at(-1);
  const span = first != null && last != null ? last - first : 0;

  let prevYear = null;
  const yoy = {};
  for (const y of years) {
    if (prevYear != null) yoy[y] = yoyPct(series[prevYear], series[y]);
    prevYear = y;
  }

  const latestCount = last != null ? counts[last] : 0;
  const latestPolicy = policyForCount(latestCount);

  return {
    ward,
    aggregation: "ward average (XIT001 中古マンション等; 町名別은 districts 필드)",
    series,
    counts,
    est_70sqm: est70,
    blog_primary_by_year: blogPrimary,
    footnote_required_by_year: footnoteRequired,
    yoy_pct: yoy,
    cagr_span_years: span,
    cagr_full: span > 0 ? cagr(series[first], series[last], span) : null,
    cagr_5y: last != null && series[last - 5] != null ? cagr(series[last - 5], series[last], 5) : null,
    blog_primary: latestPolicy.blog_primary,
    footnote_required: latestPolicy.footnote_required,
    fetched_at: new Date().toISOString().slice(0, 10),
    source: "MLIT XIT001 API [1차 확인] A계층",
  };
}

async function mergeIntoBenchmarks(wardSeriesList) {
  const benchmarks = JSON.parse(await readFile(BENCHMARKS, "utf8"));
  benchmarks.schema_version = "1.2";
  benchmarks.last_updated = new Date().toISOString().slice(0, 10);
  benchmarks.sample_size_policy = SAMPLE_SIZE_POLICY;

  if (!benchmarks.mlit_mansion_timeseries) {
    benchmarks.mlit_mansion_timeseries = {
      source: "MLIT XIT001 API",
      tier: "A",
      unit_sqm: "万円/㎡",
      note: "연도별 구 평균 ㎡단가; sample_size_policy 적용",
      wards: {},
    };
  }

  for (const row of wardSeriesList) {
    benchmarks.mlit_mansion_timeseries.wards[row.ward] = {
      series: row.series,
      counts: row.counts,
      est_70sqm: row.est_70sqm,
      yoy_pct: row.yoy_pct,
      cagr_full: row.cagr_full,
      cagr_5y: row.cagr_5y,
      cagr_span_years: row.cagr_span_years,
      blog_primary: row.blog_primary,
      footnote_required: row.footnote_required,
      fetched_at: row.fetched_at,
    };
  }

  await writeFile(BENCHMARKS, `${JSON.stringify(benchmarks, null, 2)}\n`);
}

async function main() {
  await loadEnv();
  const args = parseArgs(process.argv);
  let wards = [];
  if (args.ward) wards = [args.ward];
  else if (args.episode) {
    wards = EPISODE_WARDS[args.episode];
    if (!wards) { console.error(`Unknown episode: ${args.episode}`); process.exit(1); }
  } else if (args.allWards) {
    wards = Object.keys(WARD_CODE);
  } else {
    console.error("Usage: mlit-price-series.mjs --ward 江東区 | --episode ep06 | --all-wards [--write]");
    process.exit(2);
  }

  const results = [];
  for (const ward of wards) {
    process.stderr.write(`\n📈 ${ward} ${args.from}–${args.to}\n`);
    const row = await seriesForWard(ward, args.from, args.to, args.noCache);
    results.push(row);
    const cachePath = path.join(CACHE_DIR, `price-series-${ward}-${args.from}-${args.to}.json`);
    await mkdir(path.dirname(cachePath), { recursive: true });
    await writeFile(cachePath, `${JSON.stringify(row, null, 2)}\n`);
  }

  if (args.write) {
    await mergeIntoBenchmarks(results);
    process.stderr.write(`✅ benchmarks updated\n`);
  }

  console.log(JSON.stringify({ ok: true, write: args.write, wards: results }, null, 2));
}

main().catch(err => { console.error(err); process.exit(2); });
