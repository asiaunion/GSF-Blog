---
title: "도쿄 핵심 3구 완전 분석: 치요다·주오·미나토 — 이주·투자 데이터 가이드 [Ep.1]"
description: "도쿄 23구 시리즈 첫 편. 치요다·주오·미나토 3구의 맨션 매매가, 임대 시세, 세대 소득, 외국인 생활 환경을 구별로 심층 분석합니다. 외국인 투자자가 가장 선호하는 도쿄 1번지의 실전 데이터."
pubDatetime: 2026-05-19T09:00:00Z
author: GSF
draft: false
lang: ko
category: investment
ogImage: "https://gsfark.com/assets/images/blog/tokyo-core-3-wards-hero.webp"
tags:
  - 도쿄
  - 치요다구
  - 주오구
  - 미나토구
  - 부동산
  - 맨션
  - 이주
  - 투자
sources:
  - "https://www.toukei.metro.tokyo.lg.jp/"
  - "https://www.lifull.com/homes/"
  - "https://suumo.jp/"
  - "https://www.nta.go.jp/publication/statistics/kokuzeicho/minkan2023/minkan.htm"
references:
  - "https://www.toukei.metro.tokyo.lg.jp/"
  - "https://suumo.jp/"
---

도쿄 23구 브랜드 가이드 시리즈 **Ep.1**입니다. [Ep.0 프롤로그](/ko/posts/tokyo-ward-guide-series-prologue/)에서 소개한 12편 시리즈의 첫 번째 심화편으로, 이번 편에서는 **핵심 3구(都心3区)** — 千代田区(치요다), 中央区(주오), 港区(미나토) — 를 다룹니다.

이 세 구는 도쿄에서 가장 비싸고, 가장 상징적이며, 외국인 투자자가 가장 많이 찾는 지역입니다. 하지만 "핵심 3구"라는 하나의 묶음으로 보면 놓치는 것이 많습니다. 세 구는 각각 완전히 다른 성격과 수요 기반을 가지고 있습니다. 구별 데이터를 직접 비교하면서 살펴보겠습니다.

> **데이터 기준 시점**: 2025~2026년 상반기. 부동산 시세는 분기별로 변동하므로 출처 링크에서 최신 데이터를 확인하세요.

