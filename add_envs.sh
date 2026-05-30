#!/bin/bash
keys=("TURSO_DATABASE_URL" "TURSO_AUTH_TOKEN" "GOOGLE_CLIENT_ID" "GOOGLE_CLIENT_SECRET" "GOOGLE_REDIRECT_URI" "ADMIN_EMAILS" "JWT_SECRET" "GITHUB_TOKEN")
for key in "${keys[@]}"; do
  value=$(grep "^$key=" .env | sed "s/^$key=//")
  if [ -n "$value" ]; then
    echo "Adding $key to production..."
    echo "$value" | npx vercel env add $key production || true
    
    echo "Adding $key to preview..."
    npx vercel env add $key preview --value "$value" --yes || true
  else
    echo "Key $key not found in .env"
  fi
done
