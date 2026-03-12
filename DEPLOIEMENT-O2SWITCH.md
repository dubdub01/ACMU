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

## Support O2Switch

En cas de problème technique avec l'hébergement, contactez le support O2Switch qui pourra vous aider avec la configuration Phusion Passenger.
