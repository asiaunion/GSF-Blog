# GSF-Ark 세션 마감 — Essay 3 · AdSense 준비 · Topic Hubs (2026-06-25)

> **작성:** Cursor · 세션 종료 스냅샷  
> **Repo:** `/Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark`  
> **라이브 HEAD:** `75a1930` (`main` → `origin/main` 동기화됨)  
> **사이트:** https://gsfark.com

---

## 1. 세션 목표 · 결과

| 목표 | 결과 |
|------|------|
| Essay 3 `why-i-chose-nihonbashi` AG 배포 확인 | ✅ `4ace7f7` · KO/EN/JA `draft: false` |
| Cursor E2E 라이브 검증 | ✅ EN/KO/JA URL 200 · OG·sitemap·hero PASS |
| AdSense 보완·재제출 일정 | ✅ Privacy 6/25 · ads.txt 정상 · **재제출 7/3 합의** |
| Topic Hubs 대표 글 큐레이션 | ✅ `75a1930` · EN/KO/JA `/topics/` 라이브 |
| SSOT 갱신 | ✅ WEEKLY_STATUS · `_handoff.md` · 본 문서 |

---

## 2. main 커밋 (이번 세션)

| 커밋 | 요약 |
|------|------|
| `75a1930` | Curate Topic Hubs with flagship posts per editorial axis |
| `fc1e83b` | Update Privacy Policy dates to June 25, 2026 |
| `bbd58dd` | docs: handoff + WEEKLY_STATUS (Essay 3 배포 기록) |
| `4ace7f7` | feat: Essay 3 publish — `draft: false` KO/EN/JA |

---

## 3. Topic Hubs 큐레이션 (`75a1930`)

| 허브 | 대표 글 (5편) |
|------|----------------|
| Urban investment | complete-guide · shinchiku-vs-chuko · REINS 4월 · J-REIT 5가지 · office vacancy |
| Macro & policy | *(변경 없음)* weak-yen · rate-hike · inheritance-tax · visa · corp-vs-personal |
| Tokyo life | nihonbashi-hamacho walk · **why-i-chose-nihonbashi** · ginza-marunouchi · korea-community · tsukiji-toyosu |
| Essays | warm-investing · buying-checklist · buying-surprises · failure-postmortem · seoul-tokyo corridor |

**라이브:** https://gsfark.com/topics/ · `/ko/topics/` · `/ja/topics/` (20 URL 확인)

---

## 4. AdSense · GSC 메모

| 항목 | 상태 |
|------|------|
| `ads.txt` | ✅ `https://gsfark.com/ads.txt` HTTP 200 · pub-ID 정상 |
| GSC URL 검사 (`ads.txt`) | ⚠️ 「미색인」+ 일시 오류 = **정상** (검색 색인 대상 아님) · AdSense 대시보드에서 확인 |
| Privacy Policy | ✅ Last Updated 2026-06-25 라이브 |
| GSC 색인 요청 (4 URL) | ToS·Privacy·contact·ads.txt — **즉시 요청 가능** (색인 필수 아님) |
| **재제출일** | **2026-07-03** (Joseph 합의) |

---

## 5. 라이브 URL (Essay 3)

| 언어 | URL | 상태 |
|------|-----|------|
| EN | https://gsfark.com/posts/why-i-chose-nihonbashi/ | 200 |
| KO | https://gsfark.com/ko/posts/why-i-chose-nihonbashi/ | 200 |
| JA | https://gsfark.com/ja/posts/why-i-chose-nihonbashi/ | 200 |

---

## 6. 다음 액션 (Joseph)

1. ~~**6/26 10:00 JST** — 홈·포스트 목록에 Essay 3 노출 확인~~ ✅ 6/26
2. ~~**GSC** — Essay 3 EN/KO/JA 3 URL 색인 요청~~ ✅ 6/26
3. **7/3** — GSFArk AdSense 재제출
4. **(선택)** onlydomains DMARC TXT 추가 → `node scripts/verify-domain-email-dns.mjs` 전체 통과

---

## 7. 관련 SSOT

| 문서 | 용도 |
|------|------|
| `WEEKLY_STATUS.md` | HUB 현황 · 작업 로그 |
| `_handoff.md` | AG/Cursor 배포 기록 |
| `docs/GSC_INDEXING_REQUEST_QUEUE_20260621.md` | Essay 2·3 GSC 큐 (7/4~9) |
| `src/data/topicHubs.ts` | Topic Hubs slug SSOT |
