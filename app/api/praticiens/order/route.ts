import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isPraticienOrdreEnabled } from '@/lib/praticiens-list';

/**
 * PATCH /api/praticiens/order
 * Body: { ids: string[] } — ordre d'affichage (index 0 = premier sur le site)
 */
export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });
    }

    if (!(await isPraticienOrdreEnabled())) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Le tri par glisser-déposer nécessite une migration base de données (voir SETUP-SITE-TEST.md).',
        },
        { status: 503 },
      );
    }

    const body = await request.json();
    const ids = body?.ids;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'ids doit être un tableau non vide' },
        { status: 400 },
      );
    }

    if (!ids.every((id: unknown) => typeof id === 'string' && id.length > 0)) {
      return NextResponse.json(
        { success: false, error: 'Chaque id doit être une chaîne valide' },
        { status: 400 },
      );
    }

    const existing = await prisma.praticien.findMany({ select: { id: true } });
    const existingIds = new Set(existing.map((p) => p.id));

    if (ids.length !== existing.length || ids.some((id) => !existingIds.has(id))) {
      return NextResponse.json(
        { success: false, error: 'La liste doit contenir exactement tous les praticiens' },
        { status: 400 },
      );
    }

    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.praticien.update({
          where: { id },
          data: { ordre: index },
        }),
      ),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur mise à jour ordre praticiens:', error);
    return NextResponse.json(
      { success: false, error: "Impossible d'enregistrer l'ordre" },
      { status: 500 },
    );
  }
}
