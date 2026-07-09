#!/usr/bin/env python3
"""
GSF-Ark → 네이버 블로그 초안 생성기
========================================
사용법:
  python3 scripts/naver_blog_gen.py --slug nihonbashi-the-origin-of-japan
  python3 scripts/naver_blog_gen.py --slug nihonbashi-the-origin-of-japan --dry-run
  python3 scripts/naver_blog_gen.py --list   # 사용 가능한 포스트 목록

출력:
  naver-drafts/[slug]-naver.html   → 네이버 에디터에 붙여넣기용 HTML
  naver-drafts/[slug]-naver.txt    → 검토용 텍스트 요약
"""

import re
import sys
import json
import argparse
from pathlib import Path
from datetime import datetime, timezone, timedelta

BASE_DIR   = Path(__file__).parent.parent
BLOG_DIR   = BASE_DIR / "src" / "data" / "blog"
OUT_DIR    = BASE_DIR / "naver-drafts"
LOG_FILE   = BASE_DIR / "naver-drafts" / "naver-log.json"
SITE_ORIGIN = "https://gsfark.com"
JST = timezone(timedelta(hours=9))

# ── 해시태그 매핑 ────────────────────────────────────────────────────────────
TAG_MAP = {
    # 카테고리
    "essay":      ["에세이", "Joseph의시선", "일본생활"],
    "investment": ["일본부동산투자", "부동산인사이트", "해외투자"],
    "life":       ["도쿄라이프", "일본생활정보", "도쿄일상"],
    # 태그
    "니혼바시":       ["니혼바시", "日本橋", "도쿄중심"],
    "도쿄라이프":      ["도쿄라이프", "도쿄일상"],
    "재개발":         ["도쿄재개발", "부동산개발"],
    "에세이":         ["에세이"],
    "로컬리포트":      ["현지리포트", "로컬인사이트"],
    "일본부동산":      ["일본부동산", "도쿄부동산"],
    "도쿄부동산":      ["도쿄부동산", "일본부동산투자"],
    "외국인투자자":    ["외국인투자", "해외투자"],
    "투자노트":        ["투자노트", "부동산분석"],
    "도쿄워킹가이드":  ["도쿄워킹가이드", "도쿄산책"],
    "하마초":          ["하마초", "니혼바시하마초"],
    "마트":            ["도쿄마트", "도쿄생활"],
    "도쿄":            ["도쿄"],
    "J-REIT":          ["JREIT", "리츠투자", "일본리츠"],
    "환율":            ["엔화환율", "원엔환율", "환율전략"],
    "상속세":          ["일본상속세", "한일세금"],
    "비자":            ["일본비자", "일본이민"],
}

FIXED_TAGS = ["일본부동산", "도쿄부동산", "GSFArk", "gsfark", "Joseph의시선"]

