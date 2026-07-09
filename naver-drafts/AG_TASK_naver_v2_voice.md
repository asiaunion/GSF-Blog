# AG 지시문 — 네이버 Voice v2.0: 템플릿 다양화 + Joseph's Note 개선

## 배경
GPT 검증 결과(2026-07-09) 기반 개선 작업.
현재 50편이 모두 Type A 구조 → 3가지 타입으로 다양화.
Claude가 최종 검증.

## 작업 디렉토리
```
/Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark
```

---

## STEP 0 — 사전 확인

```bash
cd /Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark
python3 scripts/naver_blog_gen.py --list
ls naver-drafts/*-naver.html | wc -l   # 50개여야 함
```

---

## STEP 1 — 템플릿 분류표

아래 분류를 `scripts/naver_blog_gen.py`의 `POST_TYPE` 딕셔너리로 추가할 것.

### Type A (현재 구조 유지, 22편)
질문 → 사례/경험 → 📌 핵심포인트 3개 → Joseph's Note

```
buying-property-japan-checklist-before-you-commit
buying-property-japan-surprises-foreign-investor
hotel-reit-vs-office-reit-post-covid
j-reit-five-things-to-know
japan-corporate-vs-personal-rental-after-tax-sketch
japan-real-estate-three-things
japan-shinchiku-vs-chuko-mansion-investor-guide
japan-visa-paths-permanent-business-manager-asset-holders
one-failure-three-lessons-postmortem
three-things-when-fx-shakes
tokyo-buying-process-step-by-step
tokyo-earthquake-vulnerable-five-areas
tokyo-mansion-tsubo-chiyoda-chuo-minato
tokyo-meguro-setagaya
tokyo-moving-contracts-two-notes
tokyo-real-estate-investment-complete-guide
tokyo-shinagawa-ota
tokyo-shinjuku-shibuya-bunkyo
tokyo-ward-guide-series-prologue
why-warm-investing-holds
korea-japan-inheritance-gift-tax-cross-border-basics
korea-resident-japan-property-capital-gains-tax
```

### Type B (칼럼형, 15편)
숫자/데이터 하나 → 왜 중요한가 → Joseph의 생각 → Joseph's Note

오프닝: 숫자나 데이터 포인트로 시작 (예: "2024년 3월, J-REIT 지수가 ...")
디스커버리: 그 숫자가 의미하는 것 (비교·배수 표현)
핵심포인트: 📌 2개만 (간결하게)
Joseph's Note: "한 줄의 생각"

```
coredo-nihonbashi-mitsui-redevelopment
japan-rate-hike-cycle-j-reit-three-lessons
nihonbashi-mitsui-redevelopment-pipeline-three
reading-korea-japan-markets-together
tokyo-6-wards-real-estate-insight
tokyo-adachi-katsushika-edogawa
tokyo-core-3-wards-chiyoda-chuo-minato
tokyo-kita-arakawa-itabashi-nerima
tokyo-kokubunji-kunitachi-fuchu-tachikawa
tokyo-mansion-market-reins-2026-04
tokyo-musashino-mitaka-chofu
tokyo-office-vacancy-five-wards-2026
tokyo-small-rental-yield-vs-capital-gain-breakeven
tokyo-taito-sumida-koto
tokyo-toshima-nakano-suginami
```

### Type C (관찰형, 13편)
발견/장면 → 데이터 → 투자 시사점 1문장 → Joseph's Note

오프닝: 구체적 장면이나 발견으로 시작 (날짜·장소·감각)
디스커버리: 그 장소/현상의 데이터
핵심포인트: 📌 2개 (장소 특성 + 투자 시사점)
투자 시선 문장: 마지막 핵심포인트에 반드시 포함
  예: "이 거리의 보행량은 장기 상권의 생명력을 보여줍니다."
Joseph's Note: "한 줄의 생각"

```
ginza-marunouchi-walk-dna
ginza-weekend-walking-guide
nihonbashi-hamacho-supermarket-peacock-city-life
nihonbashi-hamacho-walking-guide
nihonbashi-the-origin-of-japan
tokyo-five-sophisticated-spots
tokyo-korean-community-beyond-shinokubo
tokyo-museums-with-kids-five-picks
tokyo-yokohama-fuji-transport-pass
tsukiji-last-empty-lot-redevelopment
tsukiji-to-toyosu-morning-tokyo
weak-yen-korean-japan-asset-allocation-fx-scenarios
why-i-chose-nihonbashi
```

---

## STEP 2 — 스크립트 수정 (`scripts/naver_blog_gen.py`)

### 2-1. POST_TYPE 딕셔너리 추가

`body_to_naver_html()` 함수 상단에 아래를 추가:

