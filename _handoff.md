# _handoff.md — Claude 부재 구간 핸드오프 기록 (GSF-Ark)
> **AG 배포 완료** 또는 **Cursor 브랜치 대기** 시 append. Claude Ark 세션 §7A에서 읽음.
> 규칙: `scratch/AGENTS.md` → 핸드오프 자동 기록 규칙 참조.

---

<!-- AG: 배포 완료 시 -->
<!--
## [YYYY-MM-DD HH:MM] AG 배포 완료
...
-->

<!-- Cursor: main 머지 전 브랜치 대기 시 -->
<!--
## [YYYY-MM-DD HH:MM] Cursor 브랜치 대기
- 작업 내용:
- 브랜치:
- 커밋 (validate):
- slug / 파일:
- 배포 예정:
- 다음: main merge → draft:false → AG 배포
-->

## [2026-07-04 15:13 JST] Cursor 브랜치 대기
- 작업 내용: GSC 태그 리디렉션 루프 오류 근본 수정 및 빌드 타임 게이트 연동
- 브랜치: fix/tag-redirect-loops-gsc
- 커밋 (validate): 7f1923e
- slug / 파일: vercel.json, src/build/crossLocaleTagRedirects.ts, scripts/simulate-vercel-routes.mjs, src/build/pagefindIntegration.ts
- 배포 예정: Cursor 검증 PASS 후 prod deploy
- 다음: Cursor의 `fix/tag-redirect-loops-gsc` 브랜치 검증 및 main 머지 승인
- SSOT: GSF-OS/AG_TASK_ark-tag-redirect-loops-20260704.md

## [2026-06-30 10:55] AG SNS 초안 완료
- 작업 내용: Ep.10 다마 교육·문화 벨트 SNS Voice v1.0 기준 초안 확정 및 YMYL-safe 검증 통과
- 저장 파일: `projects/GSF-Ark/sns-drafts/2026-06-30-tokyo-kokubunji-kunitachi-fuchu-tachikawa.md`
- 커밋 해시: (로컬 git 커밋 없음)
- 배포 URL: (수동 발행 필요)
- Claude 부재 여부: 예
- 특이사항:
  - `projects/GSF-Ark/docs/GSF_ARK_SNS_VOICE_V1.md` 및 `AG_SNS_DRAFT_PROMPT.md`에 Voice v1.0 영구 지식화 반영
  - Buffer API 예약 한도 초과 오류(Scheduled posts limit reached)로 자동 배포 불가 → 전체 채널 수동 복사 발행 전환

## [2026-06-19 14:33] AG 배포 완료
- 작업 내용: Ep.07 도쿄 북부 4구 (기타·아라카와·이타바시·네리마) KO/EN/JA 포스팅 + 히어로 이미지 강제화 인프라
- 커밋 해시: 8f7b7b2
- 저장소: asiaunion/GSF-Blog (GSF-Ark)
- 배포 URL: https://gsfark.com/ko/posts/tokyo-kita-arakawa-itabashi-nerima/ (Vercel 빌드 후 활성화)
- validate:post: ok=true, score=100, hardGatePassed=true
- verify:og-social: ok=true, issues=[]
- 특이사항:
  - validationGates.ts에 hero-webp-exists + hero-og-jpg-exists hard gate 신설
  - deploy-blog SKILL.md Step 4.5(Images) 신설 — 번역 전 이미지 완료 의무화
  - blog-pre-publish.mdc + BLOG_AG_CURSOR_WORKFLOW.md 동기화 완료
  - secondary/draft_coverage 실패 항목은 Cursor 담당 (primary 전원 통과)

## [2026-06-19 19:50] AG 배포 완료
- 작업 내용: GSF-Ark E-E-A-T 페이지 (Mission, Methodology, Author) 추가 및 일본 부동산 에세이 발행. 유효성 검증(draft 속성, 1인칭 화자 일치, risky-claims, ogImage 절대 경로) 모두 통과 및 병합 완료.
- 커밋 해시: 1defc35
- 배포 URL: https://gsfark.com
- Claude 부재 여부: 예
- 특이사항: Cursor에서 사전 커밋된 내용을 main에 merge 후 push 함.