# ── MD 파싱 ──────────────────────────────────────────────────────────────────
def parse_frontmatter(text: str) -> tuple[dict, str]:
    """frontmatter(YAML)와 본문 분리"""
    m = re.match(r'^---\n(.*?)\n---\n(.*)', text, re.DOTALL)
    if not m:
        return {}, text
    yaml_block, body = m.group(1), m.group(2)

    meta = {}
    # title
    t = re.search(r'^title[:\s]+"?([^"\n]+)"?', yaml_block, re.MULTILINE)
    meta['title'] = t.group(1).strip() if t else ''
    # description
    d = re.search(r'^description[:\s]+"?([^"\n]+)"?', yaml_block, re.MULTILINE)
    meta['description'] = d.group(1).strip() if d else ''
    # category
    c = re.search(r'^category[:\s]+(\S+)', yaml_block, re.MULTILINE)
    meta['category'] = c.group(1).strip() if c else 'general'
    # ogImage
    og = re.search(r'^ogImage[:\s]+"?([^"\n]+)"?', yaml_block, re.MULTILINE)
    meta['ogImage'] = og.group(1).strip() if og else ''
    # tags
    tags_block = re.search(r'^tags:(.*?)(?=\n\S|\Z)', yaml_block, re.DOTALL | re.MULTILINE)
    if tags_block:
        meta['tags'] = re.findall(r'^\s+-\s+(.+)$', tags_block.group(1), re.MULTILINE)
    else:
        meta['tags'] = []

    return meta, body.strip()



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
    'tokyo-6-wards-real-estate-insight': '가격은 구역이 만들지 않습니다. 그 구역에 모이는 수요가 만듭니다.',
    'tokyo-core-3-wards-chiyoda-chuo-minato': '비싸면 좋다는 논리는 전략이 아닙니다. 왜 비싼지를 읽는 것이 투자입니다.',
    'tokyo-kita-arakawa-itabashi-nerima': '도심과의 거리보다 노선과의 거리가 가격을 결정합니다.',
    'tokyo-musashino-mitaka-chofu': '행정 경계가 아니라 철도 노선이 자산의 경계를 만듭니다.',
    'tokyo-taito-sumida-koto': '도심과의 괴리가 좁혀지는 속도를 먼저 읽는 사람이 기회를 먼저 잡습니다.',
    'tokyo-toshima-nakano-suginami': '모멘텀을 살 것인가, 안정성을 살 것인가. 그 질문이 곧 전략입니다.',
    'tokyo-shinjuku-shibuya-bunkyo': '같은 도심이라도 무엇을 우선하느냐에 따라 정답이 달라집니다.',
    'j-reit-five-things-to-know': '리츠를 이해하면 부동산 시장의 온도를 한 발 앞서 읽을 수 있습니다.',
    'korea-resident-japan-property-capital-gains-tax': '날짜 하나, 구조 하나가 세금의 크기를 바꿉니다.',
    'japan-real-estate-three-things': '일본 부동산의 규칙을 먼저 이해한 사람이 기회도 먼저 잡습니다.',
    'japan-visa-paths-permanent-business-manager-asset-holders': '자산이 비자를 만들고, 비자가 자산을 지킵니다.',
    'tokyo-buying-process-step-by-step': '절차를 아는 사람만이 협상 테이블에서 주도권을 갖습니다.',
    'tokyo-shinagawa-ota': '인프라가 진화하면 수요가 바뀌고, 수요가 바뀌면 자산이 재평가됩니다.',
    'japan-corporate-vs-personal-rental-after-tax-sketch': '세후 수익은 구조가 결정합니다. 숫자보다 구조를 먼저 설계하십시오.',
    'tokyo-meguro-setagaya': '노선이 가격을 만들고, 라이프스타일이 수요를 만듭니다.',
}

