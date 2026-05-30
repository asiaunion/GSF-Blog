import os

files_to_update = [
    'src/pages/admin/index.astro',
    'src/pages/admin/memos/index.astro',
    'src/pages/admin/posts/index.astro'
]

import_statement = """import IconMoon from "@/assets/icons/IconMoon.svg";
import IconSunHigh from "@/assets/icons/IconSunHigh.svg";
"""

theme_btn = """
        <button
          id="theme-btn"
          class="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent ml-2 mr-2"
          title="Toggles light & dark mode"
          aria-label="auto"
          aria-live="polite"
        >
          <IconMoon class="absolute top-[50%] left-[50%] -translate-[50%] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 w-4 h-4" />
          <IconSunHigh class="absolute top-[50%] left-[50%] -translate-[50%] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 w-4 h-4" />
        </button>
"""

script_include = """
    <script>
      import "@/scripts/theme.ts";
    </script>
"""

for filepath in files_to_update:
    if not os.path.exists(filepath):
        print(f"Skipping {filepath}, does not exist.")
        continue
    with open(filepath, 'r') as f:
        content = f.read()

    original = content

    if "IconMoon" not in content:
        content = content.replace('import "@/styles/global.css";', 'import "@/styles/global.css";\n' + import_statement)
    
    if 'id="theme-btn"' not in content:
        content = content.replace('<form method="POST" action="/admin/api/auth/logout/">', theme_btn + '        <form method="POST" action="/admin/api/auth/logout/">')

    if 'import "@/scripts/theme.ts";' not in content:
        content = content.replace('</body>', script_include + '  </body>')

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print("Updated", filepath)
    else:
        print("No changes needed for", filepath)
