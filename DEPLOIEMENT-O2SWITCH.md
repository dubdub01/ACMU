# Guide de déploiement sur O2Switch

Ce guide explique comment déployer le site Next.js sur O2Switch (hébergement mutualisé avec Node.js).

## Prérequis

- Compte O2Switch avec accès SSH
- Accès au cPanel O2Switch
- Git installé sur votre machine locale
- Repository Git (GitHub, GitLab, etc.)

## Configuration O2Switch

### 1. Activer Node.js dans le cPanel

1. Connectez-vous au cPanel O2Switch
2. Allez dans la section "Node.js"
3. Créez une nouvelle application Node.js
4. Sélectionnez la version Node.js (recommandé : Node.js 20.x)
5. Notez le chemin de l'application (ex: `/home/votrecompte/nodejs-apps/acmu`)

### 2. Configuration de l'application Node.js

Dans le cPanel Node.js, configurez :

- **Application root** : `/home/votrecompte/nodejs-apps/acmu`
- **Application URL** : `acmu.be` (ou sous-domaine)
- **Application startup file** : `server.js` (si vous utilisez standalone) ou laissez vide pour `npm start`
- **Node.js version** : 20.x

### 3. Variables d'environnement

Dans le cPanel Node.js, ajoutez les variables d'environnement :

```
NODE_ENV=production
DATABASE_URL=postgresql://user:password@localhost:5432/acmu_db
NEXTAUTH_URL=https://acmu.be
NEXTAUTH_SECRET=votre-secret-production-minimum-32-caracteres
PORT=3000
```

## Déploiement via Git

### Option 1 : Clone direct sur O2Switch

1. Connectez-vous en SSH à O2Switch :

```bash
ssh votrecompte@ssh.o2switch.net
```

2. Naviguez vers le dossier de l'application :

```bash
cd ~/nodejs-apps/acmu
```

3. Clonez votre repository (première fois) :

```bash
git clone https://github.com/votre-username/site-acmu.git .
```

4. Installez les dépendances :

```bash
npm ci --production
```

5. Build l'application :

```bash
npm run build
```

6. Redémarrez l'application depuis le cPanel Node.js

### Option 2 : Déploiement automatique avec webhook (recommandé)

1. Créez un script de déploiement sur O2Switch :

```bash
# ~/deploy-acmu.sh
#!/bin/bash
cd ~/nodejs-apps/acmu
git pull origin main
npm ci --production
npm run build
# Redémarrer l'application (O2Switch le fait automatiquement via Passenger)
```

2. Rendez-le exécutable :

```bash
chmod +x ~/deploy-acmu.sh
```

3. Configurez un webhook GitHub/GitLab qui appelle ce script via SSH

## Configuration de la base de données

### PostgreSQL sur O2Switch

1. Dans le cPanel, créez une base de données PostgreSQL
2. Créez un utilisateur et associez-le à la base
3. Notez les informations de connexion
4. Mettez à jour `DATABASE_URL` dans les variables d'environnement

### Alternative : SQLite (plus simple)

Si vous préférez SQLite pour commencer :

1. Modifiez votre `DATABASE_URL` pour pointer vers un fichier SQLite
2. Assurez-vous que le dossier est accessible en écriture

## Configuration Next.js pour O2Switch

### Option A : Mode standard (recommandé pour O2Switch)

Dans `next.config.ts`, gardez la configuration par défaut (sans `output: 'standalone'`).

O2Switch utilisera Phusion Passenger pour gérer le processus Node.js.

### Option B : Mode standalone

Si vous voulez utiliser le mode standalone :

1. Modifiez `next.config.ts` :

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
  // ... reste de la config
};
```

2. Créez un fichier `server.js` à la racine :

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

3. Dans le cPanel Node.js, définissez le startup file comme `server.js`

## Configuration du domaine

1. Dans le cPanel, allez dans "Domaines" → "Domaines supplémentaires"
2. Ajoutez `acmu.be` si ce n'est pas déjà fait
3. Configurez le DNS pour pointer vers O2Switch
4. Activez SSL/HTTPS via Let's Encrypt dans le cPanel

## Scripts de déploiement

### package.json

Ajoutez ces scripts si nécessaire :

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "deploy": "npm ci --production && npm run build"
  }
}
```

## Vérification après déploiement

1. Vérifiez que l'application démarre : https://acmu.be
2. Vérifiez les logs dans le cPanel Node.js
3. Testez les fonctionnalités principales
4. Vérifiez la connexion à la base de données

## Mise à jour du site

Pour mettre à jour le site après un changement :

```bash
# Via SSH
ssh votrecompte@ssh.o2switch.net
cd ~/nodejs-apps/acmu
git pull
npm ci --production
npm run build
# Redémarrer depuis le cPanel
```

