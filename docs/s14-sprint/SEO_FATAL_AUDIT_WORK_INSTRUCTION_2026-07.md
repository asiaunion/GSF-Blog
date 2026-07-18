# SEO + Fatal Audit — 작업 지시서 (2026-07)

> **상태:** Joseph 잠금 · 2026-07-18  
> **목적:** 기존 글의 SEO §1–4를 우선 고치면서, 같은 패스에서 출처 오류·미검증 단정 등 치명 오류만 바로잡는다.  
> **상위 SSOT:** [`CONTENT_PUBLISHING_PROCESS_2026-07.md`](../CONTENT_PUBLISHING_PROCESS_2026-07.md) §0.1  
> **SEO:** [`SEO_WRITING_GUIDE_2026-07.md`](../SEO_WRITING_GUIDE_2026-07.md)  
> **Voice:** [`JOSEPH_AUTHENTIC_VOICE.md`](../JOSEPH_AUTHENTIC_VOICE.md) v1.3 · **2026-07-18 잠금본**  
> **보드:** [`FATAL_AUDIT_BOARD.md`](./FATAL_AUDIT_BOARD.md)

---

## 1. 범위

### 1차 — SEO §1–4

- title · description
- 도입 약 200자: 검색 질문에 먼저 직답
- 질문형 H2 3–5개
- `modDatetime`

### 2차 — Fatal Audit (FA)

SEO 작업 중 발견한 아래 오류만 같은 패스에서 수정한다.

- 틀린 수치·법률·세무·단체명
- 출처와 본문 주장이 맞지 않음
- 깨진/중복 표 · 계산 기준 불일치
- 근거 없는 인과·수요·인구·수익 단정
- 독자가 돈 결정을 내릴 수 있는 YMYL 권유·보장

### 하지 않는 일

- 본문 spine·섹션 전면 재작성
- 새 통계·새 인과 가설·대체 서술 신설
- Voice Full(70/30·중간질문·노트문장·여운·전면 한자 병기)
- slug/URL·카테고리·허브 재배정
- JA 신규 발행 · Gate A 전 AdSense 재신청

---

## 2. FA 판정

실무는 T0/T1 라벨보다 **FA(지금 수정) vs T2+ 백로그**로 판정한다.

1. 외부 소스로 참/거짓을 판별할 수 있는 사실 주장인가?  
   수치·단체명·법률·인과인데 출처가 없거나 불일치하면 **FA**.
2. 독자가 이 문장을 돈·투자·세무 결정의 근거로 삼을 수 있는가?  
   그렇다면 **FA**.
3. 「제 생각에는」·Joseph's View 등 저자 관점 표지가 있는가?  
   있으면 원칙적으로 **T2**.

**타이브레이크:** 세무·법률·수익률·단체명은 FA로 상향한다. 동네 분위기·전망 해석은 관점 표지를 붙이고 T2로 내린다.

### 삭제 에스컬레이션 (HARD)

- FA 삭제로 문단이 비면 문단 삭제까지 허용한다.
- 삭제 자리에 대체 서술을 새로 만들지 않는다.
- 한 slug에서 **삭제 claim 5건 이상** 또는 **H2 구조 변경**이 발생하면 Joseph 사전 1줄 승인을 받는다.
- 삭제 후 글이 지나치게 얇아지면 `FATAL_AUDIT_BOARD.md`의 Voice Full 상위 큐에 올린다.

---

## 3. Voice Lite (이번 패스에만)

- 도입은 **직답 먼저**, 그 뒤 발견서술(「처음엔… / 데이터를 보니…」) 최대 1회
- 허구 현장담·가짜 1인칭 금지
- 새로 쓰거나 FA로 고친 문장에 Reader First 용어집 적용
- 지명 병기: **KO 전용 · 손댄 지명 · 첫 등장 1회만**
- Joseph's View·목차·표·본문 전체 리듬은 건드리지 않는다(FA 표 오류 제외)

캘리브레이션: Tier 1 #3·#6 = Voice Lite 상한. Ep.12 = Voice Full 벤치마크.

---

## 4. 역할

