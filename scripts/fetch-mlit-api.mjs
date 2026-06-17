#!/usr/bin/env node
/**
 * fetch-mlit-api.mjs
 * 
 * 国土交通省 不動産情報ライブラリ API (XIT001) 데이터 수집 스크립트
 * GSF-Ark Where to Live in Tokyo 시리즈 전용
 *
 * 용도:
 *   - 특정 구(ward)의 성약가(맨션) 원본 데이터를 MLIT API에서 직접 수집
 *   - tokyo_mansion_stats_2025.json 업데이트 또는 신규 구 데이터 추가
 *   - [1차 확인] A계층 데이터 소스 확보
 *
 * 사용법:
 *   MLIT_API_KEY=xxxxxx node scripts/fetch-mlit-api.mjs --ward 台東区
 *   MLIT_API_KEY=xxxxxx node scripts/fetch-mlit-api.mjs --city 13106 --year 2025
 *   MLIT_API_KEY=xxxxxx node scripts/fetch-mlit-api.mjs --all-ep06
 *   node scripts/fetch-mlit-api.mjs --help
 *
 * 환경변수:
 *   MLIT_API_KEY  API키 (메일에서 발급받은 Ocp-Apim-Subscription-Key)
 *                 또는 .env 파일에 MLIT_API_KEY=xxxxx 로 설정
 *
 * 출력:
 *   .cache/mlit/mlit-{ward}-{year}.json  — 원본 API 응답 저장
 *   stdout: 70㎡ 환산 요약 (성약가, 단가, 건수)
 */

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

// ─── 구 코드 테이블 (東京都 23区) ────────────────────────────────────────────
// 市区町村コード: 全国地方公共団体コード 上5桁
const WARD_CODE_MAP = {
  "千代田区": "13101",
  "中央区":   "13102",
  "港区":     "13103",
  "新宿区":   "13104",
  "文京区":   "13105",
  "台東区":   "13106",
  "墨田区":   "13107",
  "江東区":   "13108",
  "品川区":   "13109",
  "目黒区":   "13110",
  "大田区":   "13111",
  "世田谷区": "13112",
  "渋谷区":   "13113",
  "中野区":   "13114",
  "杉並区":   "13115",
  "豊島区":   "13116",
  "北区":     "13117",
  "荒川区":   "13118",
  "板橋区":   "13119",
  "練馬区":   "13120",
  "足立区":   "13121",
  "葛飾区":   "13122",
  "江戸川区": "13123",
};

// Ep별 대상 구 그룹
const EPISODE_WARDS = {
  "ep01": ["千代田区", "中央区", "港区"],
  "ep02": ["新宿区", "渋谷区", "文京区"],
  "ep03": ["目黒区", "世田谷区"],
  "ep04": ["品川区", "大田区"],
  "ep05": ["豊島区", "中野区", "杉並区"],
  "ep06": ["台東区", "墨田区", "江東区"],
  "ep07": ["北区", "荒川区", "足立区"],
};

const BASE_URL = "https://www.reinfolib.mlit.go.jp/ex-api/external/XIT001";
const CACHE_DIR = path.join(process.cwd(), ".cache/mlit");

// ─── .env 로드 (간단 파서) ───────────────────────────────────────────────────
async function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  try {
    const raw = await readFile(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.+)$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, "");
      }
    }
  } catch {
    // .env 없으면 무시
  }
}

// ─── API 호출 ────────────────────────────────────────────────────────────────
async function fetchMlitData({ cityCode, year, quarter, priceClassification = "02" }) {
  const apiKey = process.env.MLIT_API_KEY;
  if (!apiKey) {
    throw new Error(
      "MLIT_API_KEY 환경변수가 없습니다.\n" +
      "  export MLIT_API_KEY=your_key_here\n" +
      "  또는 .env 파일에 MLIT_API_KEY=your_key 추가"
    );
  }

  const params = new URLSearchParams({
    priceClassification, // 02 = 성약가만
    year: String(year),
    city: cityCode,
    language: "ja",
  });
  if (quarter) params.set("quarter", String(quarter));

  const url = `${BASE_URL}?${params}`;
  
  const res = await fetch(url, {
    headers: {
      "Ocp-Apim-Subscription-Key": apiKey,
      "Accept-Encoding": "gzip",
    },
  });

  if (!res.ok) {
    throw new Error(`API 오류: ${res.status} ${res.statusText} — ${url}`);
  }

  const data = await res.json();
  return data;
}

