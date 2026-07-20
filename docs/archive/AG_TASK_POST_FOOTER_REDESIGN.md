# AG Task: Post Footer 구조 재설계

> **작업자**: AG  
> **검증자**: Claude (최종 승인 전 빌드 오류·렌더 확인 필수)  
> **승인자**: Joseph  
> **목표**: 본문 하단 CTA 구조를 미니멀하게 재설계. 심플하고 세련되게.

---

## 컨셉 원칙

> "CTA를 적게 두고 각각의 클릭률을 높인다."

- 삭제는 과감하게. 남기는 것만 세련되게.
- 추가 설명 문구는 모두 제거 기본값.
- 광고처럼 보이는 요소 없음.
- GSF-Ark 톤: 데이터 중심, 미니멀, 분석 노트.

---

## 목표 구조 (Before → After)

### Before

```
본문
HighIntentPostCta       ← 삭제
태그
Share
About the Author (버튼 4개)
Follow Updates (RSS + 소셜 5개)  ← 삭제
Newsletter (대형)
Related Posts
Comments
Prev/Next
Footer
```

### After

```
본문
태그 + Share            (한 줄, 존재감 최소)
About the Author        (사진 + 2줄 + 버튼 1개)
Related Posts           (위로 승격)
Companion line          (한 줄 텍스트 링크, 신규)
Newsletter              (슬림형)
Comments
Prev/Next
Footer
```

---

## 수정 파일 목록

| 파일 | 작업 |
|------|------|
| `src/layouts/PostDetails.astro` | 주요 구조 변경 |
| `src/components/NewsletterForm.astro` | `slim` variant 추가 |
| `src/i18n/ui.ts` | Companion 문구 3개 로케일 추가, 불필요 키 제거 |
| `src/components/HighIntentPostCta.astro` | 파일 삭제 |

---

## 작업 상세

### 1. `HighIntentPostCta.astro` — 완전 삭제

- 파일 삭제: `src/components/HighIntentPostCta.astro`
- `PostDetails.astro`에서 import 및 사용 라인 제거
- 다른 파일에서 참조 여부 확인 후 모두 제거

---

### 2. Follow Updates 섹션 — 삭제

`PostDetails.astro` L348~363 해당 `<section>` 블록 전체 삭제.

```astro
{/* 아래 섹션 전체 삭제 */}
<section class="mt-6 rounded-xl border border-border bg-card p-5">
  <h2 class="text-lg font-semibold">{L.postFollowTitle}</h2>
  ...
</section>
```

`ui.ts`에서 `postFollowTitle`, `postFollowBody`, `postFollowRssCta` 키도 3개 로케일 모두 삭제.

---

### 3. About the Author 카드 — 버튼 4→1 축소

현재 버튼: Author Profile / Mission / Methodology / Contact → **Author Profile 하나만 유지**.

```astro
{/* 유지 */}
<a href={`${localePrefix}/author/joseph-kim/`} ...>
  {L.authorEeatProfileCta}
</a>

{/* 삭제: Mission, Methodology, Contact 버튼 3개 */}
```

`ui.ts`에서 `authorCardContactCta` 키 삭제 (3개 로케일).  
`authorEeatMissionCta`, `authorEeatMethodologyCta` 키도 참조 없어지면 삭제.

---

### 4. `NewsletterForm.astro` — `slim` variant 추가

현재 `card` variant는 제목 + 설명 + 입력 + 안내문 + 체크리스트 링크 5개 요소.  
`slim` variant는 **제목 + 입력 + 버튼만**. 설명문·면책문·leadMagnet 링크 없음.

`NewsletterForm.astro`에 추가:

```astro
{variant === "slim" && (
  <section
    id="newsletter-subscribe"
    class="mt-6 rounded-xl border border-border bg-card p-5"
  >
    <h2 class="text-base font-semibold">{L.newsletterTitle}</h2>
    <form
      class="bd-form mt-3 flex flex-col gap-3 sm:flex-row sm:items-center"
      data-endpoint={formEndpoint}
      data-lang={navLang}
      data-variant="card"
    >
      <div class="flex-1">
        <label for="bd-email-slim" class="sr-only">{L.newsletterEmailLabel}</label>
        <input
          type="email"
          name="email"
          id="bd-email-slim"
          required
          placeholder={L.newsletterPlaceholder}
          class="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
      <button
        type="submit"
        class="bd-btn rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
      >
        {finalCta}
      </button>
    </form>
    <p class="bd-msg mt-3 hidden text-sm font-medium" aria-live="polite"></p>
  </section>
)}
```

