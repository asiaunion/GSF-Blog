#!/usr/bin/env node
/**
 * mlit-collector.mjs
 * MLIT 不動産情報ライブラリ 통합 데이터 수집·분석 스크립트
 * GSF-Ark Where to Live in Tokyo 시리즈 전용
 *
 * 수집 가능 데이터:
 *   price     — XIT001: 맨션 성약가·취득가 (구별, 역별)
 *   landprice — XPT002: 지가공시·지가조사 포인트
 *   station   — XKT015: 역별 승하차 인원
 *   population— XKT013: 250m 메시 장래 추계 인구 (타일 기반, 구 단위 집계)
 *   zoning    — XKT002: 용도지역 (타일 기반, 구 단위 요약)
 *   disaster  — XKT025/026/027/028/029: 재해 리스크 (액상화·홍수·고조·쓰나미·토사)
 *
 * 사용법:
 *   node scripts/mlit-collector.mjs --type price --ward 台東区
 *   node scripts/mlit-collector.mjs --type price --episode ep07
 *   node scripts/mlit-collector.mjs --type landprice --ward 墨田区 --year 2025
 *   node scripts/mlit-collector.mjs --type station --ward 江東区
 *   node scripts/mlit-collector.mjs --type disaster --ward 江東区
 *   node scripts/mlit-collector.mjs --type all --ward 台東区
 *   node scripts/mlit-collector.mjs --type all --episode ep06
 *   node scripts/mlit-collector.mjs --export-benchmarks --episode ep07
 *   node scripts/mlit-collector.mjs --help
 *
 * 환경변수:
 *   MLIT_API_KEY  — .env 또는 export MLIT_API_KEY=xxx
 *
 * 출력:
 *   .cache/mlit/{type}-{ward}-{year}.json  — 원본 캐시
 *   stdout: 분석 요약 + benchmarks.json 업데이트용 스니펫
 */

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { getWardTiles, getWardPopulationTiles, WARD_POPULATION_TILE_PRESETS } from "./lib/ward-tiles.mjs";
import { unionWardTiles, getStationTilesForWard } from './lib/station-tile-fetch.mjs';
import { resolveXkt015Name, buildXkt015Map } from './lib/station-alias.mjs';
import { getStationsByWard } from "./lib/station-master.mjs";
import * as turf from "@turf/turf";
import { getWardPolygons } from "./lib/ward-polygon.mjs";


// ─────────────────────────────────────────────────────────────────────────────
// 상수 정의
// ─────────────────────────────────────────────────────────────────────────────

const BASE = "https://www.reinfolib.mlit.go.jp/ex-api/external";

const ENDPOINTS = {
  price:      `${BASE}/XIT001`,  // 성약가·취득가
  price_point:`${BASE}/XPT001`,  // 부동산 거래가격 (포인트)
  appraisal:  `${BASE}/XCT001`,  // 부동산 감정평가 (지가조사)
  munici:     `${BASE}/XIT002`,  // 시구정촌 목록
  landprice:  `${BASE}/XPT002`,  // 지가공시 포인트 (GeoJSON/타일)
  station:    `${BASE}/XKT015`,  // 역별 승하차 인원 (타일)
  population: `${BASE}/XKT013`,  // 장래 추계 인구 250m 메시 (타일)
  zoning:     `${BASE}/XKT002`,  // 용도지역 (타일)
  disaster_liquefaction: `${BASE}/XKT025`, // 액상화 발생 경향
  disaster_flood:        `${BASE}/XKT026`, // 홍수 침수 상정
  disaster_storm_surge:  `${BASE}/XKT027`, // 고조 침수 상정
  disaster_tsunami:      `${BASE}/XKT028`, // 쓰나미 침수 상정
  disaster_landslide:    `${BASE}/XKT029`, // 토사재해 경계구역
  disaster_history:      `${BASE}/XST001`, // 재해 이력
  evacuation_sites:      `${BASE}/XGT001`, // 긴급대피장소
  urban_fire:            `${BASE}/XKT014`, // 방화·준방화지역
  district_plan:         `${BASE}/XKT023`, // 지구계획
  high_utilization:      `${BASE}/XKT024`, // 고도이용지구
  urban_road:            `${BASE}/XKT030`, // 도시계획도로
  location_optimization: `${BASE}/XKT003`, // 입지적정화계획구역
};

import { getMunicipality, listRegion } from "./lib/municipality-registry.mjs";
import { loadEpisodeWardsMap } from "./lib/episode-registry.mjs";

// 도쿄 23구 시구정촌 코드 (registry에서 동적 생성하되 export 호환성 유지)
const WARD_CODE = {};
const WARD_SLUG = {};

const tokyo23Codes = listRegion("tokyo23");
for (const code of tokyo23Codes) {
  const mun = getMunicipality({ code });
  if (mun) {
    WARD_CODE[mun.name_ja] = mun.code;
    WARD_SLUG[mun.name_ja] = mun.name_en_slug;
  }
}

// 에피소드별 구 그룹 — SSOT: docs/verification/tokyo-series-episodes.json
const EPISODE_WARDS = loadEpisodeWardsMap();

const CACHE_DIR = path.join(process.cwd(), ".cache/mlit");
const BENCHMARKS_PATH = path.join(
  process.cwd(), "docs/verification/tokyo-ward-series-benchmarks.json"
);

// ─────────────────────────────────────────────────────────────────────────────
// 유틸리티
// ─────────────────────────────────────────────────────────────────────────────

async function loadEnv() {
  try {
    const raw = await readFile(path.join(process.cwd(), ".env"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, "");
    }
  } catch { /* .env 없으면 무시 */ }
}

function apiKey() {
  const k = process.env.MLIT_API_KEY;
  if (!k) throw new Error(
    "MLIT_API_KEY 미설정\n  .env에 MLIT_API_KEY=your_key 추가 또는\n  export MLIT_API_KEY=your_key"
  );
  return k;
}

async function fileExists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function readJson(p) {
  return JSON.parse(await readFile(p, "utf8"));
}

async function writeJson(p, data) {
  await mkdir(path.dirname(p), { recursive: true });
  await writeFile(p, JSON.stringify(data, null, 2), "utf8");
}

