/**
 * Generates 308 redirects for ALL cross-locale tag URLs at build time.
 *
 * Problem: Google crawls /ko/tags/<EN-tag>/, /ja/tags/<KO-tag>/,
 * /tags/<KO-tag>/, /ko/tags/<JA-tag>/ etc. — all 404 because Astro
 * only builds locale-specific tag pages.
 *
 * Solution: Read ALL tags from ALL locale posts at build time,
 * detect language via Unicode ranges, and generate exhaustive
 * redirect rules. No hardcoded tag lists needed.
 *
 * V7 rewrite: fully dynamic, reads from src/data/blog/{en,ko,ja}/*.md
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { slugifyStr } from "../utils/slugify";

// ── Language detection (same logic as middleware.ts) ──

function hasKorean(str: string): boolean {
  return /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(str);
}

function hasJapanese(str: string): boolean {
  return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(str);
}

type TagLang = "en" | "ko" | "ja";

function detectTagLang(tag: string): TagLang {
  if (hasKorean(tag)) return "ko";
  if (hasJapanese(tag)) return "ja";
  return "en";
}

// ── Extract tags from markdown frontmatter ──

function extractTagsFromFile(filePath: string): string[] {
  const content = readFileSync(filePath, "utf-8");
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return [];

  const fm = fmMatch[1];

  // Format 1: tags: ["tag1", "tag2", "tag3"]
  const inlineMatch = fm.match(
    /^tags:\s*\[([^\]]*)\]/m
  );
  if (inlineMatch) {
    return inlineMatch[1]
      .split(",")
      .map(t => t.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  // Format 2: tags:\n  - tag1\n  - tag2
  const listMatch = fm.match(/^tags:\s*\n((?:\s+-\s+.+\n?)*)/m);
  if (listMatch) {
    return listMatch[1]
      .split("\n")
      .map(line => line.replace(/^\s+-\s+/, "").trim())
      .filter(Boolean);
  }

  return [];
}

export function collectTagsByLocale(
  blogDir: string
): Record<TagLang, Set<string>> {
  const result: Record<TagLang, Set<string>> = {
    en: new Set(),
    ko: new Set(),
    ja: new Set(),
  };

  for (const locale of ["en", "ko", "ja"] as const) {
    const dir = join(blogDir, locale);
    let files: string[];
    try {
      files = readdirSync(dir).filter(f => f.endsWith(".md") || f.endsWith(".mdx"));
    } catch {
      continue;
    }
    for (const file of files) {
      const tags = extractTagsFromFile(join(dir, file));
      for (const tag of tags) {
        result[locale].add(tag);
      }
    }
  }

  return result;
}

/** Slug → canonical locale (detectTagLang on tag label; breaks EN/KO slug collisions like FX→fx) */
export function getTagSlugPrimaryLocaleMap(
  tagsByLocale: Record<TagLang, Set<string>>
): Map<string, TagLang> {
  const map = new Map<string, TagLang>();
  for (const locale of ["en", "ko", "ja"] as const) {
    for (const tag of tagsByLocale[locale]) {
      const slug = slugifyStr(tag);
      if (!map.has(slug)) map.set(slug, detectTagLang(tag));
    }
  }
  return map;
}

// ── Generate redirect rules ──

export function getCrossLocaleTagRedirects(): Record<
  string,
  { status: 308; destination: string }
> {
  // Resolve blog data directory relative to this file
  const blogDir = join(
    import.meta.dirname ?? __dirname,
    "..",
    "data",
    "blog"
  );

  const tagsByLocale = collectTagsByLocale(blogDir);
  const slugPrimary = getTagSlugPrimaryLocaleMap(tagsByLocale);
  const out: Record<string, { status: 308; destination: string }> = {};

  // For each locale's tags, generate redirects from wrong locales
  // Key must NOT have trailing slash (Astro → Vercel ^/path$ regex)

  const tagSegment = (tag: string) => encodeURIComponent(slugifyStr(tag));
  const rawTagSegment = (tag: string) => encodeURIComponent(tag);

  /** GSC crawls Title Case / spaced URLs; skip when raw already equals slug */
  const needsRawAlias = (tag: string) => {
    const slug = slugifyStr(tag);
    return tag !== slug || /[A-Z]|\s/.test(tag);
  };

  const addCrossLocale = (
    fromPrefix: string,
    slug: string,
    dest: string,
    tag: string
  ) => {
    out[`${fromPrefix}/tags/${slug}`] = { status: 308, destination: dest };
    if (needsRawAlias(tag)) {
      const raw = rawTagSegment(tag);
      if (raw !== slug) {
        out[`${fromPrefix}/tags/${raw}`] = { status: 308, destination: dest };
      }
    }
  };

  // ── EN tags: should only exist at /tags/<slug>/ ──
  for (const tag of tagsByLocale.en) {
    const slug = tagSegment(tag);
    const dest = `/tags/${slug}/`;
    addCrossLocale("/ko", slug, dest, tag);
    addCrossLocale("/ja", slug, dest, tag);
    if (needsRawAlias(tag)) {
      const raw = rawTagSegment(tag);
      if (raw !== slug) {
        out[`/tags/${raw}`] = { status: 308, destination: dest };
      }
    }
  }

  // ── KO tags: should only exist at /ko/tags/<slug>/ ──
  for (const tag of tagsByLocale.ko) {
    const slug = tagSegment(tag);
    if (slugPrimary.get(slugifyStr(tag)) !== "ko") continue;
    const dest = `/ko/tags/${slug}/`;
    addCrossLocale("", slug, dest, tag);
    addCrossLocale("/ja", slug, dest, tag);
    if (needsRawAlias(tag)) {
      const raw = rawTagSegment(tag);
      if (raw !== slug) {
        out[`/ko/tags/${raw}`] = { status: 308, destination: dest };
      }
    }
  }

  // ── JA tags: should only exist at /ja/tags/<slug>/ ──
  for (const tag of tagsByLocale.ja) {
    const slug = tagSegment(tag);
    if (slugPrimary.get(slugifyStr(tag)) !== "ja") continue;
    const dest = `/ja/tags/${slug}/`;
    addCrossLocale("", slug, dest, tag);
    addCrossLocale("/ko", slug, dest, tag);
    if (needsRawAlias(tag)) {
      const raw = rawTagSegment(tag);
      if (raw !== slug) {
        out[`/ja/tags/${raw}`] = { status: 308, destination: dest };
      }
    }
  }

  return out;
}
