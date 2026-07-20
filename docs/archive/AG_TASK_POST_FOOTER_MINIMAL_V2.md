# AG Task: Post Footer Minimal Edition v2

> **작업자**: AG  
> **검증자**: Claude  
> **승인자**: Joseph  
> **베이스 브랜치**: `main` (Round 1 반영 완료)  
> **목표 브랜치**: `ui/post-footer-minimal-v2`  
> **목표**: 레이블 제거 + 폼 축소 + 여백 정리로 콘텐츠가 주인공인 레이아웃 완성

---

## 컨셉

> "무엇을 더 뺄까."

- 텍스트를 줄일수록 화면이 세련되어 보임
- 아이콘/입력창 자체가 기능을 설명하도록
- Newsletter는 강조 대상이 아니라 **자연스럽게 발견되는 CTA**

---

## 변경 사항 요약

| # | 항목 | 현재 | 변경 후 |
|---|------|------|---------|
| 1 | Share 레이블 | "Share this post:" (이탤릭) | **완전 제거** |
| 2 | Newsletter 레이블 | "STAY INFORMED" (uppercase) | **완전 제거** |
| 3 | Newsletter 입력창 | `flex-1` (넓게 확장) | 고정폭 축소 (`w-40 sm:w-48`) |
| 4 | Newsletter 버튼 | `px-4 py-2` | `px-3 py-1.5` (축소) |
| 5 | Author 카드 패딩 | `p-5` | `p-4` |
| 6 | Author 사진 크기 | `size-14` | `size-12` |
| 7 | Author 소개 텍스트 | 줄바꿈 포함 2줄 | 1줄로 압축 (줄바꿈 제거) |
| 8 | companionLine EN | "Practical life in Japan →" | "Practical Japan guides →" |
| 9 | companionLine KO | "일본 생활 실용 정보는 →" | "일본 실용 생활 가이드 →" |
| 10 | companionLine JA | "日本での暮らしガイドは →" | "日本の生活実用ガイドは →" |

---

## 수정 파일

1. `src/components/ShareLinks.astro` — `showLabel` prop 추가
2. `src/layouts/PostDetails.astro` — Share/Newsletter/Author 섹션 수정
3. `src/i18n/ui.ts` — authorEeatBody (3 로케일) + companionLine (3 로케일)

---

## 1. ShareLinks.astro — showLabel prop 추가

```astro
---
import { SHARE_LINKS } from "@/constants";
import LinkButton from "./LinkButton.astro";
import { parseLocalizedPath } from "@/utils/hreflang";
import { getUi, type UiLang } from "@/i18n/ui";

interface Props {
  showLabel?: boolean;
}
const { showLabel = true } = Astro.props;

const URL = Astro.url;
const normalized =
  URL.pathname.replace(/\/+$/, "") === "" ? "/" : URL.pathname.replace(/\/+$/, "");
const { locale } = parseLocalizedPath(normalized);
const L = getUi(locale as UiLang);
---

{
  SHARE_LINKS.length > 0 && (
    <div class="flex flex-none flex-col items-center justify-center gap-1 md:items-start">
      {showLabel && <span class="italic">{L.sharePostLead}</span>}
      <div class="text-center">
        {SHARE_LINKS.map(social => (
          <LinkButton
            href={`${social.href + URL}`}
            class="scale-90 p-2 hover:rotate-6 sm:p-1"
            title={social.linkTitle}
          >
            <social.icon class="inline-block size-6 scale-125 fill-transparent stroke-current stroke-2 opacity-90 group-hover:fill-transparent sm:scale-110" />
            <span class="sr-only">{social.linkTitle}</span>
          </LinkButton>
        ))}
      </div>
    </div>
  )
}
```

---

## 2. PostDetails.astro — Share + Newsletter 통합 블록 교체

기존 Share 섹션 + Newsletter 섹션을 아래 블록으로 완전 교체:

```astro
{/* Share + Newsletter — 레이블 없음, 한 줄 2칸 */}
<div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
  {/* 왼쪽: 아이콘만 */}
  <div class="flex-none">
    <ShareLinks showLabel={false} />
  </div>

  {/* 구분선 */}
  <div class="hidden sm:block w-px self-stretch bg-border"></div>
  <div class="block sm:hidden h-px w-full bg-border"></div>

  {/* 오른쪽: 작은 인라인 폼 */}
  <div class="bd-inline-wrapper flex-1 min-w-0">
    <form
      class="bd-form flex gap-2"
      data-endpoint="https://buttondown.com/api/emails/embed-subscribe/GSFArk"
      data-lang={navLang}
      data-variant="inline"
    >
      <label for="bd-email-footer" class="sr-only">{L.newsletterEmailLabel}</label>
      <input
        type="email"
        name="email"
        id="bd-email-footer"
        required
        placeholder={L.newsletterPlaceholder}
        class="min-w-0 w-40 sm:w-48 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/35 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      />
      <button
        type="submit"
        class="bd-btn shrink-0 rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
      >
        {L.newsletterCta}
      </button>
    </form>
    <p class="bd-msg mt-1.5 hidden text-xs font-medium" aria-live="polite"></p>
  </div>
</div>
```

