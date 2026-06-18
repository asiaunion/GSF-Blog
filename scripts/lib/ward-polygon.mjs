import { isPointInMunicipality, getMunicipalityPolygons } from "./municipality-polygon.mjs";

/**
 * 특정 위경도 좌표가 특정 구의 행정구역 폴리곤 내에 있는지 판별
 * @param {number} lat 위도
 * @param {number} lon 경도
 * @param {string} wardName 구 이름 (예: "千代田区")
 * @returns {boolean}
 */
export function isPointInWard(lat, lon, wardName) {
  return isPointInMunicipality(lat, lon, wardName);
}

/**
 * 특정 구의 행정구역 폴리곤 피처 반환
 * @param {string} wardName 구 이름
 * @returns {import("@turf/helpers").Feature[]}
 */
export function getWardPolygons(wardName) {
  return getMunicipalityPolygons(wardName);
}
