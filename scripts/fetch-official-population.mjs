import { read, utils } from 'xlsx';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

async function main() {
  const root = process.cwd();
  const BENCHMARKS = path.join(root, "docs/verification/tokyo-ward-series-benchmarks.json");
  const benchmarks = JSON.parse(await readFile(BENCHMARKS, "utf8"));
  
  const url = "https://www.ipss.go.jp/pp-shicyoson/j/shicyoson23/2gaiyo_hyo/kekkahyo1.xlsx";
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  const workbook = read(buf, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = utils.sheet_to_json(sheet, { header: 1 });
  
  const wards = Object.keys(benchmarks.population_forecast.wards);
  const ep07Wards = ["北区", "荒川区", "足立区"];
  
  for (const row of data) {
    if (!row || row.length < 9) continue;
    
    const pref = row[2];
    const city = row[3];
    
    if (pref === "東京都" && wards.includes(city)) {
      if (ep07Wards.includes(city)) {
        continue;
      }
      
      const pop2020 = parseInt(row[4], 10);
      const pop2040 = parseInt(row[8], 10);
      
      const changePctRaw = ((pop2040 - pop2020) / pop2020) * 100;
      let changePctStr = (Math.round(changePctRaw * 10) / 10).toString();
      // Ensure positive values don't have a plus sign if it's not needed, but keep minus
      // The instructions say "X.X%"
      if (changePctStr === "0" || changePctStr === "-0") changePctStr = "0.0";
      else if (!changePctStr.includes('.')) changePctStr += ".0";
      
      const oldWard = benchmarks.population_forecast.wards[city] || {};
      
      benchmarks.population_forecast.wards[city] = {
        pop_2020: pop2020,
        pop_2040: pop2040,
        change_pct: changePctStr + "%",
        source: "jukiren+ipss",
        source_url: "https://www.ipss.go.jp/pp-shicyoson/j/shicyoson23/t-page.asp",
        fetched_at: "2026-06-18",
        mesh_coverage_warning: false
      };
      
      if (oldWard.episode) {
        benchmarks.population_forecast.wards[city].episode = oldWard.episode;
      }
    }
  }
  
  await writeFile(BENCHMARKS, JSON.stringify(benchmarks, null, 2) + "\n");
  console.log("Updated benchmarks JSON.");
}
main();
