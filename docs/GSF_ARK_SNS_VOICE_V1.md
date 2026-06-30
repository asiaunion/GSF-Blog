# GSF-Ark SNS Voice v1.0

> **상태**: 확정 (2026-06-30) · Ep.10 벤치마크 · Joseph × ChatGPT × Claude 합의  
> **AG 트리거**: Joseph가 **`SNS 배포 시작`** / **`SNS 배포`** / **`소셜 배포`** 만 말하면 → [`.agents/skills/social-broadcast/SKILL.md`](../.agents/skills/social-broadcast/SKILL.md) 자동 실행  
> **관련**: [`JOSEPH_AUTHENTIC_VOICE.md`](./JOSEPH_AUTHENTIC_VOICE.md) · [`SNS_PILOT_CADENCE.md`](./SNS_PILOT_CADENCE.md) · [`AG_SNS_DRAFT_PROMPT.md`](./AG_SNS_DRAFT_PROMPT.md) · [`../blueprint-social-broadcast.md`](../blueprint-social-broadcast.md)

---

## 한 줄

| 레이어 | 역할 |
|--------|------|
| **블로그** | 데이터를 따라가며 답을 찾는 분석 기록 |
| **SNS** | 그 글을 쓰게 만든 **질문 하나** + 데이터를 통해 확인한 **가장 의미 있는 발견 하나**를 나누는 공간 |

SNS는 블로그를 **요약·홍보하지 않는다**. 블로그를 읽고 싶게 만드는 **한 가지 질문**을 던진다.

---

## 4단 구조 (모든 플랫폼 공통 논리)

```
① 이번 글에서 가장 오래 붙잡았던 질문 (표현은 매 글 로테이션)
        ↓
② 데이터로 확인한 발견 1개 (숫자 1개 — YMYL 규칙 준수)
        ↓
③ 한 줄 결론 (Joseph's Note)
        ↓
④ 링크 + (해당 시) 면책 문구
```

**질문은 유지하되, opening 문형은 매 글 다르게** (템플릿 반복 금지).

### 질문 opening 변형 풀

- 이번 분석에서 가장 먼저 확인하고 싶었던 점은…
- 처음에는 이런 가정을 갖고 있었습니다.
- 이번 데이터를 보면서 가장 궁금했던 점은…
- 이 글을 쓰게 된 계기는 한 가지 질문이었습니다.
- 이번 분석을 준비하면서 가장 오래 붙잡았던 질문은…

### 발견 표현

- ❌ "놀라움" (감정 강도 과함)
- ✅ **발견(discovery)** — "데이터를 통해 확인한 가장 의미 있는 발견 하나"

---

## 톤 (Joseph Authentic Voice 정렬)

- 데이터 존중 · 사고 과정 공개 · 과장 금지 · 매수 권유 금지
- **KO**: 정중체 (`~습니다`). 브이로그체 금지 (`~거든요`, `~봤거든요`, `~것 같습니다`)
- **EN**: 차분한 분석가 톤. `massive` / `buy now` / `strongly recommend` 금지
- EN 과장 대체: `massive` → `significant` / `clear` price differences

### 금지 vs 권장

| 금지 | 권장 |
|------|------|
| 블로그 EN/KO 직역 | 질문 + 발견 + 한 줄 결론 |
| "Key takeaways from this analysis" | "One number kept coming back as I worked through the data." |
| 요약 홍보 ("네 도시를 정리했습니다") | "도시 평균보다 동네가 시장을 더 잘 설명한다" |
| 플랫폼마다 다른 핵심 메시지 | 질문·발견은 동일, 문장 길이만 조절 |

---

## 채널·언어 (기본값)

사용자 지시 없으면 아래를 따른다.

| 채널 | 언어 | 비고 |
|------|------|------|
| X | EN + KO | JA 기본 제외 |
| LinkedIn | EN + KO | JA 보류 (KO 개선 2~3회 테스트 후 재검토) |
| Threads | EN + KO | JA 기본 제외 |

### 언어 선택 근거 (초안 상단에 기록)

- **X-JA 제외** — 주제가 글로벌·한국 이주 관심층 중심일 때. 일본 내수 X 반응 검증 전까지 효율상 제외.
- **LinkedIn-KO 포함** — Relocation·이주 맥락 태그가 있을 때. EN 번역이 아닌 이주 독자용 질문+숫자 훅.
- **Threads-JA / LinkedIn-JA 보류** — EN·KO 톤·프레임 안정화 우선.

---

## 플랫폼별 제약

### X (Twitter)

- twitter-weighted **280자 이하** (URL = 23자)
- 질문 + 발견 **1~2문장** + 링크 + 해시태그
- Joseph's Note 마무리 **생략**
- X-EN은 짧고 단정적 — 과도한 수정 불필요한 경우가 많음

