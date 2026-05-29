-- =============================================================================
-- o2switch / cPanel — NE PAS coller tout ce fichier d'un coup
-- =============================================================================
--
-- L'erreur « SELECT COUNT(*) AS total FROM (ALTER TABLE ... » signifie que vous
-- utilisez la RECHERCHE sur une table, pas l'onglet SQL.
--
-- phpPgAdmin 9.6 (o2switch) enveloppe souvent les ALTER dans
--   SELECT COUNT(*) FROM (ALTER TABLE ...) → ERREUR DE SYNTAXE
-- → Utilisez plutôt cPanel → Terminal ou SSH :
--     bash scripts/o2switch-fix-db-owner.sh
-- (mot de passe : utilisateur PostgreSQL « vsup3936 », pas acmu_user)
--
-- Si vous insistez avec phpPgAdmin : base vsup3936_acmu_db → onglet SQL
-- du menu horizontal (pas « Résultats de la requête » + Envoyer sous une table).
--
-- =============================================================================

-- Étape 1 (une requête à la fois) :
ALTER TABLE users OWNER TO vsup3936_acmu_user;

-- Étape 2 :
ALTER TABLE praticiens OWNER TO vsup3936_acmu_user;

-- Étape 3 :
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO vsup3936_acmu_user;

-- Étape 4 :
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO vsup3936_acmu_user;

-- Étape 5 :
GRANT USAGE ON SCHEMA public TO vsup3936_acmu_user;

-- Puis en SSH :
--   export DATABASE_URL=$(node -pe "JSON.parse(...)" )   # voir SETUP-SITE-TEST.md
--   npx prisma migrate deploy
--   bash scripts/o2switch-post-deploy.sh
