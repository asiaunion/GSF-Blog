#!/usr/bin/env python3
"""Build one supplemental Korea YoY chart asset (WebP) from CSV.

  python3 scripts/charts/generate-macro-barrier-chart.py

Chart labels stay in English for legibility; KO/EN/JA captions live in MDX.
"""

from __future__ import annotations

import csv
from pathlib import Path

import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parents[2]
CSV_PATH = ROOT / "public/data/macro-barrier-chart-source.csv"
OUT_WEBP = ROOT / "public/assets/images/blog/macro-barrier-seoul-outskirts-yoy.webp"

SEOUL_COLOR = "#10b981"
OUTSKIRTS_COLOR = "#ef4444"


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


def main() -> None:
    quarters, seoul, outskirts = load_series()

    fig, ax = plt.subplots(figsize=(8, 3.8), dpi=120)
    fig.patch.set_facecolor("#fafafa")
    ax.set_facecolor("#fafafa")

    ax.plot(
        quarters,
        seoul,
        color=SEOUL_COLOR,
        linewidth=3.5,
        marker="o",
        markersize=8,
        label="Seoul (YoY)",
    )
    ax.plot(
        quarters,
        outskirts,
        color=OUTSKIRTS_COLOR,
        linewidth=3.5,
        marker="o",
        markersize=8,
        label="Outskirts — Gyeonggi/Incheon (YoY)",
    )

    ax.axhline(0, color="#9ca3af", linewidth=1.2, linestyle="--", alpha=0.85)
    ax.set_title(
        "Korea reference: Seoul vs. outskirts transaction volume YoY (%)",
        fontsize=13,
        fontweight="bold",
        pad=14,
    )
    ax.set_ylabel("Year-over-year (%)", fontsize=11)
    ax.tick_params(axis="both", labelsize=10)
    ax.grid(axis="y", color="#e5e7eb", linewidth=0.8, alpha=0.9)
    ax.legend(
        loc="upper center",
        ncol=2,
        fontsize=13,
        frameon=True,
        framealpha=0.97,
        edgecolor="#d1d5db",
        bbox_to_anchor=(0.5, 1.02),
    )

    for spine in ("top", "right"):
        ax.spines[spine].set_visible(False)

    fig.tight_layout()
    OUT_WEBP.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(OUT_WEBP, format="webp", bbox_inches="tight", facecolor=fig.get_facecolor(), dpi=132)
    plt.close(fig)
    print(f"wrote {OUT_WEBP} ({OUT_WEBP.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
