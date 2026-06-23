/**
 * Episode slug ↔ ward mapping SSOT loader.
 * Source: docs/verification/tokyo-series-episodes.json
 */
import { readFileSync } from "node:fs";
import path from "node:path";

const EPISODES_PATH = path.join(process.cwd(), "docs/verification/tokyo-series-episodes.json");

export function episodeKeyFromLabel(label) {
  const n = String(label ?? "").replace(/\D/g, "");
  if (!n) return "";
  return `ep${n.padStart(2, "0")}`;
}

export function loadEpisodesDoc() {
  return JSON.parse(readFileSync(EPISODES_PATH, "utf8"));
}

/** @returns {Record<string, string[]>} e.g. ep08 → ["足立区", ...] */
export function loadEpisodeWardsMap() {
  const doc = loadEpisodesDoc();
  const out = {};
  for (const e of doc.episodes ?? []) {
    const key = episodeKeyFromLabel(e.episode);
    if (key && e.wards?.length) out[key] = e.wards;
  }
  return out;
}

export function findEpisodeBySlug(doc, slug) {
  return (doc.episodes ?? []).find(e => e.slug === slug) ?? null;
}

export function findEpisodeByKey(doc, episodeKey) {
  const key = episodeKeyFromLabel(episodeKey);
  return (doc.episodes ?? []).find(e => episodeKeyFromLabel(e.episode) === key) ?? null;
}
