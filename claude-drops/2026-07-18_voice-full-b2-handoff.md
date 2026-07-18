# Voice Full B2 Handoff — Ep.3 · Ep.4 · Ep.5

> 대상 3편 (보드 순서 5→6→7):
> 1. `tokyo-meguro-setagaya` (Ep.3)
> 2. `tokyo-shinagawa-ota` (Ep.4)
> 3. `tokyo-toshima-nakano-suginami` (Ep.5)
>
> 역할: Claude 주도 · GPT 완성도 리뷰 · AG 반영/1차 검증 · Cursor 최종 검증/배포  
> 전제: #6 파일럿 + B1(Ep.1/2/9) live 완료 (2026-07-18) → B2 해제됨  
> 파이프·HARD 규칙은 파일럿과 동일: `claude-drops/2026-07-18_voice-full-pilot-handoff.md` 준용  
> B1 실무 선례: `claude-drops/2026-07-18_voice-full-b1-handoff.md`

## slug별 특이 주의 (Wave B FA 이력 반영)

### Ep.3 `tokyo-meguro-setagaya` — 출처 정합 기준점
- Wave B에서 Ep.3부터 구별 소득에 올바른 총무성 자료를 사용했다(Ep.1·Ep.2의 NTA 오출처 패턴이 여기서 교정됨). **현재 출처 매핑이 기준이며, 수치·출처를 건드리지 말 것.**
- FA 대상은 크지 않음 — Voice Full의 주 타깃은 읽기 리듬·판단 과정.

### Ep.4 `tokyo-shinagawa-ota` — 시의성 단정 주의
- Wave B에서 "리니어 신칸센 2027년 개통"류의 무출처+시의성 오류 소지 있는 구체 연도 단정을 교정/헤지했다. **개통 시점·연도 단정을 되살리거나 새로 추가하지 말 것.** 미래 인프라는 헤지형(예: "개통 예정"·"계획 단계") 유지.

### Ep.5 `tokyo-toshima-nakano-suginami` — YMYL 톤 주의
- Wave B에서 YMYL 근접 단정형 투자 권유 어휘("뿐입니다"·"정답입니다"·"강력히 추천")를 제거/완화했다. **Voice Full에서 판단 과정은 살리되 투자 권유 톤으로 회귀 금지.** (B1 Ep.9에서 적용한 "강력히 추천→눈여겨볼 만하다" 헤지 패턴 참고.)

## 1. Joseph → Claude

```text
GSF-Ark Voice Full B2 배치를 시작한다. #6 파일럿·B1과 동일 파이프다.

대상 slug (이 순서대로, 한 편씩 drop 완성):
1. tokyo-meguro-setagaya
2. tokyo-shinagawa-ota
3. tokyo-toshima-nakano-suginami

너는 주도 편집자다. repo 파일을 직접 확정·commit·deploy하지 말고, 최종 편집 패키지를 slug당 drop 1개로 작성한다.

반드시 읽을 SSOT:
1. docs/s14-sprint/VOICE_FULL_PLAN_2026-07.md
2. docs/s14-sprint/VOICE_FULL_EXECUTION_BOARD_2026-07.md
3. docs/JOSEPH_AUTHENTIC_VOICE.md v1.3
4. docs/s14-sprint/SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md
5. claude-drops/2026-07-18_voice-full-b2-handoff.md (이 파일 — slug별 특이 주의)
6. 각 slug의 docs/fact-audit/<slug>.md
7. 각 slug의 src/data/blog/{ko,en,ja}/<slug>.md
8. 완성 벤치마크: src/data/blog/ko/tokyo-korean-community-beyond-shinokubo.md (#6 live)
   · src/data/blog/ko/tokyo-musashino-mitaka-chofu.md (B1 Ep.9 live)
   · src/data/blog/ko/tokyo-machida-tama-inagi.md (Ep.12 reference)

목표:
- 사실층과 기존 spine을 유지한다.
- 데이터 저널리즘 70% + 판단 과정 30%.
- 중학생도 따라오는 Reader First.
- 공통장치: 대표 문장 1개, 중간 질문 1~2회, 모바일 3줄 문단, 노트 문장 1회, 여운 있는 끝.
- 마무리 표현은 편마다 다르게(#6·B1처럼 "판단 기준형/관찰·기록형/개인 판단형" 등 반복 회피).
- 허구 현장담·지어낸 경험·새 수치·새 인과·새 단체·새 출처 금지.
- title/description/slug/H2 spine은 변경하지 않는다.
- Wave B FA에서 교정·삭제·헤지된 서술을 되살리지 않는다:
  · Ep.3 출처 매핑 동결(총무성 자료)
  · Ep.4 리니어 등 미래 인프라 연도 단정 금지(헤지 유지)
  · Ep.5 투자 권유 단정 어휘 회귀 금지
- KO를 기준으로 EN/JA 의미 정합 지시를 함께 낸다.

drop 파일 (slug당 1개):
claude-drops/2026-07-18_voice-full_tokyo-meguro-setagaya.md
claude-drops/2026-07-18_voice-full_tokyo-shinagawa-ota.md
claude-drops/2026-07-18_voice-full_tokyo-toshima-nakano-suginami.md

drop 필수 구조 (파일럿과 동일):
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
- 3편 drop 완료 후 「저장하고 세션 종료」.
```

