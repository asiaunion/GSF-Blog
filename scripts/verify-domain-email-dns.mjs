/**
 * Verify gsfark.com domain email DNS (Zoho Mail JP).
 *
 * Usage: node scripts/verify-domain-email-dns.mjs
 */
import { execSync } from "node:child_process";

const DOMAIN = "gsfark.com";

function dig(type, name = DOMAIN) {
  try {
    return execSync(`dig +short ${type} ${name}`, { encoding: "utf8" })
      .trim()
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
}

const mx = dig("MX");
const txt = dig("TXT");
const dmarc = dig("TXT", `_dmarc.${DOMAIN}`);
const dkim = dig("TXT", `zoho._domainkey.${DOMAIN}`);

const checks = [];

const zohoMx = mx.filter((line) => /zoho\.jp/i.test(line));
checks.push({
  name: "MX → Zoho JP",
  ok: zohoMx.length >= 2 && !mx.some((line) => /mail\.gsfark\.com/i.test(line)),
  detail: mx.join("; ") || "(none)",
});

const spf = txt.find((line) => line.includes("v=spf1"));
checks.push({
  name: "SPF",
  ok: Boolean(spf && /include:zohomail\.jp/i.test(spf)),
  detail: spf ?? "(missing)",
});

checks.push({
  name: "DKIM (zoho._domainkey)",
  ok: dkim.some((line) => line.includes("v=DKIM1")),
  detail: dkim.length ? "present" : "(missing)",
});

checks.push({
  name: "DMARC (_dmarc)",
  ok: dmarc.some((line) => line.includes("v=DMARC1")),
  detail: dmarc[0] ?? "(missing — add at onlydomains)",
});

const zohoVerify = txt.find((line) => line.includes("zoho-verification="));
checks.push({
  name: "Zoho domain verification TXT",
  ok: Boolean(zohoVerify),
  detail: zohoVerify ? "present" : "(missing)",
});

let failed = 0;
console.log(`\nDomain email DNS check: ${DOMAIN}\n`);
for (const c of checks) {
  const mark = c.ok ? "✓" : "✗";
  if (!c.ok) failed++;
  console.log(`${mark} ${c.name}`);
  console.log(`  ${c.detail}\n`);
}

if (failed === 0) {
  console.log("All checks passed. Email DNS ready for production.\n");
  process.exit(0);
}

console.log(`${failed} check(s) need attention.\n`);
process.exit(1);
