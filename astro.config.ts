import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";
import { getLegacyPostRedirects } from "./src/build/legacyPostRedirects";
import { pagefindIntegration } from "./src/build/pagefindIntegration";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  trailingSlash: "always",
  adapter: vercel(),
  redirects: {
    // Astro emits sitemap-index.xml, not sitemap.xml (GSC may submit the wrong path)
    "/sitemap.xml": { status: 308, destination: "/sitemap-index.xml" },
    // AdSense / reviewers often probe /privacy/ — canonical page is privacy-policy
    "/privacy": { status: 308, destination: "/privacy-policy/" },
    "/privacy/": { status: 308, destination: "/privacy-policy/" },
    "/ko/privacy": { status: 308, destination: "/ko/privacy-policy/" },
    "/ko/privacy/": { status: 308, destination: "/ko/privacy-policy/" },
    "/ja/privacy": { status: 308, destination: "/ja/privacy-policy/" },
    "/ja/privacy/": { status: 308, destination: "/ja/privacy-policy/" },
    // Korean legacy post slugs — explicit 1:1 mapping (18 rules)
    ...getLegacyPostRedirects(),
    // Tag URL normalization (locale × encoding × case × pagination × slash) and
    // WP legacy redirects are injected by patchVercelConfig() into
    // .vercel/output/config.json post-build — see src/build/patchVercelRedirectsTrailingSlash.ts
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ko", "ja"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    pagefindIntegration(),
    sitemap({
      filter: page => {
        try {
          const pathname = new URL(page, SITE.website).pathname.replace(/\/+$/, "");
          // Exclude tag pages — these are noindex and mostly thin content (0-1 posts)
          if (pathname.includes("/tags")) return false;
          // Exclude pagination pages — these are duplicate list content (/posts/2/, /posts/3/, etc.)
          if (/\/posts\/\d+$/.test(pathname)) return false;
          // Exclude search pages — empty UI shell until user input (thin content)
          if (pathname.includes("/search")) return false;
          // Exclude archives — date-based index, thin content for AdSense
          if (pathname.endsWith("/archives")) return false;
          // Legacy /en/* redirect routes — not canonical EN URLs (GSC: avoid redirect URLs in sitemap)
          if (pathname === "/en" || pathname.startsWith("/en/")) return false;
          return true;
        } catch (e) {
          return false;
        }
      },
    }),
  ],
  markdown: {
    gfm: false,
    remarkPlugins: [
      [remarkGfm, { singleTilde: false }],
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }]
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      /** AdSense publisher id, e.g. ca-pub-xxxxxxxxxxxxxxxx (set when applying) */
      PUBLIC_ADSENSE_PUBLISHER_ID: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      /** GA4 Measurement ID, e.g. G-XXXXXXXXXX */
      PUBLIC_GA4_MEASUREMENT_ID: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "Google Sans Code",
        cssVariable: "--font-google-sans-code",
        provider: fontProviders.google(),
        fallbacks: ["monospace"],
        weights: [300, 400, 500, 600, 700],
        styles: ["normal", "italic"],
      },
    ],
  },
});
