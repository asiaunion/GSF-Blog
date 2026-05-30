import os
import re

directories = [
    'src/admin/components',
    'src/pages/admin',
    'src/pages/admin/memos',
    'src/pages/admin/posts',
]

def replace_in_file(filepath):
    if not filepath.endswith('.tsx') and not filepath.endswith('.astro'):
        return

    with open(filepath, 'r') as f:
        content = f.read()
    
    # Track if modified
    original = content

    # 1. Astro Styles in index.astro files
    if filepath.endswith('.astro'):
        content = re.sub(r'background:\s*#060913;', 'background: var(--color-background);', content)
        content = re.sub(r'color:\s*#f1f5f9;', 'color: var(--color-foreground);', content)
        content = re.sub(r'background:\s*rgba\(10, 15, 30, 0\.5\);', 'background: var(--color-card-bg);', content)
        content = re.sub(r'border-bottom:\s*1px solid rgba\(255, 255, 255, 0\.05\);', 'border-bottom: 1px solid var(--color-border);', content)
        content = re.sub(r'color:\s*#94a3b8;', 'color: var(--color-muted);', content)
        content = re.sub(r'border:\s*2px solid rgba\(16, 185, 129, 0\.3\);', 'border: 2px solid var(--color-border);', content)
        content = re.sub(r'background:\s*rgba\(239, 68, 68, 0\.08\);', 'background: transparent;', content)
        content = re.sub(r'border:\s*1px solid rgba\(239, 68, 68, 0\.2\);', 'border: 1px solid var(--color-border);', content)
        content = re.sub(r'color:\s*#fca5a5;', 'color: var(--color-foreground);', content)
        
        # Inject theme script if not present
        if 'function getPreferTheme()' not in content:
            script_tag = """
    <script is:inline>
      (function () {
        const themeValue = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.firstElementChild?.setAttribute("data-theme", themeValue);
      })();
    </script>
  </head>"""
            content = content.replace('</head>', script_tag)

    # 2. Tailwind Classes
    
    # Gradients and flashy text
    content = re.sub(r'bg-gradient-to-[a-z]+\s+', '', content)
    content = re.sub(r'from-[a-z]+-\d+(?:/\d+)?\s+', '', content)
    content = re.sub(r'to-[a-z]+-\d+(?:/\d+)?\s+', '', content)
    content = re.sub(r'via-[a-z]+-\d+(?:/\d+)?\s+', '', content)
    content = re.sub(r'hover:from-[a-z]+-\d+(?:/\d+)?\s+', '', content)
    content = re.sub(r'hover:to-[a-z]+-\d+(?:/\d+)?\s+', '', content)
    content = re.sub(r'bg-clip-text\s+', '', content)
    content = re.sub(r'text-transparent', 'text-accent', content)
    
    # Colors - Backgrounds
    content = re.sub(r'bg-slate-[89]00(?:/\d+)?', 'bg-card-bg', content)
    content = re.sub(r'bg-slate-950(?:/\d+)?', 'bg-background', content)
    content = re.sub(r'bg-gray-[89]00(?:/\d+)?', 'bg-card-bg', content)
    content = re.sub(r'bg-gray-700(?:/\d+)?', 'bg-muted', content)
    content = re.sub(r'bg-slate-700(?:/\d+)?', 'bg-muted', content)
    content = re.sub(r'bg-emerald-\d+(?:/\d+)?', 'bg-accent text-background', content)
    content = re.sub(r'hover:bg-slate-[789]00(?:/\d+)?', 'hover:bg-muted', content)
    
    # Text colors
    content = re.sub(r'text-gray-400', 'opacity-80', content)
    content = re.sub(r'text-gray-300', 'opacity-90', content)
    content = re.sub(r'text-gray-500', 'opacity-70', content)
    content = re.sub(r'text-gray-[12]00', 'text-foreground', content)
    content = re.sub(r'text-white', 'text-foreground', content)
    content = re.sub(r'text-emerald-\d+(?:/\d+)?', 'text-accent', content)
    content = re.sub(r'text-cyan-\d+(?:/\d+)?', 'text-accent', content)
    content = re.sub(r'text-indigo-\d+(?:/\d+)?', 'text-accent', content)

    # Borders
    content = re.sub(r'border-white/\d+', 'border-border', content)
    content = re.sub(r'border-emerald-\d+(?:/\d+)?', 'border-accent', content)
    content = re.sub(r'border-slate-\d+(?:/\d+)?', 'border-border', content)
    content = re.sub(r'divide-white/\d+', 'divide-border', content)
    content = re.sub(r'divide-slate-\d+(?:/\d+)?', 'divide-border', content)
    
    # Blurs and Shadows
    content = re.sub(r'backdrop-blur(?:-[a-z]+)?\s+', '', content)
    content = re.sub(r'shadow(?:-[a-z]+)?(?:-[a-z]+(?:/\d+)?)?\s+', '', content)
    
    # Ring
    content = re.sub(r'ring-[a-z]+-\d+(?:/\d+)?', 'ring-accent', content)
    content = re.sub(r'focus:ring-[a-z]+-\d+(?:/\d+)?', 'focus:ring-accent', content)

    # Special string replacements (components that had specifically complex buttons)
    # E.g. "bg-emerald-500 text-white hover:bg-emerald-600"
    content = content.replace("bg-emerald-600", "bg-accent/90")
    content = content.replace("bg-indigo-600", "bg-accent/90")
    content = content.replace("bg-indigo-500", "bg-accent")
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for d in directories:
    if os.path.exists(d):
        for f in os.listdir(d):
            if os.path.isfile(os.path.join(d, f)):
                replace_in_file(os.path.join(d, f))

print("Done")
