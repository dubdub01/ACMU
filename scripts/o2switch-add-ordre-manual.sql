-- Colonne « ordre » pour le tri des praticiens (à faire en 3 fois si besoin).
-- Table praticiens existe déjà : on AJOUTE une colonne, on ne recrée pas la table.

-- ========== ÉTAPE A — une seule commande (psql ou phpPgAdmin onglet SQL sur la BASE) ==========
ALTER TABLE praticiens ADD COLUMN IF NOT EXISTS ordre INTEGER NOT NULL DEFAULT 0;

-- ========== ÉTAPE B — remplir les numéros (0, 1, 2…) selon la date d'ajout ==========
WITH ranked AS (
  SELECT id, (ROW_NUMBER() OVER (ORDER BY "createdAt" ASC) - 1)::INTEGER AS rn
  FROM praticiens
)
UPDATE praticiens p
SET ordre = ranked.rn
FROM ranked
WHERE p.id = ranked.id;

-- ========== ÉTAPE C — index (optionnel mais recommandé) ==========
CREATE INDEX IF NOT EXISTS praticiens_ordre_idx ON praticiens(ordre);
