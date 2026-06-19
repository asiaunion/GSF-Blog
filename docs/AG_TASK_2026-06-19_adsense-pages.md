> v2.2 최종본은 Claude 세션에서 문서로 전달됨 (2026-06-19).
> 본 파일은 참조용 — SSOT는 전달된 문서 원본.
> 실행: AG / 검증: Cursor / 배포: User 명시적 요청 시

# AG TASK — AdSense E-E-A-T 페이지 추가 및 About 수정 (v2.2)

작성: Claude + GPT 검토 반영 · Cursor 기술 보완 · Joseph KO/JA 승인본 반영 (2026-06-19)
실행: AG (구현·KO/EN/JA 콘텐츠·repo 반영)
검증: Cursor (pnpm build, hreflang, 3언어 QA, 배포 전 체크리스트)
우선순위: High — 7월 초 AdSense 재제출 전 완료 필수
Repo: /Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark

---

## 배경

AdSense 5차 신청 "조치 필요" 수신 후 기술 결함은 전부 해소 완료(2026-06-15).
이번 작업은 E-E-A-T(Experience · Expertise · Authoritativeness · Trustworthiness) 강화를 위한
정적 페이지 추가 및 기존 About 페이지 수정이다.

GSFArk는 한국어(KO) · 일본어(JA) · 영어(EN) 3개 언어로 운영되는 사이트이므로,
신규 E-E-A-T 페이지는 반드시 3개 언어 동시 배포를 원칙으로 한다. EN만 배포하는 것은 금지.

---

## 콘텐츠 SSOT — Joseph 승인본 (AG 필독)

본 문서에 수록된 KO · JA 본문·카피는 Joseph이 승인한 최종본이다.
언어별 뉘앙스를 반영한 번역이며, AG는 재번역·의역·윤문·문체 수정을 하지 않는다.

