# Part N Craft Notes — Ep.13에서 뽑은 참조 규칙

> **상태:** Voice **v1.4 초안**의 craft 상세 · **하드게이트 아님** · Joseph × Cursor (2026-07-30)  
> **출처 에피소드:** Ep.13 `tokyo-nishitokyo-kodaira-koganei` (라이브 폴리싱 다수 회차)  
> **상위 SSOT:** [`JOSEPH_AUTHENTIC_VOICE.md`](./JOSEPH_AUTHENTIC_VOICE.md) **v1.4 초안** §리듬·레이아웃  
> **관련:** [`PART_N_STABLE_PIPELINE_2026-07.md`](./PART_N_STABLE_PIPELINE_2026-07.md) · [`KO_VNEXT_WRITING.md`](./KO_VNEXT_WRITING.md)  
> **목적:** 다음 Part N(Ep.14~) KO/EN 초안·Auth 전 폴리싱에서 **같은 수정을 다시 하지 않도록** 참조한다.  
> **비목적:** validate fail · Cursor PASS 차단 · AdSense/Gate A 잠금. 위반해도 발행 금지 사유가 **되지 않는다**.  
> **보이스 전략:** 포지셔닝·채널·장기 비율 등은 Voice v1.4에 잠그지 않음 — **추후 논의**.

---

## 0. 한 줄

> Ep.13에서 시간이 많이 든 이유는 **사실층이 틀려서가 아니라**, 사실층이 맞은 뒤 **리듬·표 경제·출처 패널·영문 표현**을 라이브에서 다듬었기 때문이다.  
> → 그 다듬기를 **Auth 전 체크리스트**로 앞당긴다.

편집 철학(데이터 존중 · 사고 과정 · Reader First)은 Voice SSOT가 담당한다.  
본 문서는 그 위의 **제작 리듬(craft)** 층이다.

---

## 1. 본문 리듬 (가장 효과 큼)

| 구간 | 규칙 | Ep.13에서 배운 점 |
|------|------|-------------------|
| **분석 본문** | **2~3문장 = 1문단** | 문장마다 개행하면 모바일은 편해도 데스크톱은 메모·밀도 저하 |
| **먼저 결론 / Key Takeaways** | Bullet **유지** · **3줄** (숫자 · 해석 · 사례) | 첫 화면은 결론만; 근거는 스크롤 뒤 |
| **표** | 표 전후 본문은 짧게, 표와 **붙게** | 표는 설명 도구 — 큰 공백으로 격리하지 않음 |
| **Joseph's View** | **한 문장 단위 줄바꿈 유지** | 분석 파트와 의견 파트의 시각 구분 |
| **요약 Bullet / Who this helps** | Bullet 유지 | 본문 문단화와 섞지 않음 |

**Voice v1.4:**  
본문 = 2~3문장 문단. Joseph's View·Bullet = 짧은 줄. 문장마다 `<p>`를 쪼개지 않는다.

```md
문장. 문장.

문장. 문장. 문장.
```

---

## 2. 표 경제 (Table economy)

1. **같은 키(도시·역)로 이어지는 표는 합친다.**  
   Ep.13: 시 평균 표 + 출발역 통근 표 → **한 표** (㎡당 · 거래 · 역 · →신주쿠 · 환승).
2. **뒤에서 다시 다루는 동네 표는 앞에서 반복하지 않는다.**  
   Ep.13: §1 야토초 표 삭제 → §4(동네 비교)에만 남김.
3. **표 1개 = 메시지 1개.** 열을 욕심내면 모바일 가로 스크롤만 늘어난다.
4. **빈 H2·미완 데이터 표는 넣지 않는다.**  
   데이터가 없으면 섹션을 빼거나, Auth **전에** 수집한다 (라이브에서 § 통삭제 비용이 큼).

---

## 3. 출처·방법론 패널

1. **출처 박스는 하나.**  
   본문 HTML `sources-panel` + 레이아웃 `SourcesList` 이중 금지.  
   → frontmatter `dataBasis` / `dataFootnotes` / `citeSources` → `SourcesList` 단일 패널.
2. **미완·WIP 숫자는 출처에도 올리지 않는다.**  
   Ep.13: SUUMO 1R(세 시 미완) 행·cite 삭제.
3. **투자 면책은 상단 `PostDisclaimer`만.** 출처 푸터에 같은 면책을 반복하지 않는다.
4. **각주(`dataFootnotes`)는 방법론만** — 가중평균 정의, 환승 경로 예외, 소득 산출식 등.

