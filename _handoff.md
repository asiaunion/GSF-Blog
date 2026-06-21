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

## [2026-06-21 22:20] AG 작업 완료 (Phase A / 배포 대기)
- 작업 내용: E-E-A-T 에세이 2편(Checklist) & 3편(Nihonbashi) Phase A 완료. EN/KO/JA 번역 및 검수, 화자 일치, MLIT 팩트시트 보강, 히어로/OG 이미지 점검 완료.
- 커밋 해시: 67ba48a
- 배포 URL: N/A (현재 `draft: true`)
- Claude 부재 여부: 아니오 (AG가 직접 로그 작성)
- 특이사항: `validate:post` 검증 통과 (exit 0). `feat/eeat-essay-2-3-phase-a` 브랜치에 저장 상태. 6/26(2편), 7/3(3편)에 각각 `draft: false` 전환 및 main merge 진행 예정.
