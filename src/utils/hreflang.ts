export type AppLocale = "en" | "ko" | "ja";

export const LOCALES: AppLocale[] = ["en", "ko", "ja"];

/** Paths that exist only at site root (no /ko /ja mirrors). */
const DEFAULT_LOCALE_ONLY_PREFIXES = ["/archives", "/debug"];

function normalizeSiteBase(site: string): string {
  return site.replace(/\/+$/, "");
}

function stripTrailingSlashPath(pathname: string): string {
  if (pathname === "" || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

/**
 * Directory URLs use a trailing slash (see `trailingSlash: "always"`).
 * Root `/` and obvious file paths (e.g. `.xml`) stay unchanged.
 */
export function canonicalizePathname(pathname: string): string {
  const p = pathname.trim();
  if (p === "" || p === "/") return "/";
  if (p.endsWith("/")) return p;
  const last = p.split("/").pop() ?? "";
  if (/\.[a-z0-9]+$/i.test(last)) return p;
  return `${p}/`;
}

/**
 * Split Astro pathname into locale and path after locale prefix.
 * EN default: `/posts/foo` → locale en, rest `/posts/foo`
 */
export function parseLocalizedPath(pathname: string): {
  locale: AppLocale;
  pathWithoutLocale: string;
} {
  const p = stripTrailingSlashPath(pathname);
  if (p === "/") return { locale: "en", pathWithoutLocale: "/" };

  const segments = p.split("/").filter(Boolean);
  const first = segments[0];

  if (first === "ko" || first === "ja") {
    const restSegments = segments.slice(1);
    const pathWithoutLocale =
      restSegments.length === 0 ? "/" : `/${restSegments.join("/")}`;
    return { locale: first, pathWithoutLocale };
  }

  return { locale: "en", pathWithoutLocale: p };
}

function localePrefix(locale: AppLocale): string {
  if (locale === "en") return "";
  return `/${locale}`;
}

export function buildLocalizedAbsoluteUrl(
  site: string,
  locale: AppLocale,
  pathWithoutLocale: string
): string {
  const base = normalizeSiteBase(site);
  const prefix = localePrefix(locale);

  if (pathWithoutLocale === "/") {
    if (locale === "en") return `${base}/`;
    return `${base}${prefix}/`;
  }

  return `${base}${prefix}${canonicalizePathname(pathWithoutLocale)}`;
}

export type HreflangLink = { hreflang: string; href: string };

export type HreflangOptions = {
  /**
   * Locales that actually have content for this path.
   * When omitted, all LOCALES are emitted (static pages with full mirrors).
   * Pass a subset for posts so missing JA (etc.) never get hreflang → 404.
   */
  locales?: AppLocale[];
};

/**
 * Returns alternate link tags for existing locales + x-default.
 * x-default prefers `en` when present, else the first active locale.
 */
export function getHreflangAlternateUrls(
  pathname: string,
  site: string,
  options?: HreflangOptions
): HreflangLink[] {
  const { pathWithoutLocale } = parseLocalizedPath(pathname);

  const isDefaultOnly = DEFAULT_LOCALE_ONLY_PREFIXES.some(
    prefix =>
      pathWithoutLocale === prefix ||
      pathWithoutLocale.startsWith(`${prefix}/`)
  );

  if (isDefaultOnly) {
    const href = buildLocalizedAbsoluteUrl(site, "en", pathWithoutLocale);
    return [
      { hreflang: "en", href },
      { hreflang: "x-default", href },
    ];
  }

  const requested = options?.locales;
  const activeLocales: AppLocale[] =
    requested && requested.length > 0
      ? LOCALES.filter(locale => requested.includes(locale))
      : [...LOCALES];

  if (activeLocales.length === 0) {
    const href = buildLocalizedAbsoluteUrl(site, "en", pathWithoutLocale);
    return [
      { hreflang: "en", href },
      { hreflang: "x-default", href },
    ];
  }

  const links: HreflangLink[] = activeLocales.map(locale => ({
    hreflang: locale,
    href: buildLocalizedAbsoluteUrl(site, locale, pathWithoutLocale),
  }));

  const defaultLocale: AppLocale = activeLocales.includes("en")
    ? "en"
    : activeLocales[0];
  links.push({
    hreflang: "x-default",
    href: buildLocalizedAbsoluteUrl(site, defaultLocale, pathWithoutLocale),
  });
  return links;
}

/** `/posts/{slug}/` → slug; otherwise null (non-post paths keep full locale set). */
export function extractPostSlugFromPath(pathname: string): string | null {
  const { pathWithoutLocale } = parseLocalizedPath(pathname);
  const match = pathWithoutLocale.match(/^\/posts\/([^/]+)\/?$/);
  return match?.[1] ?? null;
}
