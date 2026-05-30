import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

/**
 * Sert les photos uploadées depuis public/images/praticiens (o2switch : les nouveaux
 * fichiers ne sont pas toujours exposés par le static Next seul).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;

  if (!filename || filename.includes('..') || filename.includes('/')) {
    return new NextResponse(null, { status: 404 });
  }

  const filePath = join(process.cwd(), 'public', 'images', 'praticiens', filename);

  if (!existsSync(filePath)) {
    return new NextResponse(null, { status: 404 });
  }

  const ext = filename.includes('.') ? filename.slice(filename.lastIndexOf('.')).toLowerCase() : '';
  const buffer = await readFile(filePath);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  });
}
