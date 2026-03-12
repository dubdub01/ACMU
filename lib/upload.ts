import { unlink } from 'fs/promises';
import { join, resolve } from 'path';
import { existsSync } from 'fs';

const PRATICIENS_IMAGE_DIR = join(process.cwd(), 'public', 'images', 'praticiens');

/**
 * Supprime un fichier photo du stockage si le chemin est un fichier local
 * dans images/praticiens. Retourne true si un fichier a été supprimé.
 */
export async function deleteLocalPraticienPhoto(photoPath: string | null | undefined): Promise<boolean> {
  if (!photoPath || typeof photoPath !== 'string' || photoPath.trim() === '') {
    return false;
  }

  const normalized = photoPath.startsWith('/') ? photoPath.slice(1) : photoPath;
  if (!normalized.startsWith('images/praticiens/') || normalized.includes('..')) {
    return false;
  }

  const fullPath = resolve(join(process.cwd(), 'public', normalized));
  const allowedBase = resolve(PRATICIENS_IMAGE_DIR);
  if (!fullPath.startsWith(allowedBase) || !existsSync(fullPath)) {
    return false;
  }

  await unlink(fullPath);
  return true;
}
