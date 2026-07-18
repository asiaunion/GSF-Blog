# Fact sheet & Translation audit — `tokyo-korean-community-beyond-shinokubo`

| Field | Value |
|-------|-------|
| **Slug** | `tokyo-korean-community-beyond-shinokubo` |
| **Title (KO)** | 도쿄 한인타운은 신오쿠보뿐일까 — 생활·비즈니스 거점 비교 [2026] |
| **Cursor validate** | PASS — 2026-07-18 §1–4 refresh, score 100 |
| **Published** | Live |

---

## Verified claims retained

| # | Claim | Tier-1 source | Status |
|---|-------|---------------|--------|
| 1 | KSC 도쿄는 토라노몬 힐즈 비즈니스 타워 15층 CIC 도쿄 안에 있다 | [K-Startup Center — KSC Tokyo](https://k-startupcenter.org/kor/CMS/Contents/Contents.do?mCode=MN073) | [x] |
| 2 | KSC 도쿄는 한국 스타트업에 사무 공간, 현지 투자 연결, 기업 네트워킹을 지원한다 | [K-Startup Center — KSC Tokyo](https://k-startupcenter.org/kor/CMS/Contents/Contents.do?mCode=MN073) | [x] |
| 3 | 민단은 신주쿠·이타바시·미나토 등 도쿄 여러 지역에 지부를 둔다 | [민단 도쿄 지방본부 — 지부 목록](https://mindan.org/tokyo/sanka.php) | [x] |
| 4 | 민단 생활상담센터는 법률·세무·상속·재류자격·연금 등의 상담을 안내한다 | [민단 생활상담센터](https://www.mindan.org/soudan/aboutus.php) | [x] |
| 5 | 민단 도쿄본부와 중앙 생활상담센터는 미나미아자부에 있다 | [민단 생활상담센터](https://www.mindan.org/soudan/aboutus.php) | [x] |

## Claims removed in the 2026-07-18 refresh

- 재일본한국인연합회와 민단을 같은 단체처럼 표기한 문장
- 이타바시를 신오쿠보와 같은 규모의 코리아타운으로 부른 문장
- 아자부·히로오에 한국인 글로벌 엘리트·자산가·전문직이 집중된다는 문장
- 미나토구에 한일 전문 세무사·변호사·양국 면허 자산관리사가 집중됐다는 문장
- 아자부다이 힐즈 초기 입주자 상당수가 한국계 전문직이라는 문장
- 한국 기업의 일본 신규 법인 2024년 316곳·2025년 9월 318곳 수치
- 한국계 기업이 토라노몬·아카사카 30~100㎡ B+급 오피스 수요를 지탱한다는 문장
- 한국인 전문직 이동이 월 15만~30만엔 주택의 수급 불균형 기회를 만든다는 투자 주장

삭제 이유: 기존 fact sheet가 위 주장과 수치를 민단 뉴스 목록 페이지 하나에 연결했으며, 해당 원문·수치·인과관계를 공식 출처에서 확인하지 못했다.

## Locale parity

| Item | KO | EN | JA |
|------|----|----|----|
| 신오쿠보 = 대표 한국 상권 | Y | Y | Y |
| 민단 = 생활 지원망 | Y | Y | Y |
| KSC 도쿄 = 스타트업 지원 기관 | Y | Y | Y |
| 기관 위치 ≠ 한국인 주거 집중 | Y | Y | Y |
| 커뮤니티 시설 ≠ 부동산 가격 인과 | Y | Y | Y |

---

## Sign-off

- [x] Unsupported demographic and investment claims removed or bounded
- [x] KO / EN / JA meaning aligned
- [x] `pnpm validate:post tokyo-korean-community-beyond-shinokubo` — score 100, all hard gates
- [x] `pnpm build`
