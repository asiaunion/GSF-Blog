import { readFileSync } from "fs";
import { extractNumericLiterals, normalizeNumericToken, stripBoilerplateSections, stripFrontmatter } from "./src/lib/validation/trustUtils.ts";

const en = readFileSync("src/data/blog/en/tokyo-hachioji-hino-akishima.md", "utf-8");
const raw = extractNumericLiterals(stripBoilerplateSections(stripFrontmatter(en)));
console.log(raw.map(normalizeNumericToken).join(", "));
