#!/usr/bin/env node
/**
 * fetch-price-points.mjs
 * 
 * MLIT XPT001 (부동산 거래가격 포인트) 데이터 수집 스크립트
 * GeoJSON 형태로 반환하며 대용량 타일 병합을 처리.
 *
 * 사용법:
 *   node scripts/fetch-price-points.mjs --ward 北区
 *   node scripts/fetch-price-points.mjs --all-wards
 *   node scripts/fetch-price-points.mjs --year 2025 --all-wards
 */

import { parseArgs } from "node:util";
import { collectPricePoints, WARD_CODE, loadEnv } from "./mlit-collector.mjs";
import { listRegion, getMunicipality } from "./lib/municipality-registry.mjs";

async function main() {
  await loadEnv();
  const { values } = parseArgs({
    options: {
      ward: { type: "string" },
      "all-wards": { type: "boolean" },
      year: { type: "string" },
      "no-cache": { type: "boolean" },
      "price-classification": { type: "string" },
    },
    strict: false,
  });

  const year = parseInt(values.year || "2025", 10);
  const noCache = values["no-cache"] || false;
  const priceClassification = values["price-classification"] || "02"; // 02: 성약가, 01: 거래가

  const args = process.argv.slice(2);

  const isAll = args.includes("--all-wards");
  const wardIndex = args.indexOf("--ward");
  const municipalityIndex = args.indexOf("--municipality");
  const regionIndex = args.indexOf("--region");
  
  let wards = [];
  if (regionIndex !== -1 && args[regionIndex + 1]) {
    wards = listRegion(args[regionIndex + 1]).map(code => getMunicipality({ code }).name_ja);
  } else if (isAll) {
    wards = listRegion("tokyo23").map(code => getMunicipality({ code }).name_ja);
  } else if (wardIndex !== -1 && args[wardIndex + 1]) {
    wards = [args[wardIndex + 1]];
  } else if (municipalityIndex !== -1 && args[municipalityIndex + 1]) {
    wards = [args[municipalityIndex + 1]];
  } else {
    console.error("사용법: node fetch-price-points.mjs --ward <구이름> | --municipality <시구정촌> | --region <region> [--no-cache] 또는 --all-wards");
    process.exit(1);
  }

  console.log(`\n=======================================================`);
  console.log(` 📊 거래가격 포인트(XPT001) 수집 시작 (${year}년, ${wards.length}개 구)`);
  console.log(`=======================================================\n`);

  let successCount = 0;
  for (const ward of wards) {
    process.stdout.write(`▶ ${ward} 수집 중... `);
    try {
      const result = await collectPricePoints(ward, year, noCache, priceClassification);
      console.log(`완료 (${result.count}건, 평균단가: ${result.ward_avg_sqm.toLocaleString()} 万円/㎡) -> ${result.geojson_path}`);
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
