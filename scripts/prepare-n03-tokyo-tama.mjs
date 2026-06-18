#!/usr/bin/env node
/**
 * N03 東京都 → 多摩26市 boundary GeoJSON
 * Usage: node scripts/prepare-n03-tokyo-tama.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TOKYO_TAMA_CITIES, TOKYO_TAMA_NAMES } from "./lib/tokyo-tama-cities.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKYO_IN = path.resolve(__dirname, "../docs/verification/data/N03-2024/N03-20240101_13.geojson");
const OUT = path.resolve(__dirname, "../docs/verification/data/tokyo-tama-boundary.geojson");

const nameToCode = new Map(TOKYO_TAMA_CITIES.map((c) => [c.name_ja, c.code]));

console.log("Loading Tokyo N03...");
const tokyo = JSON.parse(fs.readFileSync(TOKYO_IN, "utf-8"));

const outFeatures = [];
const seen = new Set();

for (const f of tokyo.features) {
  const name = f.properties?.N03_004;
  if (!name || !TOKYO_TAMA_NAMES.has(name)) continue;

  const registryCode = nameToCode.get(name);
  const enriched = {
    ...f,
    properties: {
      ...f.properties,
      registry_code: registryCode,
      name_ja: name,
    },
  };
  outFeatures.push(enriched);
  seen.add(name);
}

const missing = TOKYO_TAMA_CITIES.filter((c) => !seen.has(c.name_ja));
if (missing.length) {
  console.error("❌ Missing boundaries for:", missing.map((c) => c.name_ja).join(", "));
  process.exit(1);
}

fs.writeFileSync(
  OUT,
  JSON.stringify({ type: "FeatureCollection", features: outFeatures }, null, 0)
);
console.log(`✅ Saved ${outFeatures.length} features → tokyo-tama-boundary.geojson`);
console.log(`   Cities covered: ${[...seen].sort().join(", ")}`);
