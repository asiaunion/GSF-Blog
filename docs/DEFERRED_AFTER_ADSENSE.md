# GSF-Ark 후속 과제 백로그 (Cursor 관리 SSOT)

> **Owner:** Cursor  
> **Gate:** AdSense 승인 메일 수신 후 착수 (그 전 대량 콘텐츠·스키마 변경 금지)  
> **갱신:** 항목 완료 시 이 파일에서 `status`를 `done`으로 바꾸고 ACTIVITY_LOG에 `hub:log --author=Cursor`  
> **작성:** 2026-07-04

## Cursor 운영 규칙

1. GSF-Ark 세션 **부트 시** 이 파일을 읽고, `status: open` 항목을 컨텍스트에 올린다.
2. Joseph가 AdSense 승인·후속 작업을 언급하면 **이 백로그 우선순위(P0→P2)** 로 제안한다.
3. 항목 완료·범위 변경·보류 사유는 **이 파일에만** 기록한다 (채팅만으로 끝내지 않음).
4. AG에 위임할 항목은 이 파일 `#`를 인용해 `GSF-OS/AG_TASK_*.md`를 작성한다.

**계층 SSOT (Author/Brand):**

```text
Joseph KIM (Person) → GSF (Brand) → GSF-Ark (Project)
```

---

## 이미 적용 (심사 중 · 재작업 불필요)

| ID | 내용 | commit |
|----|------|--------|
| DONE-1 | `SITE.author` = Joseph KIM | `b6fe9ac` |
| DONE-2 | 양도세 에피소드 3언어 `author: Joseph KIM` | `b6fe9ac` |
| DONE-3 | 양도세 출처 No.1923 납세관리인 | `c38283f` |
| DONE-4 | KO 편집 개선안 (한눈에 절차·GSF Note·체크리스트 등) | `b6fe9ac` (KO only) |

---

## Open backlog

### P0 — AdSense 승인 직후 (EEAT·정합성)

| ID | status | 과제 | 비고 |
|----|--------|------|------|
| A1 | open | 전 포스트 `author: GSF` → `Joseph KIM` 일괄 치환 (KO/EN/JA) | string 유지, 스키마 변경 없음 |
| A2 | open | `SITE` 또는 author 컬렉션에 `organization: GSF`, `project: GSF-Ark` SSOT | 포스트 frontmatter에 객체 반복 금지 |
| A3 | open | JSON-LD: Person(Joseph KIM) + publisher/Organization(GSF) 명시 | `Layout.astro` |
| A4 | open | (선택) UI `authorEeatBody`를 `Founder of GSF · Editor of GSF-Ark` 톤으로 통일 | `src/i18n/ui.ts` |
| A5 | cancelled | 포스트마다 `author: { name, organization, project }` 객체 스키마 | **영구 비목표** (마이그레이션 부채) |

### P1 — 양도세 에피소드 마무리

| ID | status | 과제 | 비고 |
|----|--------|------|------|
| B1 | open | EN/JA에 KO와 동일 골격 동기화 | 한눈에 절차, GSF Note×2, 시간순 체크리스트, 매각 시 투자 체크포인트, 클로징 |
| B2 | open | KO: 연속 `---` 제거, 한국 신고 기한 「양도일이 속하는 달의 말일부터 2개월」 | |
| B3 | open | (선택) 관련 글 섹션 분리 | 현재 본문 인라인 링크만 |

Slug: `korea-resident-japan-property-capital-gains-tax`  
브랜치(당시): `fix/tag-capital-gains-episode`

### P2 — 품질·운영

| ID | status | 과제 | 비고 |
|----|--------|------|------|
| C1 | open | 히어로 1MB+ 경량화 (webp/avif, 긴 변 ~1200px) | |
| C2 | open | `author: GSF` 잔존·meta author 전수 (A1과 병합 가능) | |
| C3 | open | Phase 2b: taxonomy alias 정리·태그 rename (다마→多摩 등) | |
| C4 | open | Tokyo CI 휴리스틱 본보정 | 현재 `continue-on-error` advisory |
| C5 | open | topicHubs 라이프 저밀도 노출 축소 | 플래그십·크로스보더로 교체 |

---

## 완료 로그

| 날짜 | ID | 메모 |
|------|-----|------|
| 2026-07-04 | DONE-1..4 | AdSense 심사 중 안전 범위만 적용 |

---

## 참조

- 2026-07-04 세션: GSC 리디렉션 · Phase1–3 · 양도세 에피소드 · Author/Brand
- AGENTS.md § Cursor backlog
- `.cursor/rules/gsf-ark-deferred-backlog.mdc`
