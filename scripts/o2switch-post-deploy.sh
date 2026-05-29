#!/usr/bin/env bash
# À lancer en SSH après chaque déploiement FTPS.
# Le code est envoyé par FTP ; le build .next se fait sur le serveur (évite erreurs FTP sur .next/static).
set -euo pipefail

APP_DIR="${1:-$HOME/nodejs-apps/acmu/ACMU}"
cd "$APP_DIR"

NODE_SELECTOR="$HOME/.cl.selector/node-selector.json"
if [ -z "${DATABASE_URL:-}" ] && [ -f "$NODE_SELECTOR" ]; then
  export DATABASE_URL="$(node -pe "JSON.parse(require('fs').readFileSync('$NODE_SELECTOR','utf8'))['nodejs-apps/acmu/ACMU'].env_vars.DATABASE_URL")"
fi

# Fichier Prisma 7 généré par erreur sur le serveur — casse le build Next
rm -f prisma.config.ts

echo "→ npm ci"
npm ci

echo "→ prisma generate"
npx prisma generate

echo "→ next build"
export NEXT_PRIVATE_DISABLE_RUST_COMPILER=1
npm run build

# Symlink Prisma Turbopack (hash change à chaque build)
PRISMA_ALIAS_DIR=".next/node_modules/@prisma"
if [ -d "$PRISMA_ALIAS_DIR" ]; then
  HASH="$(grep -roh '@prisma/client-[a-f0-9]\+' .next/server/chunks 2>/dev/null | head -1 | cut -d/ -f2 || true)"
  if [ -n "$HASH" ]; then
    echo "→ lien Prisma $HASH"
    ln -sf ../../../node_modules/@prisma/client "$PRISMA_ALIAS_DIR/$HASH"
  fi
fi

echo "→ npm prune (prod uniquement)"
npm prune --omit=dev

mkdir -p tmp
date -u +%Y-%m-%dT%H:%M:%SZ > tmp/restart.txt
echo "✅ Post-déploiement terminé — redémarrez Node.js dans cPanel si besoin."
