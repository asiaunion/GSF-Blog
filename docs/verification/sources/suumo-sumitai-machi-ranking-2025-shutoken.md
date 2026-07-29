# Source Card — SUUMO 住みたい街ランキング2025 首都圏版

> **Owner:** Cursor · GSF-Ark  
> **등록:** 2026-07-29 (Ep.13) · **정정:** 2026-07-29 (Claude FAIL → AG 재검증 · 沿線 **4위**)  
> **유형:** 주거 **선호도 설문** (가격·실거래의 원인이 아님)  
> **Evidence 층:** Interpretation / soft demand — Data(MLIT·통근) 뒤에만 보조로 사용

---

## 0. 정정 메모 (필수 읽기)

| 항목 | 오류(1차 AG) | 정정(Claude 실측 + AG 재확인) |
|------|--------------|------------------------------|
| SUUMO 기사 URL | `.../sumimachi2025syutoken_eki/` (**駅** 순위) | `.../sumimachi2025syutoken_sonota/` (**沿線·기타** 순위) |
| JR中央線 | 3위 (2위=東急東横線로 오인) | **4위 · 410점** (2위=JR京浜東北線 · 3위=東急東横線) |
| 교훈 | HTTP 200 ≠ 인용 수치 정합 | **페이지 종류(駅 vs 沿線)와 표 숫자를 같이 대조** |

---

## 1. 공식 URL (`[1차 확인]` HTTP 200)

| # | 자료 | URL |
|---|------|-----|
| 1 | Recruit 보도 (2025-03-06) | https://www.recruit.co.jp/newsroom/pressrelease/2025/0306_15539.html |
| 2 | 조사결과 상세 PDF (연선 표) | https://www.recruit.co.jp/wp-content/uploads/2025/07/20250306_housing_02.pdf |
| 3 | SUUMO **沿線** 순위 기사 (`sonota`) | https://suumo.jp/article/oyakudachi/oyaku/sumai_nyumon/data/sumimachi2025syutoken_sonota/ |
| — | (참고) SUUMO **駅** 순위 (`eki`) — 沿線 인용에 **쓰지 말 것** | https://suumo.jp/article/oyakudachi/oyaku/sumai_nyumon/data/sumimachi2025syutoken_eki/ |

## 2. 로컬 보관본

| 파일 | 용도 |
|------|------|
| [`/assets/sources/recruit-202503-suumo-sumitai-machi-ranking-2025-shutoken.pdf`](../../../public/assets/sources/recruit-202503-suumo-sumitai-machi-ranking-2025-shutoken.pdf) | PDF 스냅샷 — 외부 URL 만료 대비 |

권리는 Recruit/SUUMO에 있음. 보관본은 검증 편의용.

---

## 3. 인용 가능한 사실 (고정 · 2025 沿線)

| 순위 | 沿線 | 득점 |
|-----:|------|-----:|
| 1 | JR山手線 | 864 |
| 2 | JR京浜東北線 | 525 |
| 3 | 東急東横線 | 425 |
| **4** | **JR中央線** | **410** |

- 조사명: **SUUMO 住みたい街ランキング2025 首都圏版**（住みたい沿線）
- 발표: **2025-03** (Recruit 보도 2025-03-06)
- 부가: 기사에 전년(2024) 주오선 3위(411점) → 2025년 4위(410점) 하락 언급 있음 — 필요 시만 인용
- 인용 시 반드시 **「연선별」** 명시 (駅별·街별과 혼동 금지)

---

## 4. 사용 규칙 (HARD)

| 허용 | 금지 |
|------|------|
| MLIT·통근 **주증거 뒤** 보조 각주 1줄 | “랭킹 때문에 시세가 높다” |
| 「상위 5위권(4위)」절제 톤 | 「압도적 브랜드」「3위」재사용 |
| citeSources = 보도 + PDF + **`sonota`** | `eki` URL로 沿線 숫자 연결 |
| Ep.9 등 주오선 문맥 재사용 | 駅 랭킹(요코하마·오미야·키치조지…)을 연선 서사에 섞기 |

Voice: Evidence First. 이 카드는 **Interpretation 보조**.

---

## 5. 재사용 체크리스트

- [ ] 주증거(실거래·통근)가 먼저인가?
- [ ] URL이 **`sonota`(沿線)** 인가? (`eki`면 FAIL)
- [ ] 순위가 **4위·410점**인가? (3위면 구오류)
- [ ] “연선별” 명시 · 시세 인과 단정 0

### 재사용 후보

- Ep.9 `tokyo-musashino-mitaka-chofu`
- 주오선·다마 통근 비교 Part N
- SNS: 발견=직통 시간 · 보조=선호 상위 5위권(4위)

---

## 6. Manifest claim 템플릿

```json
{
  "id": "SUUMO-ensen-rank-chuo-2025",
  "label": "SUUMO 住みたい街2025 首都圏 沿線 JR中央線 순위",
  "value": 4,
  "unit": "rank",
  "tier": "secondary",
  "layer": "B",
  "method": "official_press_pdf",
  "evidence": {
    "url": "https://suumo.jp/article/oyakudachi/oyaku/sumai_nyumon/data/sumimachi2025syutoken_sonota/",
    "press": "https://www.recruit.co.jp/newsroom/pressrelease/2025/0306_15539.html",
    "pdf": "https://www.recruit.co.jp/wp-content/uploads/2025/07/20250306_housing_02.pdf",
    "archive": "/assets/sources/recruit-202503-suumo-sumitai-machi-ranking-2025-shutoken.pdf",
    "score": 410,
    "note": "沿線別 4位 — 価格因果に使わない · ekiページ禁止"
  }
}
```

---

## 7. 변경 이력

| 일자 | 내용 |
|------|------|
| 2026-07-29 | 초판(3위·eki 오류 포함) |
| 2026-07-29 | Claude FAIL → **4위·410점·sonota** 정정 · KO 보조 각주 톤 하향 · 본 카드 SSOT 갱신 |
