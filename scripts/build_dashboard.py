import json
import os

with open('naver-drafts/naver-log.json', 'r', encoding='utf-8') as f:
    log = json.load(f)

# Filter unique slugs
seen = set()
unique_posts = []
for p in reversed(log['generated']):
    if p['slug'] not in seen:
        seen.add(p['slug'])
        unique_posts.append(p)
unique_posts.reverse()

html_out = """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>네이버 블로그 발행 대시보드</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; max-width: 900px; margin: 0 auto; background: #f8f9fa; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 12px; border-left: 5px solid #03c75a; display: flex; justify-content: space-between; align-items: center;}
        h1 { color: #03c75a; margin-bottom:30px;}
        .post-title { font-size: 16px; font-weight: 600; color: #333; }
        .post-title span { font-size: 13px; color: #888; margin-right: 15px; }
        a.btn { background: #03c75a; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; text-decoration: none; font-size: 14px; transition: background 0.2s;}
        a.btn:hover { background: #02b351; }
        .instruction { background: #e8f5e9; padding: 25px; border-radius: 8px; margin-bottom: 30px; line-height: 1.8;}
        .instruction strong { color: #2d5a27; font-size: 18px; }
    </style>
</head>
<body>
    <h1>네이버 블로그 발행 대시보드</h1>
    <div class="instruction">
        <strong>📋 올바른 복사 & 붙여넣기 절차</strong><br><br>
        1. 네이버 블로그 스마트에디터 ONE의 글쓰기 창을 엽니다.<br>
        2. 아래 목록에서 <strong>[포스트 열기]</strong> 버튼을 클릭하면 <strong>새 탭에 글이 렌더링되어 나타납니다.</strong><br>
        3. 열린 새 탭에서 <strong>화면 전체를 선택(Cmd + A)하고 복사(Cmd + C)</strong> 합니다.<br>
        4. 네이버 에디터 본문에 <strong>그대로 붙여넣기(Cmd + V)</strong> 합니다.<br>
        5. 에디터 본문 최상단에 들어간 제목(초록색 큰 글씨)을 잘라내어 <strong>제목 입력 칸</strong>으로 옮기고 발행합니다.<br><br>
        <span style="color:#d32f2f;font-weight:bold;">※ 주의: 'HTML 모드'로 전환하실 필요가 전혀 없습니다! 에디터 기본 화면(일반 모드)에서 바로 붙여넣으세요.</span>
    </div>
"""

for idx, p in enumerate(unique_posts):
    title = p['title']
    html_file = p['html_file']  # e.g. xxx-naver.html
    
    html_out += f"""
    <div class="card">
        <div class="post-title"><span>{idx+1}</span> {title}</div>
        <a href="{html_file}" target="_blank" class="btn">포스트 열기 ↗</a>
    </div>
    """

html_out += """
</body>
</html>
"""

with open('naver-drafts/paste_dashboard.html', 'w', encoding='utf-8') as f:
    f.write(html_out)
print("Dashboard updated at naver-drafts/paste_dashboard.html")
