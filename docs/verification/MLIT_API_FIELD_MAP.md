# MLIT API Field Map (Phase 0 Discovery)

This document contains the validated response field maps for the new MLIT APIs integrated during Phase 0.
Fields are documented exactly as returned by the API to ensure no guessing or hallucinations.

## 1. XPT001: 不動産価格（取引価格・成約価格）情報のポイント
- **Endpoint Type**: Tile-based (Requires `z`, `x`, `y`, `response_format=geojson`)
- **Date Parameters**: `from` and `to` (Format: `YYYYQ`, e.g., `20241` for 2024 Q1). Note: Unlike XIT001 which uses `year` and `quarter`.
- **Additional Params**: `priceClassification` (e.g., `02` for 成約価格)
- **Geometry**: `Point`
- **Properties Found**:
  - `point_in_time_name_ja`: 거래 시기 (예: "2024年第1四半期")
  - `land_type_name_ja`: 토지 종류 (예: "中古マンション等")
  - `price_information_category_name_ja`: 가격 정보 구분
  - `prefecture_name_ja`: 도도부현명 (예: "東京都")
  - `city_code`: 시구정촌 코드 (예: "13117")
  - `city_name_ja`: 시구정촌명 (예: "北区")
  - `district_code`: 지구 코드
  - `district_name_ja`: 지구명 (예: "赤羽")
  - `use_category_name_ja`: 용도 구분 (예: "住宅")
  - `u_transaction_price_total_ja`: 거래 총액 (문자열, 실측 포맷 예: "4,800万円")
  - `u_transaction_price_unit_price_square_meter_ja`: ㎡당 단가
  - `u_unit_price_per_tsubo_ja`: 평당 단가
  - `u_area_ja`: 면적 (실측 포맷 예: "70㎡")
  - `land_shape_name_ja`: 토지 형상
  - `u_land_frontage_ja`: 토지 전면 폭
  - `building_use_name_ja`: 건물 용도
  - `building_structure_name_ja`: 건물 구조 (예: "ＲＣ")
  - `floor_plan_name_ja`: 평면도/간도리 (예: "２ＬＤＫ")
  - `u_building_total_floor_area_ja`: 건물 연면적
  - `u_construction_year_ja`: 건축 연도 (예: "平成20年")
  - `front_road_azimuth_name_ja`: 전면 도로 방위
  - `u_front_road_width_ja`: 전면 도로 폭
  - `front_road_type_name_ja`: 전면 도로 종류
  - `land_use_name_ja`: 토지 이용 현황
  - `u_building_coverage_ratio_ja`: 건폐율 (예: "60")
  - `u_floor_area_ratio_ja`: 용적률 (예: "200")
  - `remark_name_ja`: 비고
  - `future_use_purpose_name_ja`: 향후 이용 목적
  - `remark_renovation_name_ja`: 리노베이션 여부 (예: "改装済")

## 2. XCT001: 鑑定評価書情報
- **Endpoint Type**: Prefecture-based (Requires `area` (Prefecture Code, e.g. `13` for Tokyo) and `division` (Use type, e.g. `00` for Residential, `05` for Commercial))
- **Date Parameters**: `year` (e.g. `2023`)
- **Note**: The response keys are literally in Japanese. There is no `city_code` english key, it is `標準地番号 市区町村コード 市区町村コード`.
  - **구코드 3자리 규칙**: `標準地番号 市区町村コード 市区町村コード` 값은 3자리 문자열입니다. (예: 北区 "13117" -> "117")
  - **서술형 코멘트 부재**: 기존 XIT001에 있던 `future_trend`나 구체적인 거래 코멘트와 같은 서술형 코멘트 필드는 존재하지 않음. → **Phase 1 파생 설계 메모**: 파이프라인에서 코멘트 매핑 시 생략 또는 `null` 처리 고려.
- **Properties Found (Subset)**:
  - `価格時点`
  - `標準地番号 市区町村コード 県コード`
  - `標準地番号 市区町村コード 市区町村コード` (Used for filtering by ward)
  - `標準地番号 地域名`
  - `標準地番号 用途区分`
  - `標準地番号 連番`
  - `変動率` (Fluctuation Rate)
  - `1㎡当たりの価格`
  - `標準地 所在地 住居表示`
  - `標準地 地積 地積`
  - `標準地 形状 形状`
  - `標準地 土地利用の現況 現況`
  - `標準地 土地利用の現況 構造`
  - `標準地 接面道路の状況 前面道路 道路幅員`
  - `標準地 法令上の規制等 用途地域`
  - `標準地 法令上の規制等 指定建ぺい率`
  - `標準地 法令上の規制等 指定容積率`

