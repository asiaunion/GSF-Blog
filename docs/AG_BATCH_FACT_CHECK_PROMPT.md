# AG 배치 지시: 기발행 전체 포스트 팩트·신뢰성 1차 감사

> **용도:** 아래 `## AG에 붙여넣기` 블록을 Antigravity에 **그대로 복사**해 실행한다.  
> **역할:** 1차 조사·팩트 시트 **초안**만. **Cursor가 2차 재검증·md 수정·배포.**  
> **정본 레포:** `/Users/gsf/.gemini/antigravity/scratch/projects/GSF-Blog`

---

## AG에 붙여넣기 (시작)

```markdown
# [GSF-Blog] 기발행 전체 포스트 — 팩트·신뢰성 1차 감사 (초안만)

## 역할
GSF-Blog Track 1 담당. **이미 발행된** ko/en/ja 마크다운 전체에 대해 **팩트 시트 초안**과 **의심 구간 목록**을 만든다.
**2차 검증·본문 수정·validate 통과·git commit/push/Vercel 배포는 Cursor·사용자** — 너는 **조사·초안·보고만**.

## Knowledge / 정책 (반드시 준수)
- Knowledge `gsf_blog_content_source_integrity` — **출처 없는 수치·통계 금지**, Source-Gated Claim
- `docs/BLOG_FACT_CHECK_WORKFLOW.md`
- `docs/templates/blog-fact-sheet.md` — 글마다 이 형식
- `BLOG_AGENT_AUTOMATION_RUNBOOK.md` § Gate failure remediation

## 프로젝트 경로
- Repo: `/Users/gsf/.gemini/antigravity/scratch/projects/GSF-Blog`
- 포스트: `src/data/blog/{ko,en,ja}/<slug>.md`
- **제외:** `_integrity-example-*`, `_template-*`, `ko/` `en/` `ja/` **밖** 파일

## 절대 금지
1. **md 본문·frontmatter 수정** (오타·숫자·sources 포함) — Cursor 전까지
2. `git commit` / `git push` / `apply_publish` / 배포
3. 출처 URL **없이** 수치·법적 기준·%·엔·원 **확정** 또는 “검증 완료” 보고
4. tier-1이 아닌 URL만으로 숫자 **정당화**
5. `pnpm validate:post` 실패를 네가 **직접 고쳤다**고 주장 (게이트 수정은 Cursor)

## 해야 할 일 (슬러그당)

### A. 기계 스캔 기록 (읽기만)
각 slug에 대해 (가능하면):
```bash
cd /Users/gsf/.gemini/antigravity/scratch/projects/GSF-Blog
pnpm validate:post <slug>
```
- exit 0 / 1, `failed` 배열 **그대로** 보고서에 복사
- **FAIL이어도** 팩트 시트 작업은 계속 (게이트 ≠ 사실 검증)

### B. 팩트 시트 초안
경로: `docs/fact-audit/<slug>.md`  
템플릿: `docs/templates/blog-fact-sheet.md`

**Claims 표** — KO 본문에서 아래 **전부** 추출:
- 숫자·%·배수·금액(엔·원·달러)
- 날짜·연도·기간·“N년 연속”
- 법적 요건·비자·세율·면적·공실률·지가·수익률 등 **검증 가능한 주장**

각 claim에:
| 필드 | 규칙 |
|------|------|
| KO 인용 | 본문 그대로 짧게 |
| tier-1 URL 후보 | `.go.jp` `.go.kr` `.gov` `.or.jp` `boj.or.jp` `reins.or.jp` 등 — **없으면** `[검토 필요]` |
| Verified ✓ | **체크하지 말 것** — Cursor용 빈칸 |
| 비고 | 출처 불일치·구식·환각 의심 |

### C. sources / references 감사
- `references ⊆ sources` 여부 (코드 기준)
- `sources`에 있으나 본문 주장과 **무관한 URL** 표시
- 본문 수치를 뒷받침하지 못하는 `sources` 표시

### D. ko / en / ja 사실 드리프트
**숫자·고유명사·날짜·법 조항**만. 문체·번역 품질은 제외.
불일치 시: `docs/fact-audit/<slug>.md` 하단 `## Locale drift` 표

### E. 위험 등급 (슬러그당 1개)
| 등급 | 기준 |
|------|------|
| **P0** | 출처 없는 금융·부동산·세금·비자 수치, 허위 가능, YMYL |
| **P1** | 구식 통계·연도 불일치·sources 불충분 |
| **P2** | 게이트만 FAIL, 산책·체험담·이미지·면책 |
| **P3** | 경미·스타일 |

## 우선순위 (처리 순서)

**Wave 1 — P0 후보 (먼저)**  
- `tokyo-korean-community-beyond-shinokubo` (과거 무출처 Section 6 이슈 — Knowledge 참고)
- `korea-japan-inheritance-gift-tax-cross-border-basics`
- `japan-visa-paths-permanent-business-manager-asset-holders`
- `japan-corporate-vs-personal-rental-after-tax-sketch`
- `tokyo-real-estate-investment-complete-guide`
- `tokyo-6-wards-real-estate-insight`
- `tokyo-office-vacancy-five-wards-2026`
- `tokyo-mansion-tsubo-chiyoda-chuo-minato`
- `tokyo-small-rental-yield-vs-capital-gain-breakeven`
- `weak-yen-korean-japan-asset-allocation-fx-scenarios`
- `three-things-when-fx-shakes`
- `reading-korea-japan-markets-together`
- `j-reit-five-things-to-know`
- `hotel-reit-vs-office-reit-post-covid`
- `japan-rate-hike-cycle-j-reit-three-lessons`
- `japan-real-estate-three-things`