| AG가 할 일 | AG가 하지 말 것 |
|-----------|----------------|
| 아래 블록을 그대로 src/data/**/{ko,ja}.md · i18n/ui.ts에 반영 | KO/JA를 EN에서 다시 번역 |
| §이중 H1 규칙만 적용 (본문 # 제목 삭제, frontmatter 유지) | 문장 다듬기·표현 변경 |
| 오탈자가 명백할 때만 Joseph에게 확인 후 수정 | 임의로 톤·면책 문구 변경 |

EN 본문도 동일 — 본 문서 코드 블록이 SSOT. AG는 기술 규칙(frontmatter, # 제거)만 적용한다.

---

## 역할 분담

| Phase | Owner | 내용 |
|-------|-------|------|
| 인프라·콘텐츠 구현 | AG | §구현 확정안 + 본 문서 KO/JA/EN 블록 verbatim 반영 |
| 빌드·hreflang·기술 QA | Cursor | pnpm build exit 0, URL·링크·hreflang·이중 H1·문서 대조 |
| git commit / deploy | User | 명시적 요청 시에만 (AGENTS.md) |

AG는 구현 방식을 Cursor에 넘기지 말고 §구현 확정안을 그대로 따른다.
Cursor는 번역 품질 재작성이 아니라 repo 내용이 본 문서 SSOT와 일치하는지·빌드가 통과하는지 검증한다.

---

## 구현 확정안 (Option C — contact/privacy 패턴)

v1에서 "Cursor에게 옵션 결정 요청"은 폐기. 아래가 SSOT.

### 1. Content collection 등록 (src/content.config.ts)

about / privacy / contact와 동일하게 3개 컬렉션 추가:

| Collection ID | Data path | Schema fields |
|--------------|-----------|---------------|
| mission | src/data/mission/ | lang, title, description |
| methodology | src/data/methodology/ | lang, title, description |
| author | src/data/author/ | lang, title, description |

각 디렉터리에 en.md · ko.md · ja.md 필수. 하나라도 없으면 getEntry가 빌드 실패.

### 2. Route 파일

| Page | Route file |
|------|-----------|
| Mission | src/pages/[...locale]/mission.astro |
| Methodology | src/pages/[...locale]/methodology.astro |
| Author | src/pages/[...locale]/author/joseph-kim.astro |

about.astro / privacy-policy.astro / contact.astro를 복제·수정:
- getStaticPaths: locale undefined(en) / ko / ja 3경로
- getEntry("<collection>", lang) → AboutLayout + render(entry)
- AboutLayout에 description: entry.data.description 전달 (meta/OG용 — 현재 AboutLayout은 title만 전달하므로 layout 수정 필요)

### 3. 이중 H1 금지 (필수)

AboutLayout.astro가 frontmatter title로 이미 <h1>을 렌더한다.

```
<h1>{frontmatter.title}</h1>
<slot />
```

따라서 모든 신규 MD 본문 최상단의 # 제목은 삭제한다. 제목은 frontmatter title만 사용.
privacy/en.md 패턴(본문에 # 없음)을 따를 것.

### 4. hreflang

3언어 MD가 모두 있으면 기존 getHreflangAlternateUrls가 en/ko/ja alternate를 자동 생성한다.
DEFAULT_LOCALE_ONLY_PREFIXES에 등록하지 말 것 (3언어 미러가 정본).

### 5. Breadcrumb

src/utils/buildBreadcrumbs.ts의 named 맵에 추가:
```
mission: /* i18n label */,
methodology: /* i18n label */,
// author/joseph-kim → 2-segment; named 또는 readable label 처리
```

### 6. SITE.profile 갱신 (src/config.ts)

```
profile: "https://gsfark.com/author/joseph-kim/",
```

Author 페이지에 Person JSON-LD (AboutLayout schemaType 확장 또는 author 전용 override).

### 7. 데이터 출처 표현 (사실 확인 반영)

| 소스 | 허용 표현 | 금지 표현 |
|------|----------|----------|
| MLIT | 공식 API 키 발급·직접 접근 (official API) | — |
| REINS | 공개 요약 보고서·공개 자료 참조 (publicly released summary reports, public reference materials) | API 직접 접근, 실시간 DB 연동 등 |

---

## 작업 우선순위

| 순서 | TASK | 이유 |
|------|------|------|
| 0 | §구현 확정안 (content.config + routes + layout) | 없으면 페이지 자체가 없음 |
| 1 | TASK 1 (신규 페이지 en/ko/ja) | Author Box·Footer 링크 404 방지 |
| 2 | TASK 4 (Footer / About 링크) | 페이지 생성 직후 연결 |
| 3 | TASK 2 (About 헤딩 3언어) | 독립적 |
| 4 | TASK 3 (Author Box 컴포넌트) | 신규 URL 의존 |
| 5 | SITE.profile + breadcrumb + i18n | E-E-A-T 마무리 |

---

## TASK 1 — 신규 정적 페이지 3개 (en · ko · ja)

### TASK 1-A — Mission Page

URL:
- EN: /mission/
- KO: /ko/mission/
- JA: /ja/mission/

파일:
- src/data/mission/en.md
- src/data/mission/ko.md
- src/data/mission/ja.md

#### EN (en.md)
본문 # Why GSFArk Exists 삭제 — title frontmatter만 H1.

```markdown
---
lang: en
title: "Why GSFArk Exists"
description: "Why I write about Tokyo real estate, investing, and life in Japan."
---

GSFArk began from a simple question:

> How can I make better decisions with my money, my time, and my life?

I spent eight years in the Korean insurance industry before leaving to manage my own investments.

Since 2013, I have invested in residential and redevelopment properties in Korea.

In 2018, I relocated to Japan — and discovered that the Tokyo real estate market is remarkably well-documented, yet remarkably difficult to navigate for outsiders.

Data exists. But it is fragmented across government databases, written for domestic readers, and rarely translated into actionable insight for foreign investors.

That gap is what GSFArk tries to close.

Today I live in Nihonbashi, Tokyo.

From here, I research and document the realities of:

- Tokyo real estate markets
- Japanese housing data and trends
- J-REITs and income-producing assets
- Relocating and investing in Japan as a foreigner
- Cross-border asset building

GSFArk is not a brokerage.

GSFArk is not a sales platform.

GSFArk does not accept compensation in exchange for favorable investment coverage.

Every article is written as an independent research note — based on public data, primary sources, and personal observation from someone who lives here and has invested in this market.

My goal is simple:

> To help readers make informed decisions through clear analysis, transparent data, and real-world experience.

All investment decisions involve risk.

Nothing published on this site should be considered financial, legal, or tax advice.

Logged from Nihonbashi, Tokyo.
```

#### KO (ko.md) — Joseph 승인본
본문 # GSFArk를 운영하는 이유 삭제.

```markdown
---
lang: ko
title: "GSFArk를 운영하는 이유"
description: "도쿄 부동산, 투자, 일본 생활에 대해 글을 쓰는 이유"
---

GSFArk는 한 가지 질문에서 시작되었습니다.

> 어떻게 하면 돈과 시간, 그리고 삶에 대해 더 나은 결정을 내릴 수 있을까?

저는 8년간 보험업계에서 근무한 후 직접 투자를 시작했습니다.

2013년부터 한국에서 주거용 부동산과 재개발 투자에 참여했고, 2018년 일본으로 이주한 뒤에는 도쿄 부동산 시장을 연구하게 되었습니다.

도쿄 시장은 놀라울 정도로 많은 데이터가 공개되어 있습니다.

그러나 그 정보는 여러 기관에 흩어져 있고, 외국인이 이해하기 쉽게 정리된 자료는 많지 않습니다.

GSFArk는 그 간극을 줄이기 위해 만들어졌습니다.

현재 저는 도쿄 니혼바시에 거주하고 있습니다.

이곳에서 다음과 같은 주제를 연구하고 기록합니다.

- 도쿄 부동산 시장
- 일본 주택 시장과 통계
- J-REIT
- 일본 이주와 정착
- 해외 거주자의 일본 투자
- 장기 자산 형성

GSFArk는 부동산 중개 플랫폼이 아닙니다.

GSFArk는 특정 상품을 판매하는 사이트도 아닙니다.

또한 투자에 유리한 평가를 대가로 금전적 보상을 받지 않습니다.

모든 글은 공개 데이터, 1차 자료, 그리고 실제 거주와 투자 경험을 바탕으로 작성됩니다.

저의 목표는 단순합니다.

> 독자들이 더 나은 판단을 내릴 수 있도록 돕는 것.

모든 투자에는 위험이 따릅니다.

본 사이트의 내용은 투자·법률·세무 자문이 아니며, 최종 판단과 책임은 독자 본인에게 있습니다.

도쿄 니혼바시에서 기록합니다.
```

#### JA (ja.md) — Joseph 승인본
본문 # GSFArkを運営する理由 삭제.

```markdown
---
lang: ja
title: "GSFArkを運営する理由"
description: "東京不動産・投資・日本生活について発信する理由"
---

GSFArkは、一つの問いから始まりました。

> お金と時間、そして人生について、どうすればより良い判断ができるだろうか。

私は保険業界で8年間勤務した後、自ら投資を始めました。

2013年から韓国で住宅・再開発不動産への投資を行い、2018年に日本へ移住してからは東京不動産市場を継続的に研究しています。

東京市場には豊富なデータが公開されています。

しかし、その多くは行政機関や業界団体に分散しており、外国人にとって分かりやすく整理された情報は決して多くありません。

GSFArkは、その情報格差を少しでも埋めるために生まれました。

現在は東京・日本橋を拠点に、

- 東京不動産市場
- 日本の住宅市場
- J-REIT
- 日本への移住と定住
- 外国人としての日本投資
- 長期的な資産形成

について調査・執筆しています。

GSFArkは不動産仲介業者ではありません。

また、投資商品を販売するプラットフォームでもありません。

特定の投資対象について好意的な評価を行う見返りとして報酬を受け取ることもありません。

すべての記事は公開データ、一次資料、そして実際の居住・投資経験に基づいて執筆されています。

私の目標はシンプルです。

> 読者がより良い意思決定を行えるよう支援すること。

投資には常にリスクが伴います。

本サイトの内容は投資・法律・税務に関する助言ではありません。最終的な判断はご自身の責任で行ってください。

東京・日本橋より。
```

---

### TASK 1-B — Methodology Page

URL:
- EN: /methodology/
- KO: /ko/methodology/
- JA: /ja/methodology/

파일:
- src/data/methodology/en.md
- src/data/methodology/ko.md
- src/data/methodology/ja.md

구현 원칙:
- KO · JA는 아래 Joseph 승인본을 그대로 사용 (AG 재번역 금지)
- 본문 # Research Methodology 삭제 — title frontmatter만 H1

핵심 유지 요소 (3언어 모두):
- MLIT (공식 API 직접 접근 — 사실 확인됨)
- REINS (공개 요약 보고서·공개 자료 — API 아님)
- Tokyo Metropolitan Government
- Editorial Independence
- Update Policy
- Investment Disclaimer

#### EN (en.md)

```markdown
---
lang: en
title: "Research Methodology"
description: "How data and analysis are produced on GSFArk."
---

GSFArk publishes independent research focused on Tokyo real estate,
Japanese housing markets, and long-term investing.

## Data Sources

Whenever possible, articles rely on primary sources, including:

- Ministry of Land, Infrastructure, Transport and Tourism (MLIT)
- REINS Market Information (publicly released summary reports and public reference materials)
- Tokyo Metropolitan Government Statistics
- Bank of Japan
- Corporate financial statements and public disclosures
- Public property transaction data

Each article includes source references whenever data is used.

**A note on MLIT data:** GSFArk accesses MLIT datasets directly via
official API (with credentials issued by MLIT), enabling ongoing
accumulation of transaction prices, land prices, station proximity data,
population trends, and disaster risk indicators across Tokyo wards.
This pipeline forms the quantitative foundation of the Tokyo Ward Series.

**A note on REINS data:** GSFArk does not connect to REINS via API.
When REINS figures appear, they are cited from publicly released summary
reports and other public reference materials only.

## Price Calculations

Property prices are generally calculated using:

- Actual transaction prices (成約価格)
- Average unit price per square meter (㎡単価)
- Publicly available market reports

When estimates are presented, the calculation method is explicitly disclosed.

## Editorial Independence

GSFArk operates independently.
No article is written in exchange for compensation from developers,
brokers, or financial institutions unless explicitly disclosed.

## Update Policy

Data cited in articles reflects sources available at time of publication.
When material market shifts or data corrections occur,
articles are updated with a revision date noted at the top.

## Investment Disclaimer

The content published on this website is for educational and
informational purposes only.
Readers should conduct their own due diligence and consult qualified
professionals before making financial, legal, tax, or investment decisions.
```

#### KO (ko.md) — Joseph 승인본
본문 # 연구 방법론 삭제 — title frontmatter만 H1.

```markdown
---
lang: ko
title: "연구 방법론"
description: "GSFArk가 데이터를 수집하고 분석하는 방법"
---

GSFArk는 도쿄 부동산 시장, 일본 주택 시장, 그리고 장기 투자에 관한 독립적인 리서치를 제공합니다.

모든 분석은 가능한 한 공개된 1차 자료를 바탕으로 작성되며, 데이터의 출처와 계산 과정을 독자에게 투명하게 공개하는 것을 원칙으로 합니다.

## 데이터 출처

GSFArk는 다음과 같은 공공 및 공식 자료를 우선적으로 활용합니다.

- 국토교통성(MLIT)
- REINS(부동산 유통기구) 공개 시장 보고서
- 도쿄도 통계 자료
- 일본은행(BOJ)
- 상장기업 공시 및 재무제표
- 공개 부동산 거래 데이터
- 지방자치단체 공개 자료

데이터를 인용한 경우에는 가능한 한 원출처를 함께 표기합니다.

### MLIT 데이터에 대하여

GSFArk는 국토교통성(MLIT)이 제공하는 공식 API를 직접 활용하여 데이터를 수집하고 있습니다.

이를 통해 다음과 같은 정보를 지속적으로 축적·분석합니다.

- 실제 거래가격(成約価格)
- 공시지가 및 지가 추이
- 역세권 접근성
- 인구 변화
- 재해 위험도
- 지역별 시장 동향

이 데이터 파이프라인은 「도쿄 어디에 살 것인가」 시리즈를 포함한 주요 분석 콘텐츠의 기반이 됩니다.

## 가격 계산 방식

부동산 가격 분석은 일반적으로 다음 기준을 사용합니다.

- 실제 거래가격(成約価格)
- 제곱미터당 단가(㎡단가)
- 공공기관 및 시장 보고서

추정치가 포함되는 경우에는 계산 방법을 본문에 명시합니다.

## 편집 독립성

GSFArk는 독립적으로 운영됩니다.

특정 건설사, 부동산 중개업체, 금융기관 또는 투자 상품 제공자로부터 대가를 받고 기사를 작성하지 않습니다.

또한 특정 투자 대상에 대해 우호적인 평가를 제공하는 조건으로 보상을 받지 않습니다.

광고, 제휴 또는 협찬이 포함되는 경우에는 해당 사실을 명확히 공개합니다.

## 업데이트 정책

모든 데이터와 분석은 게시 시점에 확인 가능한 자료를 기준으로 작성됩니다.

시장 상황의 중대한 변화나 데이터 수정이 발생한 경우에는 내용을 업데이트하며, 수정 이력을 표시할 수 있습니다.

## 투자 유의사항

본 사이트의 콘텐츠는 교육 및 정보 제공을 목적으로 작성되었습니다.

투자, 법률, 세무 또는 기타 전문적인 의사결정은 반드시 독자 본인의 판단과 책임 아래 이루어져야 합니다.

필요한 경우 관련 전문가와 상담하시기 바랍니다.
```

#### JA (ja.md) — Joseph 승인본
본문 # 調査方法論 삭제 — title frontmatter만 H1.

```markdown
---
lang: ja
title: "調査方法論"
description: "GSFArkがデータを収集・分析する方法"
---

GSFArkは、東京不動産市場、日本の住宅市場、そして長期投資に関する独立したリサーチを提供しています。

すべての分析は可能な限り公開された一次資料に基づいており、データの出典と分析手法を透明に開示することを基本方針としています。

## データソース

GSFArkでは主に以下の公的・公式データを利用しています。

- 国土交通省（MLIT）
- REINS（不動産流通機構）の公開市場レポート
- 東京都統計資料
- 日本銀行（BOJ）
- 上場企業の有価証券報告書・決算資料
- 公開不動産取引データ
- 地方自治体の公開資料

データを引用する際は、可能な限り出典を明記しています。

### MLITデータについて

GSFArkは国土交通省（MLIT）が提供する公式APIを活用し、独自にデータを収集・分析しています。

これにより以下のような情報を継続的に蓄積しています。

- 実際の取引価格（成約価格）
- 地価および地価推移
- 駅へのアクセス性
- 人口動向
- 災害リスク
- 地域別の市場トレンド

このデータ基盤は「東京23区完全ガイド」シリーズをはじめとする主要コンテンツの分析基盤となっています。

## 価格計算方法

不動産価格の分析では主に以下の指標を使用します。

- 実際の取引価格（成約価格）
- 平米単価（㎡単価）
- 公的統計および市場レポート

推計値を使用する場合は、その計算方法を本文中で明示します。

## 編集上の独立性

GSFArkは独立して運営されています。

特定のデベロッパー、不動産会社、金融機関、投資商品の提供者から報酬を受けて記事を執筆することはありません。

また、特定の投資対象について好意的な評価を行う見返りとして報酬を受け取ることもありません。

広告、提携、スポンサーシップが存在する場合には、その旨を明確に開示します。

## 更新方針

記事内で引用するデータおよび分析は、公開時点で確認可能な情報に基づいています。

市場環境の大きな変化やデータの修正があった場合には、必要に応じて記事を更新し、更新履歴を記載することがあります。

## 投資に関する注意事項

本サイトの内容は教育および情報提供を目的としています。

投資、法律、税務、その他の専門的な判断は、必ず読者ご自身の責任において行ってください。

必要に応じて専門家へご相談ください。
```

---

### TASK 1-C — Author Page (/author/joseph-kim/)

URL:
- EN: /author/joseph-kim/
- KO: /ko/author/joseph-kim/
- JA: /ja/author/joseph-kim/

파일:
- src/data/author/en.md
- src/data/author/ko.md
- src/data/author/ja.md

수정사항:
| 항목 | 처리 |
|------|------|
| M.Div., 2024 | 삭제 (3언어 모두) |
| Hanwha General Insurance (2005–2013) / 한화손해보험 / ハンファ損害保険 | 유지 (사실 확인 OK) |
| JLPT N1 (2024) | 유지 |
| MLIT API | EN Philosophy만 (direct MLIT API access). KO/JA는 승인본 그대로 |
| REINS | Author 페이지에 API 언급 금지 |

#### EN (en.md)
본문 # Joseph Kim 삭제.

```markdown
---
lang: en
title: "Joseph Kim"
description: "Founder and editor of GSFArk."
---

Founder & Editor, GSFArk

## Background

- Non-life insurance underwriting and product planning,
  Hanwha General Insurance (2005–2013)
- Real estate investor since 2013
- Residential and redevelopment property investment experience (Korea)
- Relocated to Japan in 2018. Currently based in Nihonbashi, Tokyo (2024–present)
- JLPT N1 (January 2024)
- Korea–Japan property market researcher

## Areas of Interest

- Tokyo Real Estate
- J-REITs
- Japanese Housing Markets
- Cross-Border Investing
- Long-Term Asset Allocation

## Philosophy

I believe investing is not only about returns.
It is also about understanding places, people, and long-term change.

My work focuses on combining:

- Primary-source data (including direct MLIT API access)
- Field observation from living in Tokyo
- Historical and structural context
- Practical experience as an active investor

Every article published on GSFArk is written from this perspective.

## Current Base

Nihonbashi, Tokyo, Japan
```

#### KO (ko.md) — Joseph 승인본
본문 # 김승주 삭제 — title frontmatter만 H1.

```markdown
---
lang: ko
title: "김승주"
description: "GSFArk의 설립자이자 편집자"
---

GSFArk 설립자 · 편집자

## 이력

- 한화손해보험 근무 (2005–2013)
  - 손해보험 인수심사 및 상품기획
- 2013년부터 부동산 투자 시작
- 주거용 부동산 및 재개발 투자 경험
- 2018년 일본 이주
- 현재 도쿄 니혼바시 거주 (2024~)
- 일본어능력시험 JLPT N1 취득 (2024)
- 한일 부동산 시장 연구자

## 주요 관심 분야

- 도쿄 부동산
- J-REIT
- 일본 주택 시장
- 한일 크로스보더 투자
- 장기 자산 배분
- 일본 이주와 정착

## 투자 철학

저는 투자가 단순히 수익률을 높이는 과정이라고 생각하지 않습니다.

투자는 결국 사람과 도시, 그리고 긴 시간의 변화를 이해하는 과정이라고 믿습니다.

GSFArk의 모든 글은 다음 네 가지를 함께 고려하여 작성됩니다.

- 공개된 1차 데이터
- 현장 관찰과 실제 거주 경험
- 역사적·구조적 맥락
- 실제 투자 경험

특히 도쿄에 거주하며 직접 경험한 생활과 시장의 변화를 데이터와 함께 기록하는 것을 중요하게 생각합니다.

## 현재 거주지

도쿄도 주오구 니혼바시
```

#### JA (ja.md) — Joseph 승인본
본문 # キム・スンジュ 삭제 — title frontmatter만 H1.

```markdown
---
lang: ja
title: "キム・スンジュ"
description: "GSFArk創設者・編集者"
---

GSFArk 創設者・編集者

## 経歴

- ハンファ損害保険勤務（2005–2013）
  - 損害保険の引受審査および商品企画
- 2013年より不動産投資を開始
- 住宅・再開発不動産への投資経験
- 2018年に日本へ移住
- 現在は東京・日本橋在住（2024〜）
- 日本語能力試験 JLPT N1取得（2024）
- 日韓不動産市場リサーチャー

## 主な研究分野

- 東京不動産
- J-REIT
- 日本住宅市場
- 日韓クロスボーダー投資
- 長期資産配分
- 日本移住・定住

## 投資哲学

私は投資とは単にリターンを追求する行為ではないと考えています。

投資とは、街や人々、そして長い時間の変化を理解する営みでもあります。

GSFArkの記事は常に以下の視点を組み合わせて執筆しています。

- 公開された一次データ
- 現地での観察と居住経験
- 歴史的・構造的な背景
- 実際の投資経験

特に東京に住みながら体験している市場や暮らしの変化を、データとともに記録することを大切にしています。

## 現在の拠点

東京都中央区日本橋
```

---

## TASK 2 — About 페이지 헤딩 수정 (en · ko · ja)

파일:
- src/data/about/en.md
- src/data/about/ko.md
- src/data/about/ja.md

변경 규칙 (3언어 공통):
- frontmatter title은 기존 유지 (About / 소개 / 紹介) — 페이지 nav·breadcrumb 라벨
- 기존 blockquote 2줄 삭제
- 그 자리에 일반 문단으로 교체 (# 헤딩 사용 금지 — AboutLayout H1과 중복 방지)
- 타임라인·커리어·나머지 본문 일체 수정 금지

EN — blockquote 교체 내용:
```
**Tokyo Real Estate, Relocation, and Cross-Border Investing in Japan**

Independent research and analysis from Nihonbashi, Tokyo.

Written by a Korean investor and researcher who has lived in Japan since 2018.
```

KO — blockquote 교체 내용 (Joseph 승인본):
```
**도쿄 부동산, 일본 이주, 그리고 한일 크로스보더 투자**

도쿄 니혼바시에서 기록하는 독립 리서치와 분석.

2018년부터 일본에 거주해 온 한국인 투자자이자 연구자가 운영합니다.
```

JA — blockquote 교체 내용 (Joseph 승인본):
```
**東京不動産・日本移住・日韓クロスボーダー投資**

東京・日本橋から発信する独立系リサーチと分析。

2018年より日本に居住する韓国人投資家・リサーチャーが運営しています。
```

Cursor 검증:
- /about/, /ko/about/, /ja/about/ 각각 새 강조 문단 텍스트 노출
- <h1>은 1개만 (About / 소개 / 紹介)
- 타임라인 HTML 블록 보존

---

## TASK 3 — Author Box (레이아웃 컴포넌트)

구현 원칙:
- 개별 blog .md 수정 금지
- PostDetails.astro에 이미 Author Card 존재 → 신규 박스 추가 금지, 기존 카드 확장

권장 구조:
```
PostDetails.astro
  └── AuthorEeatLinks.astro (신규) 또는 기존 section 확장
        └── getUi(lang) — EN / KO / JA 자동 분기
```

링크 (locale prefix 자동):
| Label (i18n) | Path |
|-------------|------|
| Author Profile / 작성자 소개 / 著者プロフィール | {localePrefix}/author/joseph-kim/ |
| Mission / 운영 목적 / 運営目的 | {localePrefix}/mission/ |
| Research Methodology / 연구 방법론 / 調査方法論 | {localePrefix}/methodology/ |

기존 About · Contact · LinkedIn · X CTA는 유지 (제거 금지).

src/i18n/ui.ts 추가 키 (예시):
```
authorEeatProfileCta: "Author Profile",
authorEeatMissionCta: "Mission",
authorEeatMethodologyCta: "Research Methodology",
authorEeatBody: "...", // TASK 3 본문 — 언어별
```

본문 카피 (i18n) — Joseph 승인본 (verbatim):

EN:
```
Joseph Kim is the founder and editor of GSFArk.
Based in Nihonbashi, Tokyo. Living and investing in Japan since 2018.
```

KO:
```
김승주는 GSFArk의 설립자이자 편집자입니다.
도쿄 니혼바시에 거주하며, 일본 부동산과 장기 투자에 대해 연구하고 기록하고 있습니다.
```

JA:
```
キム・スンジュはGSFArkの創設者兼編集者です。
東京・日本橋を拠点に、日本不動産と長期投資について調査・執筆しています。
```

적용 범위: 모든 locale의 모든 published 포스트 (en/ · ko/ · ja/). EN만 적용 금지.

---

## TASK 4 — Footer / About 링크 (3언어)

Footer (src/components/Footer.astro)
About · Contact · Privacy 옆에 추가:

| i18n key | EN | KO | JA |
|---------|----|----|-----|
| footerMission | Mission | 운영 목적 | 運営目的 |
| footerMethodology | Methodology | 연구 방법론 | 調査方法論 |
| footerAuthor | Author | 작성자 | 著者 |

링크: {localePrefix}/mission/, {localePrefix}/methodology/, {localePrefix}/author/joseph-kim/

About 페이지 (선택·권장):
각 언어 About 본문 상단(공적 프로필 섹션 근처)에 3링크 bullet 추가 가능. Footer만으로도 최소 요건 충족.

---

## 검증 체크리스트 (Cursor 담당)

### 빌드
```bash
cd /Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark
pnpm build   # exit 0 필수
```
validate:post는 블로그 slug 전용 — 이번 작업은 pnpm build가 정적 페이지 게이트.

### 언어별 페이지 (200)
- /mission/ · /ko/mission/ · /ja/mission/
- /methodology/ · /ko/methodology/ · /ja/methodology/
- /author/joseph-kim/ · /ko/author/joseph-kim/ · /ja/author/joseph-kim/

### 콘텐츠 스팟 체크
- EN mission: "GSFArk is not a brokerage" · "does not accept compensation"
- EN methodology: MLIT + "official API" · REINS API 아님 문구
- KO methodology: "공식 API" · "REINS 공개 시장 보고서" · "도쿄 어디에 살 것인가"
- JA methodology: "公式API" · "REINS 公開市場レポート" · "東京23区完全ガイド"
- EN author: "Hanwha General Insurance" · "JLPT N1" · M.Div. 없음
- KO author: "한화손해보험" · "JLPT N1" · "도쿄도 주오구 니혼바시"
- JA author: "ハンファ損害保険" · "JLPT N1" · "東京都中央区日本橋"

### About (3언어)
- EN 강조 문단: "Tokyo Real Estate, Relocation, and Cross-Border Investing in Japan"
- KO · JA 강조 문단 각각 정상
- 타임라인·나머지 본문 보존
- 페이지당 <h1> 1개

### hreflang
- mission / methodology / author 각 URL에서 link[rel=alternate] en · ko · ja · x-default
- alternate URL이 실제 200 (404 없음)

### Author Box (3언어 포스트 각 1개 이상)
- EN · KO · JA 포스트에서 EEAT 링크 3개 노출
- locale prefix 정확 (/ko/author/joseph-kim/ 등)
- 기존 Author Card(About/Contact/LinkedIn/X) 유지
- Author Box 중복 섹션 없음

### Footer
- 3언어 Footer에 Mission · Methodology · Author 링크

### SEO / E-E-A-T
- <meta name="description"> — frontmatter description 반영
- SITE.profile → https://gsfark.com/author/joseph-kim/
- sitemap에 신규 9 URL 포함 (3 page × 3 locale)

### SSOT 대조 (Cursor)
- src/data/**/{en,ko,ja}.md 본문이 본 문서 코드 블록과 일치 (AG 임의 수정 없음)
- i18n/ui.ts Author Box · Footer 문자열이 본 문서 TASK 3 · 4 표와 일치
- KO methodology: "공식 API" · "REINS 공개 시장 보고서" · "도쿄 어디에 살 것인가" 시리즈
- JA methodology: "公式API" · "REINS 公開市場レポート" · "東京23区完全ガイド"
- KO author: "한화손해보험" · "JLPT N1" · "도쿄도 주오구 니혼바시" · M.Div. 없음
- JA author: "ハンファ損害保険" · "JLPT N1" · "東京都中央区日本橋" · M.Div. 없음

---

## 배포

Vercel 빌드 로그 오류 없음

### AG → Cursor 핸드오프

AG 작업 완료 후 Cursor에 전달:
```
AdSense E-E-A-T v2.0 반영 완료.
- mission / methodology / author (en·ko·ja)
- About 헤딩 3언어
- PostDetails Author EEAT links + Footer
pnpm build exit 0 확인함: [yes/no]
미완료: [있으면 기재]
검증 부탁: docs/AG_TASK_2026-06-19_adsense-pages.md 체크리스트 (KO/JA는 Joseph 승인 SSOT — 재번역 불필요)
```

---

## 참고 파일 (AG 선독)

| 파일 | 용도 |
|------|------|
| src/pages/[...locale]/about.astro | route 템플릿 |
| src/pages/[...locale]/privacy-policy.astro | route 템플릿 |
| src/content.config.ts | collection 등록 |
| src/layouts/AboutLayout.astro | H1·JSON-LD·description |
| src/layouts/PostDetails.astro | 기존 Author Card (§TASK 3) |
| src/components/Footer.astro | §TASK 4 |
| src/i18n/ui.ts | Footer·Author Box 문자열 |
| src/utils/buildBreadcrumbs.ts | breadcrumb 라벨 |
| src/config.ts | SITE.profile |

---

Changelog: v2.1 → v2.2 — Joseph 승인 methodology·author KO/JA 전문 교체 (description·섹션 구조·시리즈명·거주지 표기 반영).
Changelog: v2.2 → v2.3 — TASK 5·6 추가 (Essay 1 About Box 삭제 + About 타임라인 Essay 링크).

---

## TASK 5 — Essay 1 About the Author 블록 삭제 (EN · KO · JA)

**배경:** Cursor 검토 결과, Essay md 하단 About the Author 블록과 PostDetails 카드가 이중 노출됨.
PostDetails 카드에 EEAT 링크 3개 + About · Contact · LinkedIn · X가 모두 포함되므로
md 블록은 불필요 중복. 삭제한다.

**대상 파일:**
- src/data/blog/en/buying-property-japan-surprises-foreign-investor.md
- src/data/blog/ko/buying-property-japan-surprises-foreign-investor.md
- src/data/blog/ja/buying-property-japan-surprises-foreign-investor.md

**삭제 대상 (3개 파일 공통):**

각 파일 본문 최하단에서 아래 블록 전체 삭제.
구분선(`---`) 포함.

EN 삭제 블록:
```
---

### About the Author

Joseph Kim is the founder and editor of GSFArk.

Based in Nihonbashi, Tokyo. Living and investing in Japan since 2018.

- [Author Profile](/author/joseph-kim/)
- [Mission](/mission/)
- [Research Methodology](/methodology/)
```

KO 삭제 블록:
```
---

### 작성자 소개

김승주는 GSFArk의 설립자이자 편집자입니다.

도쿄 니혼바시에 거주하며 일본 부동산, J-REIT, 장기 투자, 그리고 일본 이주에 대해 연구하고 기록하고 있습니다.

- [작성자 소개](/ko/author/joseph-kim/)
- [운영 목적](/ko/mission/)
- [연구 방법론](/ko/methodology/)
```

JA 삭제 블록:
```
---

### 著者について

キム・スンジュはGSFArkの創設者兼編集者です。

東京・日本橋を拠点に、日本不動産、J-REIT、長期投資、そして日本移住について調査・執筆しています。

- [著者プロフィール](/ja/author/joseph-kim/)
- [運営目的](/ja/mission/)
- [調査方法論](/ja/methodology/)
```

**삭제 후 각 파일의 마지막 줄:**
- EN: `*Logged from Nihonbashi, Tokyo.*`
- KO: `*도쿄 니혼바시에서 기록합니다.*`
- JA: `*東京・日本橋より。*`

**Cursor 검증:**
- 3개 파일 각각에서 `### About the Author` / `### 작성자 소개` / `### 著者について` 미존재 확인
- 본문 마지막 줄이 위 3개 문장 중 하나인지 확인
- pnpm build exit 0

---

## TASK 6 — About 타임라인 Essay 1 링크 추가 (EN · KO · JA)

**배경:** About 페이지 타임라인 "2026 – PRESENT" 블록 마지막 문장 뒤에
Essay 1로 연결되는 링크 문장을 추가. About(사실 요약) → Essay(경험 심층)로 자연스럽게 연결.

**대상 파일:**
- src/data/about/en.md
- src/data/about/ko.md
- src/data/about/ja.md

**수정 규칙:**
- 타임라인 마지막 블록(2026 – PRESENT) 내 마지막 문장 뒤에만 추가
- 타임라인 HTML 구조(div, class 등) 수정 금지
- 다른 타임라인 블록 수정 금지

### EN (about/en.md)

찾을 문장:
```
...and this blog is a record of that journey.
```

이 문장 바로 다음에 추가 (별도 단락):
```
If you'd like to read about the purchase process itself — what surprised me, what differed from Korea, and why timing mattered more than price — I wrote about it here: [Buying Property in Japan: What Surprised Me Most](/posts/buying-property-japan-surprises-foreign-investor/)
```

### KO (about/ko.md)

찾을 문장 (KO About 타임라인 동일 블록 마지막 문장):
```
...이 블로그는 그 여정의 기록입니다.
```
⚠️ KO About 파일의 실제 문장을 확인 후 정확히 매칭할 것. 문장이 다르면 Joseph에게 확인.

추가할 문장:
```
일본에서 부동산을 매입하는 과정 — 놀랐던 것들, 한국과 달랐던 절차, 그리고 왜 가격보다 타이밍이 더 중요했는지 — 에 대해 직접 쓴 글이 있습니다: [일본에서 집을 사며 가장 놀랐던 것들](/ko/posts/buying-property-japan-surprises-foreign-investor/)
```

### JA (about/ja.md)

찾을 문장 (JA About 타임라인 동일 블록 마지막 문장):
```
...このブログはその旅の記録です。
```
⚠️ JA About 파일의 실제 문장을 확인 후 정확히 매칭할 것. 문장이 다르면 Joseph에게 확인.

추가할 문장:
```
日本での不動産購入プロセス — 驚いたこと、韓国との違い、そしてなぜ価格よりタイミングが重要だったのか — について書いた記事があります: [日本で不動産を購入して驚いたこと](/ja/posts/buying-property-japan-surprises-foreign-investor/)
```

**Cursor 검증:**
- /about/ EN: Essay 1 링크 문장 노출, 슬러그 `/posts/buying-property-japan-surprises-foreign-investor/` → 200
- /ko/about/ KO: Essay 1 링크 문장 노출, 슬러그 `/ko/posts/buying-property-japan-surprises-foreign-investor/` → 200
- /ja/about/ JA: Essay 1 링크 문장 노출, 슬러그 `/ja/posts/buying-property-japan-surprises-foreign-investor/` → 200
- 타임라인 HTML 구조 보존 (다른 블록 영향 없음)
- Essay 1이 draft: false 상태일 때만 링크 200 응답 — draft: true 상태에서는 404 정상
