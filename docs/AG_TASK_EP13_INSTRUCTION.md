# AG + Cursor 지시문 — Ep.13 「23구 경계 통근권 — 니시도쿄·고다이라·고가네이」

> **작성:** Cursor (2026-07-29) · Joseph 클러스터 A 확정  
> **파이프라인 SSOT:** [`PART_N_STABLE_PIPELINE_2026-07.md`](./PART_N_STABLE_PIPELINE_2026-07.md) — **Mode C**  
> **보이스:** [`JOSEPH_AUTHENTIC_VOICE.md`](./JOSEPH_AUTHENTIC_VOICE.md) **v1.3** (Reader First · 데이터 저널리즘 70/30)  
> **벤치마크:** Ep.10 `tokyo-kokubunji-kunitachi-fuchu-tachikawa` · Ep.12 `tokyo-machida-tama-inagi`  
> **Gate A:** ~07-29 표면 **대량** 변경 동결 — 본 편은 **신규 1편 소량** 발행 (허용). 기존 글 title 대량 수정 금지.

---

## 0. 역할 (Mode C)

| 단계 | 담당 |
|------|------|
| MLIT · research-pack · manifest · Decision Log | **AG** |
| manifest / 가설 승인 | **Joseph** |
| N1 SERP · N2 §1–4 골격 · **KO 초안** | **Cursor** |
| GPT 1회 개선 | **선택** — Joseph 명시 시에만 |
| Authenticity | **Joseph** |
| EN · 이미지 · validate · deploy · IndexNow · 네이버 · PKM · 프롤로그/링크 | **AG** |
| 배포 후 HARD 검증 | **Cursor** |

**금지:** JA 신규 · Cursor PASS 전 `draft: false`/prod · AG가 GPT를 기본 경로에 삽입 · slug 변경 · 허구 1인칭 현장담.

**예외:** Cursor 토큰 고갈 시 Joseph 명시 하에 Claude가 Cursor KO/검증 대행 — 동일 루브릭 ([PART_N §3](./PART_N_STABLE_PIPELINE_2026-07.md)).

---

## 1. 에피소드

| 항목 | 내용 |
|------|------|
| 시리즈 | Where to Live in Tokyo — The 23 Wards Guide (+ 다마) |
| Ep | **13 — 23구 경계 통근권** |
| 대상 시 | **西東京市 · 小平市 · 小金井市** |
| slug | `tokyo-nishitokyo-kodaira-koganei` |
| Ep.12 연결 | 남부 뉴타운(마치다·타마·이나기) 다음 — **네리마/스기나미 인접 · 세이부·주오 축** |
| 핵심 질문 | 23구에 붙어 있으면 가격도 23구에 가깝나? 니시도쿄·고다이라·고가네이는 하나의 통근권인가, 세 개의 시장인가? |
| 대표 문장 (**확정**) | 「23구에 붙어 있으면 비슷한 가격일 것」이라는 생각이, 동네 단위로 보면 **흔들립니다**. |

### 데이터 준비 상태 (2026-07-29 Cursor)

| 시 | code | benchmarks (`tokyo-tama-benchmarks.json`) | AG 작업 |
|----|------|-------------------------------------------|---------|
| 西東京市 | 13228 | **있음** (우선 8시) | 町名 단위 재확인·갱신 |
| 小平市 | 13211 | **없음** | **BL-1 sync 필수** |
| 小金井市 | 13210 | **없음** | **BL-1 sync 필수** |

---

## 2. 타깃 쿼리 · §1–4 골격 (N2 **잠금** · 2026-07-29)

> **근거:** `claude-drops/2026-07-29_ep13-n2-review.md` (Joseph 결정 2건 반영 · Cursor N2 잠금)

### N1 SERP 메모 (Cursor · 2026-07-29)

| 쿼리 | 한국 Google/네이버 인상 | 판정 |
|------|------------------------|------|
| `니시도쿄 집값` | 전용 KO 가이드 약함 · 일본 공시지가/포털 혼재 | **열림 → 1차 확정** |
| `고다이라 집값` | 쉐어하우스·위키 위주 · 시세 분석 빈약 | 보조 (H2·description에서 보강) |
| `고가네이 맨션` / `고가네이 집값` | 일반 도시 소개 위주 | 보조 |
| `도쿄 23구 인접 집값` | 의도 넓음 · 경쟁 혼재 | 긴 꼬리로만 |

