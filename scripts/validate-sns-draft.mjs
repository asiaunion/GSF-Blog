#!/usr/bin/env node
/**
 * SNS draft guardrails — character limits, YMYL patterns, disclaimers, UTM.
 *
 * Usage:
 *   node scripts/validate-sns-draft.mjs --file sns-drafts/2026-06-23-slug.md
 *   node scripts/validate-sns-draft.mjs --slug tokyo-adachi-katsushika-edogawa
 */
import { readFile, access, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const DRAFTS_DIR = path.join(root, "sns-drafts");

const X_LIMIT = 280;
const THREADS_LIMIT = 500;
const CANONICAL_UTM_CAMPAIGN = "blog-broadcast";

const DISCLAIMER_EN =
  /informational purposes only|for information purposes only|does not constitute investment advice/i;
const DISCLAIMER_KO = /정보 제공 목적|투자 권유가 아닙니다?/;

const YMYL_NUMBER =
  /\d+\.?\d*\s*%|¥[\d,]+|[\d,]+\s*万円|[\d,]+\s*억\s*원?|\bCAGR\b|\b\d{2,}\s*만\s*원/i;

const FORBIDDEN_ADVICE =
  /매수\s*적기|지금이\s*기회|추천합니다|perfect time to buy|buy now|strongly recommend/i;

function parseArgs(argv) {
  const out = { file: "", slug: "" };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--file") out.file = argv[++i] ?? "";
    else if (a === "--slug") out.slug = argv[++i] ?? "";
  }
  return out;
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function twitterWeightedLength(text) {
  return text.replace(/https?:\/\/\S+/g, "x".repeat(23)).length;
}

function detectLocale(headerLine) {
  // Flag emoji wins — avoid "KO 후" in EN schedule notes matching \bKO\b
  if (/🇰🇷/.test(headerLine)) return "ko";
  if (/🇺🇸/.test(headerLine)) return "en";
  if (/🇯🇵/.test(headerLine)) return "ja";
  if (/(?:^|[\s—])KO(?:\s|$|】)/i.test(headerLine)) return "ko";
  if (/(?:^|[\s—])EN(?:\s|$|】)/i.test(headerLine)) return "en";
  if (/(?:^|[\s—])JA(?:\s|$|】)/i.test(headerLine)) return "ja";
  return "unknown";
}

function detectPlatform(sectionTitle) {
  const t = sectionTitle.toLowerCase();
  if (t.includes("x (") || t === "x" || t.includes("twitter")) return "x";
  if (t.includes("linkedin")) return "linkedin";
  if (t.includes("threads")) return "threads";
  return "other";
}

/** Parse ## X-EN / ``` blocks from sns_scheduler.py output. */
function parseSchedulerSections(markdown) {
  const blocks = [];
  const parts = markdown.split(/^## /m).slice(1);

  for (const part of parts) {
    const headerLine = part.split("\n")[0].trim();
    const m = headerLine.match(/^(X|LinkedIn|Threads)-(EN|KO|JA)$/i);
    if (!m) continue;

    const platform = m[1].toLowerCase() === "x" ? "x" : m[1].toLowerCase();
    const locale = m[2].toLowerCase();
    const fence = part.match(/```\n([\s\S]*?)```/);
    const text = fence?.[1]?.trim() ?? "";
    if (!text) continue;

    blocks.push({ platform, header: headerLine, locale, text });
  }
  return blocks;
}

/** Parse ## platform / ### locale blocks from hand-edited sns-drafts markdown. */
function parsePlatformLocaleSections(markdown) {
  const lines = markdown.split(/\r?\n/);
  const blocks = [];
  let currentPlatform = null;
  let currentHeader = null;
  let body = [];

  const flush = () => {
    if (!currentPlatform || !currentHeader) return;
    const text = body.join("\n").trim();
    if (text) {
      blocks.push({
        platform: currentPlatform,
        header: currentHeader,
        locale: detectLocale(currentHeader),
        text,
      });
    }
    body = [];
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      currentPlatform = detectPlatform(line.slice(3).trim());
      currentHeader = null;
      continue;
    }
    if (line.startsWith("### ")) {
      flush();
      currentHeader = line.slice(4).trim();
      continue;
    }
    if (currentHeader && !line.startsWith("**Post:") && !line.startsWith("**Date:")) {
      body.push(line);
    }
  }
  flush();
  return blocks;
}

function parseDraftSections(markdown) {
  if (/^## (X|LinkedIn|Threads)-(EN|KO|JA)\s*$/m.test(markdown)) {
    return parseSchedulerSections(markdown);
  }
  return parsePlatformLocaleSections(markdown);
}

async function resolveDraftPath(args) {
  if (args.file) {
    const p = path.isAbsolute(args.file) ? args.file : path.join(root, args.file);
    if (!(await fileExists(p))) throw new Error(`draft file not found: ${p}`);
    return p;
  }
  if (!args.slug) {
    throw new Error("Usage: validate-sns-draft.mjs --file <path> | --slug <slug>");
  }

  const entries = await readdir(DRAFTS_DIR);
  const matches = entries.filter(
    f => f.endsWith(`-${args.slug}.md`) && f !== "_TEMPLATE.md",
  );
  if (matches.length === 0) {
    throw new Error(`no sns-drafts/*-${args.slug}.md found`);
  }

  let best = matches[0];
  let bestMtime = 0;
  for (const f of matches) {
    const st = await stat(path.join(DRAFTS_DIR, f));
    if (st.mtimeMs > bestMtime) {
      bestMtime = st.mtimeMs;
      best = f;
    }
  }
  return path.join(DRAFTS_DIR, best);
}

async function getPostCategory(slug) {
  for (const locale of ["ko", "en", "ja"]) {
    const p = path.join(root, "src/data/blog", locale, `${slug}.md`);
    if (await fileExists(p)) {
      const md = await readFile(p, "utf8");
      const m = md.match(/^category:\s*(\S+)/m);
      if (m) return m[1].trim();
    }
  }
  return "general";
}

function extractSlugFromDraft(markdown, filePath) {
  const postLine = markdown.match(/^\*\*Post:\*\*\s*(\S+)/m);
  if (postLine) return postLine[1].trim();
  const schedLine = markdown.match(/^#\s*SNS 초안:\s*(\S+)/m);
  if (schedLine) return schedLine[1].trim();
  const base = path.basename(filePath);
  const slugMatch = base.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
  return slugMatch?.[1] ?? "";
}

function validateBlock(block, category, issues) {
  const { platform, locale, text, header } = block;
  const id = `${platform}/${locale} (${header})`;

  if (!/https?:\/\/gsfark\.com\//i.test(text)) {
    issues.push(`${id}: missing gsfark.com URL`);
  }

  if (/utm_campaign=blog_pilot/i.test(text)) {
    issues.push(
      `${id}: use utm_campaign=${CANONICAL_UTM_CAMPAIGN} (not blog_pilot)`,
    );
  }

  if (YMYL_NUMBER.test(text)) {
    issues.push(`${id}: YMYL — concrete numeric pattern detected`);
  }

  if (FORBIDDEN_ADVICE.test(text)) {
    issues.push(`${id}: YMYL — investment advice phrase detected`);
  }

  if (platform === "x") {
    const weighted = twitterWeightedLength(text);
    if (weighted > X_LIMIT) {
      issues.push(
        `${id}: X limit exceeded (${weighted}/${X_LIMIT} twitter-weighted chars)`,
      );
    }
  }

  if (platform === "threads") {
    if (text.length > THREADS_LIMIT) {
      issues.push(`${id}: Threads limit exceeded (${text.length}/${THREADS_LIMIT} chars)`);
    }
  }

  const needsDisclaimer =
    ["investment", "essay"].includes(category) &&
    (platform === "x" || platform === "threads");

  if (needsDisclaimer) {
    const hasDisclaimer =
      locale === "ko" ? DISCLAIMER_KO.test(text) : DISCLAIMER_EN.test(text);
    if (!hasDisclaimer) {
      issues.push(
        `${id}: missing investment disclaimer (category=${category})`,
      );
    }
  }

  if (platform === "linkedin" && category === "investment") {
    const hasDisclaimer =
      locale === "ko" ? DISCLAIMER_KO.test(text) : DISCLAIMER_EN.test(text);
    if (!hasDisclaimer) {
      issues.push(`${id}: missing LinkedIn investment disclaimer`);
    }
  }
}

async function main() {
  const args = parseArgs(process.argv);
  const draftPath = await resolveDraftPath(args);

  if (path.basename(draftPath) === "_TEMPLATE.md") {
    console.log(
      JSON.stringify({ ok: true, skipped: true, file: "_TEMPLATE.md" }, null, 2),
    );
    process.exit(0);
  }

  const markdown = await readFile(draftPath, "utf8");
  const slug = extractSlugFromDraft(markdown, draftPath);
  const category = slug ? await getPostCategory(slug) : "general";
  const blocks = parseDraftSections(markdown);

  const issues = [];
  const metrics = [];

  if (blocks.length === 0) {
    issues.push("no platform/locale blocks parsed (check ## / ### structure)");
  }

  for (const block of blocks) {
    if (block.platform === "other") continue;
    validateBlock(block, category, issues);

    metrics.push({
      id: `${block.platform}/${block.locale}`,
      chars: block.text.length,
      twitterWeighted:
        block.platform === "x" ? twitterWeightedLength(block.text) : undefined,
    });
  }

  const ok = issues.length === 0;
  console.log(
    JSON.stringify(
      {
        ok,
        file: path.relative(root, draftPath),
        slug: slug || null,
        category,
        limits: { x: X_LIMIT, threads: THREADS_LIMIT },
        metrics,
        issues,
      },
      null,
      2,
    ),
  );
  process.exit(ok ? 0 : 1);
}

main().catch(err => {
  console.error(err.message || err);
  process.exit(2);
});
