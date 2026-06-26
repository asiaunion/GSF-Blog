#!/usr/bin/env node
/**
 * Verify episode verification manifest against SSOT (A-layer) and optional KO draft.
 *
 * Usage:
 *   node scripts/verify-episode-manifest.mjs --manifest docs/verification/manifests/ep06-....manifest.json
 *   node scripts/verify-episode-manifest.mjs --slug tokyo-taito-sumida-koto
 *   node scripts/verify-episode-manifest.mjs --slug tokyo-taito-sumida-koto --require-gates
 *   node scripts/verify-episode-manifest.mjs --slug tokyo-taito-sumida-koto --draft src/data/blog/ko/tokyo-taito-sumida-koto.md
 */
import { readFile, access, readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { policyForCount } from "./lib/mlit-sample-policy.mjs";

const root = process.cwd();
const PKM_ROOT =
  process.env.PKM_ROOT ||
  path.join(process.env.HOME || "", ".gemini/antigravity/scratch/projects/GSF-PKM");
const BENCHMARKS = path.join(root, "docs/verification/tokyo-ward-series-benchmarks.json");
const MLIT_FALLBACK = path.join(root, "docs/verification/data/tokyo_mansion_stats_2025.json");
const MLIT_PKM = path.join(PKM_ROOT, "PKM/30 Resources/tokyo_mansion_stats_2025.json");
const SNAPSHOT_DIRS = [
  path.join(root, "docs/verification/snapshots"),
  path.join(root, ".cache/verification"),
];
const SCORES_DIR = path.join(root, "docs/verification/scores");

async function resolveManifestPath(slug) {
  const dir = path.join(root, "docs/verification/manifests");
  const direct = path.join(dir, `${slug}.manifest.json`);
  if (await fileExists(direct)) return direct;
  try {
    const files = await readdir(dir);
    for (const file of files.filter(f => f.endsWith(".manifest.json"))) {
      const candidate = path.join(dir, file);
      const data = await loadJson(candidate);
      if (data.slug === slug) return candidate;
    }
  } catch {
    /* manifests dir missing */
  }
  return direct;
}

function parseArgs(argv) {
  const out = { manifest: "", slug: "", draft: "", requireGates: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--") continue;
    if (a === "--manifest") out.manifest = argv[++i] ?? "";
    else if (a === "--slug") out.slug = argv[++i] ?? "";
    else if (a === "--draft") out.draft = argv[++i] ?? "";
    else if (a === "--require-gates") out.requireGates = true;
  }
  if (!out.draft && out.slug) {
    out.draft = path.join(root, "src/data/blog/ko", `${out.slug}.md`);
  }
  return out;
}

function getByPath(obj, dotted) {
  return dotted.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function evalFormula(formula) {
  const compact = formula.replace(/\s/g, "");
  const sanitized = compact.replace(/[^0-9.+\-*/()]/g, "");
  if (sanitized !== compact) {
    throw new Error(`unsafe formula: ${formula}`);
  }
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${sanitized});`)();
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function loadJson(p) {
  return JSON.parse(await readFile(p, "utf8"));
}

function parseChangePct(value) {
  if (value == null) return null;
  if (typeof value === "number") return value;
  const n = parseFloat(String(value).replace("%", ""));
  return Number.isNaN(n) ? null : n;
}

function checkBenchmarkLookup(claim, benchmarks) {
  const ref = claim.evidence?.benchmark;
  if (!ref) return { ok: false, reason: "missing evidence.benchmark" };
  const node = getByPath(benchmarks, ref);
  if (node == null) return { ok: false, reason: `benchmark path not found: ${ref}` };
  if (ref.includes("change_pct") && claim.value != null) {
    const bench = parseChangePct(node);
    const claimVal = parseChangePct(claim.value);
    if (bench != null && claimVal != null) {
      return Math.abs(bench - claimVal) <= 0.05
        ? { ok: true }
        : { ok: false, reason: `expected change_pct ${bench}, got ${claimVal}` };
    }
  }
  if (typeof node.minutes === "number" && claim.value != null) {
    return node.minutes === claim.value
      ? { ok: true }
      : { ok: false, reason: `expected minutes ${node.minutes}, got ${claim.value}` };
  }
  if (typeof node.est_70sqm === "number") {
    return node.est_70sqm === claim.value
      ? { ok: true }
      : { ok: false, reason: `expected est_70sqm ${node.est_70sqm}, got ${claim.value}` };
  }
  if (typeof node.value === "number") {
    return node.value === claim.value
      ? { ok: true }
      : { ok: false, reason: `expected value ${node.value}, got ${claim.value}` };
  }
  if (typeof node.top_passengers === "number" && claim.value != null) {
    return node.top_passengers === claim.value
      ? { ok: true }
      : { ok: false, reason: `expected top_passengers ${node.top_passengers}, got ${claim.value}` };
  }
  if (typeof node.cagr_5y === "number" && claim.value != null) {
    return node.cagr_5y === claim.value
      ? { ok: true }
      : { ok: false, reason: `expected cagr_5y ${node.cagr_5y}, got ${claim.value}` };
  }
  if (typeof node.change_pct === "number" && claim.value != null) {
    return node.change_pct === claim.value
      ? { ok: true }
      : { ok: false, reason: `expected change_pct ${node.change_pct}, got ${claim.value}` };
  }
  if (typeof node === "number" && claim.value != null) {
    return node === claim.value
      ? { ok: true }
      : { ok: false, reason: `expected ${node}, got ${claim.value}` };
  }
  return { ok: true, reason: "benchmark node present (non-numeric claim)" };
}

async function checkJsonLookup(claim, mlit) {
  const jp = claim.evidence?.json_path;
  if (!jp) return { ok: false, reason: "missing evidence.json_path" };
  const [ward, field] = jp.split(".");
  const wardData = mlit[ward];
  if (!wardData) return { ok: false, reason: `ward not in MLIT JSON: ${ward}` };
  const actual = wardData[field];
  if (actual == null) return { ok: false, reason: `field missing: ${jp}` };
  if (claim.value != null && Math.abs(actual - claim.value) > 0.01) {
    return { ok: false, reason: `MLIT ${jp}=${actual}, manifest=${claim.value}` };
  }
  return { ok: true };
}

async function resolveSnapshotPath(relativeOrAbsolute) {
  if (!relativeOrAbsolute) return "";
  const candidates = [
    path.join(root, relativeOrAbsolute),
    ...SNAPSHOT_DIRS.map(d => path.join(d, path.basename(relativeOrAbsolute))),
  ];
  for (const p of candidates) {
    if (await fileExists(p)) return p;
  }
  return "";
}

async function checkSuumoSnapshot(claim) {
  const snippet = claim.evidence?.snippet;
  if (!snippet) return { ok: false, reason: "missing evidence.snippet" };
  const snap = claim.evidence?.snapshot;
  const snapPath = await resolveSnapshotPath(snap);
  if (snapPath) {
    const html = await readFile(snapPath, "utf8");
    if (html.includes(snippet)) return { ok: true };
    return { ok: false, reason: `snippet not in snapshot file: ${snapPath}` };
  }
  const url = claim.evidence?.url ?? "";
  const m = url.match(/sc_([a-z_]+)/);
  const code = m?.[1];
  return {
    ok: false,
    reason: code
      ? `no snapshot file; run: node scripts/fetch-suumo-snapshot.mjs sc_${code} --commit`
      : `no snapshot file for ${url}`,
  };
}

function computeHallucinationScore(manifest, results) {
  const primaryClaims = (manifest.claims ?? []).filter(c => c.tier === "primary");
  const failedPrimary = results.filter(
    r => r.type === "claim" && r.tier === "primary" && !r.ok
  ).length;
  const total = primaryClaims.length || 1;
  return {
    failed_primary_claims: failedPrimary,
    total_primary_claims: primaryClaims.length,
    score: Math.round((failedPrimary / total) * 1000) / 1000,
    ok: failedPrimary === 0,
  };
}


function checkSampleSizePolicy(claim) {
  const n = claim.evidence?.count ?? claim.evidence?.n;
  if (n == null) return { ok: true, reason: "no count in evidence — skip n-tier" };
  const pol = policyForCount(n);
  if (claim.tier === "primary" && claim.used_in_draft !== false && !pol.blog_primary) {
    return { ok: false, reason: `n=${n} below blog_primary threshold (n<30)` };
  }
  if (claim.tier === "primary" && pol.footnote_required && !claim.footnote_required) {
    return { ok: false, reason: `n=${n} requires footnote_required on claim` };
  }
  return { ok: true };
}

function checkGates(manifest, requireGates) {
  const issues = [];
  const g = manifest.gates ?? {};
  if (!g.manifest_approved_by) issues.push("gate: manifest_approved_by not set");
  if (requireGates && !g.cursor_audit_passed) issues.push("gate: cursor_audit_passed not set");
  if (g.draft_started && !g.manifest_approved_by) {
    issues.push("gate: draft_started before manifest_approved_by");
  }
  return issues;
}

function extractDraftNumbers(md) {
  const body = md.replace(/^---[\s\S]*?---\n/, "");
  const matches = body.match(/\*\*[+-]?[\d,]+(?:\.\d+)?[^*]*\*\*/g) ?? [];
  return matches.map(s => s.replace(/\*\*/g, "").trim());
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.manifest && args.slug) {
    args.manifest = await resolveManifestPath(args.slug);
  }
  if (!args.manifest) {
    console.error("Usage: node scripts/verify-episode-manifest.mjs --slug <slug> [--require-gates]");
    process.exit(2);
  }

  const manifest = await loadJson(args.manifest);
  const benchmarks = await loadJson(BENCHMARKS);
  let mlit = {};
  const mlitPath = process.env.MLIT_JSON || ((await fileExists(MLIT_PKM)) ? MLIT_PKM : MLIT_FALLBACK);
  if (await fileExists(mlitPath)) {
    mlit = await loadJson(mlitPath);
  }

  const results = [];
  let failed = 0;

  for (const gateIssue of checkGates(manifest, args.requireGates)) {
    results.push({ type: "gate", id: gateIssue, ok: false });
    failed += 1;
  }

  for (const claim of manifest.claims ?? []) {
    let check = { ok: true, reason: "skipped" };
    if (claim.tier === "primary" && !claim.evidence) {
      check = { ok: false, reason: "primary claim missing evidence object" };
    } else if (claim.method === "benchmark_lookup") {
      check = checkBenchmarkLookup(claim, benchmarks);
    } else if (claim.method === "json_lookup") {
      check = claim.value == null ? { ok: true } : await checkJsonLookup(claim, mlit);
    } else if (claim.method === "suumo_snapshot") {
      check = await checkSuumoSnapshot(claim);
    } else if (claim.method === "user_capture") {
      check =
        claim.evidence?.capture_by === "user"
          ? { ok: true }
          : { ok: false, reason: "user_capture requires evidence.capture_by=user" };
    } else if (claim.method === "pkm_verified_card") {
      check = claim.evidence?.card
        ? { ok: true, reason: "PKM card reference — manual A-layer" }
        : { ok: false, reason: "pkm_verified_card requires evidence.card" };
    } else if (claim.tier === "secondary") {
      check = { ok: true, reason: "secondary — manual review" };
    }

    const nCheck = check.ok ? checkSampleSizePolicy(claim) : check;
    if (!nCheck.ok) check = nCheck;

    if (!check.ok) failed += 1;
    results.push({
      type: "claim",
      id: claim.id,
      tier: claim.tier,
      method: claim.method,
      ok: check.ok,
      reason: check.reason,
    });
  }

  for (const ar of manifest.arithmetic_checks ?? []) {
    try {
      const computed = evalFormula(ar.formula);
      const diff = Math.abs(computed - ar.expected);
      const ok = diff <= (ar.tolerance ?? 0.01);
      if (!ok) failed += 1;
      results.push({
        type: "arithmetic",
        id: ar.id,
        ok,
        computed,
        expected: ar.expected,
        formula: ar.formula,
      });
    } catch (e) {
      failed += 1;
      results.push({ type: "arithmetic", id: ar.id, ok: false, reason: String(e) });
    }
  }

  if (args.draft && (await fileExists(args.draft))) {
    const draft = await readFile(args.draft, "utf8");
    const nums = extractDraftNumbers(draft);
    const primaryValues = (manifest.claims ?? [])
      .filter(
        c =>
          c.tier === "primary" &&
          c.value != null &&
          c.used_in_draft !== false &&
          c.method !== "pkm_verified_card"
      )
      .map(c => String(c.value));
    for (const pv of primaryValues) {
      const normalized = pv.replace(/,/g, "");
      const alt =
        normalized.length > 4 && normalized.endsWith("0000")
          ? String(Number(normalized) / 10000)
          : null;
      const found = nums.some(n => {
        const nn = n.replace(/,/g, "");
        return nn.includes(normalized) || (alt != null && nn.includes(alt));
      });
      if (!found) {
        results.push({
          type: "draft_coverage",
          id: pv,
          ok: false,
          reason: `primary value ${pv} not found as bold in draft (heuristic)`,
        });
        failed += 1;
      }
    }
  }

  const hallucination = computeHallucinationScore(manifest, results);

  const report = {
    ok: failed === 0,
    slug: manifest.slug,
    episode: manifest.episode,
    manifest: args.manifest,
    failed,
    passed: results.filter(r => r.ok).length,
    total: results.length,
    hallucination_score: hallucination,
    results,
  };

  if (process.env.WRITE_VERIFICATION_SCORE === "1" || args.requireGates) {
    await mkdir(SCORES_DIR, { recursive: true });
    const scorePath = path.join(SCORES_DIR, `${manifest.slug}.json`);
    await writeFile(
      scorePath,
      `${JSON.stringify({ ...report, written_at: new Date().toISOString() }, null, 2)}\n`
    );
    report.score_file = scorePath;
  }

  console.log(JSON.stringify(report, null, 2));
  process.exit(failed === 0 ? 0 : 1);
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});