<!-- 도쿄 핵심 3구 위치 도식 지도 — 다크카드 에디토리얼 -->
<div class="infographic-card">
<svg viewBox="0 0 720 420" role="img" aria-label="도쿄 핵심 3구 위치 지도 — 치요다·주오·미나토" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>.lbl{font-family:sans-serif;pointer-events:none;}</style>
    <filter id="e1-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.5"/>
    </filter>
    <filter id="e1-glow-b" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <linearGradient id="bay-e1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0f1729" stop-opacity="0.1"/>
    </linearGradient>
  </defs>

  <!-- 배경 -->
  <rect width="720" height="420" fill="#0f1729"/>

  <!-- 그리드 -->
  <line x1="0" y1="140" x2="720" y2="140" stroke="#fff" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="0" y1="280" x2="720" y2="280" stroke="#fff" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="240" y1="0" x2="240" y2="420" stroke="#fff" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="480" y1="0" x2="480" y2="420" stroke="#fff" stroke-opacity="0.03" stroke-width="1"/>

  <!-- ── 주변구 (회색 배경) ── -->
  <!-- 新宿区 -->
  <path d="M 95,90 L 220,85 L 225,120 L 230,155 L 205,185 L 155,190 L 100,175 L 88,135 Z"
        fill="#1c2333" stroke="#2d3748" stroke-width="1"/>
  <text x="158" y="138" text-anchor="middle" fill="#4b5563" font-size="10" class="lbl">新宿</text>

  <!-- 文京区 -->
  <path d="M 305,52 L 365,48 L 378,78 L 370,108 L 335,115 L 305,100 L 298,72 Z"
        fill="#1c2333" stroke="#2d3748" stroke-width="1"/>
  <text x="338" y="84" text-anchor="middle" fill="#4b5563" font-size="10" class="lbl">文京</text>

  <!-- 台東区 -->
  <path d="M 450,48 L 510,44 L 520,78 L 510,108 L 478,115 L 448,100 L 438,68 Z"
        fill="#1c2333" stroke="#2d3748" stroke-width="1"/>
  <text x="478" y="82" text-anchor="middle" fill="#4b5563" font-size="10" class="lbl">台東</text>

  <!-- 渋谷区 -->
  <path d="M 88,195 L 155,190 L 160,230 L 148,268 L 108,275 L 78,248 L 80,215 Z"
        fill="#1c2333" stroke="#2d3748" stroke-width="1"/>
  <text x="120" y="235" text-anchor="middle" fill="#4b5563" font-size="10" class="lbl">渋谷</text>

  <!-- 品川区 -->
  <path d="M 188,355 L 268,340 L 330,358 L 328,392 L 260,400 L 195,395 Z"
        fill="#1c2333" stroke="#2d3748" stroke-width="1"/>
  <text x="262" y="378" text-anchor="middle" fill="#4b5563" font-size="10" class="lbl">品川</text>

  <!-- 墨田区 -->
  <path d="M 510,108 L 558,100 L 572,138 L 560,172 L 520,178 L 505,148 Z"
        fill="#1c2333" stroke="#2d3748" stroke-width="1"/>
  <text x="537" y="142" text-anchor="middle" fill="#4b5563" font-size="10" class="lbl">墨田</text>

  <!-- 江東区 -->
  <path d="M 520,178 L 560,172 L 580,215 L 572,268 L 528,282 L 498,252 L 490,208 Z"
        fill="#1c2333" stroke="#2d3748" stroke-width="1"/>
  <text x="535" y="228" text-anchor="middle" fill="#4b5563" font-size="10" class="lbl">江東</text>

  <!-- 도쿄만 -->
  <path d="M 490,285 Q 540,275 590,295 Q 640,315 670,370 L 720,385 L 720,420 L 440,420 Z"
        fill="url(#bay-e1)" stroke="#1e3a8a" stroke-width="0.5" stroke-opacity="0.5"/>
  <text x="598" y="362" text-anchor="middle" fill="#3b82f6" font-size="12" font-weight="600" class="lbl" opacity="0.7">東京湾</text>

  <!-- 스미다강 -->
  <path d="M 490,44 Q 505,115 502,195 Q 498,250 508,310" stroke="#1d4ed8" stroke-width="4" fill="none" stroke-linecap="round" stroke-opacity="0.6"/>
  <text x="522" y="168" fill="#3b82f6" font-size="9" class="lbl" opacity="0.7">隅田川</text>

  <!-- ── 핵심 3구 (강조) ── -->
  <!-- 千代田区 — 사파이어 블루 -->
  <path id="e1-chiyoda" d="M 225,85 L 370,78 L 378,108 L 380,140 L 360,168 L 310,178 L 255,172 L 230,155 L 225,120 Z"
        fill="#1e3a8a" stroke="#3b82f6" stroke-width="2.5" filter="url(#e1-shadow)"/>
  <!-- 황궁 -->
  <ellipse cx="290" cy="132" rx="30" ry="20" fill="#064e3b" stroke="#10b981" stroke-width="1.5" opacity="0.9"/>
  <text x="290" y="128" text-anchor="middle" fill="#34d399" font-size="8" font-weight="700" class="lbl">皇居</text>
  <text x="290" y="142" text-anchor="middle" fill="#6ee7b7" font-size="7" class="lbl">(황궁)</text>
  <!-- 치요다 레이블 -->
  <text x="345" y="118" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="800" class="lbl">千代田</text>
  <text x="345" y="135" text-anchor="middle" fill="#60a5fa" font-size="10" class="lbl">치요다</text>
  <text x="345" y="152" text-anchor="middle" fill="#475569" font-size="9" class="lbl">마루노우치·아키하바라</text>

  <!-- 中央区 — 에메랄드 그린 -->
  <path id="e1-chuo" d="M 360,168 L 448,148 L 462,185 L 458,245 L 428,262 L 370,268 L 330,258 L 310,220 L 310,178 Z"
        fill="#064e3b" stroke="#10b981" stroke-width="2.5" filter="url(#e1-shadow)"/>
  <text x="394" y="210" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="800" class="lbl">中央</text>
  <text x="394" y="227" text-anchor="middle" fill="#34d399" font-size="10" class="lbl">주오</text>
  <text x="394" y="244" text-anchor="middle" fill="#475569" font-size="9" class="lbl">긴자·니혼바시·쓰키지</text>

  <!-- 港区 — 로즈 레드 -->
  <path id="e1-minato" d="M 100,175 L 155,190 L 205,185 L 255,172 L 310,178 L 310,220 L 330,258 L 328,310 L 290,338 L 225,345 L 165,328 L 108,298 L 88,252 L 88,215 Z"
        fill="#4c0519" stroke="#f43f5e" stroke-width="2.5" filter="url(#e1-shadow)"/>
  <text x="208" y="262" text-anchor="middle" fill="#fda4af" font-size="13" font-weight="800" class="lbl">港</text>
  <text x="208" y="279" text-anchor="middle" fill="#f87171" font-size="10" class="lbl">미나토</text>
  <text x="208" y="296" text-anchor="middle" fill="#475569" font-size="9" class="lbl">롯폰기·아자부·시로가네</text>

  <!-- ── 방위 ── -->
  <g transform="translate(682,38)">
    <circle r="20" fill="#fff" fill-opacity="0.04" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/>
    <text x="0" y="-4" text-anchor="middle" fill="#f59e0b" font-size="15" font-weight="900" class="lbl">↑</text>
    <text x="0" y="10" text-anchor="middle" fill="#6b7280" font-size="8" class="lbl">北</text>
  </g>

  <!-- ── 타이틀 ── -->
  <text x="360" y="24" text-anchor="middle" fill="#f1f5f9" font-size="14" font-weight="800" class="lbl">도쿄 핵심 3구 (都心3区) 위치 개요</text>
  <text x="360" y="40" text-anchor="middle" fill="#64748b" font-size="9" class="lbl">행정 경계 기반 단순화 · Wikimedia Tokyo special wards map 참고</text>

  <!-- ── 범례 ── -->
  <rect x="20" y="388" width="680" height="26" rx="6" fill="#fff" fill-opacity="0.03" stroke="#fff" stroke-opacity="0.06" stroke-width="1"/>
  <rect x="32" y="396" width="12" height="12" rx="2" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="50" y="406" fill="#94a3b8" font-size="9" class="lbl">千代田 — 권위·행정</text>
  <rect x="178" y="396" width="12" height="12" rx="2" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
  <text x="196" y="406" fill="#94a3b8" font-size="9" class="lbl">中央 — 상업·금융</text>
  <rect x="322" y="396" width="12" height="12" rx="2" fill="#4c0519" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="340" y="406" fill="#94a3b8" font-size="9" class="lbl">港 — 국제·럭셔리</text>
  <rect x="462" y="396" width="12" height="12" rx="2" fill="#1c2333" stroke="#4b5563" stroke-width="1"/>
  <text x="480" y="406" fill="#4b5563" font-size="9" class="lbl">인접구 (참고)</text>
