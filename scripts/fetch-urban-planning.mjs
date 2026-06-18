import { collectUrbanPlanning, WARD_CODE, loadEnv } from "./mlit-collector.mjs";
import { listRegion, getMunicipality } from "./lib/municipality-registry.mjs";

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
    console.error("사용법: node fetch-urban-planning.mjs --ward <구이름> | --municipality <시구정촌> | --region <region> [--no-cache] 또는 --all-wards");
    process.exit(1);
  }

  const noCache = args.includes("--no-cache");

  console.log(`\n===========================================`);
  console.log(`[MLIT XKT014/023/024/030] 도시계획 데이터 수집 (${targetWards.length}개 구)`);
  console.log(`===========================================\n`);

  for (const ward of targetWards) {
    console.log(`\n--- ${ward} ---`);
    const result = await collectUrbanPlanning(ward, noCache);
    
    console.log(`- 방화/준방화지역 (XKT014): ${result.summary.fire_prevention_zone}`);
    console.log(`- 지구계획 (XKT023): ${result.summary.district_plan_zones}`);
    console.log(`- 고도이용지구 (XKT024): ${result.summary.high_utilization_zones}`);
    console.log(`- 도시계획도로 (XKT030): ${result.summary.urban_road}`);
  }
}

main().catch(err => {
  console.error("스크립트 실행 중 오류 발생:", err);
  process.exit(1);
});
