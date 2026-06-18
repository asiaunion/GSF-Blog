#!/usr/bin/env node
/**
 * fetch-appraisal.mjs
 * 
 * MLIT XCT001 (부동산 감정평가/지가조사) 데이터 수집 스크립트
 *
 * 사용법:
 *   node scripts/fetch-appraisal.mjs --ward 北区
 *   node scripts/fetch-appraisal.mjs --all-wards
 *   node scripts/fetch-appraisal.mjs --year 2023 --all-wards
 */

import { parseArgs } from "node:util";
import { collectAppraisal, WARD_CODE, loadEnv } from "./mlit-collector.mjs";

async function main() {
  await loadEnv();
  const { values } = parseArgs({
    options: {
      ward: { type: "string" },
      "all-wards": { type: "boolean" },
      year: { type: "string" },
      "no-cache": { type: "boolean" },
    },
    strict: false,
  });

  const year = parseInt(values.year || "2023", 10);
  const noCache = values["no-cache"] || false;

  let wards = [];
  if (values["all-wards"]) {
    wards = Object.keys(WARD_CODE);
  } else if (values.ward) {
    wards = values.ward.split(",");
  } else {
    console.error("❌ --ward <구이름> 또는 --all-wards 파라미터가 필요합니다.");
    process.exit(1);
  }

  console.log(`\n=======================================================`);
  console.log(` 📊 감정평가(XCT001) 수집 시작 (${year}년, ${wards.length}개 구)`);
  console.log(`=======================================================\n`);

  let successCount = 0;
  for (const ward of wards) {
    process.stdout.write(`▶ ${ward} 수집 중... `);
    try {
      const result = await collectAppraisal(ward, year, noCache);
      console.log(`완료 (${result.count}건, 평균단가: ${result.avg_price_sqm.toLocaleString()} 円/㎡, 변동률: ${result.avg_change_rate}%)`);
      successCount++;
    } catch (e) {
      console.log(`❌ 오류: ${e.message}`);
    }
    
    // API rate limit
    if (wards.length > 1) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log(`\n✅ 작업 완료: ${successCount} / ${wards.length} 구 성공\n`);
}

main().catch(err => {
  console.error("치명적 오류:", err.message);
  process.exit(2);
});
