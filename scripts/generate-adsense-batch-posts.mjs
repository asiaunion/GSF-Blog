/**
 * One-off generator for 19 remaining trilingual posts (Phase 3).
 * Run: node scripts/generate-adsense-batch-posts.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const blogRoot = path.join(root, "src/data/blog");

const disclaimer = {
  ko: `

<div class="post-disclaimer">
<p class="post-disclaimer__title">면책 문구</p>
<p>※ 본 글은 정보 제공 목적의 개인적 분석이며, 특정 투자 상품의 매수·매도를 권유하지 않습니다. 투자 판단과 책임은 독자 본인에게 있습니다. 글의 작성 시점 이후 내용이 변경될 수도 있습니다.</p>
</div>
`,
  en: `

<div class="post-disclaimer">
<p class="post-disclaimer__title">Disclaimer</p>
<p>This article is for informational purposes only and reflects personal analysis. It does not recommend buying or selling any specific investment product. Investment decisions and responsibility rest solely with the reader. Content may change after the time of writing.</p>
</div>
`,
  ja: `

<div class="post-disclaimer">
<p class="post-disclaimer__title">免責事項</p>
<p>※ 本記事は情報提供を目的とした個人的な分析であり、特定の投資商品の売買を推奨するものではありません。投資判断と責任は読者ご本人にあります。内容は執筆時点以降に変更される可能性があります。</p>
</div>
`,
};

const posts = [
  // Phase A remainder
  {
    slug: "tokyo-mansion-tsubo-chiyoda-chuo-minato",
    category: "investment",
    date: "2026-04-19T03:30:00Z",
    sources: ["https://www.reins.or.jp/", "https://www.stat.go.jp/english/"],
    tags: { ko: ["도쿄", "맨션", "평당가", "투자"], en: ["Tokyo", "Condo", "Price", "Investment"], ja: ["東京", "マンション", "坪単価", "投資"] },
    title: {
      ko: "도심형 맨션 평당가: 주오·치요다·미나토 3구 비교",
      en: "Urban Mansion Prices per Tsubo: Chuo, Chiyoda, and Minato Compared",
      ja: "都心型マンションの坪単価：中央・千代田・港の三区比較",
    },
    desc: {
      ko: "세 구의 입지·역세권·건물 연령대를 감안해 평당가를 비교하는 프레임과, 외국인 바이어가 흔히 놓치는 보유 비용 층을 짚습니다.",
      en: "A framework to compare tsubo-level pricing across Chuo, Chiyoda, and Minato—plus holding-cost layers foreign buyers often miss.",
      ja: "中央・千代田・港で坪単価を比較する枠組みと、海外バイヤーが見落としがちな保有コストの層について整理します。",
    },
    body: {
      ko: `<p class="post-section-heading">1. 평당가만으로는 부족한 이유</p>

같은 “도심”이라도 **역 접근성·용적률·건축年·관리비 구조**가 다르면 평당 표시가격의 의미가 달라집니다. 신축 프리미엄이 큰 구간에서는 평당가가 높아도 **임대 수익·환매 유동성**이 뒷받침될 수 있고, 중고 재고가 많은 블록에서는 표면 단가가 낮아 보여도 **대규모 수선 적립금**이 부담으로 돌아올 수 있습니다.

<p class="post-section-heading">2. 세 구를 나누는 축</p>

**행정·업무 중심(치요다)**, **도심 동쪽 상업 허브(주오)**, **베이사이드와 대사관·다국적 기업 레이어(미나토)**는 각각 수요의 질이 다릅니다. 같은 면적이라도 “누가 이웃에 사는가”, “어떤 노선이 도보권인가”가 가격을 가르는 주요 변수입니다.

<p class="post-section-heading">3. 데이터는 REINS·통계에서 출발</p>

거래 분포와 사례 값은 [REINS](https://www.reins.or.jp/) 계열 자료를, 거시 인구·가구·경제 지표는 [総務省統計局](https://www.stat.go.jp/english/)를 함께 보는 습관이 안전합니다. 본문은 개인적 해석이며, 개별 매물 감정·등기·세무는 전문가 확인이 필요합니다.

<p class="post-section-heading">4. 체크리스트</p>

- 관리비·수선적립금·공용비 명목이 분리돼 공개되는지.
- **지역型条例**(최고 높이·일조·방재)가 용적률과 세대 수에 미친 잔여 영향.
- 환율·금리 변화가 **모기지 스트레스**에 미치는 시나리오 2종 이상.

<p class="post-section-heading">5. 맺으며</p>

3구 비교는 “어디가 싸다”가 아니라 **어떤 리스크를 감수하고 어떤 옵션을 사는가**의 질문으로 귀결됩니다.`,
      en: `<p class="post-section-heading">1. Why price per tsubo is not enough</p>

Even inside the “urban core,” **station access, FAR, building age, and fee structures** change what a headline tsubo price means. Prime new supply can look expensive yet be supported by **liquidity and rent depth**, while older inventory can look cheap yet hide **repair reserves**.

<p class="post-section-heading">2. What separates the three wards</p>

**Chiyoda** leans administrative and office-dense; **Chuo** anchors eastern retail and finance walkability; **Minato** layers bayfront, diplomatic, and multinational demand. Neighbors and train lines often explain gaps more than square meters.

<p class="post-section-heading">3. Start from REINS and official statistics</p>

Use [REINS](https://www.reins.or.jp/)-style case data alongside macro releases from [Statistics Japan](https://www.stat.go.jp/english/). This article is interpretive commentary, not appraisal or tax advice.

<p class="post-section-heading">4. Checklist</p>

- Whether management fees, reserves, and common charges are clearly split.
- How local zoning and disaster rules shaped **FAR and unit counts**.
- At least two **rate/FX stress** paths for mortgage affordability.

<p class="post-section-heading">5. Closing</p>

Comparing three wards is less about “cheaper” and more about **which risks and options you buy**.`,
      ja: `<p class="post-section-heading">1. 坪単価だけでは足りない理由</p>

同じ「都心」でも**駅アクセス・容積率・築年・管理費構造**が違えば、坪単価の意味合いは変わります。新築プレミアの大きいゾーンでは坪単価が高くても**賃料の厚みと流動性**で支えられる一方、中古在庫が厚いエリアでは見かけが安くても**大規模修繕積立**が負担になることがあります。

<p class="post-section-heading">2. 三区を分ける軸</p>

**千代田**は行政・オフィス寄り、**中央**は東側商業・金融の歩行者動線、**港**はベイエリアと多国籍企業・大使館レイヤーが重なります。同じ面積でも「誰が隣に住み、どの路線が徒歩圏か」が価格を分けます。

<p class="post-section-heading">3. REINSと公的統計から始める</p>

事例分布は[REINS](https://www.reins.or.jp/)系、マクロは[統計局](https://www.stat.go.jp/english/)を併読するのが安全です。本稿は解釈にすぎず、個別の鑑定・登記・税務は専門家確認が必要です。

<p class="post-section-heading">4. チェックリスト</p>

- 管理費・修繕積立・共益費が明確に分かれているか。
- 地域型条例が**容積と戸数**に残した影響。
- 金利・為替の**住宅ローンストレス**シナリオを2本以上。

<p class="post-section-heading">5. おわりに</p>

三区比較は「どこが安いか」より**どのリスクとオプションを買うか**の問いに帰着します。`,
    },
  },
  {
    slug: "hotel-reit-vs-office-reit-post-covid",
    category: "investment",
    date: "2026-04-19T05:00:00Z",
    sources: ["https://www.boj.or.jp/en/statistics/index.htm/", "https://www.fsa.go.jp/en/"],
    tags: { ko: ["J-REIT", "호텔", "오피스", "투자"], en: ["J-REIT", "Hotel", "Office", "Investing"], ja: ["J-REIT", "ホテル", "オフィス", "投資"] },
    title: {
      ko: "호텔 리츠 vs 오피스 리츠, 코로나 이후 어느 쪽이 회복했나",
      en: "Hotel REITs vs Office REITs: Which Recovered More After COVID?",
      ja: "ホテルREITとオフィスREIT、コロナ後どちらが回復したか",
    },
    desc: {
      ko: "ADR·객실 점유와 오피스 임대의 회복 속도를 리츠 관점에서 비교하고, 금리·관광·기업 실적이 각 자산군에 주는 시차를 정리합니다.",
      en: "Compare recovery paths for hotel ADR/occupancy versus office leasing through a J-REIT lens, including lags from rates, tourism, and earnings.",
      ja: "ADR・客室稼働とオフィス賃貸の回復をJ-REITの視点で比較し、金利・観光・企業業績のタイムラグを整理します。",
    },
    body: {
      ko: `<p class="post-section-heading">1. 회복의 정의부터 맞추기</p>

호텔은 **객단가·점유율·인건비·마케팅비**가 빠르게 변하고, 오피스는 **장기 임대 계약**이 현금흐름을 매끈하게 만들 수 있습니다. “주가 회복”과 “펀더멘털 회복”을 구분하지 않으면 비교가 무의미해집니다.

<p class="post-section-heading">2. 관광과 출장 수요의 온도 차</p>

인바운드가 강한 구간에서 호텔 리츠는 **RevPAR** 개선을 빠르게 보일 수 있지만, 글로벌 경기 둔화 시 변동성도 큽니다. 오피스는 테넌트 업종과 **임대 잔존 기간**에 따라 회복 곡선이 갈립니다.

<p class="post-section-heading">3. 금리·금융 환경</p>

[일본은행 통계](https://www.boj.or.jp/en/statistics/index.htm/)와 [금융청(FSA)](https://www.fsa.go.jp/en/)이 공개하는 시장 구조 자료는 리츠 밸류에이션 논의의 출발점입니다. 본 글은 특정 종목을 추천하지 않습니다.

<p class="post-section-heading">4. 실무적으로 묻는 질문</p>

- 포트폴리오 내 **지역·등급·테넌트** 분산이 충분한가.
- 호텔 자산의 **운영자·ブランド契約** 리스크는 어떻게 분리되는가.
- 오피스는 **인센티브 임대**가 NOI를 일시 왜곡하지 않는가.

<p class="post-section-heading">5. 맺으며</p>

두 자산군은 “승자”가 아니라 **서로 다른 베팅 구조**입니다. 개별 리츠의 공시·適時開示를 확인하지 않은 채 섹터만으로 판단하면 위험합니다.`,
      en: `<p class="post-section-heading">1. Align the definition of recovery</p>

Hotels move quickly with **ADR, occupancy, labor, and marketing**; offices can smooth cash flows with **long leases**. Without separating “price recovery” from “fundamental recovery,” sector comparisons misfire.

<p class="post-section-heading">2. Tourism vs business-travel temperature</p>

Inbound strength can lift hotel REIT **RevPAR** fast, but global slowdowns raise volatility. Offices split by tenant industry and **remaining lease term**.

<p class="post-section-heading">3. Rates and financial plumbing</p>

Start with [Bank of Japan statistics](https://www.boj.or.jp/en/statistics/index.htm/) and [FSA](https://www.fsa.go.jp/en/) materials when discussing J-REIT valuations. No security is recommended here.

<p class="post-section-heading">4. Practical questions</p>

- Geographic and **tenant diversification** in the portfolio.
- Hotel **operator/brand** contract risk allocation.
- Whether office **leasing incentives** distort NOI.

<p class="post-section-heading">5. Closing</p>

These are different bet structures, not a single “winner.” Read filings before trading.`,
      ja: `<p class="post-section-heading">1. 回復の定義をそろえる</p>

ホテルは**客室単価・稼働率・人件費・販促費**の変動が速く、オフィスは**長期賃貸借**でキャッシュフローを滑らかにし得ます。「株価の回復」と「実体の回復」を分けないと比較は空振りします。

<p class="post-section-heading">2. 観光と出張需要の温度差</p>

インバウンドが強い局面ではホテルREITの**RevPAR**改善が速く見えますが、世界景気の減速局面ではボラティリティも大きくなります。オフィスはテナント業種と**残存契約期間**で回復曲線が分かれます。

<p class="post-section-heading">3. 金利・金融環境</p>

議論の出発点には[日銀統計](https://www.boj.or.jp/en/statistics/index.htm/)や[金融庁](https://www.fsa.go.jp/en/)の公開資料があります。特定銘柄の推奨はしません。

<p class="post-section-heading">4. 実務的な問い</p>

- ポートフォリオの**地域・グレード・テナント**分散は十分か。
- ホテル資産の**オペレーター／ブランド契約**リスクはどう切り分けられるか。
- オフィスの**インセンティブ付き賃貸**がNOIを歪めていないか。

<p class="post-section-heading">5. おわりに</p>

二者は「勝ち負け」ではなく**異なるベット構造**です。開示を読まずにセクターだけで判断するのは危険です。`,
    },
  },
  {
    slug: "nihonbashi-mitsui-redevelopment-pipeline-three",
    category: "investment",
    date: "2026-04-20T01:00:00Z",
    sources: ["https://www.mlit.go.jp/en/", "https://www.metro.tokyo.lg.jp/english/"],
    tags: { ko: ["니혼바시", "미쓰이", "재개발", "도쿄"], en: ["Nihonbashi", "Mitsui", "Redevelopment", "Tokyo"], ja: ["日本橋", "三井", "再開発", "東京"] },
    title: {
      ko: "니혼바시 재개발 로드맵: 미쓰이 후속 프로젝트를 읽는 세 가지 축",
      en: "Nihonbashi Redevelopment Roadmap: Three Axes to Read Mitsui-Led Follow-On Projects",
      ja: "日本橋再開発ロードマップ：三井系フォローオンを読む三つの軸",
    },
    desc: {
      ko: "상점街·역세권·방재·녹지를 묶는 공공·민간 공표 자료를 바탕으로, 재개발 파이프라인을 투자자 관점에서 해석하는 틀을 제시합니다.",
      en: "A reader’s framework for Mitsui-aligned Nihonbashi pipelines—retail arcades, stations, resilience, and green space using public disclosures.",
      ja: "商店街・駅前・防災・緑地をつなぐ公表資料から、三井軸の日本橋パイプラインを投資視点で読む枠を示します。",
    },
    body: {
      ko: `<p class="post-section-heading">1. 니혼바시는 “한 개의 프로젝트”가 아니다</p>

코레도·무로마치에 이르는 상점街 네트워크와 역세권 업무·주거 블록은 **단선적 공급**이 아니라 **동선 전체의 재배치**입니다. 따라서 특정 필지의 사례만 보고 전체 프리미엄을 추정하면 오차가 큽니다.

<p class="post-section-heading">2. 세 가지 축: 동선·방재·녹지</p>

동선은 보행·상업·관광의 **클러스터링**을, 방재는 초고층·密集市街地에서의 **避難経路・インフラ**를, 녹지는 장기적 **거주자·근로자 체류時間**을 좌우합니다. 세 축이 동시에 개선될 때 지역 임대료와 입지 프리미엄이 함께 움직이는 경우가 많습니다.

<p class="post-section-heading">3. 공공 자료는 MLIT·도쿄도에서</p>

도시·토지 정책의 큰 틀은 [국토교통성](https://www.mlit.go.jp/en/), 광역 도시 기능은 [도쿄도 영문 포털](https://www.metro.tokyo.lg.jp/english/)이 제공합니다. 민간 개발사의 프레젠테이션은 **방향성**을 보는 용도로 두고, 수치는 가능한 한 **1차 출처**와 교차 확인합니다.

<p class="post-section-heading">4. 투자자가 스스로에게 할 질문</p>

- 재개발 이후 **상업 임대 심도**가 실제로 두꺼워지는가, 아니면 단기 이벤트 수요인가.
- 오피스·호텔·주거의 **기능 믹스**가 시간대별로 상호 보완하는가.
- **금리·건설비** 상승이 사업 수익성 일정을 압박하지 않는가.

<p class="post-section-heading">5. 맺으며</p>

니혼바시는 역사적 상징과 현대 복합개발이 겹친 **장기 테마**입니다. 본 글은 학습 노트이며 특정 사업의 수익을 보장하지 않습니다.`,
      en: `<p class="post-section-heading">1. Nihonbashi is not one project</p>

Retail arcades feeding into office and residential blocks behave as **pedestrian-system redesign**, not a single parcel story. Pricing one lot without the network misstates premiums.

<p class="post-section-heading">2. Three axes: flow, resilience, green</p>

Circulation drives retail/tourism clustering; resilience shapes **evacuation and infrastructure** in dense high-rise districts; green space anchors long **dwell time** for residents and workers. When all three move together, rents often follow.

<p class="post-section-heading">3. Public references: MLIT and Tokyo</p>

Use [MLIT](https://www.mlit.go.jp/en/) for national land/urban policy and the [Tokyo Metropolitan Government English portal](https://www.metro.tokyo.lg.jp/english/) for megacity functions. Treat developer decks as directional; cross-check numbers with primary sources.

<p class="post-section-heading">4. Investor questions</p>

- Is retail depth **structural** post-redevelopment or event-driven?
- Do office/hotel/residential mixes **complement by time-of-day**?
- Do **rates and construction costs** squeeze timelines?

<p class="post-section-heading">5. Closing</p>

Nihonbashi is a long-cycle theme where history and mixed-use overlap. This note is educational, not a profit guarantee.`,
      ja: `<p class="post-section-heading">1. 日本橋は「一プロジェクト」ではない</p>

コレドや室町に連なる商店街ネットワークと駅前のオフィス・住居は、**単線の供給**ではなく**動線全体の再配置**です。一筆の事例だけでプレミアムを推定すると誤差が大きくなります。

<p class="post-section-heading">2. 三つの軸：動線・防災・緑</p>

動線は商業・観光の**クラスタリング**、防災は高密度市街地での**避難経路・インフラ**、緑地は長期の**滞在時間**を左右します。三つが同時に改善すると賃料と立地プレミアが連動しやすいです。

<p class="post-section-heading">3. 公的資料はMLITと東京都</p>

国の土地・都市政策の枠は[国土交通省](https://www.mlit.go.jp/en/)、広域都市機能は[東京都英語ポータル](https://www.metro.tokyo.lg.jp/english/)が支えます。民間資料は方向性の確認に留め、数値は**一次情報**で照合します。

<p class="post-section-heading">4. 投資家への問い</p>

- 再開発後の商業**テナントの厚み**は構造的か、イベント需要か。
- オフィス・ホテル・住居の**時間帯補完**は成立するか。
- **金利・建設費**が収益スケジュールを圧迫しないか。

<p class="post-section-heading">5. おわりに</p>

日本橋は歴史象徴と複合開発が重なる**長期テーマ**です。本稿は学習メモにすぎず、特定事業の収益を保証するものではありません。`,
    },
  },
  {
    slug: "tokyo-small-rental-yield-vs-capital-gain-breakeven",
    category: "investment",
    date: "2026-04-20T02:30:00Z",
    sources: ["https://www.mlit.go.jp/en/", "https://www.boj.or.jp/en/statistics/index.htm/"],
    tags: { ko: ["임대", "수익률", "도쿄", "투자"], en: ["Yield", "Capital gains", "Tokyo", "Investing"], ja: ["利回り", "キャピタルゲイン", "東京", "投資"] },
    title: {
      ko: "임대 수익률 vs 시세 차익: 도쿄 소형 투자 물건의 손익분기",
      en: "Rental Yield vs Capital Gain: Breakeven Thinking for Small Tokyo Investment Units",
      ja: "賃料利回りとキャピタルゲイン：東京の小型投資物件の損益分岐",
    },
    desc: {
      ko: "표면 수익률·보유 비용·세금·금리를 한 표에 올려 소형 물건에서 ‘차익만 노릴 것인가, 현금흐름을 노릴 것인가’를 분리해 봅니다.",
      en: "Lay surface yield, holding costs, tax, and rates on one sheet to separate cash-flow bets from price-appreciation bets on small Tokyo units.",
      ja: "表面利回り・保有コスト・税・金利を一枚に載せ、小型物件でキャッシュフローか値上がりかを切り分けます。",
    },
    body: {
      ko: `<p class="post-section-heading">1. 표면 수익률의 함정</p>

임대료를 매입가로 나눈 숫자는 **공실·수선·관리비·세금·보험**을 빼기 전의 이야기입니다. 특히 소형은 입주자 교체 빈도가 높아 **공실 손실**이 누적되기 쉽습니다.

<p class="post-section-heading">2. 시세 차익 베팅의 조건</p>

금리·엔화·신규 공급이 동시에 유리할 때 가격 상승이 **가속**될 수 있지만, 역방향일 때는 **유동성**이 먼저 얇아질 수 있습니다. [일본은행 통계](https://www.boj.or.jp/en/statistics/index.htm/)는 금융 조건을 읽는 기본 장치입니다.

<p class="post-section-heading">3. 손익분기 시트</p>

- 5년·10년 **누적 현금흐름**(세후 간이 추정).
- 매각 시 **취득·보유·양도** 비용 밴드.
- **금리 +100bp** 스트레스에서도 버티는지.

<p class="post-section-heading">4. MLIT·시장 구조</p>

토지·건축・거래 제도의 큰 틀은 [MLIT](https://www.mlit.go.jp/en/)에서 확인합니다. 본 글은 개인적 메모이며 세무·법률 자문을 대체하지 않습니다.

<p class="post-section-heading">5. 맺으며</p>

소형 물건은 “고수익”과 “고변동성”이 동전의 양면인 경우가 많습니다. 시나리오를 두 개 이상 항상 들고 가십시오.`,
      en: `<p class="post-section-heading">1. Surface yield traps</p>

Rent divided by price ignores **vacancy, repairs, fees, tax, insurance**. Small units often churn tenants, so **void loss** stacks up.

<p class="post-section-heading">2. When price appreciation accelerates</p>

Rates, FX, and supply can align to lift prices—or thin **liquidity** first when they reverse. Start financial conditions with [BOJ statistics](https://www.boj.or.jp/en/statistics/index.htm/).

<p class="post-section-heading">3. Breakeven sheet</p>

- 5y/10y **cumulative cash flow** (after-tax sketch).
- Sale band for **acquisition, holding, and disposal** costs.
- Survival under **+100bp** rates.

<p class="post-section-heading">4. MLIT for market structure</p>

Use [MLIT](https://www.mlit.go.jp/en/) for land/building/trade rules. Not tax or legal advice.

<p class="post-section-heading">5. Closing</p>

Small tickets often pair “high headline yield” with **high volatility**. Always carry two scenarios.`,
      ja: `<p class="post-section-heading">1. 表面利回りの落とし穴</p>

賃料÷取得額は**空室・修繕・管理費・税・保険**控除前の話です。小型は入居者の入替が速く、**空室損失**が積み上がりやすいです。

<p class="post-section-heading">2. 値上がりベットの条件</p>

金利・為替・新規供給が同時に有利なとき価格上昇が**加速**し得ますが、逆風では**流動性**が先に薄くなることも。[日銀統計](https://www.boj.or.jp/en/statistics/index.htm/)で金融条件を読みます。

<p class="post-section-heading">3. 損益分岐シート</p>

- 5年・10年の**累計キャッシュフロー**（税後イメージ）。
- 売却時の**取得・保有・譲渡**コストのレンジ。
- **金利+100bp**でも持ちこたえるか。

<p class="post-section-heading">4. MLITと市場構造</p>

土地・建物・取引制度の枠は[MLIT](https://www.mlit.go.jp/en/)。税務・法務の代替ではありません。

<p class="post-section-heading">5. おわりに</p>

小型は「高利回り」と「高ボラティリティ」が表裏になりがちです。シナリオは常に二本持ちましょう。`,
    },
  },
];

function fm(lang, p) {
  const src = p.sources;
  const ref = src;
  return `---
title: "${p.title[lang]}"
description: "${p.desc[lang]}"
pubDatetime: ${p.date}
author: GSF
lang: ${lang}
category: ${p.category}
tags:
${p.tags[lang].map(t => `  - ${t}`).join("\n")}
sources:
${src.map(s => `  - "${s}"`).join("\n")}
references:
${ref.map(s => `  - "${s}"`).join("\n")}
---

${p.body[lang].trim()}
${disclaimer[lang]}
`;
}

for (const p of posts) {
  for (const lang of ["ko", "en", "ja"]) {
    const dir = path.join(blogRoot, lang);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${p.slug}.md`), fm(lang, p), "utf8");
  }
}

console.log("Wrote", posts.length * 3, "files");
