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

## 작업
1. 블로그에서 **이번 글을 쓰게 만든 질문 1개**와 **가장 의미 있는 발견 1개**를 먼저 2줄로 정리할 것.
2. 발견 숫자는 **배수·倍率 1개만** (`validate-sns-draft` YMYL 통과). 금액·%·CAGR 본문 금지.
3. 아래 6건 초안 작성:
   - X-EN, X-KO
   - LinkedIn-EN, LinkedIn-KO
   - Threads-EN, Threads-KO
4. 질문 opening은 **이번 글 전용 표현** 사용 (직전 회차와 동일 문형 금지). 변형 풀은 Voice v1.0 참조.
5. `sns-drafts/YYYY-MM-DD-<slug>.md` 저장 (`sns-drafts/_TEMPLATE.md` 구조).
6. `pnpm validate:sns-draft --slug <slug>` 실행 → **exit 0** 확인. 실패 시 수정 후 재실행.

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
