# AG 작업 지시문 — Buttondown RSS-to-Email (Draft 자동화)

> **발행:** Cursor · 2026-06-30  
> **프로젝트:** GSF-Ark (asiaunion/GSF-Blog)  
> **Joseph 승인:** RSS → Draft 자동 생성 (즉시 발송 금지) · **Weekly cadence**  
> **범위:** RSS Draft만 (Welcome 시퀀스 확장 **제외**)  
> **Cursor 검증:** 본 작업은 Buttondown 대시보드 설정만 — repo 코드 변경 없음 (`Cursor 검증 생략` 해당)

---

## 0. 목표 (1줄)

블로그 EN RSS에 **그 주 새 글이 있을 때만** Buttondown이 **주 1회 Draft**를 자동 생성하도록 설정한다. Joseph가 제목·서두만 다듬은 뒤 수동 Send.

---

## 1. 배경 · 현재 상태

| 항목 | 상태 |
|------|------|
| 플랫폼 | Buttondown (`username: gsf`) |
| 발신 도메인 | `contact@mail.gsfark.com` — DNS 4건 Present ✅ (2026-06-30 Joseph 확인) |
| Welcome 자동화 | 동작 중 (구독 확인 → 시퀀스) |
| 구독 폼 | `src/components/NewsletterForm.astro` → `buttondown.com/api/emails/embed-subscribe/gsf` |
| 수익 모델 | AdSense (유료 뉴스레터 없음) |
| 구독자 | ~1명 (초기) |

**하지 않을 것**
- Beehiiv 이전
- RSS 즉시 자동 발송 (YMYL·에디토리얼 검수 우회)
- repo 코드 변경 (이번 작업 범위 외)

---

## 2. AG 작업 범위

### Phase A — RSS-to-Email 설정 (필수)

1. Buttondown 로그인 → **Settings → Basic → RSS-to-email** (또는 Connect RSS feed)
2. 아래 값으로 설정:

| 설정 | 값 |
|------|-----|
| **RSS feed URL** | `https://gsfark.com/rss.xml` |
| **Cadence** | **Weekly** — 토요일 오전 JST (Newsletter timezone `Asia/Tokyo` 확인 후 `saturday` + `9` 권장) |
| **Cadence 조건** | 해당 주 RSS에 신규 item 있을 때만 트리거 (Buttondown 기본 동작) |
| **Behavior** | **Create a draft** (자동 발송 아님) |
| **Canonical URL** | 기본값 유지 (아카이브 canonical → 블로그 URL, SEO 중복 방지) |

> **Cadence 결정 근거 (Joseph 2026-06-30):** `every`는 Draft가 글마다 쌓여 검수 부담 증가. SNS pilot cadence(주 1–2건)와 맞춰 **주 1회**로 설정. 구독자에게 실제 발송 빈도는 Joseph Send 시점에 따름.

3. **이메일 템플릿** (Django template) — 아래 초안 적용 후 저장:

```django
<p>Hi,</p>

<p>A new post is live on GSF Ark:</p>

<h2>{{ item.title }}</h2>

<p>{{ item.description }}</p>

<p><a href="{{ item.url }}">Read on the blog →</a></p>

<p>— Joseph<br>GSF Ark · Tokyo real estate & J-REIT</p>
```

> 전체 본문 자동 삽입(`{{ item.content }}`)은 **사용하지 말 것** — 블로그 HTML이 이메일에 그대로 들어가 가독성·YMYL 리스크.

4. **RSS 피드 검증**
   - `curl -sI https://gsfark.com/rss.xml` → HTTP 200
   - 최상단 item이 Ep.10 EN (`tokyo-kokubunji-kunitachi-fuchu-tachikawa`)인지 확인

5. **기존 글 일괄 Draft 방지**
   - RSS 연결 직후 과거 40+ 편이 한꺼번에 Draft 되지 않도록:
     - Buttondown에 “ignore existing items” / “only new items” 옵션이 있으면 **활성화**
     - 없으면: 연결 직후 Draft 폭주 여부 확인 → 발생 시 RSS 일시 pause 후 Joseph 보고

### ~~Phase B — Welcome 시퀀스~~ **OUT OF SCOPE**

Joseph 지시 (2026-06-30): Welcome 확장·점검 **하지 않음**. 기존 Automation 유지.

### Phase B — E2E 스모크 테스트 (필수)

**방법 A (권장 · 무해):** Buttondown RSS 설정 화면에서 “Test” / 수동 feed fetch가 있으면 실행 → Draft 1건 생성 확인.

