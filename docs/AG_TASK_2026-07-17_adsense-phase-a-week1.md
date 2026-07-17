# AG TASK — AdSense Phase A′ Week 1–2 실행 (Cursor 검증)

> **작성**: Cursor · 2026-07-17  
> **실행**: AG  
> **검증**: Cursor (AG 완료 보고 후)  
> **배포·커밋**: Joseph 명시 요청 시에만  
> **Repo**: `/Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark`  
> **SSOT**: [`ADSENSE_APPROVAL_PLAYBOOK_2026-07.md`](./ADSENSE_APPROVAL_PLAYBOOK_2026-07.md) · [`SEO_SPRINT_PROPOSAL_2026-07.md`](./SEO_SPRINT_PROPOSAL_2026-07.md) · D-001

---

## 0. 역할 · 금지

| 담당 | 할 일 |
|------|--------|
| **AG** | 아래 **전체 Wave** (콘텐츠 + **W0 채널·GSC·게시 운영**). 로그인이 필요한 UI는 Joseph 옆에서 **단계 지시·화면 확인**까지 AG가 담당 |
| **Cursor** | 빌드·라이브·YMYL·Playbook 정합 + W0 산출물(키 파일·KPI 표·게시 큐) 검증 |
| **Joseph** | Google/네이버/Bing **로그인·소유권 클릭**만 (AG가 클릭 위치·다음 화면을 지시). 커밋/배포는 명시 요청 시 |

### AG HARD 금지

- JA **신규** 포스트 생성 · 3언어 동시 신규 에피소드
- AdSense 재신청 · 게이트 완화 문구 삽입
- 헤드 키워드 전용글 · 니치 피벗
- YMYL 단정·권유 강화 ("추천/지금 사야/확실한 수익/무조건")
- 사이트 title을 네이버 감성 제목으로 교체 (지면 분리 — SEO_SPRINT §2)
- `hreflang.ts` 방어 로직 되돌리기
- ACTIVITY_LOG 장문 복붙 (완료 시 3~5줄 + refs만 → Joseph/Cursor가 hub:log)
- git commit / `vercel deploy --prod` (Joseph 지시 전)
- 네이버/Bing **비밀번호를 repo·채팅·로그에 기록** 금지

### 보이스 (KO)

- GSF 브랜드 KO = **정중체 (~습니다)** — [`JOSEPH_AUTHENTIC_VOICE.md`](./JOSEPH_AUTHENTIC_VOICE.md) · [`GSF_ARK_SNS_VOICE_V1.md`](./GSF_ARK_SNS_VOICE_V1.md)
- 네이버 요약도 **정중체** (구어체 ~더라고요/~했어요 금지 — TK Claude 사고 재발 방지)

---

## 1. 배경 (한 줄)

Playbook·hreflang 방어는 **main 배포 완료** (`679a9a6`).  
라이브 UI는 거의 동일 — 남은 건 **콘텐츠·채널·게이트 A 필수 항목**이다.

---

## 2. Wave 구성 (우선순위 고정)

| Wave | 기한 가이드 | 항목 | 완료 정의 |
|------|-------------|------|-----------|
| **W0-GSC** | Day 0–1 | GSC Week0 부트스트랩 | KPI 표 + 대역 A/B/C 분류 파일 |
| **W0-NAVER-SA** | Day 0–1 | 네이버 서치어드바이저 | 사이트 등록·사이트맵 제출 완료 증빙 |
| **W0-BING** | Day 0–1 | Bing 웹마스터 + IndexNow | 등록 + `public/<key>.txt` 라이브 200 |
| **W0-POST** | W1-D와 동시 | 네이버(·티스토리) **게시** | 주 큐 게시 완료 + URL 목록 |
| **W1-A** | 즉시 | risky-claims 면책 (게이트 A) | KO 표 수정 + EN 정합 + `modDatetime` |
| **W1-B** | 즉시 | GSC 리디렉션 2건 **실측→필요 시만 수정** | curl/GSC 근거 + 수정 또는 「이미 해소」보고 |
| **W1-C** | Week 1–2 | 내부링크 0 → **7편** 수선 | 편당 자사 `/ko/posts/…` 링크 ≥2 |
| **W1-D** | Week 1 | refresh 백로그 **#1·#2** (+ 네이버 초안) | title 1층 + draft + **W0-POST 게시** |
| **W2** | Week 2 | 백로그 **#3·#6** + FAQ + 게시 | SEO_SPRINT 배치표 |

