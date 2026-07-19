# Voice Full A3 Handoff — Wave A 마지막 배치 (시장·허브·워킹 3편)

> 대상 3편 (보드 순서 20→21→22):
> 1. `tokyo-office-vacancy-five-wards-2026` (#9 · 오피스 시장)
> 2. `tokyo-real-estate-investment-complete-guide` (#4 · 시리즈 허브)
> 3. `nihonbashi-hamacho-walking-guide` (#10 · 장소·일정)
>
> 역할: Claude 주도 · GPT 완성도 리뷰 · Claude 통합 · AG 반영/1차 검증 · Cursor 최종 검증/배포  
> 전제: Joseph **A3 해제** (2026-07-19). A2 AG 반영과 독립적으로 Claude drop만 착수한다.  
> 공통 파이프: `claude-drops/2026-07-19_voice-full-a2-handoff.md` 준용.  
> AG Launch 게이트: Claude final 뒤 Joseph 또는 Cursor의 명시적 착수 지시 전 repo 반영 금지.  
> 페이싱: 3편을 slug별 순차 처리하며 일괄 본문 재작성 금지.

## Wave A 공통 HARD

- 사실·수치·출처·헤지·장소 일정의 의미 보존이 Voice보다 우선한다.
- title · description · slug · H2 spine 동결.
- SEO+FA에서 교정·삭제·헤지한 문장 회귀 금지.
- 새 사실·새 수치·새 인과·새 단체·새 출처·허구 경험 금지.
- 투자 권유·수익 보장·장소/개장 상태 단정 강화 금지.
- claim 삭제 ≥5 또는 H2 구조 변경이면 즉시 중단하고 Joseph 승인을 요청한다.
- KO 기준 EN/JA 대응 replacement를 빠짐없이 제공한다.
- 이미 Voice Full 공통장치를 충족하면 변경 없음 또는 최소 개입 판정이 우선한다.

## slug별 특이 주의

### 1) `tokyo-office-vacancy-five-wards-2026`

- **2.22%는 2026년 3월 월별 수치**다. Q1·분기 평균으로 바꾸지 않는다.
- 미키 상사 원자료는 공실률과 평균 **모집 임대료**만 제공한다. 실효 임대료·프리렌트·협상력·건물 등급별 수요를 확인한 자료처럼 쓰지 않는다.
- REINS 주택 매매 자료를 오피스 임대 교차검증으로 되살리지 않는다.
- 2026년 하반기 공급 공백, 사쿠라 스테이지 IT 수요, 미나토 랜드마크 임대 완료, B급 2차 공실, Flight to Quality·하이브리드 근무 인과를 사실처럼 강화하지 않는다.
- 삭제된 BOJ·JGB·TSE REIT·인바운드 freshness 수치를 되살리지 않는다.
- 현재 글은 이미 오해와 원자료 경계를 잘 설명한다. 대표 문장·노트·마무리 중 실제 누락만 최소 보완하고, `추천합니다` 같은 권유 표현은 강화하지 않는다.

### 2) `tokyo-real-estate-investment-complete-guide`

- **허브 spine 동결 최상위.** 7개 Chapter, 표, 체크리스트, 링크, 챕터 순서, 수치 블록을 재배치·축약·통합하지 않는다.
- 2026-07-18 FA에서 신규 T0/T1은 0건이었다. `Primary headline claims H1–H16`와 source manifest가 사실 잠금 기준이다.
- auto-extracted claims 표는 보조 인덱스이며, 개별 문장 편집의 근거는 H1–H16과 현행 본문이다.
- 허브 글 전체를 Voice Full로 “통일”하려 하지 않는다. 도입·챕터 전환·마무리에서 공통장치가 실제로 빠진 위치만 최소 개입한다.
- 내부 링크 anchor와 연결 대상 title은 현재 상태를 그대로 유지한다.
- 변경 0건 판정도 유효하다. 변경한다면 각 문장은 기존 사실의 재진술이어야 하며 새 판단 기준·새 투자 조언을 만들지 않는다.

### 3) `nihonbashi-hamacho-walking-guide`

- **일정·장소 사실 잠금:**
  - 도쿄 미드타운 니혼바시: 2026년 9월 말 준공 예정, 2027년 가을 개장 예정
  - 월도프 아스토리아: 2027년 가을 개장 예정 · 객실가 주장 금지
  - The HEART: 폭 6m × 높이 5.5m × 깊이 3m
  - 닌벤 다시: 무료가 아니라 공식 안내 **¥100**
  - 메이지자: 1873년 창업
- 삭제된 가부토초 40% 상승·문화 재포지셔닝 인과, 하마초 25% 저렴·저평가 투자처, 상업지/주거지 가격 기울기 서사를 되살리지 않는다.
- 음식·예산 수치는 현장 가격 확정값이 아니라 planning estimate다. 현재 가격 확인 헤지를 유지한다.
- 실제 답사 문맥을 허구 1인칭으로 확장하지 않는다. 워킹 가이드의 순서·거리·예산 구조는 동결하고 관찰 리듬만 최소 보완한다.
- JA 역명은 `茅場町駅` 유지 (`豪場町駅` 회귀 금지).

## 1. Joseph → Claude

```text
GSF-Ark Voice Full A3 배치를 시작한다. Wave A 마지막 3편이다.

대상 slug (이 순서대로, 한 편씩 drop 완성):
1. tokyo-office-vacancy-five-wards-2026
2. tokyo-real-estate-investment-complete-guide
3. nihonbashi-hamacho-walking-guide

너는 주도 편집자다. repo 파일을 직접 확정·commit·deploy하지 말고, 최종 편집 패키지를 slug당 drop 1개로 작성한다.

반드시 읽을 SSOT:
1. docs/s14-sprint/VOICE_FULL_PLAN_2026-07.md
2. docs/s14-sprint/VOICE_FULL_EXECUTION_BOARD_2026-07.md
3. docs/JOSEPH_AUTHENTIC_VOICE.md v1.3
4. docs/s14-sprint/SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md
5. claude-drops/2026-07-19_voice-full-a3-handoff.md
6. 각 slug의 docs/fact-audit/<slug>.md
7. 각 slug의 src/data/blog/{ko,en,ja}/<slug>.md
8. 허브는 docs/fact-audit/sources/tokyo-real-estate-investment-complete-guide.sources.yaml
9. 벤치마크: #6 live · Ep.12 reference

목표:
- 사실층·시장지표 정의·장소 일정·기존 spine을 유지하고 읽기 리듬만 편집한다.
- 데이터 저널리즘 70% + 판단 과정 30%, Reader First.
- 공통장치: 대표 문장 1개, 중간 질문 1~2회, 모바일 3줄 문단, 노트 문장 1회, 여운 있는 끝.
- 이미 충족한 장치는 다시 쓰지 않는다. 허브는 특히 최소 개입 또는 no-op 우선.
- 마무리는 기존 live 편들과 겹치지 않게 한다.
- 허구 경험·새 사실·새 수치·새 인과·새 단체·새 출처 금지.
- title/description/slug/H2 spine 동결.
- 위 slug별 SEO+FA 교정 회귀 금지.
- KO 기준 EN/JA 대응 문단을 빠짐없이 제공한다.

drop 파일:
claude-drops/2026-07-19_voice-full_tokyo-office-vacancy-five-wards-2026.md
claude-drops/2026-07-19_voice-full_tokyo-real-estate-investment-complete-guide.md
claude-drops/2026-07-19_voice-full_nihonbashi-hamacho-walking-guide.md

drop 필수 구조:
A. 기존 사실층 잠금표
B. 현재 글 진단 (이미 충족한 공통장치 포함)
C. KO 최종 replacement package 또는 no-op 판정
D. EN/JA 정확한 대응 replacement package
E. GPT 리뷰 수용표
F. Voice Full 자가체크 (FA 회귀 0 · 권유 강화 0)
G. 변경 요약 — 새 사실 0, 삭제 claim 수, H2 변경 수

HARD:
- claim 삭제 ≥5 또는 H2 구조 변경이면 중단하고 Joseph 승인 필요를 명시.
- 대체 사실 서술 신설 금지.
- 허구 1인칭·시장 인과 창작·투자 확신 톤 금지.
- KO `반드시`, EN `guaranteed`, JA `絶対に` 금지.
- 허브의 Chapter·표·링크·체크리스트 재배치 금지.
- 3편 drop 완료 후 「저장하고 세션 종료」.
```

## 2. Joseph → GPT

```text
아래 Claude Voice Full drop을 읽고 완성도만 리뷰해줘.

대상:
claude-drops/2026-07-19_voice-full_<slug>.md

- 전체 대필, 새 조사, 새 사실·수치·인과·시장 전망 제안 금지.
- 헤지 완화·투자 권유 강화·허브 구조 변경 제안 금지.
- 70/30, Reader First, 대표 문장, 중간 질문, 3줄 문단, 노트 문장, 여운 있는 끝을 점검.
- A3 핸드오프의 slug별 FA 회귀가 없는지 점검.
- 허브 no-op/최소 개입 판단은 편집량보다 타당성을 우선 평가.
- Fatal / Strong improvement / Keep + 정확한 위치와 최소 수정만 제안.

저장:
claude-drops/2026-07-19_voice-full_<slug>_gpt-review.md
```

## 3. Joseph → Claude

```text
initial drop과 GPT review를 함께 읽어라.
- GPT 제안의 채택/기각/이유를 E에 기록한다.
- 새 사실·수치·인과·헤지 완화·권유 강화·허브 구조 변경 제안은 기각한다.
- 채택한 최소 수정만 C/D에 통합한다.
- 파일 끝에 `status: claude-final`을 적는다.
- repo 직접 수정 금지.
```

## 4. Joseph → AG (Launch 트리거)

```text
Voice Full A3 <slug> 최종 패키지를 repo에 반영한다.

입력:
- claude-drops/2026-07-19_voice-full_<slug>.md (`status: claude-final`)
- claude-drops/2026-07-19_voice-full_<slug>_gpt-review.md

범위:
- src/data/blog/{ko,en,ja}/<slug>.md
- docs/fact-audit/<slug>.md (실제 필요할 때만)
- naver-drafts/<slug>-naver.html 및 .txt
- VOICE_FULL_EXECUTION_BOARD 해당 행 → `ag-applied`

HARD:
- Claude final 밖의 문장·수치·출처 추가 금지.
- title/description/slug/H2 spine 변경 금지.
- A3 slug별 FA 교정 회귀·투자 권유 강화 금지.
- 허브 Chapter·표·링크·체크리스트 구조 변경 금지.
- no-op 판정 편은 repo 반영·Naver 재생성 스킵 가능.
- commit·deploy 금지.

필수 게이트:
1. KO/EN/JA 각각 git diff 증빙.
2. Claude D의 EN/JA replacement 항목별 반영 체크.
3. 변경 편만 python3 scripts/naver_blog_gen.py --slug <slug> 재생성.
4. Naver HTML에서 KO 신규 문장 검색 증빙.
5. SKIP_TRUST_VERIFY=1 pnpm validate:post <slug> → 100/PASS.
```

## 5. Cursor 최종 게이트

- Claude final ↔ GPT review ↔ AG diff 추적.
- 3로케일·Naver 정합, 새 사실/수치/인과/허구 경험 0, FA 회귀 0, 권유 강화 0.
- spine·title·description 동결, 허브 구조 동결, validate 100/PASS, build PASS.
- commit → prod → 라이브 확인 → 변경 slug만 IndexNow → 보드 `live` → 마일스톤 `hub:close` 또는 `hub:log --milestone`.
- A3 완료 = Voice Full Wave A 9편 전체 종료.
