## Deploy

- **공식:** `main` push → Vercel Git Integration 빌드·배포.
- **비상:** `scripts/deploy-prebuilt-prod.sh` (prebuilt). 일상 사용 금지.
- 태그 URL 정규화는 `patchVercelConfig` + 빌드 게이트가 SSOT.
- `merge-vercel-json-into-output.mjs`의 `isTagRedirect` 필터는 prebuilt 비상 경로 안전망으로 **유지**.
