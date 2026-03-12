import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import LogoutButton from '@/app/components/admin/LogoutButton';
import DeleteButton from '@/app/components/admin/DeleteButton';

export const metadata = {
  title: 'Administration - Centre médical ACMU',
  description: 'Gestion des praticiens',
};

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  const praticiens = await prisma.praticien.findMany({
    orderBy: { createdAt: 'desc' },
  });

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
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spécialité
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'ajout
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {praticiens.map((praticien) => (
                  <tr key={praticien.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {praticien.nom}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {praticien.titre}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {praticien.specialite || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(praticien.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/praticiens/${praticien.id}`}
                        className="text-[#479983] hover:text-[#479983]/80 mr-4"
                      >
                        Modifier
                      </Link>
                      <DeleteButton praticienId={praticien.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
