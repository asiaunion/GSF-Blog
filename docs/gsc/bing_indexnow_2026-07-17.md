# Bing 웹마스터 도구 & IndexNow (W0-BING)

- **등록일**: 2026-07-17
- **사이트맵 제출**: `https://gsfark.com/sitemap-index.xml` + `sitemap-0.xml` (189 URL) · 언더스코어 `sitemap_index` 구항목 삭제
- **IndexNow Key**: `0dc6bcd07ea480ccad4946b289a714b2`
- **Key URL**: `https://gsfark.com/0dc6bcd07ea480ccad4946b289a714b2.txt` → **라이브 HTTP 200**
- **테스트 ping** (2026-07-17 Cursor):  
  - `POST https://api.indexnow.org/indexnow` → **202 Accepted**  
  - `POST https://www.bing.com/indexnow` → **202 Accepted**  
  - 대상: `https://gsfark.com/ko/posts/tokyo-korean-community-beyond-shinokubo/`
- **운영**: `docs/ops/INDEXNOW.md` — refresh/발행 후 N7에서 수동 ping
- **상태**: 키·엔드포인트 **개통 확인**. 주간 운영 습관(N7 ping)만 유지하면 됨.
