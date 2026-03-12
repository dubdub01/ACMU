import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import PraticienForm from '@/app/components/admin/PraticienForm';

export const metadata = {
  title: 'Nouveau praticien - Administration ACMU',
};

export default async function NouveauPraticien() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Nouveau praticien
            </h1>
            <a
              href="/admin"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Retour
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <PraticienForm />
        </div>
      </main>
    </div>
  );
}
