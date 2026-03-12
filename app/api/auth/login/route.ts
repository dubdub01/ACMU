import { NextResponse } from 'next/server';
import { verifyCredentials, createSession } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

// Répertoire de l'app (écriture garantie) plutôt que HOME (souvent absent ou read-only sous Passenger)
const LOG_FILE = path.join(process.cwd(), 'login-error.log');

async function logLoginError(message: string, error: unknown) {
  try {
    const ts = new Date().toISOString();
    const details =
      error instanceof Error
        ? `${error.name}: ${error.message}\n${error.stack ?? ''}`
        : String(error);
    const line = `[${ts}] ${message}\n${details}\n\n`;
    await fs.appendFile(LOG_FILE, line, 'utf8');
  } catch {
    // on ignore les erreurs de log pour ne pas casser la route
  }
}

export async function POST(request: Request) {
  try {
    await logLoginError('POST /api/auth/login reçu', { cwd: process.cwd(), home: process.env.HOME });
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const user = await verifyCredentials(email, password);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Erreur login:', message);
    await logLoginError('Erreur login', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
