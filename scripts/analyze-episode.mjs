#!/usr/bin/env node
/**
 * Orchestrate MLIT analysis pipeline for one Tokyo ward episode.
 */
import { spawn } from "node:child_process";
import path from "node:path";

const root = process.cwd();

function parseArgs(argv) {
  const out = { episode: "", slug: "", write: false, noCache: false, skipApi: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--episode") out.episode = (argv[++i] ?? "").toLowerCase();
    else if (a === "--slug") out.slug = argv[++i] ?? "";
    else if (a === "--write") out.write = true;
    else if (a === "--no-cache") out.noCache = true;
    else if (a === "--skip-api") out.skipApi = true;
  }
  return out;
}

function run(cmd, cmdArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, cmdArgs, { cwd: root, stdio: "inherit", shell: false });
    child.on("exit", code => (code === 0 ? resolve() : reject(new Error(`${cmd} ${cmdArgs.join(" ")} → exit ${code}`))));
  });
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.episode && !args.slug) {
    console.error("Usage: analyze-episode.mjs --episode ep07 [--write] [--no-cache]");
    process.exit(2);
  }

  const epFlag = args.episode ? ["--episode", args.episode] : [];
  const slugFlag = args.slug ? ["--slug", args.slug] : [];
  const writeFlag = args.write ? ["--write"] : [];
  const cacheFlag = args.noCache ? ["--no-cache"] : [];

  if (!args.skipApi) {
    await run("node", ["scripts/merge-mlit-price-to-pkm.mjs", ...epFlag, ...cacheFlag]);
    await run("node", ["scripts/sync-mlit-pkm-to-ark.mjs"]);
    await run("node", ["scripts/sync-mlit-to-benchmarks.mjs", ...epFlag, ...writeFlag, ...cacheFlag]);
    await run("node", ["scripts/sync-suumo-to-benchmarks.mjs", ...epFlag, "--fetch-missing", ...writeFlag]);
    await run("node", ["scripts/mlit-price-series.mjs", ...epFlag, "--from", "2015", "--to", "2025", ...writeFlag, ...cacheFlag]);
    await run("node", ["scripts/mlit-trade-price-series.mjs", ...epFlag, "--from", "2005", "--to", "2025", ...writeFlag, ...cacheFlag]);
    await run("node", ["scripts/mlit-land-price-series.mjs", ...epFlag, "--from", "2005", "--to", "2026", ...writeFlag, ...cacheFlag]);
  }

  if (args.episode) {
    await run("node", ["scripts/render-ward-dossier.mjs", "--episode", args.episode, ...cacheFlag]);
  }

  await run("node", [
    "scripts/render-episode-research-pack.mjs",
    ...(args.episode ? ["--episode", args.episode] : []),
    ...slugFlag,
    ...writeFlag,
    ...cacheFlag,
  ]);

  if (args.slug && args.write) {
    await run("node", ["scripts/scaffold-episode-manifest.mjs", "--slug", args.slug, "--write"]);
  }

  console.log(JSON.stringify({ ok: true, episode: args.episode, slug: args.slug }, null, 2));
}

main().catch(err => { console.error(err.message); process.exit(2); });