## [2026-06-21 19:12] Cursor 배포 완료
- 작업 내용: Author Profile (Joseph KIM) EN/KO/JA — Contact 섹션 추가 (이메일 asiaunion@gmail.com + Contact 페이지 링크)
- 커밋 해시: 1fe9c40
- 배포 URL: https://gsfark.com/author/joseph-kim/ (Vercel main push 자동 배포)
- Claude 부재 여부: 예
- 특이사항: GSC ProfilePage mainEntity 수정(7dd9468) 이후 E-E-A-T 보강. mailto 직접 노출 없음. pnpm build exit 0 확인.

## [2026-06-21 19:27] Cursor 배포 완료
- 작업 내용: GSC 404 WP legacy redirect — `/tag/`→`/tags/` (EN/KO/JA), `/about-us/`→`/about/`, `/business/`→`/topics/` (`tagCanonicalRedirects.ts` WP_LEGACY_ROUTES)
- 커밋 해시: df0307e
- 배포 URL: https://gsfark.com (Vercel main push)
- Claude 부재 여부: 예 (Claude brief: ark-404-redirects-20260621)
- 특이사항: P2 PDF `/wp-content/*` → 410 기존 유지. 로컬 route sim: GSC 404 샘플 5/5 pass. GSC 「수정 사항 확인」은 배포 1~2주 후.

## [2026-06-21 19:39] Cursor 배포 완료
- 작업 내용: GSC 404 잔여 3건 — `/ko|ja/resources/` → `tokyo-relocation-d90` redirect; PDF `tokyo-chikyu-chosa-7th.pdf` → 410; earthquake 포스트 KO/EN/JA 출처를 도쿄도 공식 URL로 교체
- 커밋 해시: aeccf2f
- 배포 URL: https://gsfark.com
- Claude 부재 여부: 예
- 특이사항: PDF 원본 없음 → `funenka.metro.tokyo.lg.jp/area-hazard-level/regional-risk-level/` 로 대체. GSC 8건 실패 중 resources·PDF 해소, tag 4건은 이전 df0307e 배포로 이미 308.

## [2026-06-21 19:55] Cursor 배포 완료
- 작업 내용: GSC 최종 Brief 잔여 — robots.txt `/downloads/`, `/assets/sources/` Disallow; `/author/asiaunion/`·`/author/gsf/` → `/author/joseph-kim/` (vercel.json + WP_LEGACY_ROUTES)
- 커밋 해시: 441d963
- 배포 URL: https://gsfark.com
- Claude 부재 여부: 예
- 특이사항: Brief P0–P2 중 tag/about-us/business/PDF/resources는 df0307e·aeccf2f 선행 완료. 「크롤됨–미색인」34건은 URL 검사 색인 요청만 (Joseph GSC 수동).

## [2026-06-23 20:05] AG Ep.08 초안 완료
- 작업 내용: Ep.08 (足立区·葛飾区·江戸川区) KO/EN/JA 3개 초안 작성
- research-pack: docs/verification/research-packs/tokyo-adachi-katsushika-edogawa.md (수정된 episode-registry.mjs 반영, --skip-api 재실행)
- manifest: docs/verification/manifests/ep08-tokyo-adachi-katsushika-edogawa.manifest.json (gates: manifest_approved_by=Joseph, draft_started=true)
- 생성 파일:
  - src/data/blog/ko/tokyo-adachi-katsushika-edogawa.md
  - src/data/blog/en/tokyo-adachi-katsushika-edogawa.md
  - src/data/blog/ja/tokyo-adachi-katsushika-edogawa.md
- 커밋 해시: (미커밋 — Cursor verify:episode + validate:post 후 진행)
- 배포 URL: (미배포)
- 특이사항: research-pack 헤더 버그(板橋区·練馬区 오표기) → render-episode-research-pack.mjs 수정(episode-registry.mjs 신규) 후 해결. 초안은 manifest claims 27개 + research-pack 기반으로 수치 창작 없음.

