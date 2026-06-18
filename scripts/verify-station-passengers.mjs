import fs from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';

const BENCHMARKS_PATH = "docs/verification/tokyo-ward-series-benchmarks.json";
const EP07_MANIFEST = "docs/verification/manifests/ep07-tokyo-kita-arakawa-adachi.manifest.json";

async function main() {
  console.log("▶ Running station passengers audit (cached)...");
  const auditJsonStr = execSync('node scripts/audit-station-passengers.mjs --json', { encoding: 'utf-8' });
  let auditData;
  try {
    auditData = JSON.parse(auditJsonStr);
  } catch (e) {
    console.error("Failed to parse audit JSON output");
    process.exit(1);
  }

  // GLOBAL checks
  let totalN02 = 0;
  let totalMatched = 0;
  let totalZero = 0;

  for (const w of auditData) {
    totalN02 += w.n02_count;
    totalMatched += (w.matched_exact + w.matched_alias);
    totalZero += w.zero_pax;
    
    // PER-WARD FLOOR
    if (w.match_rate_pct < 85) {
      console.error(`❌ [FAIL] Ward ${w.ward} match_rate is ${w.match_rate_pct}% (Below 85%)`);
      process.exit(1);
    }
  }

  const globalMatchRate = totalN02 > 0 ? (totalMatched / totalN02) * 100 : 0;
  console.log(`Global Match Rate: ${globalMatchRate.toFixed(1)}%`);
  console.log(`Global Zero Pax: ${totalZero}`);

  if (globalMatchRate < 92) {
    console.error(`❌ [FAIL] Global match_rate is ${globalMatchRate.toFixed(1)}% (Target >= 92%)`);
    process.exit(1);
  }

  if (totalZero > 40) {
    console.error(`❌ [FAIL] Global zero_pax is ${totalZero} (Target <= 40)`);
    process.exit(1);
  }

  // GOLDEN ep07 checks
  const kita = auditData.find(w => w.ward === "北区");
  const arakawa = auditData.find(w => w.ward === "荒川区");
  const adachi = auditData.find(w => w.ward === "足立区");

  if (!["赤羽", "王子"].includes(kita.top_station)) {
    console.error(`❌ [FAIL] 北区 top station is ${kita.top_station}, expected 赤羽 or 王子`);
    process.exit(1);
  }
  if (arakawa.top_station === "北千住") {
    console.error(`❌ [FAIL] 荒川 top station cannot be 北千住`);
    process.exit(1);
  }
  if (adachi.top_station !== "北千住") {
    console.error(`❌ [FAIL] 足立 top station is ${adachi.top_station}, expected 北千住`);
    process.exit(1);
  }

  // MANIFEST checks
  const benchmarks = JSON.parse(await fs.readFile(BENCHMARKS_PATH, "utf8"));
  let manifest;
  try {
    manifest = JSON.parse(await fs.readFile(EP07_MANIFEST, "utf8"));
  } catch (e) {
    console.log("⚠️ Could not load ep07 manifest. Skipping manifest checks.");
    manifest = null;
  }

  if (manifest && manifest.claims && manifest.claims.STATION) {
    const claims = manifest.claims.STATION;
    const bmStation = benchmarks.station_passengers.wards;
    
    // Compare
    for (const [ward, expected] of Object.entries(claims)) {
      if (ward === "source") continue;
      const bmVals = bmStation[ward];
      if (!bmVals) {
        console.error(`❌ [FAIL] Missing benchmark data for ${ward}`);
        process.exit(1);
      }
      if (bmVals.top_station !== expected.top_station) {
        console.error(`❌ [FAIL] Manifest mismatch for ${ward} top_station: ${bmVals.top_station} != ${expected.top_station}`);
        process.exit(1);
      }
      if (bmVals.top_passengers !== expected.top_passengers) {
        console.error(`❌ [FAIL] Manifest mismatch for ${ward} top_passengers: ${bmVals.top_passengers} != ${expected.top_passengers}`);
        process.exit(1);
      }
      if (bmVals.station_count !== expected.station_count) {
        console.error(`❌ [FAIL] Manifest mismatch for ${ward} station_count: ${bmVals.station_count} != ${expected.station_count}`);
        process.exit(1);
      }
    }
  }

  console.log("✅ ALL CHECKS PASSED");
}

main().catch(e => {
  console.error("Unhandled error", e);
  process.exit(1);
});
