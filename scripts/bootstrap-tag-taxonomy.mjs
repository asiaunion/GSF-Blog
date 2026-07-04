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

const blogDir = "src/data/blog";
const locales = ["en", "ko", "ja"];

// 1. collect all tags by locale
const tagsByLocale = { en: new Set(), ko: new Set(), ja: new Set() };

for (const loc of locales) {
  const dir = path.join(blogDir, loc);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".md") || f.endsWith(".mdx"));
  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), "utf-8");
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) continue;
    const fm = fmMatch[1];
    
    // Format 1: tags: ["tag1", "tag2"]
    const inlineMatch = fm.match(/^tags:\s*\[([^\]]*)\]/m);
    if (inlineMatch) {
      const list = inlineMatch[1]
        .split(",")
        .map(t => t.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      for (const t of list) tagsByLocale[loc].add(t);
    }
    
    // Format 2: tags:\n  - tag1
    const listMatch = fm.match(/^tags:\s*\n((?:\s+-\s+.+\n?)*)/m);
    if (listMatch) {
      const list = listMatch[1]
        .split("\n")
        .map(line => line.replace(/^\s+-\s+/, "").trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      for (const t of list) tagsByLocale[loc].add(t);
    }
  }
}

// 2. Group by slug
const slugGroups = new Map(); // slug -> { labels: Set, locales: Set }

for (const loc of locales) {
  for (const tag of tagsByLocale[loc]) {
    const slug = slugifyStr(tag);
    if (!slugGroups.has(slug)) {
      slugGroups.set(slug, { labels: new Set(), locales: new Set() });
    }
    const group = slugGroups.get(slug);
    group.labels.add(tag);
    group.locales.add(loc);
  }
}

// 3. build concepts
const concepts = [];

for (const [slug, group] of slugGroups.entries()) {
  const concept = {
    id: slug,
    labels: {},
  };
  
  const hasKorean = (str) => /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(str);
  const hasJapanese = (str) => /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(str);
  
  let enLabel = "";
  let koLabel = "";
  let jaLabel = "";
  
  for (const label of group.labels) {
    if (hasKorean(label)) {
      koLabel = label;
    } else if (hasJapanese(label)) {
      jaLabel = label;
    } else {
      enLabel = label;
    }
  }
  
  const primaryEn = enLabel || slug;
  concept.labels.en = primaryEn;
  concept.labels.ko = koLabel || primaryEn;
  concept.labels.ja = jaLabel || primaryEn;
  
  concepts.push(concept);
}

// Sort concepts by id for cleaner output
concepts.sort((a, b) => a.id.localeCompare(b.id));

// Write to YAML format
let yamlContent = "version: 1\nconcepts:\n";
for (const c of concepts) {
  yamlContent += `  - id: ${c.id}\n`;
  yamlContent += `    labels:\n`;
  yamlContent += `      en: "${c.labels.en}"\n`;
  yamlContent += `      ko: "${c.labels.ko}"\n`;
  yamlContent += `      ja: "${c.labels.ja}"\n`;
}

const targetPath = "src/data/tag-taxonomy.yaml";
fs.writeFileSync(targetPath, yamlContent);
console.log("Bootstrap tag taxonomy completed!");