### N2 잠금표

| 필드 | **확정값** |
|------|--------|
| **1차 쿼리** | `니시도쿄 집값` |
| **보조** | `고다이라 집값` · `고가네이 집값` (title에는 「실제 거래가」로 흡수 — 스터핑 가드) |
| **title (KO)** | 니시도쿄 집값은 23구에 가깝나 — 고다이라·고가네이 실제 거래가 [Ep.13·2026] |
| **description** | 네리마·스기나미에 맞닿은 니시도쿄·고다이라·고가네이를 동네(町名) 단위 실거래로 비교합니다. ‘23구 옆이면 비슷하다’는 통념을 데이터로 다시 읽습니다. |
| **도입 순서** | **직답 먼저 → 논지** (Ep.13 **한정**. 전 편 표준화는 미확정 — PASS 후 재논의) |
| **도입 골격** | 아래 §2.1 |
| **H2** | ① 니시도쿄 집값은 네리마·스기나미에 얼마나 가까운가? · ② 고다이라와 고가네이는 같은 통근권인가? · ③ 세 도시 안에서 동네별 가격 차이는 얼마나 큰가? · ④ 매매가와 역 근처 월세는 같은 이야기를 하는가? · ⑤ (선택·데이터 약하면 드롭) 인구·소득으로 가격을 설명할 수 있는가? |
| **대표 문장** | 「23구에 붙어 있으면 비슷한 가격일 것」이라는 생각이, 동네 단위로 보면 **흔들립니다**. |
| **원장** | `tokyo-nishitokyo-kodaira-koganei \| q=니시도쿄 집값 \| Ep.13 \| 다음점검 +14d` |

### 2.1 도입 골격 (수치는 manifest 후 Cursor 삽입 — 창작 금지)

> 니시도쿄에서 [역세권 동네]는 ㎡당 [X]만엔, [비역세권 동네]는 [Y]만엔으로 거래됐습니다(2025년 기준). 시 평균만 보면 "23구(네리마 등)에 붙어 있으니 비슷하다"로 읽히지만, 동네 단위로 내려가면 격차가 드러납니다. 이 글은 西東京·小平·小金井 세 시의 실제 거래가를 같은 기준(**㎡당 가격**, 국민 평형 **70㎡(약 21평)** 환산)으로 나란히 놓습니다.

**HARD:** 1문장을 「말할 수 없습니다」류 논지로 시작하지 말 것. 고유명사+숫자+기준일 직답 → 통념 논지 → 방법론.

**YMYL:** title·H2·도입에 추천/보장/매수 권유 금지.

**Voice v1.3:** Reader First · 70/30 · 대표문장·중간질문·노트문장·마무리 여운 · 정중체.

### 2.2 AG HARD (Claude §F)

1. 네리마·스기나미 = **비교 앵커만**. BL-1 sync·町名 표는 西東京·小平·小金井 **3시만**. 본문 언급 = 도입 1회 + H2① 1회 수준.
2. 허구 현장담 금지 — MLIT·SUUMO 수치만.
3. §2.1 `[X]`/`[Y]`는 자리표시자 — manifest·citeSources 전 실수치 KO 삽입 금지.

---

## 3. AG — Phase 0~2 (Cursor KO 전)

1. 필독: PART_N Stable · KO_VNEXT · JOSEPH_AUTHENTIC_VOICE **v1.3** · Ep.10·12 KO · AUTHOR_OPS · REGION_EXPANSION_CLOSURE §BL-1  
2. **BL-1 sync:** 小平市(13211) · 小金井市(13210) — Ep.11/12 스크립트 패턴 재사용. 西東京은 기존 우선 8시 갱신.  
   - 일괄 26시 수집 금지 · **이 3시만**  
