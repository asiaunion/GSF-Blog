#!/usr/bin/env node
/**
 * Merge MLIT collector outputs into tokyo-ward-series-benchmarks.json (v1.1 sections).
 *
 * Usage:
 *   node scripts/sync-mlit-to-benchmarks.mjs --episode ep07 --types station,population,disaster --write
 *   node scripts/sync-mlit-to-benchmarks.mjs --ward 北区 --write
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  listRegion,
  getMunicipality
} from "./lib/municipality-registry.mjs";
import {
  collectPrice,
  collectPricePoints,
  collectAppraisal,
  collectStation,
  collectLandPrice,
  collectPopulation,
  collectDisaster,
  collectDisasterHistory,
  collectEvacuationSites,
  collectUrbanPlanning,
  collectZoning,
  EPISODE_WARDS,
  WARD_CODE,
  loadEnv,
} from "./mlit-collector.mjs";
import { calculateEvacuationMetrics } from "./lib/evacuation-metrics.mjs";

const root = process.cwd();
const BENCHMARKS = path.join(root, "docs/verification/tokyo-ward-series-benchmarks.json");
const EPISODES = path.join(root, "docs/verification/tokyo-series-episodes.json");

function parseArgs(argv) {
  const out = {
    ward: "",
    episode: "",
    allWards: false,
    region: "",
    benchmarksPath: "",
    year: 2025,
    write: false,
    noCache: false,
    types: null,
  };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--ward" || a === "--municipality") out.ward = argv[++i] ?? "";
    else if (a === "--episode") out.episode = (argv[++i] ?? "").toLowerCase();
    else if (a === "--all-wards") { out.allWards = true; out.region = "tokyo23"; }
    else if (a === "--region") out.region = argv[++i] ?? "";
    else if (a === "--benchmarks-path") out.benchmarksPath = argv[++i] ?? "";
    else if (a === "--year") out.year = parseInt(argv[++i] ?? "2025", 10);
    else if (a === "--write") out.write = true;
    else if (a === "--no-cache") out.noCache = true;
    else if (a === "--types") {
      out.types = (argv[++i] ?? "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);
    }
  }
  return out;
}

function wantsType(args, type) {
  return !args.types?.length || args.types.includes(type);
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
  } else if (args.region) {
    wards = listRegion(args.region).map(code => getMunicipality({ code }).name_ja);
  } else if (args.allWards) {
    wards = listRegion("tokyo23").map(code => getMunicipality({ code }).name_ja);
  } else {
    console.error("Usage: sync-mlit-to-benchmarks.mjs --episode ep07 | --region pilot | --all-wards [--write]");
    process.exit(2);
  }

  let finalBenchmarksPath = BENCHMARKS;
  if (args.benchmarksPath) {
    finalBenchmarksPath = path.resolve(root, args.benchmarksPath);
  } else if (args.region === "pilot") {
    finalBenchmarksPath = path.join(root, "docs/verification/greater-tokyo-pilot-benchmarks.json");
  } else if (args.region === "tokyo_tama_priority" || args.region === "tokyo_tama") {
    finalBenchmarksPath = path.join(root, "docs/verification/tokyo-tama-benchmarks.json");
  }

  const benchmarks = JSON.parse(await readFile(finalBenchmarksPath, "utf8"));
  const episodesDoc = JSON.parse(await readFile(EPISODES, "utf8")).episodes ?? [];
  const epLabel =
    args.episode?.replace("ep", "Ep.") ??
    episodesDoc.find(e => e.wards?.every(w => wards.includes(w)))?.episode ??
    "";

  if (args.region !== "pilot" && args.region !== "tokyo_tama_priority" && args.region !== "tokyo_tama" && !args.benchmarksPath?.includes("pilot") && !args.benchmarksPath?.includes("tama")) {
    benchmarks.schema_version = "1.9";
  }
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
  if (!benchmarks.disaster_history) {
    benchmarks.disaster_history = {
      source: "MLIT XST001",
      tier: "A",
      coverage_warning: "국토조사 미완료 지역은 이력 없음이 아닌 데이터 없음일 수 있음",
      note: "과거 재해 이력 (주로 침수 피해).",
      wards: {},
    };
  }
  if (!benchmarks.evacuation_sites) {
    benchmarks.evacuation_sites = {
      source: "MLIT XGT001",
      tier: "A",
      note: "지정 긴급대피장소. API 한계로 수용 인원 미제공. site_count=0 구는 커버리지 공백일 수 있음.",
      wards: {},
    };
  }
  if (!benchmarks.location_optimization) {
    benchmarks.location_optimization = {
      source: "MLIT XKT003 (deferred — Tokyo 23 wards)",
      tier: "A",
      coverage_status: "not_applicable_tokyo23",
      note: "23구는 입지적정화계획 in-ward 폴리곤 0건. Phase 4 수도권·외곽 확장 시 재검토.",
      wards: {},
    };
    for (const w of Object.keys(WARD_CODE)) {
      benchmarks.location_optimization.wards[w] = {
        coverage_status: "not_applicable_tokyo23",
        residential_induction_coverage_pct: null,
        fetched_at: "2026-06-18"
      };
    }
  }
  if (!benchmarks.price_points) {
    benchmarks.price_points = {
      source: "MLIT XPT001 API",
      tier: "A",
      note: "거래 건별 위도·경도 포함. 공간 분석용. 집계값은 mlit_mansion_2025 섹션 참조.",
      wards: {},
    };
  }
  if (!benchmarks.appraisal_comments) {
    benchmarks.appraisal_comments = {
      source: "MLIT XCT001 API",
      tier: "A",
      note: "지가공시 감정평가서 원문. 직근 5년분. 텍스트 인용 시 출처 명기 필수. bulk 데이터는 캐시 경로 참조.",
      wards: {},
    };
  }
  if (!benchmarks.urban_planning) {
    benchmarks.urban_planning = {
      source: "MLIT XKT014, XKT023, XKT024, XKT030",
      tier: "A",
      note: "도시계획 (방화지역, 지구계획, 고도이용지구, 도시계획도로)",
      wards: {},
    };
  }

  const merged = { wards: [] };

  for (const ward of wards) {
    const price = wantsType(args, "price")
      ? await collectPrice(ward, args.year, null, args.noCache)
      : null;
    const pricePoint = wantsType(args, "price-point")
      ? await collectPricePoints(ward, args.year, args.noCache)
      : null;
    const appraisal = wantsType(args, "appraisal")
      ? await collectAppraisal(ward, args.year, args.noCache)
      : null;
    const station = wantsType(args, "station")
      ? await collectStation(ward, args.noCache)
      : null;
    const land = wantsType(args, "landprice")
      ? await collectLandPrice(ward, args.year, args.noCache)
      : null;
    let pop = null;
    if (wantsType(args, "population")) {
      if (benchmarks.population_forecast?.wards[ward]?.source === "jukiren+ipss") {
        pop = null; // skip
      } else {
        pop = await collectPopulation(ward, args.noCache);
      }
    }
    const disaster = wantsType(args, "disaster")
      ? await collectDisaster(ward, args.noCache)
      : null;
    const disasterHistory = wantsType(args, "disaster-history") || wantsType(args, "disaster_history")
      ? await collectDisasterHistory(ward, args.noCache)
      : null;
    const evacuationSites = wantsType(args, "evacuation-sites") || wantsType(args, "evacuation_sites")
      ? await collectEvacuationSites(ward, args.noCache)
      : null;
    const urbanPlanning = wantsType(args, "urban-planning") || wantsType(args, "urban_planning")
      ? await collectUrbanPlanning(ward, args.noCache)
      : null;
    const zoning = wantsType(args, "urban-planning") || wantsType(args, "urban_planning")
      ? await collectZoning(ward, args.noCache)
      : null;

    if (price?.count > 0) {
      benchmarks.mlit_mansion_2025_q1_q4.wards[ward] = {
        ward_avg_sqm: price.ward_avg_sqm,
        est_70sqm: price.est_70sqm,
        count: price.count,
        episode: epLabel || benchmarks.mlit_mansion_2025_q1_q4.wards[ward]?.episode,
        fetched_at: price.fetched_at,
      };
    }

    if (pricePoint?.count > 0) {
      const mansionCount = benchmarks.mlit_mansion_2025_q1_q4.wards[ward]?.count || 0;
      let coverageWarning = false;
      if (mansionCount > 0 && pricePoint.count < mansionCount * 0.8) {
        coverageWarning = true;
      }
      
      benchmarks.price_points.wards[ward] = {
        geojson_path: pricePoint.geojson_path,
        count: pricePoint.count,
        price_classification: pricePoint.price_classification || "02",
        tile_coverage_warning: coverageWarning,
        fetched_at: pricePoint.fetched_at,
      };
    }

    if (appraisal?.count > 0) {
      benchmarks.appraisal_comments.wards[ward] = {
        json_path: appraisal.json_path,
        count: appraisal.count,
        fetched_at: appraisal.fetched_at,
      };
    }

    if (price?.districts?.length) {
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

    if (station?.station_count > 0) {
      benchmarks.station_passengers.wards[ward] = {
        top_station: station.top_station?.name,
        top_passengers: station.top_station?.passengers_daily,
        total_daily: station.total_daily_passengers,
        station_count: station.station_count,
        episode: epLabel,
        fetched_at: station.fetched_at,
      };
    }

    if (land?.point_count > 0) {
      benchmarks.land_price_official.wards[ward] = {
        avg_yen_sqm: land.price_stats?.avg,
        avg_change_pct: land.avg_change_rate,
        point_count: land.point_count,
        episode: epLabel,
        fetched_at: land.fetched_at,
      };
    }

    const pop2020 = pop?.population_by_year?.[2020];
    const pop2040 = pop?.population_by_year?.[2040];
    if (pop2020) {
      benchmarks.population_forecast.wards[ward] = {
        pop_2020: pop2020,
        pop_2040: pop2040 ?? null,
        change_pct: pop.change_rate_2020_2040,
        mesh_count: pop.mesh_count,
        mesh_coverage_warning: pop.mesh_coverage_warning ?? false,
        population_tile_preset: pop.population_tile_preset ?? false,
        episode: epLabel,
        fetched_at: pop.fetched_at,
      };
    }

    if (disaster) {
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
    }

    if (disasterHistory) {
      benchmarks.disaster_history.wards[ward] = {
        has_history: disasterHistory.summary.has_history,
        total_events: disasterHistory.summary.total_events,
        flood_events: disasterHistory.summary.flood_events,
        last_flood_year: disasterHistory.summary.last_flood_year,
        coverage_status: disasterHistory.coverage_status,
        coverage_warning: disasterHistory.coverage_warning,
        ...(disasterHistory.coverage_note
          ? { coverage_note: disasterHistory.coverage_note }
          : {}),
        episode: epLabel,
        fetched_at: disasterHistory.fetched_at,
      };
    }

    if (evacuationSites) {
      // Calculate metrics using the existing population_forecast if available
      let popSummary = {};
      if (benchmarks.population_forecast && benchmarks.population_forecast.wards[ward]) {
        popSummary = benchmarks.population_forecast.wards[ward];
      }
      const metrics = calculateEvacuationMetrics(evacuationSites.summary, popSummary);

      benchmarks.evacuation_sites.wards[ward] = {
        site_count: evacuationSites.summary.site_count,
        coverage_status: evacuationSites.summary.site_count === 0 ? "no_data" : "surveyed",
        ...(evacuationSites.summary.site_count === 0 ? { coverage_note: "타일 내 in-ward 대피소 0건 (인접 구 bleed 제외 후). MLIT XGT001 커버리지 공백 가능 — 본문에서 '대피소 없음' 단정 금지." } : {}),
        by_disaster_type: evacuationSites.summary.by_disaster_type,
        sites_per_10k_people: metrics.sites_per_10k_people,
        population_used: metrics.population_used,
        capacity_note: metrics.capacity_note,
        episode: epLabel,
        fetched_at: evacuationSites.fetched_at,
      };
    }

    if (urbanPlanning) {
      const fp = urbanPlanning.detail.fire_prevention_zone;
      const dp = urbanPlanning.detail.district_plan_zones;
      const hu = urbanPlanning.detail.high_utilization_zones;
      const ur = urbanPlanning.detail.urban_road;

      benchmarks.urban_planning.wards[ward] = {
        fire_prevention_zone: {
          coverage_pct: fp.feature_count === 0 ? null : (fp.coverage_pct || 0),
          dominant_type: fp.dominant_type || null,
          feature_count: fp.feature_count,
          ...(fp.feature_count === 0 ? { coverage_status: "no_data", coverage_note: "해당 구에 데이터 없음 (인접 구 bleed 제외)" } : {})
        },
        district_plan_zones: {
          feature_count: dp.feature_count,
          ...(dp.feature_count === 0 ? { coverage_status: "no_data", coverage_note: "해당 구에 데이터 없음 (인접 구 bleed 제외)" } : {})
        },
        high_utilization_zones: {
          feature_count: hu.feature_count,
          ...(hu.feature_count === 0 ? { coverage_status: "no_data", coverage_note: "해당 구에 데이터 없음 (인접 구 bleed 제외)" } : {})
        },
        urban_road: {
          affected_pct: ur.feature_count === 0 ? null : (ur.urban_road_affected_pct || 0),
          feature_count: ur.feature_count,
          ...(ur.feature_count === 0 ? { coverage_status: "no_data", coverage_note: "해당 구에 데이터 없음 (인접 구 bleed 제외)" } : {})
        },
        ...(zoning ? { zoning_top3: zoning.top3 } : {}),
        episode: epLabel,
        fetched_at: urbanPlanning.fetched_at,
      };
    }

    merged.wards.push(ward);
  }

  if (args.write) {
    await writeFile(finalBenchmarksPath, `${JSON.stringify(benchmarks, null, 2)}\n`);
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        write: args.write,
        path: args.write ? finalBenchmarksPath : "(dry)",
        merged,
        preview: {
          mlit: merged.wards.map(w => benchmarks.mlit_mansion_2025_q1_q4.wards[w]),
          station: merged.wards.map(w => benchmarks.station_passengers.wards[w]),
          price_points: merged.wards.map(w => benchmarks.price_points.wards[w]),
          appraisal: merged.wards.map(w => benchmarks.appraisal_comments.wards[w]),
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
