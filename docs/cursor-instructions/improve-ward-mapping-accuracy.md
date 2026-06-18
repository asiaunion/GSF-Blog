# AG 태스크 지시문 — 구별 매핑 정확도 개선 (3단계)

> 발행: 2026-06-17  
> 지시자: Joseph  
> 우선순위: ep08 타일 감사 전 완료 권장  
> 작업 경로: `projects/GSF-Ark`  
> 완료 보고: `docs/cursor-instructions/improve-ward-mapping-accuracy.md` 하단에 결과 append

---

## 배경

현재 `scripts/lib/ward-tiles.mjs`는 **bbox(외접 사각형)** 방식으로 구별 타일을 추출한다.
구의 실제 행정경계는 직사각형이 아니므로 경계 근처에서 인접 구 데이터가 혼입된다.
ep07에서 荒川区 인구가 +7.7%로 과대 추정된 원인 중 하나가 이 문제다.

아래 3단계 작업으로 매핑 정확도를 개선한다.

---

## Task 1 — 인구 데이터 소스 교체 (住民基本台帳)

### 목표
XKT013 메시 타일 샘플 기반 인구 추정을 버리고,
총무성 **住民基本台帳 인구動態調査** 공식 구별 데이터로 교체한다.

### 소스
- URL: https://www.soumu.go.jp/main_sosiki/jichi_gyousei/daityo/jinkou_jinkoudoutai-setaisuu.html
- 또는 e-Stat: https://www.e-stat.go.jp/ → 「住民基本台帳に基づく人口、人口動態及び世帯数」
- 필요 항목: 도쿄 23구별 **2020년 인구 / 2025년 인구** (최신 연도)
- 2040년 추계는 国立社会保障・人口問題研究所(社人研) 데이터 사용:
  https://www.ipss.go.jp/pp-shicyoson/j/shicyoson23/t-page.asp

### 작업 내용
1. 위 소스에서 23구별 인구 수치 수집 (2020·2025·2040)
2. `change_pct` = (2040 - 2020) / 2020 × 100 으로 계산
3. `docs/verification/tokyo-ward-series-benchmarks.json` の `population_forecast.wards` 섹션 갱신
   - 각 구에 `source: "jukiren+ipss"`, `mesh_coverage_warning: false` 설정
4. ep07 3구(北区·荒川区·足立区) 수치 재계산 후 manifest 업데이트:
   - `docs/verification/manifests/ep07-tokyo-kita-arakawa-adachi.manifest.json`
   - POP claims 3건의 `value`, `evidence.source` 갱신
   - `mesh_coverage_warning` 제거 또는 `false`로 수정
   - `footnote_required`: 공식 소스 기반이면 `false`로 변경 가능
5. `mlit-collector.mjs`의 `collectPopulation()` 함수에 주석 추가:
   ```
   // XKT013 메시 수집은 보조용. 구별 인구 SSOT는 population_forecast.wards (jukiren+ipss).
   ```

### 검증
- 荒川区 change_pct가 도쿄도 공식 추계와 방향 일치하는지 확인
- 23구 전체 합계가 도쿄 전체 추계와 ±5% 이내인지 확인
- 결과 요약을 완료 보고에 포함

---

## Task 2 — 역 마스터 DB 도입 (国土数値情報 N02)

### 목표
타일에서 역을 수집한 뒤 사후 필터링하는 방식 대신,
**国土数値情報 鉄道データ(N02)** 역 마스터를 도입하여 구별 역을 직접 조회한다.

### 소스
- URL: https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-v3_1.html
- 파일 형식: GeoJSON 또는 Shapefile → GeoJSON 우선
- 필요 항목: 역명 / 위경도 / 路線名 / 市区町村コード(13XXX)
- 최신 연도판 다운로드 (2024 또는 2025)

### 작업 내용
1. N02 GeoJSON 다운로드 → `docs/verification/data/n02-stations-tokyo.geojson` 저장
2. 도쿄 23구(市区町村コード 13101~13123)만 필터링
3. `scripts/lib/station-master.mjs` 신규 생성:
   ```javascript
   // getStationsByWard(wardCode) → [{name, lat, lon, line, passengers_daily}]
   // wardCode: "13117" 등 WARD_CODE 값
   // passengers_daily: benchmarks의 XKT015 수치와 조인 (역명 기준)
   ```
4. `mlit-collector.mjs`의 `collectStation()` 함수를 수정:
   - 현재: 타일 API → 역 수집 → 인접 구 필터링
   - 변경: station-master에서 구 코드로 역 목록 조회 → XKT015 승하차 수치 조인
   - 기존 STATION_ADMIN_WARD 필터는 fallback으로 유지
