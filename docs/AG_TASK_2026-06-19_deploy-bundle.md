# AG TASK — AdSense E-E-A-T + 에세이 배포 번들 (v1.0)

> 작성: Cursor · 2026-06-19  
> 실행: **AG**  
> 검증: **Cursor** (`pnpm build`, `pnpm validate:post`, 링크·hreflang)  
> 배포(commit/push): **User** 명시 요청 시  
> 브랜치: `feat/adsense-eeat-pages`  
> Repo: `/Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark`

---

## 개요

이번 배포는 **한 PR/한 배포**로 묶는다.

| 트랙 | slug / 범위 | 상태 |
|------|-------------|------|
| A. E-E-A-T 정적 페이지 | mission · methodology · author | AG 구현 완료 (미커밋) |
| B. About 헤딩 + 타임라인 링크 | `about/{en,ko,ja}.md` | B1 완료 · **B2 AG 작업** |
| C. 에세이 3언어 | `buying-property-japan-surprises-foreign-investor` | EN Claude 수정 · **KO/JA Cursor 저장 완료** |

**핵심 원칙:** About 타임라인 링크와 에세이는 **동시에 live** 되어야 한다 (`draft: false` 후). 링크만 먼저 올리면 404.

상세 E-E-A-T SSOT: Claude 전달 `AG_TASK v2.2` (콘텐츠 verbatim). 인프라는 Option C (`contact` 패턴).

---

## 역할

| Phase | Owner |
|-------|--------|
| 이미지(hero/OG) · `draft: false` · About B2 · 커밋 준비 | **AG** |
| `pnpm validate:post` · `pnpm build` · Preview 링크 QA | **Cursor** |
| git push · merge · Vercel | **User** |

KO/JA 에세이 본문은 **Joseph 승인본** — AG 재번역 금지.

---

## TRACK A — E-E-A-T (이미 구현됨 → 커밋만)

AG가 이미 반영한 항목 (재작업 불필요, 누락 시에만 보완):

- [ ] `src/data/{mission,methodology,author}/{en,ko,ja}.md`
- [ ] `src/content.config.ts` 컬렉션 3개
- [ ] `src/pages/[...locale]/mission.astro`, `methodology.astro`, `author/joseph-kim.astro`
- [ ] `src/data/about/{en,ko,ja}.md` 상단 헤딩 (blockquote → 강조 문단)
- [ ] `PostDetails.astro` Author EEAT CTA + `authorEeatBody`
- [ ] `Footer.astro` Mission · Methodology · Author
- [ ] `src/i18n/ui.ts` EEAT 문자열
- [ ] `buildBreadcrumbs.ts` named 맵
- [ ] `AboutLayout.astro` `description` 전달
- [ ] **`src/config.ts` `SITE.profile`** → `https://gsfark.com/author/joseph-kim/` (Cursor 적용 완료 — 확인만)

---

## TRACK B — About 타임라인 → 에세이 링크 (AG 작업)

### 대상

마지막 타임라인 블록 (`2026 – Present` / `현재` / `現在`) **내부만** 수정. 나머지 타임라인 HTML **일체 변경 금지**.

타임라인은 HTML 블록이므로 **마크다운 링크 금지** → 아래 `<p>` + `<a>` HTML을 기존 `</p>` 직후·`</div>`(timeline-content) 직전에 삽입.

### EN (`src/data/about/en.md`)

기존 문장 끝: `...and this blog is a record of that journey.</p>`

그 **바로 다음**에 추가:

```html
      <p>If you're interested in the purchase process itself — what surprised me, what differed from Korea, and why timing mattered more than price — you may find this essay helpful:
<a href="/posts/buying-property-japan-surprises-foreign-investor/">What Surprised Me Most About Buying Property in Japan</a>.</p>
```

### KO (`src/data/about/ko.md`)

기존 문장 끝: `...이 블로그는 그 과정의 기록입니다.</p>`

```html
      <p>실제 매입 과정에서 어떤 점이 예상과 달랐는지, 한국과 일본의 차이는 무엇이었는지, 그리고 왜 가격보다 타이밍이 더 중요하다고 느꼈는지 궁금하시다면 아래 글도 참고해 보시기 바랍니다.
<a href="/ko/posts/buying-property-japan-surprises-foreign-investor/">일본에서 집을 사며 가장 놀랐던 것들</a>.</p>
```

### JA (`src/data/about/ja.md`)

기존 문장 끝: `...このブログはその過程の記録です。</p>`

```html
      <p>実際の購入プロセスで何に驚いたのか、韓国との違いは何だったのか、そしてなぜ価格よりもタイミングが重要だと感じたのかについては、こちらの記事で詳しく書いています。
<a href="/ja/posts/buying-property-japan-surprises-foreign-investor/">日本で不動産を購入して驚いたこと</a>。</p>
```

---

## TRACK C — 에세이 `buying-property-japan-surprises-foreign-investor`

### 파일 (SSOT)

