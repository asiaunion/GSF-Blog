import { lon2tile, lat2tile, getWardTiles } from './ward-tiles.mjs';
import { getStationsByWard } from './station-master.mjs';

/**
 * 역 위경도를 입력받아 z14 XYZ 타일 좌표 반환
 */
export function getTilesForStation(lat, lon, z = 14) {
  return {
    z,
    x: lon2tile(lon, z),
    y: lat2tile(lat, z)
  };
}

/**
 * 특정 구(wardCode)에 속하는 모든 N02 마스터 역의 타일을 중복 제거하여 반환
 */
export function getStationTilesForWard(wardCode) {
  const stations = getStationsByWard(wardCode);
  const tileSet = new Set();
  const tiles = [];
  
  for (const st of stations) {
    const tile = getTilesForStation(st.lat, st.lon);
    const key = `${tile.z}_${tile.x}_${tile.y}`;
    if (!tileSet.has(key)) {
      tileSet.add(key);
      tiles.push(tile);
    }
  }
  return tiles;
}

/**
 * 기존 폴리곤 구 경계 타일과, N02 마스터 역 타일을 합쳐서 중복 제거
 */
export function unionWardTiles(wardName, wardCode) {
  const polyTiles = getWardTiles(wardName);
  const stationTiles = getStationTilesForWard(wardCode);
  
  const tileSet = new Set();
  const result = [];
  
  for (const t of [...polyTiles, ...stationTiles]) {
    const key = `${t.z}_${t.x}_${t.y}`;
    if (!tileSet.has(key)) {
      tileSet.add(key);
      result.push(t);
    }
  }
  
  return result;
}