**권장 순서**: W0-GSC → W0-NAVER-SA · W0-BING (병렬 가능) → W1-A → W1-D+W0-POST → W1-B/C → W2.

코호트: W1-C 7편은 refresh 대조군 D에서 **제외** (SEO_SPRINT §11 · Cursor §F.1⑧).

---

## 2b. W0-GSC — Week 0 부트스트랩 (AG 주도)

**목적**: 사이트 전체 노출 ~82 기준에서 기존 SOP(노출>50)가 안 돌아가므로, 노출≥1 쿼리 전수로 기준선을 만든다 (SEO_SPRINT §3.0).

### AG가 할 일

1. Joseph에게 GSC 로그인 요청 → 속성 `gsfark.com` 선택 지시.
2. **실적 → 검색결과 → 28일** → 페이지 필터 없이(또는 KO/JA/EN 각각) **쿼리 탭**에서 노출 ≥1인 행 **내보내기(CSV/시트)**.
3. repo에 저장 (커밋은 Joseph 지시 후):
   - `docs/gsc/week0_queries_28d_YYYY-MM-DD.csv` (또는 `.md` 표)
4. 순위 대역 분류 표를 `docs/WEEKLY_KPI_REVIEW.md` 또는 `docs/gsc/week0_bands_YYYY-MM-DD.md`에 기록:

| 대역 | 순위 | 액션 |
|------|------|------|
| A | 8–30 | title 우선 (CTR) |
| B | 31–70 | 이번 스프린트 주력 (H2/본문) |
| C | 71+ | 포기 목록과 대조 후 무시 |

5. `gsc_queries_top` 기준선 + **노출 발생 쿼리 수(분모)** 를 KPI 템플릿에 기입.
6. §9.4 Top10 후보 7건을 **쿼리 원장** 시드로 같은 파일에 초기 적재 (`slug | 타깃쿼리 | 사다리 | 다음점검`).

### 완료 정의

- CSV/표 파일 경로 + A/B/C 건수 요약 3줄
- Joseph이 화면에서 내보내기만 클릭했고, 분류·문서화는 AG가 함

### Cursor 검증 (W0-GSC)

