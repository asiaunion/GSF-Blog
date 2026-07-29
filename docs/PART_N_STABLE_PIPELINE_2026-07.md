# Part N Stable Pipeline — 신규 발행 안정화 SSOT (2026-07)

> **Owner:** Cursor  
> **확정:** 2026-07-17 Joseph × Cursor  
> **설계:** [`superpowers/specs/2026-07-17-part-n-stable-pipeline-design.md`](./superpowers/specs/2026-07-17-part-n-stable-pipeline-design.md)  
> **상위:** [`CONTENT_PUBLISHING_PROCESS_2026-07.md`](./CONTENT_PUBLISHING_PROCESS_2026-07.md) Part N · [`JOSEPH_AUTHOR_OPS.md`](./JOSEPH_AUTHOR_OPS.md) · [`SEO_WRITING_GUIDE_2026-07.md`](./SEO_WRITING_GUIDE_2026-07.md) · [`JOSEPH_AUTHENTIC_VOICE.md`](./JOSEPH_AUTHENTIC_VOICE.md) · [`KO_VNEXT_WRITING.md`](./KO_VNEXT_WRITING.md)  
> **캘리브레이션 1편:** Ep.12 — [`AG_TASK_EP12_INSTRUCTION.md`](./AG_TASK_EP12_INSTRUCTION.md)

충돌 시 **본 문서 역할표 + PROCESS §0.1 HARD**가 이긴다. 구 Ep.11 지시의 「Claude가 Cursor 대행」은 **폐기**(예외는 §3만).

---

## 1. 한 줄

> 신규 = **쿼리(§1–4) → 데이터/가설 → KO(Voice+vNext) → Auth → AG 발행 세트**.  
> 지금은 Cursor가 KO를 쓰고, 안정되면 Cursor는 **검증만**. GPT는 기본 경로에 없다.

---

## 2. 모드 (졸업)

| Mode | KO 작성 | Cursor | AG | 진입 |
|------|---------|--------|-----|------|
| **C** (현재 · Ep.12) | **Cursor** | 골격+KO+배포검증 | 데이터 → Auth 후 EN·이미지·배포·네이버·PKM | 기본 |
| **B** | **AG** | 편집 루브릭 반려/수정 · PASS 필수 | KO+나머지 | Mode C 1편(Ep.12) 완주 후 Joseph 지시 |
| **V** | **AG** | **verify-only** · PASS 토큰 | 전 과정 | Mode B **연속 2편** 1차 PASS |

**Fail-closed**

- `draft: false` · prod deploy · 마일스톤 보고 전 **Cursor PASS** 필수 (Mode B/V 포함).
- Mode B에서 루브릭 **Fail 1편** → 다음 1편은 자동 **Mode C 롤백**.
- Mode V 진입 후 Fail → Mode B로 한 단계 강등(연속 카운트 리셋).

**Mode V 진입 체크리스트 (연속 2편)**

1. Cursor 1차 PASS (또는 soft-fail ≤1 · 즉시 수정 후 PASS) ×2  
2. Voice 4원칙 · vNext spine · §1–4 · 수치↔citeSources · Ep.10 밀도  
3. HARD 위반 0  
4. Joseph Authenticity 「도움이 됐다」 2/2  

---

## 3. 예외 — Cursor 토큰 고갈 / 불가

| 조건 | 허용 |
|------|------|
| Cursor **토큰 고갈** 또는 세션 불가 (Ep.11형) | Joseph 명시 하에 **Claude**가 Mode C의 Cursor KO·검증 역할 **대행** |
| Joseph 「Cursor 우회 OK」 한 줄 | 동일 |

**규칙**

- Claude 대행이어도 **같은 루브릭·같은 HARD·같은 PASS 기록** (`hub:log`에 `author=Claude` + `proxy=Cursor-role`).
- 기본 경로를 Claude/GPT로 **바꾸지 않는다**. 토큰 관리로 Cursor 통할을 우선한다.
- GPT: Joseph가 「보이스/개선 1회」를 **명시**할 때만. AG가 기본 파이프에 GPT를 넣지 못함.

---

## 4. Mode C 파이프라인 (실행 순서)

```
① AG     MLIT · research-pack · manifest · Decision Log
② Joseph manifest / 가설 승인
③ Cursor N1 SERP 정찰 → N2 §1–4 골격(title·도입·질문형 H2·meta) Joseph 확정
④ Cursor KO 본문 — KO_VNEXT + Voice 4원칙 + §1–4 정합 (직답 도입)
⑤ [선택] Joseph+GPT 1회 개선 → Cursor 재정합
⑥ Joseph Authenticity (Phase 4-A)
⑦ AG     EN(직역 금지) · hero/og · validate:post · verify:episode
         · draft:false · deploy · IndexNow · 네이버 초안/큐 · PKM dossier
         · 시리즈 프롤로그·Ep.N-1 다음편 링크
⑧ Cursor 배포 후 HARD 검증 + hub:log
```

**언어:** KO+EN만. **JA 신규 금지.**

---

## 5. 편집 루브릭 (Cursor PASS / Fail)

