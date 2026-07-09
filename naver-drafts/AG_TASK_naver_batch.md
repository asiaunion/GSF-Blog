# AG 지시문 — 네이버 블로그 초안 배치 생성

## 배경
GSF-Ark(gsfark.com) 포스트를 네이버 블로그에 반자동 등록하는 파이프라인.
스크립트(`scripts/naver_blog_gen.py`)가 각 포스트를 네이버 에디터 호환 HTML로 변환하고,
Joseph이 네이버 에디터에 붙여넣기 → 발행하는 방식.

---

## AG 역할

**AG가 할 것**: 전체 50개 포스트 HTML 파일 일괄 생성 + 진행 로그 관리  
**AG가 하지 않을 것**: 실제 네이버 발행 (Joseph이 직접)

---

## 실행 순서

### STEP 1 — 부트 확인
```bash
cd /Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark
python3 scripts/naver_blog_gen.py --list
```
총 포스트 수 확인 (현재 50개).

### STEP 2 — 이미 생성된 파일 확인 (중복 방지)
```bash
ls naver-drafts/*-naver.html 2>/dev/null | wc -l
```
이미 있는 파일은 덮어쓰기(스크립트가 overwrite하므로 무방).

### STEP 3 — 전체 배치 생성
아래 슬러그 목록을 순서대로 실행. **하나씩** 실행하고 에러 없으면 다음으로.

```bash
python3 scripts/naver_blog_gen.py --slug buying-property-japan-checklist-before-you-commit
python3 scripts/naver_blog_gen.py --slug buying-property-japan-surprises-foreign-investor
python3 scripts/naver_blog_gen.py --slug coredo-nihonbashi-mitsui-redevelopment
python3 scripts/naver_blog_gen.py --slug ginza-marunouchi-walk-dna
python3 scripts/naver_blog_gen.py --slug ginza-weekend-walking-guide
python3 scripts/naver_blog_gen.py --slug hotel-reit-vs-office-reit-post-covid
python3 scripts/naver_blog_gen.py --slug j-reit-five-things-to-know
python3 scripts/naver_blog_gen.py --slug japan-corporate-vs-personal-rental-after-tax-sketch
python3 scripts/naver_blog_gen.py --slug japan-rate-hike-cycle-j-reit-three-lessons
python3 scripts/naver_blog_gen.py --slug japan-real-estate-three-things
python3 scripts/naver_blog_gen.py --slug japan-shinchiku-vs-chuko-mansion-investor-guide
python3 scripts/naver_blog_gen.py --slug japan-visa-paths-permanent-business-manager-asset-holders
python3 scripts/naver_blog_gen.py --slug korea-japan-inheritance-gift-tax-cross-border-basics
python3 scripts/naver_blog_gen.py --slug korea-resident-japan-property-capital-gains-tax
python3 scripts/naver_blog_gen.py --slug nihonbashi-hamacho-supermarket-peacock-city-life
python3 scripts/naver_blog_gen.py --slug nihonbashi-hamacho-walking-guide
python3 scripts/naver_blog_gen.py --slug nihonbashi-mitsui-redevelopment-pipeline-three
python3 scripts/naver_blog_gen.py --slug nihonbashi-the-origin-of-japan
python3 scripts/naver_blog_gen.py --slug one-failure-three-lessons-postmortem
python3 scripts/naver_blog_gen.py --slug reading-korea-japan-markets-together
python3 scripts/naver_blog_gen.py --slug three-things-when-fx-shakes
python3 scripts/naver_blog_gen.py --slug tokyo-6-wards-real-estate-insight
python3 scripts/naver_blog_gen.py --slug tokyo-adachi-katsushika-edogawa
python3 scripts/naver_blog_gen.py --slug tokyo-buying-process-step-by-step
python3 scripts/naver_blog_gen.py --slug tokyo-core-3-wards-chiyoda-chuo-minato
python3 scripts/naver_blog_gen.py --slug tokyo-earthquake-vulnerable-five-areas
python3 scripts/naver_blog_gen.py --slug tokyo-five-sophisticated-spots
python3 scripts/naver_blog_gen.py --slug tokyo-kita-arakawa-itabashi-nerima
python3 scripts/naver_blog_gen.py --slug tokyo-kokubunji-kunitachi-fuchu-tachikawa
python3 scripts/naver_blog_gen.py --slug tokyo-korean-community-beyond-shinokubo
python3 scripts/naver_blog_gen.py --slug tokyo-mansion-market-reins-2026-04
python3 scripts/naver_blog_gen.py --slug tokyo-mansion-tsubo-chiyoda-chuo-minato
python3 scripts/naver_blog_gen.py --slug tokyo-meguro-setagaya
python3 scripts/naver_blog_gen.py --slug tokyo-moving-contracts-two-notes
python3 scripts/naver_blog_gen.py --slug tokyo-musashino-mitaka-chofu
python3 scripts/naver_blog_gen.py --slug tokyo-museums-with-kids-five-picks
python3 scripts/naver_blog_gen.py --slug tokyo-office-vacancy-five-wards-2026
python3 scripts/naver_blog_gen.py --slug tokyo-real-estate-investment-complete-guide
python3 scripts/naver_blog_gen.py --slug tokyo-shinagawa-ota
python3 scripts/naver_blog_gen.py --slug tokyo-shinjuku-shibuya-bunkyo
python3 scripts/naver_blog_gen.py --slug tokyo-small-rental-yield-vs-capital-gain-breakeven
python3 scripts/naver_blog_gen.py --slug tokyo-taito-sumida-koto
python3 scripts/naver_blog_gen.py --slug tokyo-toshima-nakano-suginami
python3 scripts/naver_blog_gen.py --slug tokyo-ward-guide-series-prologue
python3 scripts/naver_blog_gen.py --slug tokyo-yokohama-fuji-transport-pass
python3 scripts/naver_blog_gen.py --slug tsukiji-last-empty-lot-redevelopment
python3 scripts/naver_blog_gen.py --slug tsukiji-to-toyosu-morning-tokyo
python3 scripts/naver_blog_gen.py --slug weak-yen-korean-japan-asset-allocation-fx-scenarios
python3 scripts/naver_blog_gen.py --slug why-i-chose-nihonbashi
python3 scripts/naver_blog_gen.py --slug why-warm-investing-holds
```

