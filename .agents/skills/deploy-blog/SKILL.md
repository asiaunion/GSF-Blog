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
4. **이미지 (Step 4.5)** → `{slug}-hero.webp` + `{slug}-hero-og.jpg` + `ogImage` `.jpg` + `pnpm verify:og-social --slug <slug> --no-live` exit 0  
   (면제만 허용: manifest `gates.hero_waived_by` — 구두 스킵 금지)
5. **배포 전** → `pnpm verify:og-social --slug <slug> --no-live` exit 0 + `pnpm verify:episode:gate --slug <slug>` exit 0 + `pnpm validate:post <slug>` exit 0
6. **배포 직후 (Tokyo 에피소드 · AG)** → Step 7 PKM Obsidian dossier — `pnpm dossier:ward` + 구별 카드 블로그 링크·체크리스트 (구두 생략 금지)

⛔ **금지**: manifest 없이 숫자 포함 KO 초안 작성  
⛔ **금지**: evidence 없이 `tier: primary` 부여  
⛔ **금지**: "[1차 확인] ✅" 자기 보고만으로 검증 완료 선언  
⛔ **금지**: hero 없이 EN/JA·배포 진행 (Step 4.5 미완료 또는 `hero_waived_by` 미기재)  
⛔ **금지**: Tokyo 에피소드 live 배포 후 Step 7(PKM dossier) 생략

---

## Step 0 — Boot

```
Blog_Source_Verification_Rule: 로드 (GSF-OS/Wiki)
Tokyo-Wards-Source-Registry: ✅ 레지스트리 로드됨 [TWR-v1.5]
tokyo-ward-series-benchmarks.json: 로드
```

---

## [MLIT-1] MLIT 파이프라인 로드 (도쿄 에피소드 · 투자 분석 — Step 0 직후 필수)

**트리거** (하나라도 해당 시 이 단계 실행):

- Where to Live in Tokyo 에피소드 (Ep.01~Ep.23)
- 키워드: MLIT, 成約, 取引, 地価, `analyze:episode`, `screen:wards`, `compare:wards`, `dossier:ward`
- 사용자 투자·입지 분석 요청 (gsfark.com 무관)

**1) 문서 로드 (순서)**

1. `projects/GSF-OS/Wiki/GSF_Ark_MLIT_Blog_Pipeline.md`
2. `docs/AG_GSFARK_MLIT_PIPELINE_PROMPT.md`
3. `docs/MLIT_DATA_REFRESH_SOP.md` (분기 갱신·API 호출 시)

**2) 에피소드 작업 — 오케스트레이터 우선**

`docs/verification/tokyo-series-episodes.json`에서 `episode` + `slug` 확인 후:

```bash
cd projects/GSF-Ark

# 권장 (전체 파이프라인: MLIT·SUUMO·시계열·research-pack·manifest)
pnpm analyze:episode -- --episode ep08 --slug tokyo-itabashi-nerima --write

# API 키 없거나 SSOT만 최신일 때
pnpm analyze:episode -- --episode ep08 --slug tokyo-itabashi-nerima --write --skip-api

# slug만 (episode 자동 추론)
pnpm analyze:episode -- --slug tokyo-itabashi-nerima --write
```

**산출물 확인**

- `docs/verification/research-packs/<slug>.md` ← 리서치·초안 SSOT
- `docs/verification/manifests/epXX-<slug>.manifest.json` (`--write` 시)
- `docs/verification/tokyo-ward-series-benchmarks.json` (v1.3)

**Tier (본문 작성 시)**

| 데이터 | tier | 본문 |
|--------|------|------|
| 成約 ㎡·70㎡ | A primary | ✅ |
| 取引 시계열·CAGR | A_auxiliary | 추세만 + 각주 |
| 地価 시계열 | A_auxiliary | 입지 맥락 + 각주 |
| SUUMO 1R/Yield | B | 스냅샷 evidence |

⛔ 取引를 成約처럼 쓰기 금지 · 地価와 맨션 ㎡단가 직접 비교 금지 · n&lt;30 본문 수치 금지

**3) 투자 분석만 (포스트 없음)**

```bash
pnpm screen:wards
pnpm compare:wards -- --episode ep07
pnpm dossier:ward -- --episode ep07
```

**4) 완료 보고 (AG → Joseph / Cursor)**

```
[MLIT-1 완료] ep08 / slug: tokyo-itabashi-nerima
research-pack: docs/verification/research-packs/tokyo-itabashi-nerima.md
manifest: docs/verification/manifests/ep08-tokyo-itabashi-nerima.manifest.json
다음: Joseph manifest 승인 → KO 초안 (Step 4)
```

투자 분석만이면: `[MLIT-1 완료] 투자 분석 — screen/compare/dossier 출력 첨부` 후 Step 3-E 생략 가능.

---

## Step 1–2 — Topic & Q&A

