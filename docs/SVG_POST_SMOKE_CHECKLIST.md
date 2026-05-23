# SVG 포스트 스모크 체크리스트

정적 SVG 차트(`public/assets/images/blog/svg/`)를 쓰는 포스트 **46건** (슬러그 15×로케일 + KO `tokyo-buying-process-step-by-step`)에 대한 배포 후 검증 목록입니다.

## 자동 검증 (권장)

```bash
node scripts/verify-svg-posts.mjs
# 스테이징: BASE_URL=https://your-preview.vercel.app node scripts/verify-svg-posts.mjs
```

각 항목이 확인하는 것:

| # | 항목 | 통과 조건 |
|---|------|-----------|
| 1 | 포스트 HTTP | `200` |
| 2 | robots | HTML에 `noindex` 없음 |
| 3 | img 참조 | HTML에 해당 `…/svg/{locale}-{slug}.svg` 경로 포함 |
| 4 | SVG HTTP | `200`, `Content-Type`에 `svg` |
| 5 | xmlns | 루트 `<svg xmlns="http://www.w3.org/2000/svg"` |

로컬 파일만 검사:

```bash
python3 scripts/fix_svg_xmlns.py   # 누락 시에만 수정 (idempotent)
```

## 슬러그별 수동 spot-check (15개 × EN/KO/JA)

우선순위 **P0** (GSC·핵심 투자 클러스터):

| 슬러그 | EN | KO | JA |
|--------|----|----|-----|
| `japan-real-estate-three-things` | [/posts/…](https://gsfark.com/posts/japan-real-estate-three-things/) | [/ko/posts/…](https://gsfark.com/ko/posts/japan-real-estate-three-things/) | [/ja/posts/…](https://gsfark.com/ja/posts/japan-real-estate-three-things/) |
| `j-reit-five-things-to-know` | ✓ | ✓ | ✓ |
| `tokyo-buying-process-step-by-step` | ✓ | ✓ (SVG) | ✓ |

**P1** (나머지 SVG 포스트 — 동일 패턴):

`ginza-marunouchi-walk-dna`, `japan-corporate-vs-personal-rental-after-tax-sketch`, `japan-visa-paths-permanent-business-manager-asset-holders`, `korea-japan-inheritance-gift-tax-cross-border-basics`, `nihonbashi-hamacho-walking-guide`, `one-failure-three-lessons-postmortem`, `reading-korea-japan-markets-together`, `three-things-when-fx-shakes`, `tokyo-korean-community-beyond-shinokubo`, `tokyo-moving-contracts-two-notes`, `tokyo-museums-with-kids-five-picks`, `tsukiji-to-toyosu-morning-tokyo`, `why-warm-investing-holds`

수동 확인 시 브라우저에서 **깨진 이미지 아이콘 없음**, cost-stack/다이어그램 라벨 가독성만 보면 됩니다.

## 레거시 한글 URL (GSC 잔존)

구 WP 루트·`/posts/` 한글 슬러그는 `vercel.json` 퍼센트 인코딩 308 → 라틴 슬러그. 배포 후:

```bash
curl -sI -g "https://gsfark.com/%EC%9D%BC%EB%B3%B8-%EB%B6%80%EB%8F%99%EC%82%B0-%ED%88%AC%EC%9E%90-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-3%EA%B0%80%EC%A7%80/" | grep -i location
# → /ko/posts/japan-real-estate-three-things/
```

## GSC «크롤링됨 – 색인 미생성» 참고

- SVG/기술 수정만으로는 색인이 즉시 복구되지 않을 수 있음 (품질·중복·크롤 예산).
- **수정 배포(5/23) 이후** URL 검사 → «색인 생성 요청» + «수정 사항 확인»(Started) 유지.
- 마지막 크롤(5/19)이 **xmlns 수정 전**이면, 재크롤 후 1–3주 관찰이 일반적.
- `site:gsfark.com/posts/japan-real-estate-three-things` 노출 여부로 색인 완료 확인.

## 회귀 방지

- 새 SVG 추가 시 **반드시** `xmlns="http://www.w3.org/2000/svg"` on root `<svg>`.
- 인라인 `<svg>` in markdown 금지 → `public/.../svg/` + `![alt](/assets/.../svg/…)` 패턴 유지.
- PR/배포 전: `node scripts/verify-svg-posts.mjs`.
