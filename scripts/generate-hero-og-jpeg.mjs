#!/usr/bin/env node
/**
 * Generate LinkedIn/Facebook-friendly OG JPEG (1200×630) from hero WebP.
 *
 * Usage:
 *   node scripts/generate-hero-og-jpeg.mjs tokyo-taito-sumida-koto
 *   node scripts/generate-hero-og-jpeg.mjs --all-tokyo
 */
import { access, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicBlog = path.join(process.cwd(), "public/assets/images/blog");
const OG_W = 1200;
const OG_H = 630;

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function generateFromWebp(webpPath) {
  const base = path.basename(webpPath, ".webp");
  const outPath = path.join(publicBlog, `${base}-og.jpg`);
  await sharp(webpPath)
    .resize(OG_W, OG_H, { fit: "cover", position: "center" })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(outPath);
  return outPath;
}

async function main() {
  const args = process.argv.slice(2);
  let webps = [];

  if (args.includes("--all-tokyo")) {
    const files = await readdir(publicBlog);
    webps = files
      .filter(f => f.startsWith("tokyo-") && f.endsWith("-hero.webp"))
      .map(f => path.join(publicBlog, f));
  } else if (args[0]) {
    const slug = args[0].replace(/-hero\.webp$/, "");
    webps = [path.join(publicBlog, `${slug}-hero.webp`)];
  } else {
    console.error("Usage: generate-hero-og-jpeg.mjs <slug> | --all-tokyo");
    process.exit(2);
  }

  const written = [];
  for (const webp of webps) {
    if (!(await exists(webp))) {
      console.error(`Missing: ${webp}`);
      continue;
    }
    const out = await generateFromWebp(webp);
    written.push(out);
  }

  console.log(JSON.stringify({ ok: true, written, size: `${OG_W}x${OG_H}` }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
