#!/usr/bin/env node
/**
 * Copy PKM tokyo_mansion_stats_2025.json → GSF-Ark CI mirror.
 *
 * Usage:
 *   node scripts/sync-mlit-pkm-to-ark.mjs
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const PKM_ROOT =
  process.env.PKM_ROOT ||
  path.join(process.env.HOME || "", ".gemini/antigravity/scratch/projects/GSF-PKM");
const PKM_JSON = path.join(PKM_ROOT, "PKM/30 Resources/tokyo_mansion_stats_2025.json");
const ARK_JSON = path.join(root, "docs/verification/data/tokyo_mansion_stats_2025.json");

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await fileExists(PKM_JSON))) {
    console.error(`PKM JSON not found: ${PKM_JSON}`);
    process.exit(1);
  }
  const data = await readFile(PKM_JSON, "utf8");
  await mkdir(path.dirname(ARK_JSON), { recursive: true });
  await writeFile(ARK_JSON, data.endsWith("\n") ? data : `${data}\n`);
  console.log(JSON.stringify({ ok: true, from: PKM_JSON, to: ARK_JSON }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