async function cachedFetch(cacheKey, fetcher, noCache = false) {
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.json`);
  if (!noCache && await fileExists(cachePath)) {
    process.stderr.write(`📁 캐시: ${cacheKey}\n`);
    return readJson(cachePath);
  }
  process.stderr.write(`🌐 API 호출: ${cacheKey}\n`);
  const data = await fetcher();
  await writeJson(cachePath, data);
  process.stderr.write(`💾 저장: ${cachePath}\n`);
  return data;
}

async function apiFetch(url) {
  const res = await fetch(url, {
    headers: { "Ocp-Apim-Subscription-Key": apiKey() },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  return res.json();
}

// XYZ → 위경도 (타일 좌표 → 위도 범위 검증용)
function tile2lon(x, z) { return (x / Math.pow(2, z)) * 360 - 180; }
function tile2lat(y, z) {
  const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

// 통계 헬퍼
function stats(arr) {
  if (!arr.length) return { count: 0, avg: 0, min: 0, max: 0, median: 0 };
  const sorted = [...arr].sort((a, b) => a - b);
  const avg = arr.reduce((s, v) => s + v, 0) / arr.length;
  return {
    count: arr.length,
    avg: Math.round(avg * 10) / 10,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    median: sorted[Math.floor(sorted.length / 2)],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 수집 함수들
// ─────────────────────────────────────────────────────────────────────────────

/** XIT001: 맨션 성약가·취득가·거래가격 */
async function collectPrice(wardName, year = 2025, quarter = null, noCache = false, priceClassification = "02") {
  const mun = getMunicipality({ name_ja: wardName });
  let cityCode = mun?.code || WARD_CODE[wardName];
  if (!cityCode) throw new Error(`알 수 없는 구: ${wardName}`);

  const q = quarter ? `_q${quarter}` : "";
  const cacheKey = `price-${priceClassification}-${wardName}-${year}${q}`;

  // MLIT API legacy city code mapping (西東京市: 13228 → MLIT XIT001 API returns 13229)
  const apiCityCode = (wardName === "西東京市" || cityCode === "13228") ? "13229" : cityCode;

  const params = new URLSearchParams({
    priceClassification,
    year: String(year),
    city: apiCityCode,
    language: "ja",
  });
  if (quarter) params.set("quarter", String(quarter));

  const raw = await cachedFetch(cacheKey,
    () => apiFetch(`${ENDPOINTS.price}?${params}`), noCache);

  const records = raw?.data ?? [];

  // 맨션 필터
  const mansion = records.filter(r =>
    r.Type === "中古マンション等" || r.Type === "区分所有建物"
  );
  const valid = mansion.filter(r => +r.Area > 0 && +r.TradePrice > 0);

  if (!valid.length) return { ward: wardName, type: "price", count: 0, note: "데이터 없음" };

  // 기본 집계
  const unitPrices = valid.map(r => (+r.TradePrice) / (+r.Area) / 10000); // 万円/㎡
  const st = stats(unitPrices);
  const est70 = Math.round(st.avg * 70);

  // 역별 집계 — XIT001은 최근역 필드 없음 → DistrictName(町名) 기준
  const byDistrict = {};
  for (const r of valid) {
    const d = r.DistrictName || "不明";
    if (!byDistrict[d]) byDistrict[d] = [];
    byDistrict[d].push((+r.TradePrice) / (+r.Area) / 10000);
  }
  const districts = Object.entries(byDistrict)
    .map(([name, unitPrices]) => ({
      name,
      aggregation: "DistrictName",
      count: unitPrices.length,
      avg_sqm: Math.round((unitPrices.reduce((a, b) => a + b, 0) / unitPrices.length) * 10) / 10,
      avg_man: Math.round(
        valid
          .filter(r => (r.DistrictName || "不明") === name)
          .reduce((s, r) => s + +r.TradePrice, 0) /
          valid.filter(r => (r.DistrictName || "不明") === name).length /
          10000
      ),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // 건축년도별 분포
  const byYear = {};
  for (const r of valid) {
    const y = r.BuildingYear?.replace(/年.*/, "") || "不明";
    if (!byYear[y]) byYear[y] = 0;
    byYear[y]++;
  }

  // 면적대별 평균단가
  const bands = { "~40㎡": [], "40~60㎡": [], "60~80㎡": [], "80㎡~": [] };
  for (const r of valid) {
    const a = +r.Area;
    const u = (+r.TradePrice) / a / 10000;
    if (a < 40) bands["~40㎡"].push(u);
    else if (a < 60) bands["40~60㎡"].push(u);
    else if (a < 80) bands["60~80㎡"].push(u);
    else bands["80㎡~"].push(u);
  }
  const areaBands = Object.fromEntries(
    Object.entries(bands).map(([k, v]) => [k, stats(v)])
  );

  const tierLabel = priceClassification === "02" ? "A" : "A_auxiliary";
  const priceLabel = priceClassification === "02" ? "成約価格" : "不動産取引価格";

  return {
    ward: wardName, type: "price", year, price_classification: priceClassification,
    count: valid.length,
    ward_avg_sqm: st.avg,
    est_70sqm: est70,
    unit_price_stats: { ...st, median: Math.round(st.median * 10) / 10 },
    districts,
    building_year_dist: byYear,
    area_band_unit_price: areaBands,
    fetched_at: new Date().toISOString().slice(0, 10),
    source: `MLIT XIT001 ${priceLabel} API [1차 확인] ${tierLabel}계층`,
  };
}

/** XIT001 priceClassification=01 — 不動産取引価格 (보조 시계열) */
async function collectTradePrice(wardName, year = 2025, quarter = null, noCache = false) {
  return collectPrice(wardName, year, quarter, noCache, "01");
}

function parsePriceManYen(raw) {
  if (!raw) return 0;
  if (typeof raw === "number") return raw;
  const s = String(raw).replace(/,/g, "");
  const m = s.match(/(\d+)万円/);
  if (m) return parseInt(m[1], 10);
  const m2 = s.match(/(\d+)/);
  return m2 ? parseInt(m2[1], 10) : 0;
}

function parseAreaSqm(raw) {
  if (!raw) return 0;
  if (typeof raw === "number") return raw;
  const s = String(raw).replace(/,/g, "");
  const m = s.match(/(\d+)㎡/);
  if (m) return parseInt(m[1], 10);
  const m2 = s.match(/(\d+)/);
  return m2 ? parseInt(m2[1], 10) : 0;
}

/** XPT001: 부동산 거래가격 (포인트) */
async function collectPricePoints(wardName, year = 2025, noCache = false, priceClassification = "02") {
  const slug = WARD_SLUG[wardName] || wardName;
  const tiles = getWardTiles(wardName);

  const allPoints = [];
  for (const { z, x, y } of tiles) {
    const cacheKey = `price-point-${priceClassification}-${wardName}-${year}-${z}_${x}_${y}`;
    const params = new URLSearchParams({
      response_format: "geojson",
      z: String(z), x: String(x), y: String(y),
      from: `${year}1`,
      to: `${year}4`,
      priceClassification,
    });
    const raw = await cachedFetch(cacheKey,
      () => apiFetch(`${ENDPOINTS.price_point}?${params}`), noCache);
    const features = raw?.features ?? [];
    allPoints.push(...features);
    if (tiles.length > 1) await sleep(300);
  }

  // Filter for the exact ward using city_code
  const mun = getMunicipality({ name_ja: wardName });
  const wardCode = mun?.code || WARD_CODE[wardName];
  const inWard = allPoints.filter(f => String(f.properties?.city_code) === wardCode);

  // Filter for "中古マンション等" and "区分所有建物" using land_type_name_ja
  const mansionPoints = inWard.filter(f => {
    const t = f.properties?.land_type_name_ja;
    return t === "中古マンション等" || t === "区分所有建物";
  });

  const valid = mansionPoints.filter(f => {
    const p = parsePriceManYen(f.properties?.u_transaction_price_total_ja);
    const a = parseAreaSqm(f.properties?.u_area_ja);
    return p > 0 && a > 0;
  });

  if (!valid.length) return { ward: wardName, type: "price-point", count: 0, note: "데이터 없음" };

  const featureCollection = {
    type: "FeatureCollection",
    features: valid
  };

  const relativePath = `docs/verification/data/price-points/${slug}-${year}.geojson`;
  const outPath = path.join(process.cwd(), relativePath);
  await writeJson(outPath, featureCollection);

  const unitPrices = valid.map(f => {
    const p = parsePriceManYen(f.properties?.u_transaction_price_total_ja);
    const a = parseAreaSqm(f.properties?.u_area_ja);
    return p / a; // 万円/㎡
  });
  const st = stats(unitPrices);

  return {
    ward: wardName, type: "price-point", year, price_classification: priceClassification,
    count: valid.length,
    ward_avg_sqm: st.avg,
    est_70sqm: Math.round(st.avg * 70),
    geojson_path: relativePath,
    fetched_at: new Date().toISOString().slice(0, 10),
    source: `MLIT XPT001 API [1차 확인] A계층`,
  };
}

/** XPT002: 지가공시 포인트 (GeoJSON 타일) */
async function collectLandPrice(wardName, year = 2025, noCache = false) {
  const tiles = getWardTiles(wardName);

  const allPoints = [];
  for (const { z, x, y } of tiles) {
    const cacheKey = `landprice-${wardName}-${year}-${z}_${x}_${y}`;
    const params = new URLSearchParams({
      response_format: "geojson",
      z: String(z), x: String(x), y: String(y),
      year: String(year),
    });
    const raw = await cachedFetch(cacheKey,
      () => apiFetch(`${ENDPOINTS.landprice}?${params}`), noCache);
    const features = raw?.features ?? [];
    allPoints.push(...features);
    if (tiles.length > 1) await sleep(300);
  }

  if (!allPoints.length) return { ward: wardName, type: "landprice", count: 0, note: "데이터 없음" };

  const prices = allPoints
    .map(f => parseLandPriceYen(f.properties))
    .filter(v => v > 0);

  const st = stats(prices);

  // 용도별 분류 (지가공시 구분코드)
  const byUse = {};
  for (const f of allPoints) {
    const use = f.properties?.L01_024 || f.properties?.用途区分 || "不明";
    if (!byUse[use]) byUse[use] = [];
    const p = +f.properties?.L01_006 || 0;
    if (p > 0) byUse[use].push(p);
  }

  // 연도별 변동 (전년대비 가격변동율이 있는 경우)
  const changes = allPoints
    .map(f => +f.properties?.L01_019 || +f.properties?.変動率 || null)
    .filter(v => v !== null && !isNaN(v));

  return {
    ward: wardName, type: "landprice", year,
    point_count: allPoints.length,
    price_stats: { ...st, unit: "円/㎡" },
    by_use: Object.fromEntries(
      Object.entries(byUse).map(([k,v]) => [k, stats(v)])
    ),
    avg_change_rate: changes.length
      ? Math.round(changes.reduce((a,b)=>a+b,0)/changes.length*100)/100
      : null,
    fetched_at: new Date().toISOString().slice(0, 10),
    source: "MLIT XPT002 API [1차 확인] A계층",
  };
}

/** XCT001: 부동산 감정평가 (지가조사) */
async function collectAppraisal(wardName, year = 2023, noCache = false) {
  const mun = getMunicipality({ name_ja: wardName });
  const cityCode = mun?.code || WARD_CODE[wardName];
  if (!cityCode) throw new Error(`알 수 없는 구: ${wardName}`);

  const prefCode = cityCode.substring(0, 2); // "13"
  const cityCodeSuffix = cityCode.slice(-3); // e.g. "117"

  // division: 00 = 宅地, 05 = 商業地
  const divisions = ["00", "05"];
  const allPoints = [];

  for (const div of divisions) {
    const cacheKey = `appraisal-${wardName}-${year}-${div}`;
    const params = new URLSearchParams({
      year: String(year),
      area: prefCode,
      division: div
    });
    
    const raw = await cachedFetch(cacheKey,
      () => apiFetch(`${ENDPOINTS.appraisal}?${params}`), noCache);
    
    const records = raw?.data ?? [];
    allPoints.push(...records);
    if (divisions.length > 1) await sleep(300);
  }

  // Filter for exact ward
  const inWard = allPoints.filter(d => 
    String(d["標準地番号 市区町村コード 市区町村コード"]) === cityCodeSuffix
  );

  if (!inWard.length) return { ward: wardName, type: "appraisal", count: 0, note: "데이터 없음" };

  const valid = inWard.filter(d => {
    const price = parseInt(d["1㎡当たりの価格"], 10);
    return !isNaN(price) && price > 0;
  });

  const processedPoints = valid.map(d => ({
    price_sqm: parseInt(d["1㎡当たりの価格"], 10),
    change_rate: parseFloat(d["変動率"]) || 0,
    address: d["標準地 所在地 住居表示"] || d["標準地 所在地 所在地番"],
    lat: parseFloat(d["位置座標 緯度"]),
    lon: parseFloat(d["位置座標 経度"]),
    use_type: d["標準地番号 用途区分"]
  }));

  const cachePath = path.join(CACHE_DIR, `appraisal-merged-${mun?.name_en_slug || WARD_SLUG[wardName] || wardName}-${year}.json`);
  await writeJson(cachePath, processedPoints);

  const changes = processedPoints.map(p => p.change_rate).filter(r => r !== 0);
  const avgChange = changes.length ? Math.round((changes.reduce((a,b)=>a+b,0) / changes.length) * 10) / 10 : 0;
  const prices = processedPoints.map(p => p.price_sqm);
  const st = stats(prices);

  return {
    ward: wardName, type: "appraisal", year,
    count: processedPoints.length,
    avg_price_sqm: st.avg,
    avg_change_rate: avgChange,
    json_path: cachePath.replace(process.cwd() + '/', ''),
    fetched_at: new Date().toISOString().slice(0, 10),
    source: `MLIT XCT001 API [1차 확인] A계층`,
  };
}

/** XKT015: 역별 승하차 인원 */
async function collectStation(wardName, noCache = false) {
  const mun = getMunicipality({ name_ja: wardName });
  const wardCode = mun?.code || WARD_CODE[wardName];
  const tiles = unionWardTiles(wardName, wardCode);
  const tile_sources = {
    ward_polygon: getWardTiles(wardName).length,
    station_coords: getStationTilesForWard(wardCode).length,
    union: tiles.length
  };

  const allStations = [];
  for (const { z, x, y } of tiles) {
    const cacheKey = `station-${wardName}-${z}_${x}_${y}`;
    const params = new URLSearchParams({
      response_format: "geojson",
      z: String(z), x: String(x), y: String(y),
    });
    const raw = await cachedFetch(cacheKey,
      () => apiFetch(`${ENDPOINTS.station}?${params}`), noCache);
    allStations.push(...(raw?.features ?? []));
    if (tiles.length > 1) await sleep(300);
  }

  if (!allStations.length) return { ward: wardName, type: "station", count: 0, note: "데이터 없음" };

  const xkt015Aggregated = aggregateStations(allStations, wardName);
  const xkt015Map = buildXkt015Map(xkt015Aggregated);


  
  
  // 1. N02 역 마스터 기반 조회
  const masterStations = getStationsByWard(wardCode);
  
  const stationsMap = new Map();
  for (const ms of masterStations) {
    const aliasName = resolveXkt015Name(ms.name);
    stationsMap.set(ms.name, {
      name: ms.name,
      lat: ms.lat,
      lon: ms.lon,
      line: ms.line,
      passengers_daily: xkt015Map.get(aliasName) || 0,
      coord: [ms.lon, ms.lat],
      year: "latest_in_S12",
      is_master: true
    });
  }

  // 2. Fallback: 기존 STATION_ADMIN_WARD에 등록된 역 중 마스터에 없는 역 추가
  // 타일 API가 인접 구 역을 무분별하게 가져오므로, N02에 없으면 명시적 매핑만 허용
  for (const fallback of xkt015Aggregated) {
    if (!stationsMap.has(fallback.name) && STATION_ADMIN_WARD[fallback.name] === wardName) {
      stationsMap.set(fallback.name, {
        name: fallback.name,
        lat: null,
        lon: null,
        line: fallback.line,
        passengers_daily: fallback.passengers_daily,
        coord: null,
        year: "latest_in_S12",
        is_master: false
      });
    }
  }

  const stations = Array.from(stationsMap.values())
    .filter(s => s.passengers_daily > 0 || s.is_master) // 데이터가 없더라도 마스터 역은 포함
    .sort((a, b) => b.passengers_daily - a.passengers_daily);

  const total = stations.reduce((s, st) => s + st.passengers_daily, 0);

  return {
    ward: wardName, type: "station",
    station_count: stations.length,
    total_daily_passengers: total,
    stations: stations.slice(0, 30), // 최대 30개로 넉넉하게
    top_station: stations[0] ?? null,
    fetched_at: new Date().toISOString().slice(0, 10),
    source: "MLIT N02 Master + XKT015 API",
    note: "N02 역 마스터 기반 정확한 구 소속 매핑 적용됨. STATION_ADMIN_WARD는 fallback으로만 사용.",
    xkt015_keys: Array.from(xkt015Map.keys()),
    master_stations: Array.from(stationsMap.values()).filter(s => s.is_master),
    tile_sources
  };
}

/** XKT013: 장래 추계 인구 (250m 메시) */
// XKT013 메시 = 보조. 구별 인구 SSOT = benchmarks.population_forecast (jukiren+ipss).
async function collectPopulation(wardName, noCache = false) {
  const tiles = getWardPopulationTiles(wardName);
  const usesPreset = Boolean(WARD_POPULATION_TILE_PRESETS[wardName]);

  const allMesh = [];
  for (const { z, x, y } of tiles) {
    const cacheKey = `population-${wardName}-${z}_${x}_${y}`;
    const params = new URLSearchParams({
      response_format: "geojson",
      z: String(z), x: String(x), y: String(y),
    });
    const raw = await cachedFetch(cacheKey,
      () => apiFetch(`${ENDPOINTS.population}?${params}`), noCache);
    allMesh.push(...(raw?.features ?? []));
    if (tiles.length > 1) await sleep(300);
  }

  if (!allMesh.length) return { ward: wardName, type: "population", count: 0, note: "데이터 없음" };

  // 연도별 인구 집계 (2020, 2025, 2030, 2035, 2040, 2045, 2050)
  const years = [2020, 2025, 2030, 2035, 2040, 2045, 2050];
  const popByYear = {};

  for (const yr of years) {
    const total = allMesh.reduce((s, f) => s + popForYear(f.properties ?? {}, yr), 0);
    if (total > 0) popByYear[yr] = Math.round(total);
  }

  // 2020→2040 변화율
  const pop2020 = popByYear[2020] ?? 0;
  const pop2040 = popByYear[2040] ?? 0;
  const changeRate = pop2020 > 0
    ? Math.round((pop2040 - pop2020) / pop2020 * 1000) / 10
    : null;

  const meshCoverageWarning = allMesh.length < 100 || usesPreset;

  return {
    ward: wardName, type: "population",
    mesh_count: allMesh.length,
    population_by_year: popByYear,
    change_rate_2020_2040: changeRate !== null ? `${changeRate}%` : "データなし",
    mesh_coverage_warning: meshCoverageWarning,
    mesh_note: meshCoverageWarning
      ? `메시 ${allMesh.length}개 — 타일 샘플 기반. 행정구 전체와 불일치 가능. change_pct는 참고값.`
      : null,
    population_tile_preset: usesPreset,
    note: "250mメッシュ集計値 — 行政区域と完全一致しない場合あり",
    fetched_at: new Date().toISOString().slice(0, 10),
    source: "MLIT XKT013 API [1차 확인] A계층",
  };
}

/** XKT025/026/027/028/029: 재해 리스크 통합 */
async function collectDisaster(wardName, noCache = false) {
  const tiles = getWardTiles(wardName);

  const results = {};

  const disasterTypes = {
    liquefaction: { endpoint: ENDPOINTS.disaster_liquefaction, label: "액상화 발생 경향" },
    flood:        { endpoint: ENDPOINTS.disaster_flood,        label: "홍수 침수 상정" },
    storm_surge:  { endpoint: ENDPOINTS.disaster_storm_surge,  label: "고조 침수 상정" },
    tsunami:      { endpoint: ENDPOINTS.disaster_tsunami,      label: "쓰나미 침수 상정" },
    landslide:    { endpoint: ENDPOINTS.disaster_landslide,    label: "토사재해 경계구역" },
  };

  for (const [type, { endpoint, label }] of Object.entries(disasterTypes)) {
    const features = [];
    for (const { z, x, y } of tiles) {
      const cacheKey = `disaster-${type}-${wardName}-${z}_${x}_${y}`;
      const params = new URLSearchParams({
        response_format: "geojson",
        z: String(z), x: String(x), y: String(y),
      });
      try {
        const raw = await cachedFetch(cacheKey,
          () => apiFetch(`${endpoint}?${params}`), noCache);
        features.push(...(raw?.features ?? []));
      } catch (e) {
        process.stderr.write(`  ⚠️  ${label} 취득 실패: ${e.message}\n`);
      }
      if (tiles.length > 1) await sleep(300);
    }

    results[type] = {
      label,
      feature_count: features.length,
      has_risk: features.length > 0,
      // 침수 깊이 분포 (홍수·고조·쓰나미의 경우)
      depth_classes: type !== "liquefaction" && type !== "landslide"
        ? summarizeDepthClasses(features)
        : null,
      // 액상화의 경우 위험도 등급 분포
      risk_grades: type === "liquefaction"
        ? summarizeLiquefactionGrades(features)
        : null,
    };

    await sleep(200);
  }

  return {
    ward: wardName, type: "disaster",
    summary: Object.fromEntries(
      Object.entries(results).map(([k, v]) => [k, v.has_risk ? "⚠️ 리스크 있음" : "✅ 데이터 없음"])
    ),
    detail: results,
    fetched_at: new Date().toISOString().slice(0, 10),
    source: "MLIT XKT025~029 API [1차 확인] A계층",
  };
}

/** XST001: 재해 이력 */
async function collectDisasterHistory(wardName, noCache = false) {
  const tiles = getWardTiles(wardName);
  const mun = getMunicipality({ name_ja: wardName });
  const targetCityCode = mun?.code || WARD_CODE[wardName];
  const targetPrefCity = mun ? mun.prefecture_ja + mun.name_ja : "東京都" + wardName;

  const features = [];
  for (const { z, x, y } of tiles) {
    const cacheKey = `disaster_history-${wardName}-${z}_${x}_${y}`;
    const params = new URLSearchParams({
      response_format: "geojson",
      z: String(z), x: String(x), y: String(y),
    });
    try {
      const raw = await cachedFetch(cacheKey,
        () => apiFetch(`${ENDPOINTS.disaster_history}?${params}`), noCache);
      const tileFeatures = raw?.features ?? [];
      for (const f of tileFeatures) {
        const p = f.properties ?? {};
        if (p.city_code && p.city_code !== targetCityCode) continue;
        if (p.prefecture_and_city && p.prefecture_and_city !== targetPrefCity) continue;
        features.push(f);
      }
    } catch (e) {
      process.stderr.write(`  ⚠️  재해 이력 취득 실패: ${e.message}\n`);
    }
    if (tiles.length > 1) await sleep(300);
  }

  const uniqueFeaturesMap = new Map();
  for (const f of features) {
    const p = f.properties ?? {};
    const id = p._id || JSON.stringify(p);
    uniqueFeaturesMap.set(id, p);
  }
  const uniqueProps = Array.from(uniqueFeaturesMap.values());

  const events = [];
  let lastFloodYear = null;
  let floodEvents = 0;

  for (const p of uniqueProps) {
    events.push({
      disaster_name: p.disaster_name_ja,
      disaster_date: p.disaster_date,
      disaster_source: p.disaster_source
    });
    if (p.disastertype_code === "11" || (p.disaster_name_ja && p.disaster_name_ja.includes("浸水"))) {
      floodEvents++;
      const year = p.disaster_date ? parseInt(p.disaster_date.slice(0, 4), 10) : null;
      if (year && (!lastFloodYear || year > lastFloodYear)) {
        lastFloodYear = year;
      }
    }
  }

  const hasHistory = uniqueProps.length > 0;
  let coverageStatus = "surveyed";
  let coverageNote = "타일 내 과거 재해 이력 데이터 조회됨.";
  if (!hasHistory) {
    coverageStatus = "no_data";
    coverageNote = "이 구역에 등록된 재해 이력 없음 (또는 미조사).";
  }

  return {
    ward: wardName, type: "disaster_history",
    coverage_status: coverageStatus,
    coverage_note: coverageNote,
    coverage_warning: !hasHistory,
    summary: {
      has_history: hasHistory,
      total_events: uniqueProps.length,
      flood_events: floodEvents,
      last_flood_year: lastFloodYear,
    },
    detail: { events },
    fetched_at: new Date().toISOString().slice(0, 10),
    source: "MLIT XST001 API",
  };
}

/** XGT001: 긴급대피장소 */
async function collectEvacuationSites(wardName, noCache = false) {
  const tiles = getWardTiles(wardName);
  const mun = getMunicipality({ name_ja: wardName });
  const targetCityCode = mun?.code || WARD_CODE[wardName];
  const targetPrefCity = (mun?.prefecture_ja || "東京都") + wardName;

  const features = [];
  for (const { z, x, y } of tiles) {
    const cacheKey = `evacuation_sites-${wardName}-${z}_${x}_${y}`;
    const params = new URLSearchParams({
      response_format: "geojson",
      z: String(z), x: String(x), y: String(y),
    });
    try {
      const raw = await cachedFetch(cacheKey,
        () => apiFetch(`${ENDPOINTS.evacuation_sites}?${params}`), noCache);
      const tileFeatures = raw?.features ?? [];
      for (const f of tileFeatures) {
        const p = f.properties ?? {};
        if (p.city_code && p.city_code !== targetCityCode) continue;
        if (p.address_ja && !p.address_ja.startsWith(targetPrefCity)) continue;
        features.push(f);
      }
    } catch (e) {
      process.stderr.write(`  ⚠️  대피장소 취득 실패: ${e.message}\n`);
    }
    if (tiles.length > 1) await sleep(300);
  }

  const uniqueFeaturesMap = new Map();
  for (const f of features) {
    const p = f.properties ?? {};
    const id = p.common_id || p._id || JSON.stringify(p);
    uniqueFeaturesMap.set(id, p);
  }
  const uniqueProps = Array.from(uniqueFeaturesMap.values());

  let totalCapacity = null;
  let floodSites = 0;
  let earthquakeSites = 0;
  let tsunamiSites = 0;
  let landslideSites = 0;
  let stormSurgeSites = 0;
  let largeFireSites = 0;

  for (const p of uniqueProps) {
    if (p.flood_flag) floodSites++;
    if (p.earthquake_flag) earthquakeSites++;
    if (p.tsunami_flag) tsunamiSites++;
    if (p.landslide_flag) landslideSites++;
    if (p.high_tide_flag) stormSurgeSites++;
    if (p.large_fire_flag) largeFireSites++;
  }

  return {
    ward: wardName, type: "evacuation_sites",
    summary: {
      site_count: uniqueProps.length,
      total_capacity: totalCapacity,
      capacity_note: "MLIT XGT001 API는 대피소 수용 인원(capacity) 정보를 제공하지 않음.",
      by_disaster_type: {
        flood: floodSites,
        earthquake: earthquakeSites,
        tsunami: tsunamiSites,
        landslide: landslideSites,
        storm_surge: stormSurgeSites,
        large_fire: largeFireSites
      }
    },
    fetched_at: new Date().toISOString().slice(0, 10),
    source: "MLIT XGT001 API",
  };
}

function summarizeDepthClasses(features) {
  const classes = {};
  for (const f of features) {
    const p = f.properties ?? {};
    // 침수 깊이 클래스 (API별로 속성명 다름)
    const cls = p.depth_class || p.浸水深 || p.A31_004 || p.A33_005 || "不明";
    classes[cls] = (classes[cls] || 0) + 1;
  }
  return classes;
}

function summarizeLiquefactionGrades(features) {
  const grades = {};
  for (const f of features) {
    const p = f.properties ?? {};
    const g = p.grade || p.危険度区分 || p.A55_003 || "不明";
    grades[g] = (grades[g] || 0) + 1;
  }
  return grades;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// XKT013 연도별 인구 속성 (API 응답 검증 2026-06-17)
const POPULATION_YEAR_KEYS = {
  2020: ["PTN_2020", "PT00_2020"],
  2025: ["PT00_2025", "PTN_2025"],
  2030: ["PT00_2030", "PTN_2030"],
  2035: ["PT00_2035", "PTN_2035"],
  2040: ["PT00_2040", "PTN_2040"],
  2045: ["PT00_2045", "PTN_2045"],
  2050: ["PT00_2050", "PTN_2050"],
};

function popForYear(properties, year) {
  const keys = POPULATION_YEAR_KEYS[year] ?? [`PT00_${year}`, `PTN_${year}`, String(year)];
  for (const key of keys) {
    const v = +properties[key];
    if (v > 0) return v;
  }
  return 0;
}

function parseLandPriceYen(properties) {
  const p = properties ?? {};
  const raw = p.u_current_years_price_ja ?? p.L01_006 ?? p.価格 ?? "";
  if (typeof raw === "number" && raw > 0) return raw;
  const m = String(raw).replace(/,/g, "").match(/(\d+)/);
  return m ? +m[1] : 0;
}

const STATION_PASSENGER_FIELDS = [
  "S12_057", "S12_053", "S12_049", "S12_045", "S12_041",
  "S12_037", "S12_033", "S12_029", "S12_025", "S12_021",
  "S12_017", "S12_013", "S12_009",
];

function parseStationPassengers(properties) {
  const p = properties ?? {};
  for (const key of STATION_PASSENGER_FIELDS) {
    const v = +p[key];
    if (v > 0) return Math.round(v);
  }
  return Math.round(+p.N05_005 || +p.乗降客数 || 0);
}

function combineStationPassengers(current, daily) {
  // 20万+/일은 역 전체 합계가 한 노선에 중복 기재된 경우가 많음 → max
  if (daily >= 200000) return Math.max(current, daily);
  return current + daily;
}

const STATION_ADMIN_WARD = {
  "北千住": "足立区",
  "綾瀬": "足立区",
  "小菅": "足立区",
  "四ツ木": "葛飾区",
  "赤羽": "北区",
  "赤羽岩淵": "北区",
  "王子": "北区",
  "田端": "北区",
  "西ケ原": "北区",
  "上中里": "北区",
  "東十条": "北区",
  "池袋": "豊島区",
  "目白": "豊島区",
  "駒込": "豊島区",
  "巣鴨": "豊島区",
  "大塚": "豊島区",
  "高田馬場": "新宿区",
  "新大久保": "新宿区",
  "代々木": "渋谷区",
  "原宿": "渋谷区",
  "恵比寿": "渋谷区",
  "渋谷": "渋谷区",
  "小竹向原": "練馬区",
  "練馬": "練馬区",
  "石神井公園": "練馬区",
  "上野": "台東区",
  "御徒町": "台東区",
  "鶯谷": "台東区",
  "浅草": "台東区",
  "南千住": "荒川区",
  "東京": "千代田区",
  "秋葉原": "台東区",
  "新宿": "新宿区",
  "西日暮里": "荒川区",
  "新小岩": "葛飾区",
  "押上": "墨田区",
  "浅草橋": "台東区",
  "神田": "千代田区",
};

function aggregateStations(features, wardName = null) {
  const byName = new Map();
  for (const f of features) {
    const p = f.properties ?? {};
    const name = p.S12_001_ja || p.N05_011 || p.駅名 || "不明";
    if (wardName && STATION_ADMIN_WARD[name] && STATION_ADMIN_WARD[name] !== wardName) {
      continue;
    }
    const line = p.S12_003_ja || p.S12_002_ja || p.N05_002 || p.路線名 || "不明";
    const daily = parseStationPassengers(p);
    if (daily <= 0) continue;
    if (!byName.has(name)) {
      byName.set(name, {
        name,
        line,
        passengers_daily: daily,
        lines: [line],
      });
    } else {
      const cur = byName.get(name);
      cur.passengers_daily = combineStationPassengers(cur.passengers_daily, daily);
      cur.lines.push(line);
      cur.line = cur.lines.slice(0, 2).join(" / ");
    }
  }
  return [...byName.values()].sort((a, b) => b.passengers_daily - a.passengers_daily);
}

// ─────────────────────────────────────────────────────────────────────────────
// benchmarks.json 내보내기
// ─────────────────────────────────────────────────────────────────────────────

async function exportBenchmarks(wards, year = 2025, noCache = false) {
  console.log("\n📊 benchmarks.json 업데이트 스니펫 생성 중...\n");

  const snippets = { mlit_mansion: {}, station: {}, disaster_summary: {} };

  for (const ward of wards) {
    process.stderr.write(`\n▶ ${ward}\n`);

    // 성약가
    try {
      const p = await collectPrice(ward, year, null, noCache);
      if (p.count > 0) {
        snippets.mlit_mansion[ward] = {
          ward_avg_sqm: p.ward_avg_sqm,
          est_70sqm: p.est_70sqm,
          count: p.count,
        };
      }
    } catch(e) { process.stderr.write(`  price 오류: ${e.message}\n`); }

    await sleep(500);

    // 역별 승하차
    try {
      const s = await collectStation(ward, noCache);
      if (s.station_count > 0) {
        snippets.station[ward] = {
          top_station: s.top_station?.name,
          top_passengers: s.top_station?.passengers_daily,
          total_daily: s.total_daily_passengers,
          station_count: s.station_count,
        };
      }
    } catch(e) { process.stderr.write(`  station 오류: ${e.message}\n`); }

    await sleep(500);
  }

  console.log("─".repeat(60));
  console.log("📋 아래 내용을 docs/verification/tokyo-ward-series-benchmarks.json에 추가:");
  console.log("─".repeat(60));

  if (Object.keys(snippets.mlit_mansion).length) {
    console.log('\n// mlit_mansion_2025_q1_q4.wards 에 추가:');
    for (const [ward, data] of Object.entries(snippets.mlit_mansion)) {
      console.log(`  "${ward}": { "ward_avg_sqm": ${data.ward_avg_sqm}, "est_70sqm": ${data.est_70sqm}, "count": ${data.count} },`);
    }
  }

  if (Object.keys(snippets.station).length) {
    console.log('\n// station_passengers 섹션 신규 추가:');
    console.log('"station_passengers": {');
    for (const [ward, data] of Object.entries(snippets.station)) {
      console.log(`  "${ward}": { "top_station": "${data.top_station}", "top_passengers": ${data.top_passengers}, "total_daily": ${data.total_daily} },`);
    }
    console.log('}');
  }

  console.log("\n✅ 모든 수치: MLIT API 직접 수집 [1차 확인] A계층");
}

// ─────────────────────────────────────────────────────────────────────────────
// 출력 포매터
// ─────────────────────────────────────────────────────────────────────────────

function printResult(result) {
  if (!result) return;
  const sep = "═".repeat(60);

  console.log(`\n${sep}`);
  console.log(`🏙️  ${result.ward} — ${result.type.toUpperCase()}`);
  console.log(sep);

  switch (result.type) {
    case "price": {
      if (result.count === 0) { console.log("  데이터 없음"); break; }
      console.log(`  건수:        ${result.count}건`);
      console.log(`  평균 ㎡단가: ${result.ward_avg_sqm} 万円/㎡`);
      console.log(`  70㎡ 환산:   ${result.est_70sqm} 万円`);
      console.log(`  단가 범위:   ${result.unit_price_stats.min} ~ ${result.unit_price_stats.max} 万円/㎡`);
      console.log(`  중앙값:      ${result.unit_price_stats.median} 万円/㎡`);
      console.log("\n  📍 町名별 상위 10 (㎡단가):");
      for (const s of (result.districts ?? []).slice(0, 10)) {
        console.log(`    ${s.name.padEnd(10)} ${s.count}건 / ${s.avg_sqm}万/㎡`);
      }
      console.log("\n  📐 면적대별 단가:");
      for (const [band, st] of Object.entries(result.area_band_unit_price)) {
        if (st.count > 0) console.log(`    ${band}: ${st.avg}万/㎡ (${st.count}건)`);
      }
      break;
    }
    case "landprice": {
      if (result.point_count === 0) { console.log("  데이터 없음"); break; }
      console.log(`  지점 수:     ${result.point_count}포인트`);
      console.log(`  평균 지가:   ${result.price_stats.avg.toLocaleString()} 円/㎡`);
      console.log(`  범위:        ${result.price_stats.min?.toLocaleString()} ~ ${result.price_stats.max?.toLocaleString()} 円/㎡`);
      if (result.avg_change_rate !== null)
        console.log(`  평균 변동율: ${result.avg_change_rate}%`);
      break;
    }
    case "price-point": {
      if (result.count === 0) { console.log("  데이터 없음"); break; }
      console.log(`  수집 포인트: ${result.count}건`);
      console.log(`  평균 ㎡단가: ${result.ward_avg_sqm} 万円/㎡`);
      console.log(`  70㎡ 환산:   ${result.est_70sqm} 万円`);
      console.log(`  GeoJSON:     ${result.geojson_path}`);
      break;
    }
    case "appraisal": {
      if (result.count === 0) { console.log("  데이터 없음"); break; }
      console.log(`  수집 포인트: ${result.count}건`);
      console.log(`  평균 ㎡단가: ${result.avg_price_sqm.toLocaleString()} 円/㎡`);
      console.log(`  평균 변동율: ${result.avg_change_rate}%`);
      console.log(`  JSON 경로:   ${result.json_path}`);
      break;
    }
    case "station": {
      if (result.station_count === 0) { console.log("  데이터 없음"); break; }
      console.log(`  역 수:       ${result.station_count}역`);
      console.log(`  일 총 승하차: ${result.total_daily_passengers.toLocaleString()}명`);
      console.log("\n  🚉 역별 승하차 (상위):");
      for (const s of result.stations.slice(0, 10)) {
        console.log(`    ${s.name.padEnd(10)} ${s.passengers_daily.toLocaleString()}명/일  (${s.line})`);
      }
      break;
    }
    case "population": {
      console.log(`  메시 수:     ${result.mesh_count}`);
      console.log(`  2020→2040 변화: ${result.change_rate_2020_2040}`);
      console.log("\n  📈 연도별 추계:");
      for (const [yr, pop] of Object.entries(result.population_by_year)) {
        console.log(`    ${yr}년: ${pop.toLocaleString()}명`);
      }
      break;
    }
    case "disaster": {
      console.log("  🚨 리스크 요약:");
      for (const [k, v] of Object.entries(result.summary)) {
        console.log(`    ${k.padEnd(15)} ${v}`);
      }
      break;
    }
  }

  if (result.source) console.log(`\n  출처: ${result.source}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 도움말
// ─────────────────────────────────────────────────────────────────────────────

function printHelp() {
  console.log(`
mlit-collector.mjs — MLIT 불동산 정보 라이브러리 통합 수집·분석

사용법:
  node scripts/mlit-collector.mjs --type <타입> --ward <구명> [옵션]
  node scripts/mlit-collector.mjs --type <타입> --episode <ep0N> [옵션]
  node scripts/mlit-collector.mjs --export-benchmarks --episode <ep0N>

데이터 타입 (--type):
  price       맨션 성약가 (XIT001) — 역별·면적별 집계 포함
  price-point 부동산 거래가격 포인트 (XPT001) — GeoJSON 생성
  appraisal   부동산 감정평가 (XCT001) — 지가·변동율
  landprice   지가공시 포인트 (XPT002) — 지가·변동율
  station     역별 승하차 인원 (XKT015)
  population  장래 추계 인구 (XKT013) — 2020~2050
  disaster    재해 리스크 통합 (XKT025~029) — 액상화·홍수·고조·쓰나미·토사
  all         price, landprice, station, population, disaster 5종 전체 수집

구 지정:
  --ward <구명>       단일 구 (예: 台東区)
  --episode <ep0N>   에피소드 묶음 (ep01~ep09)

옵션:
  --year <년>         연도 (기본: 2025, price/landprice에서 사용)
  --quarter <1~4>     분기 (price에서만)
  --no-cache          캐시 무시하고 재수집
  --json              결과를 JSON으로 출력 (파이프 가능)
  --export-benchmarks benchmarks.json 업데이트 스니펫 출력
  --help              이 도움말

예시:
  # Ep.07 성약가 수집
  node scripts/mlit-collector.mjs --type price --episode ep07

  # 江東区 전체 분석
  node scripts/mlit-collector.mjs --type all --ward 江東区

  # 재해 리스크만
  node scripts/mlit-collector.mjs --type disaster --ward 墨田区

  # Ep.07 benchmarks.json 스니펫 생성
  node scripts/mlit-collector.mjs --export-benchmarks --episode ep07

  # 타일 커버리지·역 집계 감사 (WARD_BOUNDS 확장 시)
  node scripts/audit-ward-tiles.mjs --episode ep08

  # JSON 출력 (다른 스크립트에 파이프)
  node scripts/mlit-collector.mjs --type price --ward 台東区 --json > taito-price.json

에피소드 구성:
${Object.entries(EPISODE_WARDS).map(([ep, wards]) => `  ${ep}: ${wards.join(", ")}`).join("\n")}

구 코드:
${Object.entries(WARD_CODE).map(([k,v]) => `  ${k}: ${v}`).join("\n")}
`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 메인
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  await loadEnv();

  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) { printHelp(); return; }

  const getArg = f => { const i = argv.indexOf(f); return i !== -1 ? argv[i+1] : null; };
  const hasFlag = f => argv.includes(f);

  const type      = getArg("--type") ?? "price";
  const wardArg   = getArg("--ward") || getArg("--municipality");
  const epArg     = getArg("--episode")?.toLowerCase();
  const regionArg = getArg("--region");
  const year      = parseInt(getArg("--year") ?? "2025", 10);
  const quarter   = getArg("--quarter") ? parseInt(getArg("--quarter"), 10) : null;
  const priceClassification = getArg("--price-classification") ?? "02";
  const noCache   = hasFlag("--no-cache");
  const jsonOut   = hasFlag("--json");
  const exportBm  = hasFlag("--export-benchmarks");

  // 대상 구 목록 결정
  let wards = [];
  if (regionArg) {
    const codes = listRegion(regionArg);
    wards = codes.map(c => getMunicipality({ code: c }).name_ja);
  } else if (wardArg) {
    wards = [wardArg];
  } else if (epArg) {
    wards = EPISODE_WARDS[epArg];
    if (!wards) { console.error(`❌ 알 수 없는 에피소드: ${epArg}`); process.exit(1); }
  } else if (!exportBm) {
    console.error("❌ --ward, --municipality, --region, 또는 --episode 를 지정하세요.");
    console.error("   node scripts/mlit-collector.mjs --help");
    process.exit(1);
  }

  // validate unknown municipalities
  for (const w of wards) {
    if (!getMunicipality({ name_ja: w })) {
      console.error(`❌ Registry에 미등록된 Municipality(구/시/정/촌): ${w}`);
      process.exit(1);
    }
  }

  // benchmarks 내보내기 모드
  if (exportBm) {
    if (!wards.length) { console.error("❌ --episode 또는 --ward 필요"); process.exit(1); }
    await exportBenchmarks(wards, year, noCache);
    return;
  }

  // 수집 타입별 실행
  const COLLECTORS = {
    price:      w => collectPrice(w, year, quarter, noCache, priceClassification),
    "price-point": w => collectPricePoints(w, year, noCache, priceClassification),
    appraisal:  w => collectAppraisal(w, year, noCache),
    landprice:  w => collectLandPrice(w, year, noCache),
    station:    w => collectStation(w, noCache),
    population: w => collectPopulation(w, noCache),
    disaster:   w => collectDisaster(w, noCache),
    "disaster-history": w => collectDisasterHistory(w, noCache),
    "evacuation-sites": w => collectEvacuationSites(w, noCache),
  };

  const allResults = [];

  for (const ward of wards) {
    const types = type === "all"
      ? ["price", "landprice", "station", "population", "disaster"]
      : [type];

    for (const t of types) {
      const collector = COLLECTORS[t];
      if (!collector) { console.error(`❌ 알 수 없는 타입: ${t}`); continue; }

      try {
        const result = await collector(ward);
        allResults.push(result);
        if (!jsonOut) printResult(result);
      } catch (e) {
        console.error(`❌ ${ward} ${t} 오류: ${e.message}`);
      }

      // API 레이트 리밋 대응
      if (wards.length > 1 || type === "all") await sleep(500);
    }
  }

  if (jsonOut) {
    console.log(JSON.stringify(allResults.length === 1 ? allResults[0] : allResults, null, 2));
  } else {
    console.log("\n" + "═".repeat(60));
    console.log(`✅ 완료: ${allResults.length}건 수집`);
    console.log(`   캐시 위치: ${CACHE_DIR}`);
    if (allResults.some(r => r?.source?.includes("A계층")))
      console.log("   출처 등급: [1차 확인] A계층 — benchmarks.json 등록 가능");
  }
}

const isMain =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  main().catch(err => {
    console.error("치명적 오류:", err.message);
    process.exit(2);
  });
}


