// Local simulator for `.vercel/output/config.json` routing: feeds verify-matrix
// URLs through Vercel's route phases (sequential evaluation, status short-circuit,
// `filesystem` handle stops on static file hit). Approximates production behavior
// without deploying.
import fs from "node:fs";
import path from "node:path";

const CONFIG = ".vercel/output/config.json";
const STATIC_ROOT = ".vercel/output/static";
const VERCEL_JSON = "vercel.json";
const GONE_ROUTES = "scripts/vercel-gone-routes.json";

// Read build output config
const cfg = JSON.parse(fs.readFileSync(CONFIG, "utf-8"));
const existingRoutes = cfg.routes || [];

// ── Vercel.json synthesis rules ──
function sourceToSrc(source) {
  let pattern = source
    .replace(/:path\*/g, "___PATHSTAR___")
    .replace(/:path/g, "___PATH___");
  pattern = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
  pattern = pattern
    .replace(/___PATHSTAR___/g, "(.*)")
    .replace(/___PATH___/g, "([^/]+)");
  return `^${pattern}$`;
}

function vercelDestination(dest) {
  return dest.replace(/:path\*/g, "$1").replace(/:path/g, "$1");
}

function vercelRedirectToRoute({ source, destination, permanent }) {
  return {
    src: sourceToSrc(source),
    status: permanent === false ? 307 : 308,
    headers: { Location: vercelDestination(destination) },
  };
}

function trailingSlashVariant(route) {
  if (route.status !== 308 && route.status !== 307) return null;
  const { src } = route;
  if (!src?.startsWith("^") || !src.endsWith("$")) return null;
  const inner = src.slice(1, -1);
  if (inner.endsWith("/") || inner.endsWith("/?")) return null;
  return { ...route, src: `^${inner}/$` };
}

let vercelJson = { redirects: [] };
if (fs.existsSync(VERCEL_JSON)) {
  try {
    vercelJson = JSON.parse(fs.readFileSync(VERCEL_JSON, "utf-8"));
  } catch (e) {
    console.error("Error reading vercel.json:", e);
  }
}

const fromVercel = [];
if (vercelJson.redirects) {
  for (const r of vercelJson.redirects) {
    const route = vercelRedirectToRoute(r);
    const slash = trailingSlashVariant(route);
    fromVercel.push(slash ?? route);
  }
}

let fromGone = [];
if (fs.existsSync(GONE_ROUTES)) {
  try {
    const goneSources = JSON.parse(fs.readFileSync(GONE_ROUTES, "utf-8"));
    fromGone = goneSources.map(source => ({
      src: sourceToSrc(source),
      status: 410,
    }));
  } catch (e) {
    console.error("Error reading vercel-gone-routes.json:", e);
  }
}

// Synthesize routes: vercel.json redirects are applied first in Git build
const routes = [];
const seenKeys = new Set();
function pushRoute(route) {
  const key = `${route.src}|${route.status ?? ""}|${route.headers?.Location ?? route.dest ?? ""}`;
  if (seenKeys.has(key)) return;
  seenKeys.add(key);
  routes.push(route);
}

for (const r of fromVercel) pushRoute(r);
for (const r of fromGone) pushRoute(r);
for (const r of existingRoutes) pushRoute(r);

const fsIdx = routes.findIndex(r => r.handle === "filesystem");

/**
 * @param {string} url
 * @returns {{ status: number, location?: string, matchedSrc?: string }}
 */
function evaluate(url) {
  const candidates = [url];

  // Phase 1: routes BEFORE filesystem handle.
  for (let i = 0; i < fsIdx; i++) {
    const r = routes[i];
    if (r.handle) continue;
    if (!r.src) continue;
    const re = new RegExp(r.src);
    for (const u of candidates) {
      if (re.test(u)) {
        if (r.status && r.headers?.Location) {
          let loc = r.headers.Location;
          // Vercel-style $1 substitution
          const m = u.match(re);
          if (m) {
            loc = loc.replace(/\$(\d+)/g, (_, n) => m[+n] ?? "");
          }
          return { status: r.status, location: loc, matchedSrc: r.src };
        }
        if (r.status) {
          return { status: r.status, matchedSrc: r.src };
        }
        if (r.dest) {
          return { status: 200, matchedSrc: r.src };
        }
      }
    }
  }

  // Phase 2: filesystem handle — check if a static file exists.
  for (const u of candidates) {
    const decoded = (() => { try { return decodeURI(u); } catch { return u; } })();
    const candidatesFs = [
      path.join(STATIC_ROOT, decoded),
      path.join(STATIC_ROOT, decoded.replace(/\/$/, "") + ".html"),
      path.join(STATIC_ROOT, decoded.replace(/\/$/, ""), "index.html"),
    ];
    for (const p of candidatesFs) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        return { status: 200, matchedSrc: `filesystem: ${path.relative(STATIC_ROOT, p)}` };
      }
    }
  }

  // Phase 3: routes AFTER filesystem handle.
  for (let i = fsIdx + 1; i < routes.length; i++) {
    const r = routes[i];
    if (r.handle) continue;
    if (!r.src) continue;
    const re = new RegExp(r.src);
    for (const u of candidates) {
      if (re.test(u)) {
        if (r.status && r.headers?.Location) {
          return { status: r.status, location: r.headers.Location, matchedSrc: r.src };
        }
        if (r.status) {
          return { status: r.status, matchedSrc: r.src };
        }
        if (r.status === 404) {
          return { status: 404, matchedSrc: r.src };
        }
        if (r.dest) {
          return { status: 200, matchedSrc: r.src };
        }
      }
    }
  }

  return { status: 404 };
}

