export function tagCanonicalHref(
  slug: string,
  primaryLocaleMap: Map<string, "en" | "ko" | "ja">
): string {
  const locale = primaryLocaleMap.get(slug) ?? "en";
  const prefix = locale === "en" ? "" : `/${locale}`;
  // slug is already sanitized; encode just in case for path safety
  return `${prefix}/tags/${encodeURIComponent(slug)}/`;
}
