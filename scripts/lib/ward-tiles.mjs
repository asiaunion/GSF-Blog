/**
 * WARD_TILES — MLIT 타일 API(z=14 XYZ)용 구별 커버리지
 *
 * ## 확장 방법
 * 1. `WARD_BOUNDS`에 구의 위경도 bbox(minLat/maxLat/minLon/maxLon) 추가·수정
 *    - 国土地理院 / OpenStreetMap / Google Maps에서 구 경계 대략 확인
 * 2. `node scripts/audit-ward-tiles.mjs --ward <구명>` 로 역 수·top_station 검증
 * 3. bbox가 부족하면 `WARD_TILE_OVERRIDES`에 개별 {z,x,y} 추가
 * 4. `node scripts/sync-mlit-to-benchmarks.mjs --ward <구명> --write` 로 benchmarks 반영
 *
 * 타일 수 = (xMax-xMin+1) × (yMax-yMin+1). zoom=14 타일 1장 ≈ 2.4km².
 * 대형 구(世田谷·大田·練馬·江東 등)는 bbox로 12~24타일이 정상.
 */

import { isPointInWard } from "./ward-polygon.mjs";

export const TILE_ZOOM = 14;

/** @type {Record<string, {minLat:number,maxLat:number,minLon:number,maxLon:number}>} */
export const WARD_BOUNDS = {
  千代田区: { minLat: 35.682, maxLat: 35.698, minLon: 139.738, maxLon: 139.772 },
  中央区: { minLat: 35.658, maxLat: 35.686, minLon: 139.758, maxLon: 139.792 },
  港区: { minLat: 35.638, maxLat: 35.668, minLon: 139.728, maxLon: 139.772 },
  新宿区: { minLat: 35.678, maxLat: 35.712, minLon: 139.682, maxLon: 139.728 },
  文京区: { minLat: 35.698, maxLat: 35.722, minLon: 139.738, maxLon: 139.772 },
  台東区: { minLat: 35.698, maxLat: 35.726, minLon: 139.768, maxLon: 139.798 },
  墨田区: { minLat: 35.698, maxLat: 35.722, minLon: 139.792, maxLon: 139.822 },
  江東区: { minLat: 35.612, maxLat: 35.672, minLon: 139.788, maxLon: 139.882 },
  品川区: { minLat: 35.588, maxLat: 35.628, minLon: 139.708, maxLon: 139.768 },
  目黒区: { minLat: 35.618, maxLat: 35.658, minLon: 139.682, maxLon: 139.718 },
  大田区: { minLat: 35.538, maxLat: 35.596, minLon: 139.678, maxLon: 139.762 },
  世田谷区: { minLat: 35.612, maxLat: 35.672, minLon: 139.578, maxLon: 139.668 },
  渋谷区: { minLat: 35.648, maxLat: 35.678, minLon: 139.682, maxLon: 139.718 },
  中野区: { minLat: 35.692, maxLat: 35.722, minLon: 139.648, maxLon: 139.682 },
  杉並区: { minLat: 35.682, maxLat: 35.718, minLon: 139.612, maxLon: 139.662 },
  豊島区: { minLat: 35.712, maxLat: 35.738, minLon: 139.698, maxLon: 139.728 },
  北区: { minLat: 35.728, maxLat: 35.778, minLon: 139.708, maxLon: 139.768 },
  荒川区: { minLat: 35.718, maxLat: 35.748, minLon: 139.768, maxLon: 139.808 },
  板橋区: { minLat: 35.728, maxLat: 35.796, minLon: 139.644, maxLon: 139.718 },
  練馬区: { minLat: 35.718, maxLat: 35.768, minLon: 139.598, maxLon: 139.678 },
  足立区: { minLat: 35.748, maxLat: 35.798, minLon: 139.748, maxLon: 139.828 },
  葛飾区: { minLat: 35.728, maxLat: 35.768, minLon: 139.828, maxLon: 139.878 },
  江戸川区: { minLat: 35.668, maxLat: 35.728, minLon: 139.848, maxLon: 139.898 },
};