/** Follow up to N redirect hops (mirrors real crawler behavior). */
function resolveChain(url, maxHops = 5) {
  let cur = url;
  let last;
  const chain = [url];
  for (let i = 0; i < maxHops; i++) {
    last = evaluate(cur);
    if (last.status === 308 && last.location) {
      cur = last.location;
      chain.push(cur);
      continue;
    }
    break;
  }
  return { ...last, finalUrl: cur, chain };
}

// ── Gate Mode & CLI Argument handling ──
const isGateMode = process.argv.includes("--gate");

if (isGateMode) {
  console.log("Starting Redirect Gate checks...");
  const seeds = new Set();

  // 1. Collect tag slugs from built output static folders
  const tagDirs = ["tags", "ko/tags", "ja/tags"];
  for (const td of tagDirs) {
    const fullPath = path.join(STATIC_ROOT, td);
    if (fs.existsSync(fullPath)) {
      const entries = fs.readdirSync(fullPath);
      for (const ent of entries) {
        if (ent === "archive" || ent === "index.html") continue;
        const entPath = path.join(fullPath, ent);
        if (fs.statSync(entPath).isDirectory()) {
          seeds.add(`/tags/${ent}/`);
          seeds.add(`/ko/tags/${ent}/`);
          seeds.add(`/ja/tags/${ent}/`);
        }
      }
    }
  }

  // 2. All static Location values in synthesized routes
  for (const r of routes) {
    if (r.headers?.Location) {
      const loc = r.headers.Location;
      if (!loc.includes("$") && !loc.includes(":")) {
        seeds.add(loc);
      }
    }
  }

  // 3. All static sources in vercel.json
  if (vercelJson.redirects) {
    for (const r of vercelJson.redirects) {
      const src = r.source;
      if (!src.includes(":") && !src.includes("*")) {
        seeds.add(src);
      }
    }
  }

  console.log(`Verifying ${seeds.size} seed URLs...`);
  let failCount = 0;

  for (const seed of seeds) {
    const r = resolveChain(seed, 10);
    
    // Check for hops limit or loop
    let loopDetected = false;
    const seenUrls = new Set();
    for (const u of r.chain) {
      if (seenUrls.has(u)) {
        loopDetected = true;
        break;
      }
      seenUrls.add(u);
    }

    if (loopDetected || (r.status === 308 && r.chain.length >= 10)) {
      console.error(`❌ LOOP DETECTED: ${r.chain.join(" -> ")}`);
      failCount++;
      continue;
    }

    const terminal = r.finalUrl;
    if (terminal.startsWith("http://") || terminal.startsWith("https://")) {
      continue;
    }
    if (r.status === 410) {
      continue;
    }

    const termEval = evaluate(terminal);
    if (termEval.status !== 200) {
      console.error(`❌ DESTINATION 404: '${seed}' resolved to '${terminal}' (matched: ${termEval.matchedSrc ?? "(none)"})`);
      failCount++;
    }
  }

  if (failCount > 0) {
    console.error(`\n❌ Redirect Gate check failed: ${failCount} issues found.`);
    process.exit(1);
  } else {
    console.log("\n✅ Redirect Gate check passed successfully.");
    process.exit(0);
  }
}

