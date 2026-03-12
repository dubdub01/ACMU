import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// Explication : 
// On crée une seule instance de PrismaClient pour toute l'application
// En développement, on évite de créer trop d'instances (limite de connexions)
// Avec Prisma 7, il faut utiliser un adapter pour PostgreSQL

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Créer le pool de connexions PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Créer l'adapter PostgreSQL
const adapter = new PrismaPg(pool)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    // Optionnel : afficher les requêtes SQL en développement
    // log: ['query', 'error', 'warn'],
  })

// En développement, on garde l'instance dans globalThis pour éviter les reconnexions
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
