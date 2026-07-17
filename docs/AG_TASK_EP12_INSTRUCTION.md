# AG + Cursor 지시문 — Ep.12 「오다큐·게이오 남부 뉴타운 벨트」

> **작성:** Cursor (2026-07-17) · Joseph 프로세스 승인  
> **파이프라인 SSOT:** [`PART_N_STABLE_PIPELINE_2026-07.md`](./PART_N_STABLE_PIPELINE_2026-07.md) — **Mode C**  
> **벤치마크:** Ep.10 `tokyo-kokubunji-kunitachi-fuchu-tachikawa` · Ep.11 `tokyo-hachioji-hino-akishima`  
> **구 Ep.11 지시의 역할표(AG 초안·Claude 검증)는 본 편에 적용하지 않음.**

---

## 0. 역할 (Mode C — 이 편만)

| 단계 | 담당 |
|------|------|
| MLIT · research-pack · manifest · Decision Log | **AG** |
| manifest / 가설 승인 | **Joseph** |
| N1 SERP · N2 §1–4 골격 · **KO 초안** | **Cursor** |
| GPT 1회 개선 | **선택** — Joseph 명시 시에만 |
| Authenticity | **Joseph** |
| EN · 이미지 · validate · deploy · IndexNow · 네이버 · PKM · 프롤로그/링크 | **AG** |
| 배포 후 HARD 검증 | **Cursor** |

**금지:** JA 신규 · Cursor PASS 전 `draft: false`/prod · AG가 GPT를 기본 경로에 삽입 · slug 변경.

**예외:** Cursor 토큰 고갈 시 Joseph 명시 하에 Claude가 Cursor KO/검증 대행 — 동일 루브릭 ([PART_N §3](./PART_N_STABLE_PIPELINE_2026-07.md)).

---

## 1. 에피소드

| 항목 | 내용 |
|------|------|
| 시리즈 | Where to Live in Tokyo — The 23 Wards Guide (+ 다마) |
| Ep | **12 — 오다큐·게이오 남부 뉴타운 벨트** |
| 대상 시 | 町田市 · 多摩市 · 稲城市 |
| slug | `tokyo-machida-tama-inagi` |
| Ep.11 연결 | 다마 서부(하치오지·히노·아키시마) 다음 — 남부 뉴타운·오다큐/게이오 축 |
| 핵심 질문 (초안 · N1 후 Joseph 확정) | 타마 뉴타운 노후화는 저평가인가 재평가인가? 마치다의 가나가와 경계 효과는? 이나기 역세권 프리미엄은? |

### 타깃 쿼리 (N2에서 잠금)

| 필드 | 값 |
|------|-----|
| 1차 후보 | `마치다 집값` / `타마 뉴타운` / `이나기 맨션` (SERP 후 1개 확정) |
| title·도입·H2 | [`SEO_WRITING_GUIDE_2026-07.md`](./SEO_WRITING_GUIDE_2026-07.md) §1–4 |
| 원장 | `slug \| q=… \| Ep.12 \| 다음점검 +14d` |

---

## 2. AG — Phase 0~2 (Cursor KO 전)

1. 필독: PART_N Stable · KO_VNEXT · JOSEPH_AUTHENTIC_VOICE · Ep.10·11 KO · AUTHOR_OPS  
2. MLIT 町名 단위 (町田·多摩·稲城) — Ep.11 수집 스크립트/패턴 재사용  
3. `.blog-agent-stage/tokyo-machida-tama-inagi/decision-log.md` (Ep.10 템플릿 복사)  
4. `docs/verification/manifests/ep12-tokyo-machida-tama-inagi.manifest.json`  
5. Joseph 승인 전 **KO 본문 작성 금지** (Mode C에서 KO는 Cursor)

완료 시 `_handoff.md`에: stage 경로 · manifest 경로 · 「Cursor §1–4·KO 대기」.

---

## 3. Cursor — §1–4 + KO

1. N1: 한국 Google + 네이버 SERP 5분 → 막히면 긴 꼬리  
2. N2: title / 도입 직답 / 질문형 H2 3–5 → Joseph 확정  
3. KO: vNext spine + Voice 4원칙 + §1–4 정합 · 허구 현장 금지 · 1인칭 2~3  
4. Decision Log Trigger/Hypothesis와 본문 정합  
5. Joseph Auth 후 AG에 넘김  

체크: PART_N §5 루브릭 R1–R8.

---

## 4. AG — Auth 이후

| # | 작업 |
|---|------|
| 1 | EN — 직역 금지 · global reader · PART_N/PROCESS N6 |
| 2 | hero.webp + hero-og.jpg · `verify:og-social` |
| 3 | `pnpm validate:post tokyo-machida-tama-inagi` · `pnpm verify:episode --slug tokyo-machida-tama-inagi` |
| 4 | Cursor PASS 확인 후 `draft: false` · prod deploy |
| 5 | IndexNow · GSC 색인 요청 큐 |
| 6 | 네이버 초안 + `naver_post_queue` 등록 (게시 클릭은 Joseph) |
| 7 | `pnpm dossier:ward -- --episode ep12` + ward 카드 링크 |
| 8 | 프롤로그: Ep.11·12 링크·「발행 예정」제거 · Ep.11 글 다음편 링크 갱신 |

---

## 5. 완료 정의

- [ ] Mode C 전 단계 완료 · live 200  
- [ ] OPEN_QUEUE `NP` / Ep.12 반영  
- [ ] hub:log Cursor (+ AG deploy)  
- [ ] 회고 1줄: Mode B 실험 가능 여부 (Joseph)

---

## 6. 참조

- [`PART_N_STABLE_PIPELINE_2026-07.md`](./PART_N_STABLE_PIPELINE_2026-07.md)  
- [`AG_TASK_EP11_INSTRUCTION.md`](./AG_TASK_EP11_INSTRUCTION.md) — 편 구성·데이터 패턴만 참고  
- [`BLOG_EPISODE_VERIFICATION_PIPELINE.md`](./BLOG_EPISODE_VERIFICATION_PIPELINE.md)
