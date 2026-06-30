# Blog workflow: Antigravity (write) + Cursor (pre-publish verify)

> **Start here (trust · phases · CI):** [`BLOG_TRUST_AND_QUALITY_ROADMAP.md`](./BLOG_TRUST_AND_QUALITY_ROADMAP.md)  
> **AG 컨텍스트:** 첫 세션 [`AG_CONTEXT_BOOTSTRAP_20260525.md`](./AG_CONTEXT_BOOTSTRAP_20260525.md) · 이후 [`AG_CONTEXT_BOOTSTRAP_SHORT.md`](./AG_CONTEXT_BOOTSTRAP_SHORT.md)

> **원칙**: 글 **작성·초안**은 **Antigravity (AG)**. **발행 직전 검증**은 **Cursor**에서 통과한 뒤 repo에 반영·배포.  
> **코드·구현 레이어**: Claude는 기획·브리핑만 — **구현 확정은 Cursor와 티키타카** ([`GSF-OS/Wiki/Claude_Cursor_Collaboration_Policy.md`](../../GSF-OS/Wiki/Claude_Cursor_Collaboration_Policy.md)).  
> **요일 고정 없음** · **Telegram 불필요** — 포스트 1편마다 아래 순서만 지키면 됨.

---

## Quick reference (운영 요약)

