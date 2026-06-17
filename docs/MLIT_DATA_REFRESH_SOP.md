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

## 한계 (고정 문구)

- XKT* / XPT002: 타일 ≠ 행정구 경계
- 임대·공실·소득: SUUMO + PKM 카드 별도
- Yield proxy: 세전 표면 수익률, 투자 판단 보조용
