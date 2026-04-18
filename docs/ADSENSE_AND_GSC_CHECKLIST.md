# AdSense & Search Console — pre-launch checklist

Use this after deploying to production (e.g. Vercel). Phase 4 of the AdSense roadmap maps here.

## Phase 4-11 — Search Console (manual)

1. Open [Google Search Console](https://search.google.com/search-console) for the production property (`SITE.website` in `src/config.ts`).
2. **Sitemaps**: submit or confirm:
   - `/sitemap-index.xml` (Astro sitemap integration should list locale sitemaps).
   - After a crawl, verify child sitemap URLs appear without errors.
3. **URL inspection**: pick ~6 random URLs (home, `/topics/`, a KO post, EN post, JA post, `/about/`). Ensure “URL is on Google” or request indexing for any “Discovered / Crawled not indexed” items you care about.
4. **Coverage**: review “Excluded” reasons; fix duplicate/canonical issues (hreflang + canonical are implemented in `Layout.astro` / `HreflangLinks.astro`).

## Phase 4-12 — Quality gates

1. **Topic hubs**: confirm `/topics/`, `/ko/topics/`, `/ja/topics/` render and match the four editorial axes; header + home link to them.
2. **404 / broken assets**: smoke-test main routes; fix any missing images under `public/`.
3. **External links**: spot-check official sources in investment posts; update if domains moved.
4. **Lighthouse** (Chrome DevTools → Lighthouse):
   - Run **Mobile** and **Desktop** on `/`, `/topics/`, and one long post.
   - Target **≥ 90** Performance / Accessibility / Best Practices / SEO (adjust images, CLS, and LCP as needed).
5. **Post footers**: each article should keep the disclaimer + contact pattern used in markdown (`post-disclaimer` block and site contact).

## Phase 4-13 — AdSense application

1. **Do not** commit a real publisher ID. Set at build/deploy time:
   - `PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-xxxxxxxxxxxxxxxx`
2. Vercel (or host): add the variable to the project; redeploy. `Layout.astro` emits:

   ```html
   <meta name="google-adsense-account" content="ca-pub-…" />
   ```

   only when the env var is set.
3. Complete AdSense signup in the Google UI.
4. **After approval**: create `public/ads.txt` with the exact lines Google provides (one line per instruction), deploy, and verify `https://your-domain/ads.txt`.

## Optional maintenance

- Re-run `pnpm exec astro check && pnpm run build` before each release.
- If `CONTENT_INTEGRITY_REQUIRE_SOURCES=true` in CI, ensure new posts include enough unique source domains per `src/content.config.ts`.
