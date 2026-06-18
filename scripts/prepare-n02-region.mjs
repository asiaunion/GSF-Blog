import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as turf from '@turf/turf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const N02_PATH = path.resolve(__dirname, '../docs/verification/data/N02-22/UTF-8/N02-22_Station.geojson');
const OUT_STATIONS_PATH = path.resolve(__dirname, '../docs/verification/data/n02-stations-kanagawa-komae.geojson');

const BOUNDARY_KANAGAWA = path.resolve(__dirname, '../docs/verification/data/kanagawa-pilot-boundary.geojson');
const BOUNDARY_KOMAE = path.resolve(__dirname, '../docs/verification/data/komae-boundary.geojson');

console.log('Loading N02 stations...');
const n02Data = JSON.parse(fs.readFileSync(N02_PATH, 'utf-8'));

console.log('Loading boundaries...');
const kanagawa = JSON.parse(fs.readFileSync(BOUNDARY_KANAGAWA, 'utf-8'));
const komae = JSON.parse(fs.readFileSync(BOUNDARY_KOMAE, 'utf-8'));

const wards = [...kanagawa.features, ...komae.features];

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
    station.properties.ward_code = matchedWard.N03_007;
    station.properties.ward_name = matchedWard.N03_004;
    regionStations.push(station);
  }
}

const stationsGeoJSON = {
  type: "FeatureCollection",
  features: regionStations
};

fs.writeFileSync(OUT_STATIONS_PATH, JSON.stringify(stationsGeoJSON, null, 2));
console.log(`Saved ${regionStations.length} stations to ${OUT_STATIONS_PATH}`);
