/**
 * Vérifie la connexion Prisma et les droits sur users / praticiens.
 * Usage: DATABASE_URL="..." node scripts/o2switch-db-check.mjs
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL non défini');
    process.exit(1);
  }

  const url = new URL(process.env.DATABASE_URL);
  console.log(`Connexion: ${url.username}@${url.hostname}${url.pathname}`);

  const owners = await prisma.$queryRaw`
    SELECT tablename, tableowner
    FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  `;
  console.log('Tables:', owners);

  const users = await prisma.user.count();
  const praticiens = await prisma.praticien.count();
  console.log(`✅ OK — users: ${users}, praticiens: ${praticiens}`);
}

main()
  .catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
