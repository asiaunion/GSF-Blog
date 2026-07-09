# AG 지시문 — Ep.11 · Ep.12 「다마 외곽 2편 분할」

> **작성**: Claude (2026-07-09) · Joseph 승인 완료 (2026-07-09)  
> **벤치마크 (필독)**: `src/data/blog/ko/tokyo-kokubunji-kunitachi-fuchu-tachikawa.md` (Ep.10)  
> **검증자**: Claude (이번 에피소드부터 Cursor 역할을 Claude가 대행)

## 편 구성 확정

| 편 | 제목 방향 | 대상 시 | 슬러그 후보 |
|----|----------|---------|------------|
| **Ep.11** | 중앙선 서부 + 세이부 벨트 | 八王子市 · 日野市 · 昭島市 | `tokyo-hachioji-hino-akishima` |
| **Ep.12** | 오다큐·게이오 남부 뉴타운 벨트 | 町田市 · 多摩市 · 稲城市 | `tokyo-machida-tama-inagi` |

**분할 논리**
- Ep.11은 Ep.10 타치카와에서 중앙선을 따라 서진하는 자연스러운 흐름
- Ep.12는 오다큐·게이오·타마 뉴타운이라는 독립된 남부 생활권
- 각 편 3개 시 → Ep.10(4개 시)보다 밀도 있게 집중 가능

**AG 실행 순서**: Ep.11 완료 후 Ep.12 착수. 동시 진행 금지.

---

## 0. 역할 분담 (이번 Ep.11 한정)

| 역할 | 담당 | 내용 |
|------|------|------|
| **글 작성·초안** | **AG** | MLIT 데이터 수집 → Decision Log → KO 초안 |
| **보이스 편집** | **ChatGPT** | Joseph 톤·문체 최종 다듬기 |
| **최종 검증** | **Claude** | KO 초안 수령 후 KO_VNEXT 체크리스트 전항목 검증 → 수정 지시 또는 OK |
| **Authenticity 승인** | **Joseph** | Decision Log + KO 최종 OK |

Claude는 Cursor 대신 사실 정합·구조·톤 전체를 검증한다.  
AG는 Claude 검증 결과를 받기 전까지 `draft: false` 전환·배포 금지.

---

## 1. 에피소드 개요

### Ep.11

| 항목 | 내용 |
|------|------|
| **시리즈** | Where to Live in Tokyo — 23구 + 다마 완전 가이드 |
| **에피소드** | **Ep.11 — 중앙선 서부 + 세이부 벨트** |
| **대상 시** | 八王子市 · 日野市 · 昭島市 |
| **핵심 질문** | 하치오지는 다마 최대 도시인데 왜 싼가? 히노는 타치카와(Ep.10)와 하치오지 사이의 어떤 시장인가? 아키시마는 23구에 가장 가까운 다마 외곽으로 가격이 다른가? |
| **Ep.10 연결** | 타치카와(立川)에서 중앙선을 따라 서진 — 히노→하치오지 축 |
| **벤치마크** | Ep.10 (`tokyo-kokubunji-kunitachi-fuchu-tachikawa.md`) |

### Ep.12 (Ep.11 완료 후 착수)

| 항목 | 내용 |
|------|------|
| **에피소드** | **Ep.12 — 오다큐·게이오 남부 뉴타운 벨트** |
| **대상 시** | 町田市 · 多摩市 · 稲城市 |
| **핵심 질문** | 타마 뉴타운 노후화는 저평가인가 재평가인가? 마치다의 가나가와 경계 효과는 실재하는가? 이나기는 조용한 역세권 프리미엄인가? |
| **벤치마크** | Ep.11 완료본 (+ Ep.10) |

---

## 2. 필독 문서 (작업 전 반드시 전체 정독)

