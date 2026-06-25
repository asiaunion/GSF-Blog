# AG 작업 지시서 — Google Workspace `contact@gsfark.com` 설정

**작성:** Cursor · **일자:** 2026-06-25  
**대상:** AG (Antigravity) + 사용자(Joseph KIM) 공동 작업  
**목표:** `gsfark.com` 도메인 메일을 Google Workspace로 운영하고, 사이트에 공개된 `contact@gsfark.com` 수신을 실제로 가능하게 한다.

---

## 1. 배경

| 항목 | 상태 |
|------|------|
| 사이트 공개 이메일 | `contact@gsfark.com` (Contact / Privacy / ToS / Author / Footer) |
| 코드 변경 | **완료** — Cursor가 `asiaunion@gmail.com` → `contact@gsfark.com` 반영·배포함 |
| 현재 MX | `10 mail.gsfark.com` |
| `mail.gsfark.com` A 레코드 | **NXDOMAIN** (호스트 없음) → **현재 수신 불가** |
| SPF / DKIM / DMARC | **미설정** |
| GSC 색인 요청 | 사용자 완료 (ToS·Contact 등) |

**결론:** 웹사이트 작업은 끝났고, **DNS + Google Workspace 설정만 남음**. 이 작업이 끝나기 전까지 AdSense 신청은 보류 권장.

---

## 2. AG 역할 / 사용자 역할

| 단계 | AG | 사용자 (Joseph) |
|------|----|-----------------|
| Workspace 가입·도메인 추가 | 안내·체크리스트 제공 | Google 계정으로 결제·소유권 확인 |
| DNS TXT (도메인 소유 확인) | onlydomains에 넣을 레코드 값 정리 | onlydomains DNS 패널에 입력 |
| MX 교체 | Google 표준 MX 목록 제공 | 기존 `mail.gsfark.com` MX **삭제** 후 Google MX 적용 |
| 사용자 생성 | `contact@` 생성 절차 안내 | Admin Console에서 메일박스 생성 |
| SPF/DKIM/DMARC | Admin Console에서 표시되는 값 정리 | DNS에 TXT/CNAME 추가 |
| 수신 테스트 | 외부→`contact@` 테스트 절차 안내 | Gmail 등에서 테스트 메일 발송·수신 확인 |
| 완료 보고 | `_handoff.md`에 결과 기록 | — |

**AG가 하지 말 것**
- GSF-Blog repo 코드 수정 (이메일 주소는 이미 `contact@gsfark.com`)
- `git commit` / Vercel deploy (사용자 또는 Cursor 요청 시만)

---

## 3. 사전 정보

- **도메인:** `gsfark.com`
- **DNS 관리:** onlydomains.com (`ns1.onlydomains.com` 등)
- **사이트 브랜드:** GSF Blog (공개명) / 도메인 gsfark.com
- **운영자:** Joseph KIM
- **필요 메일박스:** `contact@gsfark.com` (필수)  
  - 선택: `joseph@gsfark.com` (개인용, 나중에 추가 가능)

---

## 4. 작업 순서 (Google Workspace)

### Step 1 — Google Workspace 가입

1. https://workspace.google.com 접속
2. **Business Starter** (월 $6/user) 또는 무료 체험 14일로 시작
3. 도메인: `gsfark.com` 선택
4. 관리자 계정 생성 (예: `joseph@gsfark.com` 또는 기존 Gmail을 관리자로 연결)

### Step 2 — 도메인 소유권 확인 (TXT)

1. Admin Console → **Account → Domains → Manage domains**
2. Google이 제공하는 **TXT 레코드** 복사
3. onlydomains DNS에 추가:

```
Type: TXT
Host: @  (또는 gsfark.com)
Value: google-site-verification=...  (Google이 제공한 값)
TTL: 3600
```

4. 전파 대기 (최대 24–48시간, 보통 수십 분)
5. Admin Console에서 **Verify** 클릭

### Step 3 — MX 레코드 교체 (핵심)

**기존 레코드 삭제:**
```
MX  10  mail.gsfark.com   ← 삭제
```

**Google Workspace MX 추가 (우선순위 순):**

| Priority | Mail server |
|----------|-------------|
| 1 | ASPMX.L.GOOGLE.COM |
| 5 | ALT1.ASPMX.L.GOOGLE.COM |
| 5 | ALT2.ASPMX.L.GOOGLE.COM |
| 10 | ALT3.ASPMX.L.GOOGLE.COM |
| 10 | ALT4.ASPMX.L.GOOGLE.COM |

