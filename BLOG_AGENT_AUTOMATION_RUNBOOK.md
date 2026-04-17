# Blog Agent Automation Runbook

## Endpoint
- `POST /api/blog-agent/workflow`

## Workflow actions
1. `start`  
   - body: `{ "action":"start", "keyword":"..." }`
2. `approve` (gate별 승인 토큰 필요)
   - body: `{ "action":"approve","workflowId":"...","gate":"research","token":"approval-12345678" }`
3. `memo`
   - body: `{ "action":"memo","workflowId":"...","memo":"..." }`
4. `draft_v1`
5. `ko_final` (optional `extraSearchNotes`)
6. `translate`
7. `prepare_publish` (dry-run diff 생성)
8. `approve` with `gate: "publish"`
9. `apply_publish`
10. `sync_ko_draft`
   - body: `{ "action":"sync_ko_draft","workflowId":"...","koMarkdown":"..." }`
11. `sync_translations`
   - body: `{ "action":"sync_translations","workflowId":"...","enMarkdown":"...","jaMarkdown":"..." }`

## Notes
- 상태 파일은 `.blog-agent-workflows/`에 JSON으로 저장됩니다.
- publish staging은 `.blog-agent-stage/`를 사용합니다.
- 생성 파일 경로: `src/data/blog/{ko,en,ja}/{slug}.md`
- 검증: `references ⊆ sources`, `npm run build` 성공 시에만 publish 적용.
- 애드센스 품질 게이트:
  - KO 본문 외부 링크 수 20개 이하
  - 단정/보장형 표현 패턴 차단
  - EN/JA 번역본 유사도 과도 시 차단
  - KO 본문 분량 1800~2300자(한글 글자수 기준)
  - KO/JA 공손체 문장 종결 점검
  - 제목-본문 핵심 토큰 정합성 점검
  - 하드 게이트 미충족 시 즉시 발행 차단

## Telegram commands (GSF_Research_Agent)
- `/blog_help`
- `/blog_start <키워드>`
- `/blog_memo <메모>`
- `/blog_run <draft_v1|ko_final|translate|prepare_publish|apply_publish>`
- `/blog_approve <research|draft_v1|ko_final|translations|publish>`
- `/blog_preview`
- `/blog_auto_next [ko_final 단계에서 optional 추가검색메모]`
- `/blog_status`
- `/blog_cancel`
- `/blog_start_flow <키워드>` (리서치+KO v1 생성 후 Google Docs 초안 생성)
- `/blog_sync` (Docs 본문 -> KO markdown 동기화)
- `/blog_translate` (KO 승인 + EN/JA 생성 + 번역 Docs 생성)
- `/blog_publish` (EN/JA Docs 반영 + 발행 준비/승인/적용)
- 구버전 별칭도 당분간 동작: `/blog_start_docs`, `/blog_sync_docs`, `/blog_translate_docs`, `/blog_publish_docs`

## Docs session mapping
- 파일: `GSF_Research_Agent/.blog_workflow_sessions.json`
- 저장 구조(채팅 단위):
  - `workflow_id`
  - `docs.ko_doc_id`, `docs.ko_doc_url`
  - `docs.en_doc_id`, `docs.en_doc_url`
  - `docs.ja_doc_id`, `docs.ja_doc_url`

## Weekly operations (Balanced: 3 posts/week)
- 월요일: `/blog_start_flow` -> Docs 편집 시작(원문 KO)
- 수요일: `/blog_sync` -> `/blog_translate` 실행
- 금요일: EN/JA 최종 검수 후 `/blog_publish`

## Pilot metrics (3 posts/week)
- 목표 운영량: 주 3편(월/수/금)
- 핵심 지표:
  - 하드 게이트 통과율: 100% (미충족 발행 0건)
  - 1차 발행 성공률: 70% 이상
  - 재작업률: 30% 이하
  - 평균 보완 횟수: 1.5회 이하/포스트
