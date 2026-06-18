# Region Expansion (RE) — 공식 마감·백로그 SSOT

> **마감일**: 2026-06-18  
> **승인**: Joseph  
> **검증**: Cursor  
> **실행**: AG (Antigravity)

이 문서는 RE 트랙의 **단일 마감·백로그 기록**입니다.  
새 세션(AG·Cursor·Joseph)은 **이 파일 + [`REGION_EXPANSION_AG_RUNBOOK.md`](./REGION_EXPANSION_AG_RUNBOOK.md)** 를 먼저 읽습니다.

---

## 1. RE 트랙 — 공식 마감 ✅

| 슬라이스 | 상태 | 핵심 산출 |
|----------|------|-----------|
| RE-1 | ✅ | `municipalities.json`, `municipality-registry.mjs` |
| RE-2 | ✅ | boundary·polygon·N02 pilot·collector 일반화 |
| RE-3 | ✅ | `greater-tokyo-pilot-benchmarks.json`, sync `--region pilot` |
| RE-4 | ✅ | pilot 4곳 E2E, `verify:region-pilot` |
| RE-5 | ✅ | Playbook §9, FIELD_MAP |
| RE-6 Wave 1 | ✅ | 다마 26시 registry·boundary |
| RE-6 Wave 2 | ✅ | 우선 8시 `tokyo-tama-benchmarks.json`, N02 tama |
| RE-6 W2-N1 | ✅ | 西東京 `13228` 정합 |

**아키텍처 목표 달성**: registry 등록 → collector → sync → verify 파이프라인 전국 확장 가능.

---

## 2. 데이터 SSOT 현황 (마감 시점)

| 파일 | 범위 | 비고 |
|------|------|------|
| `tokyo-ward-series-benchmarks.json` | 23구 Ep.01~09 | **RE에서 미수정** |
| `greater-tokyo-pilot-benchmarks.json` | pilot 4곳 | 狛江·神奈川 검증용 |
| `tokyo-tama-benchmarks.json` | 우선 8시 | `schema_version: 1.0-tama` |
| `municipalities.json` | 23구 + pilot + 다마 26시 | `regions.tokyo_tama` 26 codes |

### 우선 8시 (benchmarks **있음**)

`regions.tokyo_tama_priority`: 武蔵野·三鷹·調布·府中·立川·町田·八王子·西東京

### 나머지 18시 (registry **만** — benchmarks **없음**)

青梅·昭島·小金井·小平·日野·東村山·国分寺·国立·福生·狛江(pilot 별도)·東大和·清瀬·東久留米·武蔵村山·多摩·稲城·羽村·あきる野

---

## 3. 알려진 데이터 갭 (reprobe·문서화 완료)

| 시 | 이슈 | 상태 | 정본 |
|----|------|------|------|
| **八王子市** | XST001 `disaster_history` API 타일 44개 전수 → features=0 | ✅ reprobe 완료 · API 공백 확정 | `docs/verification/data/xst001-hachioji-reprobe-20260618.json` |
| 武蔵野·三鷹 | tile audit `station_count<5` | 예상 (소면적) | bbox/`tile_overrides` 필요 시만 |
| pilot 狛江 | `location_optimization.wards` sync 미매핑 | 후속 (블로킹 아님) | RE-5 deferred |

**八王子 블로그 집필 시**: `disaster_risk`는 사용 가능. `disaster_history`는 MLIT XST001 한계 — 별도 출처 보완 또는 본문에 한계 명시.

---

## 4. 이연·백로그 (RE 트랙 밖 — 순차 진행)

우선순위는 Joseph 승인 후 조정. **일괄 26시 수집 금지** — 에피소드·수요 기반 점진 수집.

| ID | 트랙 | 내용 | 착수 조건 |
|----|------|------|-----------|
| **BL-1** | 데이터 | 다마 **나머지 18시** benchmarks sync | 해당 시 에피소드 기획 확정 시 |
| **BL-2** | 데이터 | 町村(`13303`~`13308`) registry | Tama 시리즈 2차 확장 시 |
| **BL-3** | 데이터 | pilot `location_optimization` sync 매핑 | 필요 시 |
| **BL-4** | MLIT | Phase 4 생활 인프라 XKT004–011 | **이연** (별도 기획) |
| **BL-5** | 콘텐츠 | **Wave 3** — Tama 에피소드·manifest | **다음 활성 트랙** → Runbook §RE-7 |

### BL-1 점진 수집 명령 (템플릿)

```bash
node scripts/sync-mlit-to-benchmarks.mjs \
  --region tokyo_tama \
  --municipality <시이름> \
  --types disaster,disaster-history,evacuation,urban-planning,zoning,price,price-point,appraisal,station,population \
  --write
# → tokyo-tama-benchmarks.json 에만 write. 23구 diff empty 확인.
```

---

## 5. 다음 활성 트랙 — Wave 3 (콘텐츠)

→ [`REGION_EXPANSION_AG_RUNBOOK.md` §RE-7](./REGION_EXPANSION_AG_RUNBOOK.md#11-re-7--wave-3-콘텐츠-트랙)

| 역할 | 담당 |
|------|------|
| KO/EN/JA 초안·에셋 | AG |
| `pnpm validate:post <slug>` | Cursor |
| git commit / deploy | Joseph (명시 요청 시) |

**권장 첫 에피소드**: 武蔵野市 + 三鷹市 (데이터·블로그 ROI 최대)

---

## 6. 회귀 게이트 (RE 마감 후에도 유지)

```bash
pnpm verify:disaster-complete          # 23구
pnpm verify:urban-planning-complete
pnpm verify:ep07-tiles
pnpm verify:region-pilot               # pilot
pnpm verify:tokyo-tama                 # registry 26시
pnpm verify:tokyo-tama-benchmarks      # 우선 8시
```

---

## 7. 관련 문서 인덱스

| 문서 | 용도 |
|------|------|
| [`REGION_EXPANSION_PLAN.md`](./REGION_EXPANSION_PLAN.md) | RE 스펙·완료 기준 (아카이브) |
| [`REGION_EXPANSION_AG_RUNBOOK.md`](./REGION_EXPANSION_AG_RUNBOOK.md) | AG 실행·Wave 3 |
| [`MLIT_API_FIELD_MAP.md`](./verification/MLIT_API_FIELD_MAP.md) | API 필드·필터 |
| [`municipalities.json`](./verification/municipalities.json) | 지역 registry SSOT |
| [`tokyo-tama-cities.mjs`](../scripts/lib/tokyo-tama-cities.mjs) | 다마 26시·우선 8시 코드 |

---

*Joseph RE 공식 마감: 2026-06-18*  
*AG/Cursor: RE 신규 슬라이스 착수 전 Joseph 확인 — 기본 후속은 BL-* 또는 §RE-7*
