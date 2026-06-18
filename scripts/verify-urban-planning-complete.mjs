import fs from 'fs';
import path from 'path';

const BENCHMARKS = path.resolve(process.cwd(), "docs/verification/tokyo-ward-series-benchmarks.json");

function main() {
  if (!fs.existsSync(BENCHMARKS)) {
    console.error("benchmarks.json not found.");
    process.exit(1);
  }

  const benchmarks = JSON.parse(fs.readFileSync(BENCHMARKS, "utf8"));
  
  const section = 'urban_planning';
  if (!benchmarks[section] || !benchmarks[section].wards) {
    console.error(`Missing ${section} in benchmarks.`);
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
    const data = benchmarks[section].wards[ward];
    if (!data) {
      console.error(`❌ ${ward} is missing in ${section}`);
      missing = true;
    }
    assertCount++;

    if (!data.fire_prevention_zone || typeof data.fire_prevention_zone.feature_count !== "number") {
      console.error(`❌ ${ward}: fire_prevention_zone is missing or malformed`);
      missing = true;
    }
    assertCount++;

    if (!data.district_plan_zones || typeof data.district_plan_zones.feature_count !== "number") {
      console.error(`❌ ${ward}: district_plan_zones is missing or malformed`);
      missing = true;
    }
    assertCount++;

    if (!data.high_utilization_zones || typeof data.high_utilization_zones.feature_count !== "number") {
      console.error(`❌ ${ward}: high_utilization_zones is missing or malformed`);
      missing = true;
    }
    assertCount++;

    if (!data.urban_road || typeof data.urban_road.feature_count !== "number") {
      console.error(`❌ ${ward}: urban_road is missing or malformed`);
      missing = true;
    }
    assertCount++;

    if (!Array.isArray(data.zoning_top3)) {
      console.error(`❌ ${ward}: zoning_top3 is missing or not an array`);
      missing = true;
    } else if (data.zoning_top3.length === 0 && data.coverage_status !== "no_data") {
      console.error(`❌ ${ward}: zoning_top3 is empty but coverage_status is not 'no_data'`);
      missing = true;
    }
    assertCount++;
  }

  if (missing) {
    process.exit(1);
  }

  console.log(`✅ All ${assertCount} assertions passed. Complete urban_planning and zoning_top3 data found for 23 wards.`);
}

main();
