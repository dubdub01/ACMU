#!/usr/bin/env bash
# Corrige le propriétaire des tables PostgreSQL (o2switch).
# phpPgAdmin 9.6 enveloppe souvent les ALTER dans SELECT COUNT(*) → utiliser ce script.
#
# Usage (SSH ou cPanel → Terminal) :
#   bash scripts/o2switch-fix-db-owner.sh
# Mot de passe demandé : utilisateur PostgreSQL « vsup3936 » (cPanel → PostgreSQL).

set -euo pipefail

DB="${PGDATABASE:-vsup3936_acmu_db}"
PGUSER="${PGUSER:-vsup3936}"
PGHOST="${PGHOST:-127.0.0.1}"
APP_USER="${APP_DB_USER:-vsup3936_acmu_user}"

run_sql() {
  psql -h "$PGHOST" -U "$PGUSER" -d "$DB" -v ON_ERROR_STOP=1 -c "$1"
}

echo "→ Base: $DB | propriétaire cible des tables: $APP_USER"
echo "→ Connexion PostgreSQL en tant que: $PGUSER (mot de passe du compte PG principal cPanel)"

run_sql "ALTER TABLE users OWNER TO ${APP_USER};"
run_sql "ALTER TABLE praticiens OWNER TO ${APP_USER};"
run_sql "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${APP_USER};"
run_sql "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ${APP_USER};"
run_sql "GRANT USAGE ON SCHEMA public TO ${APP_USER};"

echo "✅ Propriétaire et droits mis à jour."
echo "   Puis : export DATABASE_URL=... && npx prisma migrate deploy"
