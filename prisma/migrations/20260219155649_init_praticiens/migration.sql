-- CreateTable
CREATE TABLE "praticiens" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "specialite" TEXT,
    "description" TEXT,
    "photo" TEXT,
    "urlRdv" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "praticiens_pkey" PRIMARY KEY ("id")
);
