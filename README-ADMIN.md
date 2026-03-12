# Documentation Admin - Centre médical ACMU

## Création du premier utilisateur admin

Pour créer le premier utilisateur administrateur, utilisez le script suivant :

```bash
npx tsx scripts/create-admin.ts <email> <password> [name]
```

**Exemple :**
```bash
npx tsx scripts/create-admin.ts admin@acmu.be monMotDePasseSecurise "Administrateur ACMU"
```

⚠️ **Important :** Assurez-vous que :
- La base de données PostgreSQL est démarrée (via Docker : `docker-compose up -d`)
- La variable d'environnement `DATABASE_URL` est correctement configurée dans `.env.local`
- Le client Prisma est généré (`npx prisma generate`)

## Accès à l'administration

1. Accédez à **http://localhost:3000/admin/login**
2. Connectez-vous avec l'email et le mot de passe créés
3. Vous serez redirigé vers le dashboard admin

## Fonctionnalités disponibles

### Dashboard (`/admin`)
- Liste de tous les praticiens
- Actions : Modifier, Supprimer
- Bouton pour ajouter un nouveau praticien

### Gestion des praticiens

#### Créer un praticien (`/admin/praticiens/nouveau`)
- Formulaire avec tous les champs :
  - Nom (obligatoire)
  - Titre (obligatoire)
  - Spécialité (optionnel)
  - Description (optionnel)
  - Photo (URL, optionnel)
  - URL de prise de rendez-vous Mobminder (optionnel)

#### Modifier un praticien (`/admin/praticiens/[id]`)
- Même formulaire pré-rempli avec les données existantes
- Possibilité de modifier tous les champs

#### Supprimer un praticien
- Depuis le dashboard, clic sur "Supprimer"
- Confirmation requise avant suppression

## Sécurité

- Les routes admin sont protégées : redirection automatique vers `/admin/login` si non authentifié
- Les sessions sont stockées dans des cookies HTTP-only
- Les mots de passe sont hashés avec bcrypt
- Les API CRUD des praticiens nécessitent une authentification

## Structure des fichiers

```
app/
├── admin/
│   ├── login/page.tsx          # Page de connexion
│   ├── page.tsx                # Dashboard admin
│   └── praticiens/
│       ├── nouveau/page.tsx    # Créer un praticien
│       └── [id]/page.tsx       # Modifier un praticien
├── api/
│   ├── auth/
│   │   ├── login/route.ts      # API login
│   │   ├── logout/route.ts     # API logout
│   │   └── me/route.ts         # API vérification session
│   └── praticiens/
│       ├── route.ts            # GET, POST praticiens
│       └── [id]/route.ts       # GET, PUT, DELETE praticien
└── components/
    └── admin/
        ├── PraticienForm.tsx   # Formulaire praticien (réutilisable)
        ├── LogoutButton.tsx    # Bouton déconnexion
        └── DeleteButton.tsx   # Bouton suppression

lib/
└── auth.ts                     # Utilitaires d'authentification

scripts/
└── create-admin.ts             # Script création admin
```

## Notes techniques

- **Authentification** : Sessions basées sur cookies (7 jours de durée)
- **Base de données** : PostgreSQL avec Prisma ORM
- **Hashing** : bcryptjs pour les mots de passe
- **Protection** : Vérification de session sur chaque page admin
