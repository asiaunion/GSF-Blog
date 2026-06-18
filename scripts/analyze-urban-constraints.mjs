#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { EPISODE_WARDS, WARD_CODE } from "./mlit-collector.mjs";

const root = process.cwd();
const benchmarksPath = path.join(root, "docs/verification/tokyo-ward-series-benchmarks.json");
const benchmarks = JSON.parse(fs.readFileSync(benchmarksPath, "utf8"));

const args = process.argv.slice(2);
let targetWards = [];

const wardArg = args.findIndex(a => a === '--ward');
if (wardArg !== -1 && args[wardArg + 1]) {
  targetWards.push(args[wardArg + 1]);
}

const epArg = args.findIndex(a => a === '--episode');
if (epArg !== -1 && args[epArg + 1]) {
  const ep = args[epArg + 1];
  const item = EPISODE_WARDS[ep];
  if (item) {
    targetWards.push(...item);
  } else {
    console.error(`Unknown episode: ${ep}`);
    process.exit(1);
  }
}

if (targetWards.length === 0) {
  console.error("Usage: node analyze-urban-constraints.mjs [--ward <WardName>] [--episode <ep>]");
  process.exit(1);
}

const rows = [];

for (const wardName of targetWards) {
  if (!WARD_CODE[wardName]) {
    console.error(`Unknown ward: ${wardName}`);
    continue;
  }

  const urban = benchmarks.urban_planning?.wards[wardName];
  if (!urban) {
    rows.push({ ward: wardName, error: "no_urban_planning" });
    continue;
  }

  const fp = urban.fire_prevention_zone || {};
  const dp = urban.district_plan_zones || {};
  const top3 = urban.zoning_top3 || [];
  
  const zoning_dominant = top3.length > 0 ? `${top3[0].type}(${top3[0].pct}%)` : (urban.coverage_status === "no_data" ? "no_data" : "N/A");
  
  rows.push({
    ward: wardName,
    zoning_dominant,
    fire_pct: fp.feature_count === 0 ? "no_data" : `${fp.coverage_pct}%`,
    fire_dominant: fp.feature_count === 0 ? "no_data" : (fp.dominant_type || "N/A"),
    district_plans: dp.feature_count === 0 ? "no_data" : `${dp.feature_count}건`
  });
}

console.log(JSON.stringify(rows, null, 2));
