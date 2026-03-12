import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getCurrentUser } from '@/lib/auth';
import { deleteLocalPraticienPhoto } from '@/lib/upload';

const PRATICIENS_IMAGE_DIR = join(process.cwd(), 'public', 'images', 'praticiens');

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const oldPath = formData.get('oldPath') as string | null | undefined;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Type de fichier non autorisé. Utilisez JPG, PNG ou WebP.' },
        { status: 400 }
      );
    }

    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'Fichier trop volumineux. Maximum 5MB.' },
        { status: 400 }
      );
    }

    // Supprimer l'ancienne photo si elle est un fichier local (remplacement)
    try {
      await deleteLocalPraticienPhoto(oldPath);
    } catch (err) {
      console.warn('Impossible de supprimer l\'ancienne photo:', err);
      // On continue quand même l'upload
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
    const fileName = `${timestamp}-${originalName}`;

    const uploadDir = PRATICIENS_IMAGE_DIR;
    const filePath = join(uploadDir, fileName);

    // Créer le dossier s'il n'existe pas
    await mkdir(uploadDir, { recursive: true });

    // Convertir le fichier en buffer et l'écrire
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Retourner le chemin public
    const publicPath = `/images/praticiens/${fileName}`;

    return NextResponse.json({
      success: true,
      path: publicPath,
      fileName: fileName,
    });
  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'upload' },
      { status: 500 }
    );
  }
}