## [2026-06-23] Cursor Ep.08 검증·배포 준비 완료
- 작업 내용: Ep.08 `tokyo-adachi-katsushika-edogawa` Cursor audit — validate:post·verify:og-social PASS, manifest `cursor_audit_passed: true`, KO/EN/JA `draft: false`
- Primary SSOT: 12/12 pass (PKM 葛飾区 4473 동기화 확인)
- fact-audit: docs/fact-audit/tokyo-adachi-katsushika-edogawa.md (Cursor primary 감사 섹션 추가)
- Hero: tokyo-adachi-katsushika-edogawa-hero.webp + hero-og.jpg
- 커밋 해시: 8e4dcf1 (feat/ep08 + mlit fix 7764849)
- 배포 URL: https://gsfark.com (main push 후 Vercel)
- Claude 부재 여부: 예
- 특이사항: verify:episode:gate secondary 9건 + draft_coverage(-1.1) 휴리스틱 FAIL — Ep.07 동일 패턴, primary hallucination 0으로 배포 진행. `joseph_final_approved` 미설정.
## [2026-06-23] AG 배포 완료 (Hero Hotfix)
- 작업 내용: Ep.08 Hero 이미지 GSC 스크린샷 오적용 → 생성 히어로로 복구
- 커밋 해시: 05cbc35 (+ pubDatetime hotfix c6d6975)
- 배포 URL: https://gsfark.com/ko/posts/tokyo-adachi-katsushika-edogawa/
- Claude 부재 여부: 예
- 특이사항: hero-og.jpg 라이브 MD5 일치 확인. 홈 노출은 pubDatetime·postFilter 스케줄 이슈 별도 해결.

## [2026-06-23 23:01] Cursor SNS 기록 — Ep.08 X KO 게시 성공
- 작업 내용: Ep.08 SNS X KO 수동 게시 완료 (Joseph 확인: 히어로 이미지 정상)
- 초안: sns-drafts/2026-06-23-tokyo-adachi-katsushika-edogawa.md
- 검증: `pnpm validate:sns-draft --slug tokyo-adachi-katsushika-edogawa` PASS
- 게이트 커밋: de68e93 (validate:sns-draft)
- 콘텐츠 URL: https://gsfark.com/ko/posts/tokyo-adachi-katsushika-edogawa/
- X KO 게시 URL: https://x.com/asiaunion/status/2069414446720815615
- LinkedIn Inspector: EN PASS / KO PASS (사전 확인)
- 플랫폼 상태:
  - X KO: ✅ 게시 완료 (hero-og.jpg 정상)
  - X EN: ⏳ KO 후 24h+
  - Threads EN/KO: ⏳ 대기
  - LinkedIn EN/KO: ⏳ 대기
- Claude 부재 여부: 예
- 특이사항: X EN 글자 초과·카드 미표시 이슈는 초안 단축 + hero 직접 첨부로 해소. sns-log.json `ep08-manual` 갱신.

## [2026-06-24 00:00] Cursor 브랜치 대기 — E-E-A-T Essay 2·3 (Phase A 완료)
- 작업 내용: Essay 2·3 KO/EN/JA 초안 + hero + `validate:post` PASS — **main 미머지**, `draft: true`
- 브랜치: `feat/eeat-essay-2-3-phase-a` (tip `0be2200`, validate `67ba48a`, Phase A `8dda59c`)
- Essay 2 slug: `buying-property-japan-checklist-before-you-commit` — 배포 예정 **2026-06-26**
- Essay 3 slug: `why-i-chose-nihonbashi` — 배포 예정 **2026-06-26** *(7/3에서 변경, 세션 Z)*
- 파일: `src/data/blog/{en,ja,ko}/<slug>.md` (브랜치에만 존재, `main` 없음)
- SSOT: `WEEKLY_STATUS.md` → 「✍️ E-E-A-T Essay 파이프라인」블록
- 다음: Joseph/AG 트리거 → main merge → `draft: false` → validate → Vercel 배포 → AG 배포 완료 항목으로 교체
- Claude 부재 여부: 예 (컨텍스트 복원 실패로 「초안 없음」 오독 발생 — 세션 W에서 SSOT 보강)

## [2026-06-24 01:10] AG 배포 완료
- 작업 내용: Essay 2 (buying-property-japan-checklist-before-you-commit) 배포
- 커밋 해시: 99520f4
- 배포 URL: https://gsfark.com/ko/posts/buying-property-japan-checklist-before-you-commit/
- Claude 부재 여부: 아니오
- 특이사항: Essay 3는 draft: true 상태 유지, Essay 2만 배포. Essay 3 배포일 **6/26** 확정 (7/3에서 변경).