def body_to_naver_html(body: str, slug: str, meta: dict) -> str:

    """
    MD 본문 → 네이버 에디터 호환 HTML 변환
    Voice v1.0 구조: 질문/오프닝 → 발견 → 핵심 포인트 2~3개 → Joseph's Note → 링크
    """
    # ── 섹션 파싱 ──────────────────────────────────────────────────────────
    sections = []
    current_heading = None
    current_content = []
    for line in body.split('\n'):
        if line.startswith('## '):
            if current_heading is not None:
                sections.append((current_heading, '\n'.join(current_content).strip()))
            current_heading = line[3:].strip()
            current_content = []
        else:
            current_content.append(line)
    if current_heading:
        sections.append((current_heading, '\n'.join(current_content).strip()))

    # ── ① 오프닝: 질문/긴장감 문장 ────────────────────────────────────────
    # 인트로 블록 (--- 또는 첫 ## 이전)
    end_intro = body.find('\n---\n')
    if end_intro < 0:
        end_intro = body.find('\n## ')
    intro_block = body[:end_intro].strip() if end_intro > 0 else body[:600]
    intro_lines = []
    for line in intro_block.split('\n'):
        s = line.strip()
        if not s or s.startswith(('!', '#')) or re.match(r'^\*[^*]', s):
            continue
        intro_lines.append(clean_md_inline(s))
    intro_text = ' '.join(filter(None, intro_lines))
    # 첫 1~2문장 (오프닝 훅)
    intro_parts = [p.strip() for p in re.split(r'(?<=[.?!])\s+', intro_text) if p.strip()]
    opening = ' '.join(intro_parts[:2]).strip() if len(intro_parts) >= 2 else intro_parts[0].strip() if intro_parts else ''

    # ── ② 발견: 숫자/비율/핵심 인사이트가 담긴 문장 ──────────────────────
    discovery = extract_discovery(body, sections)

    # ── ③ 핵심 포인트: 섹션 제목 + 한 줄 (처음 3개) ──────────────────────
    post_type = POST_TYPE.get(slug, 'A')
    max_points = 3 if post_type == 'A' else 2
    key_sections = sections[:max_points]

    # ── ④ Joseph's Note: 마지막 섹션의 결론 문장 ──────────────────────────
    josephs_note = JOSEPHS_NOTE_OVERRIDE.get(slug) or extract_josephs_note(sections)

    # ── 공통 ──────────────────────────────────────────────────────────────
    canonical_url = f"{SITE_ORIGIN}/ko/posts/{slug}/"
    og_img = meta.get('ogImage', '')
    if og_img and not og_img.startswith('http'):
        og_img = SITE_ORIGIN + og_img

    # ── CTA 브리지: description 첫 문장 활용 ─────────────────────────────
    desc = meta.get('description', '').strip()
    # description에서 첫 완결 문장 추출
    desc_parts = re.split(r'(?<=[다요음니습])\.\s+', desc)
    desc_first = desc_parts[0].strip() if desc_parts else desc[:80]
    cta_bridge = (
        f'{desc_first}.'
        if desc_first and not desc_first.endswith('.') else desc_first
    )

    # ── HTML 조립 ──────────────────────────────────────────────────────────
    parts = []

    # 대표 이미지
    if og_img:
        parts.append(f'<p><img src="{og_img}" alt="{meta["title"]}" style="max-width:100%;height:auto;" /></p>')

    # 제목
    parts.append(f'<h2 style="color:#2d5a27;font-size:22px;margin-bottom:8px;">{meta["title"]}</h2>')

    # ① 오프닝 (강조 한 줄)
    parts.append(
        f'<p style="color:#888;font-size:13px;margin-bottom:24px;">'
        f'<strong>도쿄 니혼바시에서 데이터를 읽고, 도시를 걷는 투자자의 기록입니다.</strong></p>'
    )
    if opening:
        parts.append(
            f'<p style="color:#333;font-size:17px;font-weight:bold;line-height:1.9;margin-bottom:14px;">'
            f'{opening}</p>'
        )

    # ② 발견 — 모바일 호흡: 문장 단위로 분리해 짧은 단락 2~3개
    if discovery:
        disc_sentences = [p.strip() for p in re.split(r'(?<=[.?!])\s+', discovery) if p.strip()]
        for i, sent in enumerate(disc_sentences):
            sent = sent.strip()
            if not sent:
                continue
            mb = '20px' if i == len(disc_sentences) - 1 else '10px'
            # 마지막 문장은 볼드 강조
            if i == len(disc_sentences) - 1:
                parts.append(
                    f'<p style="color:#555;font-size:16px;line-height:1.95;margin-bottom:{mb};">'
                    f'<strong>{sent}</strong></p>'
                )
            else:
                parts.append(
                    f'<p style="color:#555;font-size:16px;line-height:1.95;margin-bottom:{mb};">'
                    f'{sent}</p>'
                )

    parts.append('<hr style="border:1px solid #e0e0e0;margin:20px 0;" />')

    # ③ 핵심 포인트 3개
    for i, (heading, section_content) in enumerate(key_sections):
        point = extract_first_para(section_content)
        parts.append(
            f'<p style="color:#333;font-size:16px;line-height:1.8;margin-bottom:4px;">'
            f'<strong>📌 {heading}</strong></p>'
        )
        if point:
            parts.append(
                f'<p style="color:#555;font-size:16px;line-height:1.9;'
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
                )

    parts.append('<hr style="border:1px solid #e0e0e0;margin:20px 0;" />')

    # ④ Joseph's Note
    if josephs_note:
        parts.append(
            f'<hr style="border:1px solid #2d5a27;margin:30px 0 10px 0;" />'
            f'<p style="text-align:center;color:#2d5a27;font-size:16px;font-weight:bold;letter-spacing:1px;margin-bottom:10px;">JOSEPH\'S NOTE</p>'
            f'<p style="text-align:center;font-size:15px;font-style:italic;color:#555;margin-bottom:10px;line-height:1.8;">{josephs_note}</p>'
            f'<hr style="border:1px solid #2d5a27;margin:10px 0 50px 0;" />'
        )

    # ⑤ CTA 브리지 + 링크
    parts.append(
        f'<p style="text-align:center;color:#333;font-size:17px;font-weight:bold;line-height:1.85;margin-top:40px;margin-bottom:16px;">'
        f'이 이야기는 여기서 끝나지 않습니다.<br/>'
        f'<span style="font-size:15px;color:#666;font-weight:normal;">전체 데이터와 분석은 GSF-Ark에서 이어집니다.</span></p>'
    )

    parts.append(
        f'<div style="background:#f8f9fa;border:1px solid #e9ecef;padding:30px 20px;border-radius:8px;text-align:center;margin-bottom:40px;">'
        f'<p style="margin-bottom:24px;"><a href="{canonical_url}?utm_source=naver&utm_medium=blog&utm_campaign=blog-broadcast" '
        f'target="_blank" style="text-decoration:none;">'
        f'<strong style="color:#2d5a27;font-size:19px;">📖 GSF-Ark에서 계속 읽기 →</strong></a></p>'
        f'<p style="color:#333;font-size:18px;font-weight:bold;margin-bottom:20px;">{meta["title"]}</p>'
        f'<hr style="border:0;border-top:1px dashed #ccc;margin:20px auto;width:60%;" />'
        f'<p style="color:#555;font-size:16px;line-height:2.0;margin-bottom:20px;">'
        f'✓ 전체 데이터 분석<br/>✓ 주요 지표 변화<br/>✓ 더 깊은 투자 인사이트</p>'
        f'<hr style="border:0;border-top:1px dashed #ccc;margin:20px auto;width:60%;" />'
        f'<p style="color:#777;font-size:14px;font-weight:bold;letter-spacing:1px;margin-top:10px;">GSFArk.com</p>'
        f'</div>'
    )

    # ⑥ 해시태그 — 6개 고정
    hashtags = build_hashtags(meta)
    parts.append(f'<p style="margin-top:20px;color:#888;font-size:13px;">{hashtags}</p>')

    return '\n'.join(parts)


