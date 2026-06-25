/**
 * Backfill `modDatetime` in blog frontmatter from git last-commit timestamps.
 * Only sets modDatetime when the file was modified after its published date.
 *
 * Usage:
 *   node scripts/backfill-mod-datetime.mjs          # write changes
 *   node scripts/backfill-mod-datetime.mjs --dry-run
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const BLOG_ROOT = "src/data/blog";
const DRY_RUN = process.argv.includes("--dry-run");
const TZ_OFFSET = "+09:00";

function walkMarkdownFiles(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkMarkdownFiles(full, out);
    else if (/\.mdx?$/.test(ent.name) && !ent.name.startsWith("_")) out.push(full);
  }
  return out;
}

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  return { raw: match[1], end: match[0].length };
}

function readField(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return m?.[1]?.trim() ?? null;
}

function toTokyoIso(date) {
  const d = new Date(date);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .formatToParts(d)
    .reduce((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});

  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${TZ_OFFSET}`;
}

function gitLastCommitIso(file) {
  return execSync(`git log -1 --format=%aI -- ${JSON.stringify(file)}`, {
    encoding: "utf8",
  }).trim();
}

function upsertModDatetime(fm, modIso) {
  if (/^modDatetime:/m.test(fm)) {
    return fm.replace(/^modDatetime:\s*.+$/m, `modDatetime: ${modIso}`);
  }

  if (/^pubDatetime:/m.test(fm)) {
    return fm.replace(
      /^(pubDatetime:\s*.+)$/m,
      `$1\nmodDatetime: ${modIso}`
    );
  }

  return `modDatetime: ${modIso}\n${fm}`;
}

const files = walkMarkdownFiles(BLOG_ROOT);
let updated = 0;
let skipped = 0;
let unchanged = 0;

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const parsed = parseFrontmatter(text);
  if (!parsed) {
    skipped++;
    continue;
  }

  const draft = readField(parsed.raw, "draft");
  if (draft === "true") {
    skipped++;
    continue;
  }

  const pubRaw = readField(parsed.raw, "pubDatetime");
  if (!pubRaw) {
    skipped++;
    continue;
  }

  let gitIso;
  try {
    gitIso = gitLastCommitIso(file);
  } catch {
    skipped++;
    continue;
  }

  const pubMs = new Date(pubRaw).getTime();
  const gitMs = new Date(gitIso).getTime();

  if (!Number.isFinite(pubMs) || !Number.isFinite(gitMs) || gitMs <= pubMs + 60_000) {
    unchanged++;
    continue;
  }

  const modIso = toTokyoIso(gitIso);
  const nextFm = upsertModDatetime(parsed.raw, modIso);
  const nextText = `---\n${nextFm}\n---${text.slice(parsed.end)}`;

  if (!DRY_RUN) fs.writeFileSync(file, nextText, "utf8");
  updated++;
}

console.log(
  JSON.stringify(
    {
      dryRun: DRY_RUN,
      total: files.length,
      updated,
      unchanged,
      skipped,
    },
    null,
    2
  )
);