> `mail.gsfark.com` A 레코드는 **만들지 않아도 됨**. Google MX만 있으면 수신 가능.

### Step 4 — `contact@gsfark.com` 사용자 생성

1. Admin Console → **Directory → Users → Add new user**
2. First name: Contact (또는 Joseph) / Email: `contact@gsfark.com`
3. 초기 비밀번호 설정 → Joseph에게 전달
4. Gmail 앱 또는 https://mail.google.com 에서 `contact@gsfark.com` 로그인 확인

### Step 5 — SPF / DKIM / DMARC (발신 신뢰도 + 스팸 방지)

**SPF (TXT @ gsfark.com):**
```
v=spf1 include:_spf.google.com ~all
```

**DKIM:** Admin Console → Apps → Google Workspace → Gmail → Authenticate email  
→ 생성된 CNAME 레코드 3개를 onlydomains에 추가

**DMARC (권장, TXT `_dmarc.gsfark.com`):**
```
v=DMARC1; p=none; rua=mailto:contact@gsfark.com
```
(초기에는 `p=none`으로 모니터링, 안정 후 `quarantine` 검토)

### Step 6 — 수신 테스트 (필수)

1. **외부 Gmail**에서 `contact@gsfark.com` 으로 제목 `[TEST] GSF contact mail` 발송
2. 5분 내 `contact@gsfark.com` 수신함 확인
3. **회신 테스트:** contact에서 발신 → 외부 Gmail 수신 확인
4. 실패 시: MX 전파 확인 (`dig MX gsfark.com`), 반송 메일 에러 메시지 캡처

**온라인 확인 도구 (선택):**
- https://mxtoolbox.com/SuperTool.aspx?action=mx%3agsfark.com
- MX가 Google 서버로만 가리키는지 확인

---

## 5. 완료 기준 (Definition of Done)

- [ ] `dig MX gsfark.com` → Google MX 5개만 응답
- [ ] `mail.gsfark.com` MX **없음** (또는 A 레코드 미사용)
- [ ] SPF TXT 존재 (`include:_spf.google.com`)
- [ ] DKIM Admin Console **Authenticating** 상태
- [ ] `contact@gsfark.com` 외부 발신 메일 **수신 성공**
- [ ] `contact@gsfark.com` → 외부 **회신 성공**
- [ ] Joseph이 수신함 확인 방법 숙지 (Gmail 앱 / mail.google.com)

---

## 6. AG 완료 보고 형식

작업 종료 시 `scratch/projects/GSF-Ark/_handoff.md`에 append:

```markdown
## [AG→Cursor] Google Workspace contact@gsfark.com — YYYY-MM-DD

- MX: Google Workspace 적용 완료 / 전파 확인
- Users: contact@gsfark.com 생성 완료
- SPF/DKIM/DMARC: (완료 항목 나열)
- 수신 테스트: 외부 Gmail → contact@ 성공 (시각)
- 회신 테스트: contact@ → 외부 성공 (시각)
- 남은 이슈: (없음 또는 기술 부채)
```

Cursor에게: **코드 변경 불필요**. DNS·메일만 확인하면 AdSense 신청 재개 가능.

---

## 7. AG 복사용 시작 프롬프트

```markdown
# [GSF-Ark] Google Workspace — contact@gsfark.com 설정

지시서: docs/AG_GOOGLE_WORKSPACE_GSFARK_CONTACT_20260625.md

현재 문제: MX가 존재하지 않는 mail.gsfark.com 을 가리켜 메일 수신 불가.
목표: Google Workspace로 gsfark.com 메일 운영, contact@gsfark.com 수신 가능.

사용자와 함께 onlydomains DNS에서 MX 교체, TXT(소유권·SPF), DKIM CNAME 설정.
코드 수정·배포는 하지 말 것.

첫 답:
[GSF-Ark Workspace OK] + 현재 MX 문제 1줄 + Step 1(가입) 안내 1줄
```

---

## 8. 참고 — 사이트 측 이미 완료된 항목 (재작업 금지)

- Terms of Service `/terms-of-service/` (en/ko/ja) — 배포 완료
- Privacy Policy — `contact@gsfark.com`, 운영자 Joseph KIM 명시
- Footer AdSense 고지
- 포스트 `modDatetime` 136건 backfill
- GSC 색인 생성 요청 — 사용자 완료

---

## 9. 비용 참고

- Google Workspace Business Starter: 약 **$6/월/사용자** (contact@ 1개만이면 1 user)
- 14일 무료 체험 가능
- 연간 결제 시 할인
