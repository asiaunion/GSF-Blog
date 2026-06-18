import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as turf from '@turf/turf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const N02_PATH = path.resolve(__dirname, '../docs/verification/data/N02-22/UTF-8/N02-22_Station.geojson');
const OUT_STATIONS_PATH = path.resolve(__dirname, '../docs/verification/data/n02-stations-tokyo-tama.geojson');

const BOUNDARY_TAMA = path.resolve(__dirname, '../docs/verification/data/tokyo-tama-boundary.geojson');

console.log('Loading N02 stations...');
const n02Data = JSON.parse(fs.readFileSync(N02_PATH, 'utf-8'));

console.log('Loading boundaries...');
const tama = JSON.parse(fs.readFileSync(BOUNDARY_TAMA, 'utf-8'));

const wards = [...tama.features];

console.log('Filtering and enriching stations...');
const regionStations = [];

for (const station of n02Data.features) {
  let matchedWard = null;
  
  let pointToCheck;
  if (station.geometry.type === 'LineString') {
    const coords = station.geometry.coordinates;
    pointToCheck = turf.point(coords[Math.floor(coords.length / 2)]);
  } else {
    pointToCheck = turf.centroid(station);
  }

  for (const ward of wards) {
    if (turf.booleanPointInPolygon(pointToCheck, ward)) {
      matchedWard = ward.properties;
      break;
    }
  }

  if (matchedWard) {
    station.properties.ward_code = matchedWard.registry_code;
    station.properties.ward_name = matchedWard.name_ja;
    regionStations.push(station);
  }
}

const stationsGeoJSON = {
  type: "FeatureCollection",
  features: regionStations
};

fs.writeFileSync(OUT_STATIONS_PATH, JSON.stringify(stationsGeoJSON, null, 2));
console.log(`Saved ${regionStations.length} stations to ${OUT_STATIONS_PATH}`);
