import { readFileSync } from "fs";
import { extractNumericLiterals, normalizeNumericToken, stripBoilerplateSections, stripFrontmatter } from "./src/lib/validation/trustUtils.ts";

const ko = readFileSync("src/data/blog/ko/tokyo-hachioji-hino-akishima.md", "utf-8");
const raw = extractNumericLiterals(stripBoilerplateSections(stripFrontmatter(ko)));
console.log(raw.map(normalizeNumericToken).join(", "));
