#!/usr/bin/env python3
"""Build Economist-style supplemental Korea YoY chart (WebP).

  python3 scripts/charts/generate-macro-barrier-chart.py

Legend: direct line labels (Seoul / Outskirts) — details live in MDX captions.
"""

from __future__ import annotations

import csv
from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.gridspec import GridSpec
from matplotlib.patches import FancyBboxPatch

ROOT = Path(__file__).resolve().parents[2]
CSV_PATH = ROOT / "public/data/macro-barrier-chart-source.csv"
OUT_WEBP = ROOT / "public/assets/images/blog/macro-barrier-seoul-outskirts-yoy.webp"

# GSF Blog brand (matches --color-accent / design-baseline green)
BRAND_ACCENT = "#10b981"
BRAND_ACCENT_DARK = "#047857"  # darker green for second series
SEOUL_COLOR = BRAND_ACCENT
OUTSKIRTS_COLOR = BRAND_ACCENT_DARK
TEXT_DARK = "#1A1A1A"
TEXT_MUTED = "#6B6B6B"
GRID_COLOR = "#D8D8D8"
BG_COLOR = "#F5F5F0"


def load_series() -> tuple[list[str], list[float], list[float]]:
    quarters: list[str] = []
    seoul: list[float] = []
    outskirts: list[float] = []
    with CSV_PATH.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            quarters.append(
                row["Quarter"]
                .replace("2024 ", "'24 ")
                .replace("2025 ", "'25 ")
                .replace("2026 ", "'26 ")
            )
            seoul.append(float(row["Seoul_YoY"]))
            outskirts.append(float(row["Outskirts_YoY"]))
    return quarters, seoul, outskirts


def add_labels_bottom_right(ax) -> None:
    """Compact labels in bottom-right only (no legend box over the plot)."""
    line_kw = dict(transform=ax.transAxes, fontsize=10.5, fontweight="bold", clip_on=False)

    ax.plot([0.84, 0.89], [0.14, 0.14], color=SEOUL_COLOR, linewidth=2.8, transform=ax.transAxes, clip_on=False)
    ax.text(0.91, 0.14, "Seoul", color=SEOUL_COLOR, ha="left", va="center", **line_kw)

    ax.plot([0.84, 0.89], [0.06, 0.06], color=OUTSKIRTS_COLOR, linewidth=2.8, transform=ax.transAxes, clip_on=False)
    ax.text(0.91, 0.06, "Outskirts", color=OUTSKIRTS_COLOR, ha="left", va="center", **line_kw)


def main() -> None:
    quarters, seoul, outskirts = load_series()

    plt.rcParams.update(
        {
            "font.family": "sans-serif",
            "font.sans-serif": ["Helvetica Neue", "Arial", "DejaVu Sans"],
        }
    )

    fig = plt.figure(figsize=(8, 4.2), dpi=132, facecolor=BG_COLOR)
    gs = GridSpec(2, 2, figure=fig, height_ratios=[0.14, 1], width_ratios=[0.018, 1], hspace=0.08, wspace=0.02)

    # Brand accent bar (left of title)
    ax_stripe = fig.add_subplot(gs[0, 0])
    ax_stripe.set_facecolor(BRAND_ACCENT)
    ax_stripe.axis("off")

    ax_head = fig.add_subplot(gs[0, 1])
    ax_head.set_facecolor(BG_COLOR)
    ax_head.axis("off")
    ax_head.text(
        0,
        0.62,
        "Seoul vs. outskirts",
        fontsize=15,
        fontweight="bold",
        color=TEXT_DARK,
        ha="left",
        va="center",
        transform=ax_head.transAxes,
    )
    ax_head.text(
        0,
        0.12,
        "Housing transaction volume YoY, %  ·  Korea reference",
        fontsize=10,
        color=TEXT_MUTED,
        ha="left",
        va="center",
        transform=ax_head.transAxes,
    )

    ax = fig.add_subplot(gs[1, :])
    ax.set_facecolor("#FFFFFF")

    x = range(len(quarters))
    ax.plot(x, seoul, color=SEOUL_COLOR, linewidth=2.8, solid_capstyle="round", zorder=3)
    ax.plot(x, outskirts, color=OUTSKIRTS_COLOR, linewidth=2.8, solid_capstyle="round", zorder=3)

    ax.axhline(0, color=TEXT_MUTED, linewidth=0.9, linestyle=(0, (4, 4)), alpha=0.7, zorder=1)
    ax.set_xticks(list(x))
    ax.set_xticklabels(quarters, fontsize=9.5, color=TEXT_MUTED)
    ax.tick_params(axis="y", labelsize=9.5, colors=TEXT_MUTED, length=0)
    ax.yaxis.tick_right()
    ax.yaxis.set_label_position("right")
    ax.set_ylabel("YoY %", fontsize=9.5, color=TEXT_MUTED, labelpad=8)

    ax.set_ylim(-35, 48)
    ax.grid(axis="y", color=GRID_COLOR, linewidth=0.7, alpha=0.9, zorder=0)
    ax.grid(axis="x", visible=False)

    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.plot([min(x), max(x)], [0, 0], transform=ax.get_xaxis_transform(), color=GRID_COLOR, linewidth=0.8, clip_on=False)

    add_labels_bottom_right(ax)

    # Subtle plot frame
    bbox = FancyBboxPatch(
        (0.01, 0.04),
        0.98,
        0.92,
        boxstyle="square,pad=0",
        linewidth=0.6,
        edgecolor=GRID_COLOR,
        facecolor="none",
        transform=ax.transAxes,
        zorder=2,
    )
    ax.add_patch(bbox)

    OUT_WEBP.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(OUT_WEBP, format="webp", bbox_inches="tight", pad_inches=0.35, facecolor=BG_COLOR)
    plt.close(fig)
    print(f"wrote {OUT_WEBP} ({OUT_WEBP.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
