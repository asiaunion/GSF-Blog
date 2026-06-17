#!/usr/bin/env node
/**
 * Merge MLIT collector outputs into tokyo-ward-series-benchmarks.json (v1.1 sections).
 *
 * Usage:
 *   node scripts/sync-mlit-to-benchmarks.mjs --episode ep07
 *   node scripts/sync-mlit-to-benchmarks.mjs --ward 北区 --write
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  collectPrice,
  collectStation,
  collectLandPrice,
  collectPopulation,
  collectDisaster,
  EPISODE_WARDS,
  WARD_CODE,
  loadEnv,
} from "./mlit-collector.mjs";

const root = process.cwd();
const BENCHMARKS = path.join(root, "docs/verification/tokyo-ward-series-benchmarks.json");
const EPISODES = path.join(root, "docs/verification/tokyo-series-episodes.json");

function parseArgs(argv) {
  const out = { ward: "", episode: "", allWards: false, year: 2025, write: false, noCache: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--ward") out.ward = argv[++i] ?? "";
    else if (a === "--episode") out.episode = (argv[++i] ?? "").toLowerCase();
    else if (a === "--all-wards") out.allWards = true;
    else if (a === "--year") out.year = parseInt(argv[++i] ?? "2025", 10);
    else if (a === "--write") out.write = true;
    else if (a === "--no-cache") out.noCache = true;
  }
  return out;
}

function disasterSummary(detail) {
  const risky = Object.entries(detail ?? {})
    .filter(([, v]) => v?.has_risk)
    .map(([k]) => k);
  return risky.length ? risky.join(", ") : "none flagged in tile sample";
}

async function main() {
  await loadEnv();
  const args = parseArgs(process.argv);
  let wards = [];
  if (args.ward) wards = [args.ward];
  else if (args.episode) {
    wards = EPISODE_WARDS[args.episode];
    if (!wards) {
      console.error(`Unknown episode: ${args.episode}`);
      process.exit(1);
    }
  } else if (args.allWards) {
    wards = Object.keys(WARD_CODE);
  } else {
    console.error("Usage: sync-mlit-to-benchmarks.mjs --episode ep07 | --all-wards [--write]");
    process.exit(2);
  }

  const benchmarks = JSON.parse(await readFile(BENCHMARKS, "utf8"));
  const episodesDoc = JSON.parse(await readFile(EPISODES, "utf8")).episodes ?? [];
  const epLabel =
    args.episode?.replace("ep", "Ep.") ??
    episodesDoc.find(e => e.wards?.every(w => wards.includes(w)))?.episode ??
    "";

  benchmarks.schema_version = "1.3";
  benchmarks.last_updated = new Date().toISOString().slice(0, 10);

  if (!benchmarks.mlit_mansion_2025_q1_q4) {
    benchmarks.mlit_mansion_2025_q1_q4 = { source: "MLIT XIT001 API", wards: {} };
  }
  if (!benchmarks.station_passengers) {
    benchmarks.station_passengers = {
      source: "MLIT XKT015",
      tier: "A",
      note: "타일 샘플 기반 — 행정구 경계와 불일치 가능; STATION_ADMIN_WARD 필터 적용",
      wards: {},
    };
  }
  if (!benchmarks.land_price_official) {
    benchmarks.land_price_official = {
      source: "MLIT XPT002",
      tier: "A",
      wards: {},
    };
  }
  if (!benchmarks.population_forecast) {
    benchmarks.population_forecast = {
      source: "MLIT XKT013",
      tier: "A",
      note: "250mメッシュ 타일 합산 — 구 전체 근사",
      wards: {},
    };
  }

  if (!benchmarks.district_price_2025) {
    benchmarks.district_price_2025 = {
      source: "MLIT XIT001 DistrictName aggregation",
      tier: "A",
      note: "町名別 — NOT station-level",
      wards: {},
    };
  }
  if (!benchmarks.disaster_risk) {
    benchmarks.disaster_risk = {
      source: "MLIT XKT025~029",
      tier: "A",
      wards: {},
    };
  }

  const merged = { wards: [] };

  for (const ward of wards) {
    const price = await collectPrice(ward, args.year, null, args.noCache);
    const station = await collectStation(ward, args.noCache);
    const land = await collectLandPrice(ward, args.year, args.noCache);
    const pop = await collectPopulation(ward, args.noCache);
    const disaster = await collectDisaster(ward, args.noCache);

    if (price.count > 0) {
      benchmarks.mlit_mansion_2025_q1_q4.wards[ward] = {
        ward_avg_sqm: price.ward_avg_sqm,
        est_70sqm: price.est_70sqm,
        count: price.count,
        episode: epLabel || benchmarks.mlit_mansion_2025_q1_q4.wards[ward]?.episode,
        fetched_at: price.fetched_at,
      };
    }

    if (price.districts?.length) {
      benchmarks.district_price_2025.wards[ward] = {
        top_districts: price.districts.slice(0, 10).map(d => ({
          name: d.name,
          count: d.count,
          avg_sqm: d.avg_sqm,
          aggregation: "DistrictName",
        })),
        episode: epLabel,
        fetched_at: price.fetched_at,
      };
    }

    if (station.station_count > 0) {
      benchmarks.station_passengers.wards[ward] = {
        top_station: station.top_station?.name,
        top_passengers: station.top_station?.passengers_daily,
        total_daily: station.total_daily_passengers,
        station_count: station.station_count,
        episode: epLabel,
        fetched_at: station.fetched_at,
      };
    }

    if (land.point_count > 0) {
      benchmarks.land_price_official.wards[ward] = {
        avg_yen_sqm: land.price_stats?.avg,
        avg_change_pct: land.avg_change_rate,
        point_count: land.point_count,
        episode: epLabel,
        fetched_at: land.fetched_at,
      };
    }

    const pop2020 = pop.population_by_year?.[2020];
    const pop2040 = pop.population_by_year?.[2040];
    if (pop2020) {
      benchmarks.population_forecast.wards[ward] = {
        pop_2020: pop2020,
        pop_2040: pop2040 ?? null,
        change_pct: pop.change_rate_2020_2040,
        mesh_count: pop.mesh_count,
        episode: epLabel,
        fetched_at: pop.fetched_at,
      };
    }

    benchmarks.disaster_risk.wards[ward] = {
      flood: disaster.detail?.flood?.has_risk ?? false,
      liquefaction: disaster.detail?.liquefaction?.has_risk ?? false,
      storm_surge: disaster.detail?.storm_surge?.has_risk ?? false,
      tsunami: disaster.detail?.tsunami?.has_risk ?? false,
      landslide: disaster.detail?.landslide?.has_risk ?? false,
      summary: disasterSummary(disaster.detail),
      episode: epLabel,
      fetched_at: disaster.fetched_at,
    };

    merged.wards.push(ward);
  }

  if (args.write) {
    await writeFile(BENCHMARKS, `${JSON.stringify(benchmarks, null, 2)}\n`);
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        write: args.write,
        path: args.write ? BENCHMARKS : "(dry)",
        merged,
        preview: {
          mlit: merged.wards.map(w => benchmarks.mlit_mansion_2025_q1_q4.wards[w]),
          station: merged.wards.map(w => benchmarks.station_passengers.wards[w]),
        },
      },
      null,
      2
    )
  );
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