/** XKT014, XKT023, XKT024, XKT030: 도시계획 (방화지역, 지구계획, 고도이용지구, 도시계획도로) */
async function collectUrbanPlanning(wardName, noCache = false) {
  const tiles = getWardTiles(wardName);
  const mun = getMunicipality({ name_ja: wardName });
  const targetCityCode = mun?.code || WARD_CODE[wardName];
  const wardPolygons = getWardPolygons(wardName);
  const wardAreaSqm = wardPolygons.reduce((sum, p) => sum + turf.area(p), 0);

  const results = {};

  const urbanTypes = {
    fire_prevention_zone: { endpoint: ENDPOINTS.urban_fire, label: "방화·준방화지역 (XKT014)", useCityCode: true },
    district_plan_zones:  { endpoint: ENDPOINTS.district_plan, label: "지구계획 (XKT023)", useCityCode: false },
    high_utilization_zones: { endpoint: ENDPOINTS.high_utilization, label: "고도이용지구 (XKT024)", useCityCode: false },
    urban_road:           { endpoint: ENDPOINTS.urban_road, label: "도시계획도로 (XKT030)", useCityCode: true },
    location_optimize_zones: { endpoint: ENDPOINTS.location_optimization, label: "입지적정화계획구역 (XKT003)", useCityCode: true },
  };

  for (const [typeKey, { endpoint, label, useCityCode }] of Object.entries(urbanTypes)) {
    const featureMap = new Map();
    for (const { z, x, y } of tiles) {
      const cacheKey = `urban-${typeKey}-${wardName}-${z}_${x}_${y}`;
      const params = new URLSearchParams({
        response_format: "geojson",
        z: String(z), x: String(x), y: String(y),
      });
      try {
        const raw = await cachedFetch(cacheKey,
          () => apiFetch(`${endpoint}?${params}`), noCache);
        const tileFeatures = raw?.features ?? [];
        for (const f of tileFeatures) {
          const p = f.properties ?? {};
          const parentCityCode = mun?.parent_city ? getMunicipality({ name_ja: mun.parent_city })?.code : null;
          // Filtering logic: XKT014, XKT030 use city_code. XKT023, XKT024 use city_name
          if (useCityCode) {
            if (p.city_code !== targetCityCode && p.city_code !== parentCityCode && p.city_name !== wardName && p.city_name !== mun?.parent_city) continue;
          } else {
            if (p.city_name !== wardName && p.city_name !== mun?.parent_city) continue;
          }
          if (p._id && !featureMap.has(p._id)) {
            featureMap.set(p._id, f);
          }
        }
      } catch (e) {
        process.stderr.write(`  ⚠️  ${label} 취득 실패: ${e.message}\n`);
      }
      if (tiles.length > 1) await sleep(100);
    }

    const uniqueFeatures = Array.from(featureMap.values());
    const count = uniqueFeatures.length;
    let overlapAreaSqm = 0;
    
    // For fire_prevention_zone, calculate dominant type
    let fireArea = 0;
    let quasiFireArea = 0;

    // Calculate overlap with turf if there are features and it's 014 or 030
    if (count > 0 && (typeKey === "fire_prevention_zone" || typeKey === "urban_road")) {
      for (const f of uniqueFeatures) {
        let featureAreaInWard = 0;
        try {
          // turf.intersect can fail on complex/invalid geometries, use try-catch per feature
          // Since wardPolygons can be multiple, we intersect with each
          for (const wPoly of wardPolygons) {
            const intersection = turf.intersect(turf.featureCollection([f, wPoly]));
            if (intersection) {
              featureAreaInWard += turf.area(intersection);
            }
          }
        } catch (err) {
          // Fallback to feature area if intersection fails
          featureAreaInWard = turf.area(f);
        }
        
        overlapAreaSqm += featureAreaInWard;
        
        if (typeKey === "fire_prevention_zone") {
          const cat = f.properties.fire_prevention_ja;
          if (cat === "防火地域") fireArea += featureAreaInWard;
          else if (cat === "準防火地域") quasiFireArea += featureAreaInWard;
        }
      }
    }

    const resultObj = {
      label,
      feature_count: count,
      has_data: count > 0,
      coverage_status: count > 0 ? "surveyed" : "no_data",
      ...(count === 0 ? { coverage_note: "타일 내 in-ward 데이터 0건. API 커버리지 공백 가능." } : {}),
    };

    if (count > 0) {
      if (typeKey === "fire_prevention_zone") {
        const coveragePct = wardAreaSqm > 0 ? (overlapAreaSqm / wardAreaSqm) * 100 : 0;
        resultObj.coverage_pct = parseFloat(coveragePct.toFixed(1));
        resultObj.dominant_type = fireArea >= quasiFireArea ? "방화지역" : "준방화지역";
      } else if (typeKey === "urban_road") {
        const coveragePct = wardAreaSqm > 0 ? (overlapAreaSqm / wardAreaSqm) * 100 : 0;
        resultObj.urban_road_affected_pct = parseFloat(coveragePct.toFixed(1));
      }
    }

    results[typeKey] = resultObj;

    await sleep(100);
  }

  return {
    ward: wardName, type: "urban_planning",
    summary: Object.fromEntries(
      Object.entries(results).map(([k, v]) => {
        if (!v.has_data) return [k, "⚠️ 0건 (no_data)"];
        if (k === "fire_prevention_zone") return [k, `✅ ${v.feature_count}건 (${v.coverage_pct}% ${v.dominant_type})`];
        if (k === "urban_road") return [k, `✅ ${v.feature_count}건 (${v.urban_road_affected_pct}% 영향)`];
        return [k, `✅ ${v.feature_count}건`];
      })
    ),
    detail: results,
    fetched_at: new Date().toISOString().slice(0, 10),
    source: "MLIT XKT014,023,024,030 API [1차 확인] A계층",
  };
}