## 2. Joseph → GPT (Claude initial drop 완료 후 · slug별 반복)

```text
아래 Claude Voice Full drop을 읽고 글의 완성도만 리뷰해줘.

대상:
claude-drops/2026-07-18_voice-full_<slug>.md

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
8. Wave B FA에서 제거·교정한 claim이 되살아났는가(Ep.4 연도 단정·Ep.5 권유 어휘 특히)

출력:
- Fatal(반드시 수정) / Strong improvement(권장) / Keep(잘된 부분)
- 정확한 위치 + 최소 수정 제안

리뷰 저장:
claude-drops/2026-07-18_voice-full_<slug>_gpt-review.md
```

## 3. Joseph → Claude (GPT 리뷰 후 · slug별 반복)

```text
네 initial drop과 GPT review를 함께 읽어라.

- GPT 제안을 자동 수용하지 말고 E. 수용표에 채택/기각/이유를 적는다.
- 새 사실·새 수치·허구 경험을 포함한 제안은 기각한다.
- 채택한 최소 수정만 C/D 최종 패키지에 통합한다.
- 파일 끝에 `status: claude-final`을 적고 저장한다.
- repo 파일 직접 수정 금지.
```

## 4. Joseph → AG (Claude final 후 · slug별 반복)

```text
Voice Full B2 <slug> 최종 패키지를 repo에 반영한다.

입력:
- claude-drops/2026-07-18_voice-full_<slug>.md (`status: claude-final`)
- claude-drops/2026-07-18_voice-full_<slug>_gpt-review.md

반영 범위:
- src/data/blog/{ko,en,ja}/<slug>.md
- docs/fact-audit/<slug>.md (변경 필요 시)
- naver-drafts/<slug>-naver.html
- docs/s14-sprint/VOICE_FULL_EXECUTION_BOARD_2026-07.md 해당 행 상태를 `ag-applied`로

HARD:
- Claude final 밖의 새 문장·새 수치·새 출처 추가 금지.
- title/description/slug/H2 spine 변경 금지.
- KO 기준 EN/JA 의미 정합.
- commit·deploy 금지.

1차 검증:
SKIP_TRUST_VERIFY=1 pnpm validate:post <slug>
실패하면 패키지 범위 안에서 고쳐 PASS까지 반복.

완료 보고:
변경 파일 · validate 결과 · Claude final과 달라진 부분 · Cursor 확인 필요점.
```

## 5. Cursor 최종 게이트 (slug별)

- Claude final ↔ GPT review ↔ AG diff 추적.
- 새 사실/수치/인과/허구 경험 0 · Wave B FA 교정 서술 회귀 0(Ep.4 연도·Ep.5 권유 특히).
- KO/EN/JA 의미 정합 · spine·title·description 동결.
- `pnpm validate:post` 100/PASS, build PASS.
- commit → prod → 라이브 확인 → IndexNow(ko/en/ja) → 보드 `live` → hub:log.
- B2 3편 모두 live 후 B3 해제 여부를 Joseph에게 확인.