| # | 항목 | Fail 예 |
|---|------|---------|
| R1 | §1–4: title에 쿼리 명사 전방 · 상투「완전 분석」류 금지 | 판매 어휘만 |
| R2 | 도입 ~200자 = **검색 질문의 직답** (먼저 결론 ≠ 직답일 수 있음 — 둘 다 만족) | 은유만 앞 |
| R3 | H2 ≥1 질문형 · YMYL 단정 없음 | 권유 프레임 |
| R4 | vNext spine 순서 · Joseph's View · Final insight echo | spine 누락 |
| R5 | Voice: 데이터 주인공 · 사고 과정 공개 · 허구 현장 금지 · 1인칭 2~3회 | 「가보니」 |
| R5b | **Reader First** ([`JOSEPH_AUTHENTIC_VOICE`](./JOSEPH_AUTHENTIC_VOICE.md) v1.3): 중학생 독해 · 은어 단독 금지 · 전문어 첫 등장 한글 정의 · 문장 짧고 그려짐 · 차분 톤 유지 | 「허브」「CAGR」「별 지도」「구 스톡」단독 · 개발자/애널리스트 은어 |
| R5c | **데이터 저널리즘 70/30** (v1.3): 본문 숫자 나열 최소화(핵심 수치는 표로) · 의미 먼저 · 문단당 1메시지 · 통념→나도→데이터→예상밖→증거→독자결론 흐름 · 허구 경험 금지 | 한 문단에 숫자 4개 · 표로 갈 수치를 본문에 나열 · 「따라서」로 결론 투척 |
| R6 | 수치마다 citeSources 대응 · manifest claim 정합 | 고아 숫자 |
| R7 | 내부링크 ≥2 (tokyoLife + urbanInvestment 규칙) | 링크 0 |
| R8 | HARD: slug·JA·범위 | 위반 즉시 Fail |

기계: `pnpm validate:post <slug>` · `pnpm verify:episode --slug <slug>` exit 0 — **PASS의 필요조건, 충분조건 아님**.

---

## 6. 역할 한눈에 (Mode C)

| 담당 | 함 | 안 함 |
|------|-----|------|
| **Joseph** | 쿼리·§1–4 채택 · Auth · 선택 GPT · 네이버 클릭 · GSC | 전편 초안 · Gate 전 AdSense 재신청 |
| **Cursor** | §1–4 골격 · KO · 루브릭 · 배포검증 · 본 SSOT · hub:log | Mode V에서 KO 재작성(예외 제외) |
| **AG** | 데이터·manifest·Auth 후 전부 · 지시문 준수 | 기본 GPT 경로 · Cursor PASS 전 deploy · JA 신규 |
| **Claude** | §3 예외 시에만 Cursor 역할 대행 | 평상시 기본 작성자 |
| **GPT** | Joseph 명시 시 1회 개선 | 기본 파이프 단계 |

---

## 7. Ep 포인터

| 항목 | Ep.12 (캘리브레이션 · done) | **Ep.13 (현재)** |
|------|---------------------------|------------------|
| Mode | C | **C** |
| slug | `tokyo-machida-tama-inagi` | `tokyo-nishitokyo-kodaira-koganei` |
| 대상 | 町田市 · 多摩市 · 稲城市 | 西東京市 · 小平市 · 小金井市 |
| 벤치마크 | Ep.10 (+ Ep.11) | Ep.10 · Ep.12 |
| 지시 | [`AG_TASK_EP12_INSTRUCTION.md`](./AG_TASK_EP12_INSTRUCTION.md) | [`AG_TASK_EP13_INSTRUCTION.md`](./AG_TASK_EP13_INSTRUCTION.md) |
| 큐 | OPEN_QUEUE `NP` done | OPEN_QUEUE `NP13` open |

---

## 8. 문서 정합 (포인터)

| 문서 | 취급 |
|------|------|
| `BLOG_AG_CURSOR_WORKFLOW.md` | 상단에 **본 문서 Mode 표**로 역할 위임 |
| `AG_TASK_EP11_INSTRUCTION.md` | Ep.11 역사 문서 · Ep.12+는 EP12+본 SSOT |
| `JOSEPH_AUTHENTIC_VOICE.md` | 「GPT 기본 보이스」→ **선택**으로 정정(본 문서 §3·§6) |
| PROCESS Part N | 실행 세부는 본 문서 · PROCESS는 정책·HARD |
| OPEN_QUEUE | 신규 슬롯 = Part N Stable |

---

## 9. 변경 이력

| 일자 | 내용 |
|------|------|
| 2026-07-17 | 초판 · Mode C/B/V · GPT 선택 · Claude 토큰예외 · Ep.12 캘리브레이션 |
| 2026-07-18 | R5c 추가 — 데이터 저널리즘 70/30 (Voice v1.3). 90/10 → 70/30 조정, 지향 60/40. 숫자 두려운 독자 기준. |
| 2026-07-29 | Ep.13 포인터 — `tokyo-nishitokyo-kodaira-koganei` · Joseph 클러스터 A · Mode C 유지 |
