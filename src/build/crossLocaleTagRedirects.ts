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
      .map(line =>
        line
          .replace(/^\s+-\s+/, "")
          .trim()
          .replace(/^["']|["']$/g, "")
      )
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
  const slugDataMap = new Map<string, { locales: Set<TagLang>; labels: Set<string> }>();

  // Phase 1 — 집계 (순회만, map에 쓰지 않음)
  for (const locale of ["en", "ko", "ja"] as const) {
    for (const tag of tagsByLocale[locale]) {
      const slug = slugifyStr(tag);
      if (!slugDataMap.has(slug)) {
        slugDataMap.set(slug, { locales: new Set(), labels: new Set() });
      }
      const data = slugDataMap.get(slug)!;
      data.locales.add(locale);
      data.labels.add(tag);
    }
  }

  const map = new Map<string, TagLang>();

  // Phase 2 — 슬러그마다 canonical 결정
  for (const [slug, data] of slugDataMap.entries()) {
    const candidates = data.locales; // 실존 로케일만
    const detected = new Set<TagLang>();
    for (const label of data.labels) {
      const detectedLang = detectTagLang(label);
      if (candidates.has(detectedLang)) {
        detected.add(detectedLang);
      }
    }

    let canonical: TagLang;
    if (detected.size === 1) {
      canonical = Array.from(detected)[0];
    } else if (detected.size >= 2) {
      // 라벨별 detect가 후보 안에서 충돌 (예: 한 슬러그에 ko·ja 라벨 혼재)
      // first of [en, ko, ja] that is in detected
      if (detected.has("en")) {
        canonical = "en";
      } else if (detected.has("ko")) {
        canonical = "ko";
      } else {
        canonical = "ja";
      }
    } else {
      // detect 결과가 후보에 없음 (라틴 라벨 → en 이지만 en 페이지 없음)
      // first of [en, ko, ja] that is in candidates
      if (candidates.has("en")) {
        canonical = "en";
      } else if (candidates.has("ko")) {
        canonical = "ko";
      } else {
        canonical = "ja";
      }
    }
    map.set(slug, canonical);
  }

  return map;
}

// Note: getCrossLocaleTagRedirects() removed. Tag URL normalization is now
// done by a single catch-all regex per slug — see ./tagCanonicalRedirects.ts
// and ./patchVercelRedirectsTrailingSlash.ts (post-build config injection).
