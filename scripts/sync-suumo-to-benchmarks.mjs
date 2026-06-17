#!/usr/bin/env node
/**
 * Merge committed SUUMO snapshot HTML into benchmarks (B-tier rent).
 *
 * Usage:
 *   node scripts/sync-suumo-to-benchmarks.mjs --all --write
 *   node scripts/sync-suumo-to-benchmarks.mjs --ward 北区 --write
 *   node scripts/sync-suumo-to-benchmarks.mjs --fetch-missing --all --write
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  parseSuumoRentFromHtml,
  snapshotDateFromName,
  suumoCodeFromSnapshotName,
} from "./lib/parse-suumo-snapshot.mjs";
import { EPISODE_WARDS } from "./mlit-collector.mjs";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const BENCHMARKS = path.join(root, "docs/verification/tokyo-ward-series-benchmarks.json");
const EPISODES = path.join(root, "docs/verification/tokyo-series-episodes.json");
const SNAPSHOT_DIR = path.join(root, "docs/verification/snapshots");

function parseArgs(argv) {
  const out = { ward: "", episode: "", all: false, write: false, fetchMissing: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--ward") out.ward = argv[++i] ?? "";
    else if (a === "--episode") out.episode = (argv[++i] ?? "").toLowerCase();
    else if (a === "--all") out.all = true;
    else if (a === "--write") out.write = true;
    else if (a === "--fetch-missing") out.fetchMissing = true;
  }
  return out;
}

function episodeForWard(ward, episodesDoc) {
  const hit = (episodesDoc.episodes ?? []).find(e => e.wards?.includes(ward));
  return hit?.episode ?? "";
}

function codeForWard(ward, codes) {
  return codes[ward] ?? null;
}

async function latestSnapshotsByCode() {
  const files = (await readdir(SNAPSHOT_DIR)).filter(f => f.startsWith("suumo-sc_") && f.endsWith(".html"));
  const byCode = new Map();
  for (const file of files) {
    const code = suumoCodeFromSnapshotName(file);
    if (!code) continue;
    const date = snapshotDateFromName(file) ?? "";
    const prev = byCode.get(code);
    if (!prev || date > prev.date) byCode.set(code, { file, date });
  }
  return byCode;
}

async function fetchSnapshot(code) {
  await execFileAsync("node", ["scripts/fetch-suumo-snapshot.mjs", `sc_${code}`, "--commit"], { cwd: root });
}

async function main() {
  const args = parseArgs(process.argv);
  const episodesDoc = JSON.parse(await readFile(EPISODES, "utf8"));
  const codes = episodesDoc.suumo_ward_codes ?? {};

  let wards = [];
  if (args.ward) wards = [args.ward];
  else if (args.episode) {
    wards = EPISODE_WARDS[args.episode];
    if (!wards) {
      console.error(`Unknown episode: ${args.episode}`);
      process.exit(1);
    }
  } else if (args.all) wards = Object.keys(codes);
  else {
    console.error("Usage: sync-suumo-to-benchmarks.mjs --all | --episode ep07 [--fetch-missing] --write");
    process.exit(2);
  }

  if (args.fetchMissing) {
    const byCode = await latestSnapshotsByCode();
    for (const ward of wards) {
      const code = codeForWard(ward, codes);
      if (!code || byCode.has(code)) continue;
      process.stderr.write(`📥 fetch sc_${code} (${ward})\n`);
      await fetchSnapshot(code);
      await new Promise(r => setTimeout(r, 800));
    }
  }

  const byCode = await latestSnapshotsByCode();
  const benchmarks = JSON.parse(await readFile(BENCHMARKS, "utf8"));
  if (!benchmarks.suumo_rent_new_build_station_5min) {
    benchmarks.suumo_rent_new_build_station_5min = {
      condition: "신축+역 도보1~5분, SUUMO pagecaption 기준",
      wards: {},
    };
  }

  const merged = [];
  for (const ward of wards) {
    const code = codeForWard(ward, codes);
    if (!code) continue;
    const snap = byCode.get(code);
    if (!snap) {
      process.stderr.write(`⚠️ no snapshot for ${ward} (sc_${code})\n`);
      continue;
    }
    const html = await readFile(path.join(SNAPSHOT_DIR, snap.file), "utf8");
    const { rents, pagecaption } = parseSuumoRentFromHtml(html);
    if (!rents["1R"]) {
      process.stderr.write(`⚠️ no 1R parsed for ${ward} from ${snap.file}\n`);
      continue;
    }
    benchmarks.suumo_rent_new_build_station_5min.wards[ward] = {
      ...rents,
      snapshot_date: snap.date,
      snapshot_file: `docs/verification/snapshots/${snap.file}`,
      episode: episodeForWard(ward, episodesDoc),
      pagecaption,
    };
    merged.push(ward);
  }

  benchmarks.last_updated = new Date().toISOString().slice(0, 10);
  if (args.write) {
    await writeFile(BENCHMARKS, `${JSON.stringify(benchmarks, null, 2)}\n`);
  }

  console.log(JSON.stringify({ ok: true, write: args.write, merged }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
