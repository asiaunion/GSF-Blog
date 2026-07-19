# Voice Full A2 Handoff — Wave A 둘째 배치 (계약·투자 YMYL 3편)

> 대상 3편 (보드 순서 17→18→19):
> 1. `tokyo-moving-contracts-two-notes` (#7 · 임대차 계약)
> 2. `japan-shinchiku-vs-chuko-mansion-investor-guide` (#1 · 신축·중고 비교)
> 3. `j-reit-five-things-to-know` (#4b · J-REIT)
>
> 역할: Claude 주도 · GPT 완성도 리뷰 · AG 반영/1차 검증 · Cursor 최종 검증/배포  
> 전제: Joseph **A1+A2 동시 해제** (2026-07-19). 단, slug별 순차 처리하며 6편 repo 일괄 반영 금지.  
> 공통 파이프: `claude-drops/2026-07-19_voice-full-a1-handoff.md` 준용.  
> AG Launch 게이트: Claude final 뒤 Joseph 또는 Cursor의 명시적 착수 지시 전 반영 금지.

## Wave A 공통 HARD

- 사실·법률·수치·출처의 의미 보존이 Voice보다 우선한다.
- title · description · slug · H2 spine 동결.
- SEO+FA에서 교정·삭제·헤지한 문장 회귀 금지.
- 투자·법률 권유, 수익·안전·승인 가능성 단정 금지.
- 새 사실·새 수치·새 인과·새 단체·새 출처·허구 경험 금지.
- claim 삭제 ≥5 또는 H2 구조 변경은 즉시 중단하고 Joseph 승인 필요를 적는다.
- KO 기준 EN/JA 대응 replacement를 빠짐없이 제공한다.

## slug별 특이 주의

### 1) `tokyo-moving-contracts-two-notes`

- 보통차가(普通借家)·정기차가(定期借家), 원상회복(原状回復)의 법률 의미를 바꾸지 않는다.
- 잠금 수치: 벽지 내구연수 **6년은 MLIT 가이드 기준으로 완화된 표현**, 잔존가치 약 **1엔**, 특약 예시 청소비 **5만 엔**, 초기비용 **월세 4~6배**.
- 회귀 금지: GTN 순위·구별 수락률, 구두합의/조항의 일괄 무효 단정, ORIX렌텍 보증회사 오기, ¥480 등기수수료 단정.
- 계약 조언은 “확인할 질문”으로만 제시하고 법률 결론처럼 쓰지 않는다.

### 2) `japan-shinchiku-vs-chuko-mansion-investor-guide`

- 가격·감가상각·수선비·유동성·BOJ 문맥과 현재 수치의 의미를 바꾸지 않는다.
- 내진 기준을 새로 단정하거나 **완공연도만으로 판정하는 문장**을 만들지 않는다. 관련 표현을 손대야 하면 건축 확인일 기준의 기존 교정 원칙을 유지한다.
- “감가상각=가장 중요한 절세수단”, “스트레스 테스트가 필수”, “안전하다” 같은 현재 권유·단정 표현은 Voice 장치로 강화하지 않는다. 최소 완화 제안은 C에 표시하되, 사실 claim 삭제로 번지면 중단한다.
- `docs/fact-audit/...`의 자동 Claims 표에는 Google test URL이 남아 있으므로 **그 표를 권위 있는 사실 근거로 사용하지 않는다.** 현재 frontmatter 공식 출처와 2026-07-18 Cursor refresh를 잠금 기준으로 삼고, 충돌은 새 조사 없이 `Cursor 확인 필요`로 표시한다.
- 2026년 4월 데이터·BOJ 수치·REINS 수치를 재계산하거나 새 해석하지 않는다.

### 3) `j-reit-five-things-to-know`

- 회귀 금지:
  - “2023년 41개·아시아 1위·세계 2위” 고정 수치·순위
  - BOJ의 J-REIT 매입 확대 전망 (2024-03 신규 매입 중단 교정 유지)
  - 지수 추종 추천·환차익 추천·분배금 안정·수익률 압축 단일 인과
  - 8953의 옛 명칭 Japan Retail Fund (현 Japan Metropolitan Fund / 日本都市ファンド)
  - 모든 종목=도쿄 상업빌딩, 안정성·안전마진 단정
- 자동 추출 Claims 표의 과거 `Verified`는 2026-07-18 SEO+FA 판정보다 우선하지 않는다.
- 시나리오 계산은 예시이며 수익 예측이나 투자 권유로 강화하지 않는다.

## 1. Joseph → Claude

```text
GSF-Ark Voice Full A2 배치를 시작한다. 계약·투자 YMYL 3편이다.

대상 slug (이 순서대로, 한 편씩 drop 완성):
1. tokyo-moving-contracts-two-notes
2. japan-shinchiku-vs-chuko-mansion-investor-guide
3. j-reit-five-things-to-know

너는 주도 편집자다. repo 파일을 직접 확정·commit·deploy하지 말고, 최종 편집 패키지를 slug당 drop 1개로 작성한다.

반드시 읽을 SSOT:
1. docs/s14-sprint/VOICE_FULL_PLAN_2026-07.md
2. docs/s14-sprint/VOICE_FULL_EXECUTION_BOARD_2026-07.md
3. docs/JOSEPH_AUTHENTIC_VOICE.md v1.3
4. docs/s14-sprint/SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md
5. claude-drops/2026-07-19_voice-full-a2-handoff.md
6. 각 slug의 docs/fact-audit/<slug>.md
7. 각 slug의 src/data/blog/{ko,en,ja}/<slug>.md
8. 벤치마크: #6 live · Ep.12 reference

목표:
- 사실층·법률/투자 의미·기존 spine을 유지하고 리듬만 편집한다.
- 데이터 저널리즘 70% + 판단 과정 30%, Reader First.
- 대표 문장 1개, 중간 질문 1~2회, 모바일 3줄 문단, 노트 문장 1회, 여운 있는 끝.
- 마무리는 기존 live 편들과 겹치지 않게 한다.
- 허구 경험·새 사실·새 수치·새 인과·새 단체·새 출처 금지.
- title/description/slug/H2 spine 동결.
- 위 slug별 SEO+FA 교정 회귀 금지.
- KO 기준 EN/JA 대응 문단을 빠짐없이 제공한다.

drop 파일:
claude-drops/2026-07-19_voice-full_tokyo-moving-contracts-two-notes.md
claude-drops/2026-07-19_voice-full_japan-shinchiku-vs-chuko-mansion-investor-guide.md
claude-drops/2026-07-19_voice-full_j-reit-five-things-to-know.md

drop 필수 구조:
A. 기존 사실층 잠금표
B. 현재 글 진단
C. KO 최종 replacement package
D. EN/JA 정확한 대응 replacement package
E. GPT 리뷰 수용표
F. Voice Full 자가체크 (YMYL 권유 0 · FA 회귀 0)
G. 변경 요약 — 새 사실 0, 삭제 claim 수, H2 변경 수

HARD:
- claim 삭제 ≥5 또는 H2 구조 변경이면 중단하고 Joseph 승인 필요를 명시.
- 대체 사실 서술 신설 금지.
- 허구 1인칭과 투자·법률 확신 톤 금지.
- KO `반드시`, EN `guaranteed`, JA `絶対に` 금지.
- 3편 drop 완료 후 「저장하고 세션 종료」.
```

## 2. Joseph → GPT

```text
아래 Claude Voice Full drop을 읽고 완성도만 리뷰해줘.

대상:
claude-drops/2026-07-19_voice-full_<slug>.md

- 전체 대필, 새 조사, 새 사실·수치·인과·법률/투자 해석 제안 금지.
- 헤지 완화·권유 강화 금지.
- 70/30, Reader First, 대표 문장, 중간 질문, 3줄 문단, 노트 문장, 여운 있는 끝을 점검.
- A2 핸드오프의 slug별 FA 회귀가 없는지 점검.
- Fatal / Strong improvement / Keep + 정확한 위치와 최소 수정만 제안.

저장:
claude-drops/2026-07-19_voice-full_<slug>_gpt-review.md
```

## 3. Joseph → Claude

```text
initial drop과 GPT review를 함께 읽어라.
- GPT 제안의 채택/기각/이유를 E에 기록한다.
- 새 사실·수치·인과·헤지 완화·권유 강화 제안은 기각한다.
- 채택한 최소 수정만 C/D에 통합한다.
- 파일 끝에 `status: claude-final`을 적는다.
- repo 직접 수정 금지.
```

## 4. Joseph → AG (Launch 트리거)

```text
Voice Full A2 <slug> 최종 패키지를 repo에 반영한다.

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
- A2 slug별 FA 교정 회귀·투자/법률 권유 금지.
- commit·deploy 금지.

필수 게이트:
1. KO/EN/JA 각각 git diff 증빙.
2. Claude D의 EN/JA replacement 항목별 반영 체크.
3. python3 scripts/naver_blog_gen.py --slug <slug> 재생성.
4. Naver HTML에서 KO 신규 문장 검색 증빙.
5. SKIP_TRUST_VERIFY=1 pnpm validate:post <slug> → 100/PASS.
```

## 5. Cursor 최종 게이트

- Claude final ↔ GPT review ↔ AG diff 추적.
- 3로케일·Naver 정합, 새 사실/수치/인과/허구 경험 0, FA 회귀 0, 권유 0.
- spine·title·description 동결, validate 100/PASS, build PASS.
- commit → prod → 라이브 확인 → IndexNow → 보드 `live` → hub:log.
- A1·A2를 동시에 해제했어도 repo 반영·배포는 slug별 검증한다.
- A2 live 후 A3 해제 여부를 Joseph에게 확인한다.
