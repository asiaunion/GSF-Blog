# MLIT 데이터 분기 갱신 SOP

> **Scope**: Where to Live in Tokyo + 투자 dossier  
> **SSOT**: PKM `tokyo_mansion_stats_2025.json` → GSF-Ark `docs/verification/data/` mirror

## 분기마다 (또는 Ep. 신규 직전)

```bash
cd projects/GSF-Ark

# 1) 성약가 → PKM JSON
pnpm merge:mlit-pkm -- --episode ep07 --no-cache
# 또는 단일 구: pnpm merge:mlit-pkm -- --ward 北区 --no-cache

# 2) Ark CI mirror
pnpm sync:mlit-ark

# 3) benchmarks v1.2 (price·station·land·population·disaster·district·timeseries)
pnpm sync:mlit-benchmarks -- --episode ep07 --write

# 3b) 가격 시계열
pnpm mlit:price-series -- --episode ep07 --from 2015 --to 2025 --write      # 成約価格 primary
pnpm mlit:trade-series -- --all-wards --from 2005 --to 2025 --write         # 取引価格 auxiliary
pnpm mlit:land-series -- --all-wards --from 2005 --to 2026 --write          # 地価 auxiliary

# 3c) 에피소드 리서치 팩 (블로그 작가용)
pnpm analyze:episode -- --episode ep07 --write

# 4) SUUMO B-layer (MLIT에 없음)
node scripts/fetch-suumo-snapshot.mjs sc_kita --commit
pnpm sync:suumo-benchmarks -- --episode ep07 --fetch-missing --write
# 23구 전체: pnpm sync:suumo-benchmarks -- --all --fetch-missing --write

# 5) 투자 dossier
pnpm dossier:ward -- --episode ep07

# 6) 드리프트 확인 (선택)
pnpm verify:mlit-drift -- --episode ep07
pnpm screen:wards
pnpm verify:og-social -- --slug <slug>
```

## Joseph 승인 체크리스트

- [ ] `est_70sqm` 전년 대비 급변 구 — 원인(거래 건수·분기) 확인
- [ ] `station_passengers` — 타일 샘플 각주 유지
- [ ] Registry `Tokyo-Wards-Source-Registry.md` 스냅샷 날짜 갱신

## API 키

- 로컬: `.env`의 `MLIT_API_KEY` (`.env.example` 참고)
- CI drift: GitHub `secrets.MLIT_API_KEY`

## WARD_TILES 확장 (station·disaster·population·地価 타일)

타일 기반 수집은 `scripts/lib/ward-tiles.mjs`의 **WARD_BOUNDS**(위경도 bbox)에서 z=14 XYZ를 자동 생성합니다.

```bash
# 1) bbox 수정 — scripts/lib/ward-tiles.mjs WARD_BOUNDS / WARD_TILE_OVERRIDES
# 2) 커버리지·역 집계 감사
pnpm audit:ward-tiles -- --ward 練馬区
pnpm audit:ward-tiles -- --episode ep08

# 3) benchmarks 반영
pnpm sync:mlit-benchmarks -- --ward 練馬区 --write

# 4) 인접 구 역 오분류 시 mlit-collector.mjs STATION_ADMIN_WARD 추가 후 재동기화
```

대형 구(大田·世田谷·練馬·江東·板橋 등)는 bbox 기준 **12~24타일**이 정상. 역 수 5 미만이면 bbox 확장을 검토합니다.

## 한계 (고정 문구)

- XKT* / XPT002: 타일 ≠ 행정구 경계
- 임대·공실·소득: SUUMO + PKM 카드 별도
- Yield proxy: 세전 표면 수익률, 투자 판단 보조용
