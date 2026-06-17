#!/usr/bin/env node
/**
 * Run manifest verification for changed src/data/blog/ko/tokyo-*.md files.
 * Used by pre-commit hook and GitHub Actions.
 *
 * Usage:
 *   node scripts/verify-tokyo-changed.mjs              # unstaged + staged vs HEAD
 *   node scripts/verify-tokyo-changed.mjs --ci         # all tokyo ko with manifest
 *   VERIFY_REQUIRE_GATES=1 node scripts/verify-tokyo-changed.mjs
 */
import { execFileSync } from "node:child_process";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const koDir = path.join(root, "src/data/blog/ko");
const manifestDir = path.join(root, "docs/verification/manifests");
const requireGates = process.env.VERIFY_REQUIRE_GATES === "1";
const ciMode = process.argv.includes("--ci");

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function manifestForSlug(slug) {
  const direct = path.join(manifestDir, `${slug}.manifest.json`);
  if (await fileExists(direct)) return direct;
  const files = await readdir(manifestDir).catch(() => []);
  for (const file of files.filter(f => f.endsWith(".manifest.json"))) {
    const full = path.join(manifestDir, file);
    const data = JSON.parse(await readFile(full, "utf8"));
    if (data.slug === slug) return full;
  }
  return "";
}

function slugFromKoPath(filePath) {
  const base = path.basename(filePath, ".md");
  return base.startsWith("tokyo-") ? base : "";
}

function changedTokyoKoSlugs() {
  try {
    const out = execFileSync("git", ["diff", "--name-only", "HEAD"], { encoding: "utf8" });
    const staged = execFileSync("git", ["diff", "--cached", "--name-only"], { encoding: "utf8" });
    const files = new Set([...out.split("\n"), ...staged.split("\n")].filter(Boolean));
    const slugs = new Set();
    for (const f of files) {
      if (!f.startsWith("src/data/blog/ko/tokyo-") || !f.endsWith(".md")) continue;
      const slug = slugFromKoPath(f);
      if (slug) slugs.add(slug);
    }
    return [...slugs];
  } catch {
    return [];
  }
}

async function allTokyoKoWithManifest() {
  const files = await readdir(koDir).catch(() => []);
  const slugs = [];
  for (const f of files.filter(x => x.startsWith("tokyo-") && x.endsWith(".md"))) {
    const slug = slugFromKoPath(f);
    if (slug && (await manifestForSlug(slug))) slugs.push(slug);
  }
  return slugs;
}

async function verifySlug(slug) {
  const args = ["scripts/verify-episode-manifest.mjs", "--slug", slug];
  if (requireGates) args.push("--require-gates");
  execFileSync("node", args, { cwd: root, stdio: "inherit" });
}

async function main() {
  const slugs = ciMode ? await allTokyoKoWithManifest() : changedTokyoKoSlugs();
  if (slugs.length === 0) {
    console.log(JSON.stringify({ ok: true, checked: [], message: "no tokyo ko changes with manifest" }, null, 2));
    return;
  }

  const checked = [];
  const skipped = [];
  for (const slug of slugs) {
    if (!(await manifestForSlug(slug))) {
      skipped.push({ slug, reason: "no manifest (Ep.07+ required)" });
      continue;
    }
    console.log(`\n--- verify: ${slug} ---`);
    await verifySlug(slug);
    checked.push(slug);
  }

  console.log(JSON.stringify({ ok: true, checked, skipped, requireGates }, null, 2));
}

main().catch(err => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
