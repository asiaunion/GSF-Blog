#!/usr/bin/env python3
"""
GSF-Blog E0 지도 + E1 인포그래픽 HTML 자동 생성기
GeoJSON 실좌표 기반 리얼 도쿄 23구 지도
"""
import json, re, math

# ── 에피소드 그룹 ─────────────────────────────────────
EP_GROUPS = {
    "千代田区": "ep1", "中央区": "ep1", "港区": "ep1",
    "新宿区": "ep2", "渋谷区": "ep2", "文京区": "ep2",
    "目黒区": "ep3", "世田谷区": "ep3",
    "品川区": "ep4", "大田区": "ep4",
    "豊島区": "ep5", "中野区": "ep5", "杉並区": "ep5",
    "台東区": "ep6", "墨田区": "ep6", "江東区": "ep6",
    "北区": "ep7", "荒川区": "ep7", "板橋区": "ep7", "練馬区": "ep7",
    "足立区": "ep8", "葛飾区": "ep8", "江戸川区": "ep8",
}

WARD_CODES = {131016,131024,131032,131041,131059,131067,131075,131083,
              131091,131105,131113,131121,131130,131148,131156,131164,
              131172,131181,131199,131202,131211,131229,131237}

LON_MIN, LON_MAX = 139.56, 139.93
LAT_MIN, LAT_MAX = 35.52, 35.82
SVG_W, SVG_H = 760, 500
PAD = 28

def lon_to_x(lon):
    return PAD + (lon - LON_MIN) / (LON_MAX - LON_MIN) * (SVG_W - 2*PAD)

