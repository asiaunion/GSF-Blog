# AdSense 승인 Playbook — 2026-07 (Cursor 확정)

> **상태**: 🟢 Cursor 확정 (2026-07-17) — Joseph OK  
> **SSOT 결정**: `GSF-OS/STRATEGIC_DECISIONS.md` **D-001** (Cursor 2026-07-16/17 개정)  
> **SEO 운영 상세**: [`SEO_SPRINT_PROPOSAL_2026-07.md`](./SEO_SPRINT_PROPOSAL_2026-07.md)  
> **콘텐츠 SEO 주축·백필**: [`CONTENT_SEO_STRATEGY_2026-07.md`](./CONTENT_SEO_STRATEGY_2026-07.md) (Cursor §F.2)  
> **발행 프로세스·글쓰기**: [`CONTENT_PUBLISHING_PROCESS_2026-07.md`](./CONTENT_PUBLISHING_PROCESS_2026-07.md) · [`SEO_WRITING_GUIDE_2026-07.md`](./SEO_WRITING_GUIDE_2026-07.md) (§F.3)  
> **선행 감사**: [`../adsense_audit_report_2026-07-15.md`](../adsense_audit_report_2026-07-15.md)

---

## 1. 한 줄 원인

AdSense 보류의 핵은 **YMYL + 외부 이용 신호(트래픽) 부재**다.  
번역 품질 유죄가 아니며, 3언어 병렬 URL은 GSC 보조 요인이다. 니치(도쿄×한일×부동산·이주)는 유지 — 문제는 GTM(Google만 기다림).

---

## 2. 게이트 (재신청 HARD)

### 게이트 A — gsfark.com

모두 충족 시에만 재신청:

| # | 조건 |
|---|------|
| 1 | cool-off ≥ 4주 (기산: 2026-07-07 보류) |
| 2 | GA4: 네이버/티스토리 레퍼럴 **2주 연속** |
| 3 | GSC 28d: 노출 ≥200 **또는** 평균순위 ≤40 **또는** (순위 15pt+ 개선 + 노출 2×) |
| 4 | risky-claims 1건 + 리디렉션 오류 2건 해소 |
| 5 | JA **신규** 동결 유지 |

통과 직전 **1~2주**는 title 대량 변경 동결(심사 표면 안정).

### 게이트 B — tokyokorean.net (계정 선활성화 허용)

| # | 조건 |
|---|------|
| 1 | 발행 포스트 색인 **≥ 70%** |
| 2 | 발행 &lt;15편일 때만 절대 바닥 색인 포스트 ≥12 |
| 3 | 핵심 페이지(`/` about contact privacy) 색인 |
| 4 | 네이버/티스토리 또는 오가닉 **2주 연속** 유입 |
| 5 | ads.txt·메타·법적 페이지 준비 |
| 6 | Ark와 **동시 신규 신청 금지** |

**경합**: 먼저 통과한 쪽이 신청 → 승인 후 타 사이트를 같은 pub에 추가.

---

## 3. 언어 · 채널

| 항목 | 규칙 |
|------|------|
| JA | **신규 발행 동결**. 기존 JA title/H2는 조건부(백로그 + 같은 주 KO 선행 + 주≤1) |
| 신규 글 | **KO+EN만** — **hreflang 존재확인 방어 배포 후에만** |
| Soft sunset | 옵션 B (기본 off) — Week 4 재평가 |
| 채널 우선 | 네이버 → 티스토리 → 뉴스레터/SNS → Reddit(GEO 보조) |
| AdPost (D-003) | AdSense 계정 안정화 **후**. 지금 네이버는 **배포/백링크** |

SEO 노력 배분(승인 전 Phase A′): **KO 50 / JA 30(기존 URL 갱신만) / EN 20** — [`SEO_JA_CLUSTER_FOCUS.md`](./SEO_JA_CLUSTER_FOCUS.md).

---

## 4. Phase A′ 운영 (승인 전 4주+)

| 축 | 규칙 | refs |
|----|------|------|
| 시간 배분 | **콘텐츠 SEO 55 / 채널 30 / 기술·GSC 15** (부족 주 = 채널 우선) | CONTENT_SEO §F.2① |
| 비중 | **refresh 70% / 신규 30%** (주 2 refresh + 신규 ≤1) | TOPIC_POLICY Phase A′ |
| title/H2 | Week 0 GSC 부트스트랩 → 주 2편, 한 층만 변경 | SEO_SPRINT §3 |
| 백로그 | §4.2 10건 — **#4 = 구매절차 허브-상세** (j-reit는 Week4 여유) | SEO_SPRINT §4 + Cursor §F.1⑤ |
| 백필 | 전량 금지 · 코호트 ~20 · **대조군 D 보존** · 큐 #11–#20 | CONTENT_SEO 부록 C · §F.2 |
| 네이버 | **그 주 refresh = 그 주 네이버 배포** | SEO_SPRINT §5 |
| 내부링크 0 | 관광 제외 **7편** Week 1–2 별도 (코호트 D 제외) | SEO_SPRINT §12.2 |
| KPI | 게이트 A 숫자와 동일 — 완화 없음 | SEO_SPRINT §6 |

---

## 5. 기술 HARD · 수동 체크

| 우선 | 항목 | 담당 |
|------|------|------|
| 🔴 | hreflang: 콘텐츠 실재 locale만 출력 | Cursor/Agent |
| 🟡 | FAQPage JSON-LD — `src/utils/faqJsonLd.ts` + Layout `extraJsonLd` (refresh 시 H2 질문 연결) | Agent/운영 |
| 수동 | 네이버 서치어드바이저 등록 + 사이트맵 | Joseph |
| 수동 | Bing 웹마스터 + IndexNow | Joseph |
| 게이트 A | risky-claims KO + `/ja/mission`·`/tags/fx/` | AG/Cursor |

---

## 6. 금지

- 게이트 전 재신청 · Ark+TK 동시 신규 신청  
- 헤드 키워드 전용글 · 니치 전면 피벗 · JA hard 삭제  
- 「글 더 쓰기」만으로 승인 해법  
- ACTIVITY_LOG 장문 복붙 (요약 3~5줄 + refs)  
- hreflang 방어 전 KO+EN 전용 신규 발행  

---

## 7. 마일스톤

| 시점 | 액션 |
|------|------|
| ~8/12 | Week 4: 게이트 A/B 실측 · JA soft sunset 여부 |
| 승인 시 | `hub:close` 또는 `hub:log --milestone` **필수** |
| 승인 후 | Phase B (refresh 30%) 복귀 · D-003 AdPost 재검토 |

---

## 8. 관련 문서

- [`SEO_SPRINT_PROPOSAL_2026-07.md`](./SEO_SPRINT_PROPOSAL_2026-07.md)  
- [`AG_TASK_2026-07-17_adsense-phase-a-week1.md`](./AG_TASK_2026-07-17_adsense-phase-a-week1.md) — AG 실행 · Cursor 검증  
- [`EDITORIAL_TOPIC_POLICY.md`](./EDITORIAL_TOPIC_POLICY.md)  
- [`SEO_JA_CLUSTER_FOCUS.md`](./SEO_JA_CLUSTER_FOCUS.md)  
- `TokyoKorean/docs/NAVER_DAUM_BACKLINK_STRATEGY.md`  
- Cursor plan: `adsense_approval_strategy_1ca6a388.plan.md` §F  
