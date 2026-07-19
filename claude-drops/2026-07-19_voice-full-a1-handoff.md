# Voice Full A1 Handoff — Wave A 첫 배치 (YMYL 3편)

> 대상 3편 (보드 순서 14→15→16):
> 1. `korea-japan-inheritance-gift-tax-cross-border-basics` (#2 · 상속·증여 YMYL)
> 2. `korea-resident-japan-property-capital-gains-tax` (#8 · 양도세 YMYL)
> 3. `buying-property-japan-checklist-before-you-commit` (#5 · 구매 체크리스트)
>
> 역할: Claude 주도 · GPT 완성도 리뷰 · AG 반영/1차 검증 · Cursor 최종 검증/배포  
> 전제: Wave B 13편 전체 live (2026-07-19) → Joseph **Wave A 해제** → A1 착수  
> 공통 파이프: `claude-drops/2026-07-18_voice-full-pilot-handoff.md` 준용  
> AG 필수 게이트: `claude-drops/2026-07-19_voice-full-b3-handoff.md` §Joseph → AG의 "B2 누락 재발 방지 게이트" 그대로 적용  
> 페이싱: A1 live 후 A2 → A3. 9편 일괄 금지.

## Wave A 공통 HARD (YMYL)

- **사실 문장 의미 보존이 최상위.** Voice Full은 리듬·Reader First·공통장치만. 세율·요건·기한·법률명·출처를 바꾸지 않는다.
- SEO+FA(2026-07-18)에서 교정·헤지·삭제한 서술을 **단정형으로 되돌리지 않는다.**
- 세무·법률 조언 톤 금지. 「이렇게 하면 된다」「반드시」 계열 회귀 금지.
- title · description · slug · H2 spine **동결** (질문형 H2 이름 포함).
- KO 한자 병기: 손댄 법률·지명 용어 첫 등장만 (이미 있는 병기는 유지).
- 새 통계·새 인과·현장 경험·새 단체·새 출처 추가 = 즉시 반려.
- claim 삭제 ≥5 또는 H2 구조 변경 = Joseph 사전 1줄 승인 필요 → 작업 중단 표기.

## slug별 특이 주의

### 1) `korea-japan-inheritance-gift-tax-cross-border-basics` — 상속·증여 YMYL
- **잠금 수치·일정 (의미 변경 금지):**
  - 일시거주자: 직전 15년 중 일본 주소 합계 **10년 이하** (10년 ≠ 자동 전 세계 과세)
  - 증여재산 합산: 개시일 **2026-12-31까지** 종전 3년 → **2027-01-01~2030-12-31** 단계(기산 **2024-01-01**) → **2031-01-01**부터 전면 7년
  - 한국 **2028** 유산취득세 = 확정 일정이 아니라 입법·시스템 준비 전제 목표
  - 한일 **별도 상속·증여세 조약 없음** · 외국납부세액공제는 한도 있음
- FA에서 제거한 것 회귀 금지: 황금시간·point of no return·유일한 방법·공포 프레이밍·BOJ/JGB/REIT freshness 블록·미검증 전면 납세자 분류.
- 판단 과정 30%는 「순서대로 무엇을 확인하는가」에 쓰고, 결론형 세무 조언을 만들지 않는다.

### 2) `korea-resident-japan-property-capital-gains-tax` — 양도세 YMYL
- **잠금 교정 (의미 변경 금지):**
  - 한국 거주 신고: 「모두」가 아니라 양도일까지 **계속 5년** 이상 국내 주소·거소 (소득세법 제118조의2)
  - 외국납부세액공제 근거: **제118조의6** (제57조로 되돌리지 말 것) · 세액공제/필요경비 선택
  - 신고 순서 고정 단정 금지 · 신고기한 불일치·경정청구 여지 헤지 유지
  - **30.63% / 15.315%** = 일본 **국세** 한정 · 주민세 면제 일괄 단정 금지
  - 장단기 판정 = **양도한 해 1월 1일** 기준 · 계약일 며칠 조정으로 세율 바꾼다는 서술 금지
  - 원천징수 **10.21%** · 1억엔 이하 예외 · NTA **No.1932** · 영구 보관 → 법정 보관기간
- 법인 매각 단일세율 단정 회귀 금지.
- Voice Full에서 「절차를 따라가면 된다」류 확신 톤 금지. 확인 질문·판단 과정으로만 살린다.

### 3) `buying-property-japan-checklist-before-you-commit` — 체크리스트
- **잠금 교정:**
  - 내진 = **건축 확인일** (완공일 회귀 금지) · 1981년 6월 新耐震
  - 거래가격: 부동산정보라이브러리 / REINS **Market Information** (본체 REINS·죽은 MLIT URL 회귀 금지)
  - 「모든」→「대부분」 완화 유지 · 「매도인 측 중개사」→「중개업자」 유지
- 체크리스트 항목의 법률·실무 의미는 유지하고, 리듬만 살린다. 새 체크 항목 추가 금지.
- 「니혼바시 실매수」 서술이 있으면 허구 현장담으로 확장하지 말고 기존 범위 안에서만 다듬는다.

## 1. Joseph → Claude

```text
GSF-Ark Voice Full A1 배치를 시작한다. Wave A(YMYL) 첫 배치다.

대상 slug (이 순서대로, 한 편씩 drop 완성):
1. korea-japan-inheritance-gift-tax-cross-border-basics
2. korea-resident-japan-property-capital-gains-tax
3. buying-property-japan-checklist-before-you-commit

너는 주도 편집자다. repo 파일을 직접 확정·commit·deploy하지 말고, 최종 편집 패키지를 slug당 drop 1개로 작성한다.

반드시 읽을 SSOT:
1. docs/s14-sprint/VOICE_FULL_PLAN_2026-07.md
2. docs/s14-sprint/VOICE_FULL_EXECUTION_BOARD_2026-07.md
3. docs/JOSEPH_AUTHENTIC_VOICE.md v1.3
4. docs/s14-sprint/SEO_FATAL_AUDIT_WORK_INSTRUCTION_2026-07.md
5. claude-drops/2026-07-19_voice-full-a1-handoff.md (이 파일 — YMYL HARD + slug별 잠금)
6. 각 slug의 docs/fact-audit/<slug>.md
7. 각 slug의 src/data/blog/{ko,en,ja}/<slug>.md
8. 벤치마크: #6 live · Ep.12 reference · Wave B live 리듬(단 YMYL 권유 톤은 복사 금지)

목표:
- 사실층·세법 의미·기존 spine을 유지한다. Voice는 읽기 리듬만.
- 데이터 저널리즘 70% + 판단 과정 30%, Reader First.
- 공통장치: 대표 문장 1개, 중간 질문 1~2회, 모바일 3줄 문단, 노트 문장 1회, 여운 있는 끝.
- 마무리 표현은 Wave B live·#6·Ep.12와 겹치지 않게 편마다 다르게.
- 허구 현장담·새 사실·새 수치·새 인과·새 단체·새 출처 금지.
- title/description/slug/H2 spine 동결.
- SEO+FA 교정·헤지 회귀 금지 (위 slug별 잠금표).
- KO 기준 EN/JA 대응 문단을 빠짐없이 제공한다.

drop 파일 (slug당 1개):
claude-drops/2026-07-19_voice-full_korea-japan-inheritance-gift-tax-cross-border-basics.md
claude-drops/2026-07-19_voice-full_korea-resident-japan-property-capital-gains-tax.md
claude-drops/2026-07-19_voice-full_buying-property-japan-checklist-before-you-commit.md

drop 필수 구조 (파일럿과 동일):
A. 기존 사실층 잠금표 — 세율·요건·기한·법률명·출처·면책 (fact-audit 기준)
B. 현재 글 진단 — 건조함/점프/은어/숫자 나열/공통장치 누락
C. KO 최종 replacement package
D. EN/JA 정확한 대응 replacement package
E. GPT 리뷰 수용표
F. Voice Full 자가체크 (YMYL 권유 0 · FA 회귀 0)
G. 변경 요약 — 새 사실 0, 삭제 claim 수, H2 변경 수

HARD:
- claim 삭제 ≥5 또는 H2 구조 변경이면 즉시 중단하고 Joseph 승인 필요를 명시.
- 대체 사실 서술 신설 금지.
- 「가보니」「체감상」 같은 허구 1인칭 금지.
- KO `반드시`, EN `guaranteed`, JA `絶対に` 금지.
- 세무·법률 「이렇게 하면 된다」 확신 톤 금지.
- 3편 drop 완료 후 「저장하고 세션 종료」.
```

## 2. Joseph → GPT (Claude initial drop 완료 후 · slug별 반복)

```text
아래 Claude Voice Full drop을 읽고 글의 완성도만 리뷰해줘.

대상:
claude-drops/2026-07-19_voice-full_<slug>.md

역할:
- 너는 보조 리뷰어다. 전체 글을 새로 쓰지 않는다.
- 새 사실·새 수치·새 인과·허구 경험·새 세법 해석을 제안하지 않는다.
- YMYL이므로 「더 단정적으로」「확신을 줘」류 제안 금지. 헤지 완화 제안도 금지.
- 사실 검증·법령 조사보다 Reader First와 Joseph Voice 완성도만 본다.

점검:
1. 데이터 70 / 판단 과정 30
2. 대표 문장·중간 질문·모바일 3줄 문단·노트 문장·여운 있는 끝
3. 마무리가 Wave B/#6/Ep.12와 겹치지 않는가
4. 은어·숫자 나열·YMYL 권유 잔존 여부
5. SEO+FA 교정·헤지 문장 보존 여부 (10년 자동과세 부정, 5년 요건, 제118조의6, 건축 확인일 등)

출력:
- Fatal / Strong improvement / Keep + 정확한 위치와 최소 수정 제안

리뷰 저장:
claude-drops/2026-07-19_voice-full_<slug>_gpt-review.md
```

## 3. Joseph → Claude (GPT 리뷰 후 · slug별 반복)

```text
네 initial drop과 GPT review를 함께 읽어라.

- GPT 제안을 자동 수용하지 말고 E. 수용표에 채택/기각/이유를 적는다.
- 새 사실·새 수치·허구 경험·헤지 완화·단정 강화 제안은 기각한다.
- 채택한 최소 수정만 C/D 최종 패키지에 통합한다.
- 파일 끝에 `status: claude-final`을 적고 저장한다.
- repo 파일 직접 수정 금지.
```

## 4. Joseph → AG (Launch 트리거 — Claude final 후)

> AG는 Claude 세션 종료 drop만으로 A1을 자동 착수하지 않는다.  
> **Joseph가 아래 블록을 AG에 붙여넣거나, Cursor가 AG 착수 지시를 남긴 뒤에만** 반영을 시작한다.  
> (B2 EN/JA 누락·조기 착수 재발 방지)

```text
Voice Full A1 <slug> 최종 패키지를 repo에 반영한다.

입력:
- claude-drops/2026-07-19_voice-full_<slug>.md (`status: claude-final`)
- claude-drops/2026-07-19_voice-full_<slug>_gpt-review.md

반영 범위:
- src/data/blog/{ko,en,ja}/<slug>.md
- docs/fact-audit/<slug>.md (실제 필요할 때만 · claim 의미 변경 금지)
- naver-drafts/<slug>-naver.html 및 .txt
- docs/s14-sprint/VOICE_FULL_EXECUTION_BOARD_2026-07.md 해당 행 → `ag-applied`

HARD:
- Claude final 밖의 새 문장·새 수치·새 출처 추가 금지.
- title/description/slug/H2 spine 변경 금지.
- YMYL 교정·헤지 회귀 금지 (A1 핸드오프 잠금표).
- commit·deploy 금지.

B2 누락 재발 방지 필수 게이트:
1. KO/EN/JA 세 파일 각각 git diff 증빙.
2. Claude D의 EN/JA replacement 항목별 반영 체크.
3. python3 scripts/naver_blog_gen.py --slug <slug> 재생성 (반영 직후 실행).
4. Naver HTML에서 KO 신규 문장 검색 증빙.
5. SKIP_TRUST_VERIFY=1 pnpm validate:post <slug> → 100/PASS까지.

완료 보고:
slug별 변경 파일 · 3로케일 diff 증빙 · Naver 재생성 증빙 · validate 결과 ·
Claude final과 달라진 부분(lint 등) · Cursor 확인 필요점 · FA 회귀 자가체크.
```

## 5. Cursor 최종 게이트 (slug별)

- Claude final ↔ GPT review ↔ AG diff 추적.
- 3로케일 대응·Naver 최신 본문 동기화 확인.
- 새 사실/수치/인과/허구 경험 0 · FA 교정 회귀 0 · YMYL 권유 0.
- spine·title·description 동결, slug별 validate 100/PASS, build PASS.
- commit → prod → 라이브 확인 → IndexNow(9 URL) → 보드 `live` → hub:log.
- A1 3편 live 후 **A2 해제 여부**를 Joseph에게 확인 (A2=#7·#1·#4b).
