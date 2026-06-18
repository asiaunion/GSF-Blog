import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TOKYO_TAMA_WAVE2_NAMES } from "./lib/tokyo-tama-cities.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BENCHMARKS_FILE = path.join(__dirname, "../docs/verification/tokyo-tama-benchmarks.json");

function main() {
  console.log("=== Tokyo Tama Benchmarks Verification ===");

  if (!fs.existsSync(BENCHMARKS_FILE)) {
    console.error(`❌ Benchmarks file not found: ${BENCHMARKS_FILE}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(BENCHMARKS_FILE, "utf-8");
  const data = JSON.parse(raw);

  const EXPECTED_WARDS = TOKYO_TAMA_WAVE2_NAMES;
  const EXPECTED_SECTIONS = [
    "disaster_risk",
    "disaster_history",
    "evacuation_sites",
    "urban_planning",
    "station_passengers",
    "price_points",
    "land_price_official",
    "appraisal_comments"
  ];

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
    console.error(`\n❌ Validation failed with ${errors} errors.`);
    process.exit(1);
  }

  console.log(`✅ All ${EXPECTED_WARDS.length} Tama priority cities and required sections are present and structurally valid.`);
}

main();
