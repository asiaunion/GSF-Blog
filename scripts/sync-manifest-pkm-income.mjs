#!/usr/bin/env node
/**
 * Verify manifest pkm_verified_card income claims against PKM card (Phase 3).
 *
 * Usage:
 *   node scripts/sync-manifest-pkm-income.mjs --slug tokyo-taito-sumida-koto
 */
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const PKM_ROOT =
  process.env.PKM_ROOT ||
  path.join(process.env.HOME || "", ".gemini/antigravity/scratch/projects/GSF-PKM");
const INCOME_CARD = path.join(
  PKM_ROOT,
  "PKM/30 Resources/도쿄_23구_인당_실질소득_통계_2025.md"
);

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function resolveManifestPath(slug) {
  const dir = path.join(root, "docs/verification/manifests");
  const files = await readdir(dir).catch(() => []);
  for (const file of files.filter(f => f.endsWith(".manifest.json"))) {
    const full = path.join(dir, file);
    const data = JSON.parse(await readFile(full, "utf8"));
    if (data.slug === slug) return full;
  }
  return path.join(dir, `${slug}.manifest.json`);
}

function parseIncomeTable(markdown) {
  const byWard = {};
  for (const line of markdown.split("\n")) {
    if (!line.includes("|") || line.includes("---") || line.includes("순위")) continue;
    const cells = line.split("|").map(c => c.trim()).filter(Boolean);
    if (cells.length < 7) continue;
    const rank = parseInt(cells[0], 10);
    const wardMatch = (cells[1] ?? "").match(/([\u4e00-\u9faf]+区)/);
    if (!wardMatch || !Number.isFinite(rank)) continue;
    const perCapita = parseFloat((cells[6] ?? "").replace(/[^\d.]/g, ""));
    if (Number.isFinite(perCapita)) {
      byWard[wardMatch[1]] = { rank, value: perCapita };
    }
  }
  return byWard;
}

async function main() {
  const slugIdx = process.argv.indexOf("--slug");
  const slug = slugIdx >= 0 ? process.argv[slugIdx + 1] : process.argv[2];
  if (!slug) {
    console.error("Usage: node scripts/sync-manifest-pkm-income.mjs --slug <slug>");
    process.exit(2);
  }

  if (!(await fileExists(INCOME_CARD))) {
    console.error(`PKM income card not found: ${INCOME_CARD}`);
    process.exit(2);
  }

  const manifest = JSON.parse(await readFile(await resolveManifestPath(slug), "utf8"));
  const card = await readFile(INCOME_CARD, "utf8");
  if (!/verified:\s*true/i.test(card)) {
    console.error("PKM income card verified: true not set");
    process.exit(1);
  }

  const table = parseIncomeTable(card);
  const mismatches = [];

  for (const claim of manifest.claims ?? []) {
    if (claim.method !== "pkm_verified_card") continue;
    const wardMatch = claim.label?.match(/([\u4e00-\u9faf]+区)/);
    const ward = wardMatch?.[1];
    if (!ward || !table[ward]) {
      mismatches.push({ id: claim.id, reason: `ward not in PKM table: ${ward}` });
      continue;
    }
    const row = table[ward];
    if (claim.value != null && Math.abs(row.value - claim.value) > 0.05) {
      mismatches.push({
        id: claim.id,
        reason: `value mismatch manifest=${claim.value} pkm=${row.value}`,
      });
    }
    if (claim.evidence?.rank != null && row.rank !== claim.evidence.rank) {
      mismatches.push({
        id: claim.id,
        reason: `rank mismatch manifest=${claim.evidence.rank} pkm=${row.rank}`,
      });
    }
  }

  const ok = mismatches.length === 0;
  console.log(JSON.stringify({ ok, slug, mismatches, pkm_card: INCOME_CARD }, null, 2));
  process.exit(ok ? 0 : 1);
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