기존과 동일 (독자·톤·슬러그 확정).

**슬러그 SSOT**: `docs/verification/tokyo-series-episodes.json`

| Ep | slug | 구 |
|----|------|-----|
| 01 | tokyo-core-3-wards-chiyoda-chuo-minato | 千代田·中央·港 |
| 02 | tokyo-shinjuku-shibuya-bunkyo | 新宿·渋谷·文京 |
| 03 | tokyo-meguro-setagaya | 目黒·世田谷 |
| 04 | tokyo-shinagawa-ota | 品川·大田 |
| 05 | tokyo-toshima-nakano-suginami | 豊島·中野·杉並 |
| 06 | tokyo-taito-sumida-koto | 台東·墨田·江東 |
| 07 | tokyo-kita-arakawa-itabashi-nerima | 北区·荒川·板橋·練馬 |
| 08 | tokyo-adachi-katsushika-edogawa | 足立·葛飾·江戸川 |
| 09 | tokyo-musashino-mitaka-chofu | 武蔵野·三鷹·調布 |

---

## Step 3 — Research (서브에이전트)

**역할 분리**: Research subagent는 **claim 후보만** 반환. tier 부여 금지.

출력 형식:
```json
{ "claim_candidates": [{ "label": "...", "value": null, "source_hint": "..." }] }
```

---

## Step 3-E — Verification manifest (NEW — 초안 전 필수)

> **도쿄 에피소드**: `[MLIT-1]`에서 `pnpm analyze:episode … --write` 실행 후 이 단계로 진입. 수동 A-layer 수집은 fallback만.

1. manifest 없으면 `[MLIT-1]` 재실행 또는:
   ```bash
   pnpm scaffold:manifest -- --slug <slug> --write
   ```

2. **A-layer** — `[MLIT-1]` / `analyze:episode`가 채움 (benchmarks v1.3):
   - 成約 70㎡·㎡단가 → `mlit_mansion_2025_q1_q4`
   - 시계열 CAGR → `mlit_mansion_timeseries` (primary), `mlit_trade_price_timeseries`·`land_price_timeseries` (auxiliary, `tier: secondary`)
   - 역·인구·재해 → `benchmark_lookup`

3. **B-layer** (SUUMO) — `sync-suumo-to-benchmarks` 또는:
   ```bash
   node scripts/fetch-suumo-snapshot.mjs sc_<code> --commit
   pnpm sync:suumo-benchmarks -- --episode epXX --fetch-missing --write
   ```

4. **C-layer** (전철·PR·봇차단):
   - `tier: secondary` 또는 `method: user_capture`
   - Joseph 캡처/PDF 필요 시 `c_tier_capture_requests` 등록

5. **Joseph 승인 대기** → `gates.manifest_approved_by`, `manifest_approved_at` 설정

6. 검증 실행 (승인 전 self-check):
   ```bash
   pnpm verify:episode --slug <slug>
   ```

**Fallback** (오케스트레이터 실패 시에만 개별 실행):
```bash
pnpm merge:mlit-pkm -- --episode ep07
pnpm sync:mlit-ark
pnpm sync:mlit-benchmarks -- --episode ep07 --write
pnpm mlit:price-series -- --episode ep07 --from 2015 --to 2025 --write
pnpm mlit:trade-series -- --episode ep07 --from 2005 --to 2025 --write
pnpm mlit:land-series -- --episode ep07 --from 2005 --to 2026 --write
pnpm research:pack -- --episode ep07 --write
```

**manifest 승인 없이 Step 4 진입 금지.**

---

## Step 4 — KO draft

- manifest `claims`에 있는 수치만 사용
- `tier: secondary` → 본문에 `[2차 출처]` 표기
- `gates.draft_started: true` 설정

---

## Step 4.5 — Hero image (필수 · KO 초안 후, EN/JA 전)

> **Step 5(번역)·Step 6(배포) 진입 조건**: 아래 exit 0 확인. `verify:og-social` 또는 `validate:post` hero gate 실패 시 **진행 중단**.

1. **Hero WebP** — `public/assets/images/blog/{slug}-hero.webp`  
   - 사용자 첨부·지정 폴더만 ([`BLOG_IMAGE_RULES_1PAGE.md`](../../BLOG_IMAGE_RULES_1PAGE.md))  
   - Downloads 자동 선택·셀카 hero 금지
2. **LinkedIn JPEG** — `pnpm og:hero-jpeg -- <slug>` → `{slug}-hero-og.jpg` (1200×630)
3. **Frontmatter** — KO `ogImage`를 `https://gsfark.com/assets/images/blog/{slug}-hero-og.jpg` 로 설정 (`.webp` 금지)
4. **검증** — `pnpm verify:og-social --slug <slug> --no-live` → exit 0

**면제 (Joseph만)**: episode manifest에만 기록 — 구두 불가.

