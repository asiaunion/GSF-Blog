# AG 작업 지시서 — `contact@gsfark.com` 도메인 메일 설정

**작성:** Cursor · **일자:** 2026-06-25 (Zoho 우선 전략으로 개정)  
**대상:** AG (Antigravity) + 사용자(Joseph KIM) 공동 작업  
**목표:** 사이트에 공개된 `contact@gsfark.com`이 **실제로 수신·발신**되도록 한다.

> **전략 결정 (Cursor 권장)**  
> - **1순위: Zoho Mail 무료** — 솔로 블로그 `contact@` 1개에 최적, AdSense 요건 충족  
> - **임시: Gmail 포워딩** — 당일 수신만 급할 때 (답장 주소 주의)  
> - **나중에: Google Workspace** — 유료 업그레이드 (필수 아님)

**이전 파일명:** `AG_GOOGLE_WORKSPACE_GSFARK_CONTACT_20260625.md` (Workspace 단독 가정 → 본 문서로 대체)

---

## 1. 배경

| 항목 | 상태 |
|------|------|
| 사이트 공개 이메일 | `contact@gsfark.com` (Contact / Privacy / ToS / Author / Footer) |
| 코드 변경 | **완료** — `contact@gsfark.com` 반영·배포됨 |
| 현재 MX | `10 mail.gsfark.com` |
| `mail.gsfark.com` A 레코드 | **NXDOMAIN** → **현재 수신 불가** |
| SPF / DKIM / DMARC | **미설정** |
| GSC 색인 요청 | 사용자 완료 |

**결론:** 웹 작업은 끝. **DNS + 메일박스(Zoho 권장)** 만 설정하면 AdSense 신청 재개 가능.

---

## 2. 옵션 비교 (AG가 사용자에게 설명할 요약)

| 옵션 | 비용 | 수신 | `contact@` 발신 | AdSense | 추천 |
|------|------|------|-----------------|---------|------|
| **B. Zoho Mail 무료** | 무료 | ✅ | ✅ | 충분 | **★ 채택** |
| C. Gmail 포워딩 | 무료 | ✅ | ⚠️ Gmail로 답장될 수 있음 | 수신만 되면 통과 가능 | 임시용 |
| A. Google Workspace | ~$6/월 | ✅ | ✅ | 최상 | 나중에 업그레이드 |

---

## 3. AG 역할 / 사용자 역할

| 단계 | AG | 사용자 (Joseph) |
|------|----|-----------------|
| Zoho 가입·도메인 추가 | 절차 안내 | Zoho 계정 생성 |
| DNS (TXT/MX/SPF/DKIM) | onlydomains에 넣을 값 정리 | onlydomains DNS 패널 입력 |
| `contact@` 메일박스 생성 | Zoho Mail Admin 안내 | 비밀번호 설정·로그인 |
| 수신·발신 테스트 | 테스트 절차 안내 | 외부 Gmail ↔ contact@ 테스트 |
| 완료 보고 | `_handoff.md` append | — |

**AG가 하지 말 것**
- GSF-Blog repo 코드 수정 (이메일 주소는 이미 `contact@gsfark.com`)
- `git commit` / Vercel deploy

---

## 4. 사전 정보

- **도메인:** `gsfark.com`
- **DNS:** onlydomains.com
- **운영자:** Joseph KIM (GSF Blog / GSF)
- **필수 메일박스:** `contact@gsfark.com`
- **Zoho 무료 한도:** 1도메인, 최대 5사용자, 사용자당 5GB

---

## 5. 작업 순서 — Zoho Mail 무료 (권장)

### Step 1 — Zoho Mail 가입

1. https://www.zoho.com/mail/zohomail-pricing.html → **Mail Lite Forever Free** (또는 Free plan)
2. **Add your existing domain** → `gsfark.com`
3. 조직/관리자 계정 생성 (개인 Gmail로 가입 가능)

### Step 2 — 도메인 소유권 확인 (TXT)

Zoho Admin이 제공하는 **TXT 레코드**를 onlydomains에 추가:

```
Type: TXT
Host: @  (또는 gsfark.com)
Value: (Zoho가 제공한 zoho-verification=... 값)
TTL: 3600
```

전파 후 Zoho Admin에서 **Verify** 클릭.

### Step 3 — MX 레코드 교체 (핵심)

**기존 레코드 삭제:**
```
MX  10  mail.gsfark.com   ← 반드시 삭제
```

**Zoho MX 추가:**

| Priority | Mail server |
|----------|-------------|
| 10 | mx.zoho.com |
| 20 | mx2.zoho.com |

> `mail.gsfark.com` A 레코드는 **만들지 않음**. Zoho MX만으로 수신.

### Step 4 — `contact@gsfark.com` 사용자 생성

1. Zoho Mail Admin → **Users → Add User**
2. Email: `contact@gsfark.com`
3. 비밀번호 설정 → Joseph 전달
4. https://mail.zoho.com 에서 로그인 확인
5. (선택) Zoho Mail 모바일 앱 설치

### Step 5 — SPF / DKIM / DMARC

**SPF (TXT @ gsfark.com):**
```
v=spf1 include:zoho.com ~all
```

**DKIM:** Zoho Admin → Email Configuration → DKIM  
→ 제공된 TXT/CNAME 레코드를 onlydomains에 추가

**DMARC (권장, TXT `_dmarc.gsfark.com`):**
```
v=DMARC1; p=none; rua=mailto:contact@gsfark.com
```