**Wave 2 — 지역·재개발·산책 (수치 적은 글 우선 스캔)**  
- `ginza-weekend-walking-guide`, `ginza-marunouchi-walk-dna`
- `nihonbashi-*`, `coredo-nihonbashi-mitsui-redevelopment`
- `tokyo-ward-guide-series-prologue`, `tokyo-core-3-wards-chiyoda-chuo-minato`
- `tokyo-shinjuku-shibuya-bunkyo`, `tokyo-five-sophisticated-spots`
- `tokyo-earthquake-vulnerable-five-areas`
- `tokyo-buying-process-step-by-step`, `tokyo-moving-contracts-two-notes`
- `tokyo-museums-with-kids-five-picks`, `tokyo-yokohama-fuji-transport-pass`
- `tsukiji-to-toyosu-morning-tokyo`
- `one-failure-three-lessons-postmortem`, `why-warm-investing-holds`

## 전체 slug 목록 (35)

```
coredo-nihonbashi-mitsui-redevelopment
ginza-marunouchi-walk-dna
ginza-weekend-walking-guide
hotel-reit-vs-office-reit-post-covid
j-reit-five-things-to-know
japan-corporate-vs-personal-rental-after-tax-sketch
japan-rate-hike-cycle-j-reit-three-lessons
japan-real-estate-three-things
japan-visa-paths-permanent-business-manager-asset-holders
korea-japan-inheritance-gift-tax-cross-border-basics
nihonbashi-hamacho-supermarket-peacock-city-life
nihonbashi-hamacho-walking-guide
nihonbashi-mitsui-redevelopment-pipeline-three
nihonbashi-the-origin-of-japan
one-failure-three-lessons-postmortem
reading-korea-japan-markets-together
three-things-when-fx-shakes
tokyo-6-wards-real-estate-insight
tokyo-buying-process-step-by-step
tokyo-core-3-wards-chiyoda-chuo-minato
tokyo-earthquake-vulnerable-five-areas
tokyo-five-sophisticated-spots
tokyo-korean-community-beyond-shinokubo
tokyo-mansion-tsubo-chiyoda-chuo-minato
tokyo-moving-contracts-two-notes
tokyo-museums-with-kids-five-picks
tokyo-office-vacancy-five-wards-2026
tokyo-real-estate-investment-complete-guide
tokyo-shinjuku-shibuya-bunkyo
tokyo-small-rental-yield-vs-capital-gain-breakeven
tokyo-ward-guide-series-prologue
tokyo-yokohama-fuji-transport-pass
tsukiji-to-toyosu-morning-tokyo
weak-yen-korean-japan-asset-allocation-fx-scenarios
why-warm-investing-holds
```

## 산출물 (필수)

### 1) 마스터 인덱스 (1파일)
`docs/fact-audit/INDEX.md`

| slug | P0/P1/P2/P3 | validate:post | claims 수 | [검토 필요] 수 | drift | fact sheet |
|------|-------------|---------------|-----------|--------------|-------|------------|
| ... | | PASS/FAIL | | | Y/N | link |

### 2) 슬러그별 팩트 시트
`docs/fact-audit/<slug>.md` × 35 (없는 글은 행에 “파일 없음”)

### 3) 최종 보고 (채팅 + `docs/fact-audit/AG_PHASE1_REPORT.md`)

```markdown
## 요약
- 처리 slug: N/35
- P0: n건 (목록)
- [검토 필요] claim 총 m건
- validate:post PASS: x / FAIL: y (FAIL 상위 5개 gate 이름)

## Cursor에 넘길 작업
1. P0 slug부터 URL 대조·md 수정
2. …

## AG가 수정하지 않은 것 (확인)
- [ ] ko/en/ja md 미변경
- [ ] git push 없음
```

## 작업 방식
- **한 번에 5~7 slug**씩 Wave 순서대로. 35개 끝날 때까지 반복.
- 막히면 slug 건너뛰고 INDEX에 `blocked: 이유` 기록.

## 완료 정의 (AG 기준)
- 35 slug 전부 INDEX 행 존재
- P0/P1 slug는 fact sheet에 **모든 수치** 행 존재
- `AG_PHASE1_REPORT.md` 저장
- **“발행 가능/검증 완료” 문구 사용 금지** — 반드시 **「1차 초안 완료, Cursor 재검증 대기」**

작업 시작 시 먼저 `docs/fact-audit/` 폴더를 만들고 Wave 1 첫 slug부터 진행해줘.
```

---

## Cursor 2차 지시 (AG 완료 후 사용자가 Cursor에 붙여넣기)

```markdown
AG 1차 팩트 감사가 끝났어. `docs/fact-audit/INDEX.md`와 P0 slug부터 재검증해줘.
- tier-1 URL 직접 확인 후 md 최소 수정
- `pnpm validate:post <slug>` exit 0
- 커밋은 슬러그 묶음별로 내가 요청할 때만
```

---

## 참고 (2026-05-25 스캔)

전체 35 slug `pnpm validate:post` 일괄 실행 시 **당시 전부 FAIL** (예: `ko-formal-tone`, `disclaimer-present` 등 게이트).  
→ AG는 FAIL **기록**만 하고, 게이트 수정은 Cursor 단계에서 처리.
