# GSF-Ark Weekly Newsletter — Final Copy (SSOT)

> **Status:** Final · 2026-07-01  
> **Implementation:** `scripts/buttondown-rss-draft.mjs`  
> **Automation:** `.github/workflows/buttondown-weekly-draft.yml`  
> **Related:** `docs/BRIEF_buttondown-rss-draft-automation-20260630.md`

---

## Email Header

```html
<p>Hi,</p>

<p>
Here are the latest analyses recently published on <strong>GSF-Ark</strong>.
</p>

<p>
I hope you find something useful in this edition.
</p>

<p>
GSF-Ark is a data-first notebook on Tokyo real estate, J-REITs, and Korea–Japan macro trends, written from Nihonbashi, Tokyo.
</p>

<hr />
```

---

## Repeated Post Block

One block per RSS item (title, snippet, link only — never full article HTML).

```html
<h2>{post.title}</h2>

<p>{post.snippet}</p>

<p>
<a href="{post.link}">
Read the full analysis →
</a>
</p>

<hr />
```

**RSS mapping:** `title` ← `item.title` · `snippet` ← `item.contentSnippet || item.description` · `link` ← `item.link`

---

## Email Footer

```html
<p>
Thanks for reading.
</p>

<p>
My goal is simple: present the data, explain the context, and share how I interpret it.
</p>

<p>
If you found something useful, feel free to share it with someone who may enjoy it as well.
</p>

<p>
— <strong>Joseph KIM</strong><br>
Logged from Nihonbashi, Tokyo<br>
<a href="https://gsfark.com">gsfark.com</a>
</p>
```

---

## Design Principles

This weekly newsletter follows a few simple principles:

- Summarize newly published analyses rather than reproducing them in full.
- Encourage readers to visit **GSF-Ark** for the complete articles.
- Maintain a calm, data-first tone without promotional language.
- Avoid time-sensitive wording that could become inaccurate if publication schedules change.
- Keep the structure consistent so readers immediately recognize each issue.

---

## Operational Notes

| Item | Detail |
|------|--------|
| **Draft generation** | Automated via GitHub Actions + Buttondown API |
| **Subject line** | Auto-generated as `[Draft] {title}` or `[Draft] {title} and N more` — reviewed and edited manually before Send |
| **Content** | Populated from EN RSS (`https://gsfark.com/rss.xml`), items published within the last 7 days |
| **Final review** | Confirm included posts and subject, then publish (no auto-Send) |
| **Cadence** | Workflow runs Saturday 9:00 JST; actual Send timing is Joseph's choice |

This keeps the workflow efficient while preserving editorial quality and consistency.

---

## Change Log

| Date | Commit | Note |
|------|--------|------|
| 2026-07-01 | `22e3e16` | Final copy — remove time-bound header; add edition + share lines |
| 2026-07-01 | `3b3701d` | Header/Footer layout; post repeater |
| 2026-06-30 | `fc185ed` | GitHub Actions + Buttondown API draft automation |
