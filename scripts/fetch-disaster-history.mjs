import { collectDisasterHistory, WARD_CODE, loadEnv } from "./mlit-collector.mjs";

async function main() {
  await loadEnv();
  
  const args = process.argv.slice(2);
  const isAll = args.includes("--all-wards");
  const wardIndex = args.indexOf("--ward");
  
  let targetWards = [];
  if (isAll) {
    targetWards = Object.keys(WARD_CODE);
  } else if (wardIndex !== -1 && args[wardIndex + 1]) {
    targetWards = [args[wardIndex + 1]];
  } else {
    console.error("사용법: node fetch-disaster-history.mjs --ward <구이름> [--no-cache] 또는 --all-wards");
    process.exit(1);
  }

  const noCache = args.includes("--no-cache");

  console.log(`\n===========================================`);
  console.log(`[MLIT XST001] 재해 이력 수집 (${targetWards.length}개 구)`);
  console.log(`===========================================\n`);

  const coverages = [];

  for (const ward of targetWards) {
    console.log(`\n--- ${ward} ---`);
    const result = await collectDisasterHistory(ward, noCache);
    
    console.log(`- 커버리지 상태: ${result.coverage_status}`);
    console.log(`- 요약: ${result.coverage_note}`);
    console.log(`- 기록된 사건 수: ${result.summary.total_events}`);
    console.log(`- 홍수 관련 사건: ${result.summary.flood_events}`);
    if (result.summary.last_flood_year) {
      console.log(`- 마지막 홍수 연도: ${result.summary.last_flood_year}`);
    }

    coverages.push({
      ward: ward,
      status: result.coverage_status,
      events: result.summary.total_events
    });
  }

  if (targetWards.length > 1) {
    console.log(`\n===========================================`);
    console.log(`[XST001] 도쿄 23구 커버리지 보고서`);
    console.log(`===========================================`);
    console.table(coverages);
  }
}

main().catch(err => {
  console.error("스크립트 실행 중 오류 발생:", err);
  process.exit(1);
});
