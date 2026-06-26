#!/usr/bin/env node
/**
 * Decision Log gate for Hypothesis Layer pilot slugs.
 *
 * Usage:
 *   pnpm verify:decision-log --slug <slug>
 */
import { runDecisionLogGates } from "../src/lib/validation/decisionLogGates.ts";

const slug = process.argv.find((a, i) => process.argv[i - 1] === "--slug") ?? "";

if (!slug) {
  console.error("Usage: pnpm verify:decision-log --slug <slug>");
  process.exit(2);
}

const gates = await runDecisionLogGates(process.cwd(), slug);
const failed = gates.filter(g => !g.ok);

console.log(JSON.stringify({ ok: failed.length === 0, slug, gates }, null, 2));
process.exit(failed.length === 0 ? 0 : 1);