| locale | 경로 | 상태 |
|--------|------|------|
| EN | `src/data/blog/en/buying-property-japan-surprises-foreign-investor.md` | Claude 수정 완료 |
| KO | `src/data/blog/ko/buying-property-japan-surprises-foreign-investor.md` | **Cursor 저장 완료** |
| JA | `src/data/blog/ja/buying-property-japan-surprises-foreign-investor.md` | **Cursor 저장 완료** |

AG는 본문·frontmatter **verbatim 유지**. `draft: true`는 배포 직전 AG가 `false`로 변경.

### Step C-1 — Hero / OG 이미지 (필수)

deploy-blog 스킬 Step 4.5:

```
public/assets/images/blog/buying-property-japan-surprises-foreign-investor-hero.webp
public/assets/images/blog/buying-property-japan-surprises-foreign-investor-hero-og.jpg
```

3언어 frontmatter `ogImage` → **동일 `.jpg` URL** (기존 에세이 패턴 참조).

면제는 manifest `gates.hero_waived_by`만 — 구두 스킵 금지.

### Step C-2 — 발행 게이트

```bash
cd /Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark

pnpm verify:og-social --slug buying-property-japan-surprises-foreign-investor --no-live
pnpm validate:post buying-property-japan-surprises-foreign-investor
```

둘 다 **exit 0** 후에만 `draft: false` (en · ko · ja 동시).

### Step C-3 — 본문 하단 Author 블록 (삭제)

EN/KO/JA 에세이 본문 하단 `### About the Author` / `### 작성자 소개` / `### 著者について` 블록은 **삭제** (TASK 5 · `AG_TASK v2.3`).

작성자 소개·EEAT 링크는 **`PostDetails.astro` Author Card만** 사용. 본문 md에 재삽입 금지.

---

## AG 작업 순서 (권장)

1. 브랜치 `feat/adsense-eeat-pages` 확인
2. TRACK A 누락 없는지 점검 · `SITE.profile` 확인
3. TRACK B — About 3파일 타임라인 HTML 링크 삽입
4. TRACK C — hero/og 이미지 · `ogImage` · `draft: false`
5. `pnpm verify:og-social` + `pnpm validate:post` + `pnpm build`
6. Cursor에 핸드오프 (아래 템플릿)
7. **User에게** commit/push 요청 (AG가 자동 commit 하지 말 것 — AGENTS.md)

---

## PR에 포함할 파일 (스코프)

**포함:**

- `src/data/mission/**`, `methodology/**`, `author/**`
- `src/data/about/{en,ko,ja}.md`
- `src/data/blog/{en,ko,ja}/buying-property-japan-surprises-foreign-investor.md`
- `src/pages/[...locale]/mission.astro`, `methodology.astro`, `author/**`
- `src/content.config.ts`, `src/config.ts`, `Footer.astro`, `PostDetails.astro`, `AboutLayout.astro`, `ui.ts`, `buildBreadcrumbs.ts`
- `public/assets/images/blog/buying-property-japan-surprises-foreign-investor-*`
- `docs/AG_TASK_2026-06-19_deploy-bundle.md` (본 문서)

**제외 (별도 PR/커밋):**

- `.agents/skills/deploy-blog/SKILL.md`
- `docs/BLOG_AG_CURSOR_WORKFLOW.md`
- `WEEKLY_STATUS.md`
- `docs/verification/scores/*.json`

---

## Cursor 검증 체크리스트

### 빌드

- [ ] `pnpm build` exit 0

### E-E-A-T 9 URL (200)

- [ ] `/mission/`, `/ko/mission/`, `/ja/mission/`
- [ ] `/methodology/`, `/ko/methodology/`, `/ja/methodology/`
- [ ] `/author/joseph-kim/` + ko/ja

### 에세이 3 URL (200, draft false 후)

- [ ] `/posts/buying-property-japan-surprises-foreign-investor/`
- [ ] `/ko/posts/buying-property-japan-surprises-foreign-investor/`
- [ ] `/ja/posts/buying-property-japan-surprises-foreign-investor/`

### About → 에세이 링크

- [ ] EN/KO/JA About 타임라인 링크 클릭 → 각 locale 포스트 200
- [ ] About 타임라인 나머지 HTML 보존

### SSOT

- [ ] KO/JA 에세이 = Cursor 저장본과 diff 없음
- [ ] `SITE.profile` = author URL

### validate

- [ ] `pnpm validate:post buying-property-japan-surprises-foreign-investor` exit 0

---

## AG → Cursor 핸드오프 템플릿

```
배포 번들 작업 완료 (feat/adsense-eeat-pages)
- E-E-A-T pages + About B2 timeline links
- Essay buying-property-japan-surprises-foreign-investor (en/ko/ja, draft:false)
- pnpm verify:og-social exit 0: [yes/no]
- pnpm validate:post exit 0: [yes/no]
- pnpm build exit 0: [yes/no]
검증: docs/AG_TASK_2026-06-19_deploy-bundle.md
```

---

*Changelog: v1.0 — E-E-A-T + About timeline link + essay KO/JA 저장·통합 배포 지시*  
*Changelog: 2026-06-19 — **배포 완료** (`main` `49648c9`). 세션 마감: [`GSF_ARK_SESSION_CLOSURE_20260619.md`](./GSF_ARK_SESSION_CLOSURE_20260619.md)*