## Dépannage

### L'application ne démarre pas

1. Vérifiez les logs dans le cPanel Node.js
2. Vérifiez que toutes les variables d'environnement sont définies
3. Vérifiez que `npm run build` s'est bien exécuté
4. Vérifiez les permissions des fichiers

### Erreur de base de données

1. Vérifiez que la base de données existe dans le cPanel
2. Vérifiez que `DATABASE_URL` est correct
3. Testez la connexion depuis SSH

### Erreur 502 Bad Gateway

1. Vérifiez que l'application Node.js est démarrée dans le cPanel
2. Vérifiez les logs d'erreur
3. Vérifiez que le port est correct (généralement 3000)

## CI/CD avec GitHub Actions

Le dépôt contient deux workflows dans `.github/workflows/` :

| Workflow | Rôle | Déclencheur |
|----------|------|-------------|
| `ci.yml` | `npm ci`, lint, `prisma generate`, `next build` | Chaque push/PR sur `main` |
| `deploy-o2switch-ftps.yml` | Build GitHub + envoi **FTPS** (port 21) | Après CI réussie sur `main` |
| `deploy-o2switch.yml` | SSH — **désactivé** (IP filtrées par o2switch) | — |

### Activer le déploiement automatique

**Secrets FTPS** (cours) : `SFTP_SERVER`, `SFTP_USERNAME`, `SFTP_PASSWORD` (mot de passe FTP cPanel).

**Variables** : `O2SWITCH_DEPLOY` = `true` | `O2SWITCH_FTP_DIR` = `nodejs-apps/acmu/ACMU/` (même chemin que **App Root** dans cPanel Node.js)

**Actions** → **Deploy o2switch (FTPS)**. Après upload : depuis WSL, `npm ci --omit=dev` sur le serveur puis redémarrer Node.js dans le cPanel.

### Dépannage deploy GitHub Actions

**`FTPError: 550 Can't change directory to .../.next/static/...`** ou **`.../praticiens.segments`** — le fichier de sync FTP sur le serveur est désynchronisé (dossiers supprimés ou renommés au build, ex. page `/praticiens` passée en dynamique). Le workflow tente de le supprimer avant l’envoi ; sinon :

```bash
ssh vsup3936@granite.o2switch.net
rm -f ~/nodejs-apps/acmu/ACMU/.ftp-deploy-sync-state.json
rm -f ~/nodejs-apps/acmu/ACMU/.ftp-deploy-sync-state-v2.json
```

Puis relancez le déploiement FTPS. Après chaque déploiement réussi :

```bash
bash ~/nodejs-apps/acmu/ACMU/scripts/o2switch-post-deploy.sh
```

**`FTPError: 553 Can't open that file: No such file or directory`** — le fichier `.ftp-deploy-sync-state.json` sur le serveur ne correspond plus aux fichiers réels (souvent après suppression de dossiers, `node_modules`, ou changement manuel en FTP/SSH). **Solution :** supprimer ce fichier sur o2switch puis relancer le workflow :

```bash
ssh vsup3936@granite.o2switch.net
rm -f ~/nodejs-apps/acmu/ACMU/.ftp-deploy-sync-state.json
```

Le prochain déploiement fera une resynchronisation complète (un peu plus long). Vérifiez aussi que la variable `O2SWITCH_FTP_DIR` vaut exactement `nodejs-apps/acmu/ACMU/` (sans retour à la ligne).

**`ssh.ParsePrivateKey: ssh: no key found`** — le secret `O2SWITCH_SSH_PRIVATE_KEY` est vide ou mal collé. Recréez-le :

```bash
cat ~/.ssh/id_ed25519
```

Copiez tout le bloc `-----BEGIN ... END-----` sans ligne vide avant/après. Ne mettez pas le fichier `.pub`.

**`APP_DIR` avec retour à la ligne** — dans la variable `O2SWITCH_APP_PATH`, supprimez tout saut de ligne en fin de valeur (une seule ligne : `/home/vsup3936/nodejs-apps/acmu`).

**`dial tcp ...:22: i/o timeout`** — connexion SSH depuis les serveurs GitHub bloquée ou trop lente (fréquent en mutualisé). La clé locale fonctionne, mais pas toujours les IP GitHub. Solutions :

1. Réessayer après correction de la clé (parfois la timeout suit une mauvaise clé).
2. Déployer à la main en SSH : `cd ~/nodejs-apps/acmu && git pull && npm ci && npm run build`
3. Demander à o2switch si le SSH depuis l’extérieur (CI) est autorisé sur votre offre.

## Support O2Switch

En cas de problème technique avec l'hébergement, contactez le support O2Switch qui pourra vous aider avec la configuration Phusion Passenger.