> **중요**: `data-variant="inline"` + `bd-inline-wrapper` 클래스 — Newsletter JS 핸들러가 `.bd-msg`를 찾기 위해 반드시 필요

---

## 3. PostDetails.astro — Author 카드 수정

```astro
<section class="mt-8 rounded-xl border border-border bg-card p-4">
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

  <div class="mt-3 flex items-center gap-3">
    <img
      src={authorProfileImage}
      alt="GSF author"
      loading="lazy"
      decoding="async"
      class="size-12 shrink-0 rounded-full border border-border object-cover"
    />
    <p class="text-sm text-foreground/75 leading-snug">{L.authorEeatBody}</p>
  </div>
</section>
```

변경 포인트:
- `p-5` → `p-4`
- `mt-4` → `mt-3`, `gap-4` → `gap-3`
- `size-14` → `size-12`
- `leading-relaxed` → `leading-snug`

---

## 4. i18n/ui.ts — 3 로케일 수정

### EN (line ~113)
```
authorEeatBody:
  "Joseph. KIM is the founder and editor of GSFArk. Based in Nihonbashi, Tokyo. Living and investing in Japan since 2018.",
companionLine: "Practical Japan guides →",
```

### KO (line ~250)
```
authorEeatBody:
  "Joseph. KIM은 GSFArk의 설립자이자 편집자입니다. 도쿄 니혼바시에 거주하며, 일본 부동산과 장기 투자에 대해 연구하고 기록하고 있습니다.",
companionLine: "일본 실용 생활 가이드 →",
```

### JA (line ~386)
```
authorEeatBody:
  "Joseph. KIMはGSFArkの創設者兼編集者です。東京・日本橋を拠点に、日本不動産と長期投資について調査・執筆しています。",
companionLine: "日本の生活実用ガイドは →",
```

> **주의**: `\n` 제거가 핵심. 줄바꿈 없이 단일 문자열로.

---

## 5. hidden NewsletterForm 유지

PostDetails.astro 최하단에 아래 블록이 있어야 함 (JS 로드 목적):

```astro
<div class="hidden">
  <NewsletterForm variant="slim" lang={navLang} />
</div>
```

이 블록은 그대로 유지. 화면에 렌더되지 않지만 `<script>` 로드에 필요.

---

## 목표 구조 (변경 후)

```
태그

────────────────────────────────────────────

○ ○ ○ ○ ○    |    [ email______ ] [Subscribe]

────────────────────────────────────────────

ABOUT THE AUTHOR                  Author Profile →
[사진]  Joseph. KIM is the founder and editor...

────────────────────────────────────────────

Related Posts

────────────────────────────────────────────

Practical Japan guides → TokyoKorean.net

────────────────────────────────────────────

Discussion / Prev-Next / Footer
```

---

## Claude 검증 체크리스트

```
[ ] pnpm build exit 0
[ ] Share 아이콘 + Newsletter 폼이 한 줄(sm 이상)로 나란히 렌더됨
[ ] Share 레이블("Share this post:") 화면에 없음
[ ] Newsletter 레이블("STAY INFORMED") 화면에 없음
[ ] Newsletter 입력창 크기 축소 확인
[ ] Newsletter JS data-variant="inline" 확인
[ ] Author 카드 패딩/사진 축소 확인
[ ] Author 소개 1줄 렌더 확인 (줄바꿈 없음)
[ ] companionLine 텍스트 3 로케일 변경 확인
[ ] 모바일(375px) 세로 스택 확인
```

---

## Claude 핸드오프 형식

```
[AG → Claude] Post Footer Minimal v2 구현 완료

브랜치: ui/post-footer-minimal-v2
커밋: <hash>
빌드: exit 0

체크리스트:
- Share 레이블 제거: [결과]
- Newsletter 레이블 제거: [결과]
- 폼 축소: [결과]
- Author 카드 최소화: [결과]
- i18n 3 로케일: [결과]
- 모바일 레이아웃: [결과]
```
