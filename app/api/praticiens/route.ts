import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

/**
 * GET /api/praticiens
 * Retourne la liste de tous les praticiens depuis la base de données.
 * Exemple simple pour tester la connexion Prisma + PostgreSQL.
 */
export async function GET() {
  try {
    const praticiens = await prisma.praticien.findMany({
      orderBy: { nom: 'asc' },
    })
    return NextResponse.json({
      success: true,
      count: praticiens.length,
      data: praticiens,
    })
  } catch (error) {
    console.error('Erreur Prisma:', error)
    return NextResponse.json(
      { success: false, error: 'Impossible de lire les praticiens' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/praticiens
 * Ajoute un praticien (admin uniquement).
 * Body JSON: { nom, titre, specialite?, description?, photo?, urlRdv? }
 */
export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { nom, titre, specialite, description, details, photo, tel, email, urlRdv } = body

    if (!nom || !titre) {
      return NextResponse.json(
        { success: false, error: 'nom et titre sont obligatoires' },
        { status: 400 }
      )
    }

    const praticien = await prisma.praticien.create({
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
    })

    return NextResponse.json({ success: true, data: praticien })
  } catch (error) {
    console.error('Erreur Prisma:', error)
    return NextResponse.json(
      { success: false, error: 'Impossible de créer le praticien' },
      { status: 500 }
    )
  }
}
