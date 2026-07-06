# GSF-Ark JA 전수 교정 리포트 (배치 1~5)

- 작성일자: 2026-07-06
- 작성자: AG (AntiGravity) + Cursor (배치 3~5 마무리·전수 검증)
- 대상: `src/data/blog/ja/` 내 50개 파일
- 선행: Phase 2 EN 50/50 완료 (`main` `1862e38`, prod 배포 완료)
- 검증 상태: **Cursor PASS** — JA 50/50 (hangul 0건, `pnpm build` PASS, Redirect Gate 1876 PASS)

## 교정 내역 요약

### 배치 1/5 (파일 1~10: buying-property-japan-checklist ~ japan-real-estate-three-things)

| 파일명 | 줄 번호 | Before | After | 사유 | 확신도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ginza-weekend-walking-guide.md` | 79 | Kyobunkand | Kyobunkan | 고유명사 오타 수정 (교분칸 로마자 표기) | 100% |
| `japan-real-estate-three-things.md` | 69 | 1,950,000円 / 3,300,000円 | 195万円 / 330万円 | 숫자 표기(만 단위) 일관성 확보 | 100% |
| `ginza-marunouchi-walk-dna.md` | 43 | 44,400,000円 | 4,440万円 | 숫자 표기(만 단위) 일관성 확보 | 100% |

### 배치 2/5 (파일 11~21: japan-shinchiku ~ reading-korea-japan)

| 파일명 | 줄 번호 | Before | After | 사유 | 확신도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `japan-visa-paths-permanent-business-manager-asset-holders.md` | 41 | しか㈁2025年 | しかし、2025年 | 한글 잔재(㈁) 및 오타 교정 | 100% |
| `korea-resident-japan-property-capital-gains-tax.md` | 121 | 100,000,000円 | 1億円 | 숫자 표기(억 단위) 일관성 확보 | 100% |

### 배치 3/5 (파일 22~31: three-things-when-fx-shakes ~ tokyo-korean-community-beyond-shinokubo)

| 파일명 | 줄 번호 | Before | After | 사유 | 확신도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `tokyo-adachi-katsushika-edogawa.md` | 224, 232, 238 | インサイト１、２、３ | インサイト1、2、3 | 숫자 반각 표기 통일 | 100% |

### 배치 4/5 (파일 32~41: tokyo-mansion-market-reins ~ tokyo-shinjuku-shibuya-bunkyo)

| 파일명 | 줄 번호 | Before | After | 사유 | 확신도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| (이상 없음) | — | — | — | 10개 파일 전수 검토, 수정 대상 없음 | — |

### 배치 5/5 (파일 42~51: tokyo-small-rental-yield ~ why-warm-investing-holds)

| 파일명 | 줄 번호 | Before | After | 사유 | 확신도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `tokyo-yokohama-fuji-transport-pass.md` | 5 | ３日間 | 3日間 | frontmatter description 전각 숫자 → 반각 통일 | 100% |

### Cursor 후속 (AG 토큰 소진 후 전수 스캔 보완)

| 파일명 | 줄 번호 | Before | After | 사유 | 확신도 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `nihonbashi-the-origin-of-japan.md` | 79 | 196年代の高架道路に逃られていた | 1960年代に建設された高架道路に遮蔽されていた | 연대·동사 오타 (EN/KO 대조) | 100% |
| `japan-visa-paths-permanent-business-manager-asset-holders.md` | 43 | 2年間**的滞在 | 2年間**の滞在 | 조사 오타 (배치 2 누락분) | 100% |

---

## Wave 5 — no-doubled-joshi 전수 수정 (Claude, 2026-07-06)

- **활성화**: `.textlintrc.json` `no-doubled-joshi: false` → `true`
- **대상**: `src/data/blog/ja/` 51개 파일 전수
- **수정 전 위반 수**: 234건 (AG 4건 선수정 후 230건)
- **수정 후 위반 수**: 0건
- **수정 방침**: 의미·URL·각주·수치 변경 금지 / 조사 치환·어순 조정·문장 분할만 허용
- **최종 검증**: `pnpm lint:ja-textlint` ✅ 0 problems / `pnpm build` ✅ PASS

### 주요 수정 파일 (Wave 5 전용)

| 파일명 | 수정 내용 |
| :--- | :--- |
| `buying-property-japan-checklist-before-you-commit.md` | doubled に·は 3건 조사 치환·문장 분할 |
| `why-i-chose-nihonbashi.md` | doubled に·が·は 5건 어순 조정 |
| `tokyo-moving-contracts-two-notes.md` | doubled が 4건 조사 치환 |
| `tokyo-mansion-market-reins-2026-04.md` | doubled が·は 4건 문장 분할·치환 |
| `korea-resident-japan-property-capital-gains-tax.md` | doubled が 3건 조사 치환 |
| `japan-shinchiku-vs-chuko-mansion-investor-guide.md` | doubled に·が 5건 치환·분할 |
| `buying-property-japan-surprises-foreign-investor.md` | doubled は 1건 조사 치환 |
| `coredo-nihonbashi-mitsui-redevelopment.md` | doubled が 1건 어순 조정 |
| `hotel-reit-vs-office-reit-post-covid.md` | doubled が 1건 문장 분할 |
| `japan-corporate-vs-personal-rental-after-tax-sketch.md` | doubled が 1건 조사 치환 |
| `j-reit-five-things-to-know.md` | doubled に 1건 년도 뒤 読点 삽입 |
| `japan-rate-hike-cycle-j-reit-three-lessons.md` | doubled が 1건 も 치환 |
| `japan-real-estate-three-things.md` | doubled に 1건 접속사 변경 |
| `japan-visa-paths-permanent-business-manager-asset-holders.md` | doubled か·が 2건 치환 |
| `korea-japan-inheritance-gift-tax-cross-border-basics.md` | doubled が 1건 문장 재구성 |
| `nihonbashi-hamacho-supermarket-peacock-city-life.md` | doubled は 2건 문장 분할·조사 치환 |
| `nihonbashi-mitsui-redevelopment-pipeline-three.md` | doubled は 1건 문장 분할 |
| `nihonbashi-the-origin-of-japan.md` | doubled に 1건 읽점 삽입 |
| `three-things-when-fx-shakes.md` | doubled が 1건 어순 조정 |
| `tokyo-6-wards-real-estate-insight.md` | doubled に 2건 치환 |
| `tokyo-adachi-katsushika-edogawa.md` | doubled が 1건 문장 재구성 |
| `tokyo-core-3-wards-chiyoda-chuo-minato.md` | doubled が 1건 조사 치환 |
| `tokyo-earthquake-vulnerable-five-areas.md` | doubled に 1건 읽점 삽입 |
| `tokyo-five-sophisticated-spots.md` | doubled も 1건 문장 재구성 |
| `tokyo-kita-arakawa-itabashi-nerima.md` | doubled が 1건 문장 재구성 |
| `tokyo-mansion-tsubo-chiyoda-chuo-minato.md` | doubled が·に 2건 문장 분할·치환 |
| `tokyo-meguro-setagaya.md` | doubled が·か 2건 문장 분할·치환 |
| `tokyo-real-estate-investment-complete-guide.md` | doubled で 1건 조사 치환 |
| `tokyo-shinagawa-ota.md` | doubled が·に 3건 치환·문장 재구성 |
| `tokyo-shinjuku-shibuya-bunkyo.md` | doubled が 2건 조사 치환 |
| `tokyo-small-rental-yield-vs-capital-gain-breakeven.md` | doubled が 1건 문장 분할 |
| `tokyo-taito-sumida-koto.md` | doubled に 2건 치환 |
| `tokyo-ward-guide-series-prologue.md` | doubled に 1건 접속사 변경 |
| `tokyo-yokohama-fuji-transport-pass.md` | doubled に 3건 치환·문장 재구성 |
| `tsukiji-last-empty-lot-redevelopment.md` | doubled が·に 4건 치환·읽점 삽입 |
| `weak-yen-korean-japan-asset-allocation-fx-scenarios.md` | doubled で 1건 읽점 삽입 |
| `why-warm-investing-holds.md` | doubled に 3건 치환·문장 재구성 |

---

## Wave 6 — ja-no-redundant-expression 전수 수정 (Claude, 2026-07-06)

- **활성화**: `.textlintrc.json` `ja-no-redundant-expression: false` → `true`
- **대상**: `src/data/blog/ja/` 51개 파일 전수
- **수정 전 위반 수**: 26건
- **수정 후 위반 수**: 0건
- **수정 방침**: 의미·URL·각주·수치·Joseph 1인칭 톤 변경 금지 / 중복 표현 간결화만 허용
- **최종 검증**: `pnpm lint:ja-textlint` ✅ 0 problems / `pnpm build` ✅ PASS
- **커밋**: `18e4257` (branch: `feat/ja-textlint-wave6-redundant`)

### 주요 수정 내역 (Wave 6 전용)

| 파일명 | 줄 | Before → After | 규칙 |
| :--- | :--- | :--- | :--- |
| `ginza-weekend-walking-guide.md` | 48 | 目にすることのできない → 目にできない | dict2 |
| `ginza-weekend-walking-guide.md` | 58 | 一望することができます → 一望できます | dict2 |
| `j-reit-five-things-to-know.md` | 51 | 投資を行う個人投資家 → 投資をする個人投資家 | dict5 |
| `j-reit-five-things-to-know.md` | 66 | 確認することができます → 確認できます | dict2 |
| `j-reit-five-things-to-know.md` | 86 | 確認することができます → 確認できます | dict2 |
| `j-reit-five-things-to-know.md` | 86 | 投資することが可能です → 投資できます | dict1 |
| `j-reit-five-things-to-know.md` | 127 | 基準にすることができます → 基準にできます | dict2 |
| `j-reit-five-things-to-know.md` | 127 | 保証することは不可能です → 保証するのは不可能です | dict1 |
| `hotel-reit-vs-office-reit-post-covid.md` | 52 | 比較を行えば → を比較すれば | dict5 |
| `japan-rate-hike-cycle-j-reit-three-lessons.md` | 125 | 分散を行います → を分散させます | dict5 |
| `japan-real-estate-three-things.md` | 47 | 所有することができますが → 所有できますが | dict2 |
| `japan-real-estate-three-things.md` | 65 | 納付することができます → 納付できます | dict2 |
| `japan-real-estate-three-things.md` | 87 | 審査を行い → 審査し | dict5 |
| `japan-real-estate-three-things.md` | 95 | 創出することができます → 創出できます | dict2 |
| `japan-shinchiku-vs-chuko-mansion-investor-guide.md` | 136 | シミュレーションを行うことを → シミュレーションすることを | dict5 |
| `korea-japan-inheritance-gift-tax-cross-border-basics.md` | 68 | シミュレーションを行うべきです → シミュレーションすべきです | dict5 |
| `korea-japan-inheritance-gift-tax-cross-border-basics.md` | 74 | であると考えています → と考えています | dict4 |
| `korea-resident-japan-property-capital-gains-tax.md` | 111 | 源泉徴収を行う制度 → 源泉徴収する制度 | dict5 |
| `korea-resident-japan-property-capital-gains-tax.md` | 140 | 納税を行う必要があります → 納税が必要です | dict5 |
| `korea-resident-japan-property-capital-gains-tax.md` | 196 | シミュレーションを行うことが安全 → シミュレーションするのが安全 | dict5 |
| `nihonbashi-hamacho-supermarket-peacock-city-life.md` | 62 | 利用することができます → 利用できます | dict2 |
| `three-things-when-fx-shakes.md` | 39 | ヘッジ）することが可能です → ヘッジ）できます | dict1 |
| `tokyo-buying-process-step-by-step.md` | 131 | 説明を行うことを → 説明をすることを | dict5 |
| `tokyo-earthquake-vulnerable-five-areas.md` | 48 | 理解することができるのです → 理解できるのです | dict2 |
| `tokyo-ward-guide-series-prologue.md` | 128 | 購入することができ、 → 購入でき、 | dict2 |
| `why-i-chose-nihonbashi.md` | 78 | 記録することはできません → 記録できません | dict2 |
