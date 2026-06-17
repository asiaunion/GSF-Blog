#!/usr/bin/env node
/**
 * Fetch SUUMO chintai soba page and save HTML snapshot for B-layer verification.
 *
 * Usage:
 *   node scripts/fetch-suumo-snapshot.mjs sc_taito
 *   node scripts/fetch-suumo-snapshot.mjs https://suumo.jp/chintai/soba/tokyo/sc_taito/
 *
 * Output: .cache/verification/suumo-<code>-YYYYMMDD.html
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const cacheDir = path.join(root, ".cache/verification");
const commitDir = path.join(root, "docs/verification/snapshots");

function resolveUrl(input) {
  if (input.startsWith("http")) return input;
  const code = input.replace(/^sc_/, "");
  return `https://suumo.jp/chintai/soba/tokyo/sc_${code}/`;
}

function codeFromUrl(url) {
  const m = url.match(/sc_([a-z_]+)/);
  return m ? m[1] : "unknown";
}

function extractPagecaption(html) {
  const m = html.match(/class="pagecaption"[^>]*>([^<]+)/);
  return m ? m[1].trim() : null;
}

async function main() {
async function main() {
  const commit = process.argv.includes("--commit");
  let input = "";
  for (let i = 2; i < process.argv.length; i += 1) {
    const a = process.argv[i];
    if (a === "--commit") continue;
    input = a;
    break;
  }
  if (!input) {
    console.error("Usage: node scripts/fetch-suumo-snapshot.mjs <sc_code|url>");
    process.exit(2);
  }

  const url = resolveUrl(input);
  const code = codeFromUrl(url);
  const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const fileName = `suumo-sc_${code}-${dateStamp}.html`;
  const outDir = commit ? commitDir : cacheDir;
  const outFile = path.join(outDir, fileName);

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "ja,en;q=0.9",
    },
  });

  if (!res.ok) {
    console.error(
      JSON.stringify(
        {
          ok: false,
          url,
          status: res.status,
          message: "Fetch failed — use user browser capture (C-tier protocol)",
        },
        null,
        2
      )
    );
    process.exit(1);
  }

  const html = await res.text();
  await mkdir(outDir, { recursive: true });
  await writeFile(outFile, html, "utf8");

  const caption = extractPagecaption(html);
  console.log(
    JSON.stringify(
      {
        ok: true,
        url,
        snapshot: path.relative(root, outFile),
        committed: commit,
        pagecaption: caption,
        hint: "Add snapshot path + snippet to manifest claim evidence",
      },
      null,
      2
    )
  );
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
