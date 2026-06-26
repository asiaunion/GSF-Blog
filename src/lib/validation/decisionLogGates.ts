import { access, readFile } from "node:fs/promises";
import path from "node:path";

export interface DecisionLogGateResult {
  ok: boolean;
  name: string;
  output: string;
}

export interface DecisionLogValidation {
  exists: boolean;
  complete: boolean;
  issues: string[];
}

const REQUIRED_SECTIONS = [
  "data snapshot",
  "tiki-taka log",
  "central question",
  "trigger",
  "hypothesis",
  "final insight",
] as const;

function sectionBody(markdown: string, heading: string): string {
  const patterns = [
    new RegExp(
      `^##\\s+[^\\n]*${heading}[^\\n]*\\n([\\s\\S]*?)(?=^##\\s+|\\Z)`,
      "im"
    ),
    new RegExp(
      `^###\\s+[^\\n]*${heading}[^\\n]*\\n([\\s\\S]*?)(?=^#{1,3}\\s+|\\Z)`,
      "im"
    ),
  ];
  for (const pattern of patterns) {
    const match = markdown.match(pattern);
    if (match?.[1]?.trim()) return match[1].trim();
  }
  return "";
}

function hasSubstantiveContent(body: string): boolean {
  const stripped = body
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^\s*[-*]\s*\[[ x]\]\s*$/gim, "")
    .replace(/^\s*[-*]\s*$/gm, "")
    .replace(/^\s*\|\s*[-| :]+\s*\|?\s*$/gm, "")
    .replace(/[|>\s#*_`~-]/g, "")
    .trim();
  return stripped.length >= 12;
}

function countTikiTakaEntries(body: string): number {
  return (body.match(/^###\s+T\d+/gim) ?? []).length;
}

export function parseDecisionLog(markdown: string): DecisionLogValidation {
  const issues: string[] = [];

  for (const section of REQUIRED_SECTIONS) {
    const body = sectionBody(markdown, section);
    if (!body) {
      issues.push(`missing section: ${section}`);
      continue;
    }
    if (!hasSubstantiveContent(body)) {
      issues.push(`empty or placeholder: ${section}`);
    }
  }

  const tikiBody = sectionBody(markdown, "tiki-taka");
  if (countTikiTakaEntries(tikiBody) < 1) {
    issues.push("tiki-taka: need at least one ### T1 entry with Q/A");
  }

  return {
    exists: true,
    complete: issues.length === 0,
    issues,
  };
}

export async function loadPilotSlugs(projectRoot: string): Promise<Set<string>> {
  const pilotPath = path.join(
    projectRoot,
    "docs/pilot/hypothesis-layer-pilot-slugs.json"
  );
  try {
    const raw = await readFile(pilotPath, "utf8");
    const data = JSON.parse(raw) as { slugs?: string[] };
    return new Set(data.slugs ?? []);
  } catch {
    return new Set();
  }
}

async function fileExists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function loadManifestFlags(projectRoot: string, slug: string) {
  const dir = path.join(projectRoot, "docs/verification/manifests");
  try {
    const { readdir } = await import("node:fs/promises");
    const files = await readdir(dir);
    for (const file of files.filter(f => f.endsWith(".manifest.json"))) {
      const raw = await readFile(path.join(dir, file), "utf8");
      const data = JSON.parse(raw) as {
        slug?: string;
        gates?: {
          hypothesis_layer_required?: boolean;
          decision_log_waived_by?: string;
        };
      };
      if (data.slug !== slug) continue;
      return {
        required: Boolean(data.gates?.hypothesis_layer_required),
        waived: Boolean(data.gates?.decision_log_waived_by?.trim()),
      };
    }
  } catch {
    /* no manifests */
  }
  return { required: false, waived: false };
}

export async function shouldEnforceDecisionLog(
  projectRoot: string,
  slug: string
): Promise<boolean> {
  const pilot = await loadPilotSlugs(projectRoot);
  if (pilot.has(slug)) return true;
  const flags = await loadManifestFlags(projectRoot, slug);
  if (flags.waived) return false;
  return flags.required;
}

export async function validateDecisionLogFile(
  projectRoot: string,
  slug: string
): Promise<DecisionLogValidation & { path: string }> {
  const logPath = path.join(
    projectRoot,
    ".blog-agent-stage",
    slug,
    "decision-log.md"
  );
  if (!(await fileExists(logPath))) {
    return {
      path: logPath,
      exists: false,
      complete: false,
      issues: ["decision-log.md not found"],
    };
  }
  const markdown = await readFile(logPath, "utf8");
  const parsed = parseDecisionLog(markdown);
  return { ...parsed, path: logPath };
}

export async function runDecisionLogGates(
  projectRoot: string,
  slug: string
): Promise<DecisionLogGateResult[]> {
  const enforce = await shouldEnforceDecisionLog(projectRoot, slug);
  if (!enforce) {
    return [
      {
        ok: true,
        name: "decision-log-pilot-skip",
        output: "slug not in pilot list and hypothesis_layer_required unset",
      },
    ];
  }

  if (process.env.SKIP_DECISION_LOG_CHECK === "1") {
    return [
      {
        ok: true,
        name: "decision-log-skipped",
        output: "SKIP_DECISION_LOG_CHECK=1",
      },
    ];
  }

  const flags = await loadManifestFlags(projectRoot, slug);
  if (flags.waived) {
    return [
      {
        ok: true,
        name: "decision-log-waived",
        output: "manifest gates.decision_log_waived_by",
      },
    ];
  }

  const result = await validateDecisionLogFile(projectRoot, slug);
  const gates: DecisionLogGateResult[] = [
    {
      ok: result.exists,
      name: "decision-log-exists",
      output: result.exists
        ? `ok — ${result.path}`
        : `MISSING: ${result.path}\n→ See docs/JOSEPH_AUTHOR_OPS.md Phase 0–2`,
    },
  ];

  if (result.exists) {
    gates.push({
      ok: result.complete,
      name: "decision-log-complete",
      output: result.complete
        ? "ok — required sections + tiki-taka"
        : `incomplete:\n${result.issues.map(i => `  - ${i}`).join("\n")}`,
    });
  }

  return gates;
}
