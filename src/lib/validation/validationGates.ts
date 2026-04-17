import { execFile } from "node:child_process";

function runCommand(command: string, args: string[], cwd: string) {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    execFile(command, args, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || stdout || error.message));
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

export interface ValidationResult {
  ok: boolean;
  checks: Array<{ name: string; ok: boolean; output: string }>;
  hardGatePassed: boolean;
  scorePassed: boolean;
  score: number;
  minimumScore: number;
  hardGates: Array<{ name: string; ok: boolean; output: string }>;
  scoreChecks: Array<{ name: string; ok: boolean; output: string; weight: number }>;
}

function stripFrontmatter(markdown: string) {
  const lines = markdown.split("\n");
  if (lines[0]?.trim() !== "---") return markdown;
  const end = lines.findIndex((line, idx) => idx > 0 && line.trim() === "---");
  if (end < 0) return markdown;
  return lines.slice(end + 1).join("\n");
}

function countExternalLinks(markdown: string) {
  const links = markdown.match(/https?:\/\/[^\s)"]+/g) || [];
  return links.length;
}

function hasRiskyClaims(markdown: string) {
  const riskyPatterns = [
    /반드시/g,
    /무조건/g,
    /확정 수익/g,
    /guaranteed/gi,
    /must insist/gi,
    /絶対に/gi,
  ];
  return riskyPatterns.some(pattern => pattern.test(markdown));
}

function similarityScore(a: string, b: string) {
  const aa = a.replace(/\s+/g, " ").trim().toLowerCase();
  const bb = b.replace(/\s+/g, " ").trim().toLowerCase();
  if (!aa || !bb) return 0;
  const tokensA = new Set(aa.split(" "));
  const tokensB = new Set(bb.split(" "));
  const overlap = Array.from(tokensA).filter(token => tokensB.has(token)).length;
  return overlap / Math.max(tokensA.size, tokensB.size);
}

function extractFrontmatterList(markdown: string, key: "sources" | "references") {
  const lines = markdown.split("\n");
  const start = lines.findIndex(line => line.trim() === `${key}:`);
  if (start < 0) return [];
  const values: string[] = [];
  for (let idx = start + 1; idx < lines.length; idx += 1) {
    const line = lines[idx];
    if (!line.startsWith("  - ")) break;
    values.push(line.replace("  - ", "").replaceAll('"', "").trim());
  }
  return values;
}

function extractFrontmatterValue(markdown: string, key: "title" | "description") {
  const match = markdown.match(new RegExp(`^${key}:\\s*"([^"]+)"`, "m"));
  return match?.[1]?.trim() ?? "";
}

function normalizeToken(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(value: string) {
  return new Set(normalizeToken(value).split(" ").filter(token => token.length >= 2));
}

function countKoreanChars(text: string) {
  const match = text.match(/[가-힣]/g);
  return match?.length ?? 0;
}

function countJapaneseChars(text: string) {
  const match = text.match(/[ぁ-ゔァ-ヴー々〆〤一-龥]/g);
  return match?.length ?? 0;
}

function hasFormalKoEnding(text: string) {
  return /(습니다|입니다|합니다|됩니다|있습니다|보입니다|필요합니다|가능합니다)/.test(text);
}

function hasFormalJaEnding(text: string) {
  return /(です。|ます。|と考えられます。|と言えます。|必要があります。)/.test(text);
}

function hasInformalKoPattern(text: string) {
  return /([가-힣]+다\.)/.test(text);
}

function hasInformalJaPattern(text: string) {
  return /(\Sだ。|\Sである。)/.test(text);
}

function hasTierSource(urls: string[]) {
  const signals = [".go.kr", ".go.jp", ".gov", ".or.jp", ".ac.jp", "nikkei.com", "reuters.com", "bloomberg.com", "wsj.com", "bbc.com"];
  const merged = urls.join(" ").toLowerCase();
  return signals.some(signal => merged.includes(signal));
}

export function validateReferenceSubset(markdown: string) {
  const sources = new Set(extractFrontmatterList(markdown, "sources"));
  const references = extractFrontmatterList(markdown, "references");
  const invalid = references.filter(ref => !sources.has(ref));
  return {
    ok: invalid.length === 0,
    invalid,
  };
}

export async function runBlogValidation(projectRoot: string, markdownCandidates: string[]) {
  const hardGates: ValidationResult["hardGates"] = [];
  const scoreChecks: ValidationResult["scoreChecks"] = [];
  const minimumScore = 80;

  markdownCandidates.forEach((content, index) => {
    const subset = validateReferenceSubset(content);
    hardGates.push({
      name: `reference-subset-${index + 1}`,
      ok: subset.ok,
      output: subset.ok ? "ok" : `invalid refs: ${subset.invalid.join(", ")}`,
    });
  });

  const koBody = stripFrontmatter(markdownCandidates[0] ?? "");
  const enBody = stripFrontmatter(markdownCandidates[1] ?? "");
  const jaBody = stripFrontmatter(markdownCandidates[2] ?? "");
  const hasEnContent = enBody.trim().length > 40;
  const hasJaContent = jaBody.trim().length > 40;
  const koSources = extractFrontmatterList(markdownCandidates[0] ?? "", "sources");
  const koTitle = extractFrontmatterValue(markdownCandidates[0] ?? "", "title");

  const externalLinks = countExternalLinks(koBody);
  scoreChecks.push({
    name: "adsense-link-density",
    ok: externalLinks <= 20,
    output: `external links in KO body: ${externalLinks}`,
    weight: 10,
  });

  const risky = hasRiskyClaims(koBody) || hasRiskyClaims(enBody) || hasRiskyClaims(jaBody);
  hardGates.push({
    name: "adsense-risky-claims",
    ok: !risky,
    output: risky ? "risky certainty claim pattern detected" : "ok",
  });

  const enJaSimilarity = similarityScore(enBody, jaBody);
  scoreChecks.push({
    name: "translation-duplication-feel",
    ok: enJaSimilarity < 0.92,
    output: `en-ja lexical similarity: ${enJaSimilarity.toFixed(3)}`,
    weight: 10,
  });

  const koLen = countKoreanChars(koBody);
  hardGates.push({
    name: "ko-length-target",
    ok: koLen >= 1800 && koLen <= 2300,
    output: `ko chars: ${koLen} (target 1800~2300)`,
  });

  const koPolite = hasFormalKoEnding(koBody) && !hasInformalKoPattern(koBody);
  hardGates.push({
    name: "ko-formal-tone",
    ok: koPolite,
    output: koPolite ? "ok" : "non-formal Korean endings detected",
  });

  const jaPolite =
    !hasJaContent ||
    countJapaneseChars(jaBody) < 120 ||
    (hasFormalJaEnding(jaBody) && !hasInformalJaPattern(jaBody));
  hardGates.push({
    name: "ja-formal-tone",
    ok: jaPolite,
    output: jaPolite ? "ok" : "non-formal Japanese endings detected",
  });

  const titleTokens = tokenSet(koTitle);
  const bodyTokens = tokenSet(koBody);
  const titleOverlap = titleTokens.size
    ? Array.from(titleTokens).filter(token => bodyTokens.has(token)).length / titleTokens.size
    : 1;
  hardGates.push({
    name: "title-body-alignment",
    ok: titleOverlap >= 0.45,
    output: `title token overlap: ${titleOverlap.toFixed(2)}`,
  });

  hardGates.push({
    name: "tier-source-minimum",
    ok: hasTierSource(koSources),
    output: hasTierSource(koSources) ? "ok" : "missing government/public/media source",
  });

  hardGates.push({
    name: "disclaimer-present",
    ok:
      koBody.includes("정보 제공 목적") &&
      (!hasEnContent || enBody.toLowerCase().includes("informational purposes")) &&
      (!hasJaContent || jaBody.includes("情報提供")),
    output: "ko/en/ja disclaimer check",
  });

  try {
    const { stdout } = await runCommand("npm", ["run", "build"], projectRoot);
    hardGates.push({ name: "build", ok: true, output: stdout.slice(-1200) });
  } catch (error) {
    hardGates.push({
      name: "build",
      ok: false,
      output: error instanceof Error ? error.message : "build failed",
    });
  }

  const hardGatePassed = hardGates.every(check => check.ok);
  const totalWeight = scoreChecks.reduce((sum, item) => sum + item.weight, 0) || 1;
  const scoreRaw = scoreChecks
    .filter(item => item.ok)
    .reduce((sum, item) => sum + item.weight, 0);
  const score = Math.round((scoreRaw / totalWeight) * 100);
  const scorePassed = score >= minimumScore;
  const checks: ValidationResult["checks"] = [
    ...hardGates,
    ...scoreChecks.map(({ weight, ...rest }) => rest),
  ];

  return {
    ok: hardGatePassed && scorePassed,
    checks,
    hardGatePassed,
    scorePassed,
    score,
    minimumScore,
    hardGates,
    scoreChecks,
  };
}