/** bbox로 잡히지 않는 모서리·역 밀집지만 수동 보강 */
export const WARD_TILE_OVERRIDES = {};

/**
 * 인구(XKT013) 전용 타일 — station은 bbox, population은 과대·과소 샘플 방지용 큐레이션.
 * ep07 3구: Claude 지시 좌표 (역 위경도→z14 역산). 출처: docs/cursor-instructions/fix-ward-tiles-ep07.md
 */
// STATION 데이터는 station-master.mjs로 이관. presets는 population 전용.
export const WARD_POPULATION_TILE_PRESETS = {
  北区: [
    { z: 14, x: 14550, y: 6446 },
    { z: 14, x: 14551, y: 6446 },
    { z: 14, x: 14551, y: 6447 },
    { z: 14, x: 14552, y: 6447 },
  ],
  荒川区: [
    { z: 14, x: 14552, y: 6448 },
    { z: 14, x: 14553, y: 6448 },
    { z: 14, x: 14553, y: 6449 },
  ],
  足立区: [
    { z: 14, x: 14553, y: 6446 },
    { z: 14, x: 14554, y: 6446 },
    { z: 14, x: 14554, y: 6447 },
    { z: 14, x: 14555, y: 6445 },
    { z: 14, x: 14555, y: 6446 },
  ],
};

export function lon2tile(lon, z = TILE_ZOOM) {
  return Math.floor(((lon + 180) / 360) * 2 ** z);
}

export function lat2tile(lat, z = TILE_ZOOM) {
  const rad = (lat * Math.PI) / 180;
  return Math.floor(((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 2 ** z);
}

export function tileCenterLatLon(x, y, z = TILE_ZOOM) {
  const cx = x + 0.5;
  const cy = y + 0.5;
  const n = Math.PI - (2.0 * Math.PI * cy) / Math.pow(2.0, z);
  const lat = (180.0 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  const lon = (cx / Math.pow(2.0, z)) * 360.0 - 180.0;
  return { lat, lon };
}

export function tilesForBounds(bounds, z = TILE_ZOOM) {
  const xMin = lon2tile(bounds.minLon, z);
  const xMax = lon2tile(bounds.maxLon, z);
  const yMin = lat2tile(bounds.maxLat, z);
  const yMax = lat2tile(bounds.minLat, z);
  const out = [];
  for (let x = xMin; x <= xMax; x += 1) {
    for (let y = yMin; y <= yMax; y += 1) {
      out.push({ z, x, y });
    }
  }
  return out;
}

function tileKey({ z, x, y }) {
  return `${z}/${x}/${y}`;
}

export function dedupeTiles(tiles) {
  const seen = new Set();
  const out = [];
  for (const t of tiles) {
    const k = tileKey(t);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(t);
  }
  return out.sort((a, b) => a.x - b.x || a.y - b.y);
}

/**
 * @param {string} wardName
 * @returns {{z:number,x:number,y:number}[]}
 */
export function getWardTiles(wardName) {
  const bounds = WARD_BOUNDS[wardName];
  if (!bounds) throw new Error(`WARD_BOUNDS에 없는 구: ${wardName}`);
  const fromBounds = tilesForBounds(bounds, TILE_ZOOM);
  
  // bbox에서 얻은 후보 타일들을 실제 구 행정구역 폴리곤(중심점 기준)으로 필터링
  const filteredBounds = fromBounds.filter(t => {
    const { lat, lon } = tileCenterLatLon(t.x, t.y, t.z);
    return isPointInWard(lat, lon, wardName);
  });

  const extra = WARD_TILE_OVERRIDES[wardName] ?? [];
  return dedupeTiles([...filteredBounds, ...extra]);
}

/** station·disaster·地価 — bbox 기반 */
export function getWardPopulationTiles(wardName) {
  const preset = WARD_POPULATION_TILE_PRESETS[wardName];
  if (preset?.length) return dedupeTiles(preset);
  return getWardTiles(wardName);
}

export function wardTileSummary(wardName) {
  const tiles = getWardTiles(wardName);
  return { ward: wardName, tile_count: tiles.length, tiles };
}
