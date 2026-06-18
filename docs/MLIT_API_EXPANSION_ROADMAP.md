# MLIT API 확장 파이프라인 로드맵

> 작성: Claude (2026-06-18)  
> 목적: 미수집 MLIT API 레이어의 데이터 파이프라인 통합 전체 계획  
> 분석 근거: `docs/MLIT_API_EXPANSION_ANALYSIS.md`  
> 실행 위임: Cursor(작업 계획 구체화) → AG(실제 구현)  
> Claude 역할: 방향·계획 수립만. 코드 작성 없음.

---

## 1. 설계 원칙

1. **기존 파이프라인 구조 유지**: `mlit-collector.mjs` → `sync-mlit-to-benchmarks.mjs` → `benchmarks.json` 흐름 그대로 확장
2. **SSOT 원칙 엄수**: 각 레이어는 benchmarks.json의 단일 섹션으로 등록. 에피소드 집필 시 반드시 benchmarks에서 lookup.
3. **Tier 체계 유지**: A(Primary) / A_auxiliary(보조) / B(스냅샷) 구분 유지
4. **단계별 추가**: 한 번에 전부 추가하지 않고 Phase별로 검증 후 진행
5. **Joseph 승인 게이트**: Phase 완료 시마다 Claude 검증 → Joseph 최종 승인 후 다음 Phase 진행

---

## 2. Phase 구성

```
Phase 1 (1~2주)   — 공간 정보 기반 확장 (XPT001 + XCT001)          ✅ 완료
Phase 2 (1~2주)   — 정책·리스크 완성 (XKT003 + XST001 + XGT001)   ✅ 완료 (XKT003 23구 defer)
Phase 3 (2~3주)   — 도시계획 완전판 (XKT014 + XKT030 + XKT024 + XKT023) ✅ 완료
RE (Region Expansion, ~2주) — 지역 SSOT 일반화 + 수도권 파일럿     🎯 진행 예정
Phase 4 (추후)    — 생활 인프라 레이어 (XKT004~011 + XKT031)       ⏸ 이연
```

> **RE 상세**: `docs/REGION_EXPANSION_PLAN.md` — AG 슬라이스·Cursor verify gate·Joseph 승인 게이트.

---

## 3. Phase 1 — 공간 정보 기반 확장

**목표**: 현재 구 단위 평균 분석을 거래 건별 공간 분석으로 고도화

### 대상 레이어

#### XPT001 — 不動産価格 포인트 API

**우선순위 이유**  
기존 XIT001은 구 단위 집계값. XPT001은 동일 원천 데이터에 거래 건별 위도·경도가 포함된 GeoJSON. 이 레이어 추가 시 이후 모든 공간 분석의 기반이 된다.

**수집 설계**
- 엔드포인트: `/ex-api/external/XPT001`
- 파라미터: XIT001과 동일 (priceClassification, year, city) + 타일 좌표(z, x, y)
- 캐시 키: `price-point-{priceClassification}-{ward}-{year}-{z}_{x}_{y}.json`
- 수집 함수명: `collectPricePoints(wardName, year, noCache)`
- benchmarks 등록 섹션: `price_points` (구별 GeoJSON 파일 경로 참조 방식 권장 — 건수가 많아 JSON 직접 임베드 비적합)

**benchmarks 등록 형태**
```json
"price_points": {
  "source": "MLIT XPT001 API",
  "tier": "A",
  "note": "거래 건별 위도·경도 포함. 공간 분석용. 집계값은 mlit_mansion_2025 섹션 참조.",
  "wards": {
    "北区": {
      "geojson_path": "docs/verification/data/price-points/kita-2025.geojson",
      "count": 354,
      "price_classification": "02",
      "tile_coverage_warning": true
    }
  }
},
"appraisal_comments": {
  "source": "MLIT XCT001 API",
  "tier": "A",
  "note": "감정평가사가 기록한 개별 공시지가 위치와 변동률. benchmarks SSOT = 2025. (fetch 기본은 2023 포함이나 benchmarks 병합 시 2025 기준)",
  "wards": {
    "北区": {
      "json_path": ".cache/mlit/appraisal-merged-kita-2025.json",
      "count": 110,
      "fetched_at": "2026-06-XX"
    }
  }
}
```

**파생 분석 스크립트 (Cursor가 설계)**
- `analyze-station-distance.mjs`: XPT001 × XKT015 → 역까지 도보 분 × 가격 회귀분석
- `analyze-disaster-price.mjs`: XPT001 × XKT025~029 → 재해구역 내외 가격 비교
- `render-ward-price-map.mjs`: 구별 가격 히트맵 생성 (블로그 시각화용)

