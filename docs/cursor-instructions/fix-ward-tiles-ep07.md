# Cursor 작업 지시 — WARD_TILES ep07 수정 · 재수집 · manifest 재생성

> 작성: Claude (2026-06-17)
> 우선순위: 🔴 ep07 집필 시작 전 필수
> 대상 파일: scripts/mlit-collector.mjs, scripts/scaffold-episode-manifest.mjs
> 관련 이슈: ep07 manifest의 STATION 3개·POP 3개 claim 데이터 오류

---

## 배경 — 검증에서 발견된 버그 2종

### Bug A: WARD_TILES 타일 좌표 부족 (station·disaster 과소 집계)

현재 mlit-collector.mjs의 WARD_TILES에서 ep07 3개 구가 단일 타일 또는 잘못된 타일로
지정되어 있어, 구 내 주요 역이 누락되거나 인접 구 역을 잘못 참조하고 있음.

| 구 | 현재 타일 | 문제 | 실제 현상 |
|---|---|---|---|
| 北区 | (14551,6446) 1개 | 赤羽·東十条 누락 | top_station=東十条(44,082명) — 최대역 赤羽 미포착 |
| 荒川区 | (14554,6447) 1개 | 足立区 타일 참조 | top_station=北千住(501,818명) — 荒川区가 아닌 足立区 역 |
| 足立区 | (14554,6445) 1개 | 北千住·西新井 누락 | top_station=竹ノ塚(65,257명) — 주요역 전부 누락 |

### Bug B: scaffold-episode-manifest.mjs — POP change_pct 값 오류

population_forecast.wards[ward].change_pct가 benchmarks에서 string 타입 ("3.2%")으로
저장되어 있는데, scaffold가 lookup 시점에 잘못된 값을 가져와 manifest에 기록.

| 구 | manifest (오류) | benchmarks (정답) | 방향 오류 |
|---|---|---|---|
| 北区 | "6.2%" | "3.2%" | — |
| 荒川区 | "6.4%" | "-0.8%" | 증가↔감소 반전 |
| 足立区 | "1.8%" | "-0.7%" | 증가↔감소 반전 |

---

## Task 1: scripts/mlit-collector.mjs — WARD_TILES 수정

WARD_TILES 객체에서 아래 3개 구를 다음 값으로 교체한다.

```js
// Before
"北区":   [{z:14, x:14551, y:6446}],
"荒川区": [{z:14, x:14554, y:6447}],
"足立区": [{z:14, x:14554, y:6445}],

// After
"北区": [
  {z:14, x:14550, y:6446},  // 赤羽
  {z:14, x:14551, y:6446},  // 王子・中心
  {z:14, x:14551, y:6447},  // 東十条
  {z:14, x:14552, y:6447},  // 上中里
],
"荒川区": [
  {z:14, x:14552, y:6448},  // 西日暮里
  {z:14, x:14553, y:6448},  // 日暮里・三河島・荒川中心
  {z:14, x:14553, y:6449},  // 日暮里南側
],
"足立区": [
  {z:14, x:14553, y:6446},  // 西新井
  {z:14, x:14554, y:6446},  // 中心・綾瀬
  {z:14, x:14554, y:6447},  // 北千住
  {z:14, x:14555, y:6445},  // 竹ノ塚
  {z:14, x:14555, y:6446},  // 東側
],
```

---

## Task 2: scripts/mlit-collector.mjs — collectPopulation() 커버리지 경고 추가

메시 수가 적을 때 인구 집계가 행정구 전체와 괴리될 수 있음을 명시한다.
collectPopulation() 반환값에 아래 필드를 추가한다.

```js
// 추가할 필드 (return 객체에 포함)
mesh_coverage_warning: allMesh.length < 100 ? true : false,
mesh_note: allMesh.length < 100
  ? `메시 수 ${allMesh.length}개 — 행정구 전체와 불일치 가능. change_pct 는 참고값.`
  : null,
```

sync-mlit-to-benchmarks.mjs의 population_forecast 병합 부분에도 반영한다.

```js
// 기존 코드에 mesh_coverage_warning 필드 추가
benchmarks.population_forecast.wards[ward] = {
  pop_2020: pop2020,
  pop_2040: pop2040 ?? null,
  change_pct: pop.change_rate_2020_2040,
  mesh_count: pop.mesh_count,
  mesh_coverage_warning: pop.mesh_coverage_warning ?? false,  // 추가
  episode: epLabel,
  fetched_at: pop.fetched_at,
};
```

---

## Task 3: scripts/scaffold-episode-manifest.mjs — POP change_pct 타입 수정

buildManifest() 내 POP claim 생성 부분을 수정한다.
change_pct가 "3.2%" 형식 string으로 저장되어 있으므로 float으로 변환 후 저장한다.

