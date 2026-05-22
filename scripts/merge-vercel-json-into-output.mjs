#!/usr/bin/env node
/**
 * Prebuilt deploy does not apply project vercel.json. This script:
 * 1) Adds trailing-slash variants for Astro redirect routes (^/path$ → ^/path/$).
 * 2) Merges non-tag vercel.json redirects (WP, /en, feed, author, …) — tag rules
 *    stay in astro.config only to stay under Vercel's 2048 route limit.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(root, ".vercel", "output", "config.json");
const vercelJsonPath = path.join(root, "vercel.json");

/** Tag slug redirects come from astro.config; skip duplicate vercel.json rows */
function isTagRedirect(source) {
  return /\/tags\/[^/]+/.test(source) && !/\/tags\/archive\/?$/.test(source);
}

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

function vercelRedirectToRoute({ source, destination, permanent }) {
  return {
    src: sourceToSrc(source),
    status: permanent === false ? 307 : 308,
    headers: { Location: destination },
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

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const vercelJson = JSON.parse(fs.readFileSync(vercelJsonPath, "utf8"));
const fromVercel = (vercelJson.redirects ?? [])
  .filter(r => !isTagRedirect(r.source))
  .map(vercelRedirectToRoute);

const seen = new Set();
const merged = [];

function push(route) {
  const key = `${route.src}|${route.headers?.Location ?? route.dest}`;
  if (seen.has(key)) return;
  seen.add(key);
  merged.push(route);
}

for (const r of fromVercel) {
  push(r);
  const slash = trailingSlashVariant(r);
  if (slash) push(slash);
}

for (const r of config.routes ?? []) {
  push(r);
  const slash = trailingSlashVariant(r);
  if (slash) push(slash);
}

config.routes = merged;
fs.writeFileSync(configPath, JSON.stringify(config));
console.log(
  `merge-vercel-json: ${fromVercel.length} essential redirects, ${merged.length} total routes`,
);
