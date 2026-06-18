import fs from "node:fs";
import path from "node:path";
import * as turf from "@turf/turf";
import { getMunicipality } from "./municipality-registry.mjs";

const DATA_DIR = path.join(process.cwd(), "docs/verification/data");

// Cache geometry collections: Map<filename, any>
const fileCache = new Map();

// Map<name_ja, Feature[]>
const polygonCache = new Map();

function loadPolygonsForMunicipality(name_ja) {
  if (polygonCache.has(name_ja)) return;

  const mun = getMunicipality({ name_ja });
  if (!mun) {
    throw new Error(`Municipality not found in registry: ${name_ja}`);
  }

  const { boundary_file, boundary_property, code } = mun;
  if (!boundary_file) {
    throw new Error(`boundary_file not defined for: ${name_ja}`);
  }

  const filePath = path.join(DATA_DIR, boundary_file);
  
  if (!fileCache.has(boundary_file)) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Boundary file not found: ${filePath}`);
    }
    fileCache.set(boundary_file, JSON.parse(fs.readFileSync(filePath, "utf-8")));
  }

  const geojson = fileCache.get(boundary_file);
  const features = [];
  
  for (const feature of geojson.features) {
    const propVal = feature.properties[boundary_property || "N03_007"];
    if (propVal === name_ja || propVal === code) {
      features.push(feature);
    }
  }

  polygonCache.set(name_ja, features);
}

/**
 * 특정 위경도 좌표가 특정 municipality의 행정구역 폴리곤 내에 있는지 판별
 * @param {number} lat 위도
 * @param {number} lon 경도
 * @param {string} name_ja 이름 (예: "千代田区", "狛江市")
 * @returns {boolean}
 */
export function isPointInMunicipality(lat, lon, name_ja) {
  loadPolygonsForMunicipality(name_ja);
  const features = polygonCache.get(name_ja);
  if (!features || features.length === 0) {
    throw new Error(`Boundary not found for municipality: ${name_ja}`);
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
 * 특정 municipality의 행정구역 폴리곤 피처 반환
 * @param {string} name_ja 이름
 * @returns {import("@turf/helpers").Feature[]}
 */
export function getMunicipalityPolygons(name_ja) {
  loadPolygonsForMunicipality(name_ja);
  return polygonCache.get(name_ja) || [];
}
