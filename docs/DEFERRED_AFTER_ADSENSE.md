# AdSense 승인 후 후속 과제 (2026-07-04 Cursor)

심사 중에는 **콘텐츠 대량 변경·스키마 리팩터**를 피하고, 아래만 남김.

## 1. Author / Brand (GPT 모델 · Cursor 확정안)

**이미 적용 (심사 중 안전 범위):**
- `SITE.author`: `GSF` → `Joseph KIM` (`src/config.ts`) — JSON-LD 기본 Person.name
- 양도세 에피소드 3언어 frontmatter: `author: Joseph KIM`

**승인 후:**

| # | 과제 | 비고 |
|---|------|------|
| A1 | 전 포스트 `author: GSF` → `Joseph KIM` 일괄 치환 (KO/EN/JA) | string 유지, 스키마 변경 없음 |
| A2 | `SITE` 또는 author 컬렉션에 `organization: GSF`, `project: GSF-Ark` SSOT | 포스트 frontmatter에 객체 반복 금지 |
| A3 | JSON-LD: Person(Joseph KIM) + publisher/Organization(GSF) 명시 | `Layout.astro` |
| A4 | (선택) UI `authorEeatBody`를 `Founder of GSF · Editor of GSF-Ark` 톤으로 통일 | `src/i18n/ui.ts` — 이미 Joseph 표기됨 |
| A5 | **하지 않음(보류 유지):** 포스트마다 `author: { name, organization, project }` 객체 스키마 | 마이그레이션 부채 |

계층 SSOT (문서용):

```text
Joseph KIM (Person) → GSF (Brand) → GSF-Ark (Project)
```

## 2. 양도세 에피소드 편집 (GPT/Claude 개선안)

**KO만** 반영됨 (워킹트리/브랜치). **EN/JA 미반영.**

| # | 과제 |
|---|------|
| B1 | EN/JA에 KO와 동일 골격 동기화 (한눈에 보는 절차, GSF Note×2, 시간순 체크리스트, 매각 시 투자 체크포인트, 클로징 3단락) |
| B2 | KO: 연속 `---` 제거, 한국 신고 기한 문구를 「양도일이 속하는 달의 말일부터 2개월」로 통일 |
| B3 | (선택) 관련 글 섹션 분리 — 현재는 본문 인라인 링크만 |

## 3. 기타 (이전 세션에서 미룬 항목)

| # | 과제 |
|---|------|
| C1 | 히어로 1MB+ 경량화 (webp/avif, 긴 변 ~1200px) |
| C2 | 기존 포스트 `author: GSF` 잔존분과 meta author 일관성 전수 |
| C3 | Phase 2b: taxonomy alias 정리·태그 rename (다마→多摩 등) |
| C4 | Tokyo CI 휴리스틱 본보정 (`continue-on-error` advisory → 실제 초록) |
| C5 | topicHubs 라이프 저밀도 글 노출 축소 (플래그십·크로스보더로 교체) |

## 참조

- GPT Author/Brand 제안 + Claude 단계안 + Cursor 확정: 2026-07-04 세션
- 양도세 slug: `korea-resident-japan-property-capital-gains-tax`
- 출처 수정: No.1923 납세관리인 (`c38283f`)
