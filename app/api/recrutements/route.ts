import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { isValidMedicalVisualId } from '@/lib/medical-visuals';
import { findRecrutements, nextRecrutementOrdre } from '@/lib/recrutements-list';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const recrutements = await findRecrutements();
    return NextResponse.json({
      success: true,
      count: recrutements.length,
      data: recrutements,
    });
  } catch (error) {
    console.error('Erreur recrutements GET:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de lire les offres' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      );
    }

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

    const ordre = await nextRecrutementOrdre();

    const recrutement = await prisma.recrutement.create({
      data: {
        titre: String(titre),
        description: String(description),
        image: imageId,
        ordre,
      },
    });

    return NextResponse.json({ success: true, data: recrutement });
  } catch (error) {
    console.error('Erreur recrutements POST:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de créer l\'offre' },
      { status: 500 }
    );
  }
}