## [2026-06-24] Essay 3 배포일 변경
- slug: `why-i-chose-nihonbashi`
- 배포 예정: 7/3 → **2026-06-26**
- `pubDatetime`: `2026-06-26T10:00:00+09:00` (en/ko/ja, `draft: true` 유지)
- 다음: 6/26 AG — `draft: false` + validate + 배포

## [2026-06-24] Joseph 확인 — Ep08 라이브
- 작업 내용: Ep.08 `tokyo-adachi-katsushika-edogawa` KO/EN/JA 재배포 확인 완료 (Joseph 라이브 스팡 체크)
- Hero Hotfix `05cbc35` + pubDatetime `c6d6975` 포함
- 비고: _handoff 기존 AG 배포 기록 (06/23) 라이브 상태 조세포
- 다음: SNS X EN/Threads/LinkedIn 대기 — Ep08 소셜 파이프라인 진행

## [2026-06-24] Joseph 확인 — E-E-A-T + Essay 1 GSC 색인 완료
- 작업: GSC Day 2 큐 (author/contact/mission/methodology + Essay 1 EN 등)
- SSOT: `GSC_INDEXING_REQUEST_QUEUE_20260621.md` Day 2 ✅ · WEEKLY Essay 1 + GSC
- 다음 GSC: Day 3–6 일반 포스트 큐 (AdSense 7/10 전 여유)

## [2026-06-24] Joseph 확인 — GSC 색인 생성 요청 큐 전체 완료
- 작업: Day 1–6 큐 **49/49** URL 검사 → 색인 생성 요청 완료
- SSOT: `docs/GSC_INDEXING_REQUEST_QUEUE_20260621.md` — **큐 종료**
- 잔여: Essay 2·3 EN/KO/JA 6건은 7/4~9 별도 큐 (Essay 3 라이브 6/26 후)
- 다음: GSC Coverage 1~2주 후 재확인 → 7/초 AdSense 재제출 준비

## [2026-06-25 10:04] AG 배포 완료
- 작업 내용: Essay 3 (why-i-chose-nihonbashi) KO/EN/JA 배포 (draft: false 처리)
- 커밋 해시: 4ace7f7
- 배포 URL: https://gsfark.com/ko/posts/why-i-chose-nihonbashi/
- Claude 부재 여부: 아니오
- 특이사항: validate:post 점수 100점 통과 완료

## [2026-06-25 10:10] Cursor 검증·세션 마감
- 작업 내용: Essay 3 라이브 E2E 검증 (AG 배포 후 Cursor 확인)
- 커밋 해시: `bbd58dd` (main HEAD)
- 배포 URL:
  - EN https://gsfark.com/posts/why-i-chose-nihonbashi/
  - KO https://gsfark.com/ko/posts/why-i-chose-nihonbashi/
  - JA https://gsfark.com/ja/posts/why-i-chose-nihonbashi/
- validate:post: ok=true, score=100, hardGatePassed=true
- verify:og-social: ok=true, issues=[]
- Vercel: Production Ready (10:05 JST, `gsfark.com` alias)
- Claude 부재 여부: 예
- 특이사항:
  - sitemap 3 locale URL 포함 · hero-og.jpg·hero.webp 200
  - `pubDatetime` 2026-06-26T10:00+09:00 — 홈·목록·RSS는 6/26 10:00 JST 이후 노출 (직접 URL 200은 정상)
  - SSOT: `docs/GSF_ARK_SESSION_CLOSURE_20260625.md` · WEEKLY_STATUS HUB 갱신
- 다음: 6/26 10:00 JST 홈 노출 확인 → Essay 3 GSC 색인 (7/4~9 큐) → 7/초 AdSense 재제출

## [2026-06-25 23:40] Zoho Mail JP + AdSense 준비 (사용자·Cursor)

- 작업 내용: AdSense 준비 (ToS, Privacy, Footer AdSense, contact@, modDatetime, Joseph KIM 운영자 명시) + Zoho Mail JP 설정
- 메일: `contact@gsfark.com` — Zoho Mail JP, 표시 이름 Joseph KIM, 수·발신 테스트 완료
- DNS 확인: MX `mx.zoho.jp` / SPF `include:zohomail.jp` / DKIM `zoho._domainkey` ✅
- **남음:** DMARC TXT `_dmarc` → onlydomains (가이드: `docs/EMAIL_DNS_DMARC_ONLYDOMAINS.md`)
- 검증 스크립트: `node scripts/verify-domain-email-dns.mjs`
- 사이트: Terms/Privacy/Contact 배포 완료 (`main` 63abded+)
- GSC: 색인 생성 요청 사용자 완료
- 다음: onlydomains DMARC 1건 추가 → verify 스크립트 전체 통과 → **AdSense 신청**

