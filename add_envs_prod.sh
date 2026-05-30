#!/bin/bash
keys=("GOOGLE_REDIRECT_URI" "ADMIN_EMAILS" "JWT_SECRET" "GITHUB_TOKEN")
for key in "${keys[@]}"; do
  value=$(grep "^$key=" .env | sed "s/^$key=//")
  if [ -n "$value" ]; then
    echo "Adding $key to production..."
    echo "$value" | npx vercel env rm $key production -y 2>/dev/null || true
    echo "$value" | npx vercel env add $key production
  else
    echo "Key $key not found in .env"
  fi
done
