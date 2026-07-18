# Voice Full B3 Handoff — Ep.6 · Ep.7 · Ep.8

> 대상: `tokyo-taito-sumida-koto` → `tokyo-kita-arakawa-itabashi-nerima` → `tokyo-adachi-katsushika-edogawa`
> 역할: Claude 주도 → GPT 완성도 리뷰 → Claude final → AG 반영/1차 검증 → Cursor 최종 검증/배포
> 전제: #6 파일럿과 B1·B2 live 완료 → Joseph B3 해제 (2026-07-19)
> 공통 파이프: `claude-drops/2026-07-18_voice-full-pilot-handoff.md`

## slug별 잠금 사항

### Ep.6 `tokyo-taito-sumida-koto`
- Wave B FA에서 무출처 지진 위험의 단정형 표현을 헤지했다. **위험 등급·안전성 단정을 되살리거나 새로 만들지 않는다.**
- 재개발·교통·가격 수치와 출처는 현재 fact-audit 기준으로 동결한다.

### Ep.7 `tokyo-kita-arakawa-itabashi-nerima`
- Wave B FA 대상 0건으로 판정된 글이다. **교정할 사실을 찾는 작업이 아니라 Voice 리듬 개선만 수행한다.**
- 기존의 지진·재해 관련 헤지 문장은 안전한 기준 문안이므로 의미를 강화하거나 약화하지 않는다.

### Ep.8 `tokyo-adachi-katsushika-edogawa`
- Wave B FA 대상 0건으로 판정된 글이다. **현재 사실층·면책·출처를 그대로 잠근다.**
- 저가·수익률·성장 가능성을 투자 권유나 보장으로 바꾸지 않는다.

## Joseph → Claude

```text
GSF-Ark Voice Full B3 배치를 시작한다.

대상(순서 고정):
1. tokyo-taito-sumida-koto
2. tokyo-kita-arakawa-itabashi-nerima
3. tokyo-adachi-katsushika-edogawa

너는 주도 편집자다. repo 파일을 직접 수정·commit·deploy하지 말고 slug당 drop 1개를 작성한다.

반드시 읽기:
- docs/s14-sprint/VOICE_FULL_PLAN_2026-07.md
- docs/s14-sprint/VOICE_FULL_EXECUTION_BOARD_2026-07.md
- docs/JOSEPH_AUTHENTIC_VOICE.md v1.3
- docs/s14-sprint/SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md
- claude-drops/2026-07-19_voice-full-b3-handoff.md
- 각 slug의 docs/fact-audit/<slug>.md
- 각 slug의 src/data/blog/{ko,en,ja}/<slug>.md
- 벤치마크: #6 live, B1 Ep.9 live, Ep.12 reference

목표:
- 데이터 저널리즘 70% + 판단 과정 30%, Reader First.
- 대표 문장 1개, 중간 질문 1~2회, 모바일 3줄 문단, 노트 문장 1회, 여운 있는 끝.
- 이전 7편의 종결 패턴과 겹치지 않게 편마다 마무리를 다르게 한다.
- title/description/slug/H2 spine과 현재 사실층·수치·출처·면책을 동결한다.
- 허구 현장담·새 사실·새 수치·새 인과·새 단체·새 출처 금지.
- Ep.6 지진 위험 단정 회귀 금지. Ep.7·8은 FA-zero 기준을 훼손하지 않는다.
- KO 기준 EN/JA 대응 문단을 빠짐없이 제공한다.

drop:
- claude-drops/2026-07-19_voice-full_tokyo-taito-sumida-koto.md
- claude-drops/2026-07-19_voice-full_tokyo-kita-arakawa-itabashi-nerima.md
- claude-drops/2026-07-19_voice-full_tokyo-adachi-katsushika-edogawa.md

필수 구조:
A. 사실층 잠금표
B. 현재 글 진단
C. KO 최종 replacement package
D. EN/JA 정확한 대응 replacement package
E. GPT 리뷰 수용표
F. Voice Full 자가체크
G. 새 사실·삭제 claim·H2 변경 수

HARD:
- claim 삭제 ≥5 또는 H2 구조 변경 시 중단하고 Joseph 승인 요청.
- 대체 사실 서술 신설 금지.
- 허구 1인칭(가보니·체감상 등) 금지.
- KO `반드시`, EN `guaranteed`, JA `絶対に` 금지.
- 완료 후 drop만 저장하고 「저장하고 세션 종료」.
```

## Joseph → GPT (slug별)

```text
Claude의 `claude-drops/2026-07-19_voice-full_<slug>.md`를 읽고 완성도만 리뷰한다.
전체 재작성·새 자료 조사·새 사실/수치/인과/경험 제안은 금지한다.

점검: 70/30, Reader First, 대표 문장, 중간 질문, 모바일 문단, 노트 문장,
서로 다른 종결, YMYL 권유, FA 교정 회귀(Ep.6 지진 단정·Ep.7/8 FA-zero).

출력은 Fatal / Strong improvement / Keep + 정확한 위치와 최소 수정.
저장: claude-drops/2026-07-19_voice-full_<slug>_gpt-review.md
```

## Joseph → Claude (GPT 리뷰 후)

```text
GPT 제안을 자동 수용하지 않는다. E 표에 채택/부분채택/기각과 이유를 기록한다.
새 사실·수치·인과·허구 경험 제안은 기각한다.
채택한 최소 수정만 C/D에 통합하고 파일 끝에 `status: claude-final`을 적는다.
repo 파일 직접 수정 금지.
```

## Joseph → AG (Claude final 후)

```text
Voice Full B3 최종 패키지를 slug별로 반영한다.

입력:
- claude-drops/2026-07-19_voice-full_<slug>.md (`status: claude-final`)
- claude-drops/2026-07-19_voice-full_<slug>_gpt-review.md

반영:
- src/data/blog/{ko,en,ja}/<slug>.md
- docs/fact-audit/<slug>.md (실제 필요할 때만)
- naver-drafts/<slug>-naver.html 및 .txt
- VOICE_FULL_EXECUTION_BOARD_2026-07.md → `ag-applied`

HARD:
- Claude final 밖의 문장·수치·출처 추가 금지.
- title/description/slug/H2 spine 변경 금지.
- commit·deploy 금지.

B2 누락 재발 방지 필수 게이트:
1. KO/EN/JA 세 파일 각각 `git diff --stat`과 변경 문단 존재를 확인한다.
2. Claude D의 EN/JA replacement가 모두 반영됐는지 항목별 체크한다.
3. `python3 scripts/naver_blog_gen.py --slug <slug>`로 HTML/TXT를 재생성한다.
4. Naver HTML에서 KO 신규 대표 문장 또는 종결 문장을 검색해 동기화를 증명한다.
5. `SKIP_TRUST_VERIFY=1 pnpm validate:post <slug>` → 100/PASS까지 수정한다.

완료 보고에는 slug별 변경 파일, 3로케일 diff 증빙, Naver 재생성 증빙,
validate 결과, Claude final과 달라진 lint 수정, Cursor 확인점을 적는다.
```

## Cursor 최종 게이트

- Claude final ↔ GPT review ↔ AG diff 추적.
- 세 로케일 대응 문단과 Naver 동기화 확인.
- 새 사실/수치/인과/허구 경험 0, Ep.6 지진 단정 회귀 0, Ep.7·8 FA-zero 유지.
- spine/title/description 동결, slug별 validate 100/PASS, build PASS.
- commit → prod → 라이브 확인 → IndexNow(9 URL) → 보드 `live` → hub:log.
- B3 3편 live 후 B4 해제 여부를 Joseph에게 확인.
