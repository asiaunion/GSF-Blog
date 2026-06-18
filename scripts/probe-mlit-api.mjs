#!/usr/bin/env node

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { getWardTiles } from "./lib/ward-tiles.mjs";

const BASE = "https://www.reinfolib.mlit.go.jp/ex-api/external";

const WARD_CODE = {
  "千代田区": "13101", "中央区":   "13102", "港区":     "13103",
  "新宿区":   "13104", "文京区":   "13105", "台東区":   "13106",
  "墨田区":   "13107", "江東区":   "13108", "品川区":   "13109",
  "目黒区":   "13110", "大田区":   "13111", "世田谷区": "13112",
  "渋谷区":   "13113", "中野区":   "13114", "杉並区":   "13115",
  "豊島区":   "13116", "北区":     "13117", "荒川区":   "13118",
  "板橋区":   "13119", "練馬区":   "13120", "足立区":   "13121",
  "葛飾区":   "13122", "江戸川区": "13123",
};

async function loadEnv() {
  try {
    const raw = await readFile(path.join(process.cwd(), ".env"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, "");
    }
  } catch { /* ignore */ }
}

function apiKey() {
  const k = process.env.MLIT_API_KEY;
  if (!k) throw new Error("MLIT_API_KEY 미설정");
  return k;
}

async function writeJson(p, data) {
  await mkdir(path.dirname(p), { recursive: true });
  await writeFile(p, JSON.stringify(data, null, 2), "utf8");
}

async function apiFetch(url) {
  const res = await fetch(url, {
    headers: { "Ocp-Apim-Subscription-Key": apiKey() },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  return res.json();
}

async function probe() {
  await loadEnv();
  const args = process.argv.slice(2);
  let endpoint = null;
  let ward = null;
  let zArg = null;
  let year = null;
  let coverageScan = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--endpoint") endpoint = args[++i];
    if (args[i] === "--ward") ward = args[++i];
    if (args[i] === "--z") zArg = args[++i];
    if (args[i] === "--year") year = args[++i];
    if (args[i] === "--coverage-scan") coverageScan = true;
  }

  if (coverageScan && endpoint) {
    const coverage = {};
    for (const w of Object.keys(WARD_CODE)) {
      const tiles = getWardTiles(w);
      if (!tiles.length) continue;
      const { z, x, y } = tiles[0];
      const params = new URLSearchParams({
        response_format: "geojson",
        z: String(z), x: String(x), y: String(y),
      });
      try {
        const res = await apiFetch(`${BASE}/${endpoint}?${params}`);
        if (res && res.features && res.features.length > 0) {
            coverage[w] = "surveyed";
        } else {
            coverage[w] = "empty";
        }
      } catch (e) {
        coverage[w] = "error";
      }
      console.log(`${w}: ${coverage[w]}`);
      await new Promise(r => setTimeout(r, 300));
    }
    const outFile = path.join(process.cwd(), `docs/verification/data/probe-${endpoint.toLowerCase()}-coverage.json`);
    await writeJson(outFile, coverage);
    console.log(`Saved coverage to ${outFile}`);
    return;
  }

  if (!endpoint || !ward) {
    console.error("Usage: node probe-mlit-api.mjs --endpoint XPT001 --ward 北区 [--z 14] [--year 2025]");
    process.exit(1);
  }

  const cityCode = WARD_CODE[ward];
  let resData;
  let cacheName = `probe-${endpoint.toLowerCase()}-${ward}`;

  if (endpoint === "XCT001") {
    const area = cityCode.substring(0, 2);
    const params = new URLSearchParams({ area, division: "00" });
    if (year) params.set("year", year);
    cacheName += `-${area}-00`;
    const url = `${BASE}/${endpoint}?${params}`;
    console.log(`Fetching ${url}`);
    resData = await apiFetch(url);
    if (resData && resData.data) {
      const citySub = cityCode.slice(-3);
      resData.data = resData.data.filter(d => String(d["標準地番号 市区町村コード 市区町村コード"]) === citySub);
    }
  } else if (endpoint === "XPT001") {
    const tiles = getWardTiles(ward);
    const zMatch = zArg ? Number(zArg) : tiles[0].z;
    const tile = tiles.find(t => t.z === zMatch) || tiles[0];
    const params = new URLSearchParams({
      response_format: "geojson",
      z: String(tile.z), x: String(tile.x), y: String(tile.y),
      priceClassification: "02"
    });
    if (year) {
      params.set("from", `${year}1`);
      params.set("to", `${year}4`);
    }
    cacheName += `-${tile.z}_${tile.x}_${tile.y}`;
    const url = `${BASE}/${endpoint}?${params}`;
    console.log(`Fetching ${url}`);
    resData = await apiFetch(url);
  } else if (zArg || ["XKT003", "XGT001", "XST001", "XKT014", "XKT023", "XKT024", "XKT030"].includes(endpoint)) {
    const tiles = getWardTiles(ward);
    const zMatch = zArg ? Number(zArg) : tiles[0].z;
    const tile = tiles.find(t => t.z === zMatch) || tiles[0];
    const params = new URLSearchParams({
      response_format: "geojson",
      z: String(tile.z), x: String(tile.x), y: String(tile.y),
    });
    if (year) params.set("year", year);
    cacheName += `-${tile.z}_${tile.x}_${tile.y}`;
    const url = `${BASE}/${endpoint}?${params}`;
    console.log(`Fetching ${url}`);
    resData = await apiFetch(url);
  } else {
    const params = new URLSearchParams({ city: cityCode });
    if (year) params.set("year", year);
    const url = `${BASE}/${endpoint}?${params}`;
    console.log(`Fetching ${url}`);
    resData = await apiFetch(url);
  }

  const outFile = path.join(process.cwd(), `.cache/mlit/${cacheName}.json`);
  await writeJson(outFile, resData);
  console.log(`Saved to ${outFile}`);
  
  if (resData.features && resData.features.length > 0) {
    console.log("Sample Properties (first feature):", Object.keys(resData.features[0].properties));
  } else if (resData.data && resData.data.length > 0) {
    console.log("Sample Keys (first item):", Object.keys(resData.data[0]));
  } else {
    console.log("No features/data found.");
  }
}

probe().catch(console.error);
