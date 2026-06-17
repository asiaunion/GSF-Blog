#!/usr/bin/env node
/**
 * Merge MLIT XIT001 price aggregates into PKM tokyo_mansion_stats_2025.json.
 *
 * Usage:
 *   node scripts/merge-mlit-price-to-pkm.mjs --ward 北区
 *   node scripts/merge-mlit-price-to-pkm.mjs --episode ep07
 *   node scripts/merge-mlit-price-to-pkm.mjs --episode ep07 --dry-run
 */
import { readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import {
  collectPrice,
  EPISODE_WARDS,
  loadEnv,
} from "./mlit-collector.mjs";

const PKM_ROOT =
  process.env.PKM_ROOT ||
  path.join(process.env.HOME || "", ".gemini/antigravity/scratch/projects/GSF-PKM");
const PKM_JSON = path.join(PKM_ROOT, "PKM/30 Resources/tokyo_mansion_stats_2025.json");

function parseArgs(argv) {
  const out = { ward: "", episode: "", year: 2025, dryRun: false, noCache: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--ward") out.ward = argv[++i] ?? "";
    else if (a === "--episode") out.episode = (argv[++i] ?? "").toLowerCase();
    else if (a === "--year") out.year = parseInt(argv[++i] ?? "2025", 10);
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--no-cache") out.noCache = true;
  }
  return out;
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function priceToPkmEntry(priceResult) {
  const districts = priceResult.districts ?? priceResult.stations ?? [];
  return {
    ward_avg: priceResult.ward_avg_sqm,
    total_count: priceResult.count,
    est_70sqm: priceResult.est_70sqm,
    stations: districts.slice(0, 15).map(d => ({
      station: d.name,
      avg: d.avg_sqm,
      count: d.count,
      min: null,
      max: null,
    })),
    source: priceResult.source,
    fetched_at: priceResult.fetched_at,
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
    console.error("Usage: merge-mlit-price-to-pkm.mjs --ward <区> | --episode ep07");
    process.exit(2);
  }

  if (!(await fileExists(PKM_JSON))) {
    console.error(`PKM JSON not found: ${PKM_JSON}`);
    process.exit(1);
  }

  const pkm = JSON.parse(await readFile(PKM_JSON, "utf8"));
  const updates = {};

  for (const ward of wards) {
    const price = await collectPrice(ward, args.year, null, args.noCache);
    if (!price.count) {
      console.error(`No price data for ${ward}`);
      continue;
    }
    updates[ward] = priceToPkmEntry(price);
    pkm[ward] = { ...pkm[ward], ...updates[ward] };
  }

  if (args.dryRun) {
    console.log(JSON.stringify({ ok: true, dryRun: true, updates }, null, 2));
    return;
  }

  await writeFile(PKM_JSON, `${JSON.stringify(pkm, null, 2)}\n`);
  console.log(JSON.stringify({ ok: true, path: PKM_JSON, wards: Object.keys(updates) }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
