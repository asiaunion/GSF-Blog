# Voice Full A2 (1/3) — Claude initial drop

> slug: `tokyo-moving-contracts-two-notes`
> Wave A · YMYL(임대차 계약) · role: Claude 주도 편집자 — repo 직접 확정·commit·deploy 없음
> 다음 단계: Joseph → GPT 완성도 리뷰 → Claude 최종 패키지(E 수용표 채움 + `status: claude-final`) → AG 반영 → Cursor 검증
> A1 3편에서 GPT가 확정한 원칙("질문형보다 오해→데이터 구조가 GSF-Ark 톤에 더 맞다")을 이번 initial drop부터 선반영.

---

## A. 기존 사실층 잠금표 (유지 — 변경 금지)

`docs/fact-audit/tokyo-moving-contracts-two-notes.md` (2026-07-18 PASS, FA 6건 수정 포함) 기준 + 핸드오프 slug별 특이 주의 통합.

| # | 사실/claim | 값 | 출처 |
|---|-----------|----|------|
| 1 | 보통차가(普通借家) vs 정기차가(定期借家) 구분 | 유형 2종 | juutakuseisaku.metro.tokyo.lg.jp (310-6-jyuutaku) |
| 2 | 원상회복(原状回復) 부담 = 고의·과실 vs 통상 마모·경년변화 | 구분 기준 | juutakuseisaku.metro.tokyo.lg.jp (EN) |
| 3 | 벽지(크로스) 내구연수 **6년**으로 보는 경우가 많음 — MLIT 가이드라인 기준, 완화된 표현("보는 경우가 많습니다") 유지 | 6년 | mlit.go.jp/…honbun2.pdf |
| 4 | 6년 경과 후 잔존가치 **약 1엔** 수준으로 보는 설명 | 1엔 | mlit.go.jp/…001611293.pdf |
| 5 | 특약 예시 퇴거 시 청소비 **5만 엔(¥50,000)** | 5만엔 | juutakuseisaku.metro.tokyo.lg.jp (310-6-jyuutaku) |
| 6 | 초기비용 체감 **월세 4~6배** (경험적 범위, 확정 통계 아님) | 4~6배 | juutakuseisaku.metro.tokyo.lg.jp (EN) |

**재도입 금지:** GTN 순위·구별 수락률 수치화, 구두합의/조항의 일괄 무효 단정, ORIX렌텍(계측기 렌탈사 오기) 보증회사 재등장, ¥480 등기수수료 단정, KO `반드시`.

**동결:** title·description·slug·H2 spine 7개(질문형) — ①보통차가와 정기차가는 무엇이 다른가 ②원상회복에서 누가 무엇을 부담하나 ③외국인이 집을 빌릴 때 보증은 어떻게 하나 ④입주 때 왜 기록을 남겨야 하나 ⑤계약서에서 무엇을 협상해 볼 수 있나 ⑥서명 전 외국인 체크리스트는 ⑦서명 전 한 줄 점검. 체크리스트 전체 항목, 협상 가능/불가능 항목 구분, 다이어그램, "함께 읽을 시리즈" 링크 3개 그대로.

---

## B. 현재 글 진단

이 편(category: life)은 순수 절차 설명체이지만 "입주 때 왜 기록을 남겨야 하나" 섹션에 이미 승인된 1인칭 실경험("계약 후 가장 도움이 된 행동은…")이 있다는 점이 특징이다.

- **건조함**: 원상회복·초기비용 섹션은 3인칭 정보 나열형. 슬러그1·2(YMYL 세무)와 같은 패턴 — 오해 제시 없이 바로 규정으로 들어감.
- **공통장치 부분 존재**: 1인칭 실경험 1곳(입주 기록), 대표 문장·중간 오해 제시·노트 문장 확장·여운 있는 끝은 없음.
- **YMYL 특성**: 계약 조언을 "확인할 질문"으로만 제시해야 하는 핸드오프 HARD — 기존 원문이 이미 이 원칙을 지키고 있음("이 글은 법률 자문이 아닙니다", "이 글만으로 조항의 유효·무효를 단정하지는 않습니다" 등). 새 서술도 이 원칙을 유지해야 한다.
- **결론**: A1에서 GPT가 확정한 "질문형보다 오해→데이터 구조" 원칙을 원상회복·초기비용 두 곳에 선적용. 대표 문장 1쌍(도입↔마무리), 입주 기록 섹션의 기존 1인칭에 노트 문장 1개 확장. 6년/1엔/5만엔/4~6배 수치는 전부 그대로.

