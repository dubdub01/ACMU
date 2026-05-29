# Mise en service — site de test [acmu.duboismax.com](http://acmu.duboismax.com/)

Checklist pour finaliser **PostgreSQL**, **migrations Prisma** et **administration** (`/admin/login`).

## État actuel (diagnostic)

| Élément | Statut |
|--------|--------|
| Site public | ✅ En ligne |
| Page `/admin/login` | ✅ Affichée |
| `DATABASE_URL` dans cPanel Node.js | ✅ Définie |
| Tables `users` / `praticiens` | ⚠️ Présentes mais propriétaire `vsup3936`, pas `vsup3936_acmu_user` |
| Connexion Prisma avec l’utilisateur cPanel | ❌ `droit refusé pour la relation users` |
| `NEXTAUTH_URL` / `NEXTAUTH_SECRET` | ⚠️ À ajouter dans cPanel |
| Cookies session (HTTP) | ✅ Corrigé dans le code (`COOKIE_SECURE=false` ou URL en `http://`) |

## 1. Droits PostgreSQL (cPanel) — **obligatoire**

L’utilisateur PostgreSQL de l’app (`vsup3936_acmu_user`) doit pouvoir lire/écrire les tables.

### Option A — cPanel (recommandé)

1. **cPanel** → **Bases de données PostgreSQL**
2. Section **Utilisateurs actuels** / association base ↔ utilisateur
3. Pour la base `vsup3936_acmu_db` et l’utilisateur `vsup3936_acmu_user` : cocher **tous les privilèges** (ALL PRIVILEGES)
4. Si les tables existent déjà avec un mauvais propriétaire, passez à l’option B

### Option B — SQL (phpPgAdmin ou outil cPanel)

Connectez-vous avec un compte ayant les droits sur la base, puis exécutez :

```sql
ALTER TABLE users OWNER TO vsup3936_acmu_user;
ALTER TABLE praticiens OWNER TO vsup3936_acmu_user;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO vsup3936_acmu_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO vsup3936_acmu_user;
GRANT USAGE ON SCHEMA public TO vsup3936_acmu_user;
```

## 2. Variables d’environnement Node.js (cPanel)

**cPanel** → **Node.js** → application `acmu.duboismax.com` → **Environment variables** :

| Variable | Valeur (test) |
|----------|----------------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | *(déjà configurée — ne pas changer sans raison)* |
| `NEXTAUTH_URL` | `http://acmu.duboismax.com` |
| `NEXTAUTH_SECRET` | Chaîne aléatoire ≥ 32 caractères (`openssl rand -base64 32`) |
| `COOKIE_SECURE` | `false` *(site en HTTP ; mettre `true` quand vous passerez en HTTPS)* |
| `PORT` | `3000` |

Enregistrez puis **redémarrez** l’application Node.js.

## 3. Migrations Prisma (SSH)

Depuis votre machine (WSL) :

```bash
ssh vsup3936@granite.o2switch.net
cd ~/nodejs-apps/acmu/ACMU

# Charger DATABASE_URL depuis la config Node.js cPanel
export DATABASE_URL=$(node -pe "JSON.parse(require('fs').readFileSync(require('os').homedir()+'/.cl.selector/node-selector.json','utf8'))['nodejs-apps/acmu/ACMU'].env_vars.DATABASE_URL")

npx prisma migrate deploy
npx prisma generate
node scripts/o2switch-db-check.mjs
```

Si les tables existent déjà et `migrate deploy` renvoie **P3005**, marquez les migrations comme appliquées :

```bash
npx prisma migrate resolve --applied 20260219155649_init_praticiens
npx prisma migrate resolve --applied 20260219161406_add_user_model
npx prisma migrate resolve --applied 20260312123223_add_praticien_tel_email
npx prisma migrate resolve --applied 20260312124053_add_praticien_details
```

Si les tables n’existent pas encore :

```bash
npx prisma migrate deploy
```

### Migration `ordre` (tri des praticiens) — erreur « doit être le propriétaire »

Si `migrate deploy` échoue sur `20260529180000_add_praticien_ordre` avec **42501 / doit être le propriétaire** :

1. Exécutez d’abord le SQL de `scripts/o2switch-fix-db-owner.sql` dans **phpPgAdmin** (compte propriétaire `vsup3936`).
2. Puis en SSH (avec `DATABASE_URL` exportée) :

```bash
npx prisma migrate deploy
bash scripts/o2switch-post-deploy.sh
```

3. Redémarrez Node.js dans cPanel.

Sans cette étape, le site reste utilisable (tri par nom) mais le glisser-déposer admin est désactivé.

### Ajouter la colonne `ordre` à la main (sans changer le propriétaire des tables)

Si `ALTER TABLE … OWNER` est impossible, ajoutez seulement la colonne :

**Option 1 — phpPgAdmin (interface graphique)**  
Table `praticiens` → **Colonnes** → **Ajouter une colonne** :

| Champ | Valeur |
|--------|--------|
| Nom | `ordre` |
| Type | `integer` |
| Défaut | `0` |
| NOT NULL | oui |

**Option 2 — psql (Terminal cPanel / SSH), une commande à la fois**  
Voir `scripts/o2switch-add-ordre-manual.sql` (étapes A, B, C).

Puis marquer la migration Prisma comme déjà appliquée :

```bash
cd ~/nodejs-apps/acmu/ACMU
export DATABASE_URL=$(node -pe "JSON.parse(require('fs').readFileSync(require('os').homedir()+'/.cl.selector/node-selector.json','utf8'))['nodejs-apps/acmu/ACMU'].env_vars.DATABASE_URL")
npx prisma migrate resolve --applied 20260529180000_add_praticien_ordre
bash scripts/o2switch-post-deploy.sh
```

Redémarrer Node.js dans cPanel.

## 4. Créer le compte admin

```bash
# Toujours avec DATABASE_URL exportée (voir ci-dessus)
node scripts/create-admin.mjs admin@acmu.be 'VotreMotDePasseSecurise' 'Administrateur ACMU'
```

Puis redémarrage :

```bash
date -u +%Y-%m-%dT%H:%M:%SZ > tmp/restart.txt
```

## 5. Vérifications

1. [http://acmu.duboismax.com/admin/login](http://acmu.duboismax.com/admin/login) — connexion avec l’email créé
2. [http://acmu.duboismax.com/praticiens](http://acmu.duboismax.com/praticiens) — liste après ajout depuis l’admin
3. Test API (doit renvoyer **401**, pas **500**) :

```bash
curl -s -X POST http://acmu.duboismax.com/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"x@y.z","password":"wrong"}'
```

## 6. Déployer les correctifs code

Après `git pull` / déploiement FTPS, sur le serveur :

```bash
cd ~/nodejs-apps/acmu/ACMU
npm ci --omit=dev
npx prisma generate
date -u +%Y-%m-%dT%H:%M:%SZ > tmp/restart.txt
```

Le correctif **cookies HTTP** et les scripts `create-admin.mjs` / `o2switch-db-check.mjs` doivent être présents sur le serveur.

## Dépannage

| Symptôme | Cause probable | Action |
|----------|----------------|--------|
| Login → 500 | DB inaccessible ou droits | `o2switch-db-check.mjs`, section 1 |
| Login → 401 | Identifiants faux ou pas d’admin | `create-admin.mjs` |
| Login OK mais retour login | Cookie `Secure` sur HTTP | `COOKIE_SECURE=false`, `NEXTAUTH_URL` en `http://` |
| Liste praticiens vide | Pas de données | Normal ; ajouter via `/admin` |

Logs login serveur : `/tmp/acmu-login-debug.log`
