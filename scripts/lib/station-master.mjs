import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const N02_TOKYO_PATH = path.resolve(__dirname, '../../docs/verification/data/n02-stations-tokyo.geojson');
const N02_PILOT_PATH = path.resolve(__dirname, '../../docs/verification/data/n02-stations-kanagawa-komae.geojson');

let n02Features = null;

function loadN02Data() {
  if (n02Features) return;
  n02Features = [];

  for (const p of [N02_TOKYO_PATH, N02_PILOT_PATH]) {
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
      n02Features.push(...data.features);
    }
  }

  if (n02Features.length === 0) {
    throw new Error(`N02 역 데이터 파일을 찾을 수 없습니다. Task 3 및 prepare-n02-region 스크립트를 먼저 실행하세요.`);
  }
}

/**
 * N02 GeoJSON에서 특정 구(wardCode)에 속하는 역 목록을 추출합니다.
 * @param {string|number} wardCode - "13117" 등 5자리 시구정촌 코드
 * @returns {Array<{name: string, lat: number, lon: number, line: string}>}
 */
export function getStationsByWard(wardCode) {
  loadN02Data();
  
  const codeStr = String(wardCode);
  const stations = n02Features.filter(f => f.properties && f.properties.ward_code === codeStr);
  
  const byName = new Map();
  for (const f of stations) {
    const p = f.properties;
    const name = p.N02_005;
    const line = p.N02_003;
    
    // N02의 역 geometry는 LineString이므로 중심점(또는 첫/중간 좌표)을 구합니다.
    let point;
    if (f.geometry.type === 'LineString') {
      const coords = f.geometry.coordinates;
      point = coords[Math.floor(coords.length / 2)];
    } else if (f.geometry.type === 'Point') {
      point = f.geometry.coordinates;
    } else if (f.geometry.type === 'MultiLineString') {
      const coords = f.geometry.coordinates[0];
      point = coords[Math.floor(coords.length / 2)];
    } else {
      continue;
    }
    
    const [lon, lat] = point;
    
    if (!byName.has(name)) {
      byName.set(name, { name, lat, lon, lines: [line] });
    } else {
      if (!byName.get(name).lines.includes(line)) {
        byName.get(name).lines.push(line);
      }
    }
  }
  
  return Array.from(byName.values()).map(s => ({
    name: s.name,
    lat: Math.round(s.lat * 1000000) / 1000000,
    lon: Math.round(s.lon * 1000000) / 1000000,
    line: s.lines.slice(0, 2).join(' / ') // 여러 노선이 겹칠 경우 최대 2개 표시
  }));
}