| 우선순위 | 문서 경로 | 핵심 내용 |
|---------|----------|----------|
| ★★★ | `docs/JOSEPH_AUTHENTIC_VOICE.md` | Joseph 편집 철학 4원칙 + 허구 현장 금지 |
| ★★★ | `docs/KO_VNEXT_WRITING.md` | 섹션 spine 순서 (변경 금지) + 톤 체크리스트 |
| ★★★ | `src/data/blog/ko/tokyo-kokubunji-kunitachi-fuchu-tachikawa.md` | **Ep.10 정본** — 이 글이 모든 판단 기준 |
| ★★☆ | `docs/REASONING_OS.md` | 사고 흐름: 가설→데이터→수정→판단 |
| ★★☆ | `docs/JOSEPH_AUTHOR_OPS.md` | Phase 0~4 실행 순서 |
| ★★☆ | `.blog-agent-stage/tokyo-kokubunji-kunitachi-fuchu-tachikawa/decision-log.md` | Ep.10 Decision Log 구조 **그대로 복사** |
| ★☆☆ | `docs/BLOG_EPISODE_VERIFICATION_PIPELINE.md` | 검증 파이프라인 전체 |
| ★☆☆ | `docs/verification/manifests/ep10-*.manifest.json` | manifest 형식 참고 |

---

## 3. Phase 0 — 데이터 수집 (AG 실행)

### 3-1. MLIT 데이터 수집 (Ep.11 먼저)

```bash
cd projects/GSF-Ark

pnpm analyze:episode -- --episode ep11 --write
pnpm research:pack -- --episode ep11 --write
```

**Ep.11 수집 대상 시**: 八王子市 · 日野市 · 昭島市

각 시별 수집 지표:

- **MLIT 성약가**: 町名(丁目)별 ㎡단가 + 거래 건수 (2025년 1~4분기)
- **SUUMO 임대**: 신축·역 도보 1~5분·1R 스냅샷  
  (`docs/verification/snapshots/suumo-sc_{시코드}-{날짜}.html` 저장)
- **인당 소득**: 総務省 R6 第11表 + 都人口推計 2026年5月
- **인구 전망**: IPSS mesh 2020→2040
- **역 승하차**: 주요 역별 1일 승하차 수
- **재해 리스크**: MLIT XKT 타일 (침수·액상화·산사태)
- **재개발 현황**: 하치오지역 북구 재개발 등 공식 자료

> **파이프라인 갭**: 3개 시 모두 `tokyo_mansion_stats_2025.json`에 데이터 없음.  
> **町名별 MLIT 성약가 직접 수집**이 핵심. 시 전체 평균 없어도 町名 집계로 진행.  
> Ep.12(마치다·타마·이나기) 데이터는 Ep.11 Claude 검증 완료 후 별도 수집.

### 3-2. Decision Log 작성

경로: `.blog-agent-stage/tokyo-hachioji-hino-akishima/decision-log.md`

Ep.10 Decision Log 구조를 그대로 따른다:

```text
## Why this topic?
## Phase 0 — Data snapshot  ← 수치는 manifest/research-pack에서만
  ### Sources reviewed
  ### Key numbers (L1)
  ### Rent snapshot
  ### Surface yield proxy
  ### Demographics & risk snapshot
  ### Income
  ### Patterns / anomalies (L2)
## Phase 1 — Tiki-taka log  ← T1~Tn (데이터 이상·가설 질문)
## Phase 2 — Hypothesis lock
  Central question / Initial assumption / Trigger / Hypothesis
  Final insight (One Sentence)
## Evidence plan
## Authenticity pre-check  ← KO 후 Joseph 승인
```

### 3-3. Manifest scaffold

```bash
pnpm scaffold:manifest -- --slug tokyo-hachioji-hino-akishima --write
```

산출: `docs/verification/manifests/ep11-tokyo-hachioji-hino-akishima.manifest.json`  
모든 본문 수치는 manifest `claims`에 1:1 매핑. **창작·추측 claim 금지**.

---

## 4. Phase 1 — Joseph 티키타카 대기

MLIT 수집이 끝나면 AG는 아래 형식으로 Joseph에게 **Data Snapshot 보고**:

```
[AG → Joseph] Ep.11 Phase 0 완료 (八王子·日野·西東京)

주요 수치 이상 3가지:
1. (가장 놀라운 숫자·格差)
2. (예상과 다른 시·동네)
3. (Ep.10 타치카와 대비 흥미로운 패턴)

티키타카 질문:
Q1. ...
Q2. ...
```

Joseph 답변 전 KO 초안 작성 금지.

---

## 5. Phase 2~4 — KO 초안 작성 규칙

### 5-1. 섹션 spine (순서 고정 — Ep.10과 동일)

