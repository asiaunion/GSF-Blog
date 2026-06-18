import fs from 'fs';
import path from 'path';

const DEFAULT_BENCHMARKS = path.resolve(process.cwd(), "docs/verification/tokyo-ward-series-benchmarks.json");

function main() {
  const args = process.argv.slice(2);
  const pathIdx = args.indexOf("--benchmarks-path");
  const benchmarksPath = pathIdx !== -1 && args[pathIdx + 1] ? args[pathIdx + 1] : DEFAULT_BENCHMARKS;

  if (!fs.existsSync(benchmarksPath)) {
    console.error(`benchmarks.json not found: ${benchmarksPath}`);
    process.exit(1);
  }

  const benchmarks = JSON.parse(fs.readFileSync(benchmarksPath, "utf8"));
  
  if (!benchmarks.disaster_risk || !benchmarks.disaster_history) {
    console.error("Missing disaster_risk or disaster_history in benchmarks.");
    process.exit(1);
  }

  const riskWards = benchmarks.disaster_risk.wards;
  const historyWards = benchmarks.disaster_history.wards;

  const quadrants = {
    "Risk_Yes_History_Yes": [],
    "Risk_Yes_History_No": [],
    "Risk_No_History_Yes": [],
    "Risk_No_History_No": []
  };

  for (const ward of Object.keys(riskWards)) {
    if (!historyWards[ward]) continue;

    const risk = riskWards[ward];
    const history = historyWards[ward];

    const hasRisk = risk.flood || risk.liquefaction || risk.storm_surge || risk.tsunami || risk.landslide;
    const hasHistory = history.has_history;

    if (hasRisk && hasHistory) {
      quadrants.Risk_Yes_History_Yes.push(ward);
    } else if (hasRisk && !hasHistory) {
      quadrants.Risk_Yes_History_No.push(ward);
    } else if (!hasRisk && hasHistory) {
      quadrants.Risk_No_History_Yes.push(ward);
    } else {
      quadrants.Risk_No_History_No.push(ward);
    }
  }

  console.log("=== Disaster Risk vs History Matrix ===");
  console.log("");
  console.log("| | 재해 이력 (XST001) O | 재해 이력 (XST001) X |");
  console.log("|---|---|---|");
  console.log(`| **재해 상정 (XKT025~029) O** | ${quadrants.Risk_Yes_History_Yes.join(", ")} | ${quadrants.Risk_Yes_History_No.join(", ")} |`);
  console.log(`| **재해 상정 (XKT025~029) X** | ${quadrants.Risk_No_History_Yes.join(", ")} | ${quadrants.Risk_No_History_No.join(", ")} |`);
  console.log("");
}

main();
