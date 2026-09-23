# AdSense 승인 Playbook — 2026-07 (Cursor 확정)

> **상태**: 🟢 Cursor 확정 (2026-07-17) — Joseph OK · **v2.3** (2026-08-04 외부 재검증 · Astro 헬스) · HARD/FLEX=PROCESS §0.1  
> **SSOT 결정**: `GSF-OS/STRATEGIC_DECISIONS.md` **D-001** (Cursor 2026-07-16/17 · v2.2 → **v2.3 운영 잠금**)  
> **SEO 운영 상세**: [`SEO_SPRINT_PROPOSAL_2026-07.md`](./SEO_SPRINT_PROPOSAL_2026-07.md)  
> **콘텐츠 SEO 주축·백필**: [`CONTENT_SEO_STRATEGY_2026-07.md`](./CONTENT_SEO_STRATEGY_2026-07.md) (Cursor §F.2)  
> **발행 프로세스·글쓰기**: [`CONTENT_PUBLISHING_PROCESS_2026-07.md`](./CONTENT_PUBLISHING_PROCESS_2026-07.md) (**§0.1 HARD/FLEX**) · [`SEO_WRITING_GUIDE_2026-07.md`](./SEO_WRITING_GUIDE_2026-07.md) (§F.3–§F.4)  
> **외부 검증 게이트**: [`GSF_EXTERNAL_VERIFICATION_POLICY.md`](./GSF_EXTERNAL_VERIFICATION_POLICY.md) · GSF-OS **D-004**  
> **축적 루프 게이트**: [`GSF_COMPOUNDING_LOOP_POLICY.md`](./GSF_COMPOUNDING_LOOP_POLICY.md) · GSF-OS **D-005** · §F.5  
> **선행 감사 (스냅샷 — 상태 근거 금지)**: [`archive/adsense_audit_report_2026-07-15.md`](./archive/adsense_audit_report_2026-07-15.md)  
> **TK 런북**: `../TokyoKorean/docs/ADSENSE_8_3_RUNBOOK.md` Phase 4

---

## 1. 한 줄 원인

AdSense 보류/반려의 핵은 **「실재하는 출판물」로 아직 증명되지 않음**(미검증 가치)이다.  
공식 정책은 최소 트래픽·도메인 연령을 요구하지 않으나, 심사 실무(2026)는 **원본·깊이 있는 글 + 신뢰 페이지 + 꾸준한 발행 이력 + (가능하면) GSC 노출**을 한 묶음으로 본다.  
번역/Astro 스택 유죄가 아니다. Ark는 추가로 **YMYL(부동산·세무)** 가중. 니치 유지 — GTM만 기다리는 것도 오답, **표면만 고치는 것도 오답**.

---

## 1b. Astro 기술 헬스 (2026-08-04 라이브 스모크) — 승인 블로커 **아님**

Astro 정적 사이트는 AdSense와 **호환**. 프레임워크 교체·대규모 테마 개편 **불필요**.

| 항목 | tokyokorean.net | gsfark.com | 판정 |
|------|-----------------|------------|------|
| `ads.txt` | 200 · `text/plain` · redirect **0** · `pub-4729433282370174` | 동일 | ✅ |
| `google-adsense-account` + `adsbygoogle.js` | head 상시 로드(동의 게이트 없음) | 동일 | ✅ 심사봇 가시성 |
| 신뢰 페이지 footer | about · contact · privacy · terms | about · contact · privacy · terms (+ mission/author) | ✅ |
| Privacy에 AdSense/쿠키/제3자 | 명시 | 명시 | ✅ |
| thin listing | `/tags/` `/archives/` robots Disallow | thin 유틸 분리 | ✅ (thin archive = low-value 흔한 원인) |
| Cookie banner | 커스텀 · 초기 `display:none` · 본문/스크립트 비차단 | 동일 | ✅ 승인용 · ⚠️ 승인 후 EEA는 Google CMP 권장 |
| HTTPS / sitemap | Vercel | Vercel | ✅ |

**Astro 실무 주의 (승인 후·유지보수):** `public/ads.txt`만 사용(라우트 충돌 금지) · ads.txt 리다이렉트 체인 금지 · CSP가 있으면 `pagead2`/`doubleclick` frame 허용 · 미리보기 도메인에는 라이브 광고 안 뜸(정상).

