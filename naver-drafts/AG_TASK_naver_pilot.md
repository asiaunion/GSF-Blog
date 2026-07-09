# AG 위임: 네이버 블로그 파일럿 실행

생성일시: 2026-07-09
우선순위: HIGH
작업 유형: 스크립트 실행 → 결과 확인

---

## 1. 실행 명령

```bash
cd /Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark

# Step 1: dry-run 확인
python3 scripts/naver_blog_gen.py --slug nihonbashi-the-origin-of-japan --dry-run

# Step 2: 문제 없으면 실제 생성
python3 scripts/naver_blog_gen.py --slug nihonbashi-the-origin-of-japan
```

## 2. 기대 출력

- `naver-drafts/nihonbashi-the-origin-of-japan-naver.html` 생성
- `naver-drafts/nihonbashi-the-origin-of-japan-naver.txt` 생성
- `naver-drafts/naver-log.json` 생성

## 3. 성공 기준

- [ ] html 파일 크기 > 500 bytes
- [ ] html 안에 `gsfark.com/ko/posts/nihonbashi-the-origin-of-japan/` 링크 포함
- [ ] html 안에 해시태그 `#GSFArk` 포함
- [ ] 오류 없이 종료 (returncode 0)

## 4. 실패 시

오류 메시지 전문을 ACTIVITY_LOG에 기록 후 Joseph에게 보고.
수정은 하지 말고 보고만 할 것.

## 5. 완료 후

결과를 `/Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark/naver-drafts/AG_RESULT_naver_pilot.md`에 기록:
- 실행 시각
- 생성된 파일 목록
- html 파일 처음 20줄
- 성공/실패 여부
