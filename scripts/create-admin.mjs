/**
 * Créer un compte admin (production / SSH o2switch).
 * Usage: DATABASE_URL="postgresql://..." node scripts/create-admin.mjs <email> <password> [name]
 */
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

config({ path: resolve(root, '.env') });
config({ path: resolve(root, '.env.local'), override: true });

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL manquant. Exportez-la ou créez un fichier .env sur le serveur.');
  process.exit(1);
}

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || 'Administrateur';

if (!email || !password) {
  console.error('Usage: node scripts/create-admin.mjs <email> <password> [name]');
  process.exit(1);
}

const prisma = new PrismaClient();

try {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.error(`L'utilisateur ${email} existe déjà.`);
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  console.log('✅ Admin créé');
  console.log(`   Email: ${user.email}`);
  console.log(`   Nom: ${user.name ?? 'N/A'}`);
} catch (e) {
  const msg = e instanceof Error ? e.message : String(e);
  if (msg.includes('droit refusé') || msg.includes('permission denied')) {
    console.error(
      '❌ Droits PostgreSQL insuffisants. Voir SETUP-SITE-TEST.md (section « Droits sur les tables »).',
    );
  } else {
    console.error('❌ Erreur:', msg);
  }
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
