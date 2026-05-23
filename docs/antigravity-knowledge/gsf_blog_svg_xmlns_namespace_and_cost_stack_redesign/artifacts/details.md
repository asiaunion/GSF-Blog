# GSF-Blog SVG Namespace Repair & Premium Cost Stack Redesign

## 1. Context & Problem Statement

In the GSF-Blog project, post-analysis diagrams (conceptual flowcharts, cost breakdowns, and structural sketches) are maintained as static SVG files under the `public/assets/images/blog/svg/` directory, rather than time-series line charts which are pre-compiled as static WebP images.

An issue was detected where these standalone SVG files suddenly rendered as broken image icons (placeholder boxes) on production:
1. **Broken Image Icon**: A standard broken image icon appeared on the `/posts/japan-real-estate-three-things/` post for the `japan-real-estate-three-things` cost stack chart.
2. **Root Cause**: The standalone SVG files lacked the crucial `xmlns="http://www.w3.org/2000/svg"` namespace attribute on the root `<svg>` tag. 
3. **Browser Constraints**: While inline SVG embedded directly into HTML parses fine without an explicit namespace in modern HTML5, standalone SVG files loaded via `<img src="path.svg">` or Markdown image tags `![alt](path.svg)` *must* have the `xmlns="http://www.w3.org/2000/svg"` attribute. Without it, browsers reject it as an invalid XML graphic, showing a broken image fallback.
4. **Systemic Leak**: A codebase-wide scan revealed that **all 43 SVG files** in `public/assets/images/blog/svg/` were missing this namespace, causing silent rendering failures across multiple blog posts.

---

## 2. Technical Solution: Systemic Recovery

To fix this decisively and prevent manual file-by-file correction overhead, a programmatic bulk repair pipeline was executed.

### 2.1 Bulk SVG Repair Script
We developed a highly targeted Python script, `scripts/fix_svg_xmlns.py`, to recursively audit and modify the assets:

```python
#!/usr/bin/env python3
import re
from pathlib import Path

SVG_DIR = Path("public/assets/images/blog/svg")
fixed_count = 0

for svg_file in sorted(SVG_DIR.glob("*.svg")):
    content = svg_file.read_text(encoding="utf-8")
    
    # Check if namespace is already present
    if 'xmlns="http://www.w3.org/2000/svg"' in content or "xmlns='http://www.w3.org/2000/svg'" in content:
        continue
    
    # Inject namespace inside the root <svg> tag opening
    new_content = re.sub(
        r'<svg\b',
        r'<svg xmlns="http://www.w3.org/2000/svg"',
        content,
        count=1
    )
    
    if new_content != content:
        svg_file.write_text(new_content, encoding="utf-8")
        print(f"✅ Fixed namespace: {svg_file.name}")
        fixed_count += 1

print(f"\nCompleted! Fixed {fixed_count} SVG files.")
```

**Outcome**: This script resolved all 43 broken SVG namespaces at once, immediately curing the rendering problems site-wide.

---

## 3. High-End visual Design: Tokyo Cost Stack Redesign

To replace the plain layout of the original broken Tokyo Cost-Stack chart, a new design was conceptualized and written for English (`en`), Korean (`ko`), and Japanese (`ja`) locales.

### 3.1 Design Principles (GSF-Blog Luxury Standards)
* **Standardized Sizing**: Fixed to `viewBox="0 0 780 405"` with clean bounds and container styling (`border-radius: 12px`, `#ffffff` background).
* **Brand Vibe**: Integrated GSF signature green vertical accent stripe (`fill="#047857"`) alongside title and subtitle on a warm gray header strip (`#f9f9f6` background).
* **Strict Mathematical Representation**: The entire stack represents **100 units of Gross Rent** (Gross Rental Income: 100), rather than only representing costs.
  * **Net Cash Flow (NOI - Interest)**: 30% (Height: 75px, Emerald `#059669`)
  * **Financing Costs (Assuming 50~60% LTV interest)**: 24% (Height: 60px, Indigo `#4f46e5`)
  * **Property Taxes (Fixed Asset & City Planning)**: 14% (Height: 35px, Rose `#e11d48`)
  * **Maintenance & Repair Reserve (Long-term plan)**: 12% (Height: 30px, Amber `#d97706`)
  * **Vacancy & Turnover Buffer (Leasing Ads)**: 10% (Height: 25px, Teal `#0d9488`)
  * **PM Fees & Administration (Property Management)**: 10% (Height: 25px, Slate `#4b5563`)
  * **Total**: 30 + 24 + 14 + 12 + 10 + 10 = **100% of Revenue** (represented with 250px total stack height).
* **Fine Connectors**: Subtle dashed lines (`stroke="#9ca3af"`, `stroke-dasharray="2 2"`) connecting the middle of each bar segment to right-aligned multi-line labels.
* **Modern Typography**: Applied modern type-stack (`font-family: 'Inter', 'Outfit', sans-serif`) with bold category headers and muted secondary details enclosed in `<tspan>` tags.

---

## 4. Local Rendering Previews via resvg

To ensure that the terminal-based agent could confidently present visual changes to the user without blind execution, a preview bridge was implemented:
1. Since `@resvg/resvg-js` is installed as a direct project dependency, we wrote a temporary Node utility, `scripts/render_svg_to_png.js`.
2. The script compiles the SVGs into high-resolution, uncompressed PNG files directly into the conversation artifacts folder:
   `/Users/gsf/.gemini/antigravity/brain/<conv_id>/ko-japan-real-estate-three-things.png`
3. We then embedded these direct images using absolute markdown file paths, allowing immediate visual inspection prior to deployment.

---

## 5. Deployment DoD (Definition of Done)

After confirming visual correctness:
1. **Branch Management**: Staged and committed changes to a feature branch `ui/fix-tokyo-cost-stack-chart` first.
2. **Git Sync**: Switched to `main`, fast-forward merged the feature branch, and successfully pushed to origin.
3. **Environment Inlining**: Ran `scripts/deploy-prebuilt-prod.sh` prepended with GA4 and AdSense variables (`PUBLIC_GA4_MEASUREMENT_ID=G-1JZH2YCS3Z`, `PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-4729433282370174`) to guarantee analytics code was embedded in production.
4. **Live Verification**: Ran curl checks against `https://gsfark.com/posts/japan-real-estate-three-things/` and `https://gsfark.com/ko/posts/japan-real-estate-three-things/` to confirm that the static SVG files were served successfully (HTTP 200) with fixed namespaces.
