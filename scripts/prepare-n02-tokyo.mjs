import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as turf from '@turf/turf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const N03_PATH = path.resolve(__dirname, '../docs/verification/data/N03-2024/N03-20240101_13.geojson');
const N02_PATH = path.resolve(__dirname, '../docs/verification/data/N02-22/UTF-8/N02-22_Station.geojson');
const OUT_WARDS_PATH = path.resolve(__dirname, '../docs/verification/data/tokyo-wards-boundary.geojson');
const OUT_STATIONS_PATH = path.resolve(__dirname, '../docs/verification/data/n02-stations-tokyo.geojson');

console.log('Loading N03 boundaries...');
const n03Data = JSON.parse(fs.readFileSync(N03_PATH, 'utf-8'));

console.log('Filtering to Tokyo 23 wards...');
const wards23 = n03Data.features.filter(f => {
  const code = parseInt(f.properties.N03_007, 10);
  return code >= 13101 && code <= 13123;
});

// N03 features are sometimes split (e.g. islands, exclaves). Let's group them if needed, or just keep as flat list.
// Keeping as flat list is fine for booleanIntersects.
const wardsGeoJSON = {
  type: "FeatureCollection",
  features: wards23
};

fs.writeFileSync(OUT_WARDS_PATH, JSON.stringify(wardsGeoJSON));
console.log(`Saved ${wards23.length} ward polygons to ${OUT_WARDS_PATH}`);

console.log('Loading N02 stations...');
const n02Data = JSON.parse(fs.readFileSync(N02_PATH, 'utf-8'));

console.log('Filtering and enriching stations in Tokyo 23 wards...');
const tokyoStations = [];

for (const station of n02Data.features) {
  // A station is a LineString. We can check which ward it intersects.
  let matchedWard = null;
  
  // Use a representative point (e.g. first coordinate) to be strict, or booleanIntersects for any overlap.
  // Using centroid is safer because line might slightly cross boundary.
  let pointToCheck;
  if (station.geometry.type === 'LineString') {
    // Get the middle coordinate roughly
    const coords = station.geometry.coordinates;
    pointToCheck = turf.point(coords[Math.floor(coords.length / 2)]);
  } else {
    pointToCheck = turf.centroid(station);
  }

  for (const ward of wards23) {
    if (turf.booleanPointInPolygon(pointToCheck, ward)) {
      matchedWard = ward.properties;
      break;
    }
  }

  if (matchedWard) {
    // Enrich station
    station.properties.ward_code = matchedWard.N03_007;
    station.properties.ward_name = matchedWard.N03_004;
    tokyoStations.push(station);
  }
}

const stationsGeoJSON = {
  type: "FeatureCollection",
  features: tokyoStations
};

fs.writeFileSync(OUT_STATIONS_PATH, JSON.stringify(stationsGeoJSON, null, 2));
console.log(`Saved ${tokyoStations.length} stations to ${OUT_STATIONS_PATH}`);