---

## C. KO 최종 편집본 (문단별 replacement package)

### 도입부 — **끝에 대표 문장 1문장 추가**

```
일본 임대차 계약에서 먼저 확인할 것은 세 가지입니다. 보통차가(普通借家)인지 정기차가(定期借家)인지, 퇴거 때 원상회복(原状回復) 부담이 어떻게 나뉘는지, 그리고 시키킨·레이킨을 포함한 초기 비용입니다. 도쿄에서 집을 구할 때 계약서 용어가 낯설게 느껴지는 경우가 많아, 도쿄도와 국토교통성 가이드를 기준으로 그 핵심만 정리합니다.

**낯선 것은 계약서 전체가 아니라, 이 세 가지 지점뿐입니다.**

이 글은 법률 자문이 아닙니다. 계약·분쟁 판단은 개별 계약서와 전문가 확인이 필요합니다.
```

*(변경 근거: 기존 두 문단 그대로, 사이에 대표 문장 1문장만 추가. 새 사실 없음 — 기존 "세 가지" 언급을 요약한 문장)*

### H2 "보통차가와 정기차가는 무엇이 다른가" — **변경 없음**

### H2 "원상회복에서 누가 무엇을 부담하나" — **첫 문장 뒤에 오해→데이터 문장 삽입**

```
일본에서 나갈 때 가장 많이 싸우는 지점이 바로 '보증금(시키킨) 반환'입니다. 많은 사람들이 '오염이 있으면 전액 배상'이라고 생각하지만, 실제 부담 기준은 원인에 따라 나뉩니다.

*   **임차인 부담**: (변경 없음)
*   **집주인 부담**: (변경 없음)
*   **6년 기준(가이드라인)**: (변경 없음)
```

*(변경 근거: 기존 문장 그대로, 오해→데이터 구조 1문장만 삽입. 6년/1엔 수치·불릿 3개 전부 원문 그대로. A1 GPT 확정 원칙 선적용)*

### H2 "외국인이 집을 빌릴 때 보증은 어떻게 하나" — **첫 문장 뒤에 오해→데이터 문장 삽입**

```
일본에서 외국인이 집을 구할 때 자주 막히는 지점은 '연대보증인'입니다. 요즘은 보증회사(Hoshō Gaisha)를 이용하는 경우가 많습니다. 초기비용을 월세 1~2개월 정도로 예상했다가 실제 견적서를 받고 놀라는 경우가 있습니다.

*   **보증회사 예시**: (변경 없음)
*   **초기 비용 계산**: (변경 없음, 4~6배 그대로)
```

*(변경 근거: 기존 문장 그대로, 오해→데이터 구조 1문장만 삽입. 4~6배 수치·불릿 2개 전부 원문 그대로. 새 통계·새 단체 없음 — "월세 1~2개월로 예상"은 검증 대상 사실이 아니라 흔한 오해를 명명하는 서술 장치)*

### H2 "입주 때 왜 기록을 남겨야 하나" — **끝에 노트 문장 1문장 추가**

```
계약 후 가장 도움이 된 행동은 입주 첫날 집 안의 흠집을 사진과 영상으로 남기는 것이었습니다. 관리회사에 메일로 보내 두면, 퇴거 때 기존 손상과 새 손상을 구분하기가 수월해집니다.

그 사진 몇 장이 실제로 도움이 될지는 나중에야 알았습니다.
```

*(변경 근거: 기존 문단 그대로, 이미 승인된 1인칭 실경험을 확장하는 노트 문장 1개만 추가 — 새로운 경험이나 사건을 만들지 않고, 같은 사건에 대한 판단 회고만 덧붙임)*

### H2 "계약서에서 무엇을 협상해 볼 수 있나" — **변경 없음**
### H2 "서명 전 외국인 체크리스트는" — **변경 없음** (체크리스트 항목 전체)
### H2 "서명 전 한 줄 점검" — **뒤에 여운 있는 마무리 1문단 추가**

