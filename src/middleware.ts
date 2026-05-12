import { defineMiddleware } from "astro:middleware";

/**
 * Cross-locale tag redirect middleware.
 *
 * Problem: Google indexed /ko/tags/<EN-tag>/ and /ja/tags/<KO-tag>/ etc.
 * which are 404 because Astro only builds locale-specific tag pages.
 *
 * Solution: Detect cross-locale tag URL patterns and redirect to
 * the correct locale before Astro tries to route the request.
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

  // Pattern: /ko/tags/<tag>/ where <tag> is NOT Korean
  // → redirect to /tags/<tag>/ (EN canonical)
  const koTagMatch = pathname.match(/^\/ko\/tags\/([^/]+)\/?$/);
  if (koTagMatch) {
    const tag = koTagMatch[1];
    if (!hasKorean(tag)) {
      const dest = `/tags/${tag}/`;
      return context.redirect(dest, 308);
    }
  }

  // Pattern: /ja/tags/<tag>/ where <tag> is NOT Japanese
  const jaTagMatch = pathname.match(/^\/ja\/tags\/([^/]+)\/?$/);
  if (jaTagMatch) {
    const tag = jaTagMatch[1];
    if (hasKorean(tag)) {
      // KO tag ended up in JA route → redirect to /ko/tags/<tag>/
      const dest = `/ko/tags/${tag}/`;
      return context.redirect(dest, 308);
    }
    if (!hasJapanese(tag)) {
      // EN tag ended up in JA route → redirect to /tags/<tag>/
      const dest = `/tags/${tag}/`;
      return context.redirect(dest, 308);
    }
  }

  // Pattern: Root-level Korean slug posts (without locale prefix)
  // e.g. /일본-도쿄-지진에서-취약한-5곳/
  const rootKoMatch = pathname.match(/^\/([^/]+)\/?$/);
  if (rootKoMatch && hasKorean(rootKoMatch[1])) {
    return context.redirect("/ko/", 308);
  }

  return next();
});