def extract_discovery(body: str, sections: list) -> str:
    """발견: 숫자·배수·핵심 인사이트가 담긴 문장 1개"""
    # 우선순위 1: 배수·비율 패턴이 있는 문장
    ratio_pattern = re.compile(r'[0-9]+\.?[0-9]*\s*(배|×|%|倍|times|x\b)')
    for _, content in sections[:4]:
        for line in content.split('\n'):
            s = clean_md_inline(line.strip())
            if not s or s.startswith('|') or s.startswith('!'):
                continue
            if ratio_pattern.search(s) and len(s) > 20:
                parts = [p.strip() for p in re.split(r'(?<=[.?!])\s+', s) if p.strip()]
                return parts[0].strip()

    # 우선순위 2: 볼드(**...**) 텍스트가 있는 실질 문장 (리스트 항목 완전 제외)
    bold_pattern = re.compile(r'\*\*[^*]+\*\*')
    # 원본 줄에서 리스트 마커 감지 (strip 전후 모두 체크)
    list_marker = re.compile(r'^\s*(\d+\.|\*|-|\+)\s+')
    for _, content in sections[:3]:
        for line in content.split('\n'):
            raw = line.strip()
            if not raw or list_marker.match(raw):   # 리스트 항목 전체 제외
                continue
            if bold_pattern.search(raw) and len(raw) > 20:
                clean = clean_md_inline(raw)
                sents = [p.strip() for p in re.split(r'(?<=[.?!])\s+', clean) if p.strip()]
                candidate = sents[0].strip()
                if len(candidate) > 20:
                    return candidate

    # 우선순위 3: 인트로 두 번째 단락 (에세이 등 숫자 없는 포스트)
    intro_end = body.find('\n---\n')
    if intro_end < 0:
        intro_end = body.find('\n## ')
    if intro_end > 0:
        intro_block = body[:intro_end]
        paras = [p.strip() for p in intro_block.split('\n\n') if p.strip()]
        for para in paras[1:]:  # 첫 단락 건너뜀
            lines = [l.strip() for l in para.split('\n')
                     if l.strip() and not l.strip().startswith('!') and not re.match(r'^\*[^*]', l.strip())]
            if not lines:
                continue
            raw = clean_md_inline(' '.join(lines))
            parts = [p.strip() for p in re.split(r'(?<=[.?!])\s+', raw) if p.strip()]
            candidate = parts[0].strip()
            if len(candidate) > 30:
                return candidate
    return ''


