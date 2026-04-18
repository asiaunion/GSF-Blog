import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

/**
 * Run Pagefind inside the Astro build so the index lands in the same directory
 * the adapters ship to production (e.g. `.vercel/output/static`).
 *
 * A post-build `cp` to `public/pagefind` is too late: Vercel has already finalized
 * static assets, so `/pagefind/*` 404s on the live site.
 */
export function pagefindIntegration(): AstroIntegration {
  return {
    name: "pagefind-build",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const cli = path.join(
          process.cwd(),
          "node_modules",
          "pagefind",
          "lib",
          "runner",
          "bin.cjs",
        );
        if (!fs.existsSync(cli)) {
          logger.warn(
            "pagefind CLI not found under node_modules; skipping search index.",
          );
          return;
        }
        logger.info(`Indexing search (Pagefind) in ${outDir}`);
        const result = spawnSync(process.execPath, [cli, "--site", outDir], {
          stdio: "inherit",
        });
        if (result.error) throw result.error;
        if (result.status !== 0) {
          throw new Error(`pagefind exited with code ${result.status ?? "unknown"}`);
        }
      },
    },
  };
}