### Step 6 — 수신·발신 테스트 (필수)

1. **외부 Gmail** → `contact@gsfark.com` 제목 `[TEST] GSF contact inbound`
2. 5분 내 Zoho 수신함 확인
3. **회신 테스트:** contact@ → 외부 Gmail, **발신 주소가 contact@gsfark.com** 인지 확인
4. 실패 시: `dig MX gsfark.com`, 반송 메일 캡처

**확인 도구:** https://mxtoolbox.com/SuperTool.aspx?action=mx%3agsfark.com

---

## 6. 임시 방안 — Gmail 포워딩 (급할 때만)

Zoho 설정 전 **당일 수신만** 필요하면 onlydomains 포워딩(또는 등록업체 Email Forwarding) 사용:

```
contact@gsfark.com  →  (개인 Gmail 주소)
```

**주의**
- 답장이 Gmail 주소로 나가면 AdSense·독자 신뢰도 하락
- **임시용** — Zoho 완료 후 포워딩 제거
- MX를 포워딩과 Zoho에 **동시에** 두지 말 것

---

## 7. 나중에 — Google Workspace 업그레이드 (선택)

다음 경우에만 검토:
- `@gsfark.com` 계정 다수 필요
- Gmail/Calendar/Drive 통합 운영
- 월 ~$6 비용 부담 없음

업그레이드 시: Zoho MX 제거 → Google MX 5개 적용, SPF를 `include:_spf.google.com`으로 변경.  
상세 MX 목록은 [Google Workspace 도움말](https://support.google.com/a/answer/140034) 참고.

---

## 8. 완료 기준 (Definition of Done)

- [ ] `dig MX gsfark.com` → `mx.zoho.com`, `mx2.zoho.com` 만 응답
- [ ] `mail.gsfark.com` MX **없음**
- [ ] SPF TXT (`include:zoho.com`)
- [ ] DKIM Zoho Admin **Verified**
- [ ] 외부 → `contact@gsfark.com` **수신 성공**
- [ ] `contact@gsfark.com` → 외부 **발신·수신 성공** (From 주소 확인)
- [ ] Joseph 수신함 접속 방법 숙지 (mail.zoho.com / 앱)

---

## 9. AG 완료 보고 형식

`scratch/projects/GSF-Ark/_handoff.md`에 append:

```markdown
## [AG→Cursor] Zoho Mail contact@gsfark.com — YYYY-MM-DD

- Provider: Zoho Mail Free
- MX: mx.zoho.com / mx2.zoho.com 적용·전파 확인
- User: contact@gsfark.com 생성 완료
- SPF/DKIM/DMARC: (완료 항목)
- Inbound test: 외부 Gmail → contact@ 성공 (시각)
- Outbound test: contact@ → 외부 Gmail, From=contact@ 확인 (시각)
- 임시 포워딩: (사용했다면 제거 여부)
- 남은 이슈:
```

---

## 10. AG 복사용 시작 프롬프트

```markdown
# [GSF-Ark] Zoho Mail — contact@gsfark.com 설정

지시서: docs/AG_DOMAIN_EMAIL_GSFARK_CONTACT_20260625.md

현재 문제: MX가 NXDOMAIN인 mail.gsfark.com 을 가리켜 메일 수신 불가.
목표: Zoho Mail 무료로 contact@gsfark.com 수신·발신 가능하게 설정.

사용자와 onlydomains DNS: 기존 MX 삭제 → Zoho MX, TXT(소유권·SPF), DKIM 추가.
코드 수정·배포 금지. Google Workspace는 이번 작업 범위 아님.

첫 답:
[GSF-Ark Zoho OK] + MX NXDOMAIN 문제 1줄 + Zoho 가입(Step 1) 안내 1줄
```

---

## 11. 사이트 측 완료 항목 (재작업 금지)

- Terms of Service (en/ko/ja) — 배포 완료
- Privacy Policy — `contact@gsfark.com`, 운영자 Joseph KIM (GSF Blog / GSF)
- Footer AdSense 고지
- 포스트 `modDatetime` 136건
- GSC 색인 요청 — 사용자 완료

---

## 12. 완료 기록 (2026-06-25) — Zoho Mail JP

| 항목 | 상태 |
|------|------|
| Provider | **Zoho Mail JP** (`mail.zoho.jp`, `mx.zoho.jp`) |
| Mailbox | `contact@gsfark.com` |
| Display name | Joseph KIM |
| MX / SPF / DKIM | ✅ DNS 확인됨 |
| Inbound / Outbound test | ✅ 사용자 완료 |
| **DMARC** | ⏳ onlydomains에 TXT 추가 필요 → [`EMAIL_DNS_DMARC_ONLYDOMAINS.md`](./EMAIL_DNS_DMARC_ONLYDOMAINS.md) |

검증: `node scripts/verify-domain-email-dns.mjs`

---

## 13. AG 복사용 — DMARC만 남은 경우

```markdown
# [GSF-Ark] DMARC TXT 추가 (onlydomains)

Zoho 수·발신 완료. DMARC만 추가:
- Host: _dmarc
- Type: TXT
- Value: v=DMARC1; p=none; rua=mailto:contact@gsfark.com; fo=1

가이드: docs/EMAIL_DNS_DMARC_ONLYDOMAINS.md
검증: node scripts/verify-domain-email-dns.mjs
```