```python
POST_TYPE = {
    # Type B
    'coredo-nihonbashi-mitsui-redevelopment': 'B',
    'japan-rate-hike-cycle-j-reit-three-lessons': 'B',
    'nihonbashi-mitsui-redevelopment-pipeline-three': 'B',
    'reading-korea-japan-markets-together': 'B',
    'tokyo-6-wards-real-estate-insight': 'B',
    'tokyo-adachi-katsushika-edogawa': 'B',
    'tokyo-core-3-wards-chiyoda-chuo-minato': 'B',
    'tokyo-kita-arakawa-itabashi-nerima': 'B',
    'tokyo-kokubunji-kunitachi-fuchu-tachikawa': 'B',
    'tokyo-mansion-market-reins-2026-04': 'B',
    'tokyo-musashino-mitaka-chofu': 'B',
    'tokyo-office-vacancy-five-wards-2026': 'B',
    'tokyo-small-rental-yield-vs-capital-gain-breakeven': 'B',
    'tokyo-taito-sumida-koto': 'B',
    'tokyo-toshima-nakano-suginami': 'B',
    # Type C
    'ginza-marunouchi-walk-dna': 'C',
    'ginza-weekend-walking-guide': 'C',
    'nihonbashi-hamacho-supermarket-peacock-city-life': 'C',
    'nihonbashi-hamacho-walking-guide': 'C',
    'nihonbashi-the-origin-of-japan': 'C',
    'tokyo-five-sophisticated-spots': 'C',
    'tokyo-korean-community-beyond-shinokubo': 'C',
    'tokyo-museums-with-kids-five-picks': 'C',
    'tokyo-yokohama-fuji-transport-pass': 'C',
    'tsukiji-last-empty-lot-redevelopment': 'C',
    'tsukiji-to-toyosu-morning-tokyo': 'C',
    'weak-yen-korean-japan-asset-allocation-fx-scenarios': 'C',
    'why-i-chose-nihonbashi': 'C',
}
```

### 2-2. Type별 핵심포인트 개수 처리

`body_to_naver_html()` 내 핵심포인트 추출 부분에서:
- Type A: 최대 3개
- Type B: 최대 2개
- Type C: 최대 2개 (마지막 포인트에 투자 시사점 문장 append)

```python
post_type = POST_TYPE.get(slug, 'A')
max_points = 3 if post_type == 'A' else 2
key_points = key_points[:max_points]
```

### 2-3. Type C 투자 시선 문장 추가

Type C의 마지막 핵심포인트 뒤에 투자 시사점 자동 삽입:

```python
INVESTMENT_LENS = {
    'ginza-marunouchi-walk-dna': '이 거리의 상업 밀도는 단순한 관광 수요가 아니라 장기 자산 가치의 저변을 보여줍니다.',
    'ginza-weekend-walking-guide': '보행자 천국의 유동 인구는 상권 생명력을 읽는 실질적인 지표입니다.',
    'nihonbashi-hamacho-supermarket-peacock-city-life': '도심 생활 인프라의 완성도는 장기 거주 수요와 직결됩니다.',
    'nihonbashi-hamacho-walking-guide': '에도 시대부터 이어진 상업 DNA는 재개발 이후에도 입지 프리미엄으로 남습니다.',
    'nihonbashi-the-origin-of-japan': '역사적 기점이라는 상징성은 재개발 이후에도 자산 가치의 하방을 지지합니다.',
    'tokyo-five-sophisticated-spots': '세련된 입지의 공통점은 유동 인구의 질과 상업 밀도가 함께 높다는 것입니다.',
    'tokyo-korean-community-beyond-shinokubo': '커뮤니티의 이동 방향은 다음 상업 입지를 예측하는 선행 지표가 됩니다.',
    'tokyo-museums-with-kids-five-picks': '교육 인프라의 집적은 주거 수요의 안정성을 높이는 요소입니다.',
    'tokyo-yokohama-fuji-transport-pass': '교통 접근성의 향상은 거주 반경 확대와 자산 가격 상승으로 이어집니다.',
    'tsukiji-last-empty-lot-redevelopment': '도심의 마지막 빈 공간은 항상 새로운 자산 가치의 시작점이 됩니다.',
    'tsukiji-to-toyosu-morning-tokyo': '새벽 시장의 이전은 단순한 이동이 아니라 상업 지형의 재편입니다.',
    'weak-yen-korean-japan-asset-allocation-fx-scenarios': '환율 변동기의 자산 배분은 분산이 아니라 타이밍의 문제입니다.',
    'why-i-chose-nihonbashi': '입지 선택의 이유가 명확할수록 자산을 지키는 논리도 명확해집니다.',
}
```

