import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import AdminHeader from '@/app/components/admin/AdminHeader';
import AdminNav from '@/app/components/admin/AdminNav';
import RecrutementDeleteButton from '@/app/components/admin/RecrutementDeleteButton';
import RecrutementVisual from '@/app/components/RecrutementVisual';
import { findRecrutements } from '@/lib/recrutements-list';
import { getMedicalVisualById } from '@/lib/medical-visuals';

export const metadata = {
  title: 'Recrutements - Administration ACMU',
};

export default async function AdminRecrutementsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  const recrutements = await findRecrutements();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader userEmail={user.email} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminNav />

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Offres de recrutement</h2>
          <Link
            href="/admin/recrutements/nouveau"
            className="bg-[#479983] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#479983]/90 transition shadow-md hover:shadow-lg"
          >
            + Ajouter une offre
          </Link>
        </div>

        {recrutements.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune offre</h3>
            <p className="text-gray-600 mb-6">
              Les offres apparaissent sur la page « Nous recrutons ».
            </p>
            <Link
              href="/admin/recrutements/nouveau"
              className="inline-block bg-[#479983] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#479983]/90 transition"
            >
              Ajouter une offre
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visuel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Poste
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recrutements.map((offre) => {
                  const visual = getMedicalVisualById(offre.image);
                  return (
                    <tr key={offre.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <RecrutementVisual imageId={offre.image} size="sm" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{offre.titre}</div>
                        <div className="text-sm text-gray-500 line-clamp-2 max-w-xl">
                          {offre.description}
                        </div>
                        {visual && (
                          <div className="text-xs text-gray-400 mt-1">{visual.label}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <Link
                          href={`/admin/recrutements/${offre.id}`}
                          className="text-[#479983] hover:text-[#479983]/80 font-medium mr-4"
                        >
                          Modifier
                        </Link>
                        <RecrutementDeleteButton recrutementId={offre.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
