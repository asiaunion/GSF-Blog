# Voice Full — 후속 계획 (별도 트랙)

> **상태:** 초안 · 2026-07-18  
> **상위:** [`SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md`](./SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md) · [`JOSEPH_AUTHENTIC_VOICE.md`](../JOSEPH_AUTHENTIC_VOICE.md) v1.3  
> **관계:** SEO+FA는 Voice Lite만. 본 문서는 본문 전면 Voice 개편용 **별도 계획**.

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

1. #6 Voice Full 파일럿 (Joseph 1줄 승인)
2. FA thin-content 자동등재 slug
3. Wave B 에피소드 중 읽기성 최하위 3편
4. 나머지 백로그는 Gate A 이후

## 성공 기준

- Joseph 라이브 읽기 통과 (중학생 이해·건조함 없음)
- `pnpm validate:post` hard gates PASS
- KO/EN/기존 JA 의미 정합
- ACTIVITY_LOG `hub:log --author=Cursor`