3. MLIT 町名 단위 집계 (70㎡ 환산 · n 표시 · n&lt;30은 참고만)  
4. 임대(SUUMO 등) — 신축·역도보 1–5분·1R 동일 조건 (Ep.12 패턴)  
5. `.blog-agent-stage/tokyo-nishitokyo-kodaira-koganei/decision-log.md` (템플릿: `docs/templates/blog-decision-log.md`)  
6. `docs/verification/manifests/ep13-tokyo-nishitokyo-kodaira-koganei.manifest.json`  
7. research-pack: `docs/verification/research-packs/tokyo-nishitokyo-kodaira-koganei.md`  
8. Joseph 승인 전 **KO 본문 작성 금지** (Mode C에서 KO는 Cursor)

완료 시 `_handoff.md`에: stage 경로 · manifest 경로 · sync 3시 완료 여부 · 「Cursor §1–4·KO 대기」.

### Decision Log에 남길 가설 초안 (Joseph이 티키타카로 수정)

- **통념:** 23구에 인접하면 가격도 23구에 가깝다 / 다마면 일률적으로 싸다.  
- **검증:** 町名·역세권 단위로 보면 시 평균 착시가 깨지는가?  
- **대비축:** 西東京(세이부·네리마 인접) vs 小平(세이부 심부) vs 小金井(주오선·무사시노/미타카 인접).

### 티키타카 Q (Claude §E — 데이터 확인 후 Joseph에게)

1. 西東京 vs 小平 가격차가 작으면 — "23구 인접" 서사 접고 노선/역세권 단일 축으로 재짤까, 절충할까?
2. 小金井가 西東京보다 높으면 — "무사시노·미타카 인접"을 중심축으로 세워도 될까?
3. n&lt;30이 많으면 — 마을 단위 하한 건수 임계는?
4. 매매 vs 임대 격차 어긋나면 — H2④를 "왜 어긋나는가"로 옮길까?
5. 인구·소득 설명력 약하면 — H2⑤ 드롭 vs 「설명 못 함」 자체가 결론?

---

## 4. Cursor — KO (manifest·가설 승인 후)

1. N2는 **이미 잠금** — §2.1에 manifest 수치만 채움 (도입 직답 우선 유지)  
2. KO: vNext spine + Voice v1.3 + §1–4 · 1인칭 2~3 · 허구 현장 금지  
3. Decision Log Trigger/Hypothesis와 본문 정합  
4. Joseph Auth 후 AG에 넘김  

체크: PART_N §5 루브릭 R1–R8 (+ R5b Reader First · R5c 70/30).

---

## 5. AG — Auth 이후

| # | 작업 |
|---|------|
| 1 | EN — 직역 금지 · global reader · PROCESS N6 |
| 2 | hero.webp + hero-og.jpg · `verify:og-social` |
| 3 | `pnpm validate:post tokyo-nishitokyo-kodaira-koganei` · `pnpm verify:episode --slug tokyo-nishitokyo-kodaira-koganei` |
| 4 | Cursor PASS 확인 후 `draft: false` · prod deploy |
| 5 | IndexNow · GSC 색인 요청 큐 |
| 6 | 네이버 초안 + `naver_post_queue` (게시 클릭은 Joseph) |
| 7 | `pnpm dossier:ward` (해당 시) + ward 카드 링크 |
| 8 | 프롤로그 Ep.13 행 추가 · Ep.12「다음 편」링크 갱신 |

---

## 6. 완료 정의

- [ ] Mode C 전 단계 완료 · live 200 (KO+EN)  
- [ ] OPEN_QUEUE `NP13` / Ep.13 반영  
- [ ] hub:log Cursor (+ AG deploy)  
- [ ] 쿼리 원장 1줄  
- [ ] (선택) Mode B 졸업 논의 — Ep.12 완주 후 Joseph 지시 시에만

---

## 7. 참조

- [`PART_N_STABLE_PIPELINE_2026-07.md`](./PART_N_STABLE_PIPELINE_2026-07.md)  
- [`AG_TASK_EP12_INSTRUCTION.md`](./AG_TASK_EP12_INSTRUCTION.md) — 편 구성·데이터 패턴  
- [`REGION_EXPANSION_CLOSURE.md`](./REGION_EXPANSION_CLOSURE.md) §BL-1  
- [`SEO_WRITING_GUIDE_2026-07.md`](./SEO_WRITING_GUIDE_2026-07.md) §1–4  
- [`s14-sprint/OPEN_QUEUE.md`](./s14-sprint/OPEN_QUEUE.md)
