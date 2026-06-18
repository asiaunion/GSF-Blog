import { readFileSync } from "node:fs";
import path from "node:path";

const REGISTRY_PATH = path.join(
  process.cwd(),
  "docs/verification/municipalities.json"
);

let registryCache = null;

export function loadRegistry() {
  if (registryCache) return registryCache;
  const raw = readFileSync(REGISTRY_PATH, "utf8");
  registryCache = JSON.parse(raw);
  return registryCache;
}

/**
 * @param {{code?: string, name_ja?: string}} query
 * @returns {Object|null}
 */
export function getMunicipality({ code, name_ja }) {
  const reg = loadRegistry();
  if (code) {
    const mun = reg.municipalities[code];
    if (mun) return { code, ...mun };
  }
  if (name_ja) {
    const foundCode = Object.keys(reg.municipalities).find(
      (k) => reg.municipalities[k].name_ja === name_ja
    );
    if (foundCode) {
      return { code: foundCode, ...reg.municipalities[foundCode] };
    }
  }
  return null;
}

/**
 * @param {string} regionId
 * @returns {string[]} codes
 */
export function listRegion(regionId) {
  const reg = loadRegistry();
  const region = reg.regions[regionId];
  if (!region) throw new Error(`Unknown region: ${regionId}`);
  return region.codes;
}

/**
 * @param {string} name_ja
 * @returns {Object}
 */
export function getMunicipalityBbox(name_ja) {
  const mun = getMunicipality({ name_ja });
  if (!mun) throw new Error(`Unknown municipality: ${name_ja}`);
  return mun.bbox;
}
