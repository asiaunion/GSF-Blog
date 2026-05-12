#!/usr/bin/env python3
"""E1 핵심3구 인포그래픽 — 개선판 (2026-05-12)
변경사항:
- 색상 2톤 절제 (Blue+Slate+Gold)
- 서울 비교 기준 추가
- 원화 환산 병기
- 인사이트 텍스트 추가
- 라이트/다크 양립
"""

# ── 환율 ──────────────────────────────────────────────
JPY_KRW = 9.1  # 1엔 ≈ 9.1원 (2025 기준)

def man_to_krw(man_en):
    """만엔 → 억원 (반올림)"""
    krw = man_en * 10000 * JPY_KRW
    if krw >= 100000000:
        return f"약 {krw/100000000:.1f}억원"
    return f"약 {krw/10000:.0f}만원"

# ── 데이터 ────────────────────────────────────────────
WARDS = ["千代田区", "港区", "中央区"]
COLORS = ["#3b82f6", "#f59e0b", "#64748b"]  # Blue, Gold, Slate
AREA_COLORS = ["var(--ig-blue)", "var(--ig-gold)", "var(--ig-slate-stroke)"]

PRICE_MANSION = [220, 195, 165]   # 万円/㎡
RENT_1LDK    = [19.5, 22.3, 16.8] # 万円/月
INCOME       = [812, 1163, 625]    # 万円/年
FOREIGNER    = [6.2, 10.8, 8.1]   # %
YIELD        = [2.9, 3.2, 3.8]    # %

# 서울 비교 기준
SEOUL_COMPARE = {
    "income":  "서울 강남구 가구소득 약 7,500만원 (2024)",
    "mansion": "서울 강남구 아파트 약 1,300~1,800만원/㎡ (2025)",
}

# 万円 → 원화
PRICE_KRW = [f"≈ {p*10000*JPY_KRW/10000:.0f}만원/㎡" for p in PRICE_MANSION]
INCOME_KRW = [man_to_krw(i) for i in INCOME]

# 막대 최대값 (퍼센트 계산용)
MAX_PRICE = max(PRICE_MANSION)
MAX_RENT  = max(RENT_1LDK)

def bar_row(name, value, max_val, color, unit, krw_note=""):
    pct = value / max_val * 100
    return f"""
      <div class="bar-row">
        <span class="bar-row__name" style="color:{color}">{name}</span>
        <div class="bar-row__track">
          <div class="bar-row__fill" style="width:{pct:.1f}%;background:{color}">{value}</div>
        </div>
        <span class="bar-row__value">{value}{unit}{f'<br><small style="color:var(--ig-text-muted);font-size:8px">{krw_note}</small>' if krw_note else ''}</span>
      </div>"""

def donut_arc(pct, color, offset, r=52):
    """SVG 도넛 아크 생성"""
    circ = 2 * 3.14159 * r
    dash = pct / 100 * circ
    gap  = circ - dash
    return f'<circle cx="70" cy="70" r="{r}" fill="none" stroke="{color}" stroke-width="14" stroke-dasharray="{dash:.1f} {gap:.1f}" stroke-dashoffset="-{offset:.1f}" stroke-linecap="round"/>'

# 도넛: 外国人比率
total_f = sum(FOREIGNER)
offsets = [0]
for i, f in enumerate(FOREIGNER[:-1]):
    offsets.append(offsets[-1] + f/total_f * 2*3.14159*52)

donut_arcs = "".join(donut_arc(f/total_f*100, COLORS[i], offsets[i]) for i, f in enumerate(FOREIGNER))

bar_prices = "".join(bar_row(WARDS[i], PRICE_MANSION[i], MAX_PRICE, COLORS[i], "万円/㎡", PRICE_KRW[i]) for i in range(3))
bar_rents  = "".join(bar_row(WARDS[i], RENT_1LDK[i], MAX_RENT, COLORS[i], "万円/月") for i in range(3))

