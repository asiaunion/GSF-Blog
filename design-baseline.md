# Design Baseline — Admin CMS

> 최종 승인: 2026-05-30 | 태그: `v-approved-20260530-modal-transparency-fixed`
> 이전 승인: 2026-05-30 (Phase 5-B Security & Final Audit) | 태그: `v-approved-20260530-admin-cms-final`
> 브랜치: `main`

## 승인된 디자인 사양

### 레이아웃 구조
- **AdminLayout.astro**: 전체 admin 페이지 공유 레이아웃 (헤더/테마/로그아웃 통합)
- **에디터**: 1단 노션 스타일 (`max-w-3xl` 중앙 정렬), 설정은 ⚙️ 슬라이드 드로어
- **PreviewPane**: 제거됨 (Milkdown Crepe WYSIWYG가 미리보기 역할)

### 테마 시스템
- CSS 변수 기반 (`--color-background`, `--color-foreground`, `--color-accent` 등)
- 다크/라이트 양쪽 정상 동작
- `prose dark:prose-invert` 조건부 적용
- 하드코딩 색상 전면 제거 완료

### 용어 규칙
- 모든 UI 라벨: 한국어 (영어 병기 금지)
- 개발자 용어 사용 금지 (slug→웹 주소, frontmatter→게시글 설정 등)
- 카테고리: 투자/안전/라이프/로컬/에세이

### 컴포넌트 토큰
```
bg-card-bg, bg-background, bg-muted
text-foreground, text-accent
border-border
rounded-2xl (카드/패널)
rounded-xl (버튼/인풋)
```

## 스크린샷 경로
- `snapshots/01-login-dark.png`
- `snapshots/02-login-light.png`
- `snapshots/03-dashboard-dark.png`
- `snapshots/04-dashboard-light.png`
- `snapshots/05-postlist-dark.png`
- `snapshots/06-postlist-light.png`
- `snapshots/07-editor-dark.png`
- `snapshots/08-editor-light.png`

*(Note: Phase 5-A Memo Expansion 스크린샷은 자동 캡처가 생략되었습니다. `MemoList`, `MemoCard`의 UI 형태는 기존 `design-baseline.md`의 기조를 따릅니다.)*

## 잔여 이슈 (Phase C/D) — ✅ 전건 해결
1. ~~카테고리 컬럼 영어(`Investment`)~~ → `categoryLabels` 매핑 추가, 한국어 표시 (`투자` 등)
2. ~~네이티브 `<select>` 드롭다운~~ → `CustomSelect.tsx` 커스텀 드롭다운 교체 (필터 2 + 모달 2 + 설정 1)
3. ~~Milkdown `r` 아티팩트 (라이트 모드)~~ → Crepe CSS 변수를 블로그 `data-theme` 기반으로 동기화 + `frame-dark.css` import + `Inter` 폰트 통일
