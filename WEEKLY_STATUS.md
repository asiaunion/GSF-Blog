# GSF-Blog — Weekly Status

---

## [HUB] 프로젝트 요약 (전체 현황판용 공통 필드)

| 필드 | 값 |
|------|-----|
| 최종 업데이트 | 2026-06-13 |
| 프로젝트명 | GSF-Blog |
| 상태 | 🟠 AdSense 수정 대기 |
| 목표 + 기한 | 애드센스 승인 → SEO 최적화 → 검색 유입 증가 (2026 H2) |
| 이번 주 최우선 액션 | AdSense Audit 결함 수정 (admin sitemap 포함 제거) → 재심사 신청 |
| 다음 체크포인트 | 수정 1 완료 후 즉시 재심사 신청 |
| 블로커 | sitemap에 admin URL 포함 결함 → astro.config.ts 수정 필요 (승인 대기) |

---

## 🔴 이번 주 필수 액션

| 기한 | 항목 | 상태 |
|------|------|------|
| 결과 수신 즉시 | 애드센스 승인 시 → 광고 배치 설정 | ⏳ 대기 |
| 결과 수신 즉시 | 애드센스 거절 시 → 거절 사유 분석 + 재대응 계획 수립 | ⏳ 대기 |
| 매주 화/목 | 발행 목표 주 2회 유지 | 🔄 진행 중 |

---

## ✍️ 콘텐츠 발행 현황

| 항목 | 값 |
|------|-----|
| 발행 목표 | 주 2회 이상 (화/목) |
| 현재 총 발행 수 | 36기사 (2026-06-09 기준) |
| 소셜 자동 배포 | ✅ 정상 가동 중 |
| 언어 | 日/韓/英 3언어 |

---

## 📈 과제 로드맵 (우선순위 순)

| 순위 | 과제 | 상태 | 비고 |
|------|------|------|------|
| 1 | 애드센스 승인 통과 | ⏳ 심사 중 | 2026-06-04 재신청 |
| 2 | SEO 최적화 | ⬜ 미착수 | 승인 후 착수 |
| 3 | 발행 지속성 유지 | 🔄 진행 중 | 주 2회 화/목 |
| 4 | 글 품질 고도화 | 🔄 진행 중 | — |
| 5 | 검색 유입 증가 방안 | ⬜ 미착수 | KPI 논의 후 구체화 |

---

## 📊 KPI (미정 — 별도 논의 예정)

> ⚠️ KPI 항목 및 측정 방식은 별도 세션에서 확정 예정.
> 확정 후 이 섹션에 추가.

---

## 📅 주간 루틴 (고정)

| 주기 | 항목 |
|------|------|
| 매주 화/목 | 발행 1건 이상 |
| 매주 | 소셜 자동 배포 정상 가동 확인 |
| 수시 | 애드센스 메일함 확인 |
| KPI 확정 후 | 주간 수치 기록 |

---

## 🗂️ 관련 문서

| 문서 | 용도 |
|------|------|
| `docs/kpi-archive/` | 주간 KPI 기록 (확정 후 운영) |
| `NEXT_WORK_QUEUE.md` (GSF-Job) | 블로그-Job 연계 LinkedIn 콘텐츠 전략 |

---

## 📝 작업 로그
### 2026-06-10
- reschedule_all.py 실행으로 34개 포스트 SNS 전체 재예약 및 Rate Limit 누락분 수동 보완 완료
- Buttondown 구독 UX 분석(빈 아카이브·팝업 문제 진단)
- Welcome 이메일 발행(API)
- NewsletterForm 팝업→인라인 fetch 성공 메시지 교체
- Vercel 배포 완료
- After confirming redirect URL = gsfark.com/posts/ 확정
- 히어로 섹션 2컬럼 리디자인(mint 우측 패널+Aurora)
- max-w-app 확장(max-w-4xl)
- Header 로고 서브텍스트 제거
- EN tagline 줄바꿈(whitespace-pre-line)
- KO/JA 타이틀 3줄 분리(J-REIT 독립 라인)
- 브랜드 문구 추가(gsfark.com·Nihonbashi Tokyo)
- NewsletterForm 버튼 최적화
- ui/hero-2col→main 머지 및 Vercel 배포 완료
- LangBanner 컴포넌트 신규 생성 (헤더 외부 상단 배치)
- 기존 LanguageSwitcher 헤더에서 제거
- 언어 버튼 국기 이모지 추가 (🇺🇸/🇰🇷/🇯🇵)
- sessionStorage 닫기 로직 폐기 → 항상 표시
- ui.ts ko·ja 블록 국기 이모지 복구
- main 머지 + gsfark.com 배포 완료
- CTR 개선 지시서에 따라 8개 포스트의 EN/KO/JA title과 description 업데이트 및 Peacock 포스트 타이틀 개선 반영

### 2026-06-09
- 소셜 배포 파이프라인 점검 (Buffer rate limit 해소 확인)
- sns_scheduler.py Buffer Threads 이미지 누락 버그 수정 및 dry-run 검증 추가
- GSF-Hub 현황판 재설계 논의 참여

### 2026-06-13
- **AdSense 기술 Audit 실행 (STEP 1~6 전체)**
- AdSense 기술 Audit v2 재검증(deep-dive)
- ads.txt 주석만 존재 → 신청 당시 실질적 빈 파일 확인
- consent-gated AdSense 스크립트 이력 재구성
- GSC ads.txt 색인 요청 시도(plain text 불가 확인)
- AdSense 대시보드 수동 재크롤 불가 확인
- 종합 보고서 v2 작성(adsense_audit_report_2026-06-13.md)
- 현재 심사 대기 결정 기록
- 결함 1 🔴 발견: `admin` URL 4개가 sitemap에 포함 (astro.config.ts filter 누락)
  - sitemap URL 상태: admin 3개 → 302 리다이렉트, robots.txt와 신호 충돌
- 결함 2 🟡 발견: 태그 페이지 475개 빌드 생성 (라이브에서는 308 리다이렉트)
  - 빌드 HTML 총 659개 (예상 ~130개 대비 5배)
- 정상 항목: ads.txt(200+정상 내용), hreflang(4개 언어 전부 정상), 정책 페이지(9개 200)
- 보고서 작성: `adsense_audit_report_2026-06-13.md`
- **승인 대기**: 수정 1(astro.config.ts 1줄 추가) → 승주 목사님 승인 후 실행
