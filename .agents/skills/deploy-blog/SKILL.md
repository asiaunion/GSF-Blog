---
name: deploy-blog
description: GSFArk.com 블로그 포스트 작성·배포 파이프라인 (Where to Live in Tokyo 시리즈 포함). Manifest 검증 게이트 필수.
---

# deploy-blog (GSF-Ark)

> **Repo**: `/Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark`  
> **Site**: https://gsfark.com  
> **PKM**: `/Users/gsf/.gemini/antigravity/scratch/projects/GSF-PKM`

## HARD-GATE (Ep.07+)

1. **KO 초안 작성 전** → `docs/verification/manifests/<slug>.manifest.json` 작성 + Joseph 승인 (`gates.manifest_approved_by`)
2. **C-tier 캡처** → `c_tier_capture_requests` 해결 또는 Joseph 면제
3. **초안 후** → Cursor 감사 (`gates.cursor_audit_passed`)
4. **배포 전** → `pnpm verify:episode:gate --slug <slug>` exit 0 + `pnpm validate:post <slug>` exit 0

⛔ **금지**: manifest 없이 숫자 포함 KO 초안 작성  
⛔ **금지**: evidence 없이 `tier: primary` 부여  
⛔ **금지**: "[1차 확인] ✅" 자기 보고만으로 검증 완료 선언

---

## Step 0 — Boot

```
Blog_Source_Verification_Rule: 로드 (GSF-OS/Wiki)
Tokyo-Wards-Source-Registry: ✅ 레지스트리 로드됨 [TWR-v1.5]
tokyo-ward-series-benchmarks.json: 로드
```

---

## Step 1–2 — Topic & Q&A

기존과 동일 (독자·톤·슬러그 확정).

**슬러그 테이블 (Ep.01~06)**:

| Ep | slug | 구 |
|----|------|-----|
| 01 | tokyo-chiyoda-chuo-minato | 千代田·中央·港 |
| 02 | tokyo-shinjuku-shibuya-bunkyo | 新宿·渋谷·文京 |
| 03 | tokyo-meguro-setagaya | 目黒·世田谷 |
| 04 | tokyo-shinagawa-ota | 品川·大田 |
| 05 | tokyo-toshima-nakano-suginami | 豊島·中野·杉並 |
| 06 | tokyo-taito-sumida-koto | 台東·墨田·江東 |

---

## Step 3 — Research (서브에이전트)

**역할 분리**: Research subagent는 **claim 후보만** 반환. tier 부여 금지.

출력 형식:
```json
{ "claim_candidates": [{ "label": "...", "value": null, "source_hint": "..." }] }
```

---

## Step 3-E — Verification manifest (NEW — 초안 전 필수)

1. 템플릿 복사:
   ```bash
   cp docs/verification/manifest.template.json docs/verification/manifests/epXX-<slug>.manifest.json
   ```

2. **A-layer** (자동 검증 가능):
   - MLIT 70㎡ → `method: json_lookup`, `evidence.json_path`
   - 에피소드 간 비교 → `method: benchmark_lookup`, `evidence.benchmark`
   - PKM verified card → `method: pkm_verified_card`

3. **B-layer** (SUUMO):
   ```bash
   node scripts/fetch-suumo-snapshot.mjs sc_taito
   ```
   manifest에 `snapshot` + `snippet` 기록

4. **C-layer** (전철·PR·봇차단):
   - `tier: secondary` 또는 `method: user_capture`
   - Joseph 캡처/PDF 필요 시 `c_tier_capture_requests` 등록

5. **Joseph 승인 대기** → `gates.manifest_approved_by`, `manifest_approved_at` 설정

6. 검증 실행 (승인 전 self-check):
   ```bash
   pnpm verify:episode --slug <slug>
   ```

**manifest 승인 없이 Step 4 진입 금지.**

---

## Step 4 — KO draft

- manifest `claims`에 있는 수치만 사용
- `tier: secondary` → 본문에 `[2차 출처]` 표기
- `gates.draft_started: true` 설정

---

## Step 5 — Cursor audit (필수)

Joseph 또는 AG가 Cursor에:
> slug `<slug>` — KO 반영됨. manifest + 팩트 감사 부탁

Cursor:
1. `pnpm verify:episode --slug <slug> --require-gates` (gates 설정 후)
2. 본문 vs manifest 대조
3. `gates.cursor_audit_passed: true`

---

## Step 6 — EN/JA + validate + deploy

```bash
pnpm verify:episode:gate --slug <slug>
pnpm validate:post <slug>
```

Joseph: git commit + deploy

---

## Related

- [`docs/BLOG_EPISODE_VERIFICATION_PIPELINE.md`](../../docs/BLOG_EPISODE_VERIFICATION_PIPELINE.md)
- [`docs/verification/README.md`](../../docs/verification/README.md)
- [`docs/BLOG_AG_CURSOR_WORKFLOW.md`](../../docs/BLOG_AG_CURSOR_WORKFLOW.md)
