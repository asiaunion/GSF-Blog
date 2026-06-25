# gsfark.com — DMARC 추가 (onlydomains, 1분)

**상태 (2026-06-25):** Zoho Mail JP 수·발신 테스트 완료. **DMARC만 DNS에 추가하면** 메일 인증 설정 완료.

---

## onlydomains에 추가할 레코드

| 필드 | 값 |
|------|-----|
| **Type** | TXT |
| **Host / Name** | `_dmarc` |
| **Value** | `v=DMARC1; p=none; rua=mailto:contact@gsfark.com; fo=1` |
| **TTL** | 3600 (기본값) |

> `p=none` = 모니터링 모드 (신규 설정 권장). 2–4주 후 스팸 없으면 `p=quarantine` 검토.

### (선택) TLS 리포트

| Host | Type | Value |
|------|------|-------|
| `_smtp._tls` | TXT | `v=TLSRPTv1; rua=mailto:contact@gsfark.com` |

---

## 이미 완료된 항목 (재작업 불필요)

| 항목 | 상태 |
|------|------|
| MX | `mx.zoho.jp` / `mx2.zoho.jp` / `mx3.zoho.jp` |
| SPF | `v=spf1 include:zohomail.jp ~all` |
| DKIM | `zoho._domainkey.gsfark.com` |
| Zoho 사용자 | `contact@gsfark.com` |
| 표시 이름 | Joseph KIM |
| 수·발신 테스트 | 완료 |

---

## 추가 후 검증

```bash
node scripts/verify-domain-email-dns.mjs
```

또는:

```bash
dig +short TXT _dmarc.gsfark.com
```

`"v=DMARC1; ..."` 가 보이면 성공.

---

## AdSense 신청

DMARC 추가 후 **즉시 AdSense 신청 가능**. 메일 인증 4종(MX·SPF·DKIM·DMARC) 중 DMARC만 남은 상태.