## 3. XKT003: 立地適正化計画区域 (Location Optimize Plan Area)
- **Endpoint Type**: Tile-based (Requires `z`, `x`, `y`, `response_format=geojson`)
- **Geometry**: `Polygon` / `MultiPolygon`
- **Properties Found**:
  - `_id`
  - `_index`
  - `prefecture`: 도도부현
  - `city_code`: 시구정촌 코드
  - `city_name`: 시구정촌명
  - `notice_number`: 고시 번호
  - `notice_number_s`: 고시 번호 (문자열)
  - `decision_date`: 결정일
  - `decision_classification`: 결정 분류
  - `decision_maker`: 결정자
  - `kubun_id`: 구분 ID
  - `kubun_name_ja`: 구분명 (예: 거주유도구역 등)
  - `area_classification_ja`: 구역 분류
  - `first_decision_date`: 최초 결정일

## 4. XST001: 災害履歴 (XST001)
- **Endpoint Type**: Tile-based (Requires `z`, `x`, `y`, `response_format=geojson`)
- **Geometry**: `Polygon` / `MultiPolygon`
- **Properties Found**:
  - `_id`
  - `_index`
  - `disaster_name_ja`: 재해명 (예: 태풍 이름 등)
  - `disaster_source`: 재해 원인
  - `disaster_date`: 재해 발생일
  - `disastertype_code`: 재해 유형 코드

## 5. XGT001: 指定緊急避難場所 (Hazard Map Shelter Facilities)
- **Endpoint Type**: Tile-based (Requires `z`, `x`, `y`, `response_format=geojson`)
- **Geometry**: `Point`
- **Properties Found**:
  - `_id`
  - `_index`
  - `common_id`: 공통 ID
  - `facility_name_ja`: 시설명 (예: 초등학교, 공원 등)
  - `address_ja`: 주소
  - `prefecture_and_city`: 도도부현 및 시구정촌
  - `volcanic_phenomenon_flag`: 화산 현상 대비 플래그
  - `tsunami_flag`: 쓰나미 대비 플래그
  - `earthquake_flag`: 지진 대비 플래그
  - `large_fire_flag`: 대규모 화재 대비 플래그
  - `landslide_flag`: 토사 재해 대비 플래그
  - `flood_flag`: 홍수 대비 플래그
  - `inland_flooding_flag`: 내수 범람 대비 플래그
  - `high_tide_flag`: 해일 대비 플래그
  - `remarks`: 비고

## Amendment — Phase 3 (2026-06-18)

### 6. XKT014 (방화/준방화지역)
- **type**: FeatureCollection (geojson)
- **properties**: `['_id', '_index', 'decision_date', 'city_name', 'prefecture', 'city_code', 'notice_number_s', 'notice_number', 'decision_classification', 'decision_maker', 'kubun_id', 'first_decision_date', 'fire_prevention_ja']`
- **Key Observation**: `city_code` 있음. `fire_prevention_ja` 속성으로 방화지역 유형 파악.

### 7. XKT023 (지구계획)
- **type**: FeatureCollection (geojson)
- **properties**: `['_id', '_index', 'plan_type_ja', 'group_code', 'prefecture', 'decision_type_ja', 'notice_number_s', 'plan_name', 'decision_date', 'city_name', 'notice_number', 'decision_maker', 'kubun_id', 'first_decision_date']`
- **Key Observation**: ⚠️ **`city_code` 없음.** 대신 `city_name` (예: "練馬区") 존재. 필터 시 `city_name === ward` 또는 `group_code` 사용 필수.

### 8. XKT024 (고도이용지구)
- **type**: FeatureCollection (geojson)
- **properties**: `['_id', '_index', 'advanced_name', 'group_code', 'prefecture', 'decision_type_ja', 'notice_number_s', 'decision_date', 'city_name', 'advanced_type_ja', 'notice_number', 'decision_maker', 'kubun_id', 'first_decision_date']`
- **Key Observation**: ⚠️ **`city_code` 없음.** 대신 `city_name` 존재. 필터 시 `city_name === ward` 사용 필수.

### 9. XKT030 (도시계획도로)
- **type**: FeatureCollection (geojson)
- **properties**: `['_id', '_index', 'decision_date', 'city_name', 'planning_road_ja', 'prefecture', 'decision_type_ja', 'city_code', 'notice_number_s', 'notice_number', 'decision_maker', 'kubun_id', 'first_decision_date']`
- **Key Observation**: `city_code` 있음. `planning_road_ja` 필드 존재.
