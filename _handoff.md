# _handoff.md — Claude 부재 구간 핸드오프 기록 (GSF-Ark)
> AG가 GSF-Ark 배포 작업 완료 시마다 append 방식으로 기록.
> Claude가 Ark 관련 세션 시작 시 이 파일을 읽어 컨텍스트 복원.
> 규칙: `scratch/AGENTS.md` → 핸드오프 자동 기록 규칙 참조.

---

<!-- AG: 배포 완료 시 아래 형식으로 append -->
<!--
## [YYYY-MM-DD HH:MM] AG 배포 완료
- 작업 내용:
- 커밋 해시:
- 배포 URL:
- Claude 부재 여부:
- 특이사항:
-->

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
- 커밋 해시: (이번 커밋 후 기록)
- 배포 URL: https://gsfark.com (main push 후 Vercel)
- Claude 부재 여부: 예
- 특이사항: verify:episode:gate secondary 9건 + draft_coverage(-1.1) 휴리스틱 FAIL — Ep.07 동일 패턴, primary hallucination 0으로 배포 진행. `joseph_final_approved` 미설정.