---

## 4. 타이포·여백 (레이아웃)

| 항목 | 권장 | 비고 |
|------|------|------|
| H2 / 섹션제목 → 본문 | `pb ≈ 0.5lh` | `1lh`는 과함 (Ep.13 라이브 피드백) |
| prose table 상하 | `margin-block ≈ 0.85em` | prose 기본 ~2em보다 타이트 |
| 섹션 구분 `---` | 유지 | 표·본문 사이 여백과 혼동하지 말 것 |

전역 CSS는 전 글에 영향 → Ep.N 폴리싱에서 Joseph가 지적한 여백만 조정하고, **대량 리디자인 금지**(Gate A 정신).

---

## 5. 인구·소득·보조 지표

1. research-pack에 **없으면 본문에 쓰지 않는다.** 필요하면 Auth 전 AG/Cursor가 같은 방법론으로 채운다.  
   Ep.13 소득: 총무성 R6 과세표준 ÷ 도 인구추계 (Ep.10과 동일).
2. 보조 지표는 **주 가설을 대체하지 않는다.**  
   예: 소득·인구Δ 순서가 시세와 같아도 → 「도심 옆이라 비슷하다」증명 ❌ · 직통·환승의 **보조** ✅.
3. fact-audit Claims에 **새 수치를 같은 커밋에서** 올린다 (`validate:post` trust-fact-sheet).

---

## 6. EN 표현 (직역 금지 체크)

| 피할 것 | 선호 |
|---------|------|
| adjacency (일반 독자) | **proximity** |
| rail line (모호) | **rail connections** / direct service |
| price order 반복 | **relative prices** · **pricing hierarchy** · **price differences** |
| prices split by neighborhood | **prices vary significantly by neighborhood** |
| actual transactions (반복) | **transaction data** |
| we put X on the same scale | **This article compares** / we compare |
| inner-edge belt (번역체) | **western urban fringe** / cities bordering western 23 wards |
| Key Takeaways 산문 | KO와 같이 **3 bullet** |

KO 핵심 메시지와 EN 구조는 맞추되, **단어·리듬은 영어권 리서치 톤**으로 다시 쓴다.

---

## 7. Mode C에 넣는 위치 (강제 아님)

Auth(⑥) **직전**, Cursor KO 셀프체크에 아래만 추가한다.

```text
[ ] 본문 = 2~3문장 문단 / View·Bullet은 독립 유지
[ ] 먼저 결론 = 숫자·해석·사례 3줄
[ ] 같은 키 표 병합 · 중복 동네 표 없음 · 빈 H2 없음
[ ] SourcesList 단일 · WIP 수치 출처 미포함
[ ] 보조지표(인구·소득) 있으면 주가설을 대체하지 않음
[ ] EN: proximity / rail connections / transaction data / compare
[ ] fact-audit Claims ↔ 본문 수치 동기화
```

라이브 이후 「가독성만」 패치가 3회 이상이면 → 본 노트에 한 줄 append (버전 올려 Voice에 링크만 갱신).

---

## 8. 보이스 전략 (보류)

Ep.13 craft가 암시한 후보(본문 밀도 vs View 대비 · 첫 화면 계약 · EN 쌍둥이 리포트 등)는  
[`JOSEPH_AUTHENTIC_VOICE.md`](./JOSEPH_AUTHENTIC_VOICE.md) **v1.4 초안**에 리듬 층만 반영했다.  
**포지셔닝·채널·장기 비율 등 전략 본론은 Joseph가 추후 논의**하기로 함 — 여기서 잠그지 않는다.

---

## 9. Ep.13에서 하지 말아야 할 일반화

- 「모든 동네 표를 없앤다」 ❌ — **앞에서 뒤에서 중복될 때만** 앞을 뺀다.  
- 「모든 보조지표를 넣는다」 ❌ — pack에 있고 가설을 돕는 것만.  
- 「문단을 길게 붙인다」 ❌ — 2~3문장. 한 문단에 메시지 1개(Voice 유지).  
- 「CSS로 전부 해결」 ❌ — 리듬의 1차는 마크다운 구조.

---

## 변경 이력

| 날짜 | 내용 |
|------|------|
| 2026-07-30 | Ep.13 라이브 폴리싱 수확 → craft notes 초안 (하드게이트 아님) |