**방법 B (Joseph 승인 시만):** 테스트용 짧은 EN 포스트 `draft: true` 배포 없이, Buttondown Emails에서 **수동 Draft** 1건 생성해 발신 도메인·템플릿 톤 확인.

**검증 체크리스트**
- [ ] Emails 탭에 RSS 유래 Draft 표시
- [ ] From: `Joseph KIM <contact@mail.gsfark.com>` (또는 설정한 표시명)
- [ ] 본문에 블로그 링크·description 포함, 전체 HTML 미포함
- [ ] **Send 버튼 누르지 않음** (Joseph 수동 발송 정책)

---

## 3. RSS 피드 SSOT (코드 근거)

- 파일: `src/pages/[...locale]/rss.xml.ts`
- EN (기본): `https://gsfark.com/rss.xml`
- KO: `https://gsfark.com/ko/rss.xml`
- JA: `https://gsfark.com/ja/rss.xml`

**뉴스레터는 EN만.** KO/JA RSS 연결 금지.

---

## 4. 운영 워크플로 (Joseph · AG 공유)

```
Ep 배포 (보통 금요일 · draft:false → Vercel)
    ↓
해당 주 토요일 오전 JST — Buttondown weekly RSS 체크
    ↓ (신규 item 있을 때만)
Draft 1건 자동 생성
    ↓
Joseph: 토·일 중 제목·서두 편집 → Send (다음 주로 미뤄도 됨)
    ↓ (병행)
SNS 파이프라인 (social-broadcast) — 기존과 동일
```

- **Ep.11부터** 적용. Ep.10은 이미 발행됨 — 소급 Draft 생성되면 삭제 또는 보관만 (발송 금지).
- RSS Draft와 SNS 초안은 **별도 채널** — SNS Voice v1.0 규칙은 `docs/GSF_ARK_SNS_VOICE_V1.md` SSOT.

---

## 5. 완료 보고 (HARD — AGENTS.md 3단계)

### `_handoff.md` append 예시

```markdown
## [YYYY-MM-DD HH:MM] AG 작업 완료 — Buttondown RSS Draft 자동화
- 작업: RSS-to-email Draft 설정 (EN feed only)
- RSS URL: https://gsfark.com/rss.xml
- Cadence: weekly (Saturday AM JST)
- Behavior: draft (not auto-send)
- 발신: contact@mail.gsfark.com 확인
- 스모크: Draft 생성 여부 (있음/없음/테스트 방법)
- repo 변경: 없음
- 다음: Ep.11 배포 후 Joseph Draft 검수 → Send
```

### `hub:log`

```bash
cd ~/.gemini/antigravity/scratch/projects/GSF-Hub
npm run hub:log -- --author=AG --project=GSF-Ark \
  --line="Buttondown RSS-to-email Draft 자동화 설정 완료" \
  --line="feed: https://gsfark.com/rss.xml · cadence: weekly Sat AM JST · behavior: draft" \
  --line="refs: docs/BRIEF_buttondown-rss-draft-automation-20260630.md · _handoff.md"
```

### GSF-OS push

```bash
cd ~/.gemini/antigravity/scratch/projects/GSF-OS
git add ACTIVITY_LOG.md && git commit -m "docs(activity-log): GSF-Ark Buttondown RSS draft automation" && git push origin main
```

---

## 6. 리스크 · 에스컬레이션

| 상황 | AG 동작 |
|------|---------|
| RSS 연결 시 과거 글 10건+ Draft 폭주 | RSS pause → Joseph 보고 |
| Buttondown UI에 Draft 옵션 없음 | 스크린샷 + docs.buttondown.com/rss-to-email 링크와 함께 Joseph 보고 |
| `contact@mail.gsfark.com` 발신 실패 | Sending domain 재검증 (Check records) → _handoff 기록 |
| 코드 변경 필요 (예: RSS 필터) | **구현하지 말고** Cursor brief 요청 |

---

## 7. 참고 링크

- Buttondown RSS docs: https://docs.buttondown.com/rss-to-email
- Buttondown sending domain: https://docs.buttondown.com/sending-from-a-custom-domain
- GSF-Ark repo: `scratch/projects/GSF-Ark` (remote: asiaunion/GSF-Blog)

---

**AG 시작 트리거 (Joseph):** `Buttondown RSS Draft 설정 시작` 또는 본 brief 파일 경로 지목