Type C일 때, 마지막 핵심포인트 paragraph 뒤에 다음 코드 추가:

```python
if post_type == 'C':
    lens = INVESTMENT_LENS.get(slug, '')
    if lens:
        parts.append(
            f'<p style="color:#2d5a27;font-size:14px;font-style:italic;'
            f'line-height:1.85;margin-bottom:16px;padding-left:16px;'
            f'border-left:2px solid #2d5a27;">{lens}</p>'
        )
```

### 2-4. Joseph's Note 개선

현재 `extract_josephs_note()` 함수가 본문 마지막 문장을 그대로 사용.
이것을 유지하되, 아래 `JOSEPHS_NOTE_OVERRIDE` 딕셔너리로 우선 적용:

```python
JOSEPHS_NOTE_OVERRIDE = {
    'ginza-marunouchi-walk-dna': '좋은 입지는 시간이 설명합니다.',
    'ginza-weekend-walking-guide': '오래 걸을수록 도시는 숫자보다 많은 것을 말해 줍니다.',
    'nihonbashi-hamacho-supermarket-peacock-city-life': '일상의 편의가 갖춰진 곳에 사람이 남습니다.',
    'nihonbashi-hamacho-walking-guide': '에도가 선택한 장소를 도쿄가 다시 선택하고 있습니다.',
    'nihonbashi-the-origin-of-japan': '모든 기원의 자리는 언제나 다시 중심이 됩니다.',
    'nihonbashi-mitsui-redevelopment-pipeline-three': '민간 자본이 한 방향으로 움직일 때, 그 방향을 먼저 읽는 것이 투자입니다.',
    'coredo-nihonbashi-mitsui-redevelopment': '재개발의 속도보다 그 방향을 먼저 읽는 것이 중요합니다.',
    'tsukiji-last-empty-lot-redevelopment': '빈 공간은 도시의 다음 문장을 기다리고 있습니다.',
    'tsukiji-to-toyosu-morning-tokyo': '도시의 중심은 선언이 아니라 사람의 이동으로 결정됩니다.',
    'one-failure-three-lessons-postmortem': '결국 오래 남는 것은 건물이 아니라 신뢰였습니다.',
    'three-things-when-fx-shakes': '환율이 흔들릴 때, 원칙이 있는 사람만 기회를 봅니다.',
    'weak-yen-korean-japan-asset-allocation-fx-scenarios': '좋은 환율 시나리오는 예측이 아니라 준비입니다.',
    'reading-korea-japan-markets-together': '두 시장을 하나로 읽을 때, 비로소 진짜 기회가 보입니다.',
    'why-warm-investing-holds': '시간이 길어질수록 수익률보다 신뢰가 더 큰 복리로 돌아옵니다.',
    'why-i-chose-nihonbashi': '장소를 선택하는 이유가 명확할수록 오래 머물 수 있습니다.',
    'hotel-reit-vs-office-reit-post-covid': '회복의 속도는 시장이 아니라 사람이 결정합니다.',
    'japan-rate-hike-cycle-j-reit-three-lessons': '금리가 오를 때 흔들리지 않으려면, 내려갈 때부터 준비해야 합니다.',
    'tokyo-mansion-market-reins-2026-04': '가격이 버티는 이유를 모르면, 떨어질 때도 이유를 모릅니다.',
    'tokyo-office-vacancy-five-wards-2026': '공실률 2%는 숫자가 아니라 신호입니다.',
    'tokyo-small-rental-yield-vs-capital-gain-breakeven': '수익률과 시세차익 사이의 균형점은 시장이 아니라 전략이 결정합니다.',
    'buying-property-japan-surprises-foreign-investor': '예상하지 못한 것을 기록해 두는 사람만이 다음에 예상할 수 있습니다.',
    'buying-property-japan-checklist-before-you-commit': '서명 전의 한 번 더 확인이 10년의 후회를 막습니다.',
    'tokyo-korean-community-beyond-shinokubo': '커뮤니티가 먼저 움직이고, 상권이 따라옵니다.',
    'tokyo-five-sophisticated-spots': '세련된 장소는 유행이 아니라 밀도가 만듭니다.',
    'tokyo-museums-with-kids-five-picks': '교육 인프라가 풍부한 곳에 좋은 이웃이 모입니다.',
    'tokyo-yokohama-fuji-transport-pass': '이동의 반경이 넓어질수록 선택지도 넓어집니다.',
}
```

`extract_josephs_note()` 결과 대신 이 딕셔너리가 있으면 우선 사용:

```python
josephs_note = JOSEPHS_NOTE_OVERRIDE.get(slug) or extract_josephs_note(body, sections)
```

---

