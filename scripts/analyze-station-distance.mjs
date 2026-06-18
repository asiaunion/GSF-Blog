import fs from 'fs';
import path from 'path';
import { calculateWalkingMinutes } from './lib/station-geo.mjs';
import { WARD_CODE } from './mlit-collector.mjs';
import { policyForCount } from './lib/mlit-sample-policy.mjs';

const benchmarksPath = path.resolve('docs/verification/tokyo-ward-series-benchmarks.json');
const benchmarks = JSON.parse(fs.readFileSync(benchmarksPath, 'utf8'));

const args = process.argv.slice(2);
const wardArg = args.findIndex(a => a === '--ward');
if (wardArg === -1 || !args[wardArg + 1]) {
  console.error("Usage: node analyze-station-distance.mjs --ward <WardName>");
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

const stations = (await import('./lib/station-master.mjs')).getStationsByWard(WARD_CODE[wardName]);
if (stations.length === 0) {
  console.error(`No stations found for ward ${wardName}`);
  process.exit(1);
}

const pointsWithDistance = [];

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

for (const feature of features) {
  const [lon, lat] = feature.geometry.coordinates;
  const priceManYen = parsePriceManYen(feature.properties.u_transaction_price_total_ja);
  const areaSqm = parseAreaSqm(feature.properties.u_area_ja);
  
  if (priceManYen === 0 || areaSqm === 0) continue;
  
  const priceSqm = priceManYen / areaSqm; // 万円/㎡
  
  
  // Find nearest station
  let minDistance = Infinity;
  for (const st of stations) {
    const dist = calculateWalkingMinutes(lat, lon, st.lat, st.lon);
    if (dist < minDistance) {
      minDistance = dist;
    }
  }
  
  pointsWithDistance.push({ price_sqm: priceSqm, walking_minutes: minDistance });
}

// Binning
const bins = {
  "0-5": [],
  "5-10": [],
  "10-15": [],
  "15+": []
};

for (const pt of pointsWithDistance) {
  if (pt.walking_minutes <= 5) bins["0-5"].push(pt.price_sqm);
  else if (pt.walking_minutes <= 10) bins["5-10"].push(pt.price_sqm);
  else if (pt.walking_minutes <= 15) bins["10-15"].push(pt.price_sqm);
  else bins["15+"].push(pt.price_sqm);
}

const median = arr => {
  if (arr.length === 0) return null;
  const sorted = [...arr].sort((a,b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const binMedians = {
  "0-5": median(bins["0-5"]),
  "5-10": median(bins["5-10"]),
  "10-15": median(bins["10-15"]),
  "15+": median(bins["15+"])
};

// Simple Linear Regression
let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
const validN = pointsWithDistance.length;
for (const pt of pointsWithDistance) {
  sumX += pt.walking_minutes;
  sumY += pt.price_sqm;
  sumXY += pt.walking_minutes * pt.price_sqm;
  sumXX += pt.walking_minutes * pt.walking_minutes;
}

const slope = (validN * sumXY - sumX * sumY) / (validN * sumXX - sumX * sumX);
const slope_man_yen_per_min = slope;

const result = {
  status: "success",
  n: validN,
  slope_man_yen_per_min: slope_man_yen_per_min,
  bin_medians: binMedians,
  tile_coverage_warning: pricePointsInfo.tile_coverage_warning || false,
  valid_for_body: !pricePointsInfo.tile_coverage_warning && policy.body_numeric
};

console.log(JSON.stringify(result, null, 2));
