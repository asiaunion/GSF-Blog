import os

file_path = '/Users/gsf/.gemini/antigravity/scratch/projects/GSF-Ark/scripts/naver_blog_gen.py'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all occurrences of the bad regexes
bad_regex = r"re.split(r'(?<=[다요음니습])\.\s+|(?<=[다요음니])\s+(?=[가-힣A-Z])'"
good_regex = r"re.split(r'(?<=[.?!])\s+'"

# Since we want to add list comprehension:
# "intro_parts = re.split(r'(?<=[다요음니습])\.\s+|(?<=[다요음니])\s+(?=[가-힣A-Z])', intro_text)" -> "intro_parts = [p.strip() for p in re.split(r'(?<=[.?!])\s+', intro_text) if p.strip()]"

content = content.replace(
    "intro_parts = re.split(r'(?<=[다요음니습])\.\s+|(?<=[다요음니])\s+(?=[가-힣A-Z])', intro_text)",
    "intro_parts = [p.strip() for p in re.split(r'(?<=[.?!])\\s+', intro_text) if p.strip()]"
)

content = content.replace(
    "disc_sentences = re.split(r'(?<=[다요음니습])\.\s+', discovery)",
    "disc_sentences = [p.strip() for p in re.split(r'(?<=[.?!])\\s+', discovery) if p.strip()]"
)

content = content.replace(
    "parts = re.split(r'(?<=[다요음니습])\.\s+|(?<=[다요음니])\s+(?=[가-힣A-Z])', s)",
    "parts = [p.strip() for p in re.split(r'(?<=[.?!])\\s+', s) if p.strip()]"
)

content = content.replace(
    "sents = re.split(r'(?<=[다요음니습])\.\s+|(?<=[다요음니])\s+(?=[가-힣A-Z])', clean)",
    "sents = [p.strip() for p in re.split(r'(?<=[.?!])\\s+', clean) if p.strip()]"
)

content = content.replace(
    "parts = re.split(r'(?<=[다요음니습])\.\s+|(?<=[다요음니])\s+(?=[가-힣A-Z])', raw)",
    "parts = [p.strip() for p in re.split(r'(?<=[.?!])\\s+', raw) if p.strip()]"
)

# Remove hardcoded periods in disc_sentences rendering
target_discovery_html = """            if i == len(disc_sentences) - 1:
                parts.append(
                    f'<p style="color:#555;font-size:16px;line-height:1.95;margin-bottom:{mb};">'
                    f'<strong>{sent}.</strong></p>'
                )
            else:
                parts.append(
                    f'<p style="color:#555;font-size:16px;line-height:1.95;margin-bottom:{mb};">'
                    f'{sent}.</p>'
                )"""

replacement_discovery_html = """            if i == len(disc_sentences) - 1:
                parts.append(
                    f'<p style="color:#555;font-size:16px;line-height:1.95;margin-bottom:{mb};">'
                    f'<strong>{sent}</strong></p>'
                )
            else:
                parts.append(
                    f'<p style="color:#555;font-size:16px;line-height:1.95;margin-bottom:{mb};">'
                    f'{sent}</p>'
                )"""

content = content.replace(target_discovery_html, replacement_discovery_html)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated naver_blog_gen.py")
