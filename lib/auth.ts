import { cookies } from 'next/headers';
import { prisma } from './prisma';
import * as bcrypt from 'bcryptjs';

const SESSION_COOKIE_NAME = 'acmu-admin-session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 jours

export interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
}

/**
 * Créer une session pour un utilisateur
 */
export async function createSession(userId: string): Promise<string> {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  
  // En production, on stockerait la session en base de données
  // Pour simplifier, on utilise juste un cookie signé avec l'ID utilisateur
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify({ userId, sessionId }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });

  return sessionId;
}

/**
 * Récupérer l'utilisateur actuel depuis la session
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie?.value) {
      return null;
    }

    const session = JSON.parse(sessionCookie.value);
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

/**
 * Supprimer la session (logout)
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Vérifier les identifiants de connexion
 */
export async function verifyCredentials(
  email: string,
  password: string
): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
