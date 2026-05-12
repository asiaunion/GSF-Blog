# Geodata 파이프라인 — 사용 가이드

GSF-Blog 도쿄 23구 인포그래픽 지도를 생성하는 파이프라인입니다.

## 파일 구조

```
geodata/
├── tokyo.geojson              # 원본 (dataofjapan/land, 6.3MB)
├── tokyo23_geojson.zip        # 다운로드 캐시
├── tokyo-simplified.geojson   # Mapshaper 3% simplify 결과 (770KB)
├── geojson_to_svg.py          # 좌표 변환 유틸 (탐색/디버그용)
├── gen_e0.py                  # E0 — 23구 전체 지도 HTML 생성기
├── gen_e1.py                  # E1 — 핵심 3구 인포그래픽 HTML 생성기
└── README.md                  # 이 파일
```

## 재현 절차

### 최초 환경 설정 (1회)

```bash
# Mapshaper CLI 설치
npm install -g mapshaper

# 원본 GeoJSON 다운로드
curl -L -o geodata/tokyo.geojson \
  "https://github.com/dataofjapan/land/raw/master/tokyo.geojson"

# 3% simplify (형태 보존 + 경량화)
mapshaper geodata/tokyo.geojson \
  -simplify 3% keep-shapes \
  -proj wgs84 \
  -o format=geojson geodata/tokyo-simplified.geojson
```

### HTML 생성 (에피소드 작업 시마다)

```bash
cd prototypes/geodata

# E0 지도 재생성
python3 gen_e0.py

# E1 인포그래픽 재생성
python3 gen_e1.py
```

생성 파일: `../e0-ward-grouping-map.html`, `../e1-core3-infographic.html`

## 에피소드별 구 그룹 수정

`gen_e0.py` 상단 `EP_GROUPS` 딕셔너리에서 구-에피소드 매핑을 변경합니다:

```python
EP_GROUPS = {
    "千代田区": "ep1", "中央区": "ep1", "港区": "ep1",
    "新宿区": "ep2", "渋谷区": "ep2", "文京区": "ep2",
    # ...
}
```

## SVG 좌표 범위

| 파라미터 | 값 | 설명 |
|---------|---|------|
| `LON_MIN/MAX` | 139.56 ~ 139.93 | 도쿄 23구 경도 범위 |
| `LAT_MIN/MAX` | 35.52 ~ 35.82 | 도쿄 23구 위도 범위 |
| `SVG_W x SVG_H` | 760 x 500 | 출력 SVG 픽셀 |
| Simplify rate | 3% | 형태 보존 + 목표 크기 |

## 라이트/다크 모드

`design-tokens.css`에서 `:root`(다크 기본) + `@media(prefers-color-scheme:light)` + `[data-theme]` 3중 레이어로 지원합니다.

## 주의사항

- SVG 내 `var(--css-variable)`: HTML 인라인 임베드 시에만 동작. 독립 `.svg` 파일로 저장 시 미동작
- Mapshaper 필터(`-filter` 플래그): JS 표현식에 따옴표 중첩 시 파싱 오류 → Python 전처리 권장
- `tokyo.geojson`에는 23구 외 多摩 지역(132xxx), 도서(134xxx) 포함 → `WARD_CODES` set으로 필터링