**코드 위생(비블로커):** Ark Layout에서 `adsbygoogle.js`가 이중 삽입된 흔적 — 승인 무관 · 여유 시 단일화.

---
## 1c. 플랫폼 신화 검증 (WP / Blogger vs Astro) — 2026-08-04

**질문:** WordPress·Blogspot이 Astro/커스텀보다 승인률이 높은가?

**결론:** **공개된 신뢰할 수 있는 승인률 통계는 없음.** 실사례를 교차하면 「플랫폼이 승인한다」보다 **콘텐츠·신뢰 신호·기술 실수 방지**가 결정적. **Astro→WP/Blogger 이주를 승인 해법으로 채택하지 않음.**

| 구분 | 관찰 | 출처 성격 |
|------|------|-----------|
| 「WP 승인률 ~70–85%」류 | 표본·방법 미공개 마케팅 수치 | Tier 3 불인정(단일 블로그) |
| Blogger | Google 소유 · Earnings 연동으로 **세팅 실수↓** · `.blogspot.com`은 커스텀 도메인보다 불리 보고 다수 | 실무 합의 + Google Blogger Help |
| WordPress | Site Kit가 ads.txt·코드 삽입을 단순화 → **초보 기술 탈락↓** (심사 우대 아님) | Google Site Kit / AdSense Help |
| 한국 후기 | 티스토리 2회 승인 경험자가 WP에서 **10회 반려·4개월**(~30편) — 「WP가 티스토리보다 쉽다」는 통념과 **반대** | [ddilong 후기](https://ddilong.tistory.com/entry/%EC%9B%8C%EB%93%9C%ED%94%84%EB%A0%88%EC%8A%A4-%EC%95%A0%EB%93%9C%EC%84%BC%EC%8A%A4-%EC%8A%B9%EC%9D%B8-%ED%9B%84%EA%B8%B0-%EB%88%88%EB%AC%BC%EA%B2%A8%EC%9B%A0%EB%8D%98-4%EA%B0%9C%EC%9B%94) |
| 동시 신청 사례 | WP+티스토리×2 동시 → **전부 1차 반려** 후 콘텐츠/정책 수정으로 동일 시기 통과 — 플랫폼이 승패를 가르지 않음 | [reviewbogi](https://reviewbogi.tistory.com/entry/%EC%95%A0%EB%93%9C%EC%84%BC%EC%8A%A4-%EC%8A%B9%EC%9D%B8-%EC%8B%A0%EC%B2%AD-%EA%B2%B0%EA%B3%BC-feat-ChatGPT) |
| 정적 이전 | WP 승인 이력 → Jekyll 이전 후 장기 반려(중복·sitemap 404 등 **이전 부작용** 혼재) | [McGarrah](https://mcgarrah.org/adsense-approval-failure-remediation/) |
| Astro 가이드 | 「정적 블로그는 심사에서 **특수 이점 없음** — 콘텐츠가 한다」 | intzzzero Astro+AdSense |

**왜 「WP/블로거가 잘 된다」고 느껴지는가 (선택 편향):**
1. 초보·부업 블로그 대부분이 WP/Blogger/티스토리 → 성공 후기 절대량↑  
2. Site Kit·Blogger 내장 연동이 **ads.txt/코드 누락**을 줄임 (기술 PASS율↑ ≠ 콘텐츠 우대)  
3. `.blogspot.com` vs **커스텀 도메인** 혼동 — 도메인 효과가 플랫폼 효과로 오인됨  

**GSF 함의:** TK·Ark는 이미 커스텀 도메인+Astro 헬스 PASS. 이주 비용 대비 승인 기대값 상승 **입증 안 됨**. 계속 레버 = 연령·노출·30편·crawl 대기(§1b·Gate B v2.3).

---

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

**Joseph 보류 (2026-07-21 · 2026-08-04 갱신):** gsfark.com AdSense **재신청 보류** — Gate A 레퍼럴/GSC 시계는 유지하되 **신청 UI는 누르지 않음**. cool-off ≥4주(기산 7/7)는 **2026-08-04 충족**이나, 레퍼럴/GSC 미실측·TK 슬롯만으로 Ark를 넣지 않음. 재개 = Joseph 명시 해제 **+ Gate A 실측** 후. **TK:** 7/28 신청 → **8/4 반려** · 재창 ≥**2026-09-15**.

### 게이트 B — tokyokorean.net (계정 선활성화 허용)

| # | 조건 |
|---|------|
| 1 | 발행 포스트 색인 **≥ 70%** |
| 2 | 발행 &lt;15편일 때만 절대 바닥 색인 포스트 ≥12 |
| 3 | 핵심 페이지(`/` about contact privacy) 색인 |
| 4 | 네이버/티스토리 또는 오가닉 **2주 연속** 유입 |
| 5 | ads.txt·메타·법적 페이지 준비 |
| 6 | Ark와 **동시 신규 신청 금지** |

**상태 (2026-08-04):** 7/28 조기 신청 → **반려**. 기술·색인 PASS · 진단=**미검증 가치**(도메인 연령·오가닉). 상세: TokyoKorean `docs/ADSENSE_8_3_RUNBOOK.md` Phase 3–4.

**재신청 운영 HARD (2026-08-04 · v2.3 보강):** ≥**2026-09-15** = max(콜오프 4주 기산 8/4→9/1, 도메인 등록 6/15→3개월 9/15). 그 시점 Gate B 재실측. **B-4 엄격 적용**(8/3「미달도 GO」면제 폐기). 즉시 재제출 ❌.

**v2.3 추가 운영 조건 (신청 직전 · 팀 안전장치):**

| # | 조건 | 근거 |
|---|------|------|
| B-7 | 발행 포스트 **≥30** (실질 본문 · 러시 덤프 금지) | 실무 벤치마크 20–30 · 꾸준한 이력 > 일괄 업로드 |
| B-8 | GSC **노출(impressions) 연속** — 클릭 0이어도 노출 추세 확인 | 「검색에 존재하는 사이트」신호 · 클릭만 고집하지 말 것 |
| B-9 | 마지막 **표면/콘텐츠 대량 변경 후 7–14일** crawl 대기 후 신청 | 심사봇이 구버전을 보지 않도록 |
| B-10 | (권장) AdSense **Privacy & messaging** Google CMP 활성화 | 승인 후 EEA·TCF v2.3 · 커스텀 배너만으로는 certified CMP 아님 |

**운영 레버:** 신규 20→30+ **꾸준히** · GSC 노출·무클릭 → title/메타 · 네이버=다각화(승인 주축≠네이버).

**B-4 해석 (이력):** 2026-07-21 잠금으로 8/3 레퍼럴 미달도 기본 GO → 조기 제출·반려로 **승인 보장 아님** 검증됨. 이후 재신청부터는 팀 안전장치로 **다시 엄격**.

**경합**: 먼저 통과한 쪽이 신청 → 승인 후 타 사이트를 같은 pub에 추가.

### 투입 배분 (승인 전 · 2026-07-20)

| 축 | 비중 | 내용 |
|----|------|------|
| Plan A 분자 | ~70% | Ark 네이버 게시·레퍼럴 시계 · Gate A 잔여 |
| Plan B 저비용 | ~15% | TK 색인 실측 → 재요청 · TK 네이버 시계 기산 |
| 문서·표면 정리 | ~15% | 판정 문구·aiModel 등 (대량 표면 변경 아님) |

### Week 4 사전 등록 트리거 (~8/12 · Plan B 비중)

아래 **둘 다** 충족 시에만 B 비중 상향을 **자동 안건**으로 올린다. 미충족 시 **70/15/15 유지 · 재론 없음**.

1. Gate A의 GSC 조건(노출 ≥200 **또는** 평균순위 ≤40 **또는** 순위+15pt·노출 2×) **미충족**
2. TK 발행 포스트 색인 **≥70%** 확인

**해제되지 않는 HARD**: Ark+TK 동시 신규 신청 금지. 트리거가 열려도 Ark 네이버 분자(Gate A-2)를 끄지 않음.  
계정 승인 후 gsfark 추가는 **별도 사이트 심사** — 게이트 A 면제 아님.

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
| 비중 | **refresh > 신규** 방향 (편수 FLEX — “주 2”는 예시 아님·상한 아님) | PROCESS §0.1 · TOPIC_POLICY A′ |
| title/H2/도입 | Week 0 GSC → **§1–4 표면** (본문 전면 금지). 편수 FLEX | PROCESS §0.1 · WRITING_GUIDE |
| **§1–4 스프린트** | 복수 에이전트 실행 지시서 | [`SEO_S14_SPRINT_WORK_INSTRUCTION_2026-07.md`](./SEO_S14_SPRINT_WORK_INSTRUCTION_2026-07.md) |
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
- 「글 더 쓰기」만으로 승인 해법 · **일괄 덤프 후 즉시 재신청**  
- Astro→다른 스택 이주 / 테마 전면 개편을 승인 해법으로 삼기  
- ACTIVITY_LOG 장문 복붙 (요약 3~5줄 + refs)  
- hreflang 방어 전 KO+EN 전용 신규 발행  
- 대량 변경 직후(7일 미만) 재신청  

---

## 7. 마일스톤

| 시점 | 액션 |
|------|------|
| ~8/12 | Week 4: 게이트 A/B 실측 · JA soft sunset 여부 |
| ≥9/15 | TK Gate B+v2.3(B-7~B-9) 충족 시 재신청 창 |
| 승인 시 | `hub:close` 또는 `hub:log --milestone` **필수** |
| 승인 후 | Phase B (refresh 30%) 복귀 · D-003 AdPost 재검토 · **Google CMP(Privacy & messaging)** 확인 |

---

## 8. 관련 문서

- [`SEO_SPRINT_PROPOSAL_2026-07.md`](./SEO_SPRINT_PROPOSAL_2026-07.md)  
- [`SEO_S14_SPRINT_WORK_INSTRUCTION_2026-07.md`](./SEO_S14_SPRINT_WORK_INSTRUCTION_2026-07.md) — **§1–4 스프린트 실행 지시서** (Joseph·Claude·GPT·AG·Cursor)  
- [`docs/s14-sprint/STATUS.md`](./s14-sprint/STATUS.md) — slug별 진행 보드  
- [`EDITORIAL_TOPIC_POLICY.md`](./EDITORIAL_TOPIC_POLICY.md)  
- [`SEO_JA_CLUSTER_FOCUS.md`](./SEO_JA_CLUSTER_FOCUS.md)  
- `TokyoKorean/docs/NAVER_DAUM_BACKLINK_STRATEGY.md` · `TokyoKorean/docs/ADSENSE_8_3_RUNBOOK.md`  
- Cursor plan: `adsense_approval_strategy_1ca6a388.plan.md` §F  

---

## 외부 검증 (D-004 · 2026-08-04 Cursor)

- **검증일/수행자**: 2026-08-04 / Cursor (TK 반려 직후 · Astro 라이브 스모크 병행)
- **소스**:
  - Tier 1: [AdSense eligibility](https://support.google.com/adsense/answer/9724) · [Site not ready / unique content UX](https://support.google.com/adsense/answer/12176698) (공식: 최소 트래픽·연령 **미명시** · 고유·유용 콘텐츠·정책 준수)
  - Tier 3(교차): Social Spark Agency 2026 checklist/rejection guide · AI Tools Guidebook (when-to-apply · cookie CMP/TCF v2.3 · ads.txt redirect · Astro static ads) · Easton 2026 approval guide · intzzzero Astro+AdSense
  - Tier 2/실측: TK·Ark 라이브 curl (ads.txt·meta·trust·robots) 2026-08-04
- **3분류**:
  - ✅ 미검증 가치 프레임 · cool-off·즉시재제출금지 · trust 4페이지 · ads.txt 루트 정적 · thin tags disallow · 20–30편 벤치 · 공식≠트래픽의무
  - ⚠️ **갱신 반영**: (1) 도메인 **2–3개월** 실무 하한 재확인→TK 9/15 유지 (2) GSC **노출**을 클릭과 동급 신호로 B-8 (3) 변경 후 **7–14일 crawl 대기** B-9 (4) 승인 후/직전 **Google CMP** B-10 (5) 「꾸준한 발행 이력」> 동결+일괄 (6) Astro 스택 무관·헬스 PASS 문서화
  - ❓ IN/CN 등 **6개월 소유** 하드룰 — Joseph 계정 국가가 해당이면 별도 확인(일본 거주·일반 계정은 보통 2–3개월 실무). 단일 블로그 수치(승인률 %)는 채택 안 함
- **재검증 기한**: 2026-11-02 (90일) 또는 AdSense 정책 공지/다음 반려 시 즉시