```text
1. 프롤로그 (Ep.10 흐름 연결 1~2문단)
2. ## 먼저 결론          ← bullet 4~6개
3. ## 왜 이 글을 쓰는가   ← false assumption 한 줄 + 검증 의도
4.   (출발 가설 1~2문장)
5. ## 처음 생각과 데이터가 바꾼 점   ← 표 (확인한 내용 | 데이터가 보여준 점)
6. ## 목차
7. ## 1~N 본문          ← 시·町名별 표 + 해석 라벨 로테이션
8. ## N+1. 시 비교 요약   ← Ep.10 §5 형식 참고
9. ## 같은 데이터, 다른 해석
10. ## 이런 분께 / 추천하지 않습니다
11. ## Joseph's View
12. (시리즈 링크·다음 편 예고)
13. ## 데이터 기준 시점
14. <small> 면책
```

### 5-2. 필수 준수 사항

**구조**
- Ep.10 섹션 순서 그대로. 순서 변경 금지.
- 결론을 본문 끝에 배치 금지 — **먼저 결론 섹션이 항상 앞**에 온다.

**데이터**
- 본문의 모든 수치는 manifest `claims`에 있는 것만 쓴다 (창작 금지).
- 거래 건수 n < 30인 구간은 「추세 참고용」 각주 필수.
- 시 단위 평균이 없을 경우 町名 집계 기준임을 명시.
- 「역 도보 ○분」 단정 금지 — 町名 MLIT 집계 라벨 필수.

**톤**
- **합니다체** 유지. 반말·해요체 혼용 금지.
- 「반드시」「확실히」「보장」등 단정 표현 금지.
- 허구 현장 금지: 「가보니」「체감상」없이 공개 자료·MLIT만.
- 인구·소득은 **배경 자료**로만 — 가격 결론의 근거로 과도하게 사용 금지.
- 독자 투자 권유·후보군 push 금지 (이런 분께 섹션만 self-selection).

**Joseph 보이스 (핵심)**
- 1인칭 Joseph는 **Joseph가 직접 제공한 문장**만 삽입. AG 창작 금지.
- 분석가 목소리: 「이번 데이터를 보며 인상이 바뀐 부분은…」 (○) vs 「저는 감동했습니다」 (×)
- **멈춤 문장** 2~3개: 「여기서 잠깐 멈춰 보겠습니다」 등 — 정보 추가 아닌 독자 동기화.
- **해석 라벨 로테이션** (동일 표현 반복 금지):

  | 라벨 | 용도 |
  |------|------|
  | 여기서 주목할 점 | 예상 밖 수치 |
  | 예상과 달랐던 부분 | 소득≠가격 등 |
  | 해석이 갈리는 지점 | 양면 해석 가능 |
  | 데이터를 보며 인상이 바뀐 부분 | 시 평균 착시 깨짐 |

**Joseph's View 섹션 (Ep.10 형식 그대로)**
```markdown
> 데이터를 검토하며 정리한 **판단**입니다. 현장담·허구 경험은 포함하지 않습니다.

**이번 글을 정리하며** — 붙잡았던 질문 → 자료 대조 → 생각 변화
**앞으로도 유지하려는 읽기**
**아직 확신하기 어려운 부분** (n<30 등)
**독자분들께 권하는 확인 순서** (체크리스트)
**한 줄로 정리하면** — Final insight echo (필수)
```

### 5-3. 분량·형식

- KO 본문 **4,000자 이내** (면책 제외)
- frontmatter: `draft: true` · `lang: ko` · `aiModel: "AG + ChatGPT (KO voice)"` · `citeSources` 필수
- 이미지: `ogImage` 필드 기재 (hero 이미지 생성 별도 — 일단 placeholder 기재)

---

## 6. 시리즈 연결 링크 (KO 본문 하단)

```markdown
## 다음 편 예고

다음 편에서는 오다큐·게이오 남부 뉴타운 벨트 — 마치다·타마·이나기를 다룹니다. (Ep.12)

## 이 시리즈 전체 보기

- [시리즈 프롤로그](/ko/posts/tokyo-ward-guide-series-prologue/)
- [Ep.10: 다마 교육·문화 벨트 — 코쿠분지·쿠니타치·후추·타치카와](/ko/posts/tokyo-kokubunji-kunitachi-fuchu-tachikawa/)
- [Ep.9: 서부 프리미엄 외곽 — 무사시노·미타카·조후](/ko/posts/tokyo-musashino-mitaka-chofu/)
- [Ep.1: 핵심 3구 — 치요다·주오·미나토](/ko/posts/tokyo-core-3-wards-chiyoda-chuo-minato/)
```