```json
"gates": { "hero_waived_by": "Joseph YYYY-MM-DD — 사유" }
```

`validate:post`가 manifest `hero_waived_by`를 읽어 hero gate를 skip. 다음 편 전 waiver 제거 + 이미지 완료 필수.

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

> Step 4.5 완료 전제. EN/JA에도 동일 `ogImage` (`.jpg`) 반영.

```bash
pnpm verify:og-social --slug <slug> --no-live   # hero-webp / hero-og-jpg / ogImage .jpg
pnpm verify:episode:gate --slug <slug>
pnpm validate:post <slug>                      # hero-webp-exists + hero-og-jpg-exists 포함
```

Joseph: git commit + deploy — **md 3 + hero.webp + hero-og.jpg**

### Step 6-S — SNS OG (LinkedIn · 배포 직후)

1. [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)에서 KO·EN URL 각각 **Inspect**
2. **Revert 후 재배포**한 글은 LinkedIn이 “이미지 없음”을 캐시함 → Post Inspector 없이 재게시해도 썸네일 안 뜸

`og:image`는 `-hero-og.jpg?v=YYYYMMDD` (발행일)로 캐시 무효화.

---

## Step 7 — PKM Obsidian dossier (배포 직후 · AG 필수)

> **대상**: Where to Live in Tokyo 에피소드 (Ep.01~Ep.23)만. 일반 블로그는 생략.  
> **소유**: **AG** — Cursor 검증 범위 밖. Joseph commit·deploy **이후** AG가 반드시 실행.

### 7.1 episode 코드 확인

`docs/verification/tokyo-series-episodes.json`에서 `slug` → `episode` + `wards` 확인.  
CLI용 코드: `Ep.07` → `ep07` (소문자, `ep` + 2자리).

### 7.2 dossier 재생성

```bash
cd projects/GSF-Ark

# 에피소드 전체 구 (권장)
pnpm dossier:ward -- --episode ep07

# 단일 구만 갱신 시
pnpm dossier:ward -- --ward 北区
```

**산출물** (GSF-PKM Obsidian vault, git 추적 권장):

```
GSF-PKM/PKM/30 Resources/RealEstate/Tokyo/wards/{区}.md
GSF-PKM/PKM/30 Resources/RealEstate/Tokyo/wards/{区}.data.json
```

카드 하단 `Generated by scripts/render-ward-dossier.mjs · YYYY-MM-DD` 로 갱신 여부 확인.

### 7.3 블로그 링크·체크리스트 (AG 수동 보강)

`render-ward-dossier.mjs`는 블로그 URL을 자동 삽입하지 않음. **에피소드 `wards` 각 구**에 대해 `.md`를 열고:

1. **요약 (Joseph 편집)** 블록에 한 줄 추가·갱신:
   ```markdown
   - 블로그 Ep.07: [에피소드 제목](https://gsfark.com/ko/posts/<slug>/) ✅ 배포완료 YYYY-MM-DD
   ```
2. **미확인·다음 액션**에 체크:
   ```markdown
   - [x] Ep.07 블로그 배포 완료 (YYYY-MM-DD)
   ```

KO 포스트 `title` 또는 시리즈 에피소드명을 링크 텍스트로 사용.

### 7.4 완료 보고 (AG → Joseph)

```
[AG→Joseph] Step 7 PKM 완료
slug: tokyo-kita-arakawa-itabashi-nerima / ep07
dossier: 北区·荒川区·板橋区·練馬区 (4 files .md + .data.json)
blog 링크: 4/4 wards ✅
live: https://gsfark.com/ko/posts/tokyo-kita-arakawa-itabashi-nerima/
```

### 7.5 환경

| 변수 | 기본값 |
|------|--------|
| `PKM_ROOT` | `scratch/projects/GSF-PKM` |

`[MLIT-1]`의 `pnpm analyze:episode … --write`가 dossier를 함께 생성하지만, **live 배포 후 Step 7은 별도로 재실행**하여 최신 benchmarks·배포일 기준 카드와 블로그 링크를 맞춘다.

---

## Related

- [`docs/AG_GSFARK_MLIT_PIPELINE_PROMPT.md`](../../docs/AG_GSFARK_MLIT_PIPELINE_PROMPT.md)
- [`docs/MLIT_DATA_REFRESH_SOP.md`](../../docs/MLIT_DATA_REFRESH_SOP.md)
- GSF-OS Wiki: `projects/GSF-OS/Wiki/GSF_Ark_MLIT_Blog_Pipeline.md`
- [`docs/BLOG_EPISODE_VERIFICATION_PIPELINE.md`](../../docs/BLOG_EPISODE_VERIFICATION_PIPELINE.md)
- [`docs/verification/README.md`](../../docs/verification/README.md)
- [`docs/BLOG_AG_CURSOR_WORKFLOW.md`](../../docs/BLOG_AG_CURSOR_WORKFLOW.md)
