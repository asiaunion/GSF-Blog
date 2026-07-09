import { readFileSync } from "fs";
import { runTrustValidation } from "./src/lib/validation/trustGates.ts";

const ko = readFileSync("src/data/blog/ko/tokyo-hachioji-hino-akishima.md", "utf-8");
const en = readFileSync("src/data/blog/en/tokyo-hachioji-hino-akishima.md", "utf-8");
const ja = readFileSync("src/data/blog/ja/tokyo-hachioji-hino-akishima.md", "utf-8");

runTrustValidation({ projectRoot: process.cwd(), slug: "tokyo-hachioji-hino-akishima", ko, en, ja })
  .then(res => {
    const parity = res.hardGates.find(g => g.name === "trust-locale-numeric-parity");
    console.log(parity.output);
  });