def lat_to_y(lat):
    return PAD + (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * (SVG_H - 2*PAD)

def rings_to_d(rings):
    parts = []
    for ring in rings:
        pts = " L ".join(f"{lon_to_x(c[0]):.1f},{lat_to_y(c[1]):.1f}" for c in ring)
        parts.append(f"M {pts} Z")
    return " ".join(parts)

def centroid(rings):
    pts = []
    for ring in rings:
        pts.extend(ring)
    cx = sum(lon_to_x(p[0]) for p in pts) / len(pts)
    cy = sum(lat_to_y(p[1]) for p in pts) / len(pts)
    return cx, cy

# ── GeoJSON 로드 ──────────────────────────────────────
with open("tokyo-simplified.geojson", encoding="utf-8") as f:
    data = json.load(f)

wards = []
for feat in data["features"]:
    code = feat["properties"].get("code")
    if code not in WARD_CODES:
        continue
    name = feat["properties"].get("ward_ja", "")
    ep = EP_GROUPS.get(name, "ep1")
    geom = feat["geometry"]
    paths = []
    if geom["type"] == "Polygon":
        paths.append(("main", rings_to_d(geom["coordinates"]), centroid(geom["coordinates"][0:1])))
    else:
        # MultiPolygon — pick largest ring for label
        polys = sorted(geom["coordinates"], key=lambda p: len(p[0]), reverse=True)
        for i, poly in enumerate(polys):
            tag = "main" if i == 0 else "isle"
            paths.append((tag, rings_to_d(poly), centroid(poly[0:1])))
    wards.append({"name": name, "ep": ep, "paths": paths})

# ── 라벨 위치 수동 조정 (필요시) ─────────────────────
LABEL_NUDGE = {
    "千代田区": (0, 5), "中央区": (5, 0), "港区": (0, 5),
    "墨田区": (0, -3), "台東区": (-5, 0), "荒川区": (5, 0),
    "新宿区": (-5, 0), "渋谷区": (-5, 5), "文京区": (0, -3),
    "北区": (0, 5), "板橋区": (0, 5), "練馬区": (0, 5),
}

EP_NAMES = {
    "ep1": "Ep1 핵심3구", "ep2": "Ep2 핵심6구",
    "ep3": "Ep3 서쪽고급", "ep4": "Ep4 비즈니스",
    "ep5": "Ep5 힙스터", "ep6": "Ep6 시타마치",
    "ep7": "Ep7 노스", "ep8": "Ep8 이스트",
}

EP_COLORS = {
    "ep1": "#3b82f6", "ep2": "#8b5cf6", "ep3": "#f59e0b",
    "ep4": "#ea580c", "ep5": "#ec4899", "ep6": "#10b981",
    "ep7": "#06b6d4", "ep8": "#84cc16",
}

# ══════════════════════════════════════════════════════
# E0: 23구 브랜드 그루핑 지도 생성
# ══════════════════════════════════════════════════════
ward_paths_svg = []
label_svg = []

for ward in wards:
    ep = ward["ep"]
    color = EP_COLORS[ep]
    for tag, d, (cx, cy) in ward["paths"]:
        ward_paths_svg.append(
            f'    <path class="ward" data-ep="{ep}" data-color="{color}" d="{d}"/>'
        )
    # 메인 라벨 (첫 번째 path 기준)
    _, _, (cx, cy) = ward["paths"][0]
    nx, ny = LABEL_NUDGE.get(ward["name"], (0, 0))
    label_svg.append(
        f'    <text class="ward-label" x="{cx+nx:.1f}" y="{cy+ny:.1f}" '
        f'text-anchor="middle" data-ep="{ep}">{ward["name"]}</text>'
    )

# 도쿄만 (실제 좌표 기반)
bay_x1, bay_y1 = lon_to_x(139.74), lat_to_y(35.65)
bay_x2, bay_y2 = lon_to_x(139.93), lat_to_y(35.52)

e0_paths = "\n".join(ward_paths_svg)
e0_labels = "\n".join(label_svg)

legend_items = "".join(
    f'<div class="ig-legend__item"><span class="ig-legend__dot" style="background:{EP_COLORS[ep]}"></span>{EP_NAMES[ep]}</div>'
    for ep in [f"ep{i}" for i in range(1,9)]
)

E0_HTML = f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>E0 — 도쿄 23구 브랜드 그루핑 지도</title>
<link rel="stylesheet" href="design-tokens.css">
<style>
body {{
  margin: 0;
  background: var(--ig-bg-base);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
}}
.ig-card {{ max-width: 820px; width: 100%; }}
.map-wrap {{ margin: 16px 0; border-radius: var(--ig-radius-lg); overflow: hidden; }}

/* 구 기본 스타일 — Slate 단색 */
.ward {{
  fill: var(--ig-slate);
  stroke: var(--ig-slate-stroke);
  stroke-width: 0.8;
  stroke-linejoin: round;
  transition: fill 220ms ease, filter 220ms ease, stroke 220ms ease;
  cursor: pointer;
}}
/* 호버 시 에피소드 색상 활성화 */
.ward:hover {{
  stroke-width: 1.5;
  filter: brightness(1.15);
}}
.ward[data-ep="ep1"]:hover {{ fill: rgba(59,130,246,0.5);  stroke: #3b82f6; }}
.ward[data-ep="ep2"]:hover {{ fill: rgba(139,92,246,0.5);  stroke: #8b5cf6; }}
.ward[data-ep="ep3"]:hover {{ fill: rgba(245,158,11,0.5);  stroke: #f59e0b; }}
.ward[data-ep="ep4"]:hover {{ fill: rgba(234,88,12,0.5);   stroke: #ea580c; }}
.ward[data-ep="ep5"]:hover {{ fill: rgba(236,72,153,0.5);  stroke: #ec4899; }}
.ward[data-ep="ep6"]:hover {{ fill: rgba(16,185,129,0.5);  stroke: #10b981; }}
.ward[data-ep="ep7"]:hover {{ fill: rgba(6,182,212,0.5);   stroke: #06b6d4; }}
.ward[data-ep="ep8"]:hover {{ fill: rgba(132,204,22,0.5);  stroke: #84cc16; }}

/* 라벨 */
.ward-label {{
  font-family: 'Inter','Noto Sans KR',sans-serif;
  font-size: 8px;
  font-weight: 600;
  fill: var(--ig-slate-text);
  pointer-events: none;
  transition: fill 220ms ease;
}}

/* 툴팁 */
#tooltip {{
  position: fixed;
  background: var(--ig-bg-elevated);
  border: 1px solid var(--ig-bg-card-border);
  border-radius: var(--ig-radius-md);
  padding: 8px 14px;
  font-family: var(--ig-font);
  font-size: 12px;
  font-weight: 600;
  color: var(--ig-text-primary);
  pointer-events: none;
  opacity: 0;
  transition: opacity 150ms ease;
  z-index: 999;
  white-space: nowrap;
  box-shadow: var(--ig-shadow-card);
}}
#tooltip.show {{ opacity: 1; }}
#tooltip .ep-badge {{
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 2px;
  margin-right: 6px;
  vertical-align: middle;
}}

.compass {{ opacity: 0.5; transition: opacity 200ms; }}
.compass:hover {{ opacity: 1; }}
</style>
</head>
<body>
<button class="ig-theme-toggle" id="themeToggle" title="라이트/다크 전환">☀️</button>
<div id="tooltip"></div>
<div class="ig-card">
  <div class="ig-header">
    <div>
      <h2 class="ig-title">도쿄 23구 브랜드 그루핑 지도</h2>
      <p class="ig-subtitle">이미지·브랜드 기준 12편 시리즈 — 구에 마우스를 올려 에피소드 확인</p>
    </div>
    <div class="ig-source">Source: 국토수치정보 (MLIT)<br>© 2026 GSF</div>
  </div>

  <div class="map-wrap">
    <svg viewBox="0 0 {SVG_W} {SVG_H}" xmlns="http://www.w3.org/2000/svg"
         role="img" aria-label="도쿄 23구 브랜드 그루핑 지도" id="ward-map">
      <defs>
        <linearGradient id="bay-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1e40af" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#1e40af" stop-opacity="0.02"/>
        </linearGradient>
      </defs>

      <!-- BG -->
      <rect width="{SVG_W}" height="{SVG_H}" fill="var(--ig-bg-primary)" rx="12"/>

      <!-- 도쿄만 (실좌표) -->
      <path d="M {lon_to_x(139.74):.1f},{lat_to_y(35.575):.1f}
               L {lon_to_x(139.80):.1f},{lat_to_y(35.58):.1f}
               L {lon_to_x(139.875):.1f},{lat_to_y(35.62):.1f}
               L {lon_to_x(139.93):.1f},{lat_to_y(35.63):.1f}
               L {SVG_W},{SVG_H} L {lon_to_x(139.74):.1f},{SVG_H} Z"
            fill="url(#bay-grad)" stroke="var(--ig-bay-stroke)" stroke-width="0.5"/>
      <text x="{lon_to_x(139.84):.1f}" y="{lat_to_y(35.575):.1f}"
            text-anchor="middle" fill="var(--ig-blue)" font-size="11" font-weight="600"
            opacity="0.5" font-family="Inter,sans-serif">東京湾</text>

      <!-- 23구 실좌표 path -->
{e0_paths}

      <!-- 라벨 -->
{e0_labels}

      <!-- 황궁 마커 -->
      <circle cx="{lon_to_x(139.752):.1f}" cy="{lat_to_y(35.685):.1f}"
              r="3.5" fill="#bbf7d0" stroke="#16a34a" stroke-width="0.8" opacity="0.9"/>
      <text x="{lon_to_x(139.752):.1f}" y="{lat_to_y(35.685)-7:.1f}"
            text-anchor="middle" fill="#86efac" font-size="7"
            font-family="Inter,sans-serif" opacity="0.9">皇居</text>

      <!-- 방위 -->
      <g class="compass" transform="translate({SVG_W-36},{36})">
        <circle r="14" fill="rgba(255,255,255,0.04)" stroke="var(--ig-axis)" stroke-width="0.8"/>
        <text text-anchor="middle" y="-1" fill="var(--ig-gold)" font-size="12" font-weight="900" font-family="Inter,sans-serif">↑</text>
        <text text-anchor="middle" y="10" fill="var(--ig-text-muted)" font-size="7" font-family="Inter,sans-serif">N</text>
      </g>
    </svg>
  </div>

  <!-- 범례 -->
  <div class="ig-legend">
    {legend_items}
  </div>
</div>

<script>
const EP_NAMES = {json.dumps({k: EP_NAMES[k] for k in EP_NAMES}, ensure_ascii=False)};
const EP_COLORS = {json.dumps(EP_COLORS, ensure_ascii=False)};
const tooltip = document.getElementById('tooltip');
const wards = document.querySelectorAll('.ward');

wards.forEach(w => {{
  w.addEventListener('mousemove', e => {{
    const ep = w.dataset.ep;
    const name = w.dataset.ep ? w.closest('svg').querySelector(
      `.ward-label[data-ep="${{ep}}"]`) : null;
    const wardName = w.getAttribute('data-name') || '';
    tooltip.innerHTML = `<span class="ep-badge" style="background:${{EP_COLORS[ep]}}"></span>${{EP_NAMES[ep] || ep}} — ${{wardName}}`;
    tooltip.classList.add('show');
    tooltip.style.left = (e.clientX + 14) + 'px';
    tooltip.style.top  = (e.clientY - 10) + 'px';
  }});
  w.addEventListener('mouseleave', () => tooltip.classList.remove('show'));
}});

// 다크 초기화
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
const toggleBtn = document.getElementById('themeToggle');
if (toggleBtn) {{
  toggleBtn.textContent = isDark ? '☀️' : '🌙';
  toggleBtn.addEventListener('click', () => {{
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    toggleBtn.textContent = next === 'dark' ? '☀️' : '🌙';
  }});
}}

// 구 이름 → 툴팁 매핑 (라벨 text 내용 읽기)
const labelMap = {{}};
document.querySelectorAll('.ward-label').forEach(lbl => {{
  labelMap[lbl.dataset.ep] = labelMap[lbl.dataset.ep] || [];
  labelMap[lbl.dataset.ep].push(lbl.textContent);
}});
const wardEls = document.querySelectorAll('.ward');
wardEls.forEach((w, i) => {{
  const ep = w.dataset.ep;
  const names = labelMap[ep] || [];
  const idx = Array.from(document.querySelectorAll(`.ward[data-ep="${{ep}}"]`)).indexOf(w);
  w.setAttribute('data-name', names[0] || ep);
}});
</script>
</body>
</html>"""

with open("../e0-ward-grouping-map.html", "w", encoding="utf-8") as f:
    f.write(E0_HTML)

print(f"E0 생성 완료: {len(ward_paths_svg)} paths, {len(label_svg)} labels")
