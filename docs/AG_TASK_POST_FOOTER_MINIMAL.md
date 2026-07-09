# AG Task: Post Footer Minimal Edition

> **작업자**: AG  
> **검증자**: Claude  
> **승인자**: Joseph  
> **브랜치**: `ui/post-footer-minimal`  
> **목표**: 스크롤 최소화. 본문 종료 후 한 화면 안에서 핵심 요소가 모두 보이도록.

---

## 컨셉 원칙

> "무엇을 더 넣을까보다 무엇을 더 뺄까."

- Aesop / Apple / Linear 스타일 — 요소가 적어서가 아니라 필요한 것만 남겨서 세련됨
- 세로 공간 절약이 목표. 같은 기능, 더 적은 공간
- 새 컴포넌트 파일 생성 금지. `PostDetails.astro` 인라인 수정으로 해결

---

## 변경 사항 요약

| 변경 | 내용 |
|------|------|
| Share + Newsletter 통합 | 좌우 2칸 한 줄 레이아웃으로 교체 |
| `NewsletterForm` 컴포넌트 호출 제거 | 인라인 폼으로 대체 |
| Author 카드 헤더 | 제목 좌 + "프로필 →" 링크 우 (같은 줄) |
| Author 버튼 행 | 완전 삭제 (Profile 버튼 1개도 제거) |
| Author 본문 | `authorEeatBody` 유지, 사진 + 텍스트만 |
| TokyoKorean 한 줄 | 현재 위치·형태 그대로 유지 |

---

## 목표 구조

```
태그                                           (변경 없음)

────────────────────────────────────────────

이 글 공유                    뉴스레터 구독
○ ○ ○ ○ ○    [ your@email.com ] [구독하기]

────────────────────────────────────────────

작성자 소개                      작성자 프로필 →
[사진]  Joseph KIM ...2줄 소개

────────────────────────────────────────────

Related Posts

────────────────────────────────────────────

일본 생활 실용 정보 → TokyoKorean.net

────────────────────────────────────────────

Comments / Prev-Next / Footer
```

---

## 수정 파일

`src/layouts/PostDetails.astro` **만** 수정. 다른 파일 변경 없음.

---

## 1. Share + Newsletter 통합 블록

기존 `<ShareLinks />` 단독 호출과 하단의 `<NewsletterForm variant="slim" .../>` 호출을 **모두 제거**하고, 아래 블록 하나로 교체한다.

```astro
{/* Share + Newsletter — 한 줄 2칸 */}
<div class="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">

  {/* 왼쪽: Share */}
  <div class="flex-none">
    <p class="text-xs font-medium uppercase tracking-widest text-foreground/40">
      {L.sharePostLead}
    </p>
    <div class="mt-2 flex items-center gap-1">
      <ShareLinks />
    </div>
  </div>

  {/* 구분선 — 세로(sm 이상)·가로(sm 미만) */}
  <div class="hidden sm:block w-px self-stretch bg-border"></div>
  <div class="block sm:hidden h-px w-full bg-border"></div>

  {/* 오른쪽: Newsletter inline */}
  <div class="flex-1 min-w-0">
    <p class="text-xs font-medium uppercase tracking-widest text-foreground/40">
      {L.newsletterTitle}
    </p>
    <form
      class="bd-form mt-2 flex gap-2"
      data-endpoint="https://buttondown.com/api/emails/embed-subscribe/GSFArk"
      data-lang={navLang}
      data-variant="card"
    >
      <label for="bd-email-footer" class="sr-only">{L.newsletterEmailLabel}</label>
      <input
        type="email"
        name="email"
        id="bd-email-footer"
        required
        placeholder={L.newsletterPlaceholder}
        class="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/35 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      />
      <button
        type="submit"
        class="bd-btn shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
      >
        {L.newsletterCta}
      </button>
    </form>
    <p class="bd-msg mt-2 hidden text-xs font-medium" aria-live="polite"></p>
  </div>

</div>
```

> **주의 1**: `<ShareLinks />` import는 유지. 하지만 ShareLinks 컴포넌트 자체는 아이콘 버튼 렌더만 하므로 외부 래퍼(`flex flex-col items-center`)가 겹칠 수 있음. ShareLinks 내부 래퍼 div의 클래스를 덮어쓰려면 ShareLinks를 직접 인라인 전개하거나, ShareLinks에 `class` prop 전달이 가능한지 확인. **불가능하면 ShareLinks 대신 SHARE_LINKS 배열을 직접 PostDetails에서 import해서 렌더**해도 됨.

> **주의 2**: `NewsletterForm` 컴포넌트 import 라인은 **제거**. 인라인 폼으로 대체했으므로 불필요.