def extract_josephs_note(sections: list) -> str:
    """Joseph's Note: 마지막 섹션의 마지막 완결 문장"""
    # 결론 키워드가 있는 섹션 우선
    conclusion_keywords = ['결론', '마치며', '나가며', 'Joseph', '시사점', '끝으로']
    target_content = ''
    for heading, content in reversed(sections):
        if any(kw in heading for kw in conclusion_keywords):
            target_content = content
            break
    if not target_content and sections:
        target_content = sections[-1][1]

    # 마지막 실질 단락에서 완결 문장 추출
    pronoun_start = re.compile(r'^(그것이|이것이|그래서|따라서|그러므로|결국)')
    paragraphs = [p.strip() for p in target_content.split('\n\n') if p.strip()]
    for para in reversed(paragraphs):
        lines = [l.strip() for l in para.split('\n')
                 if l.strip() and not l.strip().startswith(('|', '!', '```', '-', '*', '#'))]
        if not lines:
            continue
        raw = clean_md_inline(' '.join(lines))
        parts = [p.strip() for p in re.split(r'(?<=[.?!])\s+', raw) if p.strip()]
        # 유효한 문장들 (역순으로 탐색)
        valid = [p.strip() for p in parts if len(p.strip()) > 20]
        for i, p in enumerate(reversed(valid)):
            # 지시대명사로만 시작하면 직전 문장과 합침
            if pronoun_start.match(p) and i + 1 < len(valid):
                prev = valid[len(valid) - i - 2]
                return prev + ' ' + p
            return p
    return ''


def extract_first_para(content: str) -> str:
    """섹션 내용에서 첫 번째 실질 단락 추출 — 완결 문장 1~2개"""
    lines = content.split('\n')
    para_lines = []
    for line in lines:
        stripped = line.strip()
        if not stripped:
            if para_lines:
                break
            continue
        if stripped.startswith(('|', '!', '```', '-', '#')):
            continue
        if re.match(r'^\*[^*]', stripped):   # 이탤릭 줄
            continue
        para_lines.append(stripped)
        if len(' '.join(para_lines)) > 400:  # 충분히 모으기
            break
    raw = clean_md_inline(' '.join(para_lines))
    # 완결 문장 단위 분리
    parts = [p.strip() for p in re.split(r'(?<=[.?!])\s+', raw) if p.strip()]
    result = ''
    for p in parts:
        p = p.strip()
        if not p:
            continue
        candidate = (result + ' ' + p).strip() if result else p
        if len(candidate) > 180:
            break
        result = candidate
        if len(result) > 60:   # 문장이 충분히 길면 1개로 완료
            break
    return result if result else raw[:150]


def clean_md_inline(text: str) -> str:
    """MD 인라인 문법 제거"""
    # 이미지 제거
    text = re.sub(r'!\[.*?\]\(.*?\)', '', text)
    # 링크 → 텍스트만
    text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
    # 볼드/이탤릭
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'\*([^*]+)\*', r'\1', text)
    # 인라인 코드
    text = re.sub(r'`([^`]+)`', r'\1', text)
    # sup 태그
    text = re.sub(r'<sup[^>]*>.*?</sup>', '', text, flags=re.DOTALL)
    # HTML 태그
    text = re.sub(r'<[^>]+>', '', text)
    # 연속 공백
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def build_hashtags(meta: dict) -> str:
    """태그 + 카테고리 → 네이버 해시태그 문자열"""
    tags = set(FIXED_TAGS)

    # 카테고리 매핑
    cat = meta.get('category', '')
    if cat in TAG_MAP:
        tags.update(TAG_MAP[cat])

    # MD 태그 매핑
    for t in meta.get('tags', []):
        if t in TAG_MAP:
            tags.update(TAG_MAP[t])
        else:
            # 태그 자체를 해시태그로 (따옴표·특수문자 제거)
            clean = re.sub(r'["\'\s\-]', '', t)
            if clean:
                tags.add(clean)

    # 최대 6개 (네이버 Voice v1.2 확정): 고정 태그 우선, 나머지 콘텐츠 태그
    fixed = [t for t in FIXED_TAGS if t in tags][:3]   # GSFArk, gsfark, Joseph의시선
    rest  = sorted([t for t in tags if t not in FIXED_TAGS])
    final = (fixed + rest)[:6]
    return ' '.join(f'#{t}' for t in final)


# ── 로그 관리 ──────────────────────────────────────────────────────────────
def load_log() -> dict:
    if LOG_FILE.exists():
        return json.loads(LOG_FILE.read_text(encoding='utf-8'))
    return {"published": [], "pending_slugs": []}


