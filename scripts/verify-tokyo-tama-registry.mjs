#!/usr/bin/env node
/**
 * RE-6 Wave 1 — tokyo_tama registry·boundary 검증 (benchmarks 미포함)
 */
import fs from "node:fs";
import path from "node:path";
import { listRegion, loadRegistry } from "./lib/municipality-registry.mjs";
import { getMunicipalityPolygons } from "./lib/municipality-polygon.mjs";
import { TOKYO_TAMA_CITIES } from "./lib/tokyo-tama-cities.mjs";

const DATA_DIR = path.join(process.cwd(), "docs/verification/data");
let failed = 0;

function fail(msg) {
  console.error(`❌ ${msg}`);
  failed += 1;
}

const codes = listRegion("tokyo_tama");
if (codes.length !== 26) fail(`tokyo_tama codes: expected 26, got ${codes.length}`);

const reg = loadRegistry();
const expected = TOKYO_TAMA_CITIES.map((c) => c.code).sort();
const actual = [...codes].sort();
if (JSON.stringify(expected) !== JSON.stringify(actual)) {
  fail("tokyo_tama codes mismatch vs tokyo-tama-cities.mjs SSOT");
}

const boundaryPath = path.join(DATA_DIR, "tokyo-tama-boundary.geojson");
if (!fs.existsSync(boundaryPath)) fail("tokyo-tama-boundary.geojson missing");

for (const code of codes) {
  const mun = reg.municipalities[code];
  if (!mun) {
    fail(`missing registry entry: ${code}`);
    continue;
  }
  if (mun.boundary_file !== "tokyo-tama-boundary.geojson") {
    fail(`${mun.name_ja}: boundary_file should be tokyo-tama-boundary.geojson`);
  }
  if (!mun.bbox?.minLat || !mun.bbox?.maxLon) {
    fail(`${mun.name_ja}: bbox incomplete`);
  }
  try {
    const polys = getMunicipalityPolygons(mun.name_ja);
    if (!polys.length) fail(`${mun.name_ja}: no polygon features`);
  } catch (e) {
    fail(`${mun.name_ja}: polygon load — ${e.message}`);
  }
}

const komae = reg.municipalities["13219"];
if (!komae || komae.region_tier !== "pilot") {
  fail("狛江市 must keep region_tier: pilot");
}
if (!reg.regions.pilot?.codes?.includes("13219")) {
  fail("狛江市 must remain in regions.pilot");
}

if (failed) {
  console.error(`\n${failed} assertion(s) failed.`);
  process.exit(1);
}
console.log("✅ tokyo_tama registry Wave 1: 26 cities, boundary, bbox, polygon OK (狛江 pilot 유지)");
