# Region Expansion — AG Runbook

> **대상**: Antigravity (AG)  
> **검증**: Cursor (`RE-*-G01` gate) → Joseph 승인  
> **스펙 정본**: [`REGION_EXPANSION_PLAN.md`](./REGION_EXPANSION_PLAN.md) (완료 기준·스키마)  
> **이 문서**: 슬라이스별 **실행 순서·명령·핸드오프** — 매 세션 여기만 읽고 착수

---

## 0. 운영 방식 (Joseph · Cursor · AG)

```
Joseph  → "RE-N 착수"
Cursor  → "AG: docs/REGION_EXPANSION_AG_RUNBOOK.md §RE-N 참조"
AG      → §RE-N 구현 → §Handoff 템플릿으로 보고
Cursor  → REGION_EXPANSION_PLAN.md 게이트 검증
Joseph  → RE-N 승인 → 다음 슬라이스
```

**Cursor는 긴 프롬프트를 반복하지 않음.** 단계 ID + runbook § 링크만 전달.

---

## 1. 매 세션 공통 (모든 RE 슬라이스)

### 1.1 착수 전 읽기

1. [`docs/AG_GSFARK_MLIT_PIPELINE_PROMPT.md`](./AG_GSFARK_MLIT_PIPELINE_PROMPT.md)
2. [`docs/MLIT_DATA_REFRESH_SOP.md`](./MLIT_DATA_REFRESH_SOP.md)
3. [`REGION_EXPANSION_PLAN.md`](./REGION_EXPANSION_PLAN.md) — 해당 RE 섹션 (완료 기준)
4. **이 runbook** — 해당 §RE-N
5. [`MLIT_API_EXPANSION_AG_IMPLEMENTATION_PLAN.md`](./MLIT_API_EXPANSION_AG_IMPLEMENTATION_PLAN.md) — Phase 2/3 필터 가드레일

### 1.2 전역 금지

- `docs/verification/tokyo-ward-series-benchmarks.json` 수정 (RE-3 pilot 파일 사용)
- `population_forecast` jukiren+ipss 덮어쓰기
- 포스트 md 하단 면책 삽입
- benchmarks 숫자 창작
- **앞선 RE 미완료 시 다음 RE 착수** (예: RE-2 전 RE-3 금지)
- Phase 4 (생활 인프라) 착수

### 1.3 환경

```bash
cd projects/GSF-Ark   # 또는 repo 루트
# MLIT_API_KEY in .env
```

### 1.4 23구 회귀 (모든 RE 슬라이스 완료 시 최소 실행)

```bash
pnpm verify:disaster-complete
pnpm verify:urban-planning-complete
pnpm verify:ep07-tiles
```

---

## 2. Handoff 템플릿 (AG → Cursor)

슬라이스 완료 시 아래 형식으로 보고. Joseph가 Cursor에 전달.

```markdown
## RE-N 핸드오프

### 완료 슬라이스
- [ ] RE-N-T01 … (체크한 항목만)

### 변경 파일
- (신규 / 수정 목록)

### 자체 실행 게이트
(명령 + stdout 요약)

### 파일럿/회귀 spot check
(해당 시 표·JSON 요약)

### 미완·블로커
(없으면 "없음")

### Cursor 검증 요청
RE-N-G01
```

---

## 3. §RE-1 — Registry SSOT ✅ 완료

**상태**: RE-1-G01 PASS (2026-06-18). **재작업 불필요.**

| 산출물 | 경로 |
|--------|------|
| Registry | `docs/verification/municipalities.json` |
| API | `scripts/lib/municipality-registry.mjs` |
| Bootstrap | `scripts/bootstrap-municipalities.mjs` |
| 리팩터 | `scripts/lib/ward-tiles.mjs`, `scripts/mlit-collector.mjs` |

**다음**: §RE-2

---

## 4. §RE-2 — Boundary·타일·역 인프라 🎯 현재 착수

**목표**: 파일럿 4구에 행정경계·bbox·N02 역 연결. 23구 회귀 유지.

**파일럿**: 横浜市西区 `14103` · 川崎市中原区 `14133` · 鎌倉市 `14204` · 狛江市 `13219`

