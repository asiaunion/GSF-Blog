# AG 컨텍스트 — 초단문 (복사용)

> 전문: [`AG_CONTEXT_BOOTSTRAP_20260525.md`](./AG_CONTEXT_BOOTSTRAP_20260525.md)

---

## 붙여넣기

```markdown
# [GSF-Blog] AG 컨텍스트 (short) — 2026-05-25+

역할: AG=ko/en/ja 원고·시트·repo / Cursor=validate / commit·deploy=사용자만.

필수 읽기(순): `docs/GSF_BLOG_SESSION_ARCHIVE_20260525.md` → `docs/fact-audit/T3_POLICY.md` → `docs/BLOG_AG_CURSOR_WORKFLOW.md`

고정:
- T3 **P0-only** (12 slug 스팟). fetch ON 35/35·시트 전행 [x] **목표 아님**. `T3_DEFERRED`≠백로그.
- 면책: **md에 넣지 말 것** → `src/lib/postDisclaimer.ts` + frontmatter `category`. 하단 ## 면책/이탤릭 금지.
- 그림: 포스트는 `/assets/images/blog/diagrams/*.webp` 만. svg 편집→sanitize→render. 인라인 `<svg>` 금지.
- 금지어: 반드시/무조건/guaranteed 등.
- 경로: `src/data/blog/{ko,en,ja}/<동일-slug>.md(x)` · 수치 3언어 parity.

끝낼 때:
`[AG→Cursor] slug: … / validate:post 요청 / footer면책·svg링크·bulk T3 [x] 안 함`

첫 답 (3줄):
`[GSF-Blog AG short OK]` + T3정책 1줄 + 면책·diagram 각 1줄. 틀리면 archive 재독.

이후 지시는 이 전제 유지.
```

## AG 메모리 1줄

```
GSF-Blog: docs/GSF_BLOG_SESSION_ARCHIVE_20260525.md + docs/fact-audit/T3_POLICY.md SSOT. No footer disclaimer, no .svg in posts, no full-sheet T3.
```
