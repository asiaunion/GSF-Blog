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

# 3) benchmarks v1.1 (price·station·land·population·disaster)
pnpm sync:mlit-benchmarks -- --episode ep07 --write

# 4) SUUMO B-layer (MLIT에 없음)
node scripts/fetch-suumo-snapshot.mjs sc_kita --commit

# 5) 투자 dossier
pnpm dossier:ward -- --episode ep07

# 6) 드리프트 확인 (선택)
pnpm verify:mlit-drift -- --episode ep07
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
