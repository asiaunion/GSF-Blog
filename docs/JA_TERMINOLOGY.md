# JA_TERMINOLOGY

## 표기 원칙 (2026-07-06 확정)

| 항목 | 확정 표기 | 금지 변형 | 비고 |
|------|-----------|-----------|------|
| 한글 혼입 | (없음) | `[가-힣]` 포함 문자열 | 본문 내 한글 혼입 절대 금지 |
| 금액 표기 (엔) | `万円`, `億円` 등 | `1,000,000円` | 가독성을 위해 만 단위(万) 사용 (예: `100万円`) |
| 금액 표기 (원) | `ウォン` | `원` | 원화는 가タカナ `ウォン` 사용 |
| 숫자 전각/반각 | 반각 (`123`) | 전각 (`１２３`) | 마크다운 내 숫자는 모두 반각 통일 |
| 알파벳 전각/반각 | 반각 (`ABC`) | 전각 (`ＡＢＣ`) | 알파벳 역시 반각 통일 |

## Hangul allowlist

`scripts/lint-language.mjs`가 JA 본문 `[가-힣]` 검사 시 아래 문자열만 예외 허용 (기본: 비어 있음 = 0건).

```
# 예: 출처 라벨에만 허용할 때 한 줄씩 추가
```

## textlint (prh + preset 단계적 활성화)

- 설정: `.textlintrc.json` · prh: [`docs/ja-prh.yml`](ja-prh.yml)
- 실행: `pnpm lint:ja-textlint` / `pnpm lint:language`
- 설문(규칙별 건수): `node scripts/survey-ja-textlint-rules.mjs`

### 활성화 단계 (2026-07-06)

| Wave | 규칙 | 상태 |
|------|------|------|
| 0 | prh (`ja-prh.yml`) | ✅ |
| 1 | `no-zero-width-spaces`, `no-invalid-control-character`, `no-nfd`, `no-hankaku-kana`, `no-unmatched-pair`, `no-doubled-conjunctive-particle-ga`, `no-dropping-the-ra`, `no-double-negative-ja`, `ja-no-abusage`, `ja-unnatural-alphabet` | ✅ |
| 2 | `arabic-kanji-numbers` | ✅ (75건 auto-fix + 수동) |
| 3 | `max-comma`, `no-doubled-conjunction` | ✅ |
| 4 | `ja-no-successive-word` | ✅ (★표→n/5, 蒲蒲線→蒲田線) |
| 5 | `no-doubled-joshi` | ✅ (234건 → 0, 51파일 전수) |
| 6 | `ja-no-redundant-expression` | ✅ (26건 → 0, 14파일) |
| 7 | `ja-no-mixed-period` | ✅ (49건 → 0, 15파일) |
| 8 | `no-mix-dearu-desumasu` | ✅ (`preferInList`: ですます, 1건 → 0) |
| 9 | `max-ten` · `sentence-length` | ✅ (`max: 4` / `max: 120`, 18건 → 0) |
| — | `max-kanji-continuous-len` | **미활성 확정** (전문용어·고유명사 오탐) |

**미활성:** `ja-no-weak-phrase`, `no-exclamation-question-mark` — Joseph 톤·인용문과 충돌.

## 다음 과제 (미결 — 2026-07-06 Joseph 보류)

Wave 0–9 **완료·prod 반영** — JA textlint 로드맵 종료. 남은 백로그: EN Phase 2 · KO soft terminology 103건 (WEEKLY §📌).

| 순서 | 항목 | 비고 |
|:---:|------|------|
| 1 | EN Phase 2 | WEEKLY §📌 |
| 2 | KO soft terminology 103건 | WEEKLY §📌 |

- 설문: `node scripts/survey-ja-textlint-rules.mjs`
- 백로그 SSOT: [`WEEKLY_STATUS.md`](../WEEKLY_STATUS.md) §📌 미결 백로그
- EN Phase 2 · KO soft 103건: 동일 WEEKLY §📌 표 참조
