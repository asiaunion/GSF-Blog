# GSF-Blog 신뢰성·품질 로드맵

**단일 진입점** — 팩트·번역·게이트·AG/Cursor 분업·CI를 한 문서에서 추적합니다.

## 현재 Phase (2026-05-25)

| Phase | 담당 | 상태 | 산출 |
|-------|------|------|------|
| 0 | Cursor | **완료** | 이 문서, trust 게이트, CI, Cursor rule |
| 1 | AG | 대기 | 2.5b 전체 35 Deep/Standard/Light — [`AG_PHASE2_CONTENT_FIX_PROMPT.md`](./AG_PHASE2_CONTENT_FIX_PROMPT.md) |
| 2 | Cursor | 대기 | 3차 전수 + INDEX — [`CURSOR_PHASE3_REVERIFY_PROMPT.md`](./CURSOR_PHASE3_REVERIFY_PROMPT.md) |
| 3 | 사용자 | 대기 | `feat/fact-audit-wave-a` → `main` merge (명시 요청 시) |

## P0–P4 상태 보드

| ID | 우선 | 상태 | 담당 | 링크 |
|----|------|------|------|------|
| P0-1 | P0 | 대기 | AG | AG 2.5b 35 slug |
| P0-2 | P0 | 대기 | Cursor | Phase 3 재검증 |
| P0-3 | P0 | **완료** | Cursor | `pnpm trust:update-index` |
| P0-4 | P0 | 대기 | 사용자 | [`MERGE_READINESS.md`](./MERGE_READINESS.md) |
| P1-1 | P1 | **완료** | Cursor | `blog-validate.yml` + `blog-content-integrity.yml` |
| P1-5a–c | P1 | **완료** | Cursor | `trustGates.ts`, `trust:*` scripts |
| P2-1 | P2 | **완료** | Cursor | trust-en-no-we, trust-ja-no-hangul |
| P2-2 | P2 | **완료** | Cursor | `tiering.ts` score gate |
| P2-3 | P2 | **완료** | Cursor | `blog-content-integrity.yml` |
| P2-4 | P2 | **완료** | Cursor | `BLOG_AGENT_AUTOMATION_RUNBOOK.md` 1200–4000 |
| P3-1 | P3 | **완료** | Cursor | [`MOD_DATETIME_POLICY.md`](./MOD_DATETIME_POLICY.md) |
| P3-3 | P3 | **완료** | Cursor | `pnpm check:source-links` |
| P3-4 | P3 | **완료** | Cursor | `WEEKLY_KPI_REVIEW.md` trust fields |

## 역할 분담

| 작업 | AG | Cursor | 사용자 |
|------|-----|--------|--------|
| KO/EN/JA 초안 | ✓ | | |
| fact sheet Claims | ✓ | 검토 | |
| `pnpm validate:post` | | ✓ | |
| T3 URL 실검증 (UNCERTAIN 해소) | ✓ | ✓ | |
| git commit / deploy | | | 명시 시만 |

**한 번에 한 Phase:** AG 2.5b 진행 중 Cursor가 동일 slug 대량 수정하지 않음.

## 명령어 치트시트

```bash
# 발행 전 (형식 + trust, build 포함)
pnpm validate:post <slug>

# trust만 스킵 (형식 게이트만)
SKIP_TRUST_VERIFY=1 pnpm validate:post <slug>

# 전체 35 — 게이트만 (build·trust 스킵)
pnpm validate:batch

# T1: KO에서 수치 추출
pnpm trust:extract <slug>

# T2: ko/en/ja 수치 parity
pnpm trust:parity <slug>

# T3: 시트 URL ↔ 페이지 숫자 (네트워크)
pnpm trust:verify-sources <slug>

# INDEX validate 열 갱신
pnpm trust:update-index
```

## Trust 게이트 정책 (확정)

- **UNCERTAIN = hard block** (FAIL과 동일, exit ≠ 0)
- 시트 `mlit.go.jp/` 홈만 URL → `trust-tier1-url-specificity` FAIL
- human `Verified [x]` 행은 T3 스킵
- 배치·CI 기본: `SKIP_TRUST_VERIFY=1` (시트 정비 후 단일 slug 검증에서 trust on)

## 신규 글 Definition of Done

1. `docs/fact-audit/<slug>.md` — Claims ≥ extract 개수
2. tier-1 **구체 URL** (홈만 ✓ 금지)
3. `pnpm trust:parity <slug>` exit 0
4. `pnpm validate:post <slug>` exit 0 (trust on)
5. investment/safety → 면책 + `PostDisclaimer` 정책

## 핸드오프 문구

| 상황 | AG → Cursor |
|------|-------------|
| Wave 일부 | 「팩트·번역 AG 수정 완료, Cursor 3차 재검증 대기」 |
| 35 전체 | 「팩트·번역 AG 전량(35) 수정 완료, Cursor 3차 전수 재검증 대기」 |
| Cursor 완료 | 「Cursor 3차 재검증 완료 — validate N/35, 커밋 대기」 |

## 관련 문서

| 문서 | 역할 |
|------|------|
| [`BLOG_AG_CURSOR_WORKFLOW.md`](./BLOG_AG_CURSOR_WORKFLOW.md) | AG/Cursor 파이프라인 |
| [`BLOG_FACT_CHECK_WORKFLOW.md`](./BLOG_FACT_CHECK_WORKFLOW.md) | 팩트 시트·스팟 |
| [`fact-audit/README.md`](./fact-audit/README.md) | 시트 라이프사이클 |
| [`fact-audit/INDEX.md`](./fact-audit/INDEX.md) | slug 대시보드 |
| [`templates/blog-fact-sheet.md`](./templates/blog-fact-sheet.md) | 시트 템플릿 |
| [`CURSOR_PHASE3_REVERIFY_PROMPT.md`](./CURSOR_PHASE3_REVERIFY_PROMPT.md) | 3차 검증 프롬프트 |
| [`AG_PHASE2_5B_HANDOFF.md`](./AG_PHASE2_5B_HANDOFF.md) | AG 35편 수정 체크리스트 |
| [`MERGE_READINESS.md`](./MERGE_READINESS.md) | main merge 전 체크 |
| [`MOD_DATETIME_POLICY.md`](./MOD_DATETIME_POLICY.md) | 팩트 수정 시 modDatetime |
| [`fact-audit/P0_URL_SPOT_CHECKS.md`](./fact-audit/P0_URL_SPOT_CHECKS.md) | P0 URL 스팟 표 |

## 자동화 기대치 (요약)

| Tier | 내용 | 무인 자동 |
|------|------|-----------|
| T0 | 형식·면책·톤 | ~95% |
| T1 | 시트 coverage | ~85–90% |
| T2 | locale parity | ~80–90% |
| T3 | URL 숫자 정합 | ~45–60% / claim |
| T4 | 맥락·최신성 | 사람 필수 |

**목표:** PASS = 강한 신호. 애매한 것만 UNCERTAIN 큐 → AG/Cursor 해소.