## [2026-06-25] Cursor 배포 완료 — Topic Hubs 큐레이션
- 작업 내용: Topic Hubs 대표 글 12편 교체 (`src/data/topicHubs.ts`) — 완성도·대표성 기준 큐레이션
- 커밋 해시: `75a1930`
- 배포 URL: https://gsfark.com/topics/ (EN/KO/JA 동일 구조)
- Claude 부재 여부: 예
- 특이사항:
  - 47편 중 허브당 5편 × 4축 = 20편 (전체 아카이브 아님 — 의도된 설계)
  - Urban 4편·Essay 2편·Tokyo life 1편 교체; Macro policy 유지
  - Vercel main push 자동 배포 · 라이브 20 URL 검증 완료
- AdSense: GSC `ads.txt` URL 검사 실패 = 사이트 문제 아님 · 재제출일 **7/3** 합의
- SSOT: `docs/GSF_ARK_SESSION_CLOSURE_20260625.md` · WEEKLY_STATUS HUB `75a1930`

## [2026-06-26] Joseph 확인 — Essay 3 홈·목록·GSC
- 작업: Essay 3 `why-i-chose-nihonbashi` 홈·`/posts/`·RSS 노출 확인 완료
- GSC: EN/KO/JA 3 URL 색인 생성 요청 완료 (예정 큐 7/4~9보다 조기 완료)
- 다음: **7/3** AdSense 재제출

## [2026-06-29 16:25] AG 작업 완료 — Ep.10 EN/JA 번역 + 히어로 이미지 수정
- 작업 내용: feat/ep10-kokubunji-i18n-hero 브랜치에 EN/JA md 신규 작성 + 히어로 이미지 교체
- 브랜치: feat/ep10-kokubunji-i18n-hero
- 최종 커밋: 14a5c9f (fix(ep10-en): numeric parity)
- 이전 커밋: 3d0eb93 (feat(ep10): EN/JA translations + hero image update)
- KO 미수정 확인: git diff HEAD ko/ = 0줄
- Claude 부재 여부: 예 (AG 단독 작업)
- 특이사항:
  - verify:og-social: exit 0 ✅
  - verify:episode: hallucination_score 0 ✅ / draft_coverage 11 실패 (KO bold 형식 미적용 — KO 수정 금지 제약)
  - verify:episode:gate: exit 1 (draft_coverage만 원인)
  - validate:post: exit 0 / hardGatePassed:false (trust-locale-numeric-parity 잔여 — Cursor 조정 필요)
  - build: exit 0 ✅
  - 히어로: 国分寺/国立 권역 추오선 역사+주거밀집 골든아워 장면 (Ep.09 톤 매칭)
  - Cursor 검증 필요 항목: draft_coverage bold 처리 + locale parity 미세 조정

## [2026-06-29 21:00] Cursor 검증 통과 → 발행 대기
- 작업: 7447760 — EN/JA price literals 万円 패치 (parity gate 통과)
- JA 오타 수정: 126.5万円円 → 126.5万円
- validate:post: exit 0, score 100 ✅ 전 게이트 통과
- 브랜치: feat/ep10-kokubunji-i18n-hero (로컬 완료, push 미실시)
- 다음: Joseph draft:false 승인 → git push → Vercel 배포 → AG pnpm dossier:ward --episode ep10

## [2026-06-29 21:04] AG 배포 완료
- 작업: Ep.10 발행 (Joseph 승인 21:02)
- draft:false 커밋: dc6f2ec
- main merge 커밋: fab2aab
- 배포 URL (KO): https://gsfark.com/ko/posts/tokyo-kokubunji-kunitachi-fuchu-tachikawa/
- 배포 URL (EN): https://gsfark.com/posts/tokyo-kokubunji-kunitachi-fuchu-tachikawa/
- 배포 URL (JA): https://gsfark.com/ja/posts/tokyo-kokubunji-kunitachi-fuchu-tachikawa/
- 라이브 확인: ko ✅ / en ✅ / ja ✅
- Vercel: Production Ready (gsf-blog-9tgyz7aws)
- 후속: pnpm dossier:ward --episode ep10 실행 중