income_rows = "".join(f"""
        <div class="ranking-item">
          <span class="ranking-num" style="color:{COLORS[i]}">{i+1}</span>
          <span class="ranking-name">{WARDS[i]}</span>
          <span class="ranking-val" style="color:{COLORS[i]}">{INCOME[i]:,}万円<br>
            <small style="font-size:9px;color:var(--ig-text-muted)">{INCOME_KRW[i]}</small></span>
        </div>""" for i in sorted(range(3), key=lambda x: INCOME[x], reverse=True))

yield_rows = "".join(f"""
        <div class="ranking-item">
          <span class="ranking-num" style="color:{COLORS[sorted(range(3),key=lambda x:YIELD[x],reverse=True)[i]]}">
            {i+1}</span>
          <span class="ranking-name">{WARDS[sorted(range(3),key=lambda x:YIELD[x],reverse=True)[i]]}</span>
          <span class="ranking-val" style="color:{COLORS[sorted(range(3),key=lambda x:YIELD[x],reverse=True)[i]]}">
            {YIELD[sorted(range(3),key=lambda x:YIELD[x],reverse=True)[i]]}%</span>
        </div>""" for i in range(3))

E1_HTML = f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>E1 — 도쿄 핵심 3구 부동산 인포그래픽</title>
<link rel="stylesheet" href="design-tokens.css">
<style>
body {{
  margin: 0; background: var(--ig-bg-base);
  display: flex; justify-content: center;
  padding: 24px; box-sizing: border-box; min-height: 100vh;
}}
.ig-wrap {{ max-width: 820px; width: 100%; display: flex; flex-direction: column; gap: 16px; }}
.two-col {{ display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }}
.three-col {{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }}
section.ig-card {{ padding: 24px; }}
.section-title {{
  font-size: 10px; font-weight: 700; color: var(--ig-text-muted);
  text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 14px;
}}
.ig-divider {{
  border: none; border-top: 1px solid var(--ig-bg-card-border); margin: 16px 0;
}}
@media (max-width: 600px) {{
  .two-col, .three-col {{ grid-template-columns: 1fr; }}
}}
</style>
</head>
<body>
<button class="ig-theme-toggle" id="themeToggle" title="라이트/다크 전환">☀️</button>

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
      {bar_prices}
    </div>
    <hr class="ig-divider">
    <div class="bar-group">
      <div class="section-title">1LDK 월세 (万円/月)</div>
      {bar_rents}
    </div>
  </div>

  <!-- 도넛 + 소득 랭킹 -->
  <div class="two-col">
    <div class="ig-card">
      <div class="section-title">외국인 주민 비율</div>
      <div style="display:flex;align-items:center;gap:20px">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="52" fill="none" stroke="var(--ig-bg-card)" stroke-width="14"/>
          {donut_arcs}
          <text x="70" y="66" text-anchor="middle" class="donut-center-text"
                fill="var(--ig-text-primary)" font-family="Inter,sans-serif" font-size="16" font-weight="800">
            {sum(FOREIGNER)/3:.1f}%</text>
          <text x="70" y="80" text-anchor="middle" fill="var(--ig-text-muted)"
                font-family="Inter,sans-serif" font-size="8">3구 평균</text>
        </svg>
        <div style="display:flex;flex-direction:column;gap:8px">
          {" ".join(f'<div class="ig-legend__item"><span class="ig-legend__dot" style="background:{COLORS[i]}"></span>{WARDS[i]} {FOREIGNER[i]}%</div>' for i in range(3))}
        </div>
      </div>
      <div class="ig-insight" style="margin-top:12px">
        외국인 비율이 높은 港区(10.8%)는 글로벌 비즈니스 수요로 공실률이 낮음
      </div>
    </div>

    <div class="ig-card">
      <div class="section-title">세대 평균 연소득 순위</div>
      {income_rows}
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
        {yield_rows}
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
btn.addEventListener('click', () => {{
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  btn.textContent = next === 'dark' ? '☀️' : '🌙';
}});
</script>
</body>
</html>"""

with open("../e1-core3-infographic.html", "w", encoding="utf-8") as f:
    f.write(E1_HTML)

print("E1 생성 완료")
