import os

directories = [
    'src/admin/components',
    'src/pages/admin',
    'src/pages/admin/memos',
    'src/pages/admin/posts',
]

def fix_file(filepath):
    if not filepath.endswith('.tsx') and not filepath.endswith('.astro'):
        return

    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    content = content.replace('hover:hover:', 'hover:')
    content = content.replace('bg-accent text-background border border-accent rounded-md text-accent', 'bg-accent text-background border border-accent rounded-md')
    
    # Also I noticed bg-white/[0.02] in Dashboard.tsx could be fine, but we can leave it.

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for d in directories:
    if os.path.exists(d):
        for f in os.listdir(d):
            if os.path.isfile(os.path.join(d, f)):
                fix_file(os.path.join(d, f))

print("Fixes Done")
