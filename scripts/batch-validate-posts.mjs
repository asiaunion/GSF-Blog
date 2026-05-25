/**
 * Run validation gates for all published slugs (no npm build).
 * Usage: SKIP_VALIDATE_BUILD=1 node scripts/batch-validate-posts.mjs
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { runBlogValidation } from "../src/lib/validation/validationGates.ts";

const root = process.cwd();
const koDir = path.join(root, "src/data/blog/ko");

async function main() {
  process.env.SKIP_VALIDATE_BUILD = "1";
  process.env.SKIP_TRUST_VERIFY = process.env.SKIP_TRUST_VERIFY ?? "1";
  const slugs = (await readdir(koDir))
    .filter(f => f.endsWith(".md"))
    .map(f => f.replace(/\.md$/, ""));

  const summary = { pass: [], fail: {} };
  for (const slug of slugs) {
    const ko = await readFile(path.join(koDir, `${slug}.md`), "utf8");
    const en = await readFile(path.join(root, "src/data/blog/en", `${slug}.md`), "utf8").catch(() => "");
    const ja = await readFile(path.join(root, "src/data/blog/ja", `${slug}.md`), "utf8").catch(() => "");
    const result = await runBlogValidation(root, [ko, en, ja], { slug });
    if (result.ok) {
      summary.pass.push(slug);
    } else {
      const failed = result.checks.filter(c => !c.ok).map(c => c.name);
      summary.fail[slug] = failed;
    }
  }
  console.log(JSON.stringify({ pass: summary.pass.length, fail: Object.keys(summary.fail).length, details: summary.fail }, null, 2));
}

main();