**스펙**: [`REGION_EXPANSION_PLAN.md` §5](./REGION_EXPANSION_PLAN.md#5-re-2--boundary타일역-인프라)

### 4.1 실행 순서

| 순서 | ID | 작업 | 산출 |
|------|-----|------|------|
| 1 | RE-2-T01 | Boundary GeoJSON | `docs/verification/data/kanagawa-pilot-boundary.geojson` (+ 狛江) |
| 2 | RE-2-T02 | `municipality-polygon.mjs` | `scripts/lib/municipality-polygon.mjs` |
| 3 | RE-2-T03 | `ward-polygon.mjs` alias | 하위 호환 |
| 4 | RE-2-T04 | registry `boundary_file` / `boundary_property` 정합 | `municipalities.json` |
| 5 | RE-2-T05 | 파일럿 4구 bbox 확정 | `municipalities.json` |
| 6 | RE-2-T06 | `audit-ward-tiles.mjs --municipality` | CLI 일반화 |
| 7 | RE-2-T07 | `tile_overrides` (필요 시) | registry |
| 8 | RE-2-T08 | N02 subset 스크립트 | `prepare-n02-region.mjs`, `n02-stations-kanagawa-komae.geojson` |
| 9 | RE-2-T09 | `station-master.mjs` 일반화 | pilot 역 조회 |
| 10 | RE-2-T10 | 23구 N02 회귀 | — |
| 11 | **RE-2-T11** | Collector city code 일반화 | `mlit-collector.mjs` |

> **RE-2-T11**: PLAN 보강 항목. `WARD_CODE`(tokyo23만) · `targetPrefCity="東京都"+ward` 제거 → `getMunicipality()` 기반.

### 4.2 RE-2-T01 — Boundary

- **참고**: `scripts/prepare-n02-tokyo.mjs` (N03 필터 패턴)
- **소스**: 国土数値情報 N03
  - 東京23: `docs/verification/data/N03-2024/N03-20240101_13.geojson` (기존)
  - 神奈川: `N03-20240101_14.geojson` — 없으면 스크립트로 취득 후 필터
- **필터**: city_code `14103`, `14133`, `14204` + 狛江 `13219`
- **狛江**: `tokyo-wards-boundary.geojson`에 없음 → 별도 feature 또는 통합 파일

### 4.3 RE-2-T02~T03 — Polygon lib

```javascript
// municipality-polygon.mjs — registry에서 boundary_file 로드
isPointInMunicipality(lat, lon, name_ja)
getMunicipalityPolygons(name_ja)

// ward-polygon.mjs — 위임만
isPointInWard(...) → isPointInMunicipality(...)
```

### 4.4 RE-2-T05~T06 — Bbox·audit

bbox는 boundary envelope 또는 수동 확정 후:

```bash
node scripts/audit-ward-tiles.mjs --municipality 横浜市西区
node scripts/audit-ward-tiles.mjs --municipality 川崎市中原区
node scripts/audit-ward-tiles.mjs --municipality 鎌倉市
node scripts/audit-ward-tiles.mjs --municipality 狛江市
```

**완료**: 4구 모두 `tile_count > 0`

### 4.5 RE-2-T08~T10 — N02

- `prepare-n02-region.mjs`: N02 Station + boundary point-in-poly → `ward_code` 부여
- `station-master.mjs`: code `14103` → `getStationsByWard("14103")` ≥ 1역
- 23구: `n02-stations-tokyo.geojson` 경로·결과 동일 유지

### 4.6 RE-2-T11 — Collector

- `getMunicipality({ name_ja })` 로 `city_code`, `prefecture_ja` resolve (pilot 포함)
- `collectDisasterHistory` 등: `targetPrefCity` → `${prefecture_ja}${name_ja}`

```bash
node scripts/mlit-collector.mjs --municipality 狛江市 --type disaster --json
# 기대: Boundary not found 없음, JSON 반환
```

### 4.7 RE-2 자체 게이트 (AG 핸드오프 전)

```bash
pnpm verify:ep07-tiles
pnpm verify:station-passengers
pnpm verify:disaster-complete
pnpm verify:urban-planning-complete
node scripts/audit-ward-tiles.mjs --municipality 横浜市西区
node scripts/audit-ward-tiles.mjs --municipality 狛江市
node scripts/mlit-collector.mjs --municipality 狛江市 --type disaster --json
```

**Cursor 게이트**: `RE-2-G01` — [`PLAN §5.4`](./REGION_EXPANSION_PLAN.md#54-re-2-회귀-게이트-cursor)

---

## 5. §RE-3 — Pilot Benchmarks·Sync

**착수 조건**: RE-2-G01 PASS

**스펙**: [`REGION_EXPANSION_PLAN.md` §6](./REGION_EXPANSION_PLAN.md#6-re-3--pilot-benchmarkssync)

### 5.1 실행 순서

| ID | 작업 |
|----|------|
| RE-3-T01~T02 | `greater-tokyo-pilot-benchmarks.json` 스캐폴드 (`schema_version: "1.0-pilot"`) |
| RE-3-T03 | 23구 benchmarks **미수정** 확인 |
| RE-3-T04~T06 | `sync-mlit-to-benchmarks.mjs` — `--region pilot`, `--benchmarks-path` |
| RE-3-T07 | fetch 4종 `--region pilot` |
| RE-3-T08 | analyze 4종 `--benchmarks-path` |
| RE-3-T09 | research-pack pilot (optional, RE-4 후) |

### 5.2 핵심 명령

```bash
node scripts/sync-mlit-to-benchmarks.mjs --region pilot --municipality 狛江市 --types disaster --write
# pilot JSON에만 write 되는지 확인
git diff docs/verification/tokyo-ward-series-benchmarks.json  # empty
```

### 5.3 RE-3 자체 게이트

```bash
pnpm verify:disaster-complete
pnpm verify:urban-planning-complete
```

**Cursor 게이트**: `RE-3-G01` — [`PLAN §6.4`](./REGION_EXPANSION_PLAN.md#64-re-3-회귀-게이트-cursor)

### 5.4 RE-3.5 — 패치 (RE-4 `--write` 전 필수)

Cursor RE-3 검증에서 발견. RE-4 착수 **전** AG가 먼저 수정.

| ID | 버그 | 수정 |
|----|------|------|
| **RE-3-T04b** | `sync-mlit-to-benchmarks.mjs` `--write`가 항상 `tokyo-ward-series-benchmarks.json`에 씀 | `writeFile(finalBenchmarksPath, …)` + stdout `path`도 동일 |
| **RE-3-T04c** | pilot sync 시 `schema_version`을 `1.9`로 덮어씀 | `region===pilot` → `1.0-pilot` 유지 |
| **RE-3-T07b** | `fetch-price-points.mjs` `args is not defined` | `const args = process.argv.slice(2)` 추가 |

검증:
```bash
node scripts/fetch-price-points.mjs --municipality 狛江市   # ReferenceError 없음
node scripts/sync-mlit-to-benchmarks.mjs --region pilot --municipality 狛江市 --types disaster --write
git diff docs/verification/tokyo-ward-series-benchmarks.json   # empty
git diff docs/verification/greater-tokyo-pilot-benchmarks.json # 狛江 disaster 있음
```

---

## 6. §RE-4 — 파일럿 E2E 수집·검증

**착수 조건**: RE-3-G01 PASS

**스펙**: [`REGION_EXPANSION_PLAN.md` §7](./REGION_EXPANSION_PLAN.md#7-re-4--파일럿-e2e-수집검증)

### 6.1 수집 순서 (4구)

1. disaster + disaster-history + evacuation  
2. urban-planning + zoning  
3. price + price-point + appraisal  
4. station (RE-2 완료 시)  
5. XKT003 狛江 reprobe  
6. `analyze-disaster-matrix --benchmarks-path .../greater-tokyo-pilot-benchmarks.json`

### 6.2 Verify 신규

| ID | 산출 |
|----|------|
| RE-4-T08 | `scripts/verify-region-pilot.mjs` |
| RE-4-T09 | `package.json` → `verify:region-pilot` |

### 6.3 RE-4 자체 게이트

```bash
pnpm verify:region-pilot
pnpm verify:disaster-complete
pnpm verify:urban-planning-complete
pnpm verify:ep07-tiles
```

**Cursor 게이트**: `RE-4-G01`

**핸드오프 필수**: 4구×섹션 커버리지 표 · `tile_coverage_warning` 목록 · XKT003 狛江 결과

---

## 7. §RE-5 — Playbook·문서 마감

**착수 조건**: RE-4-G01 PASS

| ID | 작업 |
|----|------|
| RE-5-T01 | [`REGION_EXPANSION_PLAN.md` §9](./REGION_EXPANSION_PLAN.md#9-신규-municipality-추가-playbook) 검증 |
| RE-5-T02 | `MLIT_API_FIELD_MAP.md` pilot 필터 노트 |
| RE-5-T03 | `WEEKLY_STATUS.md` RE 완료 1줄 |

---

## 8. §RE-6 — 多摩26市 Registry (Wave 1)

**착수 조건**: RE-5 완료  
**범위**: registry·경계·bbox만. **benchmarks 수집은 Wave 2로 이연.**

**대상**: 東京都の市 26 (`13201`–`13228`, `13216`/`13217` 공백). 狛江(`13219`)는 `region_tier: pilot` 유지 + `regions.tokyo_tama` 포함.

### 8.1 실행 순서

| ID | 작업 | 산출 |
|----|------|------|
| RE-6-T01 | N03 추출 | `docs/verification/data/tokyo-tama-boundary.geojson` |
| RE-6-T02 | SSOT 목록 | `scripts/lib/tokyo-tama-cities.mjs` |
| RE-6-T03 | Registry 시드 | `node scripts/seed-tokyo-tama-registry.mjs` |
| RE-6-T04 | bbox 일괄 | `node scripts/update-tokyo-tama-bboxes.mjs` |
| RE-6-T05 | polygon spot check | `municipality-polygon.mjs` 3시 |
| RE-6-T06 | 타일 spot audit | `pnpm audit:ward-tiles --municipality 武蔵野市` 등 3곳 |

### 8.2 핵심 명령

```bash
node scripts/prepare-n03-tokyo-tama.mjs
node scripts/seed-tokyo-tama-registry.mjs
node scripts/update-tokyo-tama-bboxes.mjs   # 재생성 시
```

**N03 코드 주의**: N03 `N03_007`이 西東京市(13228) 등에서 구코드와 불일치 → boundary는 `name_ja` 추출 후 `registry_code`로 정규화.

### 8.3 RE-6 자체 게이트

```bash
pnpm verify:disaster-complete
pnpm verify:urban-planning-complete
pnpm verify:ep07-tiles
pnpm verify:region-pilot          # 狛江 pilot 회귀
pnpm verify:tokyo-tama            # RE-6 Wave 1 registry
node -e "import { listRegion } from './scripts/lib/municipality-registry.mjs'; console.log(listRegion('tokyo_tama').length)"
# → 26
```

**Wave 2 (별도 슬라이스)**: `tokyo-tama-benchmarks.json`, N02, 우선 8시 sync — Joseph 승인 후.

### 8.4 §RE-6 Wave 2 — N02·Benchmarks·우선 8시 E2E

**착수 조건**: RE-6 Wave 1 PASS (`pnpm verify:tokyo-tama`)  
**범위**: 우선 8시 full stack 수집. 나머지 18시는 registry만 유지(점진 수집).  
**금지**: `tokyo-ward-series-benchmarks.json` 수정 · 狛江 `greater-tokyo-pilot-benchmarks.json` 덮어쓰기

**우선 8시 SSOT** (`scripts/lib/tokyo-tama-cities.mjs` → `TOKYO_TAMA_WAVE2_PRIORITY`):

| 코드 | 시 | 비고 |
|------|-----|------|
| 13203 | 武蔵野市 | 吉祥寺 |
| 13204 | 三鷹市 | |
| 13208 | 調布市 | 23구 인접 |
| 13206 | 府中市 | |
| 13202 | 立川市 | |
| 13209 | 町田市 | |
| 13201 | 八王子市 | 다마 최대 |
| 13228 | 西東京市 | |

### 8.5 Wave 2 실행 순서

| ID | 작업 | 산출 |
|----|------|------|
| RE-6-W2-T01 | N02 subset (26시) | `prepare-n02-tokyo-tama.mjs` → `n02-stations-tokyo-tama.geojson` |
| RE-6-W2-T02 | `station-master.mjs` | tama N02 경로 로드 추가 |
| RE-6-W2-T03 | benchmarks 스캐폴드 | `docs/verification/tokyo-tama-benchmarks.json` (`schema_version: "1.0-tama"`) |
| RE-6-W2-T04 | registry region | `municipalities.json` → `regions.tokyo_tama_priority` (8 codes) |
| RE-6-W2-T05 | sync 라우팅 | `sync-mlit-to-benchmarks.mjs` — `--region tokyo_tama_priority` → tama benchmarks |
| RE-6-W2-T06 | tile audit 8시 | `audit-ward-tiles --municipality` — `station_count≥5` 또는 `tile_overrides` |
| RE-6-W2-T07 | 8시 수집 loop | disaster → urban → price → station (RE-4 pilot 순서 동일) |
| RE-6-W2-T08 | analyze | `analyze-disaster-matrix --benchmarks-path .../tokyo-tama-benchmarks.json` |
| RE-6-W2-T09 | verify | `verify-tokyo-tama-benchmarks.mjs` + `pnpm verify:tokyo-tama` |

### 8.6 Wave 2 핵심 명령

```bash
# N02 (RE-2-T08 패턴 복제)
node scripts/prepare-n02-tokyo-tama.mjs
# station-master가 n02-stations-tokyo-tama.geojson 로드하는지 확인

# Benchmarks 스캐폴드 후 1시 trial
node scripts/sync-mlit-to-benchmarks.mjs \
  --region tokyo_tama_priority \
  --municipality 武蔵野市 \
  --types disaster,disaster-history,evacuation \
  --write
git diff docs/verification/tokyo-ward-series-benchmarks.json   # empty 필수

# 8시 full loop (예시)
for m in 武蔵野市 三鷹市 調布市 府中市 立川市 町田市 八王子市 西東京市; do
  node scripts/sync-mlit-to-benchmarks.mjs --region tokyo_tama_priority --municipality "$m" \
    --types disaster,disaster-history,evacuation,urban-planning,zoning,price,price-point,appraisal,station,population --write
done

node scripts/analyze-disaster-matrix.mjs \
  --benchmarks-path docs/verification/tokyo-tama-benchmarks.json
```

**N02 참고**: `prepare-n02-region.mjs` (pilot) · `docs/verification/data/README.md` — N02 원본 + `tokyo-tama-boundary.geojson` point-in-poly → `ward_code` 부여.

**sync 스캐폴드**: `greater-tokyo-pilot-benchmarks.json` 구조 복제. `region: "tokyo_tama"`, `schema_version: "1.0-tama"` 유지 (`pilot`과 동일 — `1.9` 덮어쓰기 금지).

### 8.7 Wave 2 자체 게이트 (AG 핸드오프 전)

```bash
pnpm verify:tokyo-tama
pnpm verify:region-pilot              # 狛江 pilot 회귀
pnpm verify:disaster-complete         # 23구
pnpm verify:urban-planning-complete
pnpm verify:ep07-tiles
pnpm verify:tokyo-tama-benchmarks     # RE-6-W2-T09 (신규)
pnpm audit:ward-tiles --municipality 武蔵野市
pnpm audit:ward-tiles --municipality 八王子市
```

**완료 기준 (Wave 2)**:
- 8시 × `disaster_risk`, `disaster_history`, `evacuation_sites`, `urban_planning` 존재
- `analyze-disaster-matrix` 8/8 Risk×History 요약
- 23구·pilot 회귀 pass

**Cursor 게이트**: `RE-6-W2-G01`

**핸드오프 필수**: 8시×섹션 커버리지 표 · `tile_coverage_warning` 목록 · N02 역 수 spot check

---

## 9. 진행 상태 보드

| 슬라이스 | 상태 | 게이트 |
|----------|------|--------|
| RE-1 | ✅ 완료 | RE-1-G01 PASS |
| RE-2 | ✅ 완료 | RE-2-G01 PASS |
| RE-3 | ✅ 완료 | RE-3-G01 PASS (§RE-3.5 패치 포함) |
| RE-4 | ✅ 완료 | RE-4-G01 PASS |
| RE-5 | ✅ 완료 | RE-5 마감 (location_optimization sync → 후속) |
| RE-6 | ✅ Wave 1 | `verify:tokyo-tama` + 23구 회귀 PASS |
| RE-6 W2 | 🎯 착수 | N02 + `tokyo-tama-benchmarks` 우선 8시 |

*AG: 슬라이스 완료 시 이 표를 핸드오프에 갱신 요청 (Cursor가 commit 시 반영 가능).*

---

## 10. Joseph → AG 한 줄 지시 예시

| 상황 | Joseph/AG에 전달할 문장 |
|------|-------------------------|
| RE-2 시작 | `RE-2 착수. docs/REGION_EXPANSION_AG_RUNBOOK.md §RE-2` |
| RE-6 W2 시작 | `RE-6 Wave 2 착수. docs/REGION_EXPANSION_AG_RUNBOOK.md §8.4` |
| RE-2 검증 후 | `RE-3 착수. docs/REGION_EXPANSION_AG_RUNBOOK.md §RE-3` |
| 핸드오프 | `RE-N 핸드오프. Runbook §2 템플릿 + 게이트 로그 첨부` |

---

*AG: 이 runbook만으로 착수 가능. 세부 완료 기준은 PLAN 교차 확인.*  
*Cursor: RE-N 완료 시 PLAN 게이트만 실행·Joseph에 PASS/FAIL 보고.*
