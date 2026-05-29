-- À exécuter dans cPanel → PostgreSQL → phpPgAdmin (utilisateur propriétaire vsup3936)
-- puis en SSH : export DATABASE_URL=... && npx prisma migrate deploy

ALTER TABLE users OWNER TO vsup3936_acmu_user;
ALTER TABLE praticiens OWNER TO vsup3936_acmu_user;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO vsup3936_acmu_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO vsup3936_acmu_user;
GRANT USAGE ON SCHEMA public TO vsup3936_acmu_user;
