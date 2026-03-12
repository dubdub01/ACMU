import Link from 'next/link'
import { prisma } from '@/lib/prisma'

/**
 * Page de test Prisma - Exemple simple
 *
 * Cette page utilise directement Prisma dans un Server Component
 * pour afficher les praticiens depuis la base de données.
 */
export default async function TestPrismaPage() {
  let praticiens: Array<{
    id: string
    nom: string
    titre: string
    specialite: string | null
    urlRdv: string | null
  }> = []
  let error: string | null = null

  try {
    praticiens = await prisma.praticien.findMany({
      orderBy: { nom: 'asc' },
      select: {
        id: true,
        nom: true,
        titre: true,
        specialite: true,
        urlRdv: true,
      },
    })
  } catch (e) {
    error = e instanceof Error ? e.message : 'Erreur de connexion à la base'
  }

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="text-[#479983] hover:text-[#479983]/80 font-medium"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Test Prisma + PostgreSQL
        </h1>
        <p className="text-gray-600 mb-8">
          Cette page lit les praticiens directement depuis la base de données.
        </p>

        {error ? (
          <div className="rounded-xl bg-red-50 border border-red-200 p-6">
            <p className="font-semibold text-red-800">Erreur</p>
            <p className="text-red-700 mt-2">{error}</p>
            <p className="text-sm text-red-600 mt-4">
              Vérifiez que Docker est lancé et que PostgreSQL est démarré (
              <code className="bg-red-100 px-1 rounded">docker-compose up -d</code>
              ).
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-xl bg-[#67e8cc]/10 border border-[#67e8cc]/30 p-4 mb-6">
              <p className="text-[#479983] font-semibold">
                Connexion à la base de données : OK
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Nombre de praticiens : {praticiens.length}
              </p>
            </div>

            {praticiens.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
                <p className="text-gray-600 mb-4">
                  Aucun praticien pour l'instant.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Vous pouvez en ajouter un via l'API :
                </p>
                <pre className="text-left bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`curl -X POST http://localhost:3000/api/praticiens \\
  -H "Content-Type: application/json" \\
  -d '{"nom":"Dr. Test","titre":"Médecin généraliste","urlRdv":"https://example.com"}'`}
                </pre>
              </div>
            ) : (
              <ul className="space-y-3">
                {praticiens.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{p.nom}</p>
                      <p className="text-sm text-[#479983]">{p.titre}</p>
                      {p.specialite && (
                        <p className="text-sm text-gray-600">{p.specialite}</p>
                      )}
                    </div>
                    {p.urlRdv && (
                      <a
                        href={p.urlRdv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#479983] hover:underline"
                      >
                        RDV →
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <div className="mt-8 p-4 rounded-xl bg-gray-50 text-sm text-gray-600">
          <p className="font-semibold text-gray-800 mb-2">Ce que fait cette page</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Utilise <code className="bg-gray-200 px-1 rounded">prisma.praticien.findMany()</code> pour lire la table</li>
            <li>Si la liste est vide, la connexion fonctionne quand même</li>
            <li>Vous pouvez ajouter des données via POST /api/praticiens</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
