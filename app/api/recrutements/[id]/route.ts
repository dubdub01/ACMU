import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { isValidMedicalVisualId } from '@/lib/medical-visuals';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const recrutement = await prisma.recrutement.findUnique({ where: { id } });

    if (!recrutement) {
      return NextResponse.json(
        { success: false, error: 'Offre non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: recrutement });
  } catch (error) {
    console.error('Erreur recrutement GET:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de lire l\'offre' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { titre, description, image } = body;

    if (!titre || !description || !image) {
      return NextResponse.json(
        { success: false, error: 'titre, description et image sont obligatoires' },
        { status: 400 }
      );
    }

    const imageId = String(image);
    if (!isValidMedicalVisualId(imageId)) {
      return NextResponse.json(
        { success: false, error: 'Visuel invalide' },
        { status: 400 }
      );
    }

    const recrutement = await prisma.recrutement.update({
      where: { id },
      data: {
        titre: String(titre),
        description: String(description),
        image: imageId,
      },
    });

    return NextResponse.json({ success: true, data: recrutement });
  } catch (error) {
    console.error('Erreur recrutement PUT:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de modifier l\'offre' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await prisma.recrutement.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur recrutement DELETE:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de supprimer l\'offre' },
      { status: 500 }
    );
  }
}
