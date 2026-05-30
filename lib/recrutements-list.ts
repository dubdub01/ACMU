import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

const defaultOrder: Prisma.RecrutementOrderByWithRelationInput[] = [
  { ordre: 'asc' },
  { createdAt: 'asc' },
];

export async function findRecrutements<T extends Prisma.RecrutementFindManyArgs>(
  args?: T
): Promise<Prisma.RecrutementGetPayload<T>[]> {
  return prisma.recrutement.findMany({
    orderBy: defaultOrder,
    ...args,
  }) as Promise<Prisma.RecrutementGetPayload<T>[]>;
}

export async function nextRecrutementOrdre(): Promise<number> {
  const last = await prisma.recrutement.findFirst({
    orderBy: { ordre: 'desc' },
    select: { ordre: true },
  });
  return (last?.ordre ?? -1) + 1;
}
