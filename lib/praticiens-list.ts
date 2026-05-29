import { prisma } from '@/lib/prisma';
import { praticienOrderBy } from '@/lib/praticien-order';
import type { Prisma } from '@prisma/client';

let ordreColumnCache: boolean | null = null;

/** La migration « ordre » est appliquée et l’app peut trier / réordonner. */
export async function isPraticienOrdreEnabled(): Promise<boolean> {
  if (ordreColumnCache !== null) return ordreColumnCache;
  try {
    const rows = await prisma.$queryRaw<{ exists: boolean }[]>`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'praticiens'
          AND column_name = 'ordre'
      ) AS exists
    `;
    ordreColumnCache = Boolean(rows[0]?.exists);
  } catch {
    ordreColumnCache = false;
  }
  return ordreColumnCache;
}

export async function praticienListOrderBy(): Promise<Prisma.PraticienOrderByWithRelationInput[]> {
  return (await isPraticienOrdreEnabled()) ? praticienOrderBy : [{ nom: 'asc' }];
}

const SELECT_WITHOUT_ORDRE = {
  id: true,
  nom: true,
  titre: true,
  specialite: true,
  description: true,
  details: true,
  photo: true,
  tel: true,
  email: true,
  urlRdv: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.PraticienSelect;

/** findMany sans lire la colonne ordre si elle n’existe pas encore (droits PostgreSQL o2switch). */
export async function findPraticiens(
  args: Prisma.PraticienFindManyArgs = {},
): Promise<Prisma.PraticienGetPayload<{ select: typeof SELECT_WITHOUT_ORDRE }>[]> {
  const ordreOk = await isPraticienOrdreEnabled();
  const orderBy = args.orderBy ?? (ordreOk ? praticienOrderBy : [{ nom: 'asc' }]);

  if (ordreOk) {
    return prisma.praticien.findMany({ ...args, orderBy }) as Promise<
      Prisma.PraticienGetPayload<{ select: typeof SELECT_WITHOUT_ORDRE }>[]
    >;
  }

  return prisma.praticien.findMany({
    ...args,
    orderBy,
    select: args.select ?? SELECT_WITHOUT_ORDRE,
  }) as Promise<Prisma.PraticienGetPayload<{ select: typeof SELECT_WITHOUT_ORDRE }>[]>;
}

export async function nextPraticienOrdre(): Promise<number | undefined> {
  if (!(await isPraticienOrdreEnabled())) return undefined;
  const { _max } = await prisma.praticien.aggregate({ _max: { ordre: true } });
  return (_max.ordre ?? -1) + 1;
}
