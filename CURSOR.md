# Cursor workspace (안티그래비티 기준 단일 원본)

**정본(canonical) 경로:** `/Users/gsf/.gemini/antigravity/scratch/apps/GSF-Blog`

| | 경로 |
|---|---|
| **안티그래비티 (정본)** | `/Users/gsf/.gemini/antigravity/scratch/apps/GSF-Blog` |
| **Cursor (아카이브 예정)** | `/Users/gsf/dev/Cursor/gsf-blog` |
| **Git remote** | `git@github.com:asiaunion/GSF-Blog.git` |

## 동기화

- Cursor에서 작업할 때는 위 **정본 경로**를 워크스페이스로 엽니다.
- `~/dev/Cursor/gsf-blog` 는 2026-05-19 기준 아카이브 대상 복제본입니다.

## 부가 자료

`docs/antigravity-context/` — 스크래치·브레인에서 가져온 스펙·진단 문서  
`docs/antigravity-knowledge/` — 안티그래비티 knowledge (`gsf_blog_*`) 스냅샷

## 로컬 실행

```bash
cp .env.example .env   # 최초 1회
npm install
npm run dev
```
