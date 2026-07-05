/**
 * Layer 3 — trilingual language lint (KO banned terms, JA hangul, EN codespell).
 *
 * Usage:
 *   node scripts/lint-language.mjs              # full corpus
 *   node scripts/lint-language.mjs --slug foo   # ko/en/ja for one slug only
 *
 * SSOT: docs/KO_TERMINOLOGY.md (확정=hard, 제안=soft warning), docs/JA_TERMINOLOGY.md, .codespellrc
 *
 * EN codespell: tries codespell → python3 -m codespell → uvx codespell.
 * Missing locally: warn + skip (exit 0). Missing in CI: hard fail.
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

function isCi() {
  return process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";
}

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

function sliceMarkdownSection(markdown, sectionHeader) {
  const escaped = sectionHeader.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const headerRe = new RegExp(`^${escaped}\\s*$`, "m");
  const match = headerRe.exec(markdown);
  if (!match) return "";

  const start = match.index;
  const afterHeader = markdown.slice(start + sectionHeader.length);
  const nextSection = afterHeader.match(/\n## /);
  return nextSection?.index != null
    ? markdown.slice(start, start + sectionHeader.length + nextSection.index)
    : markdown.slice(start);
}

/** Header-based table parse — keeps empty cells; maps 금지 변형 column by header name. */
function parseKoTerminologySection(markdown, sectionHeader) {
  const terms = [];
  const section = sliceMarkdownSection(markdown, sectionHeader);
  if (!section) return terms;

  let bannedCol = -1;

  for (const line of section.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|")) continue;

    const cells = trimmed.split("|").slice(1, -1).map(c => c.trim());
    if (cells.length === 0) continue;

    if (cells.some(c => c === "금지 변형" || c.includes("금지 변형"))) {
      bannedCol = cells.findIndex(c => c === "금지 변형" || c.includes("금지 변형"));
      continue;
    }
    if (cells.every(c => /^:?-+:?$/.test(c))) continue;
    if (bannedCol < 0 || cells.length <= bannedCol) continue;

    const banned = cells[bannedCol];
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
  const allowSet = new Set(allowlist);
  const hits = [];
  const re = /[가-힣]+/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    const token = match[0];
    if (allowSet.has(token)) continue;
    const idx = match.index;
    hits.push({
      file: filePath,
      line: lineNumberAt(content, idx),
      term: token,
      snippet: content
        .slice(Math.max(0, idx - 30), idx + token.length + 30)
        .replace(/\n/g, " "),
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

function codespellArgs(files) {
  const args = ["--quiet-level=3"];
  if (fs.existsSync(codespellConfigPath)) {
    args.push("--config", codespellConfigPath);
  }
  args.push(...files);
  return args;
}

function runCodespell(files) {
  if (files.length === 0) return { ok: true, output: "no EN files", skipped: false };

  const args = codespellArgs(files);
  const attempts = [];

  if (process.env.CODESPELL_BIN) {
    attempts.push({ cmd: process.env.CODESPELL_BIN, args });
  }
  attempts.push({ cmd: "codespell", args });
  attempts.push({ cmd: "python3", args: ["-m", "codespell", ...args] });
  attempts.push({ cmd: "uvx", args: ["codespell", ...args] });

  for (const { cmd, args: spawnArgs } of attempts) {
    const result = spawnSync(cmd, spawnArgs, { cwd: root, encoding: "utf8" });
    if (result.error?.code === "ENOENT") continue;

    const output = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    return {
      ok: result.status === 0,
      output: output || (result.status === 0 ? "0 issues" : "codespell failed"),
      skipped: false,
      via: cmd,
    };
  }

  const installHint =
    "Install: pip install codespell | uv tool install codespell | set CODESPELL_BIN";

  if (!isCi()) {
    return {
      ok: true,
      skipped: true,
      output: `WARN: codespell not found — EN check skipped locally (${installHint}). CI enforces EN codespell.`,
    };
  }

  return {
    ok: false,
    skipped: false,
    output: `codespell not found in CI (${installHint}).`,
  };
}

function formatHits(label, hits) {
  return hits.map(
    h => `${label} "${h.term}" in ${path.relative(root, h.file)}:${h.line} — …${h.snippet}…`
  );
}

function failWithReport(errors) {
  const report = ["❌ lint-language failed:", ...errors.map(e => `  - ${e}`)].join("\n");
  console.error(report);
  console.log(report);
  process.exit(1);
}

function runJaTextlint(jaFiles) {
  if (jaFiles.length === 0) return { ok: true, output: "no JA files" };

  const args = ["scripts/lint-ja-textlint.mjs"];
  if (slugArg) args.push("--slug", slugArg);

  const result = spawnSync("node", args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });

  const output = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
  return {
    ok: result.status === 0,
    output: output || (result.status === 0 ? "0 issues" : "textlint failed"),
  };
}

function main() {
  const errors = [];
  const warnings = [];

  const koMarkdown = readText(koTerminologyPath);
  const koBannedHard = parseKoTerminologySection(koMarkdown, "## 확정");
  const koBannedSoft = parseKoTerminologySection(koMarkdown, "## 제안");
  const jaAllowlist = parseJaHangulAllowlist(readText(jaTerminologyPath));

  const koFiles = resolveFiles("ko");
  const jaFiles = resolveFiles("ja");
  const enFiles = resolveFiles("en");

  for (const filePath of koFiles) {
    const content = readText(filePath);
    errors.push(...formatHits("KO banned", findTermHits(content, filePath, koBannedHard)));
    warnings.push(
      ...formatHits("KO proposed (soft)", findTermHits(content, filePath, koBannedSoft))
    );
  }

  for (const filePath of jaFiles) {
    const content = readText(filePath);
    errors.push(...formatHits("JA hangul", findHangulHits(content, filePath, jaAllowlist)));
  }

  const codespell = runCodespell(enFiles);
  if (!codespell.ok) {
    errors.push(`EN codespell: ${codespell.output}`);
  } else if (codespell.skipped) {
    warnings.push(codespell.output);
  }

  if (warnings.length > 0) {
    console.warn("⚠️ lint-language warnings (non-blocking):\n");
    for (const w of warnings) {
      console.warn(`  - ${w}`);
    }
  }

  if (errors.length > 0) {
    failWithReport(errors);
  }

  const textlint = runJaTextlint(jaFiles);
  if (!textlint.ok) {
    failWithReport([`JA textlint: ${textlint.output}`]);
  }

  const scope = slugArg ? `slug=${slugArg}` : "full corpus";
  const enNote = codespell.skipped ? "EN skipped (no codespell)" : `EN ${enFiles.length} files`;
  console.log(
    `✅ lint-language passed (${scope}; KO hard ${koBannedHard.length}, KO soft ${koBannedSoft.length}, JA allowlist ${jaAllowlist.length}, ${enNote}; warnings ${warnings.length})`
  );
}

main();
