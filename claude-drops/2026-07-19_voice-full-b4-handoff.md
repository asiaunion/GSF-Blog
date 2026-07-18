# Voice Full B4 Handoff — Ep.10 · Ep.11 · 프롤로그 (Wave B 마지막 배치)

> 대상 3편 (보드 순서 11→12→13):
> 1. `tokyo-kokubunji-kunitachi-fuchu-tachikawa` (Ep.10 · Voice 기준선)
> 2. `tokyo-hachioji-hino-akishima` (Ep.11)
> 3. `tokyo-ward-guide-series-prologue` (프롤로그 · title/H2 재터치 금지)
>
> 역할: Claude 주도 · GPT 완성도 리뷰 · AG 반영/1차 검증 · Cursor 최종 검증/배포  
> 전제: #6 파일럿 + B1 + B2 + B3 = 10편 live (2026-07-19) → B4 해제됨  
> 공통 파이프: `claude-drops/2026-07-18_voice-full-pilot-handoff.md` 준용  
> AG 필수 게이트: `claude-drops/2026-07-19_voice-full-b3-handoff.md` §Joseph → AG의 "B2 누락 재발 방지 게이트" 그대로 적용

## slug별 특이 주의

### Ep.10 `tokyo-kokubunji-kunitachi-fuchu-tachikawa` — Voice 기준선 · 최소 개입
- Wave B에서 **FA 대상 0건 + Voice Lite HARD 상한에 준하는 완성도**로 판정된 모범 사례다. 다른 편 수정 시 참고 문안으로 지정됐던 글이다.
- **과편집 금지.** 이미 잘 작동하는 문장을 다시 쓰지 말고, 공통장치 중 실제로 빠진 것(굵은 대표 문장·노트 문장 등)만 최소 보완한다.
- 편집 근거가 약하면 "변경 없음"으로 판정해도 된다. 변경 0건 drop도 유효한 산출물이다.

### Ep.11 `tokyo-hachioji-hino-akishima`
- Wave B drop 대상(Ep.1~10) 밖이라 FA 블라인드 스캔 이력이 없다. **A. 사실층 잠금표를 fact-audit 기준으로 더 꼼꼼히 작성**하고, 편집 중 사실 문장은 의미를 바꾸지 않는다.
- 시 단위(다마 지역) 편이므로 Ep.9·Ep.10의 헤지 패턴(단정형 투자 권유 금지·인구/CAGR 수치 보존)을 그대로 따른다.
- 네이버 초안이 아직 없는 slug다 — AG 단계에서 `naver_blog_gen.py`로 신규 생성한다.

### 프롤로그 `tokyo-ward-guide-series-prologue` — 구조 동결 최상위
- **title·description·H2 재터치 절대 금지** (보드 명시). 시리즈 허브 역할이라 각 편으로 가는 링크·목차 구조도 전부 동결한다.
- Voice Full 대상은 서문과 각 편 소개 문단의 리듬뿐이다. 각 편 소개의 사실 요약(수치·구 이름·핵심 결론)은 해당 편과 어긋나지 않게 유지한다.
- 이미 live인 10편의 새 대표 문장과 모순되는 소개 문구가 있으면 C 섹션에서 지적만 하고(수정은 별도 승인), 임의로 고치지 않는다.

## 1. Joseph → Claude

