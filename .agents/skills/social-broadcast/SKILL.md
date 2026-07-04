---
name: social-broadcast
description: GSF-Ark SNS 초안 생성·검증. "SNS 배포 시작", "SNS 배포", "소셜 배포", "SNS 초안" 등만 말해도 Voice v1.0 초안을 만든다.
---

# social-broadcast (GSF-Ark SNS Voice v1.0)

> **Repo**: `/Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark`  
> **Voice SSOT**: [`docs/GSF_ARK_SNS_VOICE_V1.md`](../../docs/GSF_ARK_SNS_VOICE_V1.md)  
> **Task 템플릿**: [`docs/AG_SNS_DRAFT_PROMPT.md`](../../docs/AG_SNS_DRAFT_PROMPT.md)

## 트리거 (이 스킬 즉시 실행)

Joseph가 아래 **만** 말해도 전체 워크플로를 시작한다. 추가 질문 없이 초안까지 만든다.

- `SNS 배포 시작`
- `SNS 배포`
- `소셜 배포 시작` / `소셜 배포`
- `SNS 초안` / `SNS 초안 만들어줘`

slug를 안 줬으면 **자동 추론**한다 (`pnpm sns:resolve-slug`).

---

## HARD-GATE

⛔ **금지**: `docs/GSF_ARK_SNS_VOICE_V1.md` 미읽고 초안 작성  
⛔ **금지**: `sns_scheduler.py` 출력을 **그대로** 게시용으로 제출 (scheduler = 구조·UTM 베이스만, **반드시 Voice v1.0으로 재작성**)  
⛔ **금지**: `pnpm validate:sns-draft` exit 0 전 "배포 완료"·Buffer 게시  
⛔ **금지**: 블로그 직역 · 홍보 요약 · YMYL 금액·%·CAGR 본문 삽입

---

## Step 0 — Boot (자동)

1. **읽기 (순서)**  
   - `docs/GSF_ARK_SNS_VOICE_V1.md`  
   - `docs/JOSEPH_AUTHENTIC_VOICE.md` (톤)  
   - `src/data/blog/ko/<slug>.md` + `src/data/blog/en/<slug>.md`

2. **slug 해석**
   ```bash
   cd projects/GSF-Ark
   pnpm sns:resolve-slug
   # 또는 Joseph가 slug 명시: pnpm sns:resolve-slug -- --slug <slug>
   ```

3. **첫 응답 (1줄)**
   ```
   [SNS Voice v1.0] slug: <slug> · <KO 제목> · source: handoff|newest-ko|cli
   ```

slug가 2개 이상 후보면 Joseph에게만 1회 확인. 그 외에는 묻지 말고 진행.

---

## Step 0-B — 확정 초안 우선 (기본 경로)

`pnpm sns:resolve-slug` 출력에 **`draftFile`** 이 있으면 **재작성하지 않는다**.

1. `draftFile` 전문 읽기 (예: `sns-drafts/2026-06-30-tokyo-kokubunji-kunitachi-fuchu-tachikawa.md`)
2. `pnpm validate:sns-draft --slug <slug>` → **exit 0** 확인
3. exit 0이면 → **Step 1~3 생략** · 파일 내용을 Step 5 채팅 형식으로 Joseph에게 제출
4. `draftFinalized: true`이면 제목에 **(최종 확정)** 표기 유지

**재작성은 Joseph가 명시할 때만** (`다시 써줘`, `SNS 초안 수정`, `Voice로 새로` 등).

| slug | 확정 초안 SSOT |
|------|----------------|
| `tokyo-kokubunji-kunitachi-fuchu-tachikawa` (Ep.10) | `sns-drafts/2026-06-30-tokyo-kokubunji-kunitachi-fuchu-tachikawa.md` |

`_handoff.md`에 SNS 초안 확정 항목이 있으면 동일 파일을 우선한다.

**커밋·푸시**: Joseph 지시 시 AG가 `sns-drafts/*-<slug>.md` (+ 관련 doc 변경)만 스테이징. `git commit` / `git push`는 Joseph 명시 후.

---

## Step 1 — 질문·발견 추출 (내부)

블로그 KO 본문에서 다음을 **2줄로 먼저 정리** (채팅에 잠깐 보여도 됨):