// ── Standard Matrix Mode (Default) ──
const MATRIX = [
  // Spot checks
  ["/tags/fx/", 200],
  ["/ko/tags/fx/", 308, "/tags/fx/"],
  ["/tags/j-reits/", 308, "/ko/tags/j-reits/"],
  ["/ko/tags/j-reits/", 200],
  ["/ja/tags/多摩/", 200],
  ["/ko/tags/多摩/", 308, "/ja/tags/%E5%A4%9A%E6%91%A9/"],
  ["/tags/tokyo/2/", 200],
  ["/ja/mission", 308, "/ja/mission/"],

  // 日本橋 (JA canonical, 5 posts -> 2 pages)
  ["/tags/日本橋/2/", 308, "/ja/tags/%E6%97%A5%E6%9C%AC%E6%A9%8B/"],
  ["/tags/日本橋/2", 308, "/ja/tags/%E6%97%A5%E6%9C%AC%E6%A9%8B/"],
  ["/tags/%E6%97%A5%E6%9C%AC%E6%A9%8B/2/", 308, "/ja/tags/%E6%97%A5%E6%9C%AC%E6%A9%8B/"],
  ["/tags/%e6%97%a5%e6%9c%ac%e6%a9%8b/2/", 308, "/ja/tags/%E6%97%A5%E6%9C%AC%E6%A9%8B/"],
  ["/ko/tags/日本橋/", 308, "/ja/tags/%E6%97%A5%E6%9C%AC%E6%A9%8B/"],
  ["/tags/日本橋/", 308, "/ja/tags/%E6%97%A5%E6%9C%AC%E6%A9%8B/"],
  ["/ja/tags/%E6%97%A5%E6%9C%AC%E6%A9%8B/", 200],
  ["/ja/tags/%E6%97%A5%E6%9C%AC%E6%A9%8B/2/", 200],
  // Investment (EN canonical)
  ["/tags/Investment/", 308, "/tags/investment/"],
  ["/ko/tags/Investment/", 308, "/tags/investment/"],
  ["/ja/tags/Investment/", 308, "/tags/investment/"],
  ["/tags/investment/", 200],
  ["/tags/Real%20Estate/", 308, "/tags/real-estate/"],
  ["/tags/real-estate/", 200],
  // KO canonical
  ["/tags/부동산/", 308, "/ko/tags/%EB%B6%80%EB%8F%99%EC%82%B0/"],
  ["/tags/%EB%B6%80%EB%8F%99%EC%82%B0/", 308, "/ko/tags/%EB%B6%80%EB%8F%99%EC%82%B0/"],
  ["/ja/tags/%EB%B6%80%EB%8F%99%EC%82%B0/", 308, "/ko/tags/%EB%B6%80%EB%8F%99%EC%82%B0/"],
  ["/ko/tags/%EB%B6%80%EB%8F%99%EC%82%B0/", 200],
  // nihonbashi (EN canonical, multi-page)
  ["/tags/nihonbashi/", 200],
  ["/tags/nihonbashi/2/", 200],
  // WP legacy
  ["/author/gsf/", 308, "/author/joseph-kim/"],
  ["/author/asiaunion/", 308, "/author/joseph-kim/"],
  ["/feed/", 308, "/rss.xml"],
  ["/wp-admin/foo/", 410],
  ["/wp-login.php", 410],
  ["/wp-json/foo/", 410],
  ["/wp-content/uploads/2024/04/high-yield-investment-01.pdf", 410],
  // GSC 404 — WP pages + singular /tag/
  ["/about-us/", 308, "/about/"],
  ["/business/", 308, "/topics/"],
  ["/ko/resources/", 308, "/ko/resources/tokyo-relocation-d90/"],
  ["/ja/resources/", 308, "/ja/resources/tokyo-relocation-d90/"],
  ["/assets/sources/tokyo-chikyu-chosa-7th.pdf", 410],
  ["/tag/%EC%9D%BC%EB%B3%B8-%EC%A3%BC%EC%8B%9D/", 308, "/tags/"],
  ["/tag/%EC%8A%A4%ED%83%80%ED%8A%B8%EC%97%85/", 308, "/tags/"],
  ["/ko/tag/%EC%8A%A4%ED%83%80%ED%8A%B8%EC%97%85/", 308, "/ko/tags/"],
  // Safety net
  ["/tags/완전임의새태그/", 308, "/tags/"],
  ["/ko/tags/zzzunknown/", 308, "/tags/"],
  // Sitemap & robots
  ["/robots.txt", 200],
  ["/sitemap-index.xml", 200],
  ["/sitemap.xml", 308, "/sitemap-index.xml"],
];

let pass = 0, fail = 0;
const fails = [];
for (const [url, wantStatus, wantLoc] of MATRIX) {
  const r = resolveChain(url);
  const okStatus = wantStatus === 200 ? r.status === 200 :
                   wantStatus === 410 ? r.status === 410 :
                   r.chain.length > 1;
  const okLoc = !wantLoc || r.finalUrl.includes(wantLoc) ||
    r.chain.some(u => u.includes(wantLoc));
  if (okStatus && okLoc) {
    pass++;
    const hopInfo = r.chain.length > 1 ? ` → ${r.finalUrl}` : "";
    console.log(`  OK   ${r.status} ${url}${hopInfo}`);
  } else {
    fail++;
    fails.push({ url, wantStatus, wantLoc, got: r });
    console.log(`  FAIL ${r.status} ${url}`);
    console.log(`        want ${wantStatus} ${wantLoc ?? ""}`);
    console.log(`        chain: ${r.chain.join(" → ")}`);
    console.log(`        matched: ${r.matchedSrc ?? "(none)"}`);
  }
}
console.log(`\n=== Result: ${pass} pass, ${fail} fail ===`);
process.exit(fail ? 1 : 0);
