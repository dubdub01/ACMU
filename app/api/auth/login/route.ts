import { NextResponse } from 'next/server';
import { verifyCredentials, createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
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
    console.error('Erreur login:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
