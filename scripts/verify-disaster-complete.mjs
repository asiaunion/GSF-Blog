import fs from 'fs';
import path from 'path';

const BENCHMARKS = path.resolve(process.cwd(), "docs/verification/tokyo-ward-series-benchmarks.json");

function main() {
  if (!fs.existsSync(BENCHMARKS)) {
    console.error("benchmarks.json not found.");
    process.exit(1);
  }

  const benchmarks = JSON.parse(fs.readFileSync(BENCHMARKS, "utf8"));
  
  const requiredSections = ['location_optimization', 'disaster_risk', 'disaster_history', 'evacuation_sites'];
  for (const section of requiredSections) {
    if (!benchmarks[section] || !benchmarks[section].wards) {
      console.error(`Missing ${section} in benchmarks.`);
      process.exit(1);
    }
  }

  if (typeof benchmarks.disaster_history.coverage_warning !== "string" || benchmarks.disaster_history.coverage_warning.length === 0) {
    console.error(`❌ benchmarks.disaster_history.coverage_warning is missing or not a non-empty string`);
    process.exit(1);
  }

  const wards23 = [
    "千代田区", "中央区", "港区", "新宿区", "文京区",
    "台東区", "墨田区", "江東区", "品川区", "目黒区",
    "大田区", "世田谷区", "渋谷区", "中野区", "杉並区",
    "豊島区", "北区", "荒川区", "板橋区", "練馬区",
    "足立区", "葛飾区", "江戸川区"
  ];

  let missing = false;
  let assertCount = 0;

  for (const ward of wards23) {
    for (const section of requiredSections) {
      if (!benchmarks[section].wards[ward]) {
        console.error(`❌ ${ward} is missing in ${section}`);
        missing = true;
      }
      assertCount++;
    }

    const locOpt = benchmarks.location_optimization.wards[ward];
    if (locOpt.coverage_status !== "not_applicable_tokyo23") {
      console.error(`❌ ${ward}: location_optimization coverage_status must be not_applicable_tokyo23`);
      missing = true;
    }
    assertCount++;

    const evac = benchmarks.evacuation_sites.wards[ward];
    if (evac.site_count === 0) {
      if (evac.coverage_status !== "no_data" || !evac.coverage_note) {
        console.error(`❌ ${ward}: evacuation_sites coverage_status must be 'no_data' and coverage_note must be present for 0 site_count`);
        missing = true;
      }
    } else {
      if (evac.coverage_status !== "surveyed") {
        console.error(`❌ ${ward}: evacuation_sites coverage_status must be 'surveyed' for >0 site_count`);
        missing = true;
      }
    }
    assertCount++;
  }

  if (missing) {
    process.exit(1);
  }

  console.log(`✅ All ${assertCount} assertions passed. Complete disaster_risk, disaster_history, evacuation_sites, and location_optimization data found for 23 wards.`);
}

main();
