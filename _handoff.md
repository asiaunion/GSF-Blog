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
