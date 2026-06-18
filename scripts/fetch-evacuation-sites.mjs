import { collectEvacuationSites, WARD_CODE, loadEnv } from "./mlit-collector.mjs";
import { listRegion, getMunicipality } from "./lib/municipality-registry.mjs";
import { calculateEvacuationMetrics } from "./lib/evacuation-metrics.mjs";

async function main() {
  await loadEnv();
  
  const args = process.argv.slice(2);
  const isAll = args.includes("--all-wards");
  const wardIndex = args.indexOf("--ward");
  const municipalityIndex = args.indexOf("--municipality");
  const regionIndex = args.indexOf("--region");
  
  let targetWards = [];
  if (regionIndex !== -1 && args[regionIndex + 1]) {
    targetWards = listRegion(args[regionIndex + 1]).map(code => getMunicipality({ code }).name_ja);
  } else if (isAll) {
    targetWards = listRegion("tokyo23").map(code => getMunicipality({ code }).name_ja);
  } else if (wardIndex !== -1 && args[wardIndex + 1]) {
    targetWards = [args[wardIndex + 1]];
  } else if (municipalityIndex !== -1 && args[municipalityIndex + 1]) {
    targetWards = [args[municipalityIndex + 1]];
  } else {
    console.error("사용법: node fetch-evacuation-sites.mjs --ward <구이름> | --municipality <시구정촌> | --region <region> [--no-cache] 또는 --all-wards");
    process.exit(1);
  }

  const noCache = args.includes("--no-cache");

  console.log(`\n===========================================`);
  console.log(`[MLIT XGT001] 대피장소 수집 (${targetWards.length}개 구)`);
  console.log(`===========================================\n`);

  const coverages = [];

  for (const ward of targetWards) {
    console.log(`\n--- ${ward} ---`);
    const result = await collectEvacuationSites(ward, noCache);
    
    // Read population from benchmarks.json
    let popSummary = {};
    try {
      const fs = await import("fs");
      const path = await import("path");
      const benchmarksPath = path.join(process.cwd(), "docs/verification/tokyo-ward-series-benchmarks.json");
      const benchData = JSON.parse(fs.readFileSync(benchmarksPath, "utf8"));
      if (benchData.population_forecast && benchData.population_forecast.wards[ward]) {
        popSummary = benchData.population_forecast.wards[ward];
      }
    } catch (e) {}
    
    const metrics = calculateEvacuationMetrics(result.summary, popSummary);
    
    console.log(`- 대피소 개수: ${result.summary.site_count}`);
    console.log(`- 수용 인원: ${result.summary.total_capacity === null ? '불명(API 미제공)' : result.summary.total_capacity}`);
    console.log(`- 1만명당 대피소 수: ${metrics.sites_per_10k_people} 개 (기준: ${metrics.population_source} ${metrics.population_used}명)`);
    console.log(`- 주요 재해별 대피소 수: 홍수 ${result.summary.by_disaster_type.flood}, 지진 ${result.summary.by_disaster_type.earthquake}`);

    coverages.push({
      ward: ward,
      sites: result.summary.site_count,
      sitesPer10k: metrics.sites_per_10k_people
    });
  }

  if (targetWards.length > 1) {
    console.log(`\n===========================================`);
    console.log(`[XGT001] 도쿄 23구 커버리지 보고서`);
    console.log(`===========================================`);
    console.table(coverages);
  }
}

main().catch(err => {
  console.error("스크립트 실행 중 오류 발생:", err);
  process.exit(1);
});
