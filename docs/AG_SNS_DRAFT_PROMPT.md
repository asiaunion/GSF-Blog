# AG Prompt — SNS 초안 생성 (복붙용)

> **SSOT**: [`GSF_ARK_SNS_VOICE_V1.md`](./GSF_ARK_SNS_VOICE_V1.md)  
> **자동 실행**: Joseph가 **`SNS 배포 시작`** 만 말해도 AG는 [`.agents/skills/social-broadcast/SKILL.md`](../.agents/skills/social-broadcast/SKILL.md)를 따른다. 아래 블록은 수동 복붙·slug 명시 시에만 사용.

---

## 회차별 Task (복붙)

```markdown
# Task: SNS 초안 생성 (GSF-Ark SNS Voice v1.0)

## 입력
- slug: `<slug>`
- 제목 (KO): `<한국어 제목>`
- Ep 번호: `<Ep.NN>`
- 카테고리: `investment` (또는 실제 frontmatter 값)

## 소스 (읽기 전용)
- `src/data/blog/ko/<slug>.md` — 질문·발견·Joseph's View 추출
- `src/data/blog/en/<slug>.md` — EN 톤·용어 확인
- `docs/GSF_ARK_SNS_VOICE_V1.md` — 톤·YMYL·채널 규칙
- `docs/JOSEPH_AUTHENTIC_VOICE.md` — 편집 철학

## 작업 (One-shot — 재작업 루프 금지)
1. 블로그에서 **질문 1개** + **발견 1개(배수만)** 를 먼저 2줄로 고정. 이 두 줄이 6블록의 유일한 메시지.
2. 발견 숫자는 **배수·倍率 1개만**. 금액·%·CAGR 본문 금지.
3. 6건 초안 작성 (X-EN/KO, LinkedIn-EN/KO, Threads-EN/KO).
4. **플랫폼별 HARD (검증기가 차단함):**
   - **X**: opening = 질문형 (`?` / `까요`). 평서문 금지. Joseph's Note 생략. KO 면책 = plain `정보 제공 목적.` (이탤릭 금지)
   - **LinkedIn**: EN 면책 = `For informational purposes only and does not constitute investment advice.` / KO는 Voice KO 면책. bullets 앞 `Key takeaways`·`이번 제도를 검토하면서 확인한 핵심` 금지. 발견 배수 반복(3회+) 금지
   - **Threads**: **Joseph's Note** (GSF Note 금지). 짧은 면책만 (LinkedIn 긴 면책 금지)
5. URL·UTM: KO=`/ko/posts/`, EN=무접두, `utm_source`=플랫폼명, `utm_campaign=blog-broadcast`
6. `sns-drafts/YYYY-MM-DD-<slug>.md` 저장.
7. `pnpm validate:sns-draft --slug <slug>` → **exit 0**. 실패 시 스스로 수정 후 재실행. **exit 0 전 Joseph에게 제출 금지.**

## 출력 형식 (채팅)

SNS 초안: <KO 제목> [Ep.NN]

[언어 선택 근거]
* X-JA 제외 — …
* LinkedIn-KO 포함 — …
* Threads-JA / LinkedIn-JA 보류 — …

X (Twitter)
🇺🇸 EN
<본문>
📋 [X-EN 복사용]
<동일>

🇰🇷 KO
<본문>
📋 [X-KO 복사용]
<동일>

LinkedIn
🇺🇸 EN
…
📋 [LinkedIn-EN 복사용]
…

🇰🇷 KO
…
📋 [LinkedIn-KO 복사용]
…

Threads
🇺🇸 EN
…
📋 [Threads-EN 복사용]
…

🇰🇷 KO
…
📋 [Threads-KO 복사용]
…

## 금지
- 블로그 직역 · 홍보 요약 · 플랫폼별 다른 핵심 메시지
- `src/` 수정
- validate 통과 전 Joseph 승인 요청

검증 통과 후에만 Joseph에게 승인 요청할 것.
```

---

## Ep.10 예시 (slug만 채움)

```markdown
# Task: SNS 초안 생성 (GSF-Ark SNS Voice v1.0)

slug: tokyo-kokubunji-kunitachi-fuchu-tachikawa
제목 (KO): 도쿄 어디에 살 것인가 [Ep.10] 다마 교육·문화 벨트
카테고리: investment

(위 Task 블록 전체 규칙 적용. validate:sns-draft exit 0 필수.)
```

---

## AG 상시 규칙 (GEMINI.md / AGENTS.md 요약용)

상시 규칙 전문은 [`GSF_ARK_SNS_VOICE_V1.md`](./GSF_ARK_SNS_VOICE_V1.md)를 SSOT로 한다.  
AGENTS.md에는 링크 한 줄만 유지한다.

```markdown
## SNS 초안 (Voice v1.0)
- SSOT: docs/GSF_ARK_SNS_VOICE_V1.md
- Task 프롬프트: docs/AG_SNS_DRAFT_PROMPT.md
- 게시 전: pnpm validate:sns-draft --slug <slug> (exit 0)
```
