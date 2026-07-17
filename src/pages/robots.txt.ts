import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

# Admin CMS — noindex at page level + disallow here for extra safety (AdSense protection)
Disallow: /admin/

# Legacy WordPress paths — no longer served (410 at edge); block crawl budget waste
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/
Disallow: /wp-json/
Disallow: /wp-login.php

# Thin / utility pages (search, tags, archives) — DO NOT Disallow here.
# They already send meta robots noindex. Blocking crawl caused GSC
# "Indexed, though blocked by robots.txt" (/search/ 2026-07). Google must
# be able to fetch the HTML to honor noindex and drop the URL from the index.

# Newsletter download assets + raw source files — not search landing pages
Disallow: /downloads/
Disallow: /assets/sources/

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
};
