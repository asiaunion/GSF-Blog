import re

intro_text = "숫자는 저를 니혼바시까지 데려왔지만, 마지막 선택은 숫자가 하지 않았습니다. 좋은 입지는 가격보다 오래 남는 이유가 있습니다."

parts = [p.strip() for p in re.split(r'(?<=[.?!])\s+', intro_text) if p.strip()]
print("PARTS:")
for i, p in enumerate(parts):
    print(f"{i}: {p}")

opening = ' '.join(parts[:2]).strip()
print("OPENING:")
print(opening)

