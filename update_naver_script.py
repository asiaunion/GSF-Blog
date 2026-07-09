import os

file_path = '/Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark/scripts/naver_blog_gen.py'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Insert Dictionaries above `def body_to_naver_html`
dicts_code = """
POST_TYPE = {
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

def body_to_naver_html(body: str, slug: str, meta: dict) -> str:
"""

content = content.replace("def body_to_naver_html(body: str, slug: str, meta: dict) -> str:", dicts_code)

# 2. Modify max points extraction
target_points = "    # ── ③ 핵심 포인트: 섹션 제목 + 한 줄 (처음 3개) ──────────────────────\n    key_sections = sections[:3]"
new_points = """    # ── ③ 핵심 포인트: 섹션 제목 + 한 줄 (처음 3개) ──────────────────────
    post_type = POST_TYPE.get(slug, 'A')
    max_points = 3 if post_type == 'A' else 2
    key_sections = sections[:max_points]"""

content = content.replace(target_points, new_points)

# 3. Modify joseph's note extraction
target_note = "    # ── ④ Joseph's Note: 마지막 섹션의 결론 문장 ──────────────────────────\n    josephs_note = extract_josephs_note(sections)"
new_note = """    # ── ④ Joseph's Note: 마지막 섹션의 결론 문장 ──────────────────────────
    josephs_note = JOSEPHS_NOTE_OVERRIDE.get(slug) or extract_josephs_note(sections)"""

content = content.replace(target_note, new_note)

# 4. Modify key sections iteration to add INVESTMENT_LENS
target_loop = """    # ③ 핵심 포인트 3개
    for heading, content in key_sections:
        point = extract_first_para(content)
        parts.append(
            f'<p style="color:#333;font-size:15px;line-height:1.8;margin-bottom:4px;">'
            f'<strong>📌 {heading}</strong></p>'
        )
        if point:
            parts.append(
                f'<p style="color:#555;font-size:15px;line-height:1.9;'
                f'margin-bottom:16px;padding-left:16px;border-left:2px solid #e0e0e0;">'
                f'{point}</p>'
            )"""

new_loop = """    # ③ 핵심 포인트 3개
    for i, (heading, section_content) in enumerate(key_sections):
        point = extract_first_para(section_content)
        parts.append(
            f'<p style="color:#333;font-size:15px;line-height:1.8;margin-bottom:4px;">'
            f'<strong>📌 {heading}</strong></p>'
        )
        if point:
            parts.append(
                f'<p style="color:#555;font-size:15px;line-height:1.9;'
                f'margin-bottom:16px;padding-left:16px;border-left:2px solid #e0e0e0;">'
                f'{point}</p>'
            )
            
        if post_type == 'C' and i == len(key_sections) - 1:
            lens = INVESTMENT_LENS.get(slug, '')
            if lens:
                parts.append(
                    f'<p style="color:#2d5a27;font-size:14px;font-style:italic;'
                    f'line-height:1.85;margin-bottom:16px;padding-left:16px;'
                    f'border-left:2px solid #2d5a27;">{lens}</p>'
                )"""
content = content.replace(target_loop, new_loop)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated naver_blog_gen.py")
