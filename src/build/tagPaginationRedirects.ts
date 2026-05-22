/**
 * 308 for GSC tag 404s: wrong-locale /tags/.../2/ and page-2 when only one page exists.
 * Kept minimal to stay under Vercel 2048 route limit (merge adds trailing-slash variants).
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SITE } from "../config";
import { slugifyStr } from "../utils/slugify";
import {
  collectTagsByLocale,
  getTagSlugPrimaryLocaleMap,
} from "./crossLocaleTagRedirects";

type TagLang = "en" | "ko" | "ja";

function prefixFor(locale: TagLang): string {
  return locale === "en" ? "" : `/${locale}`;
}

function tagPath(locale: TagLang, slugEnc: string): string {
  return `${prefixFor(locale)}/tags/${slugEnc}/`;
}

function extractTagsFromFile(filePath: string): string[] {
  const content = readFileSync(filePath, "utf-8");
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return [];

  const fm = fmMatch[1];
  const inlineMatch = fm.match(/^tags:\s*\[([^\]]*)\]/m);
  if (inlineMatch) {
    return inlineMatch[1]
      .split(",")
      .map(t => t.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  const listMatch = fm.match(/^tags:\s*\n((?:\s+-\s+.+\n?)*)/m);
  if (listMatch) {
    return listMatch[1]
      .split("\n")
      .map(line => line.replace(/^\s+-\s+/, "").trim())
      .filter(Boolean);
  }

  return [];
}

function countPostsForSlug(
  blogDir: string,
  locale: TagLang,
  slug: string
): number {
  const dir = join(blogDir, locale);
  let count = 0;
  let files: string[];
  try {
    files = readdirSync(dir).filter(f => f.endsWith(".md") || f.endsWith(".mdx"));
  } catch {
    return 0;
  }
  for (const file of files) {
    for (const tag of extractTagsFromFile(join(dir, file))) {
      if (slugifyStr(tag) === slug) count++;
    }
  }
  return count;
}

function lastPage(postCount: number): number {
  if (postCount <= 0) return 0;
  return Math.ceil(postCount / SITE.postPerPage);
}

export function getTagPaginationRedirects(): Record<
  string,
  { status: 308; destination: string }
> {
  const blogDir = join(import.meta.dirname ?? __dirname, "..", "data", "blog");
  const tagsByLocale = collectTagsByLocale(blogDir);
  const slugPrimary = getTagSlugPrimaryLocaleMap(tagsByLocale);
  const out: Record<string, { status: 308; destination: string }> = {};

  const setRedirect = (from: string, to: string) => {
    if (from === to) return;
    out[from] = { status: 308, destination: to };
  };

  const seenSlugs = new Set<string>();

  for (const locale of ["en", "ko", "ja"] as const) {
    for (const tag of tagsByLocale[locale]) {
      const slug = slugifyStr(tag);
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);

      const slugEnc = encodeURIComponent(slug);
      const primary = slugPrimary.get(slug) ?? locale;
      const canonBase = tagPath(primary, slugEnc);

      for (const wrong of ["en", "ko", "ja"] as const) {
        if (wrong === primary) continue;
        const wrongPrefix = prefixFor(wrong);
        if (wrong === "en" && slug !== slugEnc) {
          setRedirect(`/tags/${slug}/2`, canonBase);
        } else {
          setRedirect(`${wrongPrefix}/tags/${slugEnc}/2`, canonBase);
        }
      }
    }
  }

  return out;
}
