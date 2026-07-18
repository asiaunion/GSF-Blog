# Voice Full Pilot #6 — Claude final package

> slug: `tokyo-korean-community-beyond-shinokubo`
> role: Claude 주도 편집자 — repo 직접 확정·commit·deploy 없음
> 이력: Claude initial(2026-07-18) → GPT 완성도 리뷰(`..._gpt-review.md`) → 본 Claude final(2026-07-18, GPT 제안 6건 중 3건 채택·2건 부분채택·1건 기각)
> 다음 단계: AG 반영(§4 반영 범위 참고) → Cursor 최종 검증

---

## A. 기존 사실층 잠금표 (유지 — 변경 금지)

| # | 사실/claim | 출처 |
|---|-----------|------|
| 1 | 신오쿠보(新大久保) = 도쿄 대표 한인 상권(문화·소비 중심) | 본문 자체(정성적 관찰) |
| 2 | 민단(民団)은 신주쿠·이타바시·미나토 등 도쿄 여러 구에 지부 보유 | `mindan.org/tokyo/sanka.php` |
| 3 | 민단 도쿄본부·생활상담센터 = 미나미아자부(南麻布) 소재 | `mindan.org/soudan/aboutus.php` |
| 4 | 민단 생활상담센터 = 법률·세무·상속·재류자격·연금 상담(변호사·세무사·행정서사 예약상담) | 상동 |
| 5 | KSC(K-Startup Center) 도쿄 = 토라노몬 힐즈 비즈니스타워 CIC 도쿄 내 위치 | `k-startupcenter.org` |
| 6 | KSC 도쿄 지원 내용 = 사무공간·현지투자연결·기업네트워킹 | 상동 |
| 7 | 아자부주반·히로오·시로카네다이 = 대사관·국제학교 인접 국제주거지 — **단, 한국인 집중 근거는 확인되지 않음**(명시적 부인 유지) | 본문 자체 |
| 8 | 이타바시 = 민단 지부 있음, **신오쿠보 규모 코리아타운 근거는 없음**(명시적 부인 유지) | 본문 자체 |
| 9 | "한국인 커뮤니티 이동이 부동산 가격을 움직인다"는 인과 = **확인 안 됨, 명시적으로 부인** | 본문 자체 |
| 10 | 4개 출처(민단 지부목록·민단 생활상담센터·KSC 도쿄·K-Startup 글로벌진출지원) 그대로 유지 | frontmatter `sources`/`citeSources` |
| 11 | FAQ 3문항 질문·구조 | 본문 |
| 12 | "함께 보면 좋은 시리즈" 링크 3개 | 본문 |
| 13 | **title·description·slug·H2 spine 9개** — 아래 전부 동결, 문구 변경 없음: <br>① (H2 없는 도입) ② 도쿄 한인타운의 중심은 왜 신오쿠보인가 ③ 아자부·히로오는 한국인 커뮤니티 거점인가 ④ 한국 스타트업은 왜 토라노몬을 찾는가 ⑤ 목적에 따라 어느 지역을 먼저 확인해야 하나 ⑥ 먼저 구분할 세 가지 ⑦ 나에게 필요한 한국어 생활 기반은 어디서 찾나(+H3 3개) ⑧ 한국인 커뮤니티가 부동산 가격을 움직인다고 볼 수 있나 ⑨ 도쿄 한국인 커뮤니티 FAQ(+H3 3개) ⑩ 함께 보면 좋은 시리즈 | frontmatter + 본문 |

---

## B. 현재 글 진단

