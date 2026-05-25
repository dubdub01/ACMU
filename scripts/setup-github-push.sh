#!/usr/bin/env bash
# Configuration one-shot : push GitHub depuis WSL
set -euo pipefail

echo "=== 1. Corriger les droits sur ~/.ssh/config (fichier root) ==="
if [ -f "$HOME/.ssh/config" ] && [ "$(stat -c '%U' "$HOME/.ssh/config")" = "root" ]; then
  echo "Le fichier config appartient à root. Exécutez :"
  echo "  sudo chown \$USER:\$USER ~/.ssh/config"
  echo "  sudo chmod 600 ~/.ssh/config"
  echo ""
  echo "Puis ajoutez à la fin de ~/.ssh/config :"
  cat <<'EOF'

Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
EOF
else
  echo "OK ou déjà configuré."
fi

echo ""
echo "=== 2. Clé publique à enregistrer sur GitHub ==="
echo "Ouvrez : https://github.com/settings/ssh/new"
echo "Titre : WSL ACMU"
echo "Clé :"
cat "$HOME/.ssh/id_ed25519.pub"
echo ""
if command -v clip.exe >/dev/null 2>&1; then
  cat "$HOME/.ssh/id_ed25519.pub" | clip.exe
  echo "(Copiée dans le presse-papiers Windows)"
fi

echo ""
echo "=== 3. Connexion GitHub CLI (recommandé, configure aussi HTTPS) ==="
echo "  source ~/.bash_aliases"
echo "  gh auth login -h github.com -p ssh -s repo,read:org -w"
echo ""
echo "=== 4. Remote SSH + push ==="
echo "  cd $(dirname "$0")/.."
echo "  git remote set-url origin git@github.com:dubdub01/ACMU.git"
echo "  git push origin main"
