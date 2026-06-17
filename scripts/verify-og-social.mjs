#!/usr/bin/env node
/**
 * Pre-deploy OG / LinkedIn image checks for a blog slug.
 */
import { readFile, access } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function parseArgs(argv) {
  const out = { slug: "", live: true };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--slug") out.slug = argv[++i] ?? "";
    else if (a === "--no-live") out.live = false;
  }
  return out;
}

async function fileExists(p) {
  try { await access(p); return true; } catch { return false; }
}

function parseOgImage(md) {
  const m = md.match(/^ogImage:\s*"?([^"\n]+)"?/m);
  return m?.[1]?.trim();
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.slug) {
    console.error("Usage: verify-og-social.mjs --slug tokyo-taito-sumida-koto");
    process.exit(2);
  }

  const issues = [];
  const koPath = path.join(root, "src/data/blog/ko", `${args.slug}.md`);
  if (!(await fileExists(koPath))) issues.push(`missing KO post: ${koPath}`);

  const jpg = path.join(root, "public/assets/images/blog", `${args.slug}-hero-og.jpg`);
  if (!(await fileExists(jpg))) issues.push(`missing LinkedIn JPEG: public/assets/images/blog/${args.slug}-hero-og.jpg`);

  if (await fileExists(koPath)) {
    const md = await readFile(koPath, "utf8");
    const og = parseOgImage(md);
    if (!og) issues.push("ogImage frontmatter missing");
    else if (og.endsWith(".webp")) issues.push(`ogImage must not be WebP for LinkedIn: ${og}`);
    else if (!/\.(jpe?g|png)$/i.test(og)) issues.push(`ogImage should be jpg/png: ${og}`);

    if (args.live && og?.startsWith("http")) {
      try {
        const res = await fetch(og, { headers: { "User-Agent": "LinkedInBot/1.0" } });
        if (!res.ok) issues.push(`ogImage HTTP ${res.status}: ${og}`);
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("image")) issues.push(`ogImage not image/*: ${ct}`);
      } catch (e) {
        issues.push(`ogImage fetch failed: ${e.message}`);
      }
    }
  }

  const ok = issues.length === 0;
  console.log(JSON.stringify({ ok, slug: args.slug, issues }, null, 2));
  process.exit(ok ? 0 : 1);
}

main().catch(err => { console.error(err); process.exit(2); });
