# Decision Log (Hypothesis Evolution) — `tokyo-nishitokyo-kodaira-koganei`

> **용도**: 데이터 탐색 → 티키타카 → 가설 진화 기록. KO 초안·Voice Rewrite 입력 SSOT. **글 초안 아님.**  
> **실행 SSOT**: [`JOSEPH_AUTHOR_OPS.md`](../../docs/JOSEPH_AUTHOR_OPS.md)  
> **Reasoning OS**: [`REASONING_OS.md`](../../docs/REASONING_OS.md)  
> **KO 출력 (Ep.10+)**: [`KO_VNEXT_WRITING.md`](../../docs/KO_VNEXT_WRITING.md)  
> **지시서**: [`AG_TASK_EP13_INSTRUCTION.md`](../../docs/AG_TASK_EP13_INSTRUCTION.md)

| Field | Value |
|-------|--------|
| **Slug** | `tokyo-nishitokyo-kodaira-koganei` |
| **Topic** | 23구 경계 통근권 (西東京市 · 小平市 · 小金井市) |
| **Created** | 2026-07-29 |
| **Layer** | Joseph Hypothesis Layer |
| **Pilot** | Ep.13 |

---

## Why this topic?

Where to Live in Tokyo — The 23 Wards Guide (+ 다마) 시리즈 Ep.13.
네리마·스기나미에 맞닿은 23구 인접 다마 지역(니시도쿄, 고다이라, 고가네이)의 실제 거래가를 비교하여 "23구 옆이면 비슷할 것"이라는 통념을 동네(町名) 단위 데이터로 다룹니다.

---

## Phase 0 — Data snapshot

> **AG/MLIT**가 research-pack·manifest 기준으로 채웁니다. Joseph는 이 섹션을 본 뒤 티키타카에 들어갑니다.

### Sources reviewed

- [x] `docs/verification/research-packs/tokyo-nishitokyo-kodaira-koganei.md`
- [x] manifest claims (`docs/verification/manifests/ep13-tokyo-nishitokyo-kodaira-koganei.manifest.json`)
- [x] MLIT XIT001/XPT002/XKT015 benchmarks (`docs/verification/tokyo-tama-benchmarks.json`)

### Key numbers (L1 — 창작 금지)

| 구/지표 | 70㎡ 환산 (万) | ㎡단가 (成約) | Sample (n) | Top 역 (승하차 인원) | 인구 2020→2040 Δ |
|---------|---------------|-------------|------------|---------------------|-------------------|
| 西東京市 | 3,913万엔 | 55.9万엔 | **221** (구코드 13229 매핑) | ひばりヶ丘 (66,846人/日) | +3.2% |
| 小平市 | 3,577万엔 | 51.1万엔 | 189 | 花小金井 (52,593人/日) | +0.4% |
| 小金井市 | 5,292万엔 | 75.6万엔 | 136 | 武蔵小金井 (110,668人/日) | +4.0% |

### Key district numbers (SSOT: `tokyo-tama-benchmarks.json` district_price_2025 · 2026-07-29)

**西東京市 (본문 n≥30만 인용)**

| 동네 | n | ㎡단가 | 70㎡ 환산 |
|------|---:|-------:|---------:|
| 谷戸町 | 36 | 68.9万엔 | 4,823万엔 |
| 田無町 | 33 | 53.7万엔 | 3,759万엔 |
| ひばりが丘 | 32 | 55.0万엔 | 3,850万엔 |

**小平市:** 花小金井南町 n=51 · 64.0万엔 · 4,480万엔 (n≥30 유일 중심)  
**小金井市:** 本町 n=66 · 94.5万엔 · 6,615万엔 (시 평균 견인)

### Commute time verification (Yahoo Transit 2026-07-29 실측 · 평일 08:30 도착)

| 출발역 (시) | 신주쿠역 (소요시간 / 환승) | 도쿄역 (소요시간 / 환승) | 환승저항 및 경로 특성 |
|------------|------------------------|-----------------------|--------------------|
| **武蔵小金井** (小金井市) | **28분** (0회 직통) | **43분** (0회 직통) | 도심 2대 터미널 모두 **환승 0회 직통** |
| **ひばりヶ丘** (西東京市) | **40분** (1회, 이케부쿠로) | **52분** (2회, 이케부쿠로/마루노우치) | 이케부쿠로역 환승 저항 (+12분) |
| **花小金井** (小平市) | **38~39분** (1회 또는 도보 9분) | **60분** (2회, 도자이/마루노우치) | 세이부신주쿠역↔JR신주쿠역 **지상 도보 9분 저항** |

