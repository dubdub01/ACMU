import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { deleteLocalPraticienPhoto } from '@/lib/upload';

/**
 * GET /api/praticiens/[id] - Récupérer un praticien
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const praticien = await prisma.praticien.findUnique({
      where: { id },
    });

    if (!praticien) {
      return NextResponse.json(
        { success: false, error: 'Praticien non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: praticien });
  } catch (error) {
    console.error('Erreur Prisma:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de lire le praticien' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/praticiens/[id] - Modifier un praticien (admin uniquement)
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Vérifier l'authentification
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { nom, titre, specialite, description, details, photo, tel, email, urlRdv } = body;

    if (!nom || !titre) {
      return NextResponse.json(
        { success: false, error: 'nom et titre sont obligatoires' },
        { status: 400 }
      );
    }

    const praticien = await prisma.praticien.update({
      where: { id },
      data: {
        nom: String(nom),
        titre: String(titre),
        specialite: specialite ? String(specialite) : null,
        description: description ? String(description) : null,
        details: details ? String(details) : null,
        photo: photo ? String(photo) : null,
        tel: tel ? String(tel) : null,
        email: email ? String(email) : null,
        urlRdv: urlRdv ? String(urlRdv) : null,
      },
    });

    return NextResponse.json({ success: true, data: praticien });
  } catch (error) {
    console.error('Erreur Prisma:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de modifier le praticien' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/praticiens/[id] - Supprimer un praticien (admin uniquement)
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Vérifier l'authentification
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const praticien = await prisma.praticien.findUnique({
      where: { id },
      select: { photo: true },
    });

    if (praticien?.photo) {
      try {
        await deleteLocalPraticienPhoto(praticien.photo);
      } catch (err) {
        console.warn('Impossible de supprimer la photo du praticien:', err);
      }
    }

    await prisma.praticien.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur Prisma:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de supprimer le praticien' },
      { status: 500 }
    );
  }
}
