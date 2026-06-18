import fs from "node:fs";
import path from "node:path";
import * as turf from "@turf/turf";

const BOUNDARY_FILE = path.join(process.cwd(), "docs/verification/data/tokyo-wards-boundary.geojson");

let boundaryGeojson = null;
const wardPolygons = new Map();

function loadBoundaries() {
  if (boundaryGeojson) return;
  if (!fs.existsSync(BOUNDARY_FILE)) {
    throw new Error(`Boundary file not found: ${BOUNDARY_FILE}`);
  }
  const data = fs.readFileSync(BOUNDARY_FILE, "utf-8");
  boundaryGeojson = JSON.parse(data);
  for (const feature of boundaryGeojson.features) {
    const name = feature.properties.N03_004; // 구 이름 (예: "千代田区")
    if (name) {
      if (!wardPolygons.has(name)) {
        wardPolygons.set(name, []);
      }
      wardPolygons.get(name).push(feature);
    }
  }
}

/**
 * 특정 위경도 좌표가 특정 구의 행정구역 폴리곤 내에 있는지 판별
 * @param {number} lat 위도
 * @param {number} lon 경도
 * @param {string} wardName 구 이름 (예: "千代田区")
 * @returns {boolean}
 */
export function isPointInWard(lat, lon, wardName) {
  loadBoundaries();
  const features = wardPolygons.get(wardName);
  if (!features || features.length === 0) {
    throw new Error(`Boundary not found for ward: ${wardName}`);
  }
  const pt = turf.point([lon, lat]);
  for (const feature of features) {
    if (turf.booleanPointInPolygon(pt, feature)) {
      return true;
    }
  }
  return false;
}

/**
 * 특정 구의 행정구역 폴리곤 피처 반환
 * @param {string} wardName 구 이름
 * @returns {import("@turf/helpers").Feature<import("@turf/helpers").Polygon | import("@turf/helpers").MultiPolygon>}
 */
export function getWardPolygons(wardName) {
  loadBoundaries();
  return wardPolygons.get(wardName) || [];
}