---

#### XCT001 — 鑑定評価書情報 API

**우선순위 이유**  
지가 수치(XPT002)에 감정사 공식 코멘트를 붙여 "숫자의 이유"를 1차 소스로 서술 가능.

**수집 설계**
- 엔드포인트: `/ex-api/external/XCT001`
- 파라미터: 도도부현 코드(13=도쿄) + 연도
- 반환 형식: JSON (타일 아님)
- 캐시 키: `appraisal-{ward}-{year}.json`
- 수집 함수명: `collectAppraisal(wardName, year, noCache)`
- API 특성상 텍스트 요약이 주요 결과. bulk JSON은 `.cache` 유지 권장.
- benchmarks 등록 섹션: `appraisal_comments` (상위 코멘트 또는 JSON 경로 참조)

**benchmarks 등록 형태**
```json
"appraisal_comments": {
  "source": "MLIT XCT001 API",
  "tier": "A",
  "note": "지가공시 감정평가서 원문. 직근 5년분. 텍스트 인용 시 출처 명기 필수. bulk 데이터는 캐시 경로 참조.",
  "wards": {
    "北区": {
      "json_path": ".cache/mlit/appraisal-merged-kita-2023.json",
      "count": 110,
      "fetched_at": "2026-06-XX"
    }
  }
}
```

**파생 분석**
- 구별 "future_trend" 집계 → 시장 심리 지표
- 블로그 집필 시 감정 코멘트 직접 인용 근거로 활용

---

### Phase 1 완료 기준
- [ ] `collectPricePoints()` 함수 구현 + 23구 수집 완료
- [ ] `collectAppraisal()` 함수 구현 + 23구 수집 완료
- [ ] benchmarks.json `price_points` / `appraisal_comments` 섹션 등록
- [ ] `analyze-station-distance.mjs` 기본 버전 동작 확인
- [ ] `pnpm verify:ep07-tiles` PASSED 유지 (회귀 없음)
- [ ] Claude 검증 → Joseph 승인

---

## 4. Phase 2 — 정책·리스크 완성

**목표**: 재해 리스크 분석을 "상정"에서 "실증"으로 고도화 + 정책 레이어 추가

### 대상 레이어

#### XKT003 — 立地適正化計画

**수집 설계**
- 타일 GeoJSON (기존 disaster 레이어와 동일 방식)
- 수집 함수명: `collectLocationOptimization(wardName, noCache)`
- 집계 내용:
  - 구 면적 대비 거주유도구역 커버리지 %
  - 도시기능유도구역 내 핵심 시설 수
- benchmarks 등록 섹션: `location_optimization`

**benchmarks 등록 형태**
```json
"location_optimization": {
  "source": "MLIT XKT003 API (令和6年度)",
  "tier": "A",
  "wards": {
    "北区": {
      "residential_induction_coverage_pct": 78.3,
      "urban_function_zones": 3,
      "note": "거주유도구역 커버리지 78.3% — 구 면적의 약 4/5가 정책 지원 구역",
      "fetched_at": "2026-06-XX"
    }
  }
}
```

---

#### XST001 — 災害履歴

**수집 설계**
- 타일 GeoJSON
- 수집 함수명: `collectDisasterHistory(wardName, noCache)`
- 집계 내용: 재해 유형별 이력 건수, 최근 발생 연도
- 커버리지 주의: 국토조사 미완료 지역은 데이터 공백 — `coverage_note` 필드 필수

**benchmarks 등록 형태**
```json
"disaster_history": {
  "source": "MLIT XST001 API",
  "tier": "A",
  "coverage_warning": "국토조사 미완료 지역은 이력 없음이 아닌 데이터 없음일 수 있음",
  "wards": {
    "江東区": {
      "flood_events": 3,
      "last_flood_year": 2019,
      "coverage_status": "surveyed",
      "fetched_at": "2026-06-XX"
    }
  }
}
```

**파생 분석 스크립트**
- `analyze-disaster-matrix.mjs`: XKT025~029(상정) × XST001(이력) → 4분면 리스크 매트릭스 생성

---

#### XGT001 — 指定緊急避難場所

**수집 설계**
- 포인트 GeoJSON
- 수집 함수명: `collectEvacuationSites(wardName, noCache)`
- 집계 내용: 총 대피장소 수, 총 수용 인원, 재해별 대응 장소 수
- benchmarks 등록 섹션: `evacuation_sites`

---

