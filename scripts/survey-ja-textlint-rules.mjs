#!/usr/bin/env node
/** One-off survey: count JA textlint violations per preset rule. */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const jaDir = path.join(root, "src/data/blog/ja");
const files = fs.readdirSync(jaDir).filter(f => f.endsWith(".md")).map(f => path.join(jaDir, f));

const ruleKeys = [
  "no-zero-width-spaces",
  "no-invalid-control-character",
  "no-nfd",
  "no-hankaku-kana",
  "no-unmatched-pair",
  "arabic-kanji-numbers",
  "ja-no-successive-word",
  "no-doubled-joshi",
  "no-doubled-conjunction",
  "no-doubled-conjunctive-particle-ga",
  "no-dropping-the-ra",
  "no-double-negative-ja",
  "ja-no-abusage",
  "ja-no-redundant-expression",
  "ja-no-mixed-period",
  "no-mix-dearu-desumasu",
  "max-ten",
  "max-comma",
  "sentence-length",
  "max-kanji-continuous-len",
  "ja-no-weak-phrase",
  "no-exclamation-question-mark",
  "ja-unnatural-alphabet",
];

const disabled = Object.fromEntries(ruleKeys.map(k => [k, false]));
const cfgPath = path.join(root, ".textlint-survey.json");

for (const rule of ruleKeys) {
  const config = {
    plugins: { "@textlint/markdown": true },
    rules: {
      prh: { rulePaths: ["./docs/ja-prh.yml"] },
      "preset-ja-technical-writing": { ...disabled, [rule]: true },
    },
  };
  fs.writeFileSync(cfgPath, JSON.stringify(config, null, 2));
  const r = spawnSync("npx", ["textlint", "-c", cfgPath, ...files], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });
  const text = `${r.stdout}\n${r.stderr}`;
  const m = text.match(/✖ (\d+) problems/);
  const count = m ? m[1] : r.status === 0 ? "0" : "?";
  console.log(`${count.padStart(4)}  ${rule}`);
}

fs.unlinkSync(cfgPath);