이 편은 2026-07-18 §1–4/FA refresh로 이미 **사실 정확성·Reader First 표현**은 정리된 상태(Tier1 #6 완료). 남은 문제는 문체 층이다.

- **건조함**: 거의 전 문장이 결론이 이미 정리된 선언문("~입니다/~아닙니다")이다. 저자가 무엇을 먼저 생각했다가 왜 바꿨는지 — 즉 **판단 과정**이 드러나지 않는다. FA로 미검증 주장을 "삭제"한 결과, 남은 글은 안전하지만 "왜 그 주장이 틀렸다고 판단했는가"의 과정 없이 결론만 남았다.
- **공통장치 전무**: 대표 문장(반복되는 기억할 문장) 없음. 중간 질문은 H2 제목 자체가 질문형이라 형식은 있으나 본문 안에서 독자를 앞으로 끄는 훅이 없음. 노트 문장 없음. 마무리("세 지도를 하나로 겹쳐 읽으면 실제보다 큰 변화로 오해하기 쉽습니다")는 여운보다 **요약 진술**에 가깝다.
- **1인칭 온도 부족**: "저는/제가"가 사실상 없음 — 전체가 3인칭 서술체. Joseph 톤(습니다체 + 판단 과정 공개)의 "공개" 절반이 비어 있다.
- **모바일 문단**: 이미 대체로 2–3문장 — 준수. 추가 조정 불필요.
- **은어·숫자 나열**: 이미 없음(Voice Lite로 정리 완료) — 이 편은 애초에 정성적 사실 확인 글이라 숫자 밀도 문제 자체가 낮음.
- **결론**: Voice Full 작업은 새 사실 추가가 아니라, **기존 사실을 "통념 제시 → 확인 → 수정"의 순서로 재배열**하는 것으로 충분하다. 파일 안에 이미 있는 "확인할 수 있는 것은 ~뿐이다" 류 문장이 재료로 쓸 수 있는 판단 과정의 씨앗이다.

---

## C. KO 최종 편집본 (문단별 replacement package)

> H2/H3 헤더는 전부 원문 그대로. 굵게 표시한 두 곳(도입의 볼드 질문 / 마지막 H2의 볼드 결론)이 **대표 문장 장치**(도입↔Joseph's View 대응부에서 반복). 변경 없는 섹션은 "변경 없음"으로 표시.

### 도입부 (H2 앞) — **교체**

```
도쿄의 대표적인 한인 상권을 하나만 꼽으라면, 지금도 신오쿠보(新大久保)입니다. 한국 식당과 식품점, K-뷰티 매장을 한곳에서 찾으려면 먼저 이곳을 보게 됩니다.

저도 처음에는 여기서 이야기를 끝낼 생각이었습니다. 그런데 민단 지부 목록과 K-Startup Center(KSC) 도쿄의 위치를 하나씩 확인하면서 질문이 하나 늘었습니다. **한인 상권과, 한국인이 살기 좋은 동네는 같은 뜻일까요?**

막상 확인해보니, 그림이 조금 달랐습니다. 생활 상담과 비즈니스 지원까지 전부 신오쿠보에 모여 있지는 않았습니다. 민단은 도쿄 여러 구에 지부를 두고 있고, 한국 스타트업의 일본 진출을 돕는 KSC 도쿄는 토라노몬(虎ノ門)에 있습니다.

그래서 이 글은 '한국인이 어디에 많이 사는가'를 단정하지 않습니다. 대신 **문화·생활 지원·비즈니스라는 목적에 따라 어디를 확인하면 되는지** 지도를 셋으로 나눠 봅니다.
```

*(변경 근거: 기존 사실 그대로 — 신오쿠보 상권·민단 지부 분포·KSC 토라노몬 위치. 새 사실 0. "저도 처음에는~막상 확인해보니" 구조로 사고 과정 표지 추가. GPT #1 채택 — "확인해보니 아니었습니다"의 선언형 어조를 조사 과정형으로 완화)*

### H2 "도쿄 한인타운의 중심은 왜 신오쿠보인가" — **첫 문장만 교체**

```
앞의 질문부터 답해보겠습니다. 신오쿠보는 지금도 한국 식당과 식품점, K-뷰티 매장이 가장 많이 모인, 도쿄의 대표적인 한인 상권입니다. 다만 이곳을 도쿄에 사는 한국인의 주거 분포 전체로 읽어서는 안 됩니다.
```

이하 불릿 2개(문화와 소비 / 생활 정보) **변경 없음**.

### H2 "아자부·히로오는 한국인 커뮤니티 거점인가" — **교체**

```
그렇다면 아자부·히로오는 어떨까요? 대사관과 국제학교가 많다 보니, 저도 처음에는 한국인 자산가나 전문직이 많이 모여 사는 동네일 거라고 생각했습니다.

아자부주반(麻布十番)과 히로오(広尾)는 분명 외국어 환경과 도심 접근성이 좋은 국제 주거지입니다. 다만 공개된 통계만 놓고 보면, 이 지역을 한국인의 새 집거지나 자산가 네트워크라고 부르기는 어렵습니다.

확인할 수 있는 사실은 하나입니다. 민단 도쿄본부와 생활상담센터가 미나미아자부(南麻布)에 있고, 체류·세무·상속·연금 상담 창구를 운영한다는 것입니다. 제 처음 생각과, 실제로 확인 가능한 사실 사이에는 거리가 있었습니다.
```

*(변경 근거: "한국인 자산가 집중"은 이미 FA에서 삭제된 claim — 여기서는 사실로 재도입하는 것이 아니라 "제가 처음에 그렇게 생각했다"는 1인칭 가설로 명명한 뒤 곧바로 데이터로 부인하는 통념→확인 구조. 새 claim 아님, 기존 부인 문장 순서만 재배열. GPT #2 채택 — 질문 뒤 3인칭 서술("인상을 주기 쉬운 동네입니다") 대신 1인칭 가설-수정 흐름으로 교체, SSOT "처음 생각 → 데이터 재확인 → 판단 변화" 패턴에 더 근접)*

### H2 "한국 스타트업은 왜 토라노몬을 찾는가" — **첫 문장만 교체**

```
세 번째 지도로 넘어가 보겠습니다. 토라노몬에는 한국 스타트업의 일본 진출을 지원하는 공식 거점이 실제로 있습니다.
```

이하 이미지·불릿 2개 **변경 없음**.

### H2 "목적에 따라 어느 지역을 먼저 확인해야 하나" — **변경 없음**

### H2 "먼저 구분할 세 가지" — **변경 없음** (스캔용 recap 불릿 — 서사 삽입 시 오히려 가독성 저하)

### H2 "나에게 필요한 한국어 생활 기반은 어디서 찾나" (+ H3 3개) — **변경 없음**

첫 문장 "한인 상권과 살기 좋은 동네는 같은 뜻이 아닙니다."가 도입부 볼드 질문의 **답이자 대표 문장 반복**으로 이미 정확히 기능함 — 손대지 않음. H3 3개(언어 편의성/커리어와 비즈니스/국제적인 주거 환경) 본문 그대로.

### H2 "한국인 커뮤니티가 부동산 가격을 움직인다고 볼 수 있나" — **교체** (노트 문장 + 여운 있는 끝)

```
현재 확인한 공식 자료만으로는 그렇게 결론 내리기 어렵습니다. KSC 도쿄의 존재는 토라노몬이 한국 스타트업의 일본 진출 지원 거점이라는 사실을 보여줍니다. 하지만 이것만으로 한국인 주거 수요가 늘었거나 인근 임대료를 끌어올렸다고 말할 수는 없습니다.

민단 지부 위치도 마찬가지입니다. 생활 지원망을 보여줄 뿐, 해당 지역의 한국인 인구나 주택 수요를 뜻하지 않습니다. 부동산 판단에는 국토교통성 실거래 자료, 임대 매물, 공실률처럼 별도의 시장 데이터를 함께 봐야 합니다.

이번 글을 정리하면서 끝까지 남았던 질문은 하나였습니다. 상권과 지원 기관들을 같은 지도로 봐도 되는가. 답은 아니오였습니다 — **상권, 생활 지원 기관, 기업 지원 기관은 서로 다른 지도**입니다.

세 지도를 하나로 겹쳐 읽으면 실제보다 큰 변화로 보입니다. 앞으로 이 세 지도는 따로 보려고 합니다. 다음에 "어느 동네에 한국인이 많다더라"는 말을 듣는다면, 그 말이 이 세 지도 중 어느 것을 가리키는지 먼저 물어보게 될 것 같습니다.
```

*(변경 근거: 문단 1·2는 원문과 사실 100% 동일, 문장 순서만 소폭 정리. 문단 3에 노트 문장 신설 — SSOT 시리즈 공통장치 규정 그대로 적용, 새 사실 없음. 문단 4는 원문의 "오해하기 쉽습니다" 요약형 종결을 독자가 직접 다음에 적용해볼 수 있는 여운형 질문으로 교체 — 새 주장 없음, 기존 결론의 재진술. GPT #3 채택("제가 가장 오래 붙잡고 있었던"→"끝까지 남았던"으로 담백화) · GPT #4 부분채택(Joseph 개인의 다짐 한 줄 "앞으로 이 세 지도는 따로 보려고 합니다" 추가, 기존 독자-질문형 여운은 유지·대체하지 않음) · GPT #6 부분채택(신설 문단 내부에서 "사람이 모이는 상권과, 사람을 돕는 기관과, 기업을 돕는 기관을" 3항 완전 열거를 "상권과 지원 기관들을"로 압축 — 볼드 문장에서 1회만 완전 열거))*

### H2 "도쿄 한국인 커뮤니티 FAQ" (+ H3 질문 3개) — **변경 없음**

FAQ는 구조화 데이터(JSON-LD) 소스로 쓰일 가능성이 높아 이번 패스에서 건드리지 않음.

### H2 "함께 보면 좋은 시리즈" — **변경 없음**

---

## D. EN/JA 의미 정합 지시

> KO 변경 문단과 1:1 대응. 직역이 아니라 자연스러운 동일 논리 구조로 — AG가 다듬어도 됨. **새 사실·새 수치·새 인과 추가 금지**는 EN/JA도 동일 적용.

### EN — 변경 대상 문단 (참고 번역안)

**도입부 교체**:
```
Shin-Okubo is still the clearest answer if you can only name one Korean district in Tokyo. It's the first place to look for Korean restaurants, groceries, beauty products, and pop-culture stores in one area.

I expected the story to stop there. Then I checked the Mindan branch list and the location of K-Startup Center (KSC) Tokyo one by one, and one question stayed with me: **Is a Koreatown the same thing as a good place for Koreans to live?**

The picture looked a little different once I checked. Resident support and business assistance are not concentrated in Shin-Okubo. Mindan operates branches across Tokyo, while KSC Tokyo supports Korean startups from Toranomon.

So this article does not claim that Koreans are concentrated in one place. It separates three different maps: **culture and shopping, resident support, and business support**.
```

**"Why Is Shin-Okubo..." 첫 문장**:
```
Let's answer the opening question first. Shin-Okubo is still Tokyo's most visible cluster of Korean restaurants, groceries, beauty shops, and cultural retail. That does not make it a map of where Koreans across Tokyo live.
```
(이하 불릿 변경 없음)

**"Are Azabu and Hiroo..." 교체**:
```
So what about Azabu and Hiroo? With embassies and international schools nearby, I initially assumed wealthy Korean professionals were concentrated there too.

Azabu-Juban and Hiroo are certainly international residential areas with strong access to central Tokyo. But public data alone does not establish them as new Korean residential clusters or private investor networks.

What can actually be verified is one thing: Mindan's Tokyo headquarters and life consultation center are located in Minami-Azabu, offering guidance on residence status, tax, inheritance, and pensions. My initial assumption and the verifiable facts turned out to be two different things.
```

**"Why Do Korean Startups..." 첫 문장**:
```
On to the third map. Toranomon does have an official support base for Korean startups entering Japan.
```
(이하 불릿 변경 없음)

**"Do Korean Community Hubs Affect..." 교체**:
```
The official sources reviewed here do not support that conclusion. KSC Tokyo confirms that Toranomon is a support location for Korean startups entering Japan. It does not prove that Korean residential demand has increased or raised nearby rents.

Mindan branch locations show the same pattern. They confirm a support network, not the size of the Korean population or housing demand in any ward. Property decisions require separate market evidence such as transaction records, asking rents, and vacancy rates.

The question that stayed with me until the end of writing this was simple: can a shopping district and support institutions be read as one map? The answer was no — **they are three different maps: a shopping district, a resident-support institution, and a business-support institution.**

Collapse them into one, and the change looks bigger than it is. I plan to keep reading these three maps separately going forward. The next time someone says a neighborhood is "full of Koreans," it's worth asking which of these three maps they actually mean.
```

나머지 섹션(목적에 따라/세 가지 구분/한국어 생활 기반/FAQ/Recommended Series) **변경 없음** — KO와 동일하게 그대로 유지.

### JA — 변경 대상 문단 (참고 번역안)

**도입부 교체**:
```
東京の代表的な韓国系エリアを一つだけ挙げるなら、今も新大久保です。韓国料理店、食品店、コスメ店を一つの街でまとめて探すなら、まずここです。

正直、最初はここで話が終わると思っていました。ところが民団の支部一覧とK-Startup Center（KSC）東京の所在地を一つずつ確認していくうちに、ある疑問が残りました。**コリアタウンと、韓国人にとって住みやすい街は、同じ意味なのでしょうか。**

確認してみると、思っていたより違う姿が見えてきました。生活相談やビジネス支援まで新大久保に集中しているわけではありません。民団は東京都内に支部を持ち、韓国スタートアップの日本進出を支援するKSC東京は虎ノ門にあります。

そこでこの記事は、「韓国人がどこに多く住んでいるか」を断定しません。代わりに**文化・生活支援・ビジネス支援という目的別に、三つの地図**に分けて整理します。
```

**「なぜ新大久保が…」第一文**:
```
先の問いから答えます。新大久保は今も、韓国料理店、食品店、コスメ店が最も集まる東京の代表的な韓国系商業エリアです。ただし、東京に住む韓国人の居住分布そのものを示す場所ではありません。
```
(以下の箇条書き 変更なし)

**「麻布・広尾は…」教替**:
```
では麻布・広尾はどうでしょうか。大使館やインターナショナルスクールが多いため、私も最初は韓国人の富裕層や専門職が集中して住んでいる街だろうと思っていました。

麻布十番や広尾は、確かに都心へのアクセスがよい国際的な住宅地です。ただし、公開統計だけからは、韓国人の新しい集住地や投資家ネットワークと呼ぶことはできません。

実際に確認できるのは一つだけです。民団東京本部と生活相談センターが南麻布にあり、在留資格、税務、相続、年金の相談窓口を設けていること。最初の思い込みと、確認できる事実の間には距離がありました。
```

**「韓国スタートアップは…」第一文**:
```
三つ目の地図に移ります。虎ノ門には、韓国スタートアップの日本進出を支援する公式拠点が実際にあります。
```
(以下の箇条書き 変更なし)

**「韓国人コミュニティが不動産価格を…」教替**:
```
今回確認した公式資料だけでは、そのように結論づけることはできません。KSC東京の存在は、虎ノ門が韓国スタートアップの日本進出支援拠点であることを示します。しかし、韓国人の住宅需要が増え、周辺賃料を押し上げたことまでは証明しません。

民団支部の所在地も同じです。生活支援網を示すだけで、各地域の韓国人人口や住宅需要を意味しません。不動産判断には、実取引、募集賃料、空室率など別の市場データが必要です。

書き終えるまで残っていた問いは一つでした。商業エリアと支援機関を、同じ一枚の地図として読んでいいのか。答えは「いいえ」でした — **商業エリア、生活支援機関、企業支援機関は、それぞれ別の地図**です。

一枚に重ねて読むと、変化は実際より大きく見えます。これからもこの三つの地図は、分けて見ていくつもりです。次に「あの街には韓国人が多いらしい」と聞いたときは、それがこの三つの地図のどれを指しているのか、まず確かめてみたくなるはずです。
```

나머지 섹션 **변경 없음**.

---

## E. GPT 리뷰 수용표

> GPT 리뷰 전문: `claude-drops/2026-07-18_voice-full_tokyo-korean-community-beyond-shinokubo_gpt-review.md`

| # | GPT 제안 위치 | GPT 제안 요약 | 채택/기각 | 이유 |
|---|--------------|--------------|-----------|------|
| 1 | 도입부 3문단 | "확인해보니 아니었습니다" → 조사 과정형으로 완화 | **채택** | 선언형 어조를 완화하라는 지적이 타당. "막상 확인해보니, 그림이 조금 달랐습니다"로 반영(GPT 원안 중 "그림이 조금 달랐습니다" 계열 채택, "생각보다 달랐습니다" 계열은 기각 — 바로 앞 문장에 "하나씩 확인"이 이미 있어 중복 방지) |
| 2 | H2 "아자부·히로오" 첫 문장 | 질문 뒤 1인칭 추론으로 연결 | **채택** | SSOT "처음 생각 → 데이터 재확인 → 판단 변화" 패턴과 정확히 일치. 단, GPT 원안 "한국인들이 많이 사는 동네"를 "한국인 자산가나 전문직이 많이 모여 사는 동네"로 구체화 — 기존에 FA로 삭제됐던 정확한 claim(자산가·전문직 집중)을 겨냥해야 이후 문단의 부인이 논리적으로 맞물림 |
| 3 | H2 "부동산 가격" 노트 문장 | "제가 가장 오래 붙잡고 있었던"→"끝까지 남았던"으로 완화 | **채택** | 더 담백하고 Joseph다운 표현이라는 지적에 동의. 그대로 반영 |
| 4 | H2 "부동산 가격" 마무리 | 교훈형 종결 대신 관찰·기록형으로 | **부분 채택** | GPT 원안 "앞으로도 저는 이 세 지도를 따로 보려고 합니다"를 마지막 문단에 한 줄 추가. 다만 기존에 이미 설계된 "독자가 다음에 스스로 물어볼 질문"으로 끝맺는 여운형 마무리는 대체하지 않고 유지 — SSOT "결론 요약보다 독자가 같은 질문을 하게 만드는 문장으로 끝맺는다"를 GPT 원안 단독보다 더 직접적으로 충족한다고 판단 |
| 5 | 도입부 대표 문장 | 질문형 대신 선명한 선언형으로 교체 | **기각** | 대표 문장은 "도입 질문 → 중반 원문 그대로의 답 → 마무리 볼드 결론"의 3단 콜백 구조로 이미 설계됨. 도입을 선언형으로 바꾸면 이 구조 자체를 재설계해야 하며 "미세 조정" 범위를 넘어섬. 또한 GPT가 제안한 선명한 선언형 효과는 이미 마무리의 "**상권, 생활 지원 기관, 기업 지원 기관은 서로 다른 지도**입니다"가 제공하고 있어 중복 |
| 6 | 전체 — 3요소 반복 | 3요소(문화/생활지원/비즈니스) 반복 축소 | **부분 채택** | 신설한 마무리 문단 내부의 자체 반복만 압축("사람이 모이는 상권과, 사람을 돕는 기관과, 기업을 돕는 기관을" → "상권과 지원 기관들을"). "목적에 따라 어느 지역을 먼저 확인해야 하나"·"먼저 구분할 세 가지" 두 섹션은 원문 그대로 유지되는 spine이며, 각각 "조건별 안내"와 "스캔용 recap"이라는 서로 다른 기능을 수행하므로 반복이 아니라 필요한 재열거로 판단 — 손대지 않음 |

---

## F. Voice Full 자가체크

- [x] 데이터 저널리즘 70/서사 30 — 이 편은 원래 수치 밀도가 낮은 정성적 사실 확인 글. "70% 데이터"는 "70% 사실/출처 기반 서술"로 해석해 적용, 서사 30%는 판단 과정 노출로 충족
- [x] 대표 문장 1개 — "한인 상권과, 한국인이 살기 좋은 동네는 같은 뜻일까요?"(도입, 볼드) ↔ "한인 상권과 살기 좋은 동네는 같은 뜻이 아닙니다."(중반 H2 첫 문장, 원문 그대로) ↔ "상권, 생활 지원 기관, 기업 지원 기관은 서로 다른 지도"(마무리, 볼드) — 3회 변주 반복
- [x] 중간 질문 1~2회 — "그렇다면 아자부·히로오는 어떨까요?"(아자부 섹션) 1회, 곧바로 1인칭 가설로 연결(GPT #2 반영)
- [x] 모바일 3줄 문단 — 전 구간 2~4문장 유지, 4문장 연속 없음
- [x] 노트 문장 1회 — "이번 글을 정리하면서 끝까지 남았던 질문은 하나였습니다"(마무리 H2, GPT #3 반영으로 담백화)
- [x] 여운 있는 끝 — Joseph 다짐 한 줄("앞으로 이 세 지도는 따로 보려고 합니다", GPT #4 반영) + 독자 질문형 종결("다음에 '어느 동네에 한국인이 많다더라'는 말을 듣는다면...") 2단 구성 — 요약이 아니라 관찰·기록으로 종결
- [x] 「가보니」「체감상」 등 허구 1인칭 없음 — "확인해보니"(desk research 표현)·"제가 처음에 그렇게 생각했다" 류 가설 서술만 사용, 현장 방문 주장 없음
- [x] KO `반드시` / EN `guaranteed` / JA `絶対に` 없음 — 전수 확인
- [x] 지명 병기 — 기존 병기(新大久保·麻布十番·広尾·南麻布·虎ノ門) 유지, 신규 지명 등장 없음
- [x] FA에서 삭제된 claim(한국인 자산가 집중·이타바시 코리아타운 등) 부활 없음 — 아자부 섹션에서 "그렇게 보이기 쉬운 인상"으로만 언급 후 곧바로 부인, 사실로 재도입하지 않음

---

## G. 변경 요약

- **새 사실/수치/인과/출처**: 0건
- **삭제 claim 수**: 0건 (기존 FA 삭제분 유지, 이번 패스에서 추가 삭제 없음)
- **H2/H3 구조 변경 수**: 0건 (title·description·slug·H2 spine 9개 전부 동결, H3 6개 전부 동결)
- **Joseph 사전 승인 필요 여부**: **불필요** — 삭제 5건 미만(0건), H2 구조 변경 없음(HARD 중단 게이트 미해당)
- **수정 범위**: 도입부 전체 교체, H2 "아자부·히로오" 전체 교체, H2 "부동산 가격" 전체 교체, H2 "신오쿠보"·"스타트업" 첫 문장만 교체. 나머지 5개 섹션(목적별 확인/세 가지 구분/한국어 생활 기반/FAQ/시리즈 링크)은 변경 없음
- **GPT 리뷰 반영**: 제안 6건 중 채택 3건(#1·#2·#3) · 부분채택 2건(#4·#6) · 기각 1건(#5, 이유는 E 참고) — claude-final 문단에 통합 완료

---

status: claude-final
