#!/usr/bin/env node
/**
 * municipalities.json — tokyo_tama 26市 시드 + bbox
 * Prerequisites: node scripts/prepare-n03-tokyo-tama.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as turf from "@turf/turf";
import { TOKYO_TAMA_CITIES } from "./lib/tokyo-tama-cities.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = path.resolve(__dirname, "../docs/verification/municipalities.json");
const BOUNDARY_PATH = path.resolve(__dirname, "../docs/verification/data/tokyo-tama-boundary.geojson");

const ENABLED = [
  "disaster",
  "urban_planning",
  "price",
  "price_points",
  "appraisal",
  "station",
  "population",
  "landprice",
  "zoning",
];

const boundary = JSON.parse(fs.readFileSync(BOUNDARY_PATH, "utf-8"));
const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));

function featuresForCity(name_ja, code) {
  return boundary.features.filter(
    (f) =>
      f.properties.registry_code === code ||
      f.properties.name_ja === name_ja ||
      f.properties.N03_004 === name_ja
  );
}

function bboxFromFeatures(features) {
  const fc = turf.featureCollection(features);
  const bbox = turf.bbox(fc);
  return {
    minLat: parseFloat(bbox[1].toFixed(5)),
    maxLat: parseFloat(bbox[3].toFixed(5)),
    minLon: parseFloat(bbox[0].toFixed(5)),
    maxLon: parseFloat(bbox[2].toFixed(5)),
  };
}

for (const city of TOKYO_TAMA_CITIES) {
  const features = featuresForCity(city.name_ja, city.code);
  if (!features.length) {
    console.error(`❌ No boundary features for ${city.name_ja}`);
    process.exit(1);
  }

  const existing = registry.municipalities[city.code];
  const regionTier =
    city.code === "13219" && existing?.region_tier === "pilot"
      ? "pilot"
      : "tokyo_tama";

  registry.municipalities[city.code] = {
    name_ja: city.name_ja,
    name_en_slug: city.name_en_slug,
    prefecture_code: "13",
    prefecture_ja: "東京都",
    admin_level: "shi",
    parent_city: null,
    region_tier: regionTier,
    bbox: bboxFromFeatures(features),
    boundary_file: "tokyo-tama-boundary.geojson",
    boundary_property: "registry_code",
    tile_overrides: existing?.tile_overrides ?? [],
    enabled_collectors: ENABLED,
  };
}

registry.regions.tokyo_tama = {
  label: "東京都多摩26市",
  codes: TOKYO_TAMA_CITIES.map((c) => c.code),
};

registry.schema_version = "1.1";

fs.writeFileSync(REGISTRY_PATH, `${JSON.stringify(registry, null, 2)}\n`);
console.log(`✅ Updated municipalities.json — tokyo_tama ${TOKYO_TAMA_CITIES.length} cities`);