```
- [ ] **계약유형**: '보통'인지 '정기'인지 확인하고, 갱신·종료 조건을 읽으세요.
- [ ] **원상회복**: 도쿄도·국토교통성 가이드라인과 계약 특약이 어떻게 다른지 체크하세요.
- [ ] **초기비용**: 레이킨·보증회사 비용이 견적서에 어떻게 잡혀 있는지 확인하세요.

계약서를 한 번에 다 이해할 필요는 없습니다. 유형·원상회복·초기비용, 이 세 가지만 먼저 확인해도 나머지는 훨씬 수월해집니다.
```

*(변경 근거: 체크리스트 3항목 원문 그대로, 뒤에 대표 문장 콜백 1문단만 추가 — 도입부 "낯선 것은…이 세 가지 지점뿐입니다"의 재진술. 새 조언·새 단정 없음)*

### "함께 읽을 시리즈" — **변경 없음**

---

## D. EN/JA 정확한 대응 replacement package

> KO와 1:1 대응 삽입. 새 사실·새 수치 없음. 나머지 문단은 원문 그대로.

### EN

**도입부 — 대표 문장 삽입**:
```
Before signing a rental contract in Japan, check three things first: whether it is an ordinary lease or a fixed-term lease, how restoration costs are allocated at move-out, and what upfront costs sit on top of rent. Contract wording can feel unfamiliar in Tokyo, so this note keeps to those essentials using Tokyo Metropolitan Government and MLIT guidance.

**What feels unfamiliar isn't the whole contract — it's these three points.**

This is not legal advice. Individual contracts and specialist review still come first.
```

**"Who pays for restoration…" — 오해→데이터 삽입**:
```
The biggest source of conflict in Japan is the refund of the security deposit (*Shikikin*). Many assume "any wear means paying for a full replacement," but the actual allocation depends on the cause.
```
(bullets unchanged)

**"How do guarantors work…" — 오해→데이터 삽입**:
```
A common hurdle for foreigners is the requirement for a joint guarantor. Today, using a guarantor company (Hoshō Gaisha) is common. Some expect upfront costs to run one or two months' rent, then find the actual estimate higher.
```
(bullets unchanged, 4-6x figure unchanged)

**"Why record the apartment…" — 노트 문장 추가**:
```
The most helpful step on move-in day is to photograph and video existing marks. Emailing those files to the management company makes it easier to separate old wear from new damage at move-out.

I only realized later how much those few photos actually mattered.
```

**"One-line pre-signing check" — 마무리 추가**:
```
- [ ] **Contract Type**: Confirm ordinary vs fixed-term, and read renewal/end terms.
- [ ] **Restoration**: Compare special clauses with Tokyo and MLIT guidance.
- [ ] **Initial Cost**: Confirm whether Reikin and guarantor fees appear on the estimate.

You don't need to understand the entire contract at once. Confirming these three points — type, restoration, and upfront cost — makes the rest much easier.
```

나머지 섹션 **변경 없음**.

### JA

**도입부 — 대표 문장 삽입**:
```
日本の賃貸契約で先に確認したいのは、次の3点です。普通借家と定期借家の区別、退去時の原状回復負担の分け方、そして敷金・礼金などを含む初期費用です。東京で家を探すと契約用語は分かりにくくなりがちなので、東京都と国土交通省のガイドを基準に要点だけ整理します。

**分かりにくいのは契約書全体ではなく、この三点だけです。**

この記事は法律相談ではありません。個別の契約判断は契約書と専門家確認が前提です。
```

**"原状回復では誰が何を負担するか" — 오해→데이터 삽입**:
```
日本での退去時、最も紛争になりやすいのが「敷金の返還」です。「汚れがあれば全額負担」と思われがちですが、実際の負担割合は原因によって分かれます。
```
(箇条書き変更なし)

**"外国人の保証はどう手配するか" — 오해→데이터 삽입**:
```
外国人が日本で家を借りる際に詰まりやすいのが「連帯保証人」です。現在は保証会社の利用が多いです。初期費用を家賃の1〜2ヶ月分と見込んでいたら、実際の見積もりに驚くこともあります。
```
(箇条書き変更なし、4〜6ヶ月分の数値変更なし)

