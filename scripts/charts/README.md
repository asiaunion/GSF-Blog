# Blog chart assets

## Recommended pattern (GSF-Blog)

| Approach | When to use | Page weight |
|---|---|---|
| **Static WebP** (`public/assets/images/blog/*.webp`) | Data charts, supplemental context | ~20–35 KB per image (cached) |
| **Static SVG** (`public/assets/images/blog/svg/*.svg`) | Simple diagrams (2–3 boxes) | ~1–2 KB |
| **Inline SVG in MD/MDX** | Avoid — fragile in Markdown, bloats HTML | ~5–15 KB duplicated in HTML |

Do **not** use Gemini/AI image generation for data charts: labels and values will be wrong.

## macro-barrier Korea YoY chart

```bash
# Edit CSV if data changes
vim public/data/macro-barrier-chart-source.csv
python3 scripts/charts/generate-macro-barrier-chart.py
```

Output: `public/assets/images/blog/macro-barrier-seoul-outskirts-yoy.webp`

**Style:** Economist-inspired layout — GSF green accent bar, Y-axis on the right, **direct labels** in whitespace (`Seoul` at peak, `Outskirts` at early gap). Seoul `#047857`, Outskirts `#a7f3d0`. Details stay in MDX `<figcaption>`.

Posts reference it via `<figure class="supplemental-chart">` in MDX (captions are per language in the post).
