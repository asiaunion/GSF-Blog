#!/usr/bin/env python3
"""Build Spatial Heatmap Chart (WebP) using Matplotlib's tricontourf."""

import sys
import csv
from pathlib import Path
import matplotlib.pyplot as plt
import matplotlib.tri as tri
from matplotlib.gridspec import GridSpec
from matplotlib.patches import FancyBboxPatch

if len(sys.argv) < 4:
    print("Usage: python3 generate-heatmap.py <input.csv> <output.webp> <WardName>")
    sys.exit(1)

CSV_PATH = Path(sys.argv[1]).resolve()
OUT_WEBP = Path(sys.argv[2]).resolve()
WARD_NAME = sys.argv[3]

# Colors
BRAND_ACCENT = "#047857"
TEXT_DARK = "#1A1A1A"
TEXT_MUTED = "#6B6B6B"
GRID_COLOR = "#D8D8D8"
BG_COLOR = "#F5F5F0"

def main():
    lons, lats, prices = [], [], []
    with CSV_PATH.open(encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            lons.append(float(row["lon"]))
            lats.append(float(row["lat"]))
            prices.append(float(row["price_sqm"]))
            
    if len(prices) < 3:
        print("Not enough points to interpolate.")
        sys.exit(0)

    plt.rcParams.update({
        "font.family": "sans-serif",
        "font.sans-serif": ["Hiragino Sans", "AppleGothic", "Helvetica Neue", "Arial", "DejaVu Sans"],
    })

    fig = plt.figure(figsize=(6, 6), dpi=132, facecolor=BG_COLOR)
    gs = GridSpec(2, 2, figure=fig, height_ratios=[0.08, 1], width_ratios=[0.018, 1], hspace=0.08, wspace=0.02)

    # Brand accent bar (left of title)
    ax_stripe = fig.add_subplot(gs[0, 0])
    ax_stripe.set_facecolor(BRAND_ACCENT)
    ax_stripe.axis("off")

    ax_head = fig.add_subplot(gs[0, 1])
    ax_head.set_facecolor(BG_COLOR)
    ax_head.axis("off")
    ax_head.text(0, 0.62, f"{WARD_NAME} Price Density", fontsize=15, fontweight="bold", color=TEXT_DARK, ha="left", va="center")
    ax_head.text(0, 0.12, "Price distribution (10k JPY / sqm)", fontsize=10, color=TEXT_MUTED, ha="left", va="center")

    ax = fig.add_subplot(gs[1, :])
    ax.set_facecolor("#FFFFFF")
    
    # Create triangulation and contour plot
    triang = tri.Triangulation(lons, lats)
    
    # Plot contours
    cntr = ax.tricontourf(triang, prices, levels=14, cmap="YlGnBu", alpha=0.9)
    
    # Plot the raw points subtly
    ax.plot(lons, lats, 'ko', markersize=1.5, alpha=0.3)

    # Minimal axes
    ax.set_xticks([])
    ax.set_yticks([])
    for spine in ax.spines.values():
        spine.set_visible(False)

    # Subtle plot frame
    bbox = FancyBboxPatch(
        (0.0, 0.0), 1.0, 1.0,
        boxstyle="square,pad=0",
        linewidth=0.6, edgecolor=GRID_COLOR, facecolor="none",
        transform=ax.transAxes, zorder=10, clip_on=False
    )
    ax.add_patch(bbox)
    
    # Add a discrete colorbar
    cbar = fig.colorbar(cntr, ax=ax, orientation="horizontal", fraction=0.046, pad=0.04)
    cbar.outline.set_visible(False)
    cbar.ax.tick_params(labelsize=8, colors=TEXT_MUTED, length=0)
    
    OUT_WEBP.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(OUT_WEBP, format="webp", bbox_inches="tight", pad_inches=0.35, facecolor=BG_COLOR)
    plt.close(fig)
    print(f"wrote {OUT_WEBP} ({OUT_WEBP.stat().st_size} bytes)")

if __name__ == "__main__":
    main()