</svg>
</div>


---

## 목차

1. [千代田区(치요다) — 황궁과 권력의 구](#1-千代田区-치요다)
2. [中央区(주오) — 긴자와 금융의 구](#2-中央区-주오)
3. [港区(미나토) — 국제도시 도쿄의 얼굴](#3-港区-미나토)
4. [3구 비교 요약 매트릭스](#4-3구-비교-요약)
5. [외국인 매입 주의사항](#5-외국인-매입-주의사항)

---

## 1. 千代田区(치요다)

### 브랜드 포지셔닝

치요다구는 도쿄에서 가장 '권위 있는' 구입니다. 황궁(皇居), 국회의사당, 총리 관저, 최고재판소가 모두 이 구 안에 있습니다. 마루노우치와 오테마치는 일본 대기업 본사와 메가뱅크가 밀집한 금융·업무 중심지이고, 지요다구 북동쪽의 아키하바라는 세계적인 전자·서브컬처 거점입니다.

주거지로서 치요다구는 독특한 위치입니다. 23구 중 **인구가 가장 적은 구**(약 6만 7천 명)임에도, 낮 동안 유입되는 직장인과 방문객은 80만 명을 초과합니다. 주거 공간 자체가 희소한 만큼, 맨션 가격은 도쿄 최고 수준을 유지합니다.

### 맨션 평균 매매가

| 서브지역 | ㎡ 단가 (2025~2026) | 坪(평) 단가 환산 |
|---------|---------------------|-----------------|
| 마루노우치·오테마치 인근 | 190~250만엔/㎡ | 630~830만엔/坪 |
| 지요다·히비야 인근 | 160~210만엔/㎡ | 530~700만엔/坪 |
| 아키하바라·간다 인근 | 110~150만엔/㎡ | 365~500만엔/坪 |
| **구 전체 평균** | **약 150만엔/㎡** | **약 500만엔/坪** |

치요다구의 맨션 공급 자체가 절대적으로 적습니다. 신축 분양 물건이 나올 때마다 수개월 내 완판되는 것이 일반적이며, 중고 물건도 리스팅 후 빠르게 소화됩니다.

### 임대 평균 시세

| 타입 | 월세 범위 | 주요 지역 |
|------|-----------|-----------|
| 1R (원룸) | 12~18만엔/월 | 아키하바라·간다 주변 |
| 1K / 1DK | 15~25만엔/월 | 구 전반 |
| 1LDK | 25~45만엔/월 | 히비야·반초 주변 |
| 2LDK | 45~90만엔/월 | 반초·이치가야 |
| 3LDK+ | 80만엔~/ 월 | 고급 타워 맨션 |

반초(番町) 지역은 도쿄에서 가장 유서 깊은 고급 주거지 중 하나로, 외교관·경영자급 입주자가 많습니다.

### 평균 세대 소득

치요다구의 납세자 평균 연수입은 **약 950만엔** 수준으로, 도쿄 23구 평균(약 450~500만엔)의 약 2배입니다. 단, 실제 거주 인구 기반 통계이므로 낮 시간 유동 인구의 소득 수준은 이를 훨씬 상회합니다.

### 인구수

| 항목 | 수치 |
|------|------|
| 총인구 | 약 67,000명 (23구 중 최소) |
| 인구 밀도 | 약 4,100명/㎢ (23구 중 최저 수준) |
| 주간 유동인구 | 약 800,000명 이상 |
| 최근 트렌드 | 재개발에 따른 주거용 맨션 증가로 인구 완만 증가 중 |

### 외국인 비율

치요다구의 외국인 주민 비율은 **약 4.5%** 수준입니다. 재외공관 근무자, 다국적 기업 주재원, 국제기구 직원이 많습니다. 한국인 커뮤니티는 신오쿠보(신주쿠구)에 비하면 소규모이지만, 기업 주재원 중심의 한국인 거주자가 있습니다.

### 추천 타깃

- **이주자**: 직장이 마루노우치·오테마치에 있고 통근 시간을 최소화하려는 전문직. 예산이 충분하다면 반초·히비야 지역 추천.
- **투자자**: 희소성과 브랜드 가치가 높아 장기 보유 가치는 탁월. 임대 수익률은 낮지만(연 2~3%) 자산 가치 방어력 최강.
- **여행자**: 황궁 외원, 히비야 공원, 아키하바라가 도보권. 관광·비즈니스 겸용 숙소로 최적.

### 대표 명소

- **황궁 외원(皇居外苑)** — 도심 속 대규모 녹지. 조깅 코스로 유명. 황거 참관 신청 가능(사전 예약 필수).
- **마루노우치 나카도리** — 800m 가로수길, 계절마다 다른 야외 전시.
- **아키하바라 전기거리** — 세계적 전자상가·서브컬처 거점. 이주자에게는 가전 구입 첫 번째 선택지.
- **KITTE(키테)** — 구 도쿄 중앙 우체국 리노베이션 상업시설. 옥상 정원에서 도쿄역 파노라마 조망(무료).

---

## 2. 中央区(주오)

### 브랜드 포지셔닝

주오구는 "도쿄의 가장 오래된 심장"입니다. 에도 시대부터 상업의 중심지였던 니혼바시(日本橋), 일본 최고 지가를 20년째 유지 중인 긴자(銀座), 그리고 최근 재개발 물결이 밀려드는 쓰키지·도요스 연계 지역까지 다양한 얼굴을 가지고 있습니다.

주오구는 치요다구보다 주거 인구가 많고(약 19만 명), 생활 인프라도 더 풍부합니다. 고급 주거와 상업 기능이 공존하며, 외국인 주재원에게 매우 인기 있는 구입니다.

### 맨션 평균 매매가

| 서브지역 | ㎡ 단가 (2025~2026) | 坪(평) 단가 환산 |
|---------|---------------------|-----------------|
| 긴자·쓰키지 | 150~220만엔/㎡ | 500~730만엔/坪 |
| 니혼바시·교바시 | 120~180만엔/㎡ | 400~600만엔/坪 |
| 하마초·쓰키지마 | 90~130만엔/㎡ | 300~430만엔/坪 |
| **구 전체 평균** | **약 130만엔/㎡** | **약 430만엔/坪** |

니혼바시 주변의 재개발이 이어지며 신축 타워 맨션 공급이 증가하고 있습니다. 코레도 무로마치(COREDO Muromachi) 등 복합 개발이 지역 브랜드를 끌어올리고 있으며, 이는 맨션 가격 상승의 주요 동력입니다.

> 관련 포스트: [코레도 니혼바시·미쓰이 재개발 분석](/ko/posts/coredo-nihonbashi-mitsui-redevelopment/)

### 임대 평균 시세

| 타입 | 월세 범위 |
|------|-----------|
| 1R | 10~16만엔/월 |
| 1K / 1DK | 13~22만엔/월 |
| 1LDK | 22~38만엔/월 |
| 2LDK | 35~70만엔/월 |
| 3LDK+ | 60만엔~/월 |

긴자·쓰키지 쪽 고층 타워는 최상층 유닛 기준 월 100만엔을 초과하는 물건도 다수입니다.

### 평균 세대 소득

주오구의 납세자 평균 연수입은 **약 730만엔** 수준으로 도쿄 평균을 크게 상회합니다. 긴자·니혼바시 상권 종사자와 금융·무역업 중심의 주재원 거주자 비율이 높습니다.

### 인구수

| 항목 | 수치 |
|------|------|
| 총인구 | 약 191,000명 |
| 인구 밀도 | 약 17,000명/㎢ |
| 최근 트렌드 | 타워 맨션 신축으로 2000년 이후 인구 2배 이상 증가 — 도쿄에서 가장 빠른 인구 성장세 중 하나 |

### 외국인 비율

주오구의 외국인 주민 비율은 **약 5.5%** 로 핵심 3구 중 상대적으로 높습니다. 중국계, 한국계 거주자를 포함한 아시아계 외국인과 서구계 금융·무역 주재원이 함께 섞여 있습니다.

### 추천 타깃

- **이주자**: 생활 편의성과 도심 접근성을 모두 원하는 싱글·커플. 하마초·쓰키지 주변은 핵심 3구 중 그나마 합리적인 임대가 구간.
- **투자자**: 타워 맨션 임대 수익률이 핵심 3구 중 상대적으로 나은 편(연 3~4%). 니혼바시 재개발 수혜 지역 중장기 보유 유력.
- **여행자**: 긴자 쇼핑, 쓰키지 시장, 하마리큐 정원 — 도쿄 핵심 관광을 도보로 커버 가능.

### 대표 명소

- **긴자(銀座)** — 일본 최고 지가 상권. 명품 플래그십, 보행자 천국(토·일).
- **쓰키지 장외시장** — 해산물 아침 시장. 이주 후 생활권에서 가장 가까운 식재료 시장.
- **하마리큐 온시 정원** — 에도 시대 장군 별장. 스카이라인을 배경으로 한 정원(입장 300엔).
- **니혼바시** — 모든 일본 국도의 기점. 재개발 한복판의 역사 유산.

---

## 3. 港区(미나토)

### 브랜드 포지셔닝

미나토구는 핵심 3구 중 가장 "국제적"인 구입니다. 롯폰기(六本木), 아자부(麻布), 아카사카(赤坂), 시로가네(白金), 시바우라(芝浦) — 이름만으로도 서울의 이태원, 강남, 성수동을 복합한 이미지가 그려지는 동네들이 한 구 안에 공존합니다.

미나토구에는 160개 이상의 외국 대사관과 공관이 위치하며, 도쿄에서 외국인 주민 비율이 가장 높은 구입니다. 롯폰기 힐스, 도쿄 미드타운, 아자부다이 힐스 등 도쿄를 대표하는 복합 랜드마크가 밀집해 있습니다.

### 맨션 평균 매매가

| 서브지역 | ㎡ 단가 (2025~2026) | 坪(평) 단가 환산 |
|---------|---------------------|-----------------|
| 아자부·히로오 | 180~280만엔/㎡ | 600~930만엔/坪 |
| 롯폰기·아카사카 | 150~230만엔/㎡ | 500~760만엔/坪 |
| 시로가네·시로가네다이 | 140~210만엔/㎡ | 465~700만엔/坪 |
| 시바우라·다마치 | 100~150만엔/㎡ | 330~500만엔/坪 |
| **구 전체 평균** | **약 160만엔/㎡** | **약 530만엔/坪** |

아자부다이 힐스(2023년 개업) 입주 이후 인근 고급 맨션 시세가 추가 상승했습니다. 외국인 구매자가 특히 아자부·히로오 지역에 집중됩니다.

> 관련 포스트: [도심 5구 맨션 평당가 비교](/ko/posts/tokyo-mansion-tsubo-chiyoda-chuo-minato/)

### 임대 평균 시세

| 타입 | 월세 범위 |
|------|-----------|
| 1R | 13~20만엔/월 |
| 1K / 1DK | 16~28만엔/월 |
| 1LDK | 28~55만엔/월 |
| 2LDK | 50~120만엔/월 |
| 3LDK+ | 100만엔~/월 |

아자부·히로오의 3LDK 이상 고급 임대는 외국계 기업의 사택 계약이 많으며, 월 200만엔을 초과하는 물건도 드물지 않습니다.

### 평균 세대 소득

미나토구의 납세자 평균 연수입은 **약 1,200만엔** 이상으로, 도쿄 23구에서 1위입니다. 고액 연봉 금융인, 외국계 기업 임원, 외교관이 다수 거주합니다.

### 인구수

| 항목 | 수치 |
|------|------|
| 총인구 | 약 266,000명 |
| 인구 밀도 | 약 13,500명/㎢ |
| 최근 트렌드 | 재개발 랜드마크 입주 효과로 꾸준한 인구 증가 |

### 외국인 비율

미나토구의 외국인 주민 비율은 **약 11~12%** 로 23구 중 최고 수준입니다. 영어·중국어로 생활 가능한 환경이 잘 갖춰져 있으며, 외국인 전용 부동산 중개 서비스도 풍부합니다. 한국인 커뮤니티는 아카사카·롯폰기 중심으로 존재합니다.

### 추천 타깃

- **이주자**: 영어 환경을 원하는 외국인 이주자에게 단연 최적. 인터내셔널 스쿨, 외국인 병원, 다국적 슈퍼마켓 접근성 최상.
- **투자자**: 외국인 임차인 수요가 풍부해 임대 공실 리스크 최소. 임대 수익률은 연 2.5~3.5%이나 자산 희소성과 외화 헤지 기능으로 장기 보유 선호.
- **여행자**: 롯폰기 힐스 모리 미술관, 국립 신미술관, 도쿄 타워가 모두 도보권.

### 대표 명소

- **롯폰기 힐스 모리 미술관** — 도쿄 현대미술의 랜드마크. 53층 전망대(도쿄 시티뷰)와 겸용.
- **아자부다이 힐스** — 2023년 개업한 도쿄 최신 복합 랜드마크. 모리 JP 타워 최고층 330m.
- **히로오 상점가** — 외국인 이주자가 가장 먼저 찾는 다국적 슈퍼마켓 밀집지.
- **도쿄 타워** — 미나토구 시바코엔 내. 야경 조망 명소.

---

## 4. 3구 비교 요약

| 항목 | 千代田(치요다) | 中央(주오) | 港(미나토) |
|------|--------------|-----------|-----------|
| 구 면적 | 11.66㎢ | 10.21㎢ | 20.37㎢ |
| 인구 | ~67,000 | ~191,000 | ~266,000 |
| 외국인 비율 | ~4.5% | ~5.5% | ~11% |
| 맨션 평균 ㎡ 단가 | 150만엔 | 130만엔 | 160만엔 |
| 납세자 평균 연수입 | ~950만엔 | ~730만엔 | ~1,200만엔 |
| 임대 수익률 (참고) | 2~3% | 3~4% | 2.5~3.5% |
| 핵심 이미지 | 권위·행정·금융 | 상업·문화·재개발 | 국제·럭셔리·대사관 |
| 외국인 생활 편의성 | ★★★☆ | ★★★★ | ★★★★★ |



<!-- 핵심 3구 부동산 인포그래픽 — GeoJSON 데이터 기반 -->
<div class="infographic-card core-wards-ig" style="padding:0;background:var(--ig-bg-base, #070e1f)">

<div class="ig-wrap">

  <!-- 헤더 -->
  <div class="ig-card">
    <div class="ig-header">
      <div>
        <h1 class="ig-title">도쿄 핵심 3구 — 부동산 완전 분석</h1>
        <p class="ig-subtitle">千代田区 · 港区 · 中央区 · 실거래가 기준 2024–2025</p>
      </div>
      <div class="ig-source">Source: 東京都統計, SUUMO<br>© 2026 GSF</div>
    </div>

    <!-- KPI 4열 -->
    <div class="ig-kpi-grid">
      <div class="ig-kpi ig-kpi--accent">
        <div class="ig-kpi__label">최고 매매가 (㎡)</div>
        <div class="ig-kpi__value">220<span class="ig-kpi__unit">万円</span></div>
        <div class="ig-kpi__sub">千代田区 · ≈2,000만원/㎡</div>
        <div class="ig-kpi__delta ig-kpi__delta--up">↑ 23구 평균의 3.7배</div>
      </div>
      <div class="ig-kpi">
        <div class="ig-kpi__label">최고 월세 (1LDK)</div>
        <div class="ig-kpi__value">22.3<span class="ig-kpi__unit">万円</span></div>
        <div class="ig-kpi__sub">港区 · ≈203만원/월</div>
        <div class="ig-kpi__delta ig-kpi__delta--up">↑ 강남 최고가 대비 +40%</div>
      </div>
      <div class="ig-kpi">
        <div class="ig-kpi__label">최고 세대소득</div>
        <div class="ig-kpi__value">1,163<span class="ig-kpi__unit">万円</span></div>
        <div class="ig-kpi__sub">港区 · ≈1.06억원/년</div>
        <div class="ig-kpi__delta ig-kpi__delta--up">↑ 23구 평균의 2.1배</div>
      </div>
      <div class="ig-kpi">
        <div class="ig-kpi__label">표면 수익률 (최고)</div>
        <div class="ig-kpi__value">3.8<span class="ig-kpi__unit">%</span></div>
        <div class="ig-kpi__sub">中央区 · 서울 강남 1.5~2.0% 대비</div>
        <div class="ig-kpi__delta ig-kpi__delta--up">↑ 약 2배 높은 수익률</div>
      </div>
    </div>

    <div class="ig-insight">
      <strong>→ 핵심 인사이트:</strong> 港区는 도쿄 23구에서 세대소득 1위(1,163万円),
      월세 1위(22.3万円)이지만 표면수익률은 3.2%로 오히려 中央区(3.8%)가 투자 효율 1위.
      서울 강남구(수익률 1.5~2.0%)와 비교해 도쿄 도심은 임대 수익 효율이 현저히 우수.
    </div>
  </div>

  <!-- 매매가 + 월세 -->
  <div class="ig-card">
    <div class="bar-group">
      <div class="section-title">맨션 매매가 (万円/㎡)</div>
      
      <div class="bar-row">
        <span class="bar-row__name" style="color:#3b82f6">千代田区</span>
        <div class="bar-row__track">
          <div class="bar-row__fill" style="width:100.0%;background:#3b82f6">220</div>
        </div>
        <span class="bar-row__value">220万円/㎡<br><small style="color:var(--ig-text-muted);font-size:8px">≈ 2002만원/㎡</small></span>
      </div>
      <div class="bar-row">
        <span class="bar-row__name" style="color:#f59e0b">港区</span>
        <div class="bar-row__track">
          <div class="bar-row__fill" style="width:88.6%;background:#f59e0b">195</div>
        </div>
        <span class="bar-row__value">195万円/㎡<br><small style="color:var(--ig-text-muted);font-size:8px">≈ 1774만원/㎡</small></span>
      </div>
      <div class="bar-row">
        <span class="bar-row__name" style="color:#64748b">中央区</span>
        <div class="bar-row__track">
          <div class="bar-row__fill" style="width:75.0%;background:#64748b">165</div>
        </div>
        <span class="bar-row__value">165万円/㎡<br><small style="color:var(--ig-text-muted);font-size:8px">≈ 1502만원/㎡</small></span>
      </div>
    </div>
    <hr class="ig-divider">
    <div class="bar-group">
      <div class="section-title">1LDK 월세 (万円/月)</div>
      
      <div class="bar-row">
        <span class="bar-row__name" style="color:#3b82f6">千代田区</span>
        <div class="bar-row__track">
          <div class="bar-row__fill" style="width:87.4%;background:#3b82f6">19.5</div>
        </div>
        <span class="bar-row__value">19.5万円/月</span>
      </div>
      <div class="bar-row">
        <span class="bar-row__name" style="color:#f59e0b">港区</span>
        <div class="bar-row__track">
          <div class="bar-row__fill" style="width:100.0%;background:#f59e0b">22.3</div>
        </div>
        <span class="bar-row__value">22.3万円/月</span>
      </div>
      <div class="bar-row">
        <span class="bar-row__name" style="color:#64748b">中央区</span>
        <div class="bar-row__track">
          <div class="bar-row__fill" style="width:75.3%;background:#64748b">16.8</div>
        </div>
        <span class="bar-row__value">16.8万円/月</span>
      </div>
    </div>
  </div>

  <!-- 도넛 + 소득 랭킹 -->
  <div class="two-col">
    <div class="ig-card">
      <div class="section-title">외국인 주민 비율</div>
      <div style="display:flex;align-items:center;gap:20px">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="52" fill="none" stroke="var(--ig-bg-card)" stroke-width="14"/>
          <circle cx="70" cy="70" r="52" fill="none" stroke="#3b82f6" stroke-width="14" stroke-dasharray="80.7 246.0" stroke-dashoffset="-0.0" stroke-linecap="round"/><circle cx="70" cy="70" r="52" fill="none" stroke="#f59e0b" stroke-width="14" stroke-dasharray="140.6 186.1" stroke-dashoffset="-80.7" stroke-linecap="round"/><circle cx="70" cy="70" r="52" fill="none" stroke="#64748b" stroke-width="14" stroke-dasharray="105.4 221.3" stroke-dashoffset="-221.3" stroke-linecap="round"/>
          <text x="70" y="66" text-anchor="middle" class="donut-center-text"
                fill="var(--ig-text-primary)" font-family="Inter,sans-serif" font-size="16" font-weight="800">
            8.4%</text>
          <text x="70" y="80" text-anchor="middle" fill="var(--ig-text-muted)"
                font-family="Inter,sans-serif" font-size="8">3구 평균</text>
        </svg>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div class="ig-legend__item"><span class="ig-legend__dot" style="background:#3b82f6"></span>千代田区 6.2%</div> <div class="ig-legend__item"><span class="ig-legend__dot" style="background:#f59e0b"></span>港区 10.8%</div> <div class="ig-legend__item"><span class="ig-legend__dot" style="background:#64748b"></span>中央区 8.1%</div>
        </div>
      </div>
      <div class="ig-insight" style="margin-top:12px">
        외국인 비율이 높은 港区(10.8%)는 글로벌 비즈니스 수요로 공실률이 낮음
      </div>
    </div>

    <div class="ig-card">
      <div class="section-title">세대 평균 연소득 순위</div>
      
        <div class="ranking-item">
          <span class="ranking-num" style="color:#f59e0b">2</span>
          <span class="ranking-name">港区</span>
          <span class="ranking-val" style="color:#f59e0b">1,163万円<br>
            <small style="font-size:9px;color:var(--ig-text-muted)">약 1.1억원</small></span>
        </div>
        <div class="ranking-item">
          <span class="ranking-num" style="color:#3b82f6">1</span>
          <span class="ranking-name">千代田区</span>
          <span class="ranking-val" style="color:#3b82f6">812万円<br>
            <small style="font-size:9px;color:var(--ig-text-muted)">약 7389만원</small></span>
        </div>
        <div class="ranking-item">
          <span class="ranking-num" style="color:#64748b">3</span>
          <span class="ranking-name">中央区</span>
          <span class="ranking-val" style="color:#64748b">625万円<br>
            <small style="font-size:9px;color:var(--ig-text-muted)">약 5688만원</small></span>
        </div>
      <div class="ig-insight" style="margin-top:12px">
        참고: 도쿄 23구 평균 545万円 · 서울 강남구 약 7,500만원(≈825万円)
      </div>
    </div>
  </div>

  <!-- 수익률 -->
  <div class="ig-card">
    <div class="section-title">투자 수익률 (표면이율) — 서울 강남 비교</div>
    <div class="two-col">
      <div>
        
        <div class="ranking-item">
          <span class="ranking-num" style="color:#64748b">
            1</span>
          <span class="ranking-name">中央区</span>
          <span class="ranking-val" style="color:#64748b">
            3.8%</span>
        </div>
        <div class="ranking-item">
          <span class="ranking-num" style="color:#f59e0b">
            2</span>
          <span class="ranking-name">港区</span>
          <span class="ranking-val" style="color:#f59e0b">
            3.2%</span>
        </div>
        <div class="ranking-item">
          <span class="ranking-num" style="color:#3b82f6">
            3</span>
          <span class="ranking-name">千代田区</span>
          <span class="ranking-val" style="color:#3b82f6">
            2.9%</span>
        </div>
        <div class="ig-insight" style="margin-top:12px">
          <strong>참고 — 서울 강남구:</strong> 표면수익률 약 1.5~2.0% (2025 기준)<br>
          도쿄 핵심3구는 수익률이 약 1.5~2배 높음
        </div>
      </div>
      <div style="display:flex;flex-direction:column;justify-content:center;gap:12px;padding:8px">
        <div class="ig-kpi">
          <div class="ig-kpi__label">서울 강남 비교</div>
          <div class="ig-kpi__value" style="font-size:18px">1.5~2.0<span class="ig-kpi__unit">%</span></div>
          <div class="ig-kpi__sub">서울 강남구 평균 표면이율</div>
        </div>
        <div class="ig-kpi ig-kpi--accent">
          <div class="ig-kpi__label">도쿄 중앙구 우위</div>
          <div class="ig-kpi__value" style="font-size:18px">+1.8<span class="ig-kpi__unit">%p</span></div>
          <div class="ig-kpi__sub">中央区 3.8% vs 강남 2.0%</div>
          <div class="ig-kpi__delta ig-kpi__delta--up">↑ 약 1.9배</div>
        </div>
      </div>
    </div>
  </div>

</div>

<script>
const btn = document.getElementById('themeToggle');
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
btn.textContent = isDark ? '☀️' : '🌙';
btn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  btn.textContent = next === 'dark' ? '☀️' : '🌙';
});
</script>
</div>
<script>

const btn = document.getElementById('themeToggle');
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
btn.textContent = isDark ? '☀️' : '🌙';
btn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  btn.textContent = next === 'dark' ? '☀️' : '🌙';
});

</script>


---


## 5. 외국인 매입 주의사항

### 법적 제한

일본은 외국인의 부동산 취득에 법적 제한이 없습니다. 단, **토지 취득의 경우** 특정 지역(방위 시설 인근 등)은 사전 신고 의무가 있습니다. 핵심 3구 내 일반 맨션(구분소유)은 해당 없습니다.

### 대출(모기지)

- **비거주자**: 일본 은행 대출은 사실상 불가. 현금 매수 또는 본국 자산 담보 활용.
- **거주자(재류자격 보유)**: 일부 은행(미즈호·UFJ·스미토모)에서 외국인 대출 취급. 필요 서류: 재류카드, 원천징수표 2년분, 고용계약서.

### 관리비·수선적립금

핵심 3구 고급 타워 맨션은 관리비와 수선적립금 합산이 월 **5~15만엔**에 달하는 경우가 있습니다. 구입가와 별도로 반드시 확인이 필요합니다.

### 언어·행정

- 주오구청, 미나토구청은 외국어 대응 창구 운영(영어·중국어).
- 치요다구청은 영어 대응 가능하나 일부 절차는 일본어 전용.
- 부동산 계약 시 공인 이중언어 통역사 또는 외국인 전문 중개업체 이용 권장.

---

## 이 시리즈의 다음 편

**[Ep.2] 핵심 6구 — 도쿄의 얼굴: 新宿·渋谷·文京** — 다음 주 발행 예정.

상업의 신주쿠, 트렌드의 시부야, 학문의 분쿄. 핵심 3구와 어깨를 나란히 하는 두 번째 프리미엄 레이어를 해부합니다.

---

*면책 조항: 이 글은 정보 제공 및 교육 목적으로만 작성되었으며, 투자 권유, 법률 자문, 세무 상담을 구성하지 않습니다. 부동산 시세는 시장 상황에 따라 수시로 변동합니다. 모든 재무적 결정을 내리기 전에 반드시 자격을 갖춘 전문가와 상담하시기 바랍니다.*
