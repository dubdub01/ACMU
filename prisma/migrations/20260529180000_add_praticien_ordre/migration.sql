-- AlterTable
ALTER TABLE "praticiens" ADD COLUMN "ordre" INTEGER NOT NULL DEFAULT 0;

-- Ordre initial = ancienneté (plus ancien en premier)
WITH ranked AS (
  SELECT id, (ROW_NUMBER() OVER (ORDER BY "createdAt" ASC) - 1)::INTEGER AS rn
  FROM "praticiens"
)
UPDATE "praticiens" p
SET "ordre" = ranked.rn
FROM ranked
WHERE p.id = ranked.id;

-- CreateIndex
CREATE INDEX "praticiens_ordre_idx" ON "praticiens"("ordre");