### Threads

- **500자 이하** (URL 포함)
- 단락 **2~3개** (한 줄씩 잘게 쪼개지 않음)
- 마지막에 Joseph's Note 한 줄
- 예: "동네가 도시 평균보다 시장을 더 잘 설명해 주고 있었다는 점"

### LinkedIn

- 질문 1문장 + **두 번째 문장에 발견 숫자(배수)**
- bullet 3~4개
- 면책 문구 필수 (investment 카테고리)
- EN opening 권장: `One number kept coming back as I worked through the data.`

---

## URL · UTM (필수)

```
KO: https://gsfark.com/ko/posts/<slug>/?utm_source=<platform>&utm_medium=social&utm_campaign=blog-broadcast
EN: https://gsfark.com/posts/<slug>/?utm_source=<platform>&utm_medium=social&utm_campaign=blog-broadcast
```

- `<platform>` = `x` | `linkedin` | `threads`
- `utm_campaign=blog-broadcast` 고정 (`blog_pilot` 금지)

---

## YMYL · validate:sns-draft 하드 게이트

게시 전 **필수**:

```bash
pnpm validate:sns-draft --slug <slug>   # exit 0
```

구현: [`scripts/validate-sns-draft.mjs`](../scripts/validate-sns-draft.mjs)

### SNS 본문 금지 패턴 (스크립트 자동 차단)

- `%`, `¥`, `万円`, `억` / `억원`, `CAGR`, `XX만 원`(띄어쓰기)
- 매수 권유: 매수 적기, 지금이 기회, 추천합니다, buy now, perfect time to buy 등

### 허용되는 "발견 숫자" (1개만)

- **배수·倍率**: `3.6배`, `3배 이상`, `3.6×`, `more than triple`
- 동네명·역명·도시명은 OK

### 금지되는 발견 숫자 (본문)

- 구체 금액: 83.4만엔, ¥834k, 126.5만/㎡
- 수익률·CAGR·임대료 구간 (8.0~9.4만엔 등)

→ 금액·수익률은 **블로그**에서 확인하도록 유도. SNS는 **격차의 크기(배수)** 만.

### 문구 치트시트

| 피함 (검증 FAIL) | 대신 씀 (검증 PASS) |
|------------------|---------------------|
| 83.4만엔 / ¥834k | 동네에 따라 **최대 3.6배** |
| 8.0~9.4만엔/월 | 신축 1R 임대료는 **비교적 좁은 범위** |
| 126.5만/㎡ | 일부 동네는 **시 평균을 크게 상회** |
| massive price gaps | **significant** / **clear** price differences |
| ~것 같습니다 | ~**설명해 주었습니다** / ~**나타났습니다** |

---

## 면책 (investment 카테고리)

| 플랫폼 | EN | KO |
|--------|----|----|
| X / Threads | `For information purposes only.` | `정보 제공 목적.` |
| LinkedIn | `*For informational purposes only and does not constitute investment advice.*` | `*본 글은 정보 제공 목적이며, 특정 자산의 매수·매도를 권유하지 않습니다.*` |

---

## 산출물

1. 채팅용 초안 (플랫폼별 🇺🇸/🇰🇷 + 📋 복사용 블록)
2. `sns-drafts/YYYY-MM-DD-<slug>.md` ([`_TEMPLATE.md`](../sns-drafts/_TEMPLATE.md) 구조)
3. 언어 선택 근거

---

## Ep.10 벤치마크 (톤·YMYL-safe)

- **질문**: "다마를 하나의 시장으로 볼 수 있을까?"
- **발견**: "타치카와시 안에서 동네에 따라 최대 3.6배"
- **결론**: "도시 평균보다 동네가 시장을 더 잘 설명한다"
- **블로그 SSOT**: `src/data/blog/ko/tokyo-kokubunji-kunitachi-fuchu-tachikawa.md`
- **SNS 초안 SSOT (최종 확정)**: `sns-drafts/2026-06-30-tokyo-kokubunji-kunitachi-fuchu-tachikawa.md` — AG는 재작성 없이 읽고 제출

---

## 운영 점검 (Ep.11+)

새 스타일을 만들기보다 **일관성**을 점검한다.

- [ ] 질문 opening이 직전 회차와 동일 문형이 아닌가?
- [ ] 발견 숫자가 1개(배수)이고 YMYL 통과하는가?
- [ ] KO가 정중체이고 브이로그체가 없는가?
- [ ] LinkedIn-KO가 EN 번역이 아닌 이주·실거주 맥락인가?
- [ ] `pnpm validate:sns-draft --slug` exit 0인가?

---

## 변경 이력

| 날짜 | 내용 |
|------|------|
| 2026-06-30 | v1.0 확정 — Ep.10 SNS Voice, AG 프롬프트 연동 |
