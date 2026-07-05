/**
 * JA textlint gate — prh terminology (docs/ja-prh.yml) on blog JA markdown.
 *
 * Usage:
 *   node scripts/lint-ja-textlint.mjs
 *   node scripts/lint-ja-textlint.mjs --slug foo
 *
 * Config: .textlintrc.json (prh-only baseline; preset-ja-technical-writing is optional future strict mode)
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const blogJaDir = path.join(root, "src/data/blog/ja");

const slugArg = (() => {
  const idx = process.argv.indexOf("--slug");
  return idx >= 0 ? process.argv[idx + 1] : "";
})();

function resolveJaFiles() {
  if (!fs.existsSync(blogJaDir)) return [];
  if (slugArg) {
    for (const ext of [".md", ".mdx"]) {
      const candidate = path.join(blogJaDir, `${slugArg}${ext}`);
      if (fs.existsSync(candidate)) return [candidate];
    }
    return [];
  }
  return fs
    .readdirSync(blogJaDir)
    .filter(f => f.endsWith(".md") || f.endsWith(".mdx"))
    .map(f => path.join(blogJaDir, f));
}

function runTextlint(files) {
  if (files.length === 0) {
    return { ok: true, output: "no JA files" };
  }

  const textlintBin = path.join(root, "node_modules", ".bin", "textlint");
  const cmd = fs.existsSync(textlintBin) ? textlintBin : "npx";
  const args =
    cmd === textlintBin
      ? ["--format", "compact", ...files]
      : ["textlint", "--format", "compact", ...files];

  const result = spawnSync(cmd, args, {
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
  const files = resolveJaFiles();
  const result = runTextlint(files);

  if (!result.ok) {
    console.error("❌ lint-ja-textlint failed:\n");
    console.error(result.output);
    console.log(result.output);
    process.exit(1);
  }

  const scope = slugArg ? `slug=${slugArg}` : `full corpus (${files.length} files)`;
  console.log(`✅ lint-ja-textlint passed (${scope}; prh rules from docs/ja-prh.yml)`);
}

main();
