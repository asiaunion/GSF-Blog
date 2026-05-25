# Next work queue (after trust housekeeping)

> **Trust / T3:** Fixed — [`fact-audit/T3_POLICY.md`](./fact-audit/T3_POLICY.md).  
> **Do not** reopen full batch T3 unless policy changes.  
> **Full session context:** [`GSF_BLOG_SESSION_ARCHIVE_20260525.md`](./GSF_BLOG_SESSION_ARCHIVE_20260525.md)

Work in order. Check off in this file or weekly KPI when done.

---

## 1. Search Console (manual)

Guide: [`GSC_MANUAL_STEPS_20260522.md`](./GSC_MANUAL_STEPS_20260522.md) · JA priority: [`SEO_JA_CLUSTER_FOCUS.md`](./SEO_JA_CLUSTER_FOCUS.md)

- [ ] Sitemap `https://gsfark.com/sitemap-index.xml` submitted / healthy
- [ ] URL inspection ~6 URLs (home, topics, KO/EN/JA post, about)
- [ ] JA cluster P0 URLs (3/week per SEO doc)
- [ ] Legacy Korean URL 308 spot-check if GSC still shows old paths

---

## 2. AdSense (manual + env)

Guide: [`ADSENSE_AND_GSC_CHECKLIST.md`](./ADSENSE_AND_GSC_CHECKLIST.md)

- [ ] `PUBLIC_ADSENSE_PUBLISHER_ID` on Vercel production
- [ ] Application submitted in Google UI
- [ ] After approval: `public/ads.txt` + verify live
- [ ] Lighthouse ≥90 on `/`, `/topics/`, one long post (mobile + desktop)

---

## 3. Monetization MVP (manual)

Guide: [`MONETIZATION_EQUITY_MVP.md`](./MONETIZATION_EQUITY_MVP.md)

- [ ] W1: A8.net + もしも affiliate signup (links after AdSense OK)
- [ ] W1: Buttondown welcome sequence (1 email)
- [ ] W2–W3: SNS pilot 4–8 posts ([`SNS_PILOT_CADENCE.md`](./SNS_PILOT_CADENCE.md))
- [ ] W4: Affiliate links in 3 pilot posts ([`AFFILIATE_SETUP.md`](./AFFILIATE_SETUP.md))

---

## 4. Content & SEO (ongoing)

- [ ] New posts: DoD in [`BLOG_TRUST_AND_QUALITY_ROADMAP.md`](./BLOG_TRUST_AND_QUALITY_ROADMAP.md) § 신규 글
- [ ] Ward / Nihonbashi series internal links per [`SEO_JA_CLUSTER_FOCUS.md`](./SEO_JA_CLUSTER_FOCUS.md)
- [ ] Micro-update + `modDatetime` on top legacy posts (freshness)

---

## 5. Later (separate projects)

- Track 2 news factory · UI v2 — [`superpowers/specs/spec-blog-v2.md`](./superpowers/specs/spec-blog-v2.md)

---

## Release hygiene (each deploy)

```bash
SKIP_VALIDATE_BUILD=1 SKIP_TRUST_VERIFY=1 pnpm validate:batch
pnpm verify:diagram-posts   # after diagram changes
pnpm run build              # before major releases
```
