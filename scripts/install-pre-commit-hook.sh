#!/usr/bin/env sh
# Install local pre-commit hook for tokyo episode manifest verification.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOOK="$ROOT/.git/hooks/pre-commit"
cat > "$HOOK" <<'EOF'
#!/bin/sh
cd "$(git rev-parse --show-toplevel)" || exit 1
node scripts/verify-tokyo-changed.mjs || exit 1
EOF
chmod +x "$HOOK"
echo "Installed pre-commit hook: $HOOK"
