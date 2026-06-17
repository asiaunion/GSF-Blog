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
const outDir = path.join(root, ".cache/verification");

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
  const input = process.argv[2];
  if (!input) {
    console.error("Usage: node scripts/fetch-suumo-snapshot.mjs <sc_code|url>");
    process.exit(2);
  }

  const url = resolveUrl(input);
  const code = codeFromUrl(url);
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const outFile = path.join(outDir, `suumo-sc_${code}-${date}.html`);

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
