# Voice Full Pilot Handoff — #6

> 대상: `tokyo-korean-community-beyond-shinokubo`  
> 역할: Claude 주도 · GPT 완성도 리뷰 · AG 반영/1차 검증 · Cursor 최종 검증  
> Joseph 승인: 2026-07-18

## 1. Joseph → Claude

```text
GSF-Ark Voice Full 파일럿을 시작한다.

대상 slug:
tokyo-korean-community-beyond-shinokubo

너는 주도 편집자다. repo 파일을 직접 확정·commit·deploy하지 말고, 최종 편집 패키지를 drop으로 작성한다.

반드시 읽을 SSOT:
1. docs/s14-sprint/VOICE_FULL_PLAN_2026-07.md
2. docs/s14-sprint/VOICE_FULL_EXECUTION_BOARD_2026-07.md
3. docs/JOSEPH_AUTHENTIC_VOICE.md v1.3
4. docs/s14-sprint/SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md
5. docs/fact-audit/tokyo-korean-community-beyond-shinokubo.md
6. src/data/blog/{ko,en,ja}/tokyo-korean-community-beyond-shinokubo.md

목표:
- 사실층과 기존 spine을 유지한다.
- 데이터 저널리즘 70% + 판단 과정 30%.
- 중학생도 따라오는 Reader First.
- 공통장치: 대표 문장 1개, 중간 질문 1~2회, 모바일 3줄 문단, 노트 문장 1회, 여운 있는 끝.
- 허구 현장담·지어낸 경험·새 수치·새 인과·새 단체·새 출처 금지.
- title/description/slug/H2 spine은 변경하지 않는다.
- 기존 FA에서 삭제된 미검증 인구·투자 주장을 되살리지 않는다.
- KO를 기준으로 EN/JA 의미 정합 지시를 함께 낸다.

drop 파일:
claude-drops/2026-07-18_voice-full_tokyo-korean-community-beyond-shinokubo.md

drop 필수 구조:
A. 기존 사실층 잠금표 — 유지해야 할 수치·단체·출처·면책
B. 현재 글 진단 — 건조함/점프/은어/숫자 나열/공통장치 누락
C. KO 최종 편집본 또는 정확한 문단별 replacement package
D. EN/JA 의미 정합 지시
E. GPT 리뷰 수용표 자리(제안/채택/기각/이유)
F. Voice Full 자가체크
G. 변경 요약 — 새 사실 0, 삭제 claim 수, H2 변경 수

HARD:
- claim 삭제 ≥5 또는 H2 구조 변경이면 즉시 중단하고 Joseph 승인 필요를 명시.
- 대체 사실 서술 신설 금지.
- 「가보니」「체감상」 같은 허구 1인칭 금지.
- KO `반드시`, EN `guaranteed`, JA `絶対に` 금지.
- 완료 후 drop만 저장하고 「저장하고 세션 종료」.
```

## 2. Joseph → GPT (Claude initial drop 완료 후)

```text
아래 Claude Voice Full drop을 읽고 글의 완성도만 리뷰해줘.

대상:
claude-drops/2026-07-18_voice-full_tokyo-korean-community-beyond-shinokubo.md

역할:
- 너는 보조 리뷰어다. 전체 글을 새로 쓰지 않는다.
- 사실 검증·새 자료 조사보다 Reader First와 Joseph Voice 완성도를 본다.
- 새 사실·새 수치·새 인과·허구 경험을 제안하지 않는다.

점검:
1. 데이터 70 / 판단 과정 30이 실제로 느껴지는가
2. 대표 문장이 기억에 남는가
3. 중간 질문 1~2개가 독자를 끄는가
4. 문단이 모바일 3줄 안팎인가
5. 노트 문장이 과장 없이 사고 변화를 보여주는가
6. 마지막이 요약문이 아니라 여운 있는 질문/관찰인가
7. 은어·내부 코드·숫자 나열·YMYL 권유가 남았는가
8. 기존 FA에서 제거한 claim이 되살아났는가

출력:
- Fatal(반드시 수정)
- Strong improvement(권장)
- Keep(잘된 부분)
- 정확한 위치 + 최소 수정 제안

리뷰 저장:
claude-drops/2026-07-18_voice-full_tokyo-korean-community-beyond-shinokubo_gpt-review.md
```

## 3. Joseph → Claude (GPT 리뷰 후)

```text
네 initial drop과 GPT review를 함께 읽어라.

- GPT 제안을 자동 수용하지 말고 E. 수용표에 채택/기각/이유를 적는다.
- 새 사실·새 수치·허구 경험을 포함한 제안은 기각한다.
- 채택한 최소 수정만 C/D 최종 패키지에 통합한다.
- 파일 끝에 `status: claude-final`을 적고 저장한다.
- repo 파일 직접 수정 금지.
```

## 4. Joseph → AG (Claude final 후)

```text
Voice Full #6 최종 패키지를 repo에 반영한다.

입력:
- claude-drops/2026-07-18_voice-full_tokyo-korean-community-beyond-shinokubo.md (`status: claude-final`)
- claude-drops/2026-07-18_voice-full_tokyo-korean-community-beyond-shinokubo_gpt-review.md

반영 범위:
- src/data/blog/ko/en/ja/tokyo-korean-community-beyond-shinokubo.md
- docs/fact-audit/tokyo-korean-community-beyond-shinokubo.md
- naver-drafts/tokyo-korean-community-beyond-shinokubo-naver.html
- docs/s14-sprint/VOICE_FULL_EXECUTION_BOARD_2026-07.md 상태를 `ag-applied`로

HARD:
- Claude final 밖의 새 문장·새 수치·새 출처 추가 금지.
- title/description/slug/H2 spine 변경 금지.
- KO 기준 EN/JA 의미 정합.
- commit·deploy 금지.

1차 검증:
pnpm validate:post tokyo-korean-community-beyond-shinokubo
실패하면 패키지 범위 안에서 고쳐 PASS까지 반복.

완료 보고:
변경 파일 · validate 결과 · Claude final과 달라진 부분 · Cursor 확인 필요점.
```

## 5. Cursor 최종 게이트

- Claude final ↔ GPT review ↔ AG diff 추적.
- 새 사실/수치/인과/허구 경험 0.
- KO/EN/JA 의미 정합.
- fact-audit·Naver 정합.
- `pnpm validate:post` hard gates 100, build PASS.
- Joseph 라이브 읽기 통과 후 commit/prod/IndexNow 및 다음 B1 배치 해제.