- 파일이 repo에 있고 28d·노출 열이 식별 가능한지
- B대역이 refresh 백로그(#1–#10)와 교차 표기됐는지

---

## 2c. W0-NAVER-SA — 네이버 서치어드바이저 (AG 주도)

**목적**: 네이버 블로그 요약과 별개로 **원본 gsfark.com**이 네이버 웹문서에 잡히게 함 (SEO_SPRINT §12.3).

### AG가 할 일 (Joseph 로그인 클릭만)

1. [네이버 서치어드바이저](https://searchadvisor.naver.com/) 접속 지시.
2. 사이트 추가: `https://gsfark.com` (www 여부 사이트 실제 canonical과 일치 — 보통 apex).
3. 소유 확인: HTML 파일 / meta / DNS 중 **가장 빠른 방법** 선택.
   - HTML 파일이면: AG가 `public/`에 검증 파일 추가 → Joseph에게 배포 요청(또는 기존 배포 파이프) → 확인 클릭.
   - meta면: Layout/헤드에 임시 meta — **확인 후 제거** 또는 유지 정책 Cursor와 합의.
4. 사이트맵 제출: `https://gsfark.com/sitemap-index.xml`
5. 완료 증빙: 스크린샷 경로 또는 `docs/gsc/naver_search_advisor_YYYY-MM-DD.md`에  
   `등록일 · 사이트맵 상태 · 수집 요청 여부` 기록.

### 완료 정의

- 서치어드바이저에 사이트 **등록 완료** + 사이트맵 **제출됨**
- 증빙 문서 1페이지

### Cursor 검증

- 라이브에서 검증 파일/meta가 의도대로인지 (잔여 임시 파일 방치 없는지)
- 사이트맵 URL 200

---

## 2d. W0-BING — Bing 웹마스터 + IndexNow (AG 주도)

**목적**: Bing 색인 + ChatGPT 등 AI 인용 경로의 전제 (SEO_SPRINT §12.3·§13).

### AG가 할 일

1. [Bing Webmaster](https://www.bing.com/webmasters) — Joseph 로그인 → **GSC에서 가져오기** 또는 수동 추가 `gsfark.com`.
2. 사이트맵 제출: `https://gsfark.com/sitemap-index.xml`
3. **IndexNow**
   - API 키 생성 (랜덤 hex 32자 등).
   - 파일: `public/{KEY}.txt` 내용 = 키 한 줄.
   - (선택) `public/indexnow-key.txt` 또는 docs에 키 참조 — **비밀은 아니나** git에 넣는 키는 IndexNow 공개 키로만.
   - 배포 후 `https://gsfark.com/{KEY}.txt` → **200** + body=키 확인.
   - 발행/갱신 핑 방법 문서화:  
     `docs/ops/INDEXNOW.md`에 curl 예시 (호스트·키·변경 URL 리스트).
4. 완료 증빙: `docs/gsc/bing_indexnow_YYYY-MM-DD.md` (등록·사이트맵·키 URL·테스트 ping 결과).

### 완료 정의

- Bing에 사이트 표시 + IndexNow 키 파일 라이브 200
- ping 테스트 1회 (W1-D에서 갱신한 URL 중 1개)

### Cursor 검증

- `curl -sI` / `curl -s` 키 파일 200·내용 일치
- IndexNow 문서에 운영 핑 절차 있는지

---

## 2e. W0-POST — 네이버·티스토리 게시 (AG 주도, Joseph 붙여넣기)

**목적**: 게이트 A **레퍼럴 2주**의 분자. 「그 주 refresh = 그 주 네이버 배포」(SEO_SPRINT §5).

### AG가 할 일

1. **게시 큐** 작성: `docs/gsc/naver_post_queue_YYYY-Www.md`

| 순서 | slug | 초안 파일 | 사이트 URL | 채널 | 상태 |
|------|------|-----------|------------|------|------|
| 1 | japan-shinchiku-vs-chuko… | naver-drafts/… | https://gsfark.com/ko/posts/…/ | 네이버 | 대기/완료+게시URL |
| 2 | … | | | | |

2. W1-D / W2 refresh와 **같은 슬러그**를 큐 상단에 둘 것. 기존 `naver-drafts/` 교집합 우선.
3. 초안 품질 HARD (게시 전 AG 자가점검):
   - 정중체 · 원문 복붙 아님 · CTA = **개별 포스트 URL** (홈 금지) · CTA 문구 연속 동일 금지
4. Joseph에게 **한 편씩** 지시: 네이버 블로그 글쓰기 → 제목/본문 붙여넣기 → 발행 → **게시된 네이버 URL**을 큐 표에 기입 (AG가 표 갱신).
5. 티스토리: 계정 준비되면 동일 큐를 정보형 톤으로 1편 파일럿 (Open API 없음 — 수동). 없으면 Week1은 네이버만으로 Pass.
6. GA4: 게시 24h 후 트래픽 획득에 `naver` 레퍼럴 보이는지 Joseph과 함께 확인 → 큐에 `GA4확인 Y/N`.

### 완료 정의 (Week 1)

- 네이버 **≥2편** 게시 완료 (이상적으로 W1-D #1·#2) + 큐에 게시 URL
- 주간 목표 안내: 이후 **주 3–5편** (Playbook) — Week1은 최소 2로 게이트 시동

### Cursor 검증

- 큐 문서의 네이버 URL이 살아 있고 gsfark **개별 포스트**로 링크되는지
- 초안 보이스·CTA HARD

---

## 3. W1-A — risky-claims (필수)

**파일**: `src/data/blog/ko/japan-shinchiku-vs-chuko-mansion-investor-guide.md`  
(동일 구조면 EN도 동기화: `src/data/blog/en/japan-shinchiku-vs-chuko-mansion-investor-guide.md`)  
**JA**: 신규 아님 — **기존 JA URL이 있으면** 같은 표만 조건부 수정 가능 (같은 주 KO 완료 후 · 주당 JA≤1). 없으면 스킵.

### 문제

§6 결론 표 (약 L206):

| 투자 목적 | 추천 | … |
| 열 이름 **「추천」** + 셀에 신축/중고를 직접 지정 → YMYL misleading 리스크.

상단 `PostDisclaimer`만으로는 표 헤드의 「추천」이 남음.

### AG 작업

1. 표 헤더 `추천` → **`상대적 적합 후보 (개인 상황·세무 상담 전제)`** 또는 **`검토 후보`** (단정 금지).
2. 표 직전 또는 직후 1~2문장 면책 추가 (정중체), 예:
   - 특정 상품·매수 권유가 아니며, 세무·대출·개인 상황에 따라 달라진다.
   - 투자 결정 전 세무사·전문가와 확인할 것.
3. 본문에 「지금 사야 / 확실한 수익 / 무조건」류가 있으면 완화 (단, 데이터 서술은 유지).
4. `modDatetime`을 오늘(JST)로 갱신.
5. EN 동일 표·면책 정합 (직역이 아니라 **동일 가드**).

### 완료 보고에 넣을 것

- before/after 표 헤더 1줄
- 면책 문장 위치 (대략 line)
- EN 반영 여부

---

## 4. W1-B — 리디렉션 2건 (검증 후 수정)

감사에 나온 URL:

| URL | 2026-07-17 Cursor 라이브 스팟 | AG 할 일 |
|-----|------------------------------|----------|
| `/ja/mission` → `/ja/mission/` | 308 → **200** | GSC「리디렉션 오류」잔존 여부 Joseph/GSC 확인. 코드 변경은 **오류가 남아 있을 때만** |
| `/tags/fx/` | **200** | 동일. 태그 noindex 유지. 깨진 링크면 `vercel.json` 또는 태그 canonical로 정리 |

**금지**: noindex 태그 페이지를 색인 허용으로 바꾸지 말 것.

보고: `curl -sI` 결과 3줄 + 「수정함 / 수정 불필요」.

---

## 5. W1-C — 내부링크 0 글 7편

관광 legacy 2편은 **방치** (`tokyo-five-sophisticated-spots`, `tokyo-yokohama-fuji-transport-pass`).

### 대상 (7)

1. `tokyo-mansion-market-reins-2026-04` ⚠️ topicHubs 대표  
2. `tsukiji-last-empty-lot-redevelopment`  
3. `tokyo-adachi-katsushika-edogawa`  
4. `buying-property-japan-surprises-foreign-investor`  
5. `japan-real-estate-three-things`  
6. `tokyo-6-wards-real-estate-insight`  
7. `tokyo-earthquake-vulnerable-five-areas`  

### 규칙

- 언어: **KO 필수**. EN은 같은 앵커 있으면 동기화. JA는 해당 슬러그 기존 파일 있을 때만 (주당 JA 갱신 한도 고려 → 이번 Wave는 **KO(+EN) 우선**, JA는 Joseph 여유 시).
- 본문 하단 「함께 보면 좋은 글」또는 자연스러운 문단 링크.
- **tokyoLife 허브 1 + urbanInvestment 허브 1** 권장 (Playbook 내부링크 규칙).
- 링크 형식: `/ko/posts/{slug}/` (상대경로, trailing slash).
- 허브 슬러그 참고: `src/data/topicHubs.ts`.
- `modDatetime` 갱신.

### 완료 정의

각 파일에서 `]/ko/posts/` 또는 `](/posts/` 자사 포스트 링크 **≥2**.

---

## 6. W1-D — refresh #1·#2 + 네이버 초안

### #1 (W1-A와 동일 슬러그)

- title: 은유형이면 쿼리 접점 있게 (SEO_SPRINT §8.1·§3.3 YMYL 가드). **공식**: [`SEO_WRITING_GUIDE_2026-07.md`](./SEO_WRITING_GUIDE_2026-07.md).
- **캘리브레이션 (§F.3⑤)**: #1·#2 title은 **AG 단독 확정 금지**. 초안 → Joseph/Claude가 GUIDE §2·§5 대조 검수 → 확정 후 반영. 3편째부터 AG 자율+Cursor 검증.
- **한 번에 한 층만** (이번엔 title+면책/표 — H2는 2주 무반응 후).
- 네이버: `naver-drafts/`에 해당 slug 초안이 있으면 **정중체·개별 URL CTA**로 갱신. 없으면 신규 txt 1편.
  - CTA → `https://gsfark.com/ko/posts/japan-shinchiku-vs-chuko-mansion-investor-guide/`
  - 원문 복붙 금지 · 30–40% 재구성 (TK HARD와 동일 취지, 보이스만 정중체).

### #2 `korea-japan-inheritance-gift-tax-cross-border-basics`

- 크롤링됨-미색인 실증 슬러그 — KO 본문에 **한국 거주자 고유 사례 1절** 보강 또는 H2 질문형 1개.
- title에 선정 프레이밍(`무한책임의 함정` 등) 있으면 §3.3·§8.4에 맞게 완화. **#1과 동일 캘리브레이션** (AG 단독 title 확정 금지).
- `modDatetime` + 네이버 초안 정렬 (정보형).
- EN 정합. JA는 조건부.

### 네이버 초안 경로

- 기존: repo `naver-drafts/` · `docs/AG_TASK_naver_*.md` 패턴 참고.
- **게시(붙여넣기)는 Joseph**. AG는 초안 파일만.

---

## 7. W2 (Week 2) — #3·#6 + FAQ

AG가 W1 검증 통과 후 진행.

| # | 슬러그 | 액션 |
|---|--------|------|
| 3 | `tokyo-hachioji-hino-akishima` | H2 + 실거주 디테일 · 시리즈 제목 **구 이름 전진** (§8.2) |
| 6 | `tokyo-korean-community-beyond-shinokubo` | KO title + 네이버 ◎ 1순위 배포 초안 |

### FAQPage (인프라 이미 배포됨)

- 유틸: `src/utils/faqJsonLd.ts` → `buildFaqPageJsonLd`
- Layout: `extraJsonLd` prop
- AG: `PostDetails.astro`(또는 포스트→Layout props)에서 **이번 refresh 글**에 H2 질문 3~5개를 FAQ로 넣어 `extraJsonLd` 전달.
- 전 포스트 일괄 FAQ 금지 — **W1-D / W2에서 손댄 슬러그만**.

---

## 8. 기술 스모크 (AG 자체)

```bash
cd /Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark
# 변경 슬러그 기준 (환경에 맞게)
SKIP_TRUST_VERIFY=1 pnpm validate:post japan-shinchiku-vs-chuko-mansion-investor-guide
# 또는 배치 가능 시
SKIP_VALIDATE_BUILD=1 SKIP_TRUST_VERIFY=1 pnpm validate:batch
```

실패 시 Cursor 넘기기 전에 수정.

---

## 9. AG → Cursor 핸드오프 템플릿

완료 시 Joseph/Cursor에 아래만 (장문 금지):

```
AG Phase A′ W0+W1 완료
- W0-GSC: 파일경로 · A/B/C 건수
- W0-NAVER-SA: 등록·사이트맵 상태
- W0-BING: 키 URL · ping 결과
- W0-POST: 게시한 네이버 URL N건 (큐 경로)
- W1-A: … (표 헤더 before→after)
- W1-B: 수정함 / 불필요 + curl
- W1-C: 7편 링크 수 표
- W1-D: #1/#2 title·modDatetime·naver-draft 경로
- FAQ: 연결 슬러그 목록 (없으면 없음)
- validate: exit code
- refs: 변경 파일 경로 8줄 이내
- 커밋/배포: 대기 (Joseph)
```

---

## 10. Cursor 검증 체크리스트 (AG 완료 후)

Cursor는 다음을 확인한다. **통과 시에만** Joseph에게 커밋·배포 권고.

| # | 검사 | Pass |
|---|------|------|
| 0a | W0-GSC: week0 쿼리/대역 파일 + 원장 시드 | |
| 0b | W0-NAVER-SA: 증빙 문서 + 사이트맵 URL 200 | |
| 0c | W0-BING: IndexNow 키 라이브 200 + ops 문서 | |
| 0d | W0-POST: 네이버 게시 URL ≥2 · CTA=개별 포스트 | |
| 1 | risky-claims 표에 「추천」단독 헤더 없음 + 면책 문장 존재 | |
| 2 | YMYL 가드 위반 신규 문구 없음 (단정·보장) | |
| 3 | 내부링크 7편 각각 자사 포스트 링크 ≥2 | |
| 4 | JA 신규 파일 추가 없음 (`git status` / 신규 slug) | |
| 5 | hreflang 방어 코드 유지 (`getEntry` + locales 필터) | |
| 6 | FAQ 넣은 글: 빌드 HTML에 `FAQPage` (해당 URL만) | |
| 7 | `pnpm` validate/build 관련 exit 0 (AG 보고와 재현) | |
| 8 | 네이버 초안: 정중체 · 개별 포스트 URL · 홈 링크 아님 | |
| 9 | Playbook/SEO_SPRINT 백로그 순서와 충돌 없음 | |

반려 시: CURSOR_BRIEF 또는 채팅에 **파일·줄·사유**만. AG 재작업 → 재검증.

---

## 11. Joseph 한 줄 (AG에게)

> `GSF-Ark docs/AG_TASK_2026-07-17_adsense-phase-a-week1.md` 전체 실행 (W0 GSC·네이버SA·Bing·게시 포함). 로그인 클릭만 내가 하고 나머지는 AG가 지시·문서화. 끝나면 Cursor 검증. 커밋·배포는 내가 지시할 때만.
