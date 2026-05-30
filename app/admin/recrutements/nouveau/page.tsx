import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import AdminHeader from '@/app/components/admin/AdminHeader';
import RecrutementForm from '@/app/components/admin/RecrutementForm';

export const metadata = {
  title: 'Nouvelle offre - Administration ACMU',
};

export default async function NouveauRecrutementPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        userEmail={user.email}
        title="Nouvelle offre de recrutement"
        backHref="/admin/recrutements"
        backLabel="← Recrutements"
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <RecrutementForm />
        </div>
      </main>
    </div>
  );
}