| 항목 | 내용 |
|------|------|
| **AG → Cursor 넘기기** | 초안·repo 반영 후 Cursor에 예: 「slug `…` — ko/en/ja 반영됨. 발행 전 검증 부탁」 |
| **같은 slug** | `ko/`, `en/`, `ja/` 아래 **파일명 동일** (예: `…/ko/foo.md`, `…/en/foo.md`, `…/ja/foo.md`) |
| **AG에 시킬 때** | slug 영문 kebab-case로 통일 → KO 작성 → EN/JA 번역 → 위 세 경로에 저장 |
| **Cursor 검증** | `pnpm verify:episode --slug <slug>` + `pnpm validate:post <slug>` exit 0 |
| **발행** | 본인: git commit + deploy (`/blog_publish` 텔레그램은 legacy, [§ below](#what-was-blog_publish-telegram)) |
| **SNS (배포 직후)** | **AG**: Joseph가 `SNS 배포 시작`만 말함 → [`social-broadcast`](../.agents/skills/social-broadcast/SKILL.md) · Voice [`GSF_ARK_SNS_VOICE_V1.md`](./GSF_ARK_SNS_VOICE_V1.md) · `pnpm sns:resolve-slug` |
| **배포 직후 PKM (Tokyo 에피소드)** | **AG**: `pnpm dossier:ward -- --episode epXX` + ward 카드 블로그 링크·체크 ([§ AG post-deploy PKM](#ag-post-deploy-pkm-tokyo-episodes)) |
| **repo 루트 주의** | `src/data/blog/_integrity-example-*.md`, `_template-*.md` 는 예시/템플릿 — 실제 글은 **`ko/` `en/` `ja/` 안만** |

**폴더 구조 (확인됨)**:

```
src/data/blog/ko/<slug>.md
src/data/blog/en/<slug>.md
src/data/blog/ja/<slug>.md
```

---

## Author Layer — Data-first (Joseph Hypothesis Layer · Reasoning OS)

**실행 SSOT**: [`JOSEPH_AUTHOR_OPS.md`](./JOSEPH_AUTHOR_OPS.md) — Data Discovery → Tiki-taka → Hypothesis Lock → KO  
**사고 흐름**: [`REASONING_OS.md`](./REASONING_OS.md) · Wiki [`Reasoning_OS.md`](../../GSF-OS/Wiki/Reasoning_OS.md)  
**KO vNext (Ep.10+)**: [`KO_VNEXT_WRITING.md`](./KO_VNEXT_WRITING.md) · **편집 철학**: [`JOSEPH_AUTHENTIC_VOICE.md`](./JOSEPH_AUTHENTIC_VOICE.md)  
**기준 글 (benchmark)**: Ep.10 `tokyo-kokubunji-kunitachi-fuchu-tachikawa` — Ep.11~는 구조·톤·난이도를 Ep.10과 비교  
**파일럿 Ep.10~15**: KO 초안 Cursor → 보이스 편집 (ChatGPT) → Cursor 검증 · AG KO 일시 중단 · [`pilot/hypothesis-layer-pilot-log.md`](./pilot/hypothesis-layer-pilot-log.md)

Joseph는 **Data-first Analyst**다. AG는 Research 요약이 아니라 **가설·증거·결론 편집**을 한다.

| 단계 | 산출물 | SSOT |
|------|--------|------|
| Step 2 (AG) | Q1~Q8 + Decision Log | `.blog-agent-stage/<slug>/decision-log.md` |
| MLIT 에피소드 | Research pack 후 Trigger·Hypothesis 업데이트 | 동일 Decision Log |
| Step 4 (AG) | KO 초안 — Evidence Hierarchy L1→L3→… | `deploy-blog` Step 4 |
| Step 4-A (Joseph) | Authenticity Check — 추론 체인·Final Insight | Decision Log 하단 |
| Step 7-C (AG) | PKM Thinking 승격 | `$PKM_ROOT/PKM/Thinking/<slug>.md` |

**철학·Evidence Hierarchy**: [`GSF-OS/Wiki/GSF_Ark_Data_First_Author_Layer.md`](../../GSF-OS/Wiki/GSF_Ark_Data_First_Author_Layer.md)  
**JOL (분석 OS + 원칙)**: [`GSF-OS/Wiki/Joseph_Operating_Layer.md`](../../GSF-OS/Wiki/Joseph_Operating_Layer.md)  
**스킬 절차**: `deploy-blog` v5.1 Step 2~4-A · 템플릿 [`docs/templates/blog-decision-log.md`](./templates/blog-decision-log.md)

**MLIT gate 순서는 유지**: `analyze:episode` → manifest Joseph 승인 → Decision Log Trigger 업데이트 → KO 초안.

---

## Responsibility split

| Phase | Owner | Typical tools |
|-------|--------|----------------|
| Research, KO draft, edit | **AG** | Antigravity, Google Docs, deploy-blog 스킬 등 |
| **Manifest + C-tier capture** | **AG → Joseph** | `docs/verification/manifests/` — KO 초안 **전** 승인 |
| **Cursor manifest audit** | **Cursor** | `pnpm verify:episode --slug <slug>` |
| EN/JA (if not in AG) | **AG or pipeline** | 번역 스킬 / 기존 blog-agent |
| Fact sheet + spot-check | **You + Cursor** | [`BLOG_FACT_CHECK_WORKFLOW.md`](./BLOG_FACT_CHECK_WORKFLOW.md) |
| Automated gates + build | **Cursor** | `pnpm validate:post <slug>` |
| **Publish** | **You** (after validate) | `git commit` + Vercel deploy — see § Publish below |
| **PKM Obsidian dossier (post-deploy)** | **AG** | `pnpm dossier:ward` + ward `.md` 블로그 링크 — Tokyo 에피소드만 |

**Do not** merge/deploy until `pnpm validate:post` exits `0`.

---

## Per-post pipeline (no fixed weekdays)

```
AG: 주제 → manifest (Step 3-E) → Joseph 승인 → KO 원고
        → Step 4.5 이미지 (hero-webp + og-jpeg + verify:og-social exit 0)
        → (EN/JA 번역) → repo md 반영
        ↓
Cursor: manifest verify + 팩트 시트 → pnpm verify:og-social --slug <slug> → pnpm validate:post <slug>
        ↓
You: git commit + deploy
        ↓
AG: Step 7 PKM — pnpm dossier:ward -- --episode epXX + ward 카드 블로그 링크·체크 (Tokyo 에피소드만)
```

**Ep.07+ 필수**: manifest 승인 없이 KO 초안 작성 금지. Cursor 감사(`cursor_audit_passed`) 없이 배포 금지.  
**Tokyo 에피소드 배포 직후 필수 (2026-06-19~)**: AG가 Step 7 PKM dossier 실행 — 구두 생략 금지.  
**이미지 필수 (2026-06-19~)**: `hero-webp-exists` + `hero-og-jpg-exists` hard gate — `pnpm validate:post`에서 자동 검사.  
면제(waiver)는 manifest `gates.hero_waived_by` 필드 기재로만 허용. 구두 스킵 불가.  
상세: [`BLOG_EPISODE_VERIFICATION_PIPELINE.md`](./BLOG_EPISODE_VERIFICATION_PIPELINE.md)  
**AG MLIT·투자 분석 영구 프롬프트**: [`AG_GSFARK_MLIT_PIPELINE_PROMPT.md`](./AG_GSFARK_MLIT_PIPELINE_PROMPT.md)

발행 **빈도**는 [`EDITORIAL_TOPIC_POLICY.md`](./EDITORIAL_TOPIC_POLICY.md) / runbook 목표(예: 주 3회)를 참고하되, **월·수·금 같은 요일 매핑은 사용하지 않음**.

---

## Cursor pre-publish checklist

### 1. Markdown in repo

`src/data/blog/{ko,en,ja}/<slug>.md` 가 있어야 합니다.

- AG가 파일을 저장했거나, Docs 최종본을 Cursor/AG가 md로 넣었거나
- 스테이징만 있으면: `.blog-agent-stage/<slug>/` → `pnpm validate:post --stage <slug>`

### 2. Fact sheet

- [`docs/templates/blog-fact-sheet.md`](./templates/blog-fact-sheet.md)
- 숫자·법적 요건 → 티어1 URL + 사람 ✓

### 3. Automated validation

```bash
pnpm verify:og-social --slug <slug> --no-live   # ← 필수 추가 (2026-06-19)
# → hero-webp exists / hero-og-jpg exists / ogImage is .jpg 확인
# exit non-0 이면 배포 불가. No verbal bypass.

pnpm verify:episode --slug <slug>          # manifest vs SSOT (Ep.07+ 권장)
pnpm verify:episode:gate --slug <slug>     # 배포 직전 gates 포함
pnpm validate:post <slug>
# validate:post는 hero-webp-exists + hero-og-jpg-exists hard gate 포함
```

Exit `0` on **both** `verify:og-social` **and** `validate:post` = 배포 가능.

### 4. Human skim (5–10 min)

제목, 면책, JA 톤, 투자 권유 없음.

### 5. Publish (current default — no Telegram)

[`§ What was `/blog_publish`?`](#what-was-blog_publish-telegram) 참고.

1. `pnpm verify:og-social --slug <slug> --no-live` 가 **0** ← NEW (hero 이미지 검증)
2. `pnpm validate:post <slug>` 가 **0** (hero gate 포함)
3. `git add` / `commit` — **3개 locale md + 2개 이미지 파일** (`hero.webp`, `hero-og.jpg`)
4. Deploy (예: `pnpm run build` + Vercel, or your existing deploy script)

Telegram / GSF-Research 봇은 **현재 운영에서 필수 아님** (legacy).

#### Hero image waiver policy

Joseph이 명시적으로 이미지 없는 배포를 허가한 경우에만 적용.
**구두 허가 불인정** — episode manifest `gates.hero_waived_by` 필드에 기재해야 `validate:post`가 bypass:

```json
"gates": {
  "hero_waived_by": "Joseph 2026-06-19 — draft only, images to follow"
}
```

다음 포스팅 전 waiver 제거 + 이미지 생성 완료 필수.

---

## AG post-deploy PKM (Tokyo episodes)

> **Owner: AG only** — Cursor는 이 단계를 실행·검증하지 않음.  
> **Scope**: Where to Live in Tokyo (Ep.01~Ep.23). 일반 블로그 slug는 생략.

Joseph가 live 배포를 확인한 **직후**, AG가 deploy-blog **Step 7**을 수행한다.

### Checklist

1. **episode 코드** — `docs/verification/tokyo-series-episodes.json`에서 `slug` → `episode` (예: `Ep.07` → CLI `ep07`) 및 `wards` 목록 확인.

2. **dossier 재생성**
   ```bash
   cd projects/GSF-Ark
   pnpm dossier:ward -- --episode ep07
   ```
   산출: `GSF-PKM/PKM/30 Resources/RealEstate/Tokyo/wards/{区}.md` + `{区}.data.json`

3. **블로그 링크** — 각 ward `.md`에 수동 보강 (`render-ward-dossier`는 URL 미삽입):
   - `## 요약` 블록: `블로그 Ep.NN: [제목](https://gsfark.com/ko/posts/<slug>/) ✅ 배포완료 YYYY-MM-DD`
   - `## 미확인·다음 액션`: `- [x] Ep.NN 블로그 배포 완료 (YYYY-MM-DD)`

4. **완료 보고** — Joseph에게 `[AG→Joseph] Step 7 PKM 완료` + slug + wards N/N 링크 확인.

상세·HARD-GATE: [`.agents/skills/deploy-blog/SKILL.md`](../.agents/skills/deploy-blog/SKILL.md) § Step 7.

---

## What was `/blog_publish`? (Telegram)

과거 **GSF-Research Telegram 봇**이 호출하던 명령으로, 내부적으로는 blog-agent API의 **`apply_publish`** 와 같은 역할이었습니다.

| 단계 | 의미 |
|------|------|
| Docs/워크플로에서 KO·EN·JA 확정 | 번역·동기화 |
| `prepare_publish` | slug·경로 dry-run |
| `apply_publish` | `runBlogValidation` 후 `src/data/blog/{ko,en,ja}/<slug>.md` 에 기록 |

**지금 Telegram을 쓰지 않는다면** → AG가 md를 repo에 두고, Cursor에서 `pnpm validate:post` 한 뒤 **git으로 발행**하면 됩니다. 검증 로직은 동일합니다 (`validationGates.ts`).

선택: 예전처럼 API만 쓰려면 `POST /api/blog-agent/workflow` + `action: "apply_publish"` ([`BLOG_AGENT_AUTOMATION_RUNBOOK.md`](../BLOG_AGENT_AUTOMATION_RUNBOOK.md)) — 워크플로 JSON(`.blog-agent-workflows/`)이 있을 때만.

---

## What Cursor validation runs

[`src/lib/validation/validationGates.ts`](../src/lib/validation/validationGates.ts) — sources, tier, KO length/tone, disclaimers, build.

실패 시 수정 순서: runbook § Gate failure remediation.

---

## Handoff notes for Cursor agent

“발행 전 검증해줘”일 때:

1. `slug` + `src/data/blog/` 경로 확인
2. `docs/verification/manifests/*<slug>*.manifest.json` 존재·gates 확인 (`hero_waived_by` 없으면 이미지 필수)
3. Hero assets: `public/assets/images/blog/{slug}-hero.webp` + `{slug}-hero-og.jpg`, KO `ogImage` = `.jpg`
4. `pnpm verify:og-social --slug <slug> --no-live` → 0
5. `pnpm verify:episode --slug <slug>` → 0
6. 팩트 시트 (`docs/fact-audit/<slug>.md`) coverage 확인
7. `pnpm validate:post <slug>` → 0 (hero gate + build; manifest `hero_waived_by` 시 hero skip)
8. manifest `gates.cursor_audit_passed: true` 설정
9. **사용자가 요청할 때만** commit/deploy (md 3 + hero.webp + hero-og.jpg)

Rule: [`.cursor/rules/blog-pre-publish.mdc`](../.cursor/rules/blog-pre-publish.mdc)

---

## Batch fact-check loop (35 published posts)

| Phase | Owner | Prompt doc | md edit? |
|-------|--------|------------|----------|
| 1차 감사 | **AG** | [`AG_BATCH_FACT_CHECK_PROMPT.md`](./AG_BATCH_FACT_CHECK_PROMPT.md) | No — `docs/fact-audit/` only |
| 2차 게이트·일괄 수정 | **Cursor** | [`fact-audit/CURSOR_PHASE2_REPORT.md`](./fact-audit/CURSOR_PHASE2_REPORT.md) | Yes |
| 2.5 클레임·번역 수정 | **AG** | [`AG_PHASE2_CONTENT_FIX_PROMPT.md`](./AG_PHASE2_CONTENT_FIX_PROMPT.md) | Yes — per fact sheet |
| 3차 재검증 | **Cursor** | [`CURSOR_PHASE3_REVERIFY_PROMPT.md`](./CURSOR_PHASE3_REVERIFY_PROMPT.md) | Yes — minimal |
| Publish | **You** | — | `git commit` after validate 0 |

**Handoff lines**

- AG (Wave A 일부): **「팩트·번역 AG 수정 완료, Cursor 3차 재검증 대기」** — 6~7 slug만 해당
- AG (merge 전 전수): **「팩트·번역 AG 전량(35) 수정 완료, Cursor 3차 전수 재검증 대기」**
- Cursor → You: **「Cursor 3차 재검증 완료 — validate N/35, 커밋 대기」**

**merge 전 권장:** Wave A 잔여 5만보다 **35 전수 (Deep/Standard/Light)** AG → Cursor 3차가 안전. [`AG_PHASE2_CONTENT_FIX_PROMPT.md`](./AG_PHASE2_CONTENT_FIX_PROMPT.md) § 전체 35개 재작업.

---

## Related

- [`BLOG_EPISODE_VERIFICATION_PIPELINE.md`](./BLOG_EPISODE_VERIFICATION_PIPELINE.md)
- [`BLOG_AGENT_AUTOMATION_RUNBOOK.md`](../BLOG_AGENT_AUTOMATION_RUNBOOK.md)
- [`BLOG_FACT_CHECK_WORKFLOW.md`](./BLOG_FACT_CHECK_WORKFLOW.md)
- [`AG_PHASE2_CONTENT_FIX_PROMPT.md`](./AG_PHASE2_CONTENT_FIX_PROMPT.md)
- [`CURSOR_PHASE3_REVERIFY_PROMPT.md`](./CURSOR_PHASE3_REVERIFY_PROMPT.md)