```text
GSF-Ark Voice Full B4 배치를 시작한다. Wave B 마지막 배치다.

대상 slug (이 순서대로, 한 편씩 drop 완성):
1. tokyo-kokubunji-kunitachi-fuchu-tachikawa
2. tokyo-hachioji-hino-akishima
3. tokyo-ward-guide-series-prologue

너는 주도 편집자다. repo 파일을 직접 확정·commit·deploy하지 말고, 최종 편집 패키지를 slug당 drop 1개로 작성한다.

반드시 읽을 SSOT:
1. docs/s14-sprint/VOICE_FULL_PLAN_2026-07.md
2. docs/s14-sprint/VOICE_FULL_EXECUTION_BOARD_2026-07.md
3. docs/JOSEPH_AUTHENTIC_VOICE.md v1.3
4. docs/s14-sprint/SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md
5. claude-drops/2026-07-19_voice-full-b4-handoff.md (이 파일 — slug별 특이 주의)
6. 각 slug의 docs/fact-audit/<slug>.md
7. 각 slug의 src/data/blog/{ko,en,ja}/<slug>.md
8. 벤치마크: #6 live · Ep.12 reference · 그리고 Ep.10 자신(기준선이므로 자기 기준으로 판단)

목표:
- 사실층과 기존 spine을 유지한다.
- 데이터 저널리즘 70% + 판단 과정 30%, Reader First.
- 공통장치: 대표 문장 1개, 중간 질문 1~2회, 모바일 3줄 문단, 노트 문장 1회, 여운 있는 끝.
- 마무리 표현은 이미 live인 10편과 겹치지 않게 편마다 다르게.
- 허구 현장담·새 사실·새 수치·새 인과·새 단체·새 출처 금지.
- title/description/slug/H2 spine 동결. 프롤로그는 목차·시리즈 링크 구조까지 동결.
- Ep.10은 최소 개입 — 변경 근거가 약하면 "변경 없음" 판정 가능.
- KO 기준 EN/JA 대응 문단을 빠짐없이 제공한다.

drop 파일 (slug당 1개):
claude-drops/2026-07-19_voice-full_tokyo-kokubunji-kunitachi-fuchu-tachikawa.md
claude-drops/2026-07-19_voice-full_tokyo-hachioji-hino-akishima.md
claude-drops/2026-07-19_voice-full_tokyo-ward-guide-series-prologue.md

drop 필수 구조 (파일럿과 동일):
A. 기존 사실층 잠금표
B. 현재 글 진단 (Ep.10은 "이미 충족한 항목" 목록 포함)
C. KO 최종 replacement package (변경 없음 판정 시 그 근거)
D. EN/JA 정확한 대응 replacement package
E. GPT 리뷰 수용표
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
claude-drops/2026-07-19_voice-full_<slug>.md

역할:
- 너는 보조 리뷰어다. 전체 글을 새로 쓰지 않는다.
- 새 사실·새 수치·새 인과·허구 경험을 제안하지 않는다.
- Ep.10은 기준선 글이다 — 편집을 늘리라는 제안보다, Claude의 최소 개입 판단이 타당한지 본다.
- 프롤로그는 title/H2/목차/링크 구조 변경 제안 자체를 금지한다.

점검:
1. 데이터 70 / 판단 과정 30
2. 대표 문장·중간 질문·모바일 3줄 문단·노트 문장·여운 있는 끝
3. 마무리가 live 10편과 겹치지 않는가
4. 은어·숫자 나열·YMYL 권유 잔존 여부
5. 사실층·헤지 문장 보존 여부

출력:
- Fatal / Strong improvement / Keep + 정확한 위치와 최소 수정 제안

리뷰 저장:
claude-drops/2026-07-19_voice-full_<slug>_gpt-review.md
```

## 3. Joseph → Claude (GPT 리뷰 후 · slug별 반복)

```text
네 initial drop과 GPT review를 함께 읽어라.

- GPT 제안을 자동 수용하지 말고 E. 수용표에 채택/기각/이유를 적는다.
- 새 사실·새 수치·허구 경험을 포함한 제안은 기각한다.
- Ep.10에서 편집량을 늘리는 제안은 근거가 명확할 때만 채택한다.
- 채택한 최소 수정만 C/D 최종 패키지에 통합한다.
- 파일 끝에 `status: claude-final`을 적고 저장한다.
- repo 파일 직접 수정 금지.
```

## 4. Joseph → AG (Claude final 후 · slug별 반복)

```text
Voice Full B4 <slug> 최종 패키지를 repo에 반영한다.

입력:
- claude-drops/2026-07-19_voice-full_<slug>.md (`status: claude-final`)
- claude-drops/2026-07-19_voice-full_<slug>_gpt-review.md

반영 범위:
- src/data/blog/{ko,en,ja}/<slug>.md
- docs/fact-audit/<slug>.md (실제 필요할 때만)
- naver-drafts/<slug>-naver.html 및 .txt (Ep.11은 신규 생성)
- VOICE_FULL_EXECUTION_BOARD_2026-07.md 해당 행 → `ag-applied`

HARD:
- Claude final 밖의 새 문장·새 수치·새 출처 추가 금지.
- title/description/slug/H2 spine 변경 금지. 프롤로그는 목차·링크 구조까지 금지.
- Ep.10 "변경 없음" 판정 항목은 그대로 둔다.
- commit·deploy 금지.

B2 누락 재발 방지 필수 게이트 (B3와 동일):
1. KO/EN/JA 세 파일 각각 git diff 증빙.
2. Claude D의 EN/JA replacement 항목별 반영 체크.
3. python3 scripts/naver_blog_gen.py --slug <slug> 재생성 (반영 직후 실행).
4. Naver HTML에서 KO 신규 문장 검색 증빙.
5. SKIP_TRUST_VERIFY=1 pnpm validate:post <slug> → 100/PASS까지.

완료 보고:
slug별 변경 파일 · 3로케일 diff 증빙 · Naver 재생성 증빙 · validate 결과 ·
Claude final과 달라진 부분(lint 등) · Cursor 확인 필요점.
```

## 5. Cursor 최종 게이트 (slug별)

- Claude final ↔ GPT review ↔ AG diff 추적.
- 3로케일 대응·Naver 최신 본문 동기화 확인 (AG 재생성이 구본문 기준이면 Cursor가 재실행).
- 새 사실/수치/인과/허구 경험 0 · Ep.10 최소 개입 준수 · 프롤로그 구조 동결.
- spine·title·description 동결, slug별 validate 100/PASS, build PASS.
- commit → prod → 라이브 확인 → IndexNow(9 URL) → 보드 `live` → hub:log.
- B4 3편 live = **Wave B 13편 전체 완료** → Wave A(A1~A3) 해제 여부를 Joseph에게 확인.