`Props` 타입도 업데이트:
```ts
variant?: "inline" | "card" | "slim";
```

---

### 5. Companion 한 줄 링크 — `ui.ts` 추가 + PostDetails 삽입

#### `ui.ts` 3개 로케일에 추가

```ts
// en
companionLine: "Practical life in Japan →",
companionLinkText: "TokyoKorean.net",
companionLinkUrl: "https://tokyokorean.net",

// ko
companionLine: "일본 생활 실용 정보는 →",
companionLinkText: "TokyoKorean.net",
companionLinkUrl: "https://tokyokorean.net",

// ja
companionLine: "日本での暮らしガイドは →",
companionLinkText: "TokyoKorean.net",
companionLinkUrl: "https://tokyokorean.net",
```

#### `PostDetails.astro` 삽입 위치 (RelatedPosts 바로 아래)

```astro
<RelatedPosts currentPost={post} allPosts={posts} lang={navLang} />

<p class="mt-6 text-sm text-foreground/60">
  {L.companionLine}{" "}
  <a
    href={L.companionLinkUrl}
    target="_blank"
    rel="noopener"
    class="font-medium text-foreground/80 underline decoration-border underline-offset-4 transition hover:text-accent hover:decoration-accent"
  >
    {L.companionLinkText}
  </a>
</p>
```

> **주의**: `rel="nofollow"` 추가 금지. 동일 소유자 사이트 간 PageRank 흐름 유지.

---

### 6. `PostDetails.astro` 최종 순서 확정

```astro
{/* 1. 본문 */}
<article>...</article>
<SourcesList />

{/* 2. 태그 + Share (현재 위치 유지) */}
<ul>tags</ul>
<ShareLinks />

{/* 3. Author 카드 (버튼 1개로 축소) */}
<section>About the Author</section>

{/* 4. Related Posts (Newsletter 앞으로 이동) */}
<RelatedPosts />

{/* 5. Companion 한 줄 링크 (신규) */}
<p>companionLine</p>

{/* 6. Newsletter slim */}
<NewsletterForm variant="slim" lang={navLang} />

{/* 7. Comments */}
<GiscusComments />

{/* 8. Prev/Next */}
<div>prev/next</div>
```

---

## 검증 체크리스트 (Claude 검증 항목)

AG는 아래 항목을 직접 확인 후 Claude에게 결과와 함께 제출할 것.

```
[ ] pnpm build — exit 0, TypeScript 오류 없음
[ ] HighIntentPostCta import/사용 라인 완전 제거 확인
[ ] Follow Updates 섹션 렌더 없음 (KO/EN/JA 3개 로케일)
[ ] Author 카드 버튼 1개만 노출 (Profile만)
[ ] RelatedPosts가 Newsletter보다 위에 위치
[ ] Companion 한 줄이 RelatedPosts 아래, Newsletter 위에 위치
[ ] Companion 링크 rel="noopener" 확인, nofollow 없음
[ ] Newsletter slim variant — 설명문·면책문·leadMagnet 링크 미노출
[ ] ui.ts 삭제 키가 다른 컴포넌트에서 참조되지 않음
[ ] 로컬 dev 서버에서 KO/EN/JA 포스트 페이지 스크롤 확인
```

---

## Claude 핸드오프 형식

AG가 작업 완료 후 Claude에게 아래 형식으로 제출:

```
[AG → Claude] Post Footer 재설계 구현 완료

수정 파일:
- src/layouts/PostDetails.astro
- src/components/NewsletterForm.astro (slim variant 추가)
- src/i18n/ui.ts (companion 키 추가, postFollow/authorCardContact 키 제거)
- src/components/HighIntentPostCta.astro (삭제)

빌드 결과: exit 0 / 오류 없음
체크리스트 결과: [각 항목 결과]

검증 요청 항목:
1. 구조 순서 확인
2. 삭제 항목 잔재 없음 확인
3. Companion 링크 속성 확인
4. slim variant 렌더 확인
```