def save_log(log: dict):
    OUT_DIR.mkdir(exist_ok=True)
    LOG_FILE.write_text(json.dumps(log, ensure_ascii=False, indent=2), encoding='utf-8')


# ── 메인 ───────────────────────────────────────────────────────────────────
def list_posts():
    ko_dir = BLOG_DIR / 'ko'
    slugs = sorted([f.stem for f in ko_dir.glob('*.md')])
    print(f"\n사용 가능한 KO 포스트 ({len(slugs)}개):")
    for s in slugs:
        print(f"  {s}")
    print()


def generate(slug: str, dry_run: bool = False):
    ko_path = BLOG_DIR / 'ko' / f'{slug}.md'
    if not ko_path.exists():
        print(f"❌ 파일 없음: {ko_path}")
        sys.exit(1)

    text = ko_path.read_text(encoding='utf-8')
    meta, body = parse_frontmatter(text)

    print(f"\n📄 포스트: {slug}")
    print(f"   제목: {meta.get('title', '(없음)')}")
    print(f"   카테고리: {meta.get('category', '(없음)')}")
    print(f"   태그: {', '.join(meta.get('tags', []))}")

    html = body_to_naver_html(body, slug, meta)
    hashtags = build_hashtags(meta)
    canonical = f"{SITE_ORIGIN}/ko/posts/{slug}/"

    if dry_run:
        print("\n[DRY-RUN] HTML 미리보기 (처음 500자):")
        print(html[:500])
        print(f"\n[DRY-RUN] 해시태그: {hashtags}")
        print(f"[DRY-RUN] 원문 링크: {canonical}")
        return

    # 파일 저장
    OUT_DIR.mkdir(exist_ok=True)
    html_path = OUT_DIR / f'{slug}-naver.html'
    txt_path  = OUT_DIR / f'{slug}-naver.txt'

    html_path.write_text(html, encoding='utf-8')

    summary = (
        f"# 네이버 블로그 초안: {slug}\n\n"
        f"- 생성일시: {datetime.now(JST).strftime('%Y-%m-%d %H:%M JST')}\n"
        f"- 원문: {canonical}\n"
        f"- 제목: {meta.get('title', '')}\n"
        f"- 카테고리: {meta.get('category', '')}\n"
        f"- 해시태그: {hashtags}\n\n"
        f"## 붙여넣기 절차\n"
        f"1. blog.naver.com/gsfark → 글쓰기\n"
        f"2. 에디터 우측 상단 'HTML' 버튼 클릭\n"
        f"3. {slug}-naver.html 내용 전체 붙여넣기\n"
        f"4. 제목 입력: {meta.get('title', '')}\n"
        f"5. 카테고리 선택 후 발행\n"
    )
    txt_path.write_text(summary, encoding='utf-8')

    # 로그 업데이트
    log = load_log()
    already = [p['slug'] for p in log.get('published', [])]
    if slug not in already:
        log.setdefault('generated', []).append({
            "slug": slug,
            "generated_at": datetime.now(JST).isoformat(),
            "title": meta.get('title', ''),
            "html_file": str(html_path.name),
            "canonical": canonical,
            "status": "draft"
        })
        save_log(log)

    print(f"\n✅ 생성 완료!")
    print(f"   HTML: {html_path}")
    print(f"   TXT:  {txt_path}")
    print(f"\n📋 붙여넣기 절차:")
    print(f"   1. blog.naver.com/gsfark → 글쓰기")
    print(f"   2. 에디터 HTML 모드로 전환")
    print(f"   3. {html_path.name} 내용 전체 붙여넣기")
    print(f"   4. 제목: {meta.get('title', '')}")
    print(f"   5. 발행")


def main():
    parser = argparse.ArgumentParser(description='GSF-Ark → 네이버 블로그 초안 생성기')
    parser.add_argument('--slug',    help='포스트 slug (ko/ 기준)')
    parser.add_argument('--dry-run', action='store_true', help='파일 저장 없이 미리보기')
    parser.add_argument('--list',    action='store_true', help='사용 가능한 포스트 목록')
    args = parser.parse_args()

    if args.list:
        list_posts()
        return

    if not args.slug:
        parser.print_help()
        sys.exit(1)

    generate(args.slug, dry_run=args.dry_run)


if __name__ == '__main__':
    main()