에러 발생 시: 해당 슬러그만 기록하고 계속 진행.

### STEP 4 — 성공 기준 검증
```bash
# 생성된 HTML 파일 수 확인 (50개여야 함)
ls naver-drafts/*-naver.html | wc -l

# 각 파일 크기 확인 (모두 500 bytes 이상이어야 함)
for f in naver-drafts/*-naver.html; do
  size=$(wc -c < "$f")
  if [ "$size" -lt 500 ]; then
    echo "❌ 너무 작음: $f ($size bytes)"
  fi
done
echo "크기 검증 완료"

# 원문 링크 포함 확인 (무작위 3개 샘플)
grep -l "gsfark.com/ko/posts" naver-drafts/*-naver.html | wc -l
```

### STEP 5 — 결과 보고
`naver-drafts/AG_RESULT_naver_batch.md` 파일 작성:

```markdown
# AG_RESULT_naver_batch

- 실행일시: [JST]
- 전체 슬러그: 50개
- 성공: [N]개
- 실패/스킵: [N]개

## 실패 목록 (있을 경우)
- slug: [에러 메시지]

## 생성된 파일 목록
[ls naver-drafts/*-naver.html 출력]
```

---

## 에러 처리 원칙

| 상황 | 대응 |
|------|------|
| `❌ 파일 없음` 에러 | 해당 슬러그 실패 기록, 다음으로 진행 |
| Python 예외 | 에러 메시지 캡처, 다음으로 진행 |
| 생성 파일 500 bytes 미만 | 실패로 기록 |
| 50개 중 45개 이상 성공 | 전체 성공으로 간주 |

---

## 완료 조건

- [ ] `naver-drafts/*-naver.html` 45개 이상 생성
- [ ] 모든 파일 500 bytes 이상
- [ ] `AG_RESULT_naver_batch.md` 작성
- [ ] 실패 슬러그 목록 명시
