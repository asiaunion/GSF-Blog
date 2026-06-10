# GSF-Blog Design Baseline

> 이 파일은 사용자가 승인한 디자인 스냅샷을 기록합니다.
> 새 세션 에이전트는 이 파일을 **반드시 먼저 읽고** 작업을 시작해야 합니다.

---

## ✅ 승인 스냅샷: LangBanner UX

- **승인일**: 2026-06-10
- **Git Tag**: `v-approved-20260610-lang-banner`
- **Branch**: `ui/lang-switcher-ux`
- **Commit**: `8e7aacd` (fix: LangBanner 위치/레이아웃 최종 확정)

---

## 확정된 디자인 사양

### LangBanner 컴포넌트
- **위치**: `<a id="skip-to-content">` 다음, `<header>` **바깥** (header flex 충돌 방지)
- **레이아웃**: `w-full border-b border-border bg-background py-1.5`
- **내부 정렬**: `app-layout` 컨테이너 + `justify-end` → GSF "G" 라인 우측 끝에 정렬
- **언어 버튼 레이블**: `🇺🇸 EN` / `🇰🇷 KO` / `🇯🇵 JA` (국기 이모지 + 2자리 코드)
- **현재 언어 강조**: `font-bold text-accent border border-accent`
- **닫기 동작**: `sessionStorage` 세션 단위 (페이지 재방문 시 재표시)
- **이벤트 중복 방지**: `cloneNode(true)` + 모듈 레벨 외부 클릭 핸들러 1회 등록

### Header 네비게이션
- **기존 LanguageSwitcher**: 데스크탑 + 모바일 **모두 제거** (LangBanner로 대체)
- **top-nav-wrap 패딩**: `py-0.5 sm:py-1` (슬림 네비 스타일)

### 파일 구조
| 파일 | 역할 |
|------|------|
| `src/utils/getLangUrl.ts` | 언어 URL 생성 유틸 (LangBanner/LanguageSwitcher 공유) |
| `src/components/LangBanner.astro` | 언어 선택 배너 컴포넌트 |
| `src/components/Header.astro` | LangBanner 삽입, LanguageSwitcher 제거, 패딩 축소 |
| `src/i18n/ui.ts` | `langBannerEn/Ko/Ja/Text/Close` 키 3개 언어 블록 |

---

## 다음 작업 시 주의사항

- LangBanner는 `<header>` **밖**에 있어야 함. header 안으로 이동 시 flex row 레이아웃 깨짐
- `LanguageSwitcher.astro`는 현재 미사용 상태 (삭제 가능하나 보존 중)
- 이 브랜치는 아직 main 머지 대기 중
