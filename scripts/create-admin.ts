/**
 * Script pour créer un utilisateur admin
 * Usage: npx tsx scripts/create-admin.ts <email> <password> [name]
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// Charger les variables d'environnement depuis .env.local
config({ path: resolve(__dirname, '../.env.local') });

// Si DATABASE_URL n'est pas défini, essayer .env
if (!process.env.DATABASE_URL) {
  config({ path: resolve(__dirname, '../.env') });
}

if (!process.env.DATABASE_URL) {
  console.error('❌ Erreur: DATABASE_URL n\'est pas défini dans .env.local ou .env');
  console.error('   Assurez-vous que DATABASE_URL est configuré.');
  process.exit(1);
}

// Créer le pool PostgreSQL et l'adapter pour le script
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || 'Administrateur';

  if (!email || !password) {
    console.error('Usage: npx tsx scripts/create-admin.ts <email> <password> [name]');
    process.exit(1);
  }

  // Vérifier si l'utilisateur existe déjà
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.error(`L'utilisateur avec l'email ${email} existe déjà.`);
    process.exit(1);
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer l'utilisateur
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  console.log(`✅ Utilisateur admin créé avec succès !`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Nom: ${user.name || 'N/A'}`);
  console.log(`   ID: ${user.id}`);
}

main()
  .catch((e) => {
    console.error('Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
