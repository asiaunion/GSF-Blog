import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const aliasesPath = path.join(__dirname, '../../docs/verification/data/station-name-aliases.json');
let aliasData = null;

function loadAliases() {
  if (!aliasData) {
    try {
      if (fs.existsSync(aliasesPath)) {
        aliasData = JSON.parse(fs.readFileSync(aliasesPath, 'utf8')).aliases || {};
      } else {
        aliasData = {};
      }
    } catch {
      aliasData = {};
    }
  }
  return aliasData;
}

export function normalizeStationName(name) {
  if (!name) return "";
  return name.replace(/駅$/, '').replace(/　/g, ' ').trim();
}

export function resolveXkt015Name(n02Name) {
  const aliases = loadAliases();
  const normalized = normalizeStationName(n02Name);
  return aliases[normalized] || normalized;
}

export function buildXkt015Map(aggregatedStationsArray) {
  const map = new Map();
  for (const s of aggregatedStationsArray) {
    map.set(normalizeStationName(s.name), s.passengers_daily);
  }
  return map;
}
