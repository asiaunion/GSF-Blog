# AG TASK — AdSense 시계 Week (2026-07-20)

> **작성**: Cursor · 2026-07-20  
> **실행**: AG  
> **검증**: Cursor (완료 보고 후)  
> **커밋·배포**: Joseph 명시 시에만  
> **SSOT**: [`ADSENSE_APPROVAL_PLAYBOOK_2026-07.md`](./ADSENSE_APPROVAL_PLAYBOOK_2026-07.md) · [`AGENTS.md`](../AGENTS.md) 부트 · D-001  
> **배분**: A~70 / B~15 / 문서~15 — B는 저비용만. Ark 네이버 분자를 끊지 말 것.

---

## 0. 역할 · HARD 금지

| 담당 | 할 일 |
|------|--------|
| **AG** | 아래 Wave A→B→C. 로그인 UI는 Joseph에게 **클릭 위치·다음 화면** 지시 |
| **Cursor** | aiModel·문서 정합 검증 · hub:log |
| **Joseph** | 네이버 붙여넣기 게시 · GSC/GA4 로그인 클릭만 |

### HARD 금지

- AdSense **재신청** · Ark+TK **동시** 신규 신청
- `modDatetime` 일괄/대량 갱신 (aiModel 제거 시 **절대 건드리지 않음**)
- 본문·title 대량 재작성 · `[Ep.N]` title 일괄 제거
- `author: GSF` → Joseph 일괄 (DEFERRED A1 — 승인 후)
- JA 신규 · 게이트 완화 문구 · git commit / prod deploy (Joseph 전)
- 비밀번호를 repo·채팅·로그에 기록

---

## Wave A — Ark 네이버 시계 (최우선 · Gate A-2)

**목표**: `#6` · `#5` 네이버 게시로 레퍼럴 2주 시계가 끊기지 않게.

| # | slug | 초안 | Joseph |
|---|------|------|--------|
| 1 | `tokyo-korean-community-beyond-shinokubo` | `naver-drafts/tokyo-korean-community-beyond-shinokubo-naver.html` | 붙여넣기 게시 |
| 2 | `buying-property-japan-checklist-before-you-commit` | `naver-drafts/buying-property-japan-checklist-before-you-commit-naver.html` | 붙여넣기 게시 |

### AG 절차

1. 두 HTML 열기 → CTA에 `utm_source=naver&utm_medium=blog&utm_campaign=blog-broadcast` 있는지 확인. 없으면 **초안만** 보강 (사이트 `.md` 본문 수정 금지).
2. Joseph에게 순서대로: 네이버 블로그 새 글 → HTML 모드 붙여넣기 → 발행.
3. 발행 URL 2개를 `docs/s14-sprint/STATUS.md` 해당 행「네이버 URL」에 기입 + 「발행 대기」제거.
4. (가능하면) `python3 scripts/sync_naver_published.py` — Joseph가 「네이버 동기화」라고 하면 기존 스킬 경로.

**완료 조건**: STATUS에 #5·#6 네이버 URL 2칸 채움.

---

## Wave B — `aiModel` frontmatter 제거 (심사 표면 일관성)

**범위**: `src/data/blog/{ko,en,ja}/**/*.md` 에서 `aiModel:` 줄 **삭제만**.

```bash
# 목록 확인 (예시)
rg -l 'aiModel' src/data/blog
```

### HARD

- `modDatetime` / `pubDatetime` / 본문 / title **변경 금지**
- 하루 수십 편 “수정 시각” 갱신으로 보이게 하지 말 것
- 커밋은 Joseph 지시 후. 커밋 메시지 예: `chore: remove residual aiModel frontmatter (no modDatetime)`

### 완료 조건

- `rg 'aiModel' src/data/blog` → **0건**
- Cursor에 변경 파일 목록 보고 → Cursor 스모크(필요 시 validate 샘플 1~2)

---

## Wave C — TokyoKorean 게이트 B 시계 (저비용 · 숫자 먼저)

**Repo**: `/Users/gsf/.gemini/antigravity/scratch/projects/TokyoKorean`  
**전략**: [`docs/NAVER_DAUM_BACKLINK_STRATEGY.md`](../../TokyoKorean/docs/NAVER_DAUM_BACKLINK_STRATEGY.md)  
**상태 기록**: `TokyoKorean/WEEKLY_STATUS.md` [HUB]

### C1. 색인 실측 (오늘 · 약속 아님)

Joseph GSC (`tokyokorean.net`) 옆에서 AG가 지시:

1. **페이지** 리포트 → 발행 포스트 URL(~20) 중 **색인됨** 건수 세기  
2. 핵심: `/` · about · contact · privacy 색인 여부  
3. `WEEKLY_STATUS.md` [HUB]에 **한 줄** 기록 예:  
   `색인 실측 2026-07-20: 포스트 N/20 (XX%) · 핵심페이지 …`
4. 커버리지 **&lt;70%**면 미색인 URL 목록을 WEEKLY에 붙이고 **URL 검사 재요청** 클릭 위치 지시.

**타임라인 주의**: 실측 전 “8/4 신청” 같은 날짜를 확정 문구로 쓰지 말 것. 시나리오일 뿐.

### C2. 네이버 시계 기산 (실측 직후 · 1~2편)

1. Ark와 동일 패턴: 요약 재구성 · **개별 URL CTA** · UTM  
2. TK용 초안 1~2편 작성(또는 기존 초안 점검) → Joseph 붙여넣기 게시  
3. 게시일을 WEEKLY에 **레퍼럴 2주 기산일**로 기록

### C3. (여력 시) YMYL-인접 4편 점검 — 수정 최소

후보: `nihonbashi-buying-property-foreigner` · `japan-banking-credit-card` · `japan-healthcare-hospital-visit` · `japan-elderly-care-frontline`  
→ “조언”이 아니라 **개인 경험** 프레임·면책 존재만 체크리스트로 WEEKLY에 ✓/이슈 메모. **본문 대량 수정 금지** (이슈만 기록 → Cursor).

---

## Wave D — (선택) Ark GSC 잔여 확인

Joseph GSC에서:

- `/ja/mission`(무슬래시) · `/tags/fx/` 「리디렉션 오류」**잔존 여부**만 메모  
- 코드 변경은 **오류가 남아 있을 때만** Cursor에 넘김 (AG가 임의 vercel.json 수정 금지)

---

## 완료 보고 형식 (AG → Cursor)

```text
AdSense 시계 Week 완료
- Wave A: #6 URL=… / #5 URL=…
- Wave B: aiModel 제거 N파일 · modDatetime 변경 0
- Wave C: 색인 N/20 (xx%) · 네이버 게시 M편 · 기산일=…
- Wave D: (있으면) 리다이렉트 잔존 Y/N
- refs: STATUS · TokyoKorean/WEEKLY · 변경 파일 목록
```

`hub:log`는 Cursor가 검증 후 기록. AG는 `_handoff.md`에 요약 append만 (커밋 전).

---

## Joseph 한 줄 실행 트리거 (복붙용)

```text
AG: docs/AG_TASK_2026-07-20_adsense-clock-week.md 전체 실행.
로그인 클릭만 내가 하고 나머지는 지시·문서화. 끝나면 Cursor 검증.
커밋·배포는 내가 말할 때만.
```