| 항목 | 규칙 |
|------|------|
| **질문 1개** | 이번 글을 쓰게 만든 질문. opening 변형 풀에서 **직전 회차와 다른 문형** 선택 |
| **발견 1개** | 데이터로 확인한 가장 의미 있는 발견. **배수·倍率 1개** (예: 3.6배, 3.6×) |
| **한 줄 결론** | Joseph's Note (예: 동네가 도시 평균보다 시장을 더 잘 설명) |

---

## Step 2 — 6건 초안 작성 (One-shot)

| 채널 | 언어 | 규칙 요약 |
|------|------|-----------|
| X | EN, KO | 280 twitter-weighted 이하. **opening=질문형** (`?`/`까요`). 발견 1~2문장. Joseph's Note 생략. KO 면책 plain `정보 제공 목적.` |
| LinkedIn | EN, KO | 질문/프레이밍 → 배수 1회. bullet 3~4. **요약 인트로 금지**. EN 면책 Voice 표준. KO는 이주·실거주 맥락 (EN 번역 금지) |
| Threads | EN, KO | 500자 이하, 단락 2~3. **Joseph's Note** (GSF Note 금지). 짧은 면책만 |

**제출 전 자가 체크 (validate가 막음):**

- [ ] X EN/KO 첫 줄이 질문인가?
- [ ] Threads에 `Joseph's Note`가 있는가? (`GSF Note` 없음)
- [ ] LinkedIn에 `Key takeaways` / `이번 제도를 검토하면서 확인한 핵심` 없음?
- [ ] 발견 배수(`두 배`/`2x`/`double`)가 LinkedIn에서 과다 반복되지 않는가?
- [ ] Threads KO가 LinkedIn용 긴 면책을 쓰지 않는가?

**언어 기본값** (Joseph 지시 없으면):

- X: EN + KO · JA 제외  
- LinkedIn: EN + KO · JA 보류  
- Threads: EN + KO · JA 제외  

초안 상단에 **언어 선택 근거** 3줄 포함.

**URL**

- KO: `https://gsfark.com/ko/posts/<slug>/?utm_source=<platform>&utm_medium=social&utm_campaign=blog-broadcast`
- EN: `https://gsfark.com/posts/<slug>/?utm_source=<platform>&utm_medium=social&utm_campaign=blog-broadcast`

---

## Step 3 — 파일 저장

`sns-drafts/YYYY-MM-DD-<slug>.md` — [`sns-drafts/_TEMPLATE.md`](../../sns-drafts/_TEMPLATE.md) 구조.

각 `### 🇺🇸 EN` / `### 🇰🇷 KO` 블록 아래에 **게시용 전체 텍스트** (URL·면책·해시태그 포함).

---

## Step 4 — 검증 (exit 0 필수)

```bash
pnpm validate:sns-draft --slug <slug>
```

실패 시 Voice v1.0 + YMYL 치트시트로 수정 후 **재실행** until exit 0.

---

## Step 5 — Joseph에게 제출 (채팅 출력 형식)

```
SNS 초안: <KO 제목> [Ep.NN]
[언어 선택 근거]
…

X (Twitter)
🇺🇸 EN
…
📋 [X-EN 복사용]
…

(LinkedIn · Threads 동일 패턴)

---
✅ validate:sns-draft exit 0
📁 sns-drafts/YYYY-MM-DD-<slug>.md
다음: Joseph 승인 → X KO 1차 게시 (docs/SNS_PILOT_CADENCE.md)
```

**Joseph 승인 전 Buffer·Share Now 금지.**

---

## Cadence (게시는 Joseph 승인 후)

[`docs/SNS_PILOT_CADENCE.md`](../../docs/SNS_PILOT_CADENCE.md):

- 신규 포스트 → **X KO 1건 먼저** · EN 24h+
- X 이미지: `{slug}-hero-og.jpg` 미디어 직접 첨부 권장
- LinkedIn: [Post Inspector](https://www.linkedin.com/post-inspector/) KO·EN 각각 Inspect

---

## slug 자동 추론 우선순위

1. Joseph 메시지에 slug 명시  
2. `_handoff.md` 최신 「배포 완료」 URL  
3. `src/data/blog/ko/` 최신 `pubDatetime` (draft 아님)

---

## Related

- [`deploy-blog`](../deploy-blog/SKILL.md) § Step 6-S  
- [`blueprint-social-broadcast.md`](../../blueprint-social-broadcast.md)  
- [`scripts/validate-sns-draft.mjs`](../../scripts/validate-sns-draft.mjs)
