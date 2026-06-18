import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KANAGAWA_IN = path.resolve(__dirname, '../docs/verification/data/N03-2024/N03-20240101_14.geojson');
const TOKYO_IN = path.resolve(__dirname, '../docs/verification/data/N03-2024/N03-20240101_13.geojson');

const PILOT_OUT = path.resolve(__dirname, '../docs/verification/data/kanagawa-pilot-boundary.geojson');
const KOMAE_OUT = path.resolve(__dirname, '../docs/verification/data/komae-boundary.geojson');

console.log('Loading Kanagawa N03...');
const kanagawa = JSON.parse(fs.readFileSync(KANAGAWA_IN, 'utf-8'));
const pilotKanagawa = kanagawa.features.filter(f => {
  const code = f.properties.N03_007;
  return code === '14103' || code === '14133' || code === '14204';
});

fs.writeFileSync(PILOT_OUT, JSON.stringify({ type: 'FeatureCollection', features: pilotKanagawa }));
console.log(`Saved ${pilotKanagawa.length} features to kanagawa-pilot-boundary.geojson`);

console.log('Loading Tokyo N03...');
const tokyo = JSON.parse(fs.readFileSync(TOKYO_IN, 'utf-8'));
const komae = tokyo.features.filter(f => f.properties.N03_007 === '13219');

fs.writeFileSync(KOMAE_OUT, JSON.stringify({ type: 'FeatureCollection', features: komae }));
console.log(`Saved ${komae.length} features to komae-boundary.geojson`);
