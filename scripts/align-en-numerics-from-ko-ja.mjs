#!/usr/bin/env node
/**
 * Copy numeric literals from KO/JA into EN for locale parity gate.
 * Replaces EN table numeric cells and key prose amounts with 万円-style from JA.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const slug = process.argv[2] || "tokyo-taito-sumida-koto";
const root = process.cwd();
const enPath = path.join(root, "src/data/blog/en", `${slug}.md`);
let en = await readFile(enPath, "utf8");

const pairs = [
  // arithmetic block
  [
    "> **Arithmetic check**: Taito-ku ¥77.62M ÷ Chuo-ku ¥126.80M = **61.2%**. Sumida-ku ¥64.79M ÷ Chuo-ku ¥126.80M = **51.1%**. Koto-ku ¥84.01M ÷ Chuo-ku ¥126.80M = **66.3%**. Three-ward average: roughly 60%.",
    "> **Arithmetic check**: Taito-ku 7,762万円 ÷ Chuo-ku 1億2,680万円 = **61.2%**. Sumida-ku 6,479万円 ÷ Chuo-ku 1億2,680万円 = **51.1%**. Koto-ku 8,401万円 ÷ Chuo-ku 1億2,680万円 = **66.3%**. Three-ward average: roughly 60%.",
  ],
  // Taito mansion table
  [
    `| Sub-area | Price per ㎡ (avg. transaction) | 70㎡ equivalent | Transactions |
|---------|---------------------|----------|------|
| Yushima (湯島) | ¥2.042M | **approx. ¥142.94M** | 11 |
| Nezu (根津) | ¥1.460M | **approx. ¥102.20M** | 26 |
| Ueno (上野) | ¥1.384M | **approx. ¥96.88M** | 45 |
| Akihabara (秋葉原) | ¥1.323M | **approx. ¥92.61M** | 15 |
| Kuramae (蔵前) | ¥1.274M | **approx. ¥89.18M** | 72 |
| **Taito-ku overall avg.** | **¥1.109M** | **¥77.62M** | **729** |`,
    `| Sub-area | Price per ㎡ (avg. transaction) | 70㎡ equivalent | Transactions |
|---------|---------------------|----------|------|
| Yushima (湯島) | 204.2万円 | **approx. 1億4,294万円** | 11 |
| Nezu (根津) | 146.0万円 | **approx. 1億220万円** | 26 |
| Ueno (上野) | 138.4万円 | **approx. 9,688万円** | 45 |
| Akihabara (秋葉原) | 132.3万円 | **approx. 9,261万円** | 15 |
| Kuramae (蔵前) | 127.4万円 | **approx. 8,918万円** | 72 |
| **Taito-ku overall avg.** | **110.9万円** | **7,762万円** | **729** |`,
  ],
  [
    "Put the ward average of ¥77.62M alongside Chuo-ku at ¥126.80M or Minato-ku (港区) at ¥154.41M",
    "Put the ward average of 7,762万円 alongside Chuo-ku at 1億2,680万円 or Minato-ku (港区) at 1億5,441万円",
  ],
  [
    "These western neighborhoods bordering Bunkyo-ku have already crossed ¥100M.",
    "These western neighborhoods bordering Bunkyo-ku have already crossed 1億円.",
  ],
  // Taito rent
  [
    `| Layout | Rate (new construction, within 5-min of station) |
|-------|----------------|
| 1R | **¥114,000** |
| 1K | ¥115,000 |
| 1LDK | **¥172,000** |
| 2LDK | ¥198,000 |`,
    `| Layout | Rate (new construction, within 5-min of station) |
|-------|----------------|
| 1R | **11.4万円** |
| 1K | 11.5万円 |
| 1LDK | **17.2万円** |
| 2LDK | 19.8万円 |`,
  ],
  // Sumida comparison
  [
    `| Ward | To city center | Mansion 70㎡ transaction price |
|---|-----------|----------------|
| **Sumida-ku** | **approx. 8 min** (Kinshicho → Tokyo Station, JR direct) | **¥64.79M** |
| Suginami-ku (Ep.05) | approx. 21 min (Koenji → Chuo Line Rapid → Tokyo Station) | ¥65.17M |`,
    `| Ward | To city center | Mansion 70㎡ transaction price |
|---|-----------|----------------|
| **Sumida-ku** | **approx. 8 min** (Kinshicho → Tokyo Station, JR direct) | **6,479万円** |
| Suginami-ku (Ep.05) | approx. 21 min (Koenji → Chuo Line Rapid → Tokyo Station) | 6,517万円 |`,
  ],
  [
    "The difference in transaction price is ¥380,000.",
    "The difference in transaction price is 38万円.",
  ],
  // Sumida mansion
  [
    `| Sub-area | Price per ㎡ (avg. transaction) | 70㎡ equivalent | Transactions |
|---------|---------------------|----------|------|
| Kuramae (蔵前) | ¥1.108M | **approx. ¥77.56M** | 9 |
| Morishita (森下) | ¥1.093M | **approx. ¥76.51M** | 34 |
| Kinshicho (錦糸町) | ¥1.082M | **approx. ¥75.74M** | 126 |
| Ryogoku (両国) | ¥0.980M | **approx. ¥68.60M** | 104 |
| Honjo-Azumabashi (本所吾妻橋) | ¥0.970M | **approx. ¥67.90M** | 54 |
| **Sumida-ku overall avg.** | **¥0.926M** | **¥64.79M** | **719** |`,
    `| Sub-area | Price per ㎡ (avg. transaction) | 70㎡ equivalent | Transactions |
|---------|---------------------|----------|------|
| Kuramae (蔵前) | 110.8万円 | **approx. 7,756万円** | 9 |
| Morishita (森下) | 109.3万円 | **approx. 7,651万円** | 34 |
| Kinshicho (錦糸町) | 108.2万円 | **approx. 7,574万円** | 126 |
| Ryogoku (両国) | 98.0万円 | **approx. 6,860万円** | 104 |
| Honjo-Azumabashi (本所吾妻橋) | 97.0万円 | **approx. 6,790万円** | 54 |
| **Sumida-ku overall avg.** | **92.6万円** | **6,479万円** | **719** |`,
  ],
  // Sumida rent
  [
    `| Layout | Rate (new construction, within 5-min of station) |
|-------|----------------|
| 1R | **¥103,000** |
| 1K | ¥104,000 |
| 1LDK | **¥161,000** |
| 2LDK | ¥182,000 |`,
    `| Layout | Rate (new construction, within 5-min of station) |
|-------|----------------|
| 1R | **10.3万円** |
| 1K | 10.4万円 |
| 1LDK | **16.1万円** |
| 2LDK | 18.2万円 |`,
  ],
  // Koto intro
  [
    "The overall ward average transaction price is ¥84.01M for 70㎡.",
    "The overall ward average transaction price is 8,401万円 for 70㎡.",
  ],
  [
    "Near Ariake Station, transaction prices hit ¥1.986M/㎡; Toyosu Station comes in at ¥1.687M/㎡ (343 transactions). That approaches Minato-ku's average of ¥2.206M/㎡.",
    "Near Ariake Station, transaction prices hit 198.6万円/㎡; Toyosu Station comes in at 168.7万円/㎡ (343 transactions). That approaches Minato-ku's average of 220.6万円/㎡.",
  ],
  // Koto mansion
  [
    `| Sub-area | Price per ㎡ (avg. transaction) | 70㎡ equivalent | Transactions |
|---------|---------------------|----------|------|
| Ariake (有明) | ¥1.986M | **approx. ¥139.02M** | 63 |
| Shin-Toyosu (新豊洲) | ¥1.955M | **approx. ¥136.85M** | 53 |
| Toyosu (豊洲) | ¥1.687M | **approx. ¥118.09M** | 343 |
| Kiyosumi-Shirakawa (清澄白河) | ¥1.284M | **approx. ¥89.88M** | 110 |
| Morishita (森下) | ¥1.091M | **approx. ¥76.37M** | 55 |
| Monzen-Nakacho (門前仲町) | ¥0.999M | **approx. ¥69.93M** | 87 |
| **Koto-ku overall avg.** | **¥1.200M** | **¥84.01M** | **1,952** |`,
    `| Sub-area | Price per ㎡ (avg. transaction) | 70㎡ equivalent | Transactions |
|---------|---------------------|----------|------|
| Ariake (有明) | 198.6万円 | **approx. 1億3,902万円** | 63 |
| Shin-Toyosu (新豊洲) | 195.5万円 | **approx. 1億3,685万円** | 53 |
| Toyosu (豊洲) | 168.7万円 | **approx. 1億1,809万円** | 343 |
| Kiyosumi-Shirakawa (清澄白河) | 128.4万円 | **approx. 8,988万円** | 110 |
| Morishita (森下) | 109.1万円 | **approx. 7,637万円** | 55 |
| Monzen-Nakacho (門前仲町) | 99.9万円 | **approx. 6,993万円** | 87 |
| **Koto-ku overall avg.** | **120.0万円** | **8,401万円** | **1,952** |`,
  ],
  [
    "The Toyosu-Ariake zone is significantly pulling the ward average (¥1.200M/㎡) upward.",
    "The Toyosu-Ariake zone is significantly pulling the ward average (120.0万円/㎡) upward.",
  ],
  // Koto rent
  [
    `| Layout | Rate (new construction, within 5-min of station) |
|-------|----------------|
| 1R | **¥109,000** |
| 1K | ¥110,000 |
| 1LDK | **¥156,000** |
| 2LDK | ¥179,000 |`,
    `| Layout | Rate (new construction, within 5-min of station) |
|-------|----------------|
| 1R | **10.9万円** |
| 1K | 11.0万円 |
| 1LDK | **15.6万円** |
| 2LDK | 17.9万円 |`,
  ],
  [
    "Koto-ku's 1LDK rental rate (¥156,000) is the lowest among the three wards.",
    "Koto-ku's 1LDK rental rate (15.6万円) is the lowest among the three wards.",
  ],
  // Summary table
  [
    `| Item | Taito-ku | Sumida-ku | Koto-ku |
|------|--------|--------|--------|
| To city center (representative station) | **approx. 8 min** (Ueno → Tokyo Station) | **approx. 8 min** (Kinshicho → Tokyo Station) | **approx. 9 min** (Toyocho → Otemachi) |
| Straight-line distance to Imperial Palace | approx. 3 km | approx. 5 km | approx. 6–7 km |
| Mansion 70㎡ transaction price | **¥77.62M** | **¥64.79M** | **¥84.01M** |
| Rental 1R (new construction, 5-min walk) | ¥114,000 | ¥103,000 | ¥109,000 |
| Rental 1LDK (new construction, 5-min walk) | ¥172,000 | ¥161,000 | ¥156,000 |
| Per-capita real income density rank (23 wards) | 12th (¥2.804M) | 15th (¥2.621M) | **10th** (¥2.852M) |
| Key redevelopment | Asakusa Mirai Zuan (Apr 2026) | Line 8 Extension (Nov 2024~) + Kinshicho Vision (Mar 2025) | Toyosu Sail Park opening (Jul 2025) |`,
    `| Item | Taito-ku | Sumida-ku | Koto-ku |
|------|--------|--------|--------|
| To city center (representative station) | **approx. 8 min** (Ueno → Tokyo Station) | **approx. 8 min** (Kinshicho → Tokyo Station) | **approx. 9 min** (Toyocho → Otemachi) |
| Straight-line distance to Imperial Palace | approx. 3 km | approx. 5 km | approx. 6–7 km |
| Mansion 70㎡ transaction price | **7,762万円** | **6,479万円** | **8,401万円** |
| Rental 1R (new construction, 5-min walk) | 11.4万円 | 10.3万円 | 10.9万円 |
| Rental 1LDK (new construction, 5-min walk) | 17.2万円 | 16.1万円 | 15.6万円 |
| Per-capita real income density rank (23 wards) | 12th (280.4万円) | 15th (262.1万円) | **10th** (285.2万円) |
| Key redevelopment | Asakusa Mirai Zuan (2026-04) | Line 8 Extension (2024-11~) + Kinshicho Vision (2025-03) | Toyosu Sail Park opening (2025-07) |`,
  ],
  // Benchmark table
  [
    `| Ward | To city center | Mansion 70㎡ transaction price |
|---|-----------|----------------|
| Chiyoda-ku (city core, Ep.01) | — (internal) | ¥136.30M |
| Chuo-ku (city core, Ep.01) | — (internal) | ¥126.80M |
| **Taito-ku** (Ep.06) | **approx. 8 min** (→ Tokyo Station) | **¥77.62M** |
| **Koto-ku** (Ep.06) | **approx. 9 min** (→ Otemachi) | **¥84.01M** |
| **Sumida-ku** (Ep.06) | **approx. 8 min** (→ Tokyo Station) | **¥64.79M** |
| Suginami-ku (Ep.05) | approx. 21 min (Chuo Line Rapid → Tokyo Station) | ¥65.17M |
| Nakano-ku (Ep.05) | approx. 16 min (Chuo Line Rapid → Tokyo Station) | ¥71.82M |`,
    `| Ward | To city center | Mansion 70㎡ transaction price |
|---|-----------|----------------|
| Chiyoda-ku (city core, Ep.01) | — (internal) | 1億3,630万円 |
| Chuo-ku (city core, Ep.01) | — (internal) | 1億2,680万円 |
| **Taito-ku** (Ep.06) | **approx. 8 min** (→ Tokyo Station) | **7,762万円** |
| **Koto-ku** (Ep.06) | **approx. 9 min** (→ Otemachi) | **8,401万円** |
| **Sumida-ku** (Ep.06) | **approx. 8 min** (→ Tokyo Station) | **6,479万円** |
| Suginami-ku (Ep.05) | approx. 21 min (Chuo Line Rapid → Tokyo Station) | 6,517万円 |
| Nakano-ku (Ep.05) | approx. 16 min (Chuo Line Rapid → Tokyo Station) | 7,182万円 |`,
  ],
  // Skytree
  [
    "cumulative Skytree observatory admissions surpassed **50 million visitors**.",
    "cumulative Skytree observatory admissions surpassed **5,000万** visitors.",
  ],
  [
    "International visitors in FY2023 (April 2023–March 2024) reached **1.27 million**",
    "International visitors in FY2023 (2023-04–2024-03) reached **127万**",
  ],
  // Footnote kuramae
  [
    "The difference between the Taito-ku count (¥1.274M/㎡, 72 transactions) and the Sumida-ku count (¥1.108M/㎡, 9 transactions)",
    "The difference between the Taito-ku count (127.4万円/㎡, 72 transactions) and the Sumida-ku count (110.8万円/㎡, 9 transactions)",
  ],
];

for (const [from, to] of pairs) {
  if (!en.includes(from)) {
    console.warn("WARN: pattern not found:", from.slice(0, 60));
    continue;
  }
  en = en.replace(from, to);
}

await writeFile(enPath, en);
console.log(JSON.stringify({ ok: true, path: enPath }, null, 2));
