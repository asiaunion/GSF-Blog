import { defineMiddleware } from "astro:middleware";

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

  // ── Pattern A: /ko/tags/<tag>/ where <tag> is NOT Korean ──
  // KO route with EN tag → /tags/<tag>/ (EN canonical)
  // KO route with JA tag → /ja/tags/<tag>/
  const koTagMatch = pathname.match(/^\/ko\/tags\/([^/]+)\/?$/);
  if (koTagMatch) {
    const tag = koTagMatch[1];
    if (hasJapanese(tag)) {
      // JA tag ended up in KO route → redirect to /ja/tags/<tag>/
      return context.redirect(`/ja/tags/${tag}/`, 308);
    }
    if (!hasKorean(tag)) {
      // EN tag ended up in KO route → redirect to /tags/<tag>/
      return context.redirect(`/tags/${tag}/`, 308);
    }
  }

  // ── Pattern B: /ja/tags/<tag>/ where <tag> is NOT Japanese ──
  // JA route with KO tag → /ko/tags/<tag>/
  // JA route with EN tag → /tags/<tag>/
  const jaTagMatch = pathname.match(/^\/ja\/tags\/([^/]+)\/?$/);
  if (jaTagMatch) {
    const tag = jaTagMatch[1];
    if (hasKorean(tag)) {
      // KO tag ended up in JA route → redirect to /ko/tags/<tag>/
      return context.redirect(`/ko/tags/${tag}/`, 308);
    }
    if (!hasJapanese(tag)) {
      // EN tag ended up in JA route → redirect to /tags/<tag>/
      return context.redirect(`/tags/${tag}/`, 308);
    }
  }

  // ── Pattern C: /tags/<tag>/ where <tag> is NOT English ──
  // Root (EN) route with KO tag → /ko/tags/<tag>/
  // Root (EN) route with JA tag → /ja/tags/<tag>/
  const rootTagMatch = pathname.match(/^\/tags\/([^/]+)\/?$/);
  if (rootTagMatch) {
    const tag = rootTagMatch[1];
    if (hasKorean(tag)) {
      return context.redirect(`/ko/tags/${tag}/`, 308);
    }
    if (hasJapanese(tag)) {
      return context.redirect(`/ja/tags/${tag}/`, 308);
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
