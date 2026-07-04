import fs from "node:fs";
import path from "node:path";
import kebabcase from "lodash.kebabcase";
import slugify from "slugify";

const hasNonLatin = (str) => /[^\x00-\x7F]/.test(str);
const slugifyStr = (str) => {
  if (hasNonLatin(str)) {
    return kebabcase(str);
  }
  return slugify(str, { lower: true });
};

const strictAliases = process.argv.includes("--strict-aliases");
const blogDir = "src/data/blog";
const taxonomyPath = "src/data/tag-taxonomy.yaml";

// 1. Parse taxonomy.yaml
if (!fs.existsSync(taxonomyPath)) {
  console.error(`Taxonomy file not found at ${taxonomyPath}`);
  process.exit(1);
}

const yamlStr = fs.readFileSync(taxonomyPath, "utf-8");

function parseTaxonomyYaml(yamlStr) {
  const concepts = [];
  const lines = yamlStr.split('\n');
  let currentConcept = null;
  let inLabels = false;
  let inAliases = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('- id:')) {
      const id = trimmed.split('- id:')[1].trim();
      currentConcept = { id, labels: {}, aliases: {} };
      concepts.push(currentConcept);
      inLabels = false;
      inAliases = false;
      continue;
    }

    if (trimmed.startsWith('labels:')) {
      inLabels = true;
      inAliases = false;
      continue;
    }

    if (trimmed.startsWith('aliases:')) {
      inAliases = true;
      inLabels = false;
      continue;
    }

    if (inLabels && currentConcept) {
      const match = trimmed.match(/^([a-z]{2}):\s*["']?([^"']+)["']?$/);
      if (match) {
        currentConcept.labels[match[1]] = match[2];
      }
    }

    if (inAliases && currentConcept) {
      const match = trimmed.match(/^([a-z]{2}):\s*\[([^\]]*)\]$/);
      if (match) {
        const list = match[2].split(',').map(x => x.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
        currentConcept.aliases[match[1]] = list;
      }
    }
  }
  return { version: 1, concepts };
}

const { concepts } = parseTaxonomyYaml(yamlStr);

// Create lookup maps for fast validation
const labelToConcept = new Map();
const aliasToConcept = new Map();

for (const c of concepts) {
  // 1) Match by concept id directly
  labelToConcept.set(c.id, c);
  
  // 2) Match by actual label strings
  for (const lang of Object.keys(c.labels)) {
    const label = c.labels[lang];
    if (label) {
      labelToConcept.set(label, c);
      labelToConcept.set(slugifyStr(label), c);
    }
  }
  
  // 3) Match by alias strings
  for (const lang of Object.keys(c.aliases)) {
    const list = c.aliases[lang];
    for (const alias of list) {
      aliasToConcept.set(alias, c);
      aliasToConcept.set(slugifyStr(alias), c);
    }
  }
}

// 2. Validate all posts
const locales = ["en", "ko", "ja"];
let hasErrors = false;
let hasWarnings = false;

for (const loc of locales) {
  const dir = path.join(blogDir, loc);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".md") || f.endsWith(".mdx"));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) continue;
    const fm = fmMatch[1];
    
    let tags = [];
    
    // Format 1: tags: ["tag1", "tag2"]
    const inlineMatch = fm.match(/^tags:\s*\[([^\]]*)\]/m);
    if (inlineMatch) {
      tags = inlineMatch[1]
        .split(",")
        .map(t => t.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    }
    
    // Format 2: tags:\n  - tag1
    const listMatch = fm.match(/^tags:\s*\n((?:\s+-\s+.+\n?)*)/m);
    if (listMatch) {
      tags = listMatch[1]
        .split("\n")
        .map(line => line.replace(/^\s+-\s+/, "").trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    }
    
    for (const tag of tags) {
      // Direct label check
      if (labelToConcept.has(tag) || labelToConcept.has(slugifyStr(tag))) {
        continue;
      }
      
      // Alias check
      if (aliasToConcept.has(tag) || aliasToConcept.has(slugifyStr(tag))) {
        const concept = aliasToConcept.get(tag) || aliasToConcept.get(slugifyStr(tag));
        const preferred = concept.labels[loc] || concept.labels.en || concept.id;
        console.warn(`WARN alias: "${tag}" -> prefer "${preferred}" (concept ${concept.id}) in file ${filePath}`);
        hasWarnings = true;
        if (strictAliases) {
          hasErrors = true;
        }
        continue;
      }
      
      console.error(`ERROR: Unregistered tag "${tag}" found in file ${filePath}`);
      hasErrors = true;
    }
  }
}

if (hasErrors) {
  console.error("\n❌ Tag taxonomy lint failed.");
  process.exit(1);
} else {
  if (hasWarnings) {
    console.log("\n⚠️ Tag taxonomy lint completed with warnings (aliases used).");
  } else {
    console.log("\n✅ Tag taxonomy lint passed successfully.");
  }
  process.exit(0);
}
