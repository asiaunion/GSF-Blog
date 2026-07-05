/**
 * Layer 3 — trilingual language lint (KO banned terms, JA hangul, EN codespell).
 *
 * Usage:
 *   node scripts/lint-language.mjs              # full corpus
 *   node scripts/lint-language.mjs --slug foo   # ko/en/ja for one slug only
 *
 * SSOT: docs/KO_TERMINOLOGY.md (확정 금지 변형), docs/JA_TERMINOLOGY.md, .codespellrc
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const blogDir = path.join(root, "src/data/blog");
const koTerminologyPath = path.join(root, "docs/KO_TERMINOLOGY.md");
const jaTerminologyPath = path.join(root, "docs/JA_TERMINOLOGY.md");
const codespellConfigPath = path.join(root, ".codespellrc");

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

function parseKoBannedTerms(markdown) {
  const terms = [];
  const start = markdown.indexOf("## 확정");
  if (start < 0) return terms;
  const end = markdown.indexOf("## 제안", start);
  const section = end >= 0 ? markdown.slice(start, end) : markdown.slice(start);

  for (const line of section.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|") || trimmed.includes("금지 변형")) continue;
    if (/^\|\s*:?-+:?\s*\|/.test(trimmed)) continue;

    const cols = trimmed
      .split("|")
      .map(c => c.trim())
      .filter(Boolean);
    if (cols.length < 3) continue;

    const banned = cols[2];
    if (!banned || banned === "—" || banned === "-") continue;

    for (const term of banned.split(/[,，]/)) {
      const t = term.trim();
      if (t) terms.push(t);
    }
  }

  return [...new Set(terms)];
}

function parseJaHangulAllowlist(markdown) {
  const allowlist = [];
  const marker = "## Hangul allowlist";
  const start = markdown.indexOf(marker);
  if (start < 0) return allowlist;

  const rest = markdown.slice(start + marker.length);
  const fence = rest.match(/```[^\n]*\n([\s\S]*?)```/);
  if (!fence) return allowlist;

  for (const line of fence[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    allowlist.push(trimmed);
  }
  return allowlist;
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split("\n").length;
}

function findTermHits(content, filePath, terms) {
  const hits = [];
  for (const term of terms) {
    let from = 0;
    while (from < content.length) {
      const idx = content.indexOf(term, from);
      if (idx < 0) break;
      hits.push({
        file: filePath,
        line: lineNumberAt(content, idx),
        term,
        snippet: content.slice(Math.max(0, idx - 20), idx + term.length + 20).replace(/\n/g, " "),
      });
      from = idx + term.length;
    }
  }
  return hits;
}

function findHangulHits(content, filePath, allowlist) {
  const hits = [];
  const re = /[가-힣]+/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    const token = match[0];
    const idx = match.index;
    const context = content.slice(Math.max(0, idx - 30), idx + token.length + 30);
    if (allowlist.some(entry => context.includes(entry) || token.includes(entry))) {
      continue;
    }
    hits.push({
      file: filePath,
      line: lineNumberAt(content, idx),
      term: token,
      snippet: context.replace(/\n/g, " "),
    });
  }
  return hits;
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

function runCodespell(files) {
  if (files.length === 0) return { ok: true, output: "no EN files" };

  const codespell = process.env.CODESPELL_BIN || "codespell";
  const args = ["--quiet-level=3"];
  if (fs.existsSync(codespellConfigPath)) {
    args.push("--config", codespellConfigPath);
  }
  args.push(...files);

  const result = spawnSync(codespell, args, {
    cwd: root,
    encoding: "utf8",
  });

  if (result.error?.code === "ENOENT") {
    return {
      ok: false,
      output:
        "codespell not found on PATH. Install: pip install codespell (or set CODESPELL_BIN).",
    };
  }

  const output = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
  return {
    ok: result.status === 0,
    output: output || (result.status === 0 ? "0 issues" : "codespell failed"),
  };
}

function main() {
  const errors = [];
  const koBanned = parseKoBannedTerms(readText(koTerminologyPath));
  const jaAllowlist = parseJaHangulAllowlist(readText(jaTerminologyPath));

  const koFiles = resolveFiles("ko");
  const jaFiles = resolveFiles("ja");
  const enFiles = resolveFiles("en");

  for (const filePath of koFiles) {
    const content = readText(filePath);
    const hits = findTermHits(content, filePath, koBanned);
    for (const hit of hits) {
      errors.push(`KO banned "${hit.term}" in ${hit.file}:${hit.line} — …${hit.snippet}…`);
    }
  }

  for (const filePath of jaFiles) {
    const content = readText(filePath);
    const hits = findHangulHits(content, filePath, jaAllowlist);
    for (const hit of hits) {
      errors.push(`JA hangul "${hit.term}" in ${hit.file}:${hit.line} — …${hit.snippet}…`);
    }
  }

  const codespell = runCodespell(enFiles);
  if (!codespell.ok) {
    errors.push(`EN codespell: ${codespell.output}`);
  }

  if (errors.length > 0) {
    console.error("❌ lint-language failed:\n");
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  const scope = slugArg ? `slug=${slugArg}` : "full corpus";
  console.log(
    `✅ lint-language passed (${scope}; KO banned ${koBanned.length} terms, JA allowlist ${jaAllowlist.length}, EN ${enFiles.length} files)`
  );
}

main();
