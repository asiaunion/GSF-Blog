#!/usr/bin/env node
/**
 * ep07 WARD_TILES·POP·STATION 검증 (Claude fix-ward-tiles-ep07.md Task 5)
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const BENCHMARKS = path.join(root, "docs/verification/tokyo-ward-series-benchmarks.json");
const MANIFEST = path.join(
  root,
  "docs/verification/manifests/ep07-tokyo-kita-arakawa-adachi.manifest.json",
);

function parseChangePct(value) {
  if (value == null) return null;
  if (typeof value === "number") return value;
  const n = parseFloat(String(value).replace("%", ""));
  return Number.isNaN(n) ? null : n;
}

async function main() {
  const b = JSON.parse(await readFile(BENCHMARKS, "utf8"));
  const m = JSON.parse(await readFile(MANIFEST, "utf8"));
  const wards = ["北区", "荒川区", "足立区"];
  let pass = true;

  for (const w of wards) {
    const sc = b.station_passengers?.wards?.[w]?.station_count;
    if (sc < 5) {
      console.error("FAIL station_count", w, sc);
      pass = false;
    }
  }

  const kitaTop = b.station_passengers?.wards?.["北区"]?.top_station;
  if (!["赤羽", "王子"].includes(kitaTop)) {
    console.error("FAIL 北区 top_station:", kitaTop);
    pass = false;
  }

  const araTop = b.station_passengers?.wards?.["荒川区"]?.top_station;
  if (araTop === "北千住") {
    console.error("FAIL 荒川区 top_station still 北千住");
    pass = false;
  }

  for (const w of wards) {
    const benchPop = parseChangePct(b.population_forecast?.wards?.[w]?.change_pct);
    const claim = m.claims.find(c => c.id.startsWith("POP-") && c.label.startsWith(w));
    const mVal = parseChangePct(claim?.value);
    if (benchPop == null || mVal == null || Math.abs(mVal - benchPop) > 0.05) {
      console.error("FAIL POP mismatch", w, mVal, "!=", benchPop);
      pass = false;
    }
  }

  for (const w of wards) {
    const benchSt = b.station_passengers?.wards?.[w]?.top_passengers;
    const claim = m.claims.find(c => c.id.startsWith("STATION-") && c.label.startsWith(w));
    if (claim?.value !== benchSt) {
      console.error("FAIL STATION mismatch", w, claim?.value, "!=", benchSt);
      pass = false;
    }
  }

  if (pass) {
    console.log("ALL CHECKS PASSED");
    for (const w of wards) {
      const s = b.station_passengers?.wards?.[w];
      const p = b.population_forecast?.wards?.[w];
      console.log(JSON.stringify({
        ward: w,
        top_station: s?.top_station,
        top_passengers: s?.top_passengers,
        station_count: s?.station_count,
        pop_2020: p?.pop_2020,
        pop_2040: p?.pop_2040,
        change_pct: p?.change_pct,
        mesh_count: p?.mesh_count,
        mesh_coverage_warning: p?.mesh_coverage_warning,
      }));
    }
    return;
  }
  process.exit(1);
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