| 역할 | 담당 | 백업 |
|------|------|------|
| Claude | R1 정찰 · §1–4 2안 · 독립 FA 스캔 · drop | GPT 장애 시 2차 스캔 대행 |
| GPT | Claude 결과를 보지 않고 블라인드 FA 스캔 | Claude 또는 Cursor |
| Cursor | 두 스캔 합집합 dedupe · FA 판정 · validate/build/prod/IndexNow | AG 장애 시 파일 반영·배포 |
| AG | PASS된 diff 반영 · EN/JA 정합 · 네이버 HTML | Cursor (필요 시 Claude 수정 drop) |
| Joseph | 쿼리/title·루브릭·삭제 에스컬레이션·네이버 발행 | — |

### 백업 트리거

- GPT: 미착수·지연·품질 미달 → Claude 독립 2차 스캔 또는 Cursor 단독 triage
- AG: 미착수·범위 이탈·validate 반복 실패 → Cursor 반영·배포
- 백업에도 블라인드·삭제 에스컬레이션·FA 범위 HARD를 그대로 적용

---

## 5. slug 1편 파이프라인

```text
R0 선정
→ R1 Claude·GPT 독립 정찰/스캔
→ R2 §1–4 2안 + FA 표
→ R2b Cursor 병합·판정
→ R3 Joseph 루브릭·에스컬레이션 승인
→ R4 AG 반영 (§1–4 + Voice Lite + 승인 FA)
→ R5 EN/기존 JA 정합
→ R6 Cursor validate:post + build + prod + IndexNow
→ R7 네이버 HTML + STATUS/OPEN_QUEUE + hub:log
```

### drop 포맷 (slug당 1파일)

1. A. 쿼리/SERP 정찰
2. B. §1–4 초안 2안
3. C. FA 표
4. D. Voice Lite 자가체크

| # | 등급 | 위치(H2/문장) | 문제 유형 | 확인 시도 소스 URL 또는 `확인 불가` | 제안 조치 | 판정(Cursor) |
|---|------|---------------|-----------|-----------------------------------------|-----------|--------------|

Claude는 판정 열을 비워 둔다. GPT는 Claude drop을 보지 않는다.

---

## 6. 검증 게이트

배포 전 모두 PASS:

- [ ] FA open 0건
- [ ] fact-audit가 실제 본문 claim과 구체 원문 URL을 가리킴
- [ ] `citeSources` URL ⊆ `sources`
- [ ] KO/EN/기존 JA 수치·단체명·법률 의미 정합
- [ ] `pnpm validate:post {slug}` score 100 / hard gates PASS
- [ ] `pnpm build`
- [ ] Naver: 링크 1개 · 개별 URL · Ark `utm_campaign=blog-broadcast`

---

## 7. 순서·페이싱·동결

### Wave A

`#5` → `#7` → `#8` → `#9` → `#10` → `#4`/`#4b`

- #5·#7: 정식 캘리브레이션
- #8: 세무 YMYL 준캘리브레이션(Cursor 대조 1회)
- #4/#4b: 링크 대상 title 확정 후 허브 정합

### 페이싱

- 운영 가이던스: **2–3 slug/일**
- 일일 상한: **없음**
- HARD: 하루·한 배치 수십 편 일괄 `modDatetime`·대량 동시 수정 금지

### ~2026-07-29 이후 동결

- title·도입·H2 대량 변경 중지
- **T0 + YMYL성 T1만** Joseph 승인 후 즉시 핫픽스
- 나머지 T1은 동결 해제 후
- 기존 JA live의 §1–4·FA 정합은 허용, JA 신규 발행만 동결

### 네이버

- 그 주 손댄 slug 우선
- 발행 대기 3편 초과 시 오래된 초안부터 소진

---

## 8. 에이전트 부트 한 줄

> SEO+FA: §1–4가 1차, FA만 본문 교정. Claude/GPT 블라인드 → Cursor 병합 → Joseph → AG. 삭제 5건/H2 구조 변경은 사전 승인. Voice Lite만. 가이던스 2–3/일, 상한 없음.
