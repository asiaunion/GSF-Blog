#!/usr/bin/env node
/**
 * Auto-populate manifest A/B-layer claims from slug + tokyo-series-episodes.json.
 *
 * Usage:
 *   node scripts/scaffold-episode-manifest.mjs --slug tokyo-taito-sumida-koto
 *   node scripts/scaffold-episode-manifest.mjs --episode Ep.07 --slug tokyo-xxx --wards 北区,板橋区,足立区
 *   node scripts/scaffold-episode-manifest.mjs --slug tokyo-taito-sumida-koto --write
 */
import { readFile, writeFile, access, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const EPISODES = path.join(root, "docs/verification/tokyo-series-episodes.json");
const BENCHMARKS = path.join(root, "docs/verification/tokyo-ward-series-benchmarks.json");
const SNAPSHOT_DIR = path.join(root, "docs/verification/snapshots");
const PKM_ROOT =
  process.env.PKM_ROOT ||
  path.join(process.env.HOME || "", ".gemini/antigravity/scratch/projects/GSF-PKM");
const MLIT_FALLBACK = path.join(root, "docs/verification/data/tokyo_mansion_stats_2025.json");
const MLIT_PKM = path.join(PKM_ROOT, "PKM/30 Resources/tokyo_mansion_stats_2025.json");

function parseArgs(argv) {
  const out = { slug: "", episode: "", wards: [], write: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--slug") out.slug = argv[++i] ?? "";
    else if (a === "--episode") out.episode = argv[++i] ?? "";
    else if (a === "--wards") out.wards = (argv[++i] ?? "").split(",").map(s => s.trim()).filter(Boolean);
    else if (a === "--write") out.write = true;
  }
  return out;
}

async function loadJson(p) {
  return JSON.parse(await readFile(p, "utf8"));
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function latestSnapshot(scCode) {
  const files = await readdir(SNAPSHOT_DIR).catch(() => []);
  const matches = files.filter(f => f.startsWith(`suumo-sc_${scCode}-`) && f.endsWith(".html"));
  if (!matches.length) return { snapshot: "", snippet: "" };
  matches.sort();
  const snapshot = `docs/verification/snapshots/${matches.at(-1)}`;
  return { snapshot, snippet: "" };
}

function wardId(jp, field) {
  return `${jp.replace(/区$/, "").toUpperCase()}-${field}`.replace(/[^A-Z0-9-]/g, "");
}

async function buildManifest(args, meta, benchmarks, mlit) {
  const today = new Date().toISOString().slice(0, 10);
  const wards = args.wards.length ? args.wards : meta?.wards ?? [];
  const episode = args.episode || meta?.episode || "Ep.XX";
  const claims = [];
  const arithmeticChecks = [];

  for (const ward of wards) {
    const mlitWard = mlit[ward] ?? benchmarks.mlit_mansion_2025_q1_q4?.wards?.[ward];
    if (mlitWard?.est_70sqm != null) {
      claims.push({
        id: `MLIT-${wardId(ward, "70")}`,
        label: `${ward} 70㎡ 성약가`,
        value: mlitWard.est_70sqm,
        unit: "万円",
        tier: "primary",
        layer: "A",
        method: "json_lookup",
        evidence: {
          json_path: `${ward}.est_70sqm`,
          count: mlitWard.count ?? mlit[ward]?.count,
        },
        used_in_draft: true,
      });
    }

    const suumo = benchmarks.suumo_rent_new_build_station_5min?.wards?.[ward];
    const scCode = meta?.suumo_ward_codes?.[ward];
    if (suumo?.["1R"] != null && scCode) {
      const snap = await latestSnapshot(scCode);
      claims.push({
        id: `SUUMO-${wardId(ward, "1R")}`,
        label: `${ward} SUUMO 1R`,
        value: suumo["1R"],
        unit: "万円",
        tier: "primary",
        layer: "B",
        method: "suumo_snapshot",
        evidence: {
          url: `https://suumo.jp/chintai/soba/tokyo/sc_${scCode}/`,
          snapshot: snap.snapshot || `.cache/verification/suumo-sc_${scCode}-YYYYMMDD.html`,
          snippet: snap.snippet || `${suumo["1R"]}万円（ワンルーム）`,
        },
        used_in_draft: true,
      });
    }

    const income = benchmarks.income_density_per_capita?.wards?.[ward];
    if (income) {
      claims.push({
        id: `INCOME-${wardId(ward, "DENSITY")}`,
        label: `${ward} 인구 1인당 실질 소득 밀도`,
        value: income.value,
        unit: "万円",
        tier: "primary",
        layer: "A",
        method: "pkm_verified_card",
        evidence: {
          card: "projects/GSF-PKM/PKM/30 Resources/도쿄_23구_인당_실질소득_통계_2025.md",
          rank: income.rank,
        },
        used_in_draft: true,
      });
    }

    const station = benchmarks.station_passengers?.wards?.[ward];
    if (station?.top_passengers != null) {
      claims.push({
        id: `STATION-${wardId(ward, "TOP")}`,
        label: `${ward} 최다 승하차 역 (${station.top_station})`,
        value: station.top_passengers,
        unit: "人/日",
        tier: "primary",
        layer: "A",
        method: "benchmark_lookup",
        evidence: {
          benchmark: `station_passengers.wards.${ward}.top_passengers`,
        },
        used_in_draft: true,
      });
    }


    const land = benchmarks.land_price_official?.wards?.[ward];
    if (land?.avg_change_pct != null) {
      claims.push({
        id: `LAND-${wardId(ward, "CHG")}`,
        label: `${ward} 지가공시 변동율`,
        value: land.avg_change_pct,
        unit: "%",
        tier: "secondary",
        layer: "A",
        method: "benchmark_lookup",
        evidence: { benchmark: `land_price_official.wards.${ward}.avg_change_pct` },
        used_in_draft: false,
      });
    }

    const pop = benchmarks.population_forecast?.wards?.[ward];
    if (pop?.change_pct != null) {
      claims.push({
        id: `POP-${wardId(ward, "2040")}`,
        label: `${ward} 인구 2020→2040 변화율`,
        value: pop.change_pct,
        unit: "%",
        tier: "primary",
        layer: "A",
        method: "benchmark_lookup",
        evidence: { benchmark: `population_forecast.wards.${ward}.change_pct` },
        used_in_draft: true,
      });
    }

    const ts = benchmarks.mlit_mansion_timeseries?.wards?.[ward];
    const cagrContract = ts?.cagr_5y ?? ts?.cagr_full;
    if (cagrContract != null && ts.blog_primary !== false) {
      claims.push({
        id: `TIMESERIES-${wardId(ward, "CAGR")}`,
        label: `${ward} 맨션 成約 ㎡단가 CAGR`,
        value: cagrContract,
        unit: "%",
        tier: "primary",
        layer: "A",
        method: "benchmark_lookup",
        evidence: {
          benchmark: ts.cagr_5y != null
            ? `mlit_mansion_timeseries.wards.${ward}.cagr_5y`
            : `mlit_mansion_timeseries.wards.${ward}.cagr_full`,
          count: ts.counts ? Object.values(ts.counts).at(-1) : undefined,
          span_years: ts.cagr_span_years,
        },
        footnote_required: ts.footnote_required ?? false,
        used_in_draft: true,
      });
    }

    const tradeTs = benchmarks.mlit_trade_price_timeseries?.wards?.[ward];
    const tradeCagr = tradeTs?.cagr_10y ?? tradeTs?.cagr_full;
    if (tradeCagr != null) {
      claims.push({
        id: `TRADE-${wardId(ward, "CAGR10")}`,
        label: `${ward} 不動産取引価格 10년 CAGR (보조)`,
        value: tradeCagr,
        unit: "%",
        tier: "secondary",
        layer: "A",
        method: "benchmark_lookup",
        evidence: {
          benchmark: `mlit_trade_price_timeseries.wards.${ward}`,
          note: "取引価格(01) — 成約価格과 혼용 금지",
        },
        footnote_required: true,
        used_in_draft: false,
      });
    }

    const landTs = benchmarks.land_price_timeseries?.wards?.[ward];
    const landCagr = landTs?.cagr_10y ?? landTs?.cagr_full;
    if (landCagr != null) {
      claims.push({
        id: `LANDTS-${wardId(ward, "CAGR10")}`,
        label: `${ward} 地価公示ポイント 10년 CAGR (보조)`,
        value: landCagr,
        unit: "%",
        tier: "secondary",
        layer: "A",
        method: "benchmark_lookup",
        evidence: {
          benchmark: `land_price_timeseries.wards.${ward}`,
          note: "XPT002 타일 샘플 평균 (円/㎡)",
        },
        footnote_required: true,
        used_in_draft: false,
      });
    }

    if (suumo?.["1R"] != null && mlitWard?.est_70sqm) {
      const y = Math.round(((suumo["1R"] * 12) / mlitWard.est_70sqm) * 1000) / 10;
      claims.push({
        id: `YIELD-${wardId(ward, "1R")}`,
        label: `${ward} 세전 표면 yield proxy (1R)`,
        value: y,
        unit: "%",
        tier: "secondary",
        layer: "B",
        method: "benchmark_lookup",
        evidence: { benchmark: `derived:suumo+mlit` },
        used_in_draft: false,
      });
    }

        const disaster = benchmarks.disaster_risk?.wards?.[ward];
    if (disaster?.summary) {
      claims.push({
        id: `DISASTER-${wardId(ward, "SUM")}`,
        label: `${ward} MLIT 재해 타일 샘플`,
        value: disaster.flood || disaster.liquefaction ? 1 : 0,
        unit: "flag",
        tier: "secondary",
        layer: "A",
        method: "benchmark_lookup",
        evidence: { benchmark: `disaster_risk.wards.${ward}` },
        used_in_draft: false,
      });
    }
  }

  const chuo70 = benchmarks.mlit_mansion_2025_q1_q4?.wards?.["中央区"]?.est_70sqm ?? 12680;
  for (const ward of wards) {
    const est = benchmarks.mlit_mansion_2025_q1_q4?.wards?.[ward]?.est_70sqm;
    if (est && chuo70) {
      arithmeticChecks.push({
        id: `PCT-${wardId(ward, "VS-CHUO")}`,
        label: `${ward} vs 中央区 가격 비율`,
        formula: `${est} / ${chuo70} * 100`,
        expected: Math.round((est / chuo70) * 1000) / 10,
        unit: "%",
        tolerance: 0.5,
      });
    }
  }

  const routes = benchmarks.transit_to_downtown?.routes ?? {};
  for (const [routeKey, route] of Object.entries(routes)) {
    if (!wards.includes(route.ward)) continue;
    if (route.locked_episode && route.locked_episode !== episode) continue;
    claims.push({
      id: `TRANSIT-${routeKey.replace(/→/g, "-")}`,
      label: routeKey,
      value: route.minutes,
      unit: "分",
      tier: "secondary",
      layer: "C",
      method: "benchmark_lookup",
      evidence: { benchmark: `transit_to_downtown.routes.${routeKey}` },
      used_in_draft: true,
    });
  }

  return {
    episode,
    slug: args.slug,
    created_at: today,
    updated_at: today,
    gates: {
      c_tier_capture_requested: false,
      manifest_approved_by: null,
      manifest_approved_at: null,
      draft_started: false,
      cursor_audit_passed: false,
      cursor_audit_at: null,
      joseph_final_approved: false,
    },
    claims,
    arithmetic_checks: arithmeticChecks,
    c_tier_capture_requests: [],
  };
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.slug) {
    console.error("Usage: node scripts/scaffold-episode-manifest.mjs --slug <slug> [--episode Ep.XX] [--wards 区,区] [--write]");
    process.exit(2);
  }

  const episodesDoc = await loadJson(EPISODES);
  const benchmarks = await loadJson(BENCHMARKS);
  const meta = episodesDoc.episodes.find(e => e.slug === args.slug);
  const suumoCodes = episodesDoc.suumo_ward_codes;
  const metaWithCodes = meta ? { ...meta, suumo_ward_codes: suumoCodes } : { suumo_ward_codes: suumoCodes };

  let mlit = {};
  const mlitPath = (await fileExists(MLIT_PKM)) ? MLIT_PKM : MLIT_FALLBACK;
  if (await fileExists(mlitPath)) mlit = await loadJson(mlitPath);

  const manifest = await buildManifest(args, metaWithCodes, benchmarks, mlit);
  const epNum = (manifest.episode.match(/\d+/) ?? ["xx"])[0].padStart(2, "0");
  const outPath = path.join(root, "docs/verification/manifests", `ep${epNum}-${args.slug}.manifest.json`);

  if (args.write) {
    await writeFile(outPath, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(JSON.stringify({ ok: true, written: outPath, claims: manifest.claims.length }, null, 2));
  } else {
    console.log(JSON.stringify({ ok: true, outPath, manifest }, null, 2));
  }
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
