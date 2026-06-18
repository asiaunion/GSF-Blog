import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { WARD_CODE } from './mlit-collector.mjs';

const benchmarksPath = path.resolve('docs/verification/tokyo-ward-series-benchmarks.json');
const benchmarks = JSON.parse(fs.readFileSync(benchmarksPath, 'utf8'));

const args = process.argv.slice(2);
const wardArg = args.findIndex(a => a === '--ward');
if (wardArg === -1 || !args[wardArg + 1]) {
  console.error("Usage: node render-ward-price-map.mjs --ward <WardName>");
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

const outCsv = path.resolve(`public/data/heatmap-${wardName}.csv`);
const outWebp = path.resolve(`public/assets/images/blog/diagrams/heatmap-${wardName}.webp`);

fs.mkdirSync(path.dirname(outCsv), { recursive: true });
fs.mkdirSync(path.dirname(outWebp), { recursive: true });

let csvContent = "lon,lat,price_sqm\n";
let validRows = 0;

for (const feature of features) {
  const [lon, lat] = feature.geometry.coordinates;
  const priceManYen = parsePriceManYen(feature.properties.u_transaction_price_total_ja);
  const areaSqm = parseAreaSqm(feature.properties.u_area_ja);
  
  if (priceManYen === 0 || areaSqm === 0) continue;
  
  const priceSqm = priceManYen / areaSqm; // 万円/㎡
  
  // Filter outliers to keep heatmap scale reasonable
  // E.g. ignore > 400 Man Yen / sqm (~ 1.3억 KRW / pyeong) unless many
  if (priceSqm > 0 && priceSqm < 1000) {
    csvContent += `${lon},${lat},${priceSqm.toFixed(2)}\n`;
    validRows++;
  }
}

fs.writeFileSync(outCsv, csvContent, 'utf8');
console.log(`Prepared ${validRows} rows in ${outCsv}`);

// Execute Python script
const pythonScript = path.resolve('scripts/charts/generate-heatmap.py');
try {
  console.log(`Executing: python3 ${pythonScript} ${outCsv} ${outWebp} ${wardName}`);
  execSync(`python3 "${pythonScript}" "${outCsv}" "${outWebp}" "${wardName}"`, { stdio: 'inherit' });
  console.log(`Success! Heatmap saved to ${outWebp}`);
} catch (e) {
  console.error("Failed to execute python script.");
  process.exit(1);
}
