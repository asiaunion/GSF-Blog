import fs from 'fs';
import path from 'path';
import * as turf from '@turf/turf';
import { getWardTiles } from './lib/ward-tiles.mjs';
import { WARD_CODE } from './mlit-collector.mjs';
import { policyForCount } from './lib/mlit-sample-policy.mjs';

const benchmarksPath = path.resolve('docs/verification/tokyo-ward-series-benchmarks.json');
const benchmarks = JSON.parse(fs.readFileSync(benchmarksPath, 'utf8'));

const args = process.argv.slice(2);
const wardArg = args.findIndex(a => a === '--ward');
if (wardArg === -1 || !args[wardArg + 1]) {
  console.error("Usage: node analyze-disaster-price.mjs --ward <WardName>");
  process.exit(1);
}
const wardName = args[wardArg + 1];

if (!WARD_CODE[wardName]) {
  console.error(`Unknown ward: ${wardName}`);
  process.exit(1);
}

const pricePointsInfo = benchmarks.price_points?.wards[wardName];
if (!pricePointsInfo) {
  console.error(`No price_points data found in benchmarks for ${wardName}`);
  process.exit(1);
}

const geojsonPath = path.resolve(pricePointsInfo.geojson_path);
if (!fs.existsSync(geojsonPath)) {
  console.error(`GeoJSON file not found: ${geojsonPath}`);
  process.exit(1);
}

const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));
const features = geojson.features;
const n = features.length;

const policy = policyForCount(n);
if (!policy.body_numeric) {
  console.log(JSON.stringify({ status: "insufficient_n", n }));
  process.exit(0);
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

// Load flood polygons
const tiles = getWardTiles(wardName);
const floodPolygons = [];

for (const { z, x, y } of tiles) {
  const cacheKey = `disaster-flood-${wardName}-${z}_${x}_${y}`;
  const p = path.resolve(`.cache/mlit/${cacheKey}.json`);
  if (fs.existsSync(p)) {
    const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (raw && raw.features) {
      floodPolygons.push(...raw.features);
    }
  }
}

const insidePrices = [];
const outsidePrices = [];

for (const feature of features) {
  const [lon, lat] = feature.geometry.coordinates;
  const priceManYen = parsePriceManYen(feature.properties.u_transaction_price_total_ja);
  const areaSqm = parseAreaSqm(feature.properties.u_area_ja);
  
  if (priceManYen === 0 || areaSqm === 0) continue;
  
  const priceSqm = priceManYen / areaSqm; // 万円/㎡
  const pt = turf.point([lon, lat]);
  
  let isInside = false;
  // BBox optimization: check if point is inside any polygon bbox first
  for (const poly of floodPolygons) {
    if (turf.booleanPointInPolygon(pt, poly)) {
      isInside = true;
      break;
    }
  }
  
  if (isInside) {
    insidePrices.push(priceSqm);
  } else {
    outsidePrices.push(priceSqm);
  }
}

const median = arr => {
  if (arr.length === 0) return null;
  const sorted = [...arr].sort((a,b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const result = {
  status: "success",
  ward: wardName,
  n_total: n,
  n_inside: insidePrices.length,
  n_outside: outsidePrices.length,
  median_inside: median(insidePrices),
  median_outside: median(outsidePrices),
  tile_coverage_warning: pricePointsInfo.tile_coverage_warning || false,
  valid_for_body: !pricePointsInfo.tile_coverage_warning && policy.body_numeric
};

console.log(JSON.stringify(result, null, 2));