### Phase 2 완료 기준
- [ ] 3개 수집 함수 구현 + 23구 수집 완료
- [ ] benchmarks.json 3개 섹션 등록
- [ ] `analyze-disaster-matrix.mjs` 동작 확인 (4분면 산출)
- [ ] 재해 관련 verify gate 업데이트 (`verify-disaster.mjs` 신규 또는 확장)
- [ ] Claude 검증 → Joseph 승인

---

## 5. Phase 3 — 도시계획 완전판

**목표**: 투자자 관점의 개발 포텐셜·건축 제한 레이어 완성

### 대상 레이어 (4종)

| ID | 내용 | 핵심 분석 |
|----|------|----------|
| XKT014 | 방화·준방화지역 | 재건축 비용 분류 (용도지역과 세트) |
| XKT030 | 도시계획도로 | 수용 리스크 + 접근성 향상 기대 |
| XKT024 | 고도이용지구 | 용적률 특례 = 재개발 수익성 |
| XKT023 | 지구계획 | 소구역 개발 제한 세밀화 |

**통합 수집 설계**  
4종 모두 타일 GeoJSON, 기존 disaster 수집 방식과 동일.  
`collectUrbanPlanning(wardName, noCache)` — 4종 통합 함수로 구현 권장 (disaster 5종 통합 방식 참고).

**benchmarks 등록 섹션**: `urban_planning`
```json
"urban_planning": {
  "source": "MLIT XKT014/023/024/030 API (令和6年度)",
  "tier": "A",
  "wards": {
    "北区": {
      "fire_prevention_zone": { "coverage_pct": 45.2, "type": "準防火地域優勢" },
      "urban_road_affected_pct": 3.1,
      "high_utilization_zones": 2,
      "district_plan_zones": 7,
      "fetched_at": "2026-06-XX"
    }
  }
}
```

**파생 분석 스크립트**
- `analyze-redevelopment-potential.mjs`: 고도이용지구 × XPT001 → 재개발 저평가 매물 탐지
- `analyze-urban-constraints.mjs`: 용도지역(XKT002) × 방화(XKT014) × 지구계획(XKT023) → 개발 가능성 복합 분류

### Phase 3 완료 기준
- [ ] `collectUrbanPlanning()` 구현 + 23구 수집 완료
- [ ] benchmarks.json `urban_planning` 섹션 등록
- [ ] Claude 검증 → Joseph 승인

---

## 6. Phase 4 — 생활 인프라 레이어 (장기)

**대상**: XKT004·005·006·007·010·011·031  
**시기**: Phase 1~3 완료 후, 또는 시리즈 방향 "육아/의료/학군" 확장 결정 시  
**설계**: `collectLifeInfrastructure(wardName, noCache)` 통합 함수  
**독자 타깃**: 실거주자 (30~40대, 자녀 있는 가구)

---

## 7. benchmarks.json 섹션 로드맵

Phase 완료 후 benchmarks.json에 추가될 섹션 전체:

```
현재 (schema 1.5)
├── mlit_mansion_2025_q1_q4          ✅
├── mlit_mansion_timeseries          ✅
├── mlit_trade_price_timeseries      ✅
├── land_price_timeseries            ✅
├── station_passengers               ✅
├── population_forecast              ✅
├── disaster_risk                    ✅
└── suumo_rent                       ✅

Phase 1 추가 (→ schema 1.6)
├── price_points                     📌 XPT001
└── appraisal_comments               📌 XCT001

Phase 2 추가 (→ schema 1.7)
├── location_optimization            📌 XKT003
├── disaster_history                 📌 XST001
└── evacuation_sites                 📌 XGT001

Phase 3 추가 (→ schema 1.8)
└── urban_planning                   📌 XKT014/023/024/030

Phase 4 추가 (→ schema 1.9)
└── life_infrastructure              📌 XKT004~011/031
```

---

## 8. 스크립트 추가 로드맵

현재 `scripts/` 에 Phase별로 추가될 스크립트:

**Phase 1**
- `scripts/fetch-price-points.mjs` — XPT001 수집
- `scripts/fetch-appraisal.mjs` — XCT001 수집
- `scripts/analyze-station-distance.mjs` — 역세권 프리미엄 정량화
- `scripts/analyze-disaster-price.mjs` — 재해구역 × 가격 교차
- `scripts/render-ward-price-map.mjs` — 가격 히트맵 시각화

**Phase 2**
- `scripts/fetch-location-optimization.mjs` — XKT003 수집
- `scripts/fetch-disaster-history.mjs` — XST001 수집
- `scripts/fetch-evacuation-sites.mjs` — XGT001 수집
- `scripts/analyze-disaster-matrix.mjs` — 4분면 리스크 매트릭스
- `scripts/verify-disaster-complete.mjs` — 방재 완전판 gate

