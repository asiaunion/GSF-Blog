import { defineMiddleware } from "astro:middleware";
import {
  collectTagsByLocale,
  getTagSlugPrimaryLocaleMap,
} from "./build/crossLocaleTagRedirects";
import { slugifyStr } from "./utils/slugify";
import { join } from "node:path";

const tagSlugPrimary = getTagSlugPrimaryLocaleMap(
  collectTagsByLocale(join(import.meta.dirname ?? "", "data", "blog"))
);

/** Canonical URL segment for a tag (matches tag page static paths + build redirects). */
function canonicalTagSegment(segment: string): string {
  return encodeURIComponent(slugifyStr(decodeURIComponent(segment)));
}

/**
 * Cross-locale tag redirect middleware.
 *
 * Problem: Google indexed /ko/tags/<EN-tag>/, /ja/tags/<KO-tag>/,
 * /tags/<KO-tag>/, /ko/tags/<JA-tag>/ etc. — all of which are 404
 * because Astro only builds locale-specific tag pages.
 *
 * Solution: Detect cross-locale tag URL patterns using Unicode-range
 * language detection and redirect to the correct locale.
 * This handles ALL possible cross-locale combinations dynamically,
 * eliminating the need for individual static redirect rules.
 */

// Unicode ranges for language detection
function hasKorean(str: string): boolean {
  const decoded = decodeURIComponent(str);
  return /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(decoded);
}

function hasJapanese(str: string): boolean {
  const decoded = decodeURIComponent(str);
  return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(decoded);
}

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  // ── Legacy /en/* URLs → unprefixed EN canonical (vercel.json rule may not apply on all deployments)
  if (pathname === "/en" || pathname === "/en/") {
    return context.redirect("/", 308);
  }
  if (pathname.startsWith("/en/")) {
    return context.redirect(`${pathname.slice(3) || "/"}`, 308);
  }

  // ── Pattern A: /ko/tags/<tag>/ where <tag> is NOT Korean ──
  // KO route with EN tag → /tags/<tag>/ (EN canonical)
  // KO route with JA tag → /ja/tags/<tag>/
  // Optional /2/ segment: static redirects use encodeURIComponent keys; GSC often
  // crawls literal UTF-8 (e.g. /tags/日本橋/2/) which does not match ^/tags/%E6%97%A5…/2$
  const tagPageSuffix = "(?:/(\\d+))?";

  const koTagMatch = pathname.match(
    new RegExp(`^/ko/tags/([^/]+)${tagPageSuffix}/?$`)
  );
  if (koTagMatch) {
    const tag = koTagMatch[1];
    const slug = canonicalTagSegment(tag);
    if (hasJapanese(tag)) {
      return context.redirect(`/ja/tags/${slug}/`, 308);
    }
    if (!hasKorean(tag) && tagSlugPrimary.get(slugifyStr(decodeURIComponent(tag))) === "en") {
      return context.redirect(`/tags/${slug}/`, 308);
    }
    if (tag !== slug) {
      return context.redirect(`/ko/tags/${slug}/`, 308);
    }
  }

  // ── Pattern B: /ja/tags/<tag>/ where <tag> is NOT Japanese ──
  const jaTagMatch = pathname.match(
    new RegExp(`^/ja/tags/([^/]+)${tagPageSuffix}/?$`)
  );
  if (jaTagMatch) {
    const tag = jaTagMatch[1];
    const slug = canonicalTagSegment(tag);
    if (hasKorean(tag)) {
      return context.redirect(`/ko/tags/${slug}/`, 308);
    }
    if (!hasJapanese(tag) && tagSlugPrimary.get(slugifyStr(decodeURIComponent(tag))) === "en") {
      return context.redirect(`/tags/${slug}/`, 308);
    }
    if (tag !== slug) {
      return context.redirect(`/ja/tags/${slug}/`, 308);
    }
  }

  // ── Pattern C: /tags/<tag>/ where <tag> is NOT English ──
  const rootTagMatch = pathname.match(
    new RegExp(`^/tags/([^/]+)${tagPageSuffix}/?$`)
  );
  if (rootTagMatch) {
    const tag = rootTagMatch[1];
    const slug = canonicalTagSegment(tag);
    if (hasKorean(tag)) {
      return context.redirect(`/ko/tags/${slug}/`, 308);
    }
    if (hasJapanese(tag)) {
      return context.redirect(`/ja/tags/${slug}/`, 308);
    }
    if (tag !== slug) {
      return context.redirect(`/tags/${slug}/`, 308);
    }
  }

  // ── Pattern D: Root-level Korean slug posts (without locale prefix) ──
  // e.g. /일본-도쿄-지진에서-취약한-5곳/ → /ko/
  const rootKoMatch = pathname.match(/^\/([^/]+)\/?$/);
  if (rootKoMatch && hasKorean(rootKoMatch[1])) {
    return context.redirect("/ko/", 308);
  }

  return next();
});
