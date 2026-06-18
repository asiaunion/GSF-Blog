import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { collectStation, EPISODE_WARDS, WARD_CODE } from './mlit-collector.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
let targetWard = null;
let targetEpisode = null;
let isJson = false;
let noCache = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--ward') targetWard = args[++i];
  if (args[i] === '--episode') targetEpisode = args[++i];
  if (args[i] === '--json') isJson = true;
  if (args[i] === '--no-cache') noCache = true;
}

const ALL_WARDS = Object.keys(WARD_CODE);
let wardsToAudit = ALL_WARDS;

if (targetWard) {
  wardsToAudit = [targetWard];
} else if (targetEpisode) {
  wardsToAudit = EPISODE_WARDS[targetEpisode] || [];
}

function computeFuzzyCandidates(name, keys) {
  const candidates = [];
  // Very basic fuzzy: substring match or overlapping words
  const clean = (s) => s.replace(/駅$/, '').trim();
  const nameClean = clean(name);
  for (const k of keys) {
    const kClean = clean(k);
    if (kClean.includes(nameClean) || nameClean.includes(kClean)) {
      candidates.push(k);
    } else {
      // Levenshtein or just first 2 characters
      if (kClean.length >= 2 && nameClean.length >= 2 && 
         (kClean.startsWith(nameClean.slice(0, 2)) || nameClean.startsWith(kClean.slice(0, 2)))) {
        candidates.push(k);
      }
    }
  }
  return [...new Set(candidates)];
}

async function main() {
  const results = [];
  let total_n02 = 0;
  let total_matched = 0;
  let total_zero = 0;

  for (const ward of wardsToAudit) {
    if (!isJson) console.log(`\n▶ ${ward} 감사 중...`);
    
    // Disable console logging temporarily if json
    const origLog = console.log;
    const origErr = console.error;
    if (isJson) {
      console.log = () => {};
      console.error = () => {};
    }
    
    let res;
    try {
      res = await collectStation(ward, noCache);
    } catch (e) {
      if (isJson) {
        console.log = origLog;
        console.error = origErr;
      }
      console.error(`❌ ${ward} 조회 실패:`, e);
      continue;
    }
    
    if (isJson) {
      console.log = origLog;
      console.error = origErr;
    }

    const masterStations = res.stations.filter(s => s.is_master);
    const n02_count = masterStations.length;
    let matched_exact = 0;
    let matched_alias = 0; // Will be used in Slice 3
    let zero_pax = 0;
    const zero_stations = [];

    const xkt015_keys = res.xkt015_keys || [];

    for (const s of masterStations) {
      if (s.passengers_daily > 0) {
        // In Slice 1, everything matched is exact
        matched_exact++;
      } else {
        zero_pax++;
        zero_stations.push({
          name: s.name,
          lat: s.lat,
          lon: s.lon,
          fuzzy_candidates: computeFuzzyCandidates(s.name, xkt015_keys)
        });
      }
    }

    const match_rate_pct = n02_count > 0 ? Number(((matched_exact + matched_alias) / n02_count * 100).toFixed(1)) : 0;
    
    total_n02 += n02_count;
    total_matched += (matched_exact + matched_alias);
    total_zero += zero_pax;

    const result = {
      ward,
      n02_count,
      matched_exact,
      matched_alias,
      zero_pax,
      match_rate_pct,
      zero_stations,
      top_station: res.top_station?.name || null,
      top_passengers: res.top_station?.passengers_daily || 0
    };

    results.push(result);

    if (!isJson) {
      console.log(`  - N02 역 개수: ${n02_count}`);
      console.log(`  - 매칭 성공: ${matched_exact} (Alias: ${matched_alias})`);
      console.log(`  - Zero Pax (누락): ${zero_pax}`);
      console.log(`  - 매칭률: ${match_rate_pct}%`);
      console.log(`  - Top Station: ${result.top_station} (${result.top_passengers})`);
      if (zero_pax > 0) {
        console.log(`  - Zero Stations:`);
        zero_stations.forEach(zs => {
          console.log(`    * ${zs.name} (fuzzy: ${zs.fuzzy_candidates.join(', ') || 'none'})`);
        });
      }
    }
  }

  if (isJson) {
    console.log(JSON.stringify(results, null, 2));
  } else if (wardsToAudit.length > 1) {
    console.log(`\n======================================`);
    console.log(`종합 통계 (${wardsToAudit.length}개 구)`);
    console.log(`- 전체 N02 역: ${total_n02}`);
    console.log(`- 전체 매칭 성공: ${total_matched}`);
    console.log(`- 전체 Zero Pax: ${total_zero}`);
    const global_rate = total_n02 > 0 ? ((total_matched / total_n02) * 100).toFixed(1) : 0;
    console.log(`- 평균 매칭률: ${global_rate}%`);
    console.log(`======================================\n`);
  }
}

main();
