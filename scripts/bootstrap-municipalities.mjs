#!/usr/bin/env node
import { parseArgs } from "node:util";
import { readFile } from "node:fs/promises";
import path from "node:path";

const ENDPOINT = "https://www.reinfolib.mlit.go.jp/ex-api/external/XIT002";

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

async function fetchMunicipalities(prefCode, year = 2023) {
  const params = new URLSearchParams({ area: String(prefCode).padStart(2, "0"), year: String(year) });
  const res = await fetch(`${ENDPOINT}?${params}`, {
    headers: { "Ocp-Apim-Subscription-Key": apiKey() }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function main() {
  await loadEnv();
  const { values } = parseArgs({
    options: {
      prefecture: { type: "string" },
      year: { type: "string", default: "2023" }
    }
  });

  if (!values.prefecture) {
    console.error("사용법: node bootstrap-municipalities.mjs --prefecture 14");
    process.exit(1);
  }

  const raw = await fetchMunicipalities(values.prefecture, values.year);
  console.log(JSON.stringify(raw.data, null, 2));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