async function collectZoning(wardName, noCache = false) {
  const tiles = getWardTiles(wardName);
  const mun = getMunicipality({ name_ja: wardName });
  const targetCityCode = mun?.code || WARD_CODE[wardName];
  const wardPolygons = getWardPolygons(wardName);
  const wardAreaSqm = wardPolygons.reduce((sum, p) => sum + turf.area(p), 0);

  const featureMap = new Map();

  for (const { z, x, y } of tiles) {
    const cacheKey = `zoning-${wardName}-${z}_${x}_${y}`;
    const params = new URLSearchParams({
      response_format: "geojson",
      z: String(z), x: String(x), y: String(y),
    });
    try {
      const raw = await cachedFetch(cacheKey,
        () => apiFetch(`${ENDPOINTS.zoning}?${params}`), noCache);
      const tileFeatures = raw?.features ?? [];
      for (const f of tileFeatures) {
        const p = f.properties ?? {};
        const parentCityCode = mun?.parent_city ? getMunicipality({ name_ja: mun.parent_city })?.code : null;
        if (p.city_code !== targetCityCode && p.city_code !== parentCityCode && p.city_name !== wardName && p.city_name !== mun?.parent_city) continue;
        if (p._id && !featureMap.has(p._id)) {
          featureMap.set(p._id, f);
        }
      }
    } catch (e) {
      process.stderr.write(`  ⚠️  용도지역 취득 실패: ${e.message}\n`);
    }
    if (tiles.length > 1) await sleep(100);
  }

  const uniqueFeatures = Array.from(featureMap.values());
  const count = uniqueFeatures.length;

  const areaByType = {};

  if (count > 0) {
    for (const f of uniqueFeatures) {
      let featureAreaInWard = 0;
      try {
        for (const wPoly of wardPolygons) {
          const intersection = turf.intersect(turf.featureCollection([f, wPoly]));
          if (intersection) {
            featureAreaInWard += turf.area(intersection);
          }
        }
      } catch (err) {
        featureAreaInWard = turf.area(f);
      }
      
      const type = f.properties.use_area_ja || "Unknown";
      if (!areaByType[type]) areaByType[type] = 0;
      areaByType[type] += featureAreaInWard;
    }
  }

  const top3 = Object.entries(areaByType)
    .map(([type, area]) => ({ type, pct: parseFloat((wardAreaSqm > 0 ? (area / wardAreaSqm) * 100 : 0).toFixed(1)) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 3);

  return {
    ward: wardName, type: "zoning",
    summary: count > 0 ? `✅ top3: ${top3.map(t => `${t.type}(${t.pct}%)`).join(", ")}` : "⚠️ 0건 (no_data)",
    top3,
    feature_count: count,
    fetched_at: new Date().toISOString().slice(0, 10),
    source: "MLIT XKT002 [1차 확인] A계층",
  };
}

export {

  collectPrice,
  collectTradePrice,
  collectPricePoints,
  collectAppraisal,
  collectLandPrice,
  collectStation,
  collectPopulation,
  collectDisaster,
  collectUrbanPlanning,
  collectDisasterHistory,
  collectEvacuationSites,
  collectZoning,
  exportBenchmarks,
  EPISODE_WARDS,
  WARD_CODE,
  CACHE_DIR,
  loadEnv,
};