**Phase 3**
- `scripts/fetch-urban-planning.mjs` — XKT014/023/024/030 통합 수집
- `scripts/analyze-redevelopment-potential.mjs` — 재개발 포텐셜
- `scripts/analyze-urban-constraints.mjs` — 도시계획 복합 분류

---

## 9. 에피소드 집필 파이프라인 연동

Phase 완료 레이어는 에피소드 Research Pack에 자동 포함:

```
현재 Research Pack 섹션
└── price / station / population / disaster / land_price / timeseries

Phase 1 완료 후 추가
└── price_map (구 내 가격 분포) / appraisal_highlights (감정 코멘트 발췌)

Phase 2 완료 후 추가
└── disaster_matrix (4분면 리스크) / evacuation_summary / policy_zone (입지적정화)

Phase 3 완료 후 추가
└── redevelopment_potential / urban_constraints
```

`render-episode-research-pack.mjs`를 Phase별로 확장.

---

## 10. 실행 전 확인 사항 (Cursor 작업 시작 전)

Cursor가 각 Phase 구현 시작 전 확인해야 할 사항:

1. **API 응답 형식 사전 확인**: 각 엔드포인트의 실제 응답 스키마를 1개 타일로 테스트 수집 후 필드명 확인 (예: 재해 이력의 재해 종별 필드명은 API별로 다를 수 있음)
2. **커버리지 공백 파악**: XST001(재해 이력)은 조사 미완료 구역이 있음. 도쿄 23구 커버리지 먼저 확인.
3. **XCT001 응답 구조**: JSON 반환 (타일 없음). 파라미터 구조가 XIT001과 유사하나 다름. API 매뉴얼 사전 확인 필수.
4. **기존 verify gate 보호**: 각 Phase 완료 후 `pnpm verify:ep07-tiles` + `pnpm verify:station-passengers` PASSED 확인 필수.
5. **benchmarks population 섹션 보호**: 인구 SSOT(jukiren+ipss)는 어떤 Phase에서도 덮어쓰기 금지.

---

## 11. 참조 문서

| 문서 | 내용 |
|------|------|
| `docs/MLIT_API_EXPANSION_ANALYSIS.md` | 레이어별 상세 분석·아이디어 |
| `docs/MLIT_DATA_REFRESH_SOP.md` | 기존 데이터 갱신 절차 |
| `docs/BLOG_EPISODE_VERIFICATION_PIPELINE.md` | 에피소드 게이트 파이프라인 |
| `docs/verification/tokyo-ward-series-benchmarks.json` | 현재 SSOT |
| `scripts/mlit-collector.mjs` | 기존 수집 함수 레퍼런스 |
| `scripts/verify-station-passengers.mjs` | 보호 대상 gate 예시 |

---

*이 문서는 방향·계획 문서입니다. 코드 구현 세부사항은 Cursor가 각 Phase 착수 시 별도 cursor-instructions 문서로 구체화.*  
*실제 구현은 AG가 시행. Claude는 Phase 완료 시 검증·평가 역할.*


## Amendment — Phase 2 Revision (2026-06-18, Joseph 승인)
### XKT003 보류 (23구)
- P2 XKT003 수집·집계는 **23구 범위에서 보류** (in-ward `city_code` 매칭 0건)
- Phase 4 / 수도권·외곽 확장 시 재검토 (狛江市·戸田市 등 인접 시에서 실데이터 확인됨)
- `location_optimization`은 benchmarks에 **deferred stub**만 등록 (아래 1-C 참고)
### Phase 2 실행 범위 (재정의)
| 블록 | 태스크 | 상태 |
|------|--------|------|
| XKT003 | P2-T01~T05 | **DEFERRED** (23구) |
| XST001 | P2-T06~T10 | **ACTIVE** |
| XGT001 | P2-T11~T14 | **ACTIVE** |
| sync/분석 | P2-T15~T20 | **ACTIVE** (범위 조정, 아래) |
### 4분면 매트릭스 (변경 없음 — SSOT 유지)
- `analyze-disaster-matrix.mjs`: **XKT025~029 × XST001** (상정 vs 실증)
- XGT001은 매트릭스 축 아님 → `evacuation_summary`로 병렬 제공
### benchmarks schema 1.7 (조정)
- full 수집: `disaster_history`, `evacuation_sites`
- stub: `location_optimization` → `coverage_status: "not_applicable_tokyo23"` + 1줄 note
- research-pack `policy_zone` → 짧은 정책 맥락 문단으로 대체 (23구 미고시 설명)
