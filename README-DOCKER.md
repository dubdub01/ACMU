# Guide Docker pour le développement local

Ce projet utilise Docker pour le développement local, permettant un environnement reproductible et isolé.

## Prérequis

- Docker installé sur votre machine
- Docker Compose installé

## Démarrage rapide

### 1. Créer le fichier d'environnement

```bash
cp .env.example .env.local
```

Modifiez `.env.local` si nécessaire (les valeurs par défaut fonctionnent pour le développement).

### 2. Lancer les conteneurs

```bash
docker-compose up -d
```

Cette commande va :
- Construire l'image Next.js
- Lancer le conteneur Next.js sur le port 3000
- Lancer PostgreSQL sur le port 5432
- Lancer pgAdmin sur le port 5050 (interface web pour gérer la BDD)

### 3. Accéder à l'application

- **Site Next.js** : http://localhost:3000
- **pgAdmin** (gestion BDD) : http://localhost:5050
  - Email : `admin@example.com`
  - Mot de passe : `admin`

### 4. Installer les dépendances (première fois)

```bash
docker-compose exec nextjs npm install
```

## Commandes utiles

### Voir les logs

```bash
# Tous les services
docker-compose logs -f

# Uniquement Next.js
docker-compose logs -f nextjs

# Uniquement PostgreSQL
docker-compose logs -f postgres
```

### Arrêter les conteneurs

```bash
docker-compose down
```

### Arrêter et supprimer les volumes (⚠️ supprime les données de la BDD)

```bash
docker-compose down -v
```

### Redémarrer un service

```bash
docker-compose restart nextjs
```

### Exécuter une commande dans le conteneur Next.js

```bash
# Exécuter npm install
docker-compose exec nextjs npm install

# Exécuter une commande Prisma
docker-compose exec nextjs npx prisma migrate dev

# Ouvrir un shell dans le conteneur
docker-compose exec nextjs sh
```

### Reconstruire l'image

Si vous modifiez le Dockerfile :

```bash
docker-compose build --no-cache
docker-compose up -d
```

## Base de données PostgreSQL

### Informations de connexion

- **Host** : `postgres` (depuis le conteneur Next.js) ou `localhost` (depuis votre machine)
- **Port** : `5432`
- **Database** : `acmu_db`
- **User** : `acmu_user`
- **Password** : `acmu_password`

### Connexion depuis votre machine

```bash
psql -h localhost -p 5432 -U acmu_user -d acmu_db
```

### Accès via pgAdmin (Servers vide au départ)

**Servers** est vide tant que vous n’avez pas ajouté de serveur. À faire une seule fois :

1. Ouvrir http://localhost:5050 et se connecter : `admin@example.com` / `admin`
2. Dans le panneau de gauche, faire un **clic droit sur "Servers"**
3. Dans le menu contextuel qui s'affiche, cliquer sur **"Créer"** (ou **"Create"** selon la langue)
4. Dans le sous-menu, cliquer sur **"Server…"** (une fenêtre s'ouvre)
5. Onglet **General** :
   - **Name** : `ACMU Dev` (ou tout autre nom)
6. Onglet **Connection** :
   - **Host name/address** : `postgres`
   - **Port** : `5432`
   - **Maintenance database** : `acmu_db`
   - **Username** : `acmu_user`
   - **Password** : `acmu_password` (cocher "Save password" si vous voulez)
7. Cliquer sur **Save** (en bas à droite de la fenêtre)

Le serveur **ACMU Dev** apparaît alors sous **Servers** et vous pouvez explorer la base `acmu_db`.

## Hot-reload

Le hot-reload est activé grâce au volume monté. Toute modification dans le code sera automatiquement reflétée dans le navigateur.

## Structure des volumes

- `.` → `/app` : Code source (hot-reload)
- `node_modules` : Exclu du volume (utilise ceux du conteneur)
- `.next` : Exclu du volume (cache de build)

## Dépannage

### Le port 3000 est déjà utilisé

Modifiez le port dans `docker-compose.yml` :

```yaml
ports:
  - "3001:3000"  # Utilisez le port 3001 sur votre machine
```

### Erreur de permissions

Sur Linux, vous pourriez avoir besoin de :

```bash
sudo chown -R $USER:$USER .
```

### La base de données ne démarre pas

Vérifiez les logs :

```bash
docker-compose logs postgres
```

Supprimez le volume et recréez :

```bash
docker-compose down -v
docker-compose up -d
```

## Production sur O2Switch

⚠️ **Important** : Docker n'est utilisé QUE pour le développement local.

Pour déployer sur O2Switch :
1. Poussez votre code sur Git
2. Clonez sur O2Switch
3. Installez les dépendances : `npm ci --production`
4. Build : `npm run build`
5. O2Switch utilisera Phusion Passenger pour lancer le serveur Node.js

Voir la documentation O2Switch pour plus de détails sur le déploiement.
