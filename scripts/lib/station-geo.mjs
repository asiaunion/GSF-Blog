import { getStationsByWard } from './station-master.mjs';
import { WARD_CODE } from '../mlit-collector.mjs';

/**
 * 특정 구(wardName)의 특정 역(stationName) 좌표를 반환합니다.
 * @param {string} stationName - 역 이름 (예: "赤羽")
 * @param {string} wardName - 구 이름 (예: "北区")
 * @returns {{name: string, lat: number, lon: number, line: string} | null}
 */
export function getStationCoordinates(stationName, wardName) {
  const wardCode = WARD_CODE[wardName];
  if (!wardCode) {
    throw new Error(`Unknown ward name: ${wardName}`);
  }

  const stations = getStationsByWard(wardCode);
  const target = stations.find(s => s.name === stationName);
  
  return target || null;
}

/**
 * Haversine 공식을 사용하여 두 좌표(위도, 경도) 간의 거리를 미터(m) 단위로 계산합니다.
 */
export function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const toRad = Math.PI / 180;
  
  const dLat = (lat2 - lat1) * toRad;
  const dLon = (lon2 - lon1) * toRad;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}

/**
 * 두 좌표 간의 거리를 도보 분(80m/분)으로 변환합니다.
 */
export function calculateWalkingMinutes(lat1, lon1, lat2, lon2) {
  const distanceMeters = calculateDistanceMeters(lat1, lon1, lat2, lon2);
  return distanceMeters / 80;
}
