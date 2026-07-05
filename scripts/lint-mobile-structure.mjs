/**
 * Layer 3 — mobile structure lint.
 *
 * Guards against the class of bug where a single wide element (an un-wrapped
 * markdown table, a fixed-width raw-HTML block, an oversized iframe) forces
 * the whole document wider than a 375px mobile viewport, making the rest of
 * the page look like it doesn't fill the screen (right-side gap).
 *
 * Two checks:
 *   1. `.app-prose table` in src/styles/typography.css must keep the
 *      overflow-x wrapper — this is the fix for the 2026-07-06 incident and
 *      is easy to accidentally drop during a refactor.
 *   2. `.app-prose pre` / `.astro-code` must keep overflow-x for long code lines.
 *   3. Blog markdown/mdx source must not contain raw HTML with a fixed pixel
 *      width wide enough to overflow a 375px viewport (images are exempt —
 *      Tailwind preflight already forces `img { max-width: 100% }`).
 *
 * Usage:
 *   node scripts/lint-mobile-structure.mjs              # full corpus
 *   node scripts/lint-mobile-structure.mjs --slug foo   # one slug, all locales
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const blogDir = path.join(root, "src/data/blog");
const typographyCssPath = path.join(root, "src/styles/typography.css");

// Mobile viewport floor we design against (iPhone SE / small Android).
const MOBILE_VIEWPORT_PX = 375;

const slugArg = (() => {
  const idx = process.argv.indexOf("--slug");
  return idx >= 0 ? process.argv[idx + 1] : "";
})();

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function listMarkdownFiles(localeDir) {
  if (!fs.existsSync(localeDir)) return [];
  return fs
    .readdirSync(localeDir)
    .filter(f => f.endsWith(".md") || f.endsWith(".mdx"))
    .map(f => path.join(localeDir, f));
}

function resolveFiles(locale) {
  const dir = path.join(blogDir, locale);
  if (slugArg) {
    for (const ext of [".md", ".mdx"]) {
      const candidate = path.join(dir, `${slugArg}${ext}`);
      if (fs.existsSync(candidate)) return [candidate];
    }
    return [];
  }
  return listMarkdownFiles(dir);
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split("\n").length;
}

/** Extract first nested `selector { ... }` block inside `.app-prose { ... }`. */
function extractAppProseNestedBlock(css, selector) {
  const re = new RegExp(
    `\\.app-prose\\s*\\{[\\s\\S]*?\\n\\s*${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`
  );
  return css.match(re)?.[1] ?? null;
}

function requireOverflowX(blockLabel, blockBody) {
  if (!blockBody) {
    return [`typography.css: could not find \`.app-prose ${blockLabel} { ... }\` block`];
  }
  if (!/overflow-x-auto|overflow-x-scroll/.test(blockBody)) {
    return [
      `typography.css: \`.app-prose ${blockLabel}\` is missing \`overflow-x-auto\` — ` +
        "wide content can push the page wider than the viewport.",
    ];
  }
  return [];
}

/** Check 1–2: table and pre/code overflow CSS guards. */
function checkTypographyCssGuard() {
  const css = readText(typographyCssPath);
  const errors = [];

  const tableBlock = extractAppProseNestedBlock(css, "table");
  errors.push(...requireOverflowX("table", tableBlock));
  if (tableBlock && !/\bblock\b/.test(tableBlock)) {
    errors.push(
      "typography.css: `.app-prose table` is missing `block` display — required for the " +
        "overflow-x wrapper to actually scroll instead of the whole document."
    );
  }

  errors.push(...requireOverflowX("pre", extractAppProseNestedBlock(css, "pre")));
  errors.push(...requireOverflowX(".astro-code", extractAppProseNestedBlock(css, ".astro-code")));

  return errors;
}

/** Check 3: raw HTML in markdown with a fixed pixel width that could overflow
 * a 375px viewport. `<img>` is exempt (Tailwind preflight forces max-width:100%).
 */
function findFixedWidthOverflowHits(content, filePath) {
  const hits = [];
  const tagWidthRe = /<(\w+)([^>]*?)\swidth=["']?(\d+)(?:px)?["']?[^>]*>/g;
  let match;
  while ((match = tagWidthRe.exec(content)) !== null) {
    const [full, tag, , widthStr] = match;
    if (tag.toLowerCase() === "img") continue; // Tailwind preflight caps img width
    const width = Number(widthStr);
    if (width > MOBILE_VIEWPORT_PX) {
      hits.push({
        file: filePath,
        line: lineNumberAt(content, match.index),
        tag,
        width,
        snippet: full.slice(0, 80),
      });
    }
  }

  const styleWidthRe = /style=["'][^"']*width:\s*(\d+)px[^"']*["']/g;
  while ((match = styleWidthRe.exec(content)) !== null) {
    const width = Number(match[1]);
    if (width > MOBILE_VIEWPORT_PX) {
      hits.push({
        file: filePath,
        line: lineNumberAt(content, match.index),
        tag: "inline-style",
        width,
        snippet: match[0].slice(0, 80),
      });
    }
  }

  return hits;
}

function main() {
  const errors = [...checkTypographyCssGuard()];

  for (const locale of ["en", "ko", "ja"]) {
    for (const filePath of resolveFiles(locale)) {
      const content = readText(filePath);
      const hits = findFixedWidthOverflowHits(content, filePath);
      for (const hit of hits) {
        errors.push(
          `fixed-width overflow risk: <${hit.tag}> width=${hit.width}px > ${MOBILE_VIEWPORT_PX}px ` +
            `in ${hit.file}:${hit.line} — …${hit.snippet}…`
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error("❌ lint-mobile-structure failed:\n");
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  const scope = slugArg ? `slug=${slugArg}` : "full corpus";
  console.log(`✅ lint-mobile-structure passed (${scope}; viewport floor ${MOBILE_VIEWPORT_PX}px)`);
}

main();
