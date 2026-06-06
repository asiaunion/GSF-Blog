# GSF-Blog Design Baseline
> Last Updated: 2026-06-07 (v-approved-20260607-header-footer-ui)

## 1. Header (Logo & Subtitle)
- **Tag**: `v-approved-20260607-header-footer-ui`
- **Spec**: GSF 메인 로고 영역 하단에 `Good Samaritan Flourishing` 서브타이틀(text-xs, uppercase) 추가됨. 
- **Layout**: `flex-col`로 배치되어 텍스트 간격 일치.

## 2. Footer (2-Row Layout)
- **Tag**: `v-approved-20260607-header-footer-ui`
- **Spec**: 푸터 영역 하이브리드(반응형) 2단 분리 레이아웃 완성.
- **Desktop (sm:)**: 
  - 1단: 좌측 주요 링크 (About / Contact / Privacy Policy), 우측 소셜 아이콘 배열
  - 2단: 좌측 정렬된 저작권 문구 (`Good Samaritan Flourishing` 포함)
- **Mobile**:
  - 중앙 정렬(`items-center`, `text-center`)로 모든 요소 수직 배치.

## 3. Contact Pages ("Let's talk" section)
- **Spec**: 연락처(Email) 직전에 도쿄 부동산 및 한일 투자 관련 가벼운 대화를 유도하는 안내 문구 추가됨.
- **Language**: KO, EN, JA 3개 국어에 모두 현지화 적용.

## 4. Snapshots Directory
- *Note*: 현재 런타임 환경 제약으로 물리적 스크린샷 캡처는 생략되었으나, 위 코드 태그(`v-approved-20260607-header-footer-ui`)를 통해 언제든 해당 시점의 UI 디자인으로 즉각 롤백 가능합니다.