**"入居時になぜ記録を残すか" — 노트 문장 추가**:
```
入居初日に役立つのは、既存の傷を写真や動画で残すことです。管理会社へメールで送っておくと、退去時に新旧の傷を分けやすくなります。

その数枚の写真がどれほど役に立つかは、あとになって分かりました。
```

**"署名前の一行点検" — 마무리 추가**:
```
- [ ] **契約形態**: 「普通借家」か「定期借家」かを確認し、更新・終了条件を読む。
- [ ] **原状回復**: 東京都・国土交通省ガイドと特約の差を確認。
- [ ] **初期費用**: 礼金や保証会社費用が見積にどう入っているかを確認。

契約書のすべてを一度に理解する必要はありません。種類・原状回復・初期費用、この三点だけ先に確認すれば、残りはずっと楽になります。
```

나머지 섹션 **변경 없음**.

---

## E. GPT 리뷰 수용표

*(Claude initial drop 단계 — GPT 리뷰 전. Joseph이 GPT 리뷰를 넘기면 이 표를 채우고 `status: claude-final`로 갱신)*

| # | GPT 제안 위치 | GPT 제안 요약 | 채택/기각 | 이유 |
|---|--------------|--------------|-----------|------|
| — | — | (리뷰 대기) | — | — |

---

## F. Voice Full 자가체크

- [x] 사실 문장 의미 보존 — 6년/1엔/5만엔/4~6배 수치 전부 원문 그대로, 순서·표현만 삽입
- [x] SEO+FA 교정·헤지 회귀 없음 — GTN 순위·구별 수락률·조항 일괄 무효 단정·ORIX렌텍·¥480 등기수수료 재도입 없음
- [x] 계약 조언은 확인 질문/체크리스트로만 제시 — "이 글만으로 조항의 유효·무효를 단정하지는 않습니다" 등 기존 헤지 그대로, 신규 서술도 단정형 없음
- [x] title/description/slug/H2 spine 7개 동결, 체크리스트 전체 항목 그대로
- [x] 데이터 70/판단 과정 30 — 오해→데이터 구조 2건(원상회복·외국인보증)으로 판단 과정 비중 확보
- [x] 대표 문장 1쌍 — 도입("낯선 것은 계약서 전체가 아니라…") ↔ 마무리("유형·원상회복·초기비용, 이 세 가지만…") 콜백
- [x] 중간 오해→데이터 제시 1~2회 — 원상회복·외국인보증 2곳 (물음표 없이 GSF-Ark YMYL 톤에 맞춘 구조, A1 GPT 확정 원칙 적용)
- [x] 모바일 3줄 문단 — 신규 삽입 문장 전부 1문장, 기존 리듬 유지
- [x] 노트 문장 1회 — 입주 기록 섹션 기존 1인칭 경험에 회고 1문장 추가(새 경험 창작 아님)
- [x] 여운 있는 끝 — 체크리스트 뒤 대표 문장 콜백 문단 추가. Wave A/B·슬러그1·2와 표현 겹치지 않음
- [x] 허구 1인칭·투자·법률 확신 톤 없음
- [x] KO `반드시` / EN `guaranteed` / JA `絶対に` 없음
- [x] 새 통계·새 인과·새 단체·새 출처 없음. "많은 사람들이/일부는 예상했다가" 류 표현은 검증 대상 사실이 아니라 오해 명명 장치로만 사용

---

## G. 변경 요약

- **새 사실/수치/인과/출처**: 0건
- **삭제 claim 수**: 0건
- **H2/H3 구조 변경 수**: 0건 (spine 7개 전부 동결)
- **Joseph 사전 승인 필요 여부**: 불필요 (삭제 0건, H2 변경 0건)
- **수정 범위**: 도입부 대표 문장 1문장, §원상회복·§외국인보증 각 오해→데이터 1문장, §입주기록 노트 문장 1문장, §서명전 한줄점검 뒤 마무리 1문단. 나머지(협상 섹션·체크리스트 2종·다이어그램·시리즈 링크)는 전부 변경 없음
- **GPT 리뷰**: 대기 중 (E 섹션 참고)
