import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import LogoutButton from '@/app/components/admin/LogoutButton';
import PraticienAdminList from '@/app/components/admin/PraticienAdminList';
import { findPraticiens, isPraticienOrdreEnabled } from '@/lib/praticiens-list';

export const metadata = {
  title: 'Administration - Centre médical ACMU',
  description: 'Gestion des praticiens',
};

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  const [praticiens, ordreEnabled] = await Promise.all([
    findPraticiens({
      select: {
        id: true,
        nom: true,
        titre: true,
        specialite: true,
        createdAt: true,
      },
    }),
    isPraticienOrdreEnabled(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Administration ACMU
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Connecté en tant que {user.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Voir le site
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Praticiens</h2>
          <Link
            href="/admin/praticiens/nouveau"
            className="bg-[#479983] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#479983]/90 transition shadow-md hover:shadow-lg"
          >
            + Ajouter un praticien
          </Link>
        </div>

        {/* Liste des praticiens */}
        {praticiens.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun praticien
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par ajouter votre premier praticien.
            </p>
            <Link
              href="/admin/praticiens/nouveau"
              className="inline-block bg-[#479983] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#479983]/90 transition"
            >
              Ajouter un praticien
            </Link>
          </div>
        ) : (
          <PraticienAdminList
            ordreEnabled={ordreEnabled}
            praticiens={praticiens.map((p) => ({
              id: p.id,
              nom: p.nom,
              titre: p.titre,
              specialite: p.specialite,
              createdAt: p.createdAt.toISOString(),
            }))}
          />
        )}
      </main>
    </div>
  );
}
