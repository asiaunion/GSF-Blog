#!/usr/bin/env node
import fs from "fs";
import path from "path";
import * as turf from "@turf/turf";
import { EPISODE_WARDS, WARD_CODE } from "./mlit-collector.mjs";
import { policyForCount } from "./lib/mlit-sample-policy.mjs";

const root = process.cwd();
const DEFAULT_BENCHMARKS = path.join(root, "docs/verification/tokyo-ward-series-benchmarks.json");

const args = process.argv.slice(2);
let targetWards = [];

const pathArg = args.findIndex(a => a === '--benchmarks-path');
const benchmarksPath = pathArg !== -1 && args[pathArg + 1] ? path.resolve(args[pathArg + 1]) : DEFAULT_BENCHMARKS;

if (!fs.existsSync(benchmarksPath)) {
  console.error(`benchmarks.json not found: ${benchmarksPath}`);
  process.exit(1);
}
const benchmarks = JSON.parse(fs.readFileSync(benchmarksPath, "utf8"));

import { getMunicipality } from './lib/municipality-registry.mjs';

const wardArg = args.findIndex(a => a === '--ward' || a === '--municipality');
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
  console.error("Usage: node analyze-redevelopment-potential.mjs [--ward <WardName>] [--episode <ep>]");
  process.exit(1);
}

function parsePriceManYen(raw) {
  if (!raw) return 0;
  if (typeof raw === "number") return raw;
  const s = String(raw).replace(/,/g, "");
  const m = s.match(/(\d+)万円/);
  if (m) return parseInt(m[1], 10);
  const m2 = s.match(/(\d+)/);
  return m2 ? parseInt(m2[1], 10) : 0;
}

function parseAreaSqm(raw) {
  if (!raw) return 0;
  if (typeof raw === "number") return raw;
  const s = String(raw).replace(/,/g, "").replace("㎡", "");
  return parseInt(s, 10) || 0;
}

for (const wardName of targetWards) {
  if (!WARD_CODE[wardName]) {
    console.error(`Unknown ward: ${wardName}`);
    continue;
  }

  const pricePointsInfo = benchmarks.price_points?.wards[wardName];
  if (!pricePointsInfo) {
    console.log(JSON.stringify({ ward: wardName, status: "skipped", reason: "no_price_points" }));
    continue;
  }
  
  if (pricePointsInfo.tile_coverage_warning === true) {
    console.log(JSON.stringify({ ward: wardName, status: "skipped", reason: "tile_coverage_warning" }));
    continue;
  }

  const geojsonPath = path.resolve(pricePointsInfo.geojson_path);
  if (!fs.existsSync(geojsonPath)) {
    console.log(JSON.stringify({ ward: wardName, status: "error", reason: `GeoJSON not found: ${geojsonPath}` }));
    continue;
  }

  const geojson = JSON.parse(fs.readFileSync(geojsonPath, "utf8"));
  const features = geojson.features;
  const n = features.length;

  const validPoints = [];
  for (const f of features) {
    const priceManYen = parsePriceManYen(f.properties.u_transaction_price_total_ja);
    const areaSqm = parseAreaSqm(f.properties.u_area_ja);
    if (priceManYen > 0 && areaSqm > 0) {
      validPoints.push({
        pt: turf.point(f.geometry.coordinates),
        priceSqm: priceManYen / areaSqm
      });
    }
  }
  
  if (validPoints.length === 0) {
    console.log(JSON.stringify({ ward: wardName, status: "skipped", reason: "no_valid_price_points" }));
    continue;
  }

  // 25th percentile
  validPoints.sort((a, b) => a.priceSqm - b.priceSqm);
  const p25Index = Math.floor(validPoints.length * 0.25);
  const p25Threshold = validPoints[p25Index].priceSqm;

  // Load high utilization zones
  const huPolygons = [];
  const cacheDir = path.resolve(".cache/mlit");
  if (fs.existsSync(cacheDir)) {
    const files = fs.readdirSync(cacheDir);
    const huFiles = files.filter(f => f.startsWith(`urban-high_utilization_zones-${wardName}-`) && f.endsWith(".json"));
    
    const uniqueMap = new Map();
    for (const f of huFiles) {
      const p = path.join(cacheDir, f);
      const raw = JSON.parse(fs.readFileSync(p, "utf8"));
      if (raw && raw.features) {
        for (const poly of raw.features) {
          // high_utilization_zones uses city_name
          if (poly.properties.city_name === wardName) {
            if (poly.properties._id) {
              if (!uniqueMap.has(poly.properties._id)) {
                uniqueMap.set(poly.properties._id, poly);
              }
            } else {
              huPolygons.push(poly);
            }
          }
        }
      }
    }
    huPolygons.push(...uniqueMap.values());
  }

  let n_low_percentile = 0;
  let n_in_high_util = 0;
  let n_low_and_in_zone = 0;

  for (const vp of validPoints) {
    const isLow = vp.priceSqm <= p25Threshold;
    if (isLow) n_low_percentile++;
    
    let isInside = false;
    for (const poly of huPolygons) {
      try {
        if (turf.booleanPointInPolygon(vp.pt, poly)) {
          isInside = true;
          break;
        }
      } catch(e) {}
    }
    
    if (isInside) n_in_high_util++;
    if (isLow && isInside) n_low_and_in_zone++;
  }

  const policy = policyForCount(n_low_and_in_zone);

  console.log(JSON.stringify({
    ward: wardName,
    n_price_points: validPoints.length,
    p25_threshold_man_yen: parseFloat(p25Threshold.toFixed(1)),
    n_low_percentile,
    n_in_high_util,
    n_low_and_in_zone,
    valid_for_body: !!policy.body_numeric
  }));
}
