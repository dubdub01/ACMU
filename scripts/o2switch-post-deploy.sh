#!/usr/bin/env bash
# À lancer en SSH après chaque déploiement FTPS (node_modules non envoyés par FTP).
set -euo pipefail

APP_DIR="${1:-$HOME/nodejs-apps/acmu/ACMU}"
cd "$APP_DIR"

NODE_SELECTOR="$HOME/.cl.selector/node-selector.json"
if [ -z "${DATABASE_URL:-}" ] && [ -f "$NODE_SELECTOR" ]; then
  export DATABASE_URL="$(node -pe "JSON.parse(require('fs').readFileSync('$NODE_SELECTOR','utf8'))['nodejs-apps/acmu/ACMU'].env_vars.DATABASE_URL")"
fi

rm -f prisma.config.ts

echo "→ npm ci --omit=dev"
npm ci --omit=dev

echo "→ prisma generate"
npx prisma generate

if [ -n "${DATABASE_URL:-}" ]; then
  echo "→ prisma migrate deploy"
  npx prisma migrate deploy
else
  echo "⚠ DATABASE_URL introuvable — migrations ignorées (exportez-la ou vérifiez node-selector.json)"
fi

PRISMA_ALIAS_DIR=".next/node_modules/@prisma"
if [ -d "$PRISMA_ALIAS_DIR" ]; then
  HASH="$(grep -roh '@prisma/client-[a-f0-9]\+' .next/server/chunks 2>/dev/null | head -1 | cut -d/ -f2 || true)"
  if [ -n "$HASH" ] && [ ! -e "$PRISMA_ALIAS_DIR/$HASH" ]; then
    echo "→ lien Prisma $HASH"
    ln -sf ../../../node_modules/@prisma/client "$PRISMA_ALIAS_DIR/$HASH"
  fi
fi

mkdir -p tmp
date -u +%Y-%m-%dT%H:%M:%SZ > tmp/restart.txt
echo "✅ Post-déploiement terminé — redémarrez Node.js dans cPanel si besoin."
