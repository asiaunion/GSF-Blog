#!/usr/bin/env node
/**
 * Resolve target slug for SNS draft generation.
 *
 * Priority:
 *   1. --slug <slug> (explicit)
 *   2. Latest "배포 완료" entry in _handoff.md (gsfark.com/.../posts/<slug>/)
 *   3. Newest published KO post (draft !== true) by pubDatetime
 *
 * Usage:
 *   node scripts/sns-resolve-slug.mjs
 *   node scripts/sns-resolve-slug.mjs --slug tokyo-kokubunji-kunitachi-fuchu-tachikawa
 */
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const HANDOFF = path.join(root, "_handoff.md");
const KO_BLOG = path.join(root, "src/data/blog/ko");
const EPISODES = path.join(root, "docs/verification/tokyo-series-episodes.json");
const DRAFTS_DIR = path.join(root, "sns-drafts");

function parseArgs(argv) {
  const out = { slug: "" };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--slug") out.slug = argv[++i] ?? "";
  }
  return out;
}

function parseFrontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, "").trim();
  }
  return fm;
}

async function slugFromHandoff() {
  try {
    const text = await readFile(HANDOFF, "utf8");
    const blocks = text.split(/^## /m).slice(1).reverse();
    for (const block of blocks) {
      if (!/배포 완료|배포 URL|live/i.test(block)) continue;
      const urls = [...block.matchAll(/gsfark\.com\/(?:ko\/|en\/|ja\/)?posts\/([a-z0-9-]+)\//gi)];
      if (urls.length > 0) {
        return { slug: urls[0][1], source: "handoff", handoffHeading: block.split("\n")[0].trim() };
      }
    }
  } catch {
    /* optional */
  }
  return null;
}

async function slugFromNewestKo() {
  const files = (await readdir(KO_BLOG)).filter(f => f.endsWith(".md") && !f.startsWith("_"));
  let best = null;
  for (const file of files) {
    const md = await readFile(path.join(KO_BLOG, file), "utf8");
    const fm = parseFrontmatter(md);
    if (fm.draft === "true" || fm.draft === true) continue;
    const slug = file.replace(/\.md$/, "");
    const t = new Date(fm.pubDatetime || fm.published || 0).getTime();
    if (!best || t > best.t) {
      best = { slug, title: fm.title ?? slug, pubDatetime: fm.pubDatetime, category: fm.category ?? "general", t };
    }
  }
  if (!best) return null;
  return { slug: best.slug, source: "newest-ko", title: best.title, pubDatetime: best.pubDatetime, category: best.category };
}

async function draftForSlug(slug) {
  try {
    const files = (await readdir(DRAFTS_DIR)).filter(
      f => f.endsWith(`-${slug}.md`) && f !== "_TEMPLATE.md",
    );
    if (files.length === 0) return null;

    let best = files[0];
    let bestMtime = 0;
    for (const f of files) {
      const st = await stat(path.join(DRAFTS_DIR, f));
      if (st.mtimeMs > bestMtime) {
        bestMtime = st.mtimeMs;
        best = f;
      }
    }

    const rel = `sns-drafts/${best}`;
    const head = await readFile(path.join(DRAFTS_DIR, best), "utf8");
    const firstLine = head.split("\n")[0] ?? "";
    const finalized = /최종 확정|final/i.test(firstLine);

    return { draftFile: rel, draftFinalized: finalized };
  } catch {
    return null;
  }
}

async function episodeForSlug(slug) {
  try {
    const raw = await readFile(EPISODES, "utf8");
    const data = JSON.parse(raw);
    const list = Array.isArray(data) ? data : data.episodes ?? [];
    const hit = list.find(e => e.slug === slug);
    if (hit?.episode) return hit.episode;
  } catch {
    /* optional */
  }
  return null;
}

async function main() {
  const args = parseArgs(process.argv);
  let slug = args.slug;
  let source = "cli";
  let meta = {};

  if (!slug) {
    const fromHandoff = await slugFromHandoff();
    if (fromHandoff) {
      slug = fromHandoff.slug;
      source = fromHandoff.source;
      meta.handoffHeading = fromHandoff.handoffHeading;
    } else {
      const fromKo = await slugFromNewestKo();
      if (!fromKo) {
        console.error(JSON.stringify({ ok: false, error: "Could not resolve slug. Pass --slug <slug>." }));
        process.exit(2);
      }
      slug = fromKo.slug;
      source = fromKo.source;
      meta = { title: fromKo.title, pubDatetime: fromKo.pubDatetime, category: fromKo.category };
    }
  }

  let titleKo = meta.title ?? "";
  let category = meta.category ?? "general";
  if (!titleKo || !category || category === "general") {
    try {
      const md = await readFile(path.join(KO_BLOG, `${slug}.md`), "utf8");
      const fm = parseFrontmatter(md);
      titleKo = titleKo || fm.title || slug;
      category = fm.category || category;
    } catch {
      titleKo = titleKo || slug;
    }
  }

  const episode = await episodeForSlug(slug);
  const draft = await draftForSlug(slug);

  console.log(
    JSON.stringify(
      {
        ok: true,
        slug,
        titleKo,
        category,
        episode,
        source,
        draftFile: draft?.draftFile ?? null,
        draftFinalized: draft?.draftFinalized ?? false,
        ...meta,
      },
      null,
      2,
    ),
  );
}

main().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
