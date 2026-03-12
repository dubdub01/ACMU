# Explication : Prisma et PostgreSQL

## Qu'est-ce qu'on vient de faire ?

### 1. Installation de Prisma
```bash
npm install prisma @prisma/client
```
- **Prisma CLI** : outils en ligne de commande pour gérer la base de données
- **@prisma/client** : client TypeScript généré automatiquement pour interroger la base

### 2. Initialisation (`npx prisma init`)
Cela a créé :
- `prisma/schema.prisma` : le fichier qui définit votre base de données
- `prisma.config.ts` : configuration Prisma
- `.env` : fichier d'environnement (mais on utilise déjà `.env.local`)

### 3. Le schéma Prisma (`prisma/schema.prisma`)

C'est le fichier le plus important ! Il définit :
- **Le type de base de données** : PostgreSQL
- **Les modèles** : les "tables" de votre base de données

#### Notre modèle `Praticien` :

```prisma
model Praticien {
  id          String   @id @default(uuid())
  nom         String
  titre       String
  specialite  String?
  description String?  @db.Text
  photo       String?
  urlRdv      String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Explication des champs :**
- `id` : Identifiant unique, généré automatiquement (UUID)
- `nom` : Nom du praticien (obligatoire)
- `titre` : Titre professionnel (obligatoire)
- `specialite` : Spécialité (optionnel, le `?` signifie optionnel)
- `description` : Texte de présentation (optionnel, texte long)
- `photo` : Chemin vers l'image (optionnel)
- `urlRdv` : URL Mobminder pour prendre rendez-vous (optionnel)
- `createdAt` : Date de création (automatique)
- `updatedAt` : Date de modification (automatique)

**Types de données :**
- `String` : Texte court
- `String?` : Texte optionnel
- `@db.Text` : Texte long (pour descriptions)
- `DateTime` : Date/heure
- `@id` : Clé primaire
- `@default(uuid())` : Valeur par défaut = UUID généré
- `@default(now())` : Valeur par défaut = date actuelle
- `@updatedAt` : Mis à jour automatiquement à chaque modification

### 4. Génération du client (`npx prisma generate`)

Prisma lit votre schéma et génère automatiquement :
- Le client TypeScript dans `app/generated/prisma/`
- Des fonctions typées pour interroger la base de données
- L'autocomplétion dans votre IDE !

### 5. Migration (`npx prisma migrate dev`)

Une migration crée/modifie la structure de la base de données :
- Prisma génère un fichier SQL dans `prisma/migrations/`
- Ce SQL crée la table "praticiens" dans PostgreSQL
- La migration est appliquée automatiquement

**Important :** Deux URLs différentes :
- `.env.local` : `postgres:5432` → pour Next.js dans Docker
- `.env` : `localhost:5432` → pour Prisma CLI depuis votre machine

### 6. Client Prisma réutilisable (`lib/prisma.ts`)

On crée une seule instance de PrismaClient pour toute l'application :
- Évite de créer trop de connexions
- Réutilisable partout dans le code

## Comment utiliser Prisma maintenant ?

### Exemple : Lire tous les praticiens

```typescript
import { prisma } from '@/lib/prisma'

// Dans une page ou API route Next.js
const praticiens = await prisma.praticien.findMany()
```

### Exemple : Ajouter un praticien

```typescript
import { prisma } from '@/lib/prisma'

await prisma.praticien.create({
  data: {
    nom: "Dr. Dupont",
    titre: "Médecin généraliste",
    specialite: "Médecine générale",
    description: "Médecin avec 20 ans d'expérience...",
    urlRdv: "https://booking.mobminder.com/dupont/"
  }
})
```

### Exemple : Modifier un praticien

```typescript
await prisma.praticien.update({
  where: { id: "uuid-du-praticien" },
  data: {
    nom: "Dr. Dupont Modifié"
  }
})
```

### Exemple : Supprimer un praticien

```typescript
await prisma.praticien.delete({
  where: { id: "uuid-du-praticien" }
})
```

## Structure actuelle

```
site-acmu/
├── prisma/
│   ├── schema.prisma          # Définition de la base de données
│   └── migrations/            # Historique des modifications
│       └── 20260219155649_init_praticiens/
│           └── migration.sql  # SQL qui crée la table
├── app/generated/prisma/      # Client TypeScript généré
├── lib/
│   └── prisma.ts              # Instance réutilisable du client
└── .env                        # URL pour Prisma CLI (localhost)
```

## Prochaines étapes

1. ✅ Schéma créé
2. ✅ Migration appliquée (table créée)
3. ✅ Client généré
4. ⏭️ Créer l'espace admin pour gérer les praticiens
5. ⏭️ Connecter la page Praticiens à la base de données
