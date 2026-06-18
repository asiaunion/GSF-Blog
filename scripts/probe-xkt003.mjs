import { getWardTiles } from "./lib/ward-tiles.mjs";
import { loadEnv } from "./mlit-collector.mjs";
import fs from "fs";

async function probe(ward) {
  const tiles = getWardTiles(ward);
  for (const {z, x, y} of tiles) {
    const url = `https://www.reinfolib.mlit.go.jp/ex-api/external/XKT003?response_format=geojson&z=${z}&x=${x}&y=${y}`;
    const res = await fetch(url, { headers: { "Ocp-Apim-Subscription-Key": process.env.MLIT_API_KEY } });
    if (!res.ok) continue;
    const data = await res.json();
    if (data.features && data.features.length > 0) {
      console.log(`Found data in tile ${z}_${x}_${y} for ${ward}`);
      console.log(JSON.stringify(data.features[0].properties, null, 2));
      return;
    }
  }
  console.log(`No data found for ${ward}`);
}

await loadEnv();
await probe("足立区");
await probe("北区");