*브랜드 소스 (`[1차 확인]`): Recruit SUUMO 「SUUMO住みたい街ランキング2025 首都圏版 ～その他（住みたい沿線）～」 沿線別 4위 JR中央線 (410점)*
  - [공식 プレスリリース Web 페이지](https://www.recruit.co.jp/newsroom/pressrelease/2025/0306_15539.html)
  - [공식 調査結果 상세 PDF (p.35 沿線別)](https://www.recruit.co.jp/wp-content/uploads/2025/07/20250306_housing_02.pdf)
  - [SUUMO 2025 노선별 순위 해설 기사](https://suumo.jp/article/oyakudachi/oyaku/sumai_nyumon/data/sumimachi2025syutoken_sonota/)

### Patterns / anomalies (L2)

- **원인 규명 완료**: 기존 n=2 착시는 MLIT API의 지자체 코드 매핑 차이(공식코드 13228 vs MLIT API 구코드 13229)에서 비롯됨. 구코드 13229 조회로 n=221건의 충분한 실거래 표본 확보.
- **23구 인접(西東京市: 3,913만엔) > 세이부 심부(小平市: 3,577만엔)**: 네리마구에 붙어있는 西東京市가 小平市보다 약 336만엔(9.4%) 높게 형성됨.
- **주오선 축(小金井市: 5,292만엔)의 압도적 우위**: 23구 인접성보다 주오선 중심축(무사시노·미타카 인접)의 가격 프리미엄(+35.2%)이 훨씬 강함.
- **西東京市 내부 역세권 격차**: 히바리가오카/타나시 역세권(谷戸町 4,375만엔, 田無町 4,284만엔)과 비역세권(芝久保町 2,996만엔) 간 무려 1,379만엔의 큰 격차 존재.

### Open questions from data

1. 西東京市와 小平市 간 세이부선 노선별/역세권별 가격 차이 폭
2. 小金井市(주오선 축)의 ㎡당 거래가가 西東京市(23구 직접 인접)보다 높은지 여부
3. 각 시 내부 町名 단위 Sample size(n<30 비율) 분포

---

## Phase 1 — Tiki-taka log (Claude §E 5문항 — Joseph 검토용)

### T1 — 西東京 vs 小平 가격차 서사
- **Q:** 西東京 vs 小平 가격차가 예상보다 작으면 — "23구 인접" 서사를 접고 노선/역세권 단일 축으로 재짜야 할까요, 아니면 절충할까요?
- **A (Cursor KO 반영):** 9.4% 차 — 인접 효과는 유지하되 **주연은 노선축(小金井)**. 절충.
- **데이터 근거:** MLIT 2025 성약가 benchmark

### T2 — 小金井 가격축
- **Q:** 小金井가 西東京보다 높으면 — "무사시노·미타카 인접 (주오선 축)"을 중심축으로 세워도 될까요?
- **A (Claude verified + Joseph KO 승인):** **GO.** 통근 실측(환승 0 · 신주쿠 28분)으로 뒷받침. KO 중심축 = 직통/환승저항.
- **데이터 근거:** MLIT + Yahoo Transit 2026-07-29 · `claude-drops/2026-07-29_ep13-ag-request-commute-time.md`

### T3 — 샘플 수 하한 임계
- **Q:** 町名 단위 n<30 건수가 많을 경우 — 마을 단위 인용 하한 건수 임계는?
- **A (Cursor KO 반영):** 본문 숫자 = **n≥30만**. n<30은 참고·생략.
- **데이터 근거:** research-pack writer constraints

### T4 — 매매 vs 임대 격차
- **Q:** 매매 vs 임대 격차 어긋나면?
- **A (Cursor KO 반영):** 小平·小金井 SUUMO 동일조건 미확보 → H2④는 **비교 보류** 명시(창작 금지).
- **데이터 근거:** 西東京 1R≈8만만 스냅샷

### T5 — 인구·소득 설명력
- **Q:** 인구·소득 설명력 약하면?
- **A (Cursor KO 반영):** H2⑤ 유지 — 「인구만으로는 부족」이 결론. 소득은 미인용.
- **데이터 근거:** population_forecast

---

## Phase 2 — Hypothesis lock

### Central question

23구에 붙어 있으면 가격도 23구에 가깝나? 니시도쿄·고다이라·고가네이는 하나의 통근권인가, 세 개의 시장인가?

### Initial assumption (통념)

- **통념:** 23구에 인접하면 가격도 23구에 가깝다 / 다마 지역이면 일률적으로 싸다.

### Trigger (검증 포인트)

- **검증:** 町名·역세권 단위로 보면 시 평균 착시가 깨지는가?

### Hypothesis (잠금 · Claude commute verified 2026-07-29)

- **대비축:** 西東京(세이부·네리마 인접) vs 小平(세이부 심부) vs 小金井(주오선 직통).
- **잠금 문장:** 23구 인접보다 **도심 터미널 환승 0회 직통(주오선·武蔵小金井)**이 이번 표본의 시세 순서를 더 잘 설명한다.
- **수치 앵커:** 小金井 75.6 > 西東京 55.9 > 小平 51.1 (+35.2% vs 西東京) · 신주쿠 28분/0환승 vs 40분/1환승.

### Representative Sentence (확정)

> 「23구에 붙어 있으면 비슷한 가격일 것」이라는 생각이, 동네 단위로 보면 **흔들립니다**.

### Final insight (one sentence)

인접은 지도의 사실이고, 이번 실거래·통근 표본에서 시세는 **환승 없는 노선과 거래가 모인 동네** 이야기에 더 가깝다.

---

## Authenticity pre-check (Joseph — KO 대기)

- [ ] L1 → L2 → L3 순서가 본문에 드러남
- [x] Representative Sentence 직답 반영 (Cursor KO 2026-07-29)
- [x] 허구 현장담 없음
- [ ] Joseph 「도움이 됐다」 Auth
