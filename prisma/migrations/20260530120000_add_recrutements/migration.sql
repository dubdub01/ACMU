-- CreateTable
CREATE TABLE "recrutements" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recrutements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recrutements_ordre_idx" ON "recrutements"("ordre");

-- Offres initiales (équivalent à l'ancienne page statique)
INSERT INTO "recrutements" ("id", "titre", "description", "image", "ordre", "createdAt", "updatedAt") VALUES
(
  'seed-recrutement-dentistes',
  'Dentistes et spécialistes',
  'Nous recherchons des dentistes et des médecins spécialistes pour rejoindre notre équipe pluridisciplinaire. Un environnement moderne et collaboratif vous attend.',
  'dentisterie',
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'seed-recrutement-dermatologue',
  'Dermatologue',
  'Poste de dermatologue disponible pour compléter notre offre de soins spécialisés. Rejoignez une équipe dynamique dans un centre médical moderne.',
  'dermatologie',
  1,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'seed-recrutement-endocrinologue',
  'Endocrinologue',
  'Recherche d''un endocrinologue pour renforcer notre équipe médicale. Excellente opportunité de carrière dans un environnement professionnel et bien équipé.',
  'endocrinologie',
  2,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