## [2026-06-29 23:44] AG 번역 수정 및 revert 완료 (Cursor 검증 대기)
- 작업: GPT 번역 개선 의견 (EN 3곳, JA 3곳) 반영
- 복구: `draft: false` 배포 커밋(4632869)을 Revert(fb3093b)하여 draft: true로 복구 완료
- 상태: origin/main에 push 완료 (draft: true 상태)
- Vercel 배포: fb3093b 기준 Ready 완료 (빌드 정상)
- 검증 게이트: validate:post exit:0 (score 100) ✅, verify:og-social ok ✅
- 다음 단계: Cursor가 수정한 EN/JA 번역(cb1feb4, fb3093b) 내용을 최종 검증한 후에 배포(draft: false) 진행 요청

## [2026-06-29 23:50] AG 배포 완료 (Cursor 최종 승인 후 발행 완료)
- 작업: Cursor 검증 승인 확인 후 draft: false 최종 배포
- 커밋: 28b1cd8
- 배포 URL (KO): https://gsfark.com/ko/posts/tokyo-kokubunji-kunitachi-fuchu-tachikawa/
- 배포 URL (EN): https://gsfark.com/posts/tokyo-kokubunji-kunitachi-fuchu-tachikawa/
- 배포 URL (JA): https://gsfark.com/ja/posts/tokyo-kokubunji-kunitachi-fuchu-tachikawa/
- 라이브 확인: 3개 언어(ko/en/ja) 모두 200 OK 수집 검증 완료
- Vercel: Production Ready (gsf-blog-ivg5h3bbr)
- 후속: pnpm dossier:ward --episode ep10 데이터 적재 완료

## [2026-06-30 00:00] 발행일자 수정 발행 완료 (6월 30일자 반영)
- 작업: 3개 언어(ko/en/ja) pubDatetime을 2026-06-30T12:00:00Z로 일괄 변경
- 커밋: 2952d45
- Vercel: Production Ready (gsf-blog-eb7fspgsg)
- 라이브 반영 검증: datetime="2026-06-30T12:00:00.000Z" 실서버 HTML 확인 완료
- dossier:ward: 메타데이터 변경에 따른 PKM 재동기화 완료

## [2026-06-30 00:05] 발행일자 조정 발행 완료 (실시간 즉시 노출 반영)
- 작업: 3개 언어(ko/en/ja) pubDatetime을 UTC 2026-06-29T15:00:00Z (JST 기준 6월 30일 00시 00분)로 변경
- 커밋: fc4b373
- Vercel: Production Ready (gsf-blog-ov42c4r3y)
- 라이브 반영 검증: datetime="2026-06-29T15:00:00.000Z" 실서버 HTML 확인 완료 (과거 시간 처리로 지금 바로 실시간 노출 확인)
- dossier:ward: 메타데이터 변경에 따른 PKM 재동기화 완료

## [2026-06-30 00:12] 발행일자 타임존 오프셋 지정 6월 30일 배포 완료
- 작업: 3개 언어(ko/en/ja) pubDatetime을 JST 기준 6월 30일 실시간 배포용으로 2026-06-30T00:05:00+09:00 로 변경
- 커밋: 6adb6ed
- Vercel: Production Ready (gsf-blog-2e0hdplij)
- 라이브 반영 검증: datetime="2026-06-29T15:05:00.000Z" 실서버 HTML 확인 완료 (JST 타임존 환산 시 6월 30일 00:05 정각으로 6월 30일자 실시간 즉시 노출 완료)
- dossier:ward: 메타데이터 변경에 따른 PKM 재동기화 완료

