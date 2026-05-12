#!/usr/bin/env python3
"""
GSF-Blog 도쿄 23구 GeoJSON → SVG path 변환 파이프라인
Mapshaper로 단순화된 GeoJSON을 SVG path d= 문자열로 변환
"""
import json, math, re

# ── 에피소드 그룹 매핑 ──────────────────────────────────────────────────────
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

# 23구 코드 범위 (131xxx)
WARD_CODES = set([
    131016, 131024, 131032, 131041, 131059, 131067, 131075, 131083,
    131091, 131105, 131113, 131121, 131130, 131148, 131156, 131164,
    131172, 131181, 131199, 131202, 131211, 131229, 131237,
])

# ── 좌표 투영 (WGS84 → SVG 픽셀) ──────────────────────────────────────────
# 도쿄 23구 바운딩박스 (WGS84)
LON_MIN, LON_MAX = 139.56, 139.93
LAT_MIN, LAT_MAX = 35.52, 35.82

SVG_W, SVG_H = 760, 500
PADDING = 30

def lon_to_x(lon):
    frac = (lon - LON_MIN) / (LON_MAX - LON_MIN)
    return PADDING + frac * (SVG_W - 2 * PADDING)

def lat_to_y(lat):
    # SVG Y축은 아래가 양수
    frac = (LAT_MAX - lat) / (LAT_MAX - LAT_MIN)
    return PADDING + frac * (SVG_H - 2 * PADDING)

def coords_to_path(rings):
    """GeoJSON coordinates rings → SVG path d string"""
    parts = []
    for ring in rings:
        pts = [f"{lon_to_x(c[0]):.1f},{lat_to_y(c[1]):.1f}" for c in ring]
        parts.append("M " + " L ".join(pts) + " Z")
    return " ".join(parts)

def process_feature(feature):
    props = feature["properties"]
    name_ja = props.get("ward_ja", "")
    geom = feature["geometry"]
    ep = EP_GROUPS.get(name_ja, "unknown")
    
    paths = []
    if geom["type"] == "Polygon":
        d = coords_to_path(geom["coordinates"])
        paths.append(d)
    elif geom["type"] == "MultiPolygon":
        for poly in geom["coordinates"]:
            d = coords_to_path(poly)
            paths.append(d)
    
    return name_ja, ep, paths

def main():
    with open("tokyo-simplified.geojson", encoding="utf-8") as f:
        data = json.load(f)
    
    wards = []
    for feat in data["features"]:
        code = feat["properties"].get("code")
        if code not in WARD_CODES:
            continue
        name_ja, ep, paths = process_feature(feat)
        wards.append({"name": name_ja, "ep": ep, "paths": paths})
    
    print(f"<!-- 처리된 구 수: {len(wards)} -->")
    print()
    
    # 에피소드 그룹별 출력
    for ep_id in [f"ep{i}" for i in range(1, 9)] + ["unknown"]:
        ep_wards = [w for w in wards if w["ep"] == ep_id]
        if not ep_wards:
            continue
        print(f"    <!-- ═══ {ep_id.upper()} ═══ -->")
        for ward in ep_wards:
            for path_d in ward["paths"]:
                print(f'    <path class="ward" data-ep="{ep_id}" data-name="{ward["name"]}" d="{path_d}"/>')
            print(f'    <!-- label: {ward["name"]} -->')
        print()
    
    # 레이블 중심점 계산
    print("\n    <!-- ═══ 라벨 좌표 ═══ -->")
    for ward in wards:
        # 모든 path의 평균 좌표를 라벨 위치로 사용
        # (간단히 첫 번째 path의 포인트 평균)
        all_pts = []
        for path_d in ward["paths"]:
            # path_d에서 좌표 파싱
            nums = re.findall(r"([\d.]+),([\d.]+)", path_d)
            for x_str, y_str in nums:
                all_pts.append((float(x_str), float(y_str)))
        if all_pts:
            cx = sum(p[0] for p in all_pts) / len(all_pts)
            cy = sum(p[1] for p in all_pts) / len(all_pts)
            print(f'    <!-- {ward["name"]} center: {cx:.1f},{cy:.1f} ep={ward["ep"]} -->')

if __name__ == "__main__":
    main()