## STEP 3 — 스크립트에 `--slug` 파라미터로 slug 전달

현재 `body_to_naver_html(body, meta, sections)` 시그니처에 `slug` 추가:
```python
def body_to_naver_html(body, meta, sections, slug=''):
```
호출부도 동일하게 수정.

---

## STEP 4 — 전체 50편 재생성

```bash
cd /Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark
find scripts -name "*.pyc" -delete

while IFS= read -r slug; do
  result=$(python3 scripts/naver_blog_gen.py --slug "$slug" 2>&1)
  if echo "$result" | grep -q "✅"; then
    echo "✅ $slug"
  else
    echo "❌ $slug: $result"
  fi
done < /tmp/slugs.txt
```

slugs.txt가 없으면:
```bash
python3 scripts/naver_blog_gen.py --list 2>&1 | grep "  " | awk '{print $1}' > /tmp/slugs.txt
```

---

## STEP 5 — 검증용 텍스트 파일 재생성

```bash
python3 << 'PYEOF'
import os, re, json

with open('naver-drafts/naver-log.json') as f:
    d = json.load(f)

seen = {}
for g in d['generated']:
    seen[g['slug']] = g
posts = list(seen.values())

def strip_html(html):
    text = re.sub(r'<[^>]+>', '', html)
    text = re.sub(r'&nbsp;', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

lines = []
for i, post in enumerate(posts, 1):
    html_path = f'naver-drafts/{post["html_file"]}'
    if not os.path.exists(html_path):
        continue
    with open(html_path) as f:
        html = f.read()
    text = strip_html(html)
    lines.append('='*60)
    lines.append(f'[{i:02d}/50] {post["slug"]}')
    lines.append('='*60)
    lines.append(text)
    lines.append('')

with open('naver-drafts/ALL_50_naver_drafts_v2.txt', 'w') as f:
    f.write('\n'.join(lines))
print('완료')
PYEOF
```

---

## STEP 6 — 성공 기준 검증

```bash
# 50개 생성 확인
ls naver-drafts/*-naver.html | wc -l

# 모두 500 bytes 이상
for f in naver-drafts/*-naver.html; do
  size=$(wc -c < "$f")
  [ "$size" -lt 500 ] && echo "❌ $f ($size bytes)"
done
echo "크기 검증 완료"

# 해시태그 따옴표 없음
grep -l '#"' naver-drafts/*-naver.html | wc -l

# Type B: 핵심포인트 2개인지 샘플 확인 (📌 개수)
echo "=== Type B 샘플 ==="
grep -c "📌" naver-drafts/tokyo-mansion-market-reins-2026-04-naver.html

# Type C: 투자 시선 문장(border-left:2px solid #2d5a27) 있는지 확인
echo "=== Type C 샘플 ==="
grep -c "2d5a27" naver-drafts/ginza-weekend-walking-guide-naver.html

# Joseph's Note override 확인
grep "Joseph" naver-drafts/why-warm-investing-holds-naver.html | grep -o "Joseph's Note.*<"
```

---

## STEP 7 — 결과 보고

`naver-drafts/AG_RESULT_naver_v2_voice.md` 작성:

```markdown
# AG_RESULT_naver_v2_voice

- 실행일시: [JST]
- 스크립트 수정: scripts/naver_blog_gen.py
- 재생성: 50개
- Type A: 22편 / Type B: 15편 / Type C: 13편

## 검증 결과
- [ ] 50개 생성
- [ ] 500 bytes 이상
- [ ] 해시태그 따옴표 0건
- [ ] Type B 핵심포인트 2개 확인
- [ ] Type C 투자 시선 문장 확인
- [ ] Joseph's Note override 적용 확인

## 실패 목록
(없으면 "없음")
```

---

## 에러 처리

| 상황 | 대응 |
|------|------|
| `body_to_naver_html` 시그니처 오류 | 호출부 모두 `slug=slug` 추가 |
| INVESTMENT_LENS 키 없는 Type C | 투자 시선 문장 생략하고 진행 |
| Joseph's Note override 없는 슬러그 | extract_josephs_note() 결과 그대로 사용 |
| 생성 파일 500 bytes 미만 | 실패 기록, 다음으로 진행 |

---

## Claude 검증 기준 (AG 완료 후 Claude가 확인)

1. **Type B 3개 샘플**: 핵심포인트 2개인지, 오프닝이 숫자/데이터로 시작하는지
2. **Type C 3개 샘플**: 투자 시선 문장(green border)이 있는지
3. **Joseph's Note 5개 샘플**: 요약형이 아니라 "한 줄의 생각"인지
4. **전체 해시태그**: 따옴표 없음 확인
5. **ALL_50_naver_drafts_v2.txt** 생성 확인