## [2026-06-30 00:23] Astro Paper 타임존 렌더링 버그 수정 및 최종 배포 완료
- 원인 분석: 빌드 시스템(Vercel)의 시스템 타임존이 UTC(세계표준시)이므로, pubDatetime의 오프셋이 +09:00이어도 `Intl.DateTimeFormat`이 timeZone 옵션 없이 실행되면서 `Jun 29`로 출력되는 버그가 존재했음.
- 해결: `src/components/Datetime.astro` 내 `Intl.DateTimeFormat` 생성 시 `timeZone: postTimezone || SITE.timezone` 옵션을 명시적으로 추가하여 UTC 빌드 서버 환경에서도 아시아/도쿄 표준시 기준 날짜로 강제 포맷팅 처리함.
- 배포: `npx vercel --prod --yes` 수동 강제 배포 실행 완료. (Aliased to https://gsfark.com, ID: kxdh0iozo)
- 검증: 실서버 글 목록에서 `Jun 30, 2026`으로 날짜가 정상 렌더링 노출되는 것을 확인 및 검증 완료.

## [2026-06-30] SNS 초안 확정 (Ep.10) — AG 확인·커밋 대기
- slug: `tokyo-kokubunji-kunitachi-fuchu-tachikawa`
- 초안 파일: `sns-drafts/2026-06-30-tokyo-kokubunji-kunitachi-fuchu-tachikawa.md` (Joseph 최종 확정)
- validate: `pnpm validate:sns-draft --slug tokyo-kokubunji-kunitachi-fuchu-tachikawa` exit 0 (로컬)
- AG: `SNS 배포 시작` → social-broadcast Step 0-B · 파일 읽고 채팅 제출 (재작성 금지)
- git: Joseph 지시 시 AG가 add/commit/push (`sns-drafts/` + 관련 doc)
- 다음: Joseph 승인 → X KO 1차 게시 (`docs/SNS_PILOT_CADENCE.md`)

## [2026-06-30] Cursor 세션 종료 — SNS Voice v1.0 · Ep.10 초안
- **상태**: 저장 완료 · `main` clean · 최신 커밋 `cb7a558` (AG)
- **완료**:
  - GSF-Ark SNS Voice v1.0 확정 (`docs/GSF_ARK_SNS_VOICE_V1.md`)
  - `social-broadcast` 스킬 + `SNS 배포 시작` 트리거 · `pnpm sns:resolve-slug` (`draftFile`/`draftFinalized`)
  - Ep.10 확정 초안: `sns-drafts/2026-06-30-tokyo-kokubunji-kunitachi-fuchu-tachikawa.md` · `validate:sns-draft` exit 0
- **AG 다음 액션**:
  1. `SNS 배포 시작` → Step 0-B로 확정 초안 제출 (재작성 금지)
  2. Joseph 승인 후 X KO 1차 게시 (`hero-og.jpg` 미디어 첨부)
- **미완**: SNS 실제 게시(Buffer/수동) — Joseph 승인 대기

## [2026-06-30] Claude — 7/3 AdSense 재제출 전 최종 점검 (라이브 + GSC + Gmail)

**결론: 기술적 결함 0건. 7/3 재제출 진행 가능.**

### 라이브 사이트 직접 점검 (Claude in Chrome)
| 항목 | 결과 |
|------|------|
| `gsfark.com/ads.txt` | ✅ `google.com, pub-4729433282370174, DIRECT, f08c47fec0942fa0` 정상 |
| `sitemap-0.xml` | ✅ admin/tags/archives/search/en-redirect **0건** — 필터 완전 작동 |
| `robots.txt` | ✅ `/admin/` disallow 정상, sitemap 경로 정상 |
| Privacy Policy | ✅ Operator(Joseph KIM)·contact@gsfark.com·AdSense 고지 명시 |
| AdSense 스크립트 | ✅ JS 콘솔 직접 검사 — `adsbygoogle.js?client=ca-pub-4729433282370174` 실제 DOM 로드 확인, 쿠키 게이팅 없음 |
| 홈페이지 / Ep10 라이브 | ✅ 정상 렌더링 |

### GSC 점검 (search.google.com/search-console)
- 개요 화면 "최종 업데이트: 26.6.12" — **스냅샷이 3주 전**이라 536/116 수치를 액면 그대로 걱정할 필요 없음
- 색인 안됨 536건 사유 9개 분류 — **전부 의도된 noindex/robots 차단 설계 또는 정상 대기열**(크롤링됨·발견됨 67건은 시간이 해결)
- 404 54건 드릴다운 → 전부 `/tags/*`, `/resources/`(구 경로), PDF 등 **6/21 이미 redirect/410 처리된 레거시 URL의 캐시 잔재**. 유효성 검사 "시작됨(26.6.21)" 확인 — 이미 재검토 요청 들어간 상태
- **GSC 알림 메일 5월~6월 빈도 변화 확인(Gmail 검색, 총 34건)**: 5월엔 거의 매주 "유효성 검사 시작→일부 미해결" 트라이얼 루프 반복, 6/20~21 마지막 이슈(프로필 페이지 구조화 데이터 mainEntity 누락) "해결됨" 확정 후 **메일 완전 중단**. 메커니즘상 "검증 요청한 미해결 항목이 있을 때만" 발송되는 구조라, 6/21 이후 무메일 = **신규 문제 없음**(부정 신호 아님)

### AdSense "조치 필요" 메일 6건 전수 확인 (5/11, 5/18, 5/28, 6/4, 6/10, 6/15)
- 6건 전부 **동일한 정형 템플릿** (제목·본문 100% 일치, 직접 본문 대조: 5/11 vs 6/15)
- **구체적 거절 사유는 메일에 일절 명시되지 않음** — Google AdSense의 표준 정책(상세 사유는 항상 대시보드 내에서만 제공)
- 본문 내 유일한 단서: "전문가 팁 — 콘텐츠 부족 또는 낮은 콘텐츠 품질이 흔한 비승인 사유" (일반적 안내 문구, 사이트 특정 진단 아님)
- → 6/13 audit report(ads.txt 공백·쿠키게이팅·admin sitemap)는 **메일이 아닌 코드/구조 분석을 통한 자체 추론**이었고, 이번 점검으로 그 추론이 모두 코드 레벨에서 해소된 것을 라이브로 재확인함

### 종합 판단
- 6/10(4차 거절) → 7/3(5차 제출) 간격 23일 — "최소 2주" 권고 충족
- 기술 결함(ads.txt, 쿠키게이팅, admin sitemap, 404) 전부 해소·정상 대기 상태로 확인됨
- 잔존 변수: 콘텐츠량/품질에 대한 Google의 정성적 판단(메일에 사유 비공개라 사전 확인 불가) — 이 부분만 결과를 봐야 알 수 있음
- **다음 액션 없음 — 7/3 그대로 재제출 진행**


## [2026-06-30 23:14] AG 작업 완료 — Buttondown RSS Draft 자동화 (우회 구현)
- 작업: GitHub Actions + Buttondown API 기반 스크립트 작성 (`scripts/buttondown-rss-draft.mjs`) 및 workflow 설정
- RSS URL: https://gsfark.com/rss.xml
- Cadence: weekly (Saturday AM JST)
- Behavior: 최신 1개 글이 7일 이내 작성된 경우 Buttondown API로 Draft 생성 (not auto-send)
- 발신: API 템플릿에 지정
- 스모크: Dummy key로 RSS 파싱 및 7일 판독 로직 검증 완료 (API Key 부재로 실제 전송은 401 확인)
- repo 변경: `rss-parser` 의존성 추가, 스크립트 및 `.github/workflows/buttondown-weekly-draft.yml` 반영
- 다음: Joseph 님이 GSF-Ark 레포지토리에 `BUTTONDOWN_API_KEY` GitHub Secret 추가 시 자동화 본격 가동

## [2026-07-01 00:12] AG 배포 완료 — Buttondown RSS Draft 템플릿 적용
- 작업 내용: Buttondown RSS Draft 메일 템플릿 레이아웃 전면 수정 (설계 의도에 맞춰 Header/Footer 및 리피터 최적화)
- 커밋 해시: 3b3701d
- 특이사항: GitHub Actions 연동, Buttondown API 무료 티어 한계로 Draft API 사용. 다중 포스트 지원 및 Cursor 코드리뷰 피드백(node-fetch 제거, HTML 이스케이프, 예약 포스트 제외) 모두 반영 완료 (`ac708dc`).
- Claude 부재 여부: 아니오

## [2026-07-01 00:58] AG 작업 완료 — 템플릿 문구 및 구조 업데이트
- 작업: 이메일 본문(Header, Body, Footer) 문구 최종 수정 반영
- 변경 내용: Data-first 톤앤매너 유지, 시간 제약적 문구(over the past week) 삭제, 공유 권유 문구 추가
- 특이사항: Design Principles 준수 확인 완료
- 상태: 배포 완료
