import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Explication :
// - En développement, on utilise Prisma normalement avec PostgreSQL.
// - En production sur certains hébergements (comme O2Switch), le moteur WebAssembly
//   de Prisma peut manquer de mémoire. Pour éviter les erreurs 500,
//   on propose un mode "démo" qui retourne des données vides sans se connecter à la DB.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const isDemoMode = process.env.PRISMA_DEMO_MODE === '1';

function createRealPrismaClient() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const adapter = new PrismaPg(pool);

  return (
    globalForPrisma.prisma ??
    new PrismaClient({
      adapter,
      // log: ['query', 'error', 'warn'],
    })
  );
}

function createDemoPrismaClient() {
  // Client minimal pour le mode démo (pas de connexion DB réelle)
  return {
    praticien: {
      findMany: async () => [],
      findUnique: async () => null,
      create: async () => {
        throw new Error('Mode démo: création de praticien désactivée.');
      },
      update: async () => {
        throw new Error('Mode démo: modification de praticien désactivée.');
      },
      delete: async () => {
        throw new Error('Mode démo: suppression de praticien désactivée.');
      },
    },
    user: {
      findUnique: async () => null,
      create: async () => {
        throw new Error('Mode démo: création d’utilisateur désactivée.');
      },
    },
  } as unknown as PrismaClient;
}

export const prisma = isDemoMode ? createDemoPrismaClient() : createRealPrismaClient();

if (!isDemoMode && process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

