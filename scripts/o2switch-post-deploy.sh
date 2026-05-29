#!/usr/bin/env bash
# À lancer en SSH après chaque déploiement FTPS (node_modules non envoyés par FTP).
set -euo pipefail

APP_DIR="${1:-$HOME/nodejs-apps/acmu/ACMU}"
cd "$APP_DIR"

export DATABASE_URL="${DATABASE_URL:-$(node -pe "JSON.parse(require('fs').readFileSync(require('os').homedir()+'/.cl.selector/node-selector.json','utf8'))['nodejs-apps/acmu/ACMU'].env_vars.DATABASE_URL")}"

echo "→ npm ci --omit=dev"
npm ci --omit=dev

echo "→ prisma generate"
npx prisma generate

# Symlink Prisma Turbopack si le hash du build diffère
PRISMA_ALIAS_DIR=".next/node_modules/@prisma"
if [ -d "$PRISMA_ALIAS_DIR" ]; then
  HASH=$(grep -roh '@prisma/client-[a-f0-9]\+' .next/server/chunks 2>/dev/null | head -1 | cut -d/ -f2 || true)
  if [ -n "$HASH" ] && [ ! -e "$PRISMA_ALIAS_DIR/$HASH" ]; then
    echo "→ lien $HASH → @prisma/client"
    ln -sf ../../../node_modules/@prisma/client "$PRISMA_ALIAS_DIR/$HASH"
  fi
fi

mkdir -p tmp
date -u +%Y-%m-%dT%H:%M:%SZ > tmp/restart.txt
echo "✅ Post-déploiement terminé — redémarrez Node.js dans cPanel si besoin."
