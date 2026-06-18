#!/usr/bin/env node
/**
 * tokyo_tama 26市 bbox 일괄 갱신
 * Usage: node scripts/update-tokyo-tama-bboxes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as turf from "@turf/turf";
import { listRegion } from "./lib/municipality-registry.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = path.resolve(__dirname, "../docs/verification/municipalities.json");
const DATA_DIR = path.resolve(__dirname, "../docs/verification/data");

const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));
const codes = listRegion("tokyo_tama");

for (const code of codes) {
  const mun = registry.municipalities[code];
  if (!mun) {
    console.error(`Missing registry entry: ${code}`);
    process.exit(1);
  }

  const geojsonPath = path.resolve(DATA_DIR, mun.boundary_file);
  const geojson = JSON.parse(fs.readFileSync(geojsonPath, "utf-8"));
  const prop = mun.boundary_property || "registry_code";
  const features = geojson.features.filter(
    (f) =>
      f.properties[prop] === code ||
      f.properties.registry_code === code ||
      f.properties.name_ja === mun.name_ja
  );

  if (!features.length) {
    console.error(`No features for ${mun.name_ja} (${code})`);
    process.exit(1);
  }

  const bbox = turf.bbox(turf.featureCollection(features));
  mun.bbox = {
    minLat: parseFloat(bbox[1].toFixed(5)),
    maxLat: parseFloat(bbox[3].toFixed(5)),
    minLon: parseFloat(bbox[0].toFixed(5)),
    maxLon: parseFloat(bbox[2].toFixed(5)),
  };
  console.log(`Updated ${mun.name_ja}:`, mun.bbox);
}

fs.writeFileSync(REGISTRY_PATH, `${JSON.stringify(registry, null, 2)}\n`);
console.log(`✅ Saved ${codes.length} tokyo_tama bboxes`);
