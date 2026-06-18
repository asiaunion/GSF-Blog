# Blog episode verification pipeline

도쿄 23구 시리즈(Ep.01~Ep.23) 및 YMYL 숫자 중심 포스트용 **3계층 검증 파이프라인**.

## Quick start

```bash
# 1. AG: manifest 작성 (템플릿 복사)
cp docs/verification/manifest.template.json docs/verification/manifests/<slug>.manifest.json

# 2. Joseph: manifest 승인 → gates.manifest_approved_by 설정

# 3. AG: KO 초안 (manifest claims만 사용)

# 4. SUUMO B-layer 스냅샷 (필요 시)
node scripts/fetch-suumo-snapshot.mjs sc_taito

# 5. 자동 검증
pnpm verify:episode --slug <slug>

# 6. Cursor 감사 (필수) → gates.cursor_audit_passed = true

# 7. 배포 전
pnpm verify:episode --slug <slug> --require-gates
pnpm validate:post <slug>
```

## Files

| File | Role |
|------|------|
| [`tokyo-ward-series-benchmarks.json`](./tokyo-ward-series-benchmarks.json) | Ep.01~06 확정 비교 수치 SSOT |
| [`manifest.template.json`](./manifest.template.json) | AG manifest 템플릿 |
| [`manifests/*.manifest.json`](./manifests/) | 에피소드별 claim ledger |
| [`../BLOG_EPISODE_VERIFICATION_PIPELINE.md`](../BLOG_EPISODE_VERIFICATION_PIPELINE.md) | 전체 Phase 1~3 문서 |

## Data Sources & Mapping (Schema 1.4)
- **population 소스**: 기존 XKT013 메시 방식에서 **住民基本台帳+社人研(IPSS R5)** 공식 구별 데이터로 교체 (`source: "jukiren+ipss"`).
- **station 소스**: 타일 API 사후 필터링에서 **国土数値情報 鉄道データ(N02)** 역 마스터 조회 후 XKT015 조인 방식으로 교체.
- **타일 필터**: 단순 bbox 외접 사각형 방식에서 **bbox + GeoJSON 행정경계 폴리곤(turf)** 정밀 필터링으로 개선하여 경계 타일 오분류 제거.

## 3 layers

| Layer | Source | Verification |
|-------|--------|--------------|
| **A** | MLIT JSON, benchmarks.json, PKM verified | `verify-episode-manifest.mjs` auto |
| **B** | SUUMO HTML | `fetch-suumo-snapshot.mjs` + snippet match |
| **C** | Transit, PR, PDF | `[2차 출처]` or user capture — primary 금지 |

## Gates

```
Step 3-E: manifest + C-tier capture list → Joseph 승인
Step 4:   KO draft (manifest 승인 후만)
Step 5:   Cursor audit → cursor_audit_passed
Step 6:   verify:episode --require-gates + validate:post
```

**AG는 `tier: primary`를 evidence 없이 부여할 수 없습니다.**