// ─── 맨션 데이터 필터링 및 집계 ─────────────────────────────────────────────
function aggregateMansionData(records, wardName) {
  // 맨션(区分所有建物) 필터
  const mansion = records.filter(r =>
    r.Type === "中古マンション等" || r.Type === "区分所有建物"
  );

  if (mansion.length === 0) {
    return { ward: wardName, count: 0, error: "맨션 거래 데이터 없음" };
  }

  // 유효 데이터 필터 (면적·가격 있는 것)
  const valid = mansion.filter(r => {
    const area = parseFloat(r.Area);
    const price = parseFloat(r.TradePrice);
    return area > 0 && price > 0;
  });

  // ㎡ 단가 계산
  const unitPrices = valid.map(r => {
    const area = parseFloat(r.Area);
    const price = parseFloat(r.TradePrice);
    return price / area / 10000; // 万円/㎡
  });

  const avgUnitPrice = unitPrices.reduce((a, b) => a + b, 0) / unitPrices.length;
  const est70sqm = Math.round(avgUnitPrice * 70);

  // 역별 집계
  const byStation = {};
  for (const r of valid) {
    const st = r.NearestStation || "不明";
    if (!byStation[st]) byStation[st] = { prices: [], areas: [] };
    byStation[st].prices.push(parseFloat(r.TradePrice) / 10000);
    byStation[st].areas.push(parseFloat(r.Area));
  }

  const stationSummary = Object.entries(byStation)
    .map(([st, d]) => {
      const avgPrice = d.prices.reduce((a, b) => a + b, 0) / d.prices.length;
      const avgArea = d.areas.reduce((a, b) => a + b, 0) / d.areas.length;
      const avgUnitSt = (avgPrice * 10000) / avgArea / 10000;
      return { station: st, count: d.prices.length, avg_price_man: Math.round(avgPrice), avg_unit_sqm: Math.round(avgUnitSt * 10) / 10 };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    ward: wardName,
    count: valid.length,
    ward_avg_sqm: Math.round(avgUnitPrice * 10) / 10,
    est_70sqm: est70sqm,
    top_stations: stationSummary,
    source: "MLIT XIT001 API (priceClassification=02)",
    fetched_at: new Date().toISOString().slice(0, 10),
  };
}

// ─── 캐시 저장 ───────────────────────────────────────────────────────────────
async function saveCache(filename, data) {
  await mkdir(CACHE_DIR, { recursive: true });
  const filepath = path.join(CACHE_DIR, filename);
  await writeFile(filepath, JSON.stringify(data, null, 2), "utf8");
  return filepath;
}

// ─── 단일 구 처리 ────────────────────────────────────────────────────────────
async function processWard(wardName, year, quarter) {
  const cityCode = WARD_CODE_MAP[wardName];
  if (!cityCode) {
    console.error(`❌ 알 수 없는 구: ${wardName}`);
    console.error(`   사용 가능: ${Object.keys(WARD_CODE_MAP).join(", ")}`);
    return null;
  }

  const qLabel = quarter ? `q${quarter}` : "all";
  const cacheFile = `mlit-${wardName}-${year}-${qLabel}.json`;
  const cachePath = path.join(CACHE_DIR, cacheFile);

  // 캐시 확인
  try {
    await access(cachePath);
    const cached = JSON.parse(await readFile(cachePath, "utf8"));
    console.log(`📁 캐시 사용: ${cacheFile}`);
    return { raw: cached, wardName };
  } catch {
    // 캐시 없으면 API 호출
  }

  console.log(`🌐 API 호출: ${wardName} (${cityCode}) year=${year}${quarter ? ` q${quarter}` : ""}`);
  
  const raw = await fetchMlitData({ cityCode, year, quarter });
  
  // 원본 저장
  const savedPath = await saveCache(cacheFile, raw);
  console.log(`💾 저장: ${savedPath} (${raw.data?.length ?? 0}건)`);

  return { raw, wardName };
}

// ─── 요약 출력 ───────────────────────────────────────────────────────────────
function printSummary(results) {
  console.log("\n" + "═".repeat(60));
  console.log("📊 MLIT 성약가 집계 결과 (70㎡ 환산)");
  console.log("═".repeat(60));
  
  for (const r of results) {
    if (!r) continue;
    const { raw, wardName } = r;
    const records = raw?.data ?? [];
    const agg = aggregateMansionData(records, wardName);
    
    if (agg.error) {
      console.log(`❌ ${wardName}: ${agg.error}`);
      continue;
    }

    console.log(`\n🏙️  ${wardName}`);
    console.log(`   건수:     ${agg.count}건`);
    console.log(`   ㎡단가:   ${agg.ward_avg_sqm}万円/㎡`);
    console.log(`   70㎡환산: ${agg.est_70sqm}万円`);
    console.log(`   상위역:`);
    for (const st of agg.top_stations.slice(0, 5)) {
      console.log(`     ${st.station}: ${st.count}건 / 평균 ${st.avg_price_man}万円 (${st.avg_unit_sqm}万/㎡)`);
    }

    // benchmarks.json 업데이트용 스니펫 출력
    console.log(`\n   📋 benchmarks.json 업데이트용:`);
    console.log(`   "${wardName}": { "ward_avg_sqm": ${agg.ward_avg_sqm}, "est_70sqm": ${agg.est_70sqm}, "count": ${agg.count} }`);
  }

  console.log("\n" + "═".repeat(60));
  console.log("✅ 모든 수치는 MLIT API 직접 수집 [1차 확인] A계층");
  console.log(`   캐시 위치: ${CACHE_DIR}`);
}

// ─── 도움말 ──────────────────────────────────────────────────────────────────
function printHelp() {
  console.log(`
fetch-mlit-api.mjs — MLIT 불동산 정보 라이브러리 API 수집 스크립트

사용법:
  MLIT_API_KEY=xxx node scripts/fetch-mlit-api.mjs --ward 台東区
  MLIT_API_KEY=xxx node scripts/fetch-mlit-api.mjs --ward 台東区 --year 2025
  MLIT_API_KEY=xxx node scripts/fetch-mlit-api.mjs --ward 台東区 --year 2025 --quarter 1
  MLIT_API_KEY=xxx node scripts/fetch-mlit-api.mjs --city 13106 --year 2025
  MLIT_API_KEY=xxx node scripts/fetch-mlit-api.mjs --episode ep07
  MLIT_API_KEY=xxx node scripts/fetch-mlit-api.mjs --all-ep06

옵션:
  --ward <구명>       특정 구 (예: 台東区, 墨田区)
  --city <코드>       5자리 시구정촌 코드 (예: 13106)
  --year <년>         취득년도 (기본: 2025)
  --quarter <1~4>     분기 (미지정시 전년도)
  --episode <ep0N>    에피소드 묶음 (예: ep07)
  --all-ep06          Ep.06 3구 재수집 (台東·墨田·江東)
  --no-cache          캐시 무시하고 재수집
  --help              이 도움말

환경변수:
  MLIT_API_KEY        API키 (필수) — .env 파일 또는 export로 설정

구 코드 목록:
${Object.entries(WARD_CODE_MAP).map(([k, v]) => `  ${k}: ${v}`).join("\n")}
`);
}

// ─── 메인 ─────────────────────────────────────────────────────────────────────
async function main() {
  await loadEnv();

  const args = process.argv.slice(2);
  
  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }

  const getArg = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : null;
  };

  const year = parseInt(getArg("--year") ?? "2025", 10);
  const quarter = getArg("--quarter") ? parseInt(getArg("--quarter"), 10) : undefined;
  const noCache = args.includes("--no-cache");

  // 캐시 무시 옵션: 캐시 파일 존재 체크를 건너뛰도록 환경변수 설정
  if (noCache) process.env.MLIT_NO_CACHE = "1";

  let wards = [];

  if (args.includes("--all-ep06")) {
    wards = EPISODE_WARDS["ep06"];
  } else if (getArg("--episode")) {
    const ep = getArg("--episode").toLowerCase();
    wards = EPISODE_WARDS[ep];
    if (!wards) {
      console.error(`❌ 알 수 없는 에피소드: ${ep}`);
      console.error(`   사용 가능: ${Object.keys(EPISODE_WARDS).join(", ")}`);
      process.exit(1);
    }
  } else if (getArg("--ward")) {
    wards = [getArg("--ward")];
  } else if (getArg("--city")) {
    // 시코드 직접 지정
    const cityCode = getArg("--city");
    const wardName = Object.entries(WARD_CODE_MAP).find(([, v]) => v === cityCode)?.[0] ?? cityCode;
    console.log(`🌐 API 호출: city=${cityCode} year=${year}${quarter ? ` q${quarter}` : ""}`);
    const raw = await fetchMlitData({ cityCode, year, quarter });
    const cacheFile = `mlit-city${cityCode}-${year}-${quarter ? `q${quarter}` : "all"}.json`;
    const savedPath = await saveCache(cacheFile, raw);
    console.log(`💾 저장: ${savedPath} (${raw.data?.length ?? 0}건)`);
    const agg = aggregateMansionData(raw.data ?? [], wardName);
    console.log(JSON.stringify(agg, null, 2));
    return;
  } else {
    console.error("❌ 구 지정이 없습니다. --ward, --episode, --all-ep06 중 하나를 사용하세요.");
    console.error("   node scripts/fetch-mlit-api.mjs --help");
    process.exit(1);
  }

  // 순차 처리 (API 레이트 리밋 고려)
  const results = [];
  for (const ward of wards) {
    try {
      const result = await processWard(ward, year, quarter);
      results.push(result);
      // 연속 호출 시 0.5초 간격
      if (wards.length > 1) await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`❌ ${ward} 오류: ${err.message}`);
      results.push(null);
    }
  }

  printSummary(results);
}

main().catch(err => {
  console.error("치명적 오류:", err.message);
  process.exit(2);
});
