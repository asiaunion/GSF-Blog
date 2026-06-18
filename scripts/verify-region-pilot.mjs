import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PILOT_FILE = path.join(__dirname, "../docs/verification/greater-tokyo-pilot-benchmarks.json");

function main() {
  console.log("=== Region Pilot Benchmarks Verification ===");

  if (!fs.existsSync(PILOT_FILE)) {
    console.error(`❌ Pilot benchmarks file not found: ${PILOT_FILE}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(PILOT_FILE, "utf-8");
  const data = JSON.parse(raw);

  const EXPECTED_WARDS = ["横浜市西区", "川崎市中原区", "鎌倉市", "狛江市"];
  const EXPECTED_SECTIONS = ["disaster_risk", "disaster_history", "evacuation_sites", "urban_planning"];

  let errors = 0;

  for (const section of EXPECTED_SECTIONS) {
    if (!data[section] || !data[section].wards) {
      console.error(`❌ Missing section or wards block: ${section}`);
      errors++;
      continue;
    }

    for (const ward of EXPECTED_WARDS) {
      const wardData = data[section].wards[ward];
      if (!wardData) {
        console.error(`❌ Ward '${ward}' is missing in section '${section}'`);
        errors++;
        continue;
      }

      // Check coverage_status if applicable
      if (wardData.coverage_status && !["ok", "partial", "no_data", "tile_coverage_warning", "surveyed"].includes(wardData.coverage_status)) {
         console.warn(`⚠️  Ward '${ward}' in section '${section}' has unknown coverage_status: ${wardData.coverage_status}`);
      }
    }
  }

  if (errors > 0) {
    console.error(`\n❌ Pilot validation failed with ${errors} errors.`);
    process.exit(1);
  }

  console.log("✅ All 4 pilot wards and required sections are present and structurally valid.");
}

main();