```js
// Before
const pop = benchmarks.population_forecast?.wards?.[ward];
if (pop?.change_pct != null) {
  claims.push({
    id: `POP-${wardId(ward, "2040", suumoCodes)}`,
    label: `${ward} 인구 2020→2040 변화율`,
    value: pop.change_pct,   // 버그: string "3.2%" 그대로
    unit: "%",
    ...
  });
}

// After
const pop = benchmarks.population_forecast?.wards?.[ward];
if (pop?.change_pct != null) {
  const popChangeNum = parseFloat(String(pop.change_pct).replace("%", ""));
  claims.push({
    id: `POP-${wardId(ward, "2040", suumoCodes)}`,
    label: `${ward} 인구 2020→2040 변화율`,
    value: isNaN(popChangeNum) ? pop.change_pct : popChangeNum,  // float
    unit: "%",
    mesh_coverage_warning: pop.mesh_coverage_warning ?? false,   // 추가
    ...
  });
}
```

---

## Task 4: 재수집 → benchmarks 갱신 → manifest 재생성

Tasks 1~3 코드 수정 완료 후 아래 순서로 실행한다.
price·landprice·mlit_mansion_timeseries 는 재수집하지 않는다 (이미 검증 완료).

```bash
# Step 1: ep07 station·population·disaster 캐시 삭제 후 재수집
node scripts/mlit-collector.mjs --type station    --episode ep07 --no-cache
node scripts/mlit-collector.mjs --type population --episode ep07 --no-cache
node scripts/mlit-collector.mjs --type disaster   --episode ep07 --no-cache

# Step 2: benchmarks.json 갱신
node scripts/sync-mlit-to-benchmarks.mjs --episode ep07 --write

# Step 3: ep07 manifest 재생성 (기존 파일 덮어쓰기)
node scripts/scaffold-episode-manifest.mjs \
  --slug tokyo-kita-arakawa-adachi \
  --episode Ep.07 \
  --write

# Step 4: research pack 재생성
node scripts/render-episode-research-pack.mjs \
  --episode ep07 \
  --write
```

---

## Task 5: 결과 검증

모든 Task 완료 후 아래 스크립트를 실행하여 통과 여부를 확인한다.

```js
// node -e "..." 로 실행
import b from './docs/verification/tokyo-ward-series-benchmarks.json' assert { type: 'json' };
import m from './docs/verification/manifests/ep07-tokyo-kita-arakawa-adachi.manifest.json' assert { type: 'json' };

const wards = ['北区', '荒川区', '足立区'];
let pass = true;

// Check 1: station_count >= 5 (타일 확장 효과)
for (const w of wards) {
  const sc = b.station_passengers?.wards?.[w]?.station_count;
  if (sc < 5) { console.error('FAIL station_count', w, sc); pass = false; }
}

// Check 2: 北区 top_station이 赤羽 또는 王子
const kitaTop = b.station_passengers?.wards?.['北区']?.top_station;
if (!['赤羽', '王子'].includes(kitaTop)) {
  console.error('FAIL 北区 top_station:', kitaTop); pass = false;
}

// Check 3: 荒川区 top_station이 北千住가 아님
const araTop = b.station_passengers?.wards?.['荒川区']?.top_station;
if (araTop === '北千住') {
  console.error('FAIL 荒川区 top_station still 北千住'); pass = false;
}

// Check 4: manifest POP values가 benchmarks와 일치 (오차 ±0.05)
for (const w of wards) {
  const benchPop = parseFloat(String(b.population_forecast?.wards?.[w]?.change_pct).replace('%', ''));
  const claim = m.claims.find(c => c.id.startsWith('POP-') && c.label.startsWith(w));
  const mVal = parseFloat(claim?.value);
  if (Math.abs(mVal - benchPop) > 0.05) {
    console.error('FAIL POP mismatch', w, mVal, '!=', benchPop); pass = false;
  }
}

// Check 5: manifest STATION values가 benchmarks와 일치
for (const w of wards) {
  const benchSt = b.station_passengers?.wards?.[w]?.top_passengers;
  const claim = m.claims.find(c => c.id.startsWith('STATION-') && c.label.startsWith(w));
  if (claim?.value !== benchSt) {
    console.error('FAIL STATION mismatch', w, claim?.value, '!=', benchSt); pass = false;
  }
}

if (pass) console.log('ALL CHECKS PASSED');
```

기대 통과 기준:
- station_count 각 구 >= 5
- 北区 top_station: 赤羽 또는 王子
- 荒川区 top_station: 北千住가 아닌 구내 역 (日暮里·西日暮里 등)
- manifest POP values 오차 ±0.05 이내
- manifest STATION values 완전 일치

---

## 완료 후 보고 사항 (Claude에게 보고)

1. 수정된 WARD_TILES 값 (3구)
2. 재수집 후 station 결과: { ward, top_station, top_passengers, station_count }
3. 재수집 후 population 결과: { ward, pop_2020, pop_2040, change_pct, mesh_count }
4. 검증 스크립트 통과 여부
5. _handoff.md 기록 완료 여부

---

## 금지 사항 (HARD RULES)

- mlit_mansion_2025_q1_q4, mlit_mansion_timeseries, mlit_trade_price_timeseries,
  land_price_timeseries, suumo_rent_new_build_station_5min 섹션 재수집 금지
- price·landprice 타입 --no-cache 실행 금지
- benchmarks.json 수동 편집 금지 — 반드시 스크립트 경유
- 이 지시에 없는 다른 에피소드 데이터 변경 금지
