# Voice Full — 후속 계획 (별도 트랙)

> **상태:** Joseph 실행 승인 · Wave A+B 전면 확장 · 2026-07-18  
> **상위:** [`SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md`](./SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md) · [`JOSEPH_AUTHENTIC_VOICE.md`](../JOSEPH_AUTHENTIC_VOICE.md) v1.3  
> **관계:** SEO+FA는 Voice Lite만. 본 문서는 본문 전면 Voice 개편용 **별도 계획**.

## Joseph 잠금 (2026-07-18)

- 범위: **Wave A + Wave B 합집합 전체**. Ep.12는 이미 Voice Full 기준 글이므로 재작성하지 않고 reference/최종 대조에 사용한다.
- 주도: **Claude** — 사실층을 바꾸지 않는 Voice Full 편집 패키지 작성·통합.
- 보조: **GPT** — Claude 패키지를 읽고 완성도·Reader First·리듬·공통장치 누락만 리뷰한다. 새 사실·새 수치·허구 경험은 제안하지 않는다.
- 반영: **AG** — Cursor가 넘긴 승인 패키지의 KO/EN/JA·fact-audit·Naver 반영, 1차 validate와 수정 반복을 최대한 담당한다.
- 최종: **Cursor** — diff·사실층 보존·로케일 의미 정합·hard gate·build/prod/IndexNow만 검증한다.
- 페이싱: #6 파일럿 → Joseph 라이브 읽기 통과 → 2~3 slug/배치. 일일 상한은 없으나 수십 편 일괄 변경은 금지한다.
- 기존 계획의 「나머지는 Gate A 이후」는 이번 Joseph 명시 승인으로 대체한다. title 대량 변경·AdSense 재신청 금지는 유지한다.

---

## 목적

기존 글의 spine을 유지하면서도, Ep.12 벤치마크 수준의 **데이터 저널리즘 70% + 사고 과정 30%** 문체를 본문 전체에 적용한다.

## 비목적

- SEO §1–4만의 표면 refresh (그건 SEO+FA 트랙)
- 새 수치·새 인과 가설 창작
- Gate A 전 AdSense 재신청
- ~07-29 동결 중 대량 title 변경

## 우선순위 큐 (자동 등재 규칙)

SEO+FA에서 아래가 발생하면 이 큐 **상위**에 올린다.

1. FA 삭제 claim ≥5건으로 구조가 얇아짐
2. `scan:md`/사실 교정 후 본문이 정보 밀도 대비 읽기 흐름이 깨짐
3. Joseph가 Reader First 전면 편집을 지목

### 현재 상위

| 우선 | slug | 등재 사유 | 상태 |
|------|------|-----------|------|
| 1 | `tokyo-korean-community-beyond-shinokubo` | 미검증 claim 다수 삭제로 구조·분량 재평가 | queued |
| — | Ep.12 `tokyo-machida-tama-inagi` | Voice Full 벤치마크 (이미 적용) | reference |

## 적용 HARD

- Voice SSOT = JOSEPH_AUTHENTIC_VOICE **최신 잠금본** (SEO+FA Lite와 달리 Full은 Voice 개정 반영 가능)
- 공통장치: 시그니처 라인 · 중간 질문 · 3줄 문단 · 노트 문장 · 여운 있는 끝
- KO 한자 병기: 손댄 지명·법률 용어 첫 등장
- 사실층은 FA PASS 이후에만 문체 개편
- 삭제·대체 서술 신설은 SEO+FA와 동일 HARD (Joseph 에스컬레이션)

## 실행 순서 (제안)

1. #6 Voice Full 파일럿 (**Joseph 승인 완료**)  
   Claude 초안 → GPT 완성도 리뷰 → Claude 최종 패키지 → AG 반영/1차 validate → Cursor 최종 검증 → Joseph 라이브 읽기.
2. Wave B 읽기성·FA 영향 우선: Ep.1 · Ep.2 · Ep.9.
3. Wave B 잔여: Ep.3–8 · Ep.10–11 · 프롤로그. Ep.12는 reference.
4. Wave A 잔여를 YMYL/허브 위험도 기준으로 2~3편씩 진행.

## 역할별 산출물

| 단계 | 담당 | 산출물 | 금지 |
|------|------|--------|------|
| V1 | Claude | slug별 `claude-drops/YYYY-MM-DD_voice-full_{slug}.md` 최종 편집 패키지 | repo 직접 확정·deploy |
| V2 | GPT | `gpt-reviews/YYYY-MM-DD_voice-full_{slug}.md` 완성도 리뷰 | 사실 추가·전면 대필 |
| V3 | Claude | GPT 채택/기각표 + 최종 KO/EN/JA 의미 지시 | 출처 없는 새 claim |
| V4 | AG | repo 반영 · fact-audit/Naver 정합 · 1차 validate | commit·prod |
| V5 | Cursor | diff audit · 최종 validate/build · commit/prod/IndexNow | 문체 초안 재작성 |

### Cursor 토큰 절약 HARD

- Cursor는 원칙적으로 **초안 작성·번역·Naver 변환·반복 validate 수정**을 하지 않는다.
- AG가 처리할 수 있는 파일 반영·로케일 동기화·검증 오류 수정은 AG로 돌린다.
- Cursor는 문제가 있는 문장과 게이트만 반려하고, 수정 원문은 Claude/AG가 다시 낸다.
- 예외: T0 사실 오류·작은 기계적 수정·AG 장애는 Cursor가 D5 백업한다.

## 성공 기준

- Joseph 라이브 읽기 통과 (중학생 이해·건조함 없음)
- `pnpm validate:post` hard gates PASS
- KO/EN/기존 JA 의미 정합
- ACTIVITY_LOG `hub:log --author=Cursor`