---

## 7. AG → Claude 검증 인계 방식

KO 초안(ChatGPT 보이스 편집 완료본)을 Claude에게 전달:

```
[AG → Claude] Ep.11 KO 초안 검증 요청

slug: tokyo-hachioji-hino-akishima
KO 파일: src/data/blog/ko/tokyo-hachioji-hino-akishima.md
          (또는 .blog-agent-stage/tokyo-hachioji-hino-akishima/ko.md)
Decision Log: .blog-agent-stage/tokyo-hachioji-hino-akishima/decision-log.md
Manifest: docs/verification/manifests/ep11-tokyo-hachioji-hino-akishima.manifest.json

검증 요청 항목:
1. KO_VNEXT_WRITING.md 보이스 편집 체크리스트 전항목
2. Ep.10 대비 구조·톤·독자 난이도 비교
3. manifest claims ↔ 본문 수치 1:1 매핑
4. 허구 현장·단정 표현·내부 코드 확인
5. Joseph's View 완결성 (사고 과정·Final insight echo)
```

Claude 검증 결과:
- **OK** → Joseph Authenticity 승인 → `draft: false` 전환 → 배포
- **수정 필요** → 항목별 지적 → AG 수정 → Claude 재검증

**Ep.12는 Ep.11 Claude 검증 OK 이후 착수.**

---

## 8. Pilot slug 등록 (AG 실행)

```bash
# docs/pilot/hypothesis-layer-pilot-slugs.json "slugs" 배열에 추가
# Ep.11: "tokyo-hachioji-hino-akishima"
# Ep.12: "tokyo-machida-tama-inagi" (Ep.11 완료 후)
```

---

## 9. 체크리스트 (AG 자체 확인 후 Claude에 인계)

### Phase 0~3 완료 확인
- [ ] `pnpm analyze:episode -- --episode ep11` 실행 완료
- [ ] `pnpm research:pack -- --episode ep11` 실행 완료
- [ ] Decision Log — Phase 0~2 모두 채워짐
- [ ] Manifest scaffold 생성 + claims 수치 매핑
- [ ] Joseph 티키타카 완료 + Final insight 확정
- [ ] Joseph manifest 승인 (`manifest_approved_by: "Joseph"`)

### KO 초안 자체 점검
- [ ] vNext spine 순서 준수 (먼저 결론 → … → Joseph's View → 데이터 기준 시점)
- [ ] 본문 수치 = manifest claims 100% 일치 (창작 없음)
- [ ] 합니다체 · 단정 표현 없음
- [ ] 허구 현장 없음 (`가보니` `체감상` 검색 → 0건)
- [ ] 멈춤 문장 2~3개
- [ ] 해석 라벨 로테이션 (동일 라벨 반복 없음)
- [ ] Joseph's View — 사고 과정·Final insight echo 포함
- [ ] n<30 구간 각주 처리
- [ ] 면책 문구 하단 기재
- [ ] `draft: true` 유지 (Claude 검증 전 `false` 전환 금지)

---

## 10. Ep.10 대비 주요 차이 예상

| 항목 | Ep.10 | Ep.11 | Ep.12 |
|------|-------|-------|-------|
| 대상 시 | 4개 | **3개** (하치오지·히노·아키시마) | **3개** (마치다·타마·이나기) |
| 공통 테마 | 「다마 = 하나의 싼 외곽」 반박 | 「최대 도시 하치오지가 왜 싼가」 | 「뉴타운 노후화 = 저평가인가」 |
| Ep.10 연결 | Ep.09 서진 | **타치카와→히노→하치오지** 직접 연장 | 독립된 남부 생활권 |
| 데이터 갭 | 시 단위 benchmark 없음 → 町名 직접 수집 | 동일 | 동일 |
| 아키시마 변수 | — | **23구 경계 효과** — 가격이 다른가? | — |

**핵심 원칙**: 「더 싸다」는 포지션이 아니라 **「왜 싼지·어디서 달라지는지」**를 데이터로 읽는다.  
「30~50% 저렴」 spec 브랜드를 단정으로 쓰지 말고, 데이터가 보여주는 구조로 설명한다.

---

*이 지시문은 Claude가 작성했습니다. (2026-07-09)*
