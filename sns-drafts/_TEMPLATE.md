# Social Broadcast Drafts (TEMPLATE)
**Post:** `<slug>`
**Date:** `YYYY-MM-DD`
**Cadence:** 신규 포스트 → X KO 1건만 먼저 (`docs/SNS_PILOT_CADENCE.md`)

> ⛔ **수동 작성 금지** — 베이스는 반드시 scheduler 출력에서 시작:
>
> ```bash
> cd projects/GSF-Ark
> python3 scripts/sns_scheduler.py --dry-run --rounds 1
> # 생성된 sns-drafts/YYYY-MM-DD-<slug>.md 를 이 구조에 맞게 편집
> pnpm validate:sns-draft --slug <slug>   # exit 0 필수
> ```

## X (Twitter)

### 🇰🇷 KO — 【1차 · 오늘】
(280 twitter-weighted chars 이하 · URL=23자 계산)
정보 제공 목적. (투자 카테고리 필수)
https://gsfark.com/ko/posts/<slug>/?utm_source=x&utm_medium=social&utm_campaign=blog-broadcast
#도쿄부동산 #일본부동산

### 🇺🇸 EN — 【2차 · KO 후 24h+】
For information purposes only.
(280 twitter-weighted chars 이하)
https://gsfark.com/posts/<slug>/?utm_source=x&utm_medium=social&utm_campaign=blog-broadcast
#TokyoRealEstate

> X 이미지: URL 카드만 쓰지 말고 `public/assets/images/blog/<slug>-hero-og.jpg` **미디어 직접 첨부** 권장.

## LinkedIn

### 🇺🇸 EN
*This post is for informational purposes only and does not constitute investment advice.
https://gsfark.com/posts/<slug>/?utm_source=linkedin&utm_medium=social&utm_campaign=blog-broadcast

### 🇰🇷 KO
*본 글은 정보 제공 목적이며 투자 권유가 아닙니다.
https://gsfark.com/ko/posts/<slug>/?utm_source=linkedin&utm_medium=social&utm_campaign=blog-broadcast

> 배포 후 [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) — EN·KO canonical URL 각각 Inspect.

## Threads

### 🇺🇸 EN
*Informational purposes only.
(500 chars 이하)
https://gsfark.com/posts/<slug>/?utm_source=threads&utm_medium=social&utm_campaign=blog-broadcast

### 🇰🇷 KO
정보 제공 목적.
(500 chars 이하)
https://gsfark.com/ko/posts/<slug>/?utm_source=threads&utm_medium=social&utm_campaign=blog-broadcast

## 수동 이미지 (카드 실패 시)
https://gsfark.com/assets/images/blog/<slug>-hero-og.jpg
