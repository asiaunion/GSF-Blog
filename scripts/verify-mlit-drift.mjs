#!/usr/bin/env node
/**
 * Compare live MLIT XIT001 est_70sqm vs benchmarks.json — warn on >5% drift.
 *
 * Usage:
 *   node scripts/verify-mlit-drift.mjs
 *   node scripts/verify-mlit-drift.mjs --episode ep07
 *   node scripts/verify-mlit-drift.mjs --threshold 0.05 --fail
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { collectPrice, EPISODE_WARDS, loadEnv } from "./mlit-collector.mjs";

const BENCHMARKS = path.join(process.cwd(), "docs/verification/tokyo-ward-series-benchmarks.json");

function parseArgs(argv) {
  const out = { episode: "", threshold: 0.05, fail: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--episode") out.episode = (argv[++i] ?? "").toLowerCase();
    else if (a === "--threshold") out.threshold = parseFloat(argv[++i] ?? "0.05");
    else if (a === "--fail") out.fail = true;
  }
  return out;
}

async function main() {
  await loadEnv();
  const args = parseArgs(process.argv);
  const benchmarks = JSON.parse(await readFile(BENCHMARKS, "utf8"));
  const wards = args.episode
    ? EPISODE_WARDS[args.episode]
    : Object.keys(benchmarks.mlit_mansion_2025_q1_q4?.wards ?? {});

  const drifts = [];
  for (const ward of wards ?? []) {
    const expected = benchmarks.mlit_mansion_2025_q1_q4?.wards?.[ward]?.est_70sqm;
    if (expected == null) continue;
    const live = await collectPrice(ward, 2025, null, false);
    if (!live.count) continue;
    const pct = Math.abs(live.est_70sqm - expected) / expected;
    if (pct > args.threshold) {
      drifts.push({
        ward,
        expected,
        live: live.est_70sqm,
        drift_pct: Math.round(pct * 1000) / 10,
      });
    }
  }

  const out = { ok: drifts.length === 0, threshold: args.threshold, drifts };
  console.log(JSON.stringify(out, null, 2));
  if (drifts.length && args.fail) process.exit(1);
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
