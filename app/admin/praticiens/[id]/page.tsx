import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import PraticienForm from '@/app/components/admin/PraticienForm';

export const metadata = {
  title: 'Modifier praticien - Administration ACMU',
};

export default async function ModifierPraticien({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  const praticien = await prisma.praticien.findUnique({
    where: { id },
  });

  if (!praticien) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Modifier {praticien.nom}
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
          <PraticienForm praticien={praticien} />
        </div>
      </main>
    </div>
  );
}
