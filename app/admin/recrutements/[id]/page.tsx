import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminHeader from '@/app/components/admin/AdminHeader';
import RecrutementForm from '@/app/components/admin/RecrutementForm';

export const metadata = {
  title: 'Modifier offre - Administration ACMU',
};

export default async function ModifierRecrutementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  const recrutement = await prisma.recrutement.findUnique({ where: { id } });

  if (!recrutement) {
    redirect('/admin/recrutements');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        userEmail={user.email}
        title={`Modifier : ${recrutement.titre}`}
        backHref="/admin/recrutements"
        backLabel="← Recrutements"
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <RecrutementForm recrutement={recrutement} />
        </div>
      </main>
    </div>
  );
}