5. `ward-tiles.mjs`의 `WARD_POPULATION_TILE_PRESETS`에 주석 추가:
   ```
   // STATION 데이터는 station-master.mjs로 이관. presets는 population 전용.
   ```
6. ep07 3구 STATION claims 재검증:
   - `pnpm verify:ep07-tiles` 재실행
   - 역명·승하차 수치가 station-master 결과와 일치하는지 확인

### 검증
- 北区: 赤羽 포함 여부 확인
- 荒川区: 北千住가 **포함되지 않음** 확인
- 足立区: 北千住 포함 여부 확인
- `pnpm verify:ep07-tiles` ALL CHECKS PASSED

---

## Task 3 — GeoJSON 폴리곤 필터 도입

### 목표
bbox 외접 사각형 대신 실제 구 행정경계 폴리곤으로 타일을 필터링하여
경계 근처 타일의 오분류를 근본적으로 제거한다.

### 소스
- 国土地理院 行政区域データ:
  https://www.gsi.go.jp/kankyochiri/gaikyou.html
- 또는 geojson.czl.jp (가공본, MIT 라이선스):
  https://geojson.czl.jp/
- 필요 항목: 도쿄 23구 각각의 행정경계 GeoJSON (MultiPolygon)

### 작업 내용
1. 23구 GeoJSON 다운로드 → `docs/verification/data/tokyo-wards-boundary.geojson` 저장
2. `scripts/lib/ward-polygon.mjs` 신규 생성:
   ```javascript
   // isPointInWard(lat, lon, wardName) → boolean
   // getWardPolygon(wardName) → GeoJSON Feature
   // 의존: 외부 라이브러리 없이 ray-casting 알고리즘으로 구현
   ```
3. `ward-tiles.mjs`의 `getWardTiles()` 함수 수정:
   - 현재: bbox → 타일 전체 반환
   - 변경: bbox로 후보 타일 추출 → 각 타일 중심점이 구 폴리곤 내부인지 필터링
   ```javascript
   // 타일 중심점 계산: tile2latlon(x, y, z)
   // 폴리곤 내부 판정: ward-polygon.isPointInWard()
   ```
4. `WARD_TILE_OVERRIDES` 재검토:
   - 폴리곤 필터 도입 후 불필요해진 항목 정리
   - 필요한 항목은 유지
5. 23구 전체 타일 수 재계산 후 `audit-ward-tiles.mjs` 실행:
   ```bash
   node scripts/audit-ward-tiles.mjs --json > docs/verification/data/ward-tiles-audit-post-polygon.json
   ```
6. ep07 3구 재검증:
   - `pnpm verify:ep07-tiles` ALL CHECKS PASSED 확인

### 주의사항
- ray-casting 구현은 단순 다각형 기준. MultiPolygon(섬·비연속 구역)은 각 폴리곤 순회.
- 외부 npm 패키지(`@turf/turf` 등) 사용 가능. 단, 패키지 추가 시 Joseph에게 사전 보고.
- 타일 수가 기존 대비 ±30% 이상 변동되는 구가 있으면 원인 분석 후 보고.

---

## 전체 완료 후 필수 작업

1. `pnpm verify:ep07-tiles` 최종 실행 → ALL CHECKS PASSED 확인
2. benchmarks.json `schema_version` 갱신 (1.3 → 1.4)
3. `docs/verification/README.md`에 변경 내역 추가:
   - population 소스: XKT013 메시 → 住民基本台帳+社人研
   - station 소스: 타일 API → N02 역 마스터 + XKT015 조인
   - 타일 필터: bbox → bbox + GeoJSON 폴리곤
4. Joseph에게 완료 보고:

```
[AG→Joseph] 구별 매핑 정확도 개선 완료
- Task 1: 인구 소스 → 住民基本台帳+社人研 (mesh_coverage_warning 해소)
- Task 2: 역 마스터 → N02 GeoJSON (荒川区 오분류 근본 해결)
- Task 3: 폴리곤 필터 → bbox+polygon (경계 타일 오차 제거)
- ep07 verify: ALL CHECKS PASSED
- benchmarks schema: 1.4
- 荒川区 change_pct 갱신값: X.X% (구 수치: X.X%)
ep07 집필 재개 가능 / ep08 타일 감사 준비 완료
```

---

## 작업 순서 권장

Task 1 → Task 2 → Task 3 순으로 진행.
Task 1 완료 시점에 ep07 인구 수치가 확정되므로, 이후 ep07 집필 시작 가능.
Task 2·3은 병렬 진행 가능.

외부 소스 접근 실패 시: Joseph에게 즉시 보고하고 대체 소스 확인 요청.

## AG 진행 로그
- [2026-06-18] Slice 0: 브랜치 baseline 커밋
- 채택 소스: e-Stat / IPSS / 国土地理院 / N02
- czl.jp: 사용 안 함
