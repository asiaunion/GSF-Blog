#!/usr/bin/env node
/**
 * WARD_TILES 커버리지·역 집계 감사
 *
 * Usage:
 *   node scripts/audit-ward-tiles.mjs
 *   node scripts/audit-ward-tiles.mjs --ward 練馬区
 *   node scripts/audit-ward-tiles.mjs --episode ep08 --no-cache
 */
import { collectStation, WARD_CODE, EPISODE_WARDS, loadEnv } from "./mlit-collector.mjs";
import { getWardTiles, wardTileSummary } from "./lib/ward-tiles.mjs";

const SUSPECT_LOW_STATIONS = 5;

function parseArgs(argv) {
  const out = { ward: "", episode: "", noCache: false, json: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--ward") out.ward = argv[++i] ?? "";
    else if (a === "--episode") out.episode = (argv[++i] ?? "").toLowerCase();
    else if (a === "--no-cache") out.noCache = true;
    else if (a === "--json") out.json = true;
  }
  return out;
}

async function auditWard(ward, noCache) {
  const { tile_count, tiles } = wardTileSummary(ward);
  const station = await collectStation(ward, noCache);
  const flags = [];
  if (station.station_count < SUSPECT_LOW_STATIONS) {
    flags.push(`station_count<${SUSPECT_LOW_STATIONS}`);
  }
  if (station.top_station?.name) {
    flags.push(`top=${station.top_station.name}`);
  }
  return {
    ward,
    tile_count,
    tiles: tiles.map(t => `${t.z}/${t.x}/${t.y}`),
    station_count: station.station_count,
    top_station: station.top_station?.name ?? null,
    top_passengers: station.top_station?.passengers_daily ?? null,
    total_daily: station.total_daily_passengers,
    flags,
  };
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
  } else {
    wards = Object.keys(WARD_CODE);
  }

  const results = [];
  for (const ward of wards) {
    process.stderr.write(`▶ ${ward} (${getWardTiles(ward).length} tiles)\n`);
    results.push(await auditWard(ward, args.noCache));
  }

  if (args.json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  console.log("\nward\ttiles\tstations\ttop_station\ttop_pax\tflags");
  for (const r of results) {
    console.log(
      `${r.ward}\t${r.tile_count}\t${r.station_count}\t${r.top_station ?? "-"}\t${r.top_passengers ?? "-"}\t${r.flags.join("; ")}`,
    );
  }

  const low = results.filter(r => r.station_count < SUSPECT_LOW_STATIONS);
  if (low.length) {
    console.log(`\n⚠️  역 수 ${SUSPECT_LOW_STATIONS} 미만: ${low.map(r => r.ward).join(", ")}`);
    console.log("   → scripts/lib/ward-tiles.mjs WARD_BOUNDS 확장 또는 WARD_TILE_OVERRIDES 추가");
  }
}

main().catch(err => {
  console.error(err.message);
  process.exit(2);
});
