#!/usr/bin/env node
/**
 * Import NotebookLM / research JSON claim candidates into manifest (Phase 3 optional).
 *
 * Input JSON format:
 * {
 *   "claims": [
 *     { "label": "...", "value": 123, "unit": "万円", "source_hint": "...", "layer": "C" }
 *   ]
 * }
 *
 * Usage:
 *   node scripts/import-notebooklm-claims.mjs --slug tokyo-xxx --input research.json [--write]
 */
import { readFile, writeFile, readdir, access } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function parseArgs(argv) {
  const out = { slug: "", input: "", write: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--slug") out.slug = argv[++i] ?? "";
    else if (a === "--input") out.input = argv[++i] ?? "";
    else if (a === "--write") out.write = true;
  }
  return out;
}

async function resolveManifestPath(slug) {
  const dir = path.join(root, "docs/verification/manifests");
  const files = await readdir(dir).catch(() => []);
  for (const file of files.filter(f => f.endsWith(".manifest.json"))) {
    const full = path.join(dir, file);
    const data = JSON.parse(await readFile(full, "utf8"));
    if (data.slug === slug) return full;
  }
  return "";
}

function slugifyId(label) {
  return label
    .replace(/[^\w\u4e00-\u9faf-]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40)
    .toUpperCase();
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.slug || !args.input) {
    console.error("Usage: node scripts/import-notebooklm-claims.mjs --slug <slug> --input <json> [--write]");
    process.exit(2);
  }

  const manifestPath = await resolveManifestPath(args.slug);
  if (!manifestPath) {
    console.error(`Manifest not found for slug: ${args.slug}`);
    process.exit(2);
  }

  const incoming = JSON.parse(await readFile(path.resolve(args.input), "utf8"));
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const existingIds = new Set((manifest.claims ?? []).map(c => c.id));
  const added = [];

  for (const row of incoming.claims ?? []) {
    const layer = row.layer ?? "C";
    const id = row.id ?? `NLM-${slugifyId(row.label ?? "CLAIM")}`;
    if (existingIds.has(id)) continue;
    manifest.claims.push({
      id,
      label: row.label ?? "",
      value: row.value ?? null,
      unit: row.unit ?? null,
      tier: layer === "C" ? "secondary" : "primary",
      layer,
      method: layer === "C" ? "web_search" : "user_capture",
      evidence: {
        url: row.source_hint ?? row.url ?? "",
        note: "imported from NotebookLM/research JSON",
        ...(layer === "C" ? {} : { capture_by: "user" }),
      },
      used_in_draft: false,
    });
    if (layer === "C" && row.source_hint) {
      manifest.c_tier_capture_requests = manifest.c_tier_capture_requests ?? [];
      manifest.c_tier_capture_requests.push({
        id: `CAPTURE-${id}`,
        source: row.label,
        reason: row.source_hint,
        status: "pending",
        resolved_by: null,
      });
      manifest.gates.c_tier_capture_requested = true;
    }
    existingIds.add(id);
    added.push(id);
  }

  manifest.updated_at = new Date().toISOString().slice(0, 10);

  if (args.write) {
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }

  console.log(
    JSON.stringify(
      { ok: true, manifest: manifestPath, added, total_claims: manifest.claims.length, write: args.write },
      null,
      2
    )
  );
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
