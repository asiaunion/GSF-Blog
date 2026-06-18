import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as turf from '@turf/turf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.resolve(__dirname, '../docs/verification/municipalities.json');
const DATA_DIR = path.resolve(__dirname, '../docs/verification/data');

const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));

const targetCodes = ["13219", "14103", "14133", "14204"];

for (const code of targetCodes) {
  const mun = registry.municipalities[code];
  if (!mun) continue;

  const geojsonPath = path.resolve(DATA_DIR, mun.boundary_file);
  const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf-8'));

  const features = geojson.features.filter(f => f.properties[mun.boundary_property] === code || f.properties[mun.boundary_property] === mun.name_ja);

  if (features.length === 0) {
    console.error(`No features found for ${mun.name_ja} in ${mun.boundary_file}`);
    continue;
  }

  // merge all features into a single featurecollection to calculate bbox
  const fc = turf.featureCollection(features);
  const bbox = turf.bbox(fc); // [minX, minY, maxX, maxY] -> [minLon, minLat, maxLon, maxLat]

  mun.bbox = {
    minLat: parseFloat(bbox[1].toFixed(5)),
    maxLat: parseFloat(bbox[3].toFixed(5)),
    minLon: parseFloat(bbox[0].toFixed(5)),
    maxLon: parseFloat(bbox[2].toFixed(5))
  };

  console.log(`Updated bbox for ${mun.name_ja}:`, mun.bbox);
}

fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + '\n');
console.log('Saved municipalities.json');