> **주의 3**: `bd-form` 폼의 JS submit 핸들러는 기존 `NewsletterForm.astro`의 `<script>` 블록이 담당한다. `NewsletterForm` 컴포넌트 import를 완전히 제거하면 이 스크립트도 사라진다. 따라서 **`NewsletterForm`을 화면에 렌더하지 않되 스크립트만 로드되도록** 처리해야 한다.

  해결 방법 — PostDetails.astro 최하단에 아래 추가:
  ```astro
  {/* Newsletter submit 핸들러 — 인라인 폼용 */}
  <NewsletterForm variant="slim" lang={navLang} class="hidden" />
  ```
  또는 `NewsletterForm.astro`의 `<script>` 내용을 PostDetails.astro에 직접 복사. **두 방법 중 더 안전한 것 선택.**

---

## 2. Author 카드 — 헤더 수정

기존:
```astro
<section class="mt-10 rounded-xl border border-border bg-card p-5">
  <h2 class="text-lg font-semibold">{L.authorCardTitle}</h2>
  <div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
    <img ... />
    <div class="flex-1">
      <p ...>{L.authorEeatBody}</p>
      <div class="mt-3 flex flex-wrap gap-2">
        <a href=".../author/joseph-kim/">{L.authorEeatProfileCta}</a>
      </div>
    </div>
  </div>
</section>
```

변경 후:
```astro
<section class="mt-8 rounded-xl border border-border bg-card p-5">
  {/* 제목 좌 + 프로필 링크 우 — 같은 줄 */}
  <div class="flex items-center justify-between">
    <h2 class="text-sm font-semibold text-foreground/60 uppercase tracking-widest">
      {L.authorCardTitle}
    </h2>
    <a
      href={`${localePrefix}/author/joseph-kim/`}
      class="text-sm text-foreground/50 transition hover:text-accent"
      data-cta="author-profile"
      data-cta-location="post-author-card"
    >
      {L.authorEeatProfileCta} →
    </a>
  </div>

  {/* 사진 + 소개 */}
  <div class="mt-4 flex items-center gap-4">
    <img
      src={authorProfileImage}
      alt="GSF author"
      loading="lazy"
      decoding="async"
      class="size-14 shrink-0 rounded-full border border-border object-cover"
    />
    <p class="text-sm leading-relaxed text-foreground/75">{L.authorEeatBody}</p>
  </div>
</section>
```

변경 포인트:
- `h2` 스타일: `text-lg font-semibold` → `text-sm font-semibold text-foreground/60 uppercase tracking-widest` (섹션 레이블 느낌)
- Profile 링크를 헤더 우측으로 이동, 버튼 스타일 → 텍스트 링크 스타일
- `<div class="mt-3 flex flex-wrap gap-2">` 버튼 행 완전 삭제
- 이미지 크기: `size-20` → `size-14` (한 단계 축소)

---

## 최종 PostDetails.astro 순서 (변경 후)

```
태그 (ul.tags)
<hr>                              ← 구분선 추가 (기존 hr 위치 재활용)
Share + Newsletter 통합 블록     ← 신규
Author 카드 (최소형)              ← 수정
RelatedPosts
TokyoKorean 한 줄               ← 변경 없음
GiscusComments
<hr>
Prev/Next
```

`<NewsletterForm variant="slim">` 호출은 스크립트 로드 목적으로만 `hidden` 처리하거나 스크립트를 직접 포함. **렌더된 HTML에 slim 카드가 보여서는 안 됨.**

---

## 검증 체크리스트 (Claude 확인 항목)

```
[ ] pnpm build exit 0
[ ] Share 아이콘 + Newsletter 폼이 한 줄(sm 이상)로 나란히 렌더됨
[ ] Newsletter 폼 submit 동작 확인 (JS 핸들러 로드 여부)
[ ] slim Newsletter 카드가 화면에 보이지 않음 (hidden 또는 미렌더)
[ ] Author 카드: 제목+프로필링크 한 줄, 사진+소개만 아래
[ ] Author 카드에 독립 버튼 행 없음
[ ] RelatedPosts가 Author 카드 바로 아래
[ ] TokyoKorean 한 줄 변경 없음
[ ] KO/EN/JA 3개 로케일 렌더 확인
[ ] 모바일(375px)에서 Share/Newsletter 세로 스택 확인
```

---

## Claude 핸드오프 형식

```
[AG → Claude] Post Footer Minimal 구현 완료

브랜치: ui/post-footer-minimal
커밋: <hash>
빌드: exit 0

체크리스트 결과:
- Share + Newsletter 통합: [결과]
- Newsletter JS 동작: [결과]
- Author 카드 최소형: [결과]
- 3 로케일 렌더: [결과]
- 모바일 레이아웃: [결과]
```
