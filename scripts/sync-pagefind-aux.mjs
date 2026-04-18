/**
 * Ensure `pagefind-aux/` exists under `.vercel/output/static/` after `astro build`.
 * Root `vercel.json` rewrites conflict with Astro's Build Output API on Vercel; this
 * copies the duplicate bundle created by pagefindIntegration instead.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const auxSrc = path.join(root, "dist", "client", "pagefind-aux");
const destRoot = path.join(root, ".vercel", "output", "static");
const auxDest = path.join(destRoot, "pagefind-aux");

if (!fs.existsSync(auxSrc)) {
  console.warn(
    "sync-pagefind-aux: skip (no dist/client/pagefind-aux; run Pagefind in build first)",
  );
  process.exit(0);
}
if (!fs.existsSync(destRoot)) {
  console.warn(
    "sync-pagefind-aux: skip (no .vercel/output/static; not a Vercel adapter build)",
  );
  process.exit(0);
}

fs.rmSync(auxDest, { recursive: true, force: true });
fs.cpSync(auxSrc, auxDest, { recursive: true });
console.log("sync-pagefind-aux: synced to .vercel/output/static/pagefind-aux");
