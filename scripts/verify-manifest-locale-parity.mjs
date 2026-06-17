#!/usr/bin/env node
/**
 * Verify manifest primary claim values appear in ko/en/ja (Phase 3).
 *
 * Usage:
 *   node scripts/verify-manifest-locale-parity.mjs --slug tokyo-taito-sumida-koto
 */
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";
import { normalizeNumericToken, stripBoilerplateSections, stripFrontmatter } from "../src/lib/validation/trustUtils.ts";

const root = process.cwd();

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function resolveManifestPath(slug) {
  const dir = path.join(root, "docs/verification/manifests");
  const direct = path.join(dir, `${slug}.manifest.json`);
  if (await fileExists(direct)) return direct;
  const files = await readdir(dir).catch(() => []);
  for (const file of files.filter(f => f.endsWith(".manifest.json"))) {
    const full = path.join(dir, file);
    const data = JSON.parse(await readFile(full, "utf8"));
    if (data.slug === slug) return full;
  }
  return "";
}

function bodyTokens(md) {
  const body = stripBoilerplateSections(stripFrontmatter(md));
  return new Set(
    (body.match(/[\d,]+(?:\.\d+)?(?:万|億|억|만|%|分|km|㎡)?[^<\s]*/g) ?? [])
      .map(s => normalizeNumericToken(s))
      .filter(t => t.length >= 1)
  );
}

function claimTokens(value) {
  const s = String(value);
  const tokens = new Set([normalizeNumericToken(s)]);
  if (Number(s) >= 10000 && Number(s) % 10000 === 0) {
    tokens.add(String(Number(s) / 10000));
  }
  if (s.includes(".")) tokens.add(s.replace(/\.0+$/, ""));
  return tokens;
}

async function main() {
  const slugIdx = process.argv.indexOf("--slug");
  const slug = slugIdx >= 0 ? process.argv[slugIdx + 1] : process.argv[2];
  if (!slug) {
    console.error("Usage: node scripts/verify-manifest-locale-parity.mjs --slug <slug>");
    process.exit(2);
  }

  const manifestPath = await resolveManifestPath(slug);
  if (!manifestPath) {
    console.error(`No manifest for slug: ${slug}`);
    process.exit(2);
  }

  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const ko = await readFile(path.join(root, "src/data/blog/ko", `${slug}.md`), "utf8").catch(() => "");
  const en = await readFile(path.join(root, "src/data/blog/en", `${slug}.md`), "utf8").catch(() => "");
  const ja = await readFile(path.join(root, "src/data/blog/ja", `${slug}.md`), "utf8").catch(() => "");

  const locales = {
    ko: bodyTokens(ko),
    en: bodyTokens(en),
    ja: bodyTokens(ja),
  };

  const missing = [];
  for (const claim of manifest.claims ?? []) {
    if (claim.tier !== "primary" || claim.value == null) continue;
    const tokens = claimTokens(claim.value);
    for (const [locale, set] of Object.entries(locales)) {
      if (locale !== "ko" && !en.trim()) continue;
      const found = [...tokens].some(t => set.has(t) || [...set].some(s => s.includes(t) || t.includes(s)));
      if (!found) {
        missing.push({ claim: claim.id, value: claim.value, locale });
      }
    }
  }

  const ok = missing.length === 0;
  console.log(
    JSON.stringify(
      {
        ok,
        slug,
        manifest: manifestPath,
        missing,
        checked: (manifest.claims ?? []).filter(c => c.tier === "primary" && c.value != null).length,
      },
      null,
      2
    )
  );
  process.exit(ok ? 0 : 1);
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
