# Démarrage rapide

## ⚠️ Important : Se placer dans le bon répertoire

Vous devez être dans le dossier `site-acmu` pour lancer Docker Compose :

```bash
cd site-acmu
```

## Commandes de démarrage

```bash
# 1. Se placer dans le dossier du projet
cd site-acmu

# 2. Vérifier que docker-compose.yml existe
ls docker-compose.yml

# 3. Lancer les conteneurs
docker-compose up -d

# 4. Vérifier que tout fonctionne
docker-compose ps

# 5. Voir les logs
docker-compose logs -f nextjs
```

## Accès aux services

- **Site Next.js** : http://localhost:3000
- **pgAdmin** : http://localhost:5050
  - Email : `admin@example.com`
  - Mot de passe : `admin`

## pgAdmin : "Servers" est vide

C’est normal. Il faut ajouter le serveur PostgreSQL une fois :

1. **Connectez-vous à pgAdmin** : http://localhost:5050  
   Email : `admin@example.com` / Mot de passe : `admin`

2. **Dans le panneau de gauche**, faites un **clic droit sur "Servers"**

3. **Dans le menu contextuel** (qui affiche "Nouveau", "Actualiser", "Créer", etc.), cliquez sur **"Créer"** (ou "Create" selon la langue)

4. **Dans le sous-menu**, cliquez sur **"Server…"** (une fenêtre s'ouvre)

5. **Dans la fenêtre qui s'ouvre** :
   - **Onglet "General"** : Name = `ACMU Dev`
   - **Onglet "Connection"** :
     - Host name/address : `postgres`
     - Port : `5432`
     - Maintenance database : `acmu_db`
     - Username : `acmu_user`
     - Password : `acmu_password`
     - (Optionnel) Cochez **"Save password"**

6. **Cliquez sur "Save"** (en bas à droite de la fenêtre)

Après ça, **ACMU Dev** apparaît sous Servers et vous pouvez ouvrir la base `acmu_db`.

## Si vous avez des erreurs de ports

Si les ports 3000, 5432 ou 5050 sont déjà utilisés, modifiez-les dans `docker-compose.yml` :

```yaml
ports:
  - "3001:3000"  # Changez 3000 en 3001
```