- 주간 기록 포맷:
  - `week`: YYYY-WW
  - `attempted_posts`: 3
  - `published_posts`: n
  - `failed_hard_gates`: [gate names]
  - `avg_iterations_to_publish`: x.x
  - `notes`: 다음 주 개선 액션

## Gate failure remediation
- 발행 실패 시 텔레그램이 항목별 보완 지시문을 자동 출력합니다.
- 우선 조치 순서:
  1) references/sources 무결성
  2) 분량(1800~2300) 및 제목 정합성
  3) tier source(정부/공공/언론) 보강
  4) 단정형 표현 및 면책문구

## LLM KO writer quick setup (Anthropic/OpenAI/Gemini)
1. `apps/blog-agent/.env.llm.example`를 참고해 실제 `.env`(또는 운영 env)에 변수 설정
2. 최소 필수:
   - `BLOG_KO_WRITER_PROVIDER=anthropic|openai|gemini`
   - `BLOG_KO_WRITER_MODEL=<사용 모델>`
   - 각 provider API key (`ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `GEMINI_API_KEY`)
3. 안전장치:
   - API 실패/타임아웃 시 자동으로 기존 템플릿 생성기로 fallback
   - 기존 하드 게이트/점수 게이트는 동일 적용
4. 점검:
   - `draft_v1`, `ko_final` 출력의 `llmMeta.used=true`면 LLM 본문 적용 성공
   - `llmMeta.fallbackReason` 존재 시 fallback 사유 확인
5. 권장 초기 운영:
   - provider: `anthropic`
   - 실패 시 별도 조치 없이 fallback 허용
   - 주 3편 운영 후 점수/재생성률/비용 기준으로 모델 재선정

## One-pass validation scenario (first production check)
1. 사전 준비
   - `BLOG_KO_WRITER_PROVIDER=anthropic`
   - `BLOG_KO_WRITER_MODEL=claude-3-5-sonnet-latest`
   - `ANTHROPIC_API_KEY` 설정
   - 봇/앱 재시작
2. 테스트 입력(텔레그램)
   - `블로그 시작 도쿄 니혼바시 코레도 무로마치 재개발`
   - Docs에서 본문 확인 후 필요한 경우 최소 편집
   - `블로그 동기화`
   - `블로그 발행`
3. 합격 기준
   - `llmMeta.used=true` 또는 fallback이어도 품질 점수 기준 통과
   - Joseph 점수 `>= BLOG_SCORE_THRESHOLD` (기본 80)
   - 하드 게이트 전부 통과
   - 최종 발행 완료 및 slug/targetPaths 생성
4. 실패 시 즉시 조치
   - `llmMeta.fallbackReason` 확인 (키/모델/네트워크 이슈 우선 점검)
   - 점수 미달 항목 기준으로 Docs 본문 보강 후 `블로그 동기화` 재실행
   - 월 예산 상한 도달 시 템플릿 수동 모드로 전환
5. 테스트 종료 기록(권장)
   - `keyword`, `score`, `llmMeta.used`, `fallbackReason`, `published 여부`, `actual_cost_usd`를 로그에 남김

## Pre-publish approval checklist
- KO 본문이 Docs에서 최종 확정되었는지 확인
- `sources`/`references` 누락 및 포함관계(`references ⊆ sources`) 확인
- 정부/공공/언론 출처가 최소 1개 이상 포함되었는지 확인
- 과도한 외부 링크/단정형 표현/번역 중복감 게이트 통과 확인
- 최종 승인자와 승인 시간(텔레그램 승인 로그) 보존 확인

## Public preview link (mobile/external)
- Static preview server:
  - `python3 -m http.server 4343 --directory /Users/gsf/.gemini/antigravity/scratch/apps/blog-agent/public`
- Public tunnel:
  - `cloudflared tunnel --url http://localhost:4343 --no-autoupdate`
- Save tunnel URL to:
  - `/Users/gsf/.gemini/antigravity/scratch/GSF_Research_Agent/.preview_public_url`
- `/blog_preview` reads this URL file and sends external preview link.
