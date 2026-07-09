# AG 지시문 — 네이버 블로그 일일 발행 관리

## 배경
GSF-Ark(gsfark.com) 네이버 블로그 초안 50개가 `naver-drafts/` 안에 생성되어 있음.
Joseph이 하루 1개씩 수동으로 발행 (네이버 에디터에 HTML 붙여넣기).
AG의 역할: 오늘 발행할 포스트 안내 + 발행 완료 로그 기록.

---

## AG 역할

**할 것**
- 오늘 발행할 포스트 슬러그·제목·HTML 경로 안내
- 발행 완료 확인 후 `naver-log.json` 업데이트
- 남은 포스트 수 및 완료 예정일 계산

**하지 않을 것**
- 실제 네이버 발행 (Joseph이 직접)
- HTML 파일 재생성 (이미 완료됨)

---

## 실행 순서

### STEP 1 — 오늘 발행 포스트 확인

```bash
cd /Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark
python3 -c "
import json
with open('naver-drafts/naver-log.json') as f:
    d = json.load(f)

published_slugs = {p['slug'] for p in d.get('published', [])}

# 발행 순서: generated 최신 고유 목록
seen = {}
for g in d['generated']:
    seen[g['slug']] = g
all_slugs = list(seen.values())

pending = [g for g in all_slugs if g['slug'] not in published_slugs]

if not pending:
    print('🎉 전체 발행 완료!')
else:
    next_post = pending[0]
    print(f'오늘 발행 포스트:')
    print(f'  슬러그: {next_post[\"slug\"]}')
    print(f'  제목: {next_post[\"title\"]}')
    print(f'  파일: naver-drafts/{next_post[\"html_file\"]}')
    print(f'  링크: {next_post[\"canonical\"]}')
    print(f'  남은 포스트: {len(pending)}개')
"
```

### STEP 2 — HTML 내용 Joseph에게 전달

```bash
cat "naver-drafts/[SLUG]-naver.html"
```

Joseph이 이 내용을 네이버 블로그 에디터 > HTML 모드에 붙여넣고 발행.

---

### STEP 3 — 발행 완료 후 로그 업데이트

Joseph이 발행 완료를 알리면:

```bash
python3 -c "
import json
from datetime import datetime, timezone, timedelta

slug = '[SLUG]'  # 발행한 슬러그로 교체

with open('naver-drafts/naver-log.json') as f:
    d = json.load(f)

# 제목 찾기
seen = {}
for g in d['generated']:
    seen[g['slug']] = g
meta = seen.get(slug, {})

entry = {
    'slug': slug,
    'title': meta.get('title', ''),
    'published_at': datetime.now(timezone(timedelta(hours=9))).isoformat(),
    'html_file': meta.get('html_file', f'{slug}-naver.html'),
    'canonical': meta.get('canonical', ''),
}

d.setdefault('published', []).append(entry)

with open('naver-drafts/naver-log.json', 'w', ensure_ascii=False) as f:
    json.dump(d, f, ensure_ascii=False, indent=2)

published_count = len(d['published'])
total = 50
print(f'✅ 발행 기록 완료: {slug}')
print(f'진행률: {published_count}/{total} ({published_count/total*100:.0f}%)')
"
```

---

## 에러 처리

| 상황 | 대응 |
|------|------|
| HTML 파일 없음 | `ls naver-drafts/[SLUG]-naver.html` 확인 후 리포트 |
| naver-log.json 파싱 오류 | 파일 내용 출력 후 Joseph에게 확인 요청 |
| 모든 포스트 발행 완료 | 완료 메시지 출력, 태스크 종료 |

---

## 완료 조건

- `naver-log.json`의 `published` 배열에 50개 항목 기록
- 모든 항목에 `published_at` (JST) 포함

---

## 참고

- 초안 파일 위치: `naver-drafts/[SLUG]-naver.html`
- 발행 로그: `naver-drafts/naver-log.json`
- 발행 시작일: 2026-07-09
- 발행 완료 예정: 2026-08-27 (50일)
