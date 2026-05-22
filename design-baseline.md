# GSF-Blog Design Baseline

## Approved States

- **2026-05-22**: Improved visual quality, CSS card legibility and alert layout on macro-barrier post - Tag: `v-approved-20260522-improved-ui`
  - 서울-도쿄 랜드마크(남산타워, 도쿄타워)가 양립하는 부동산 투자 저널 격조의 통합 3D WebP 이미지로 교체 (`macro-barrier-and-super-scarce-real-estate-selection-hero.webp`).
  - CSS 카드 내 하드코딩 글씨색 제거 및 테마 상속 텍스트 스타일 적용, 카드 배경/테두리를 범용 중성 톤(`rgba(128, 128, 128, 0.05)` / `0.15`)으로 교체하고, 왼쪽 테두리와 제목 색상을 블로그의 고유 그린 정체성 색(`var(--color-accent)`)으로 통일하여 완성도 증대.
  - 난해한 3D 추상 일러스트(`capital-dust-collector.webp`) 및 캡션 완전 삭제.
  - 마크다운 파서 깨짐 현상 차단 및 가독성 확보를 위해 Alert Box를 일반 마크다운 인용 블록(`> **[IMPORTANT] 자본의 집진기(Dust Collector) 효과 :** 유동성 축소라는 강력한 압력이 가해질수록, 상위 1%의 초희소 자산으로 자본이 더욱 단단하게 밀착되는 현상입니다. 거시 악재가 오히려 핵심지의 안전자산 지위를 방어해 주는 방패가 됩니다.`)으로 다듬고, 카드와 Alert Box 내 불필요하거나 뜬금없는 이모지(⚠️, 👑)를 모두 깔끔하게 삭제하여 고급스러운 에디토리얼 레이아웃을 구축.
- **2026-05-18**: Markdown Strikethrough Fix (singleTilde disabled) - Tag: `v-approved-20260518-strikethrough-fix`
  - Verified via live site deployment: ![Verification Screenshot](/Users/gsf/.gemini/antigravity/brain/dfd883cc-2aeb-4df7-88b1-b9d9ead82626/strikethrough_fix_verification_1779098758381.png)


