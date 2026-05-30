import os

files_to_update = [
    'src/pages/admin/index.astro',
    'src/pages/admin/memos/index.astro',
    'src/pages/admin/posts/index.astro'
]

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace the button class to add text-foreground and make sure it's visible
    old_class = 'class="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent ml-2 mr-2"'
    new_class = 'class="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent ml-2 mr-2 text-foreground"'
    
    content = content.replace(old_class, new_class)

    with open(filepath, 'w') as f:
        f.write(content)
    print("Fixed", filepath)
