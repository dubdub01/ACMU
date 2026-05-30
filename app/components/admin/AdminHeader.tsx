import Link from 'next/link';
import LogoutButton from '@/app/components/admin/LogoutButton';

type AdminHeaderProps = {
  userEmail: string;
  title?: string;
  backHref?: string;
  backLabel?: string;
};

export default function AdminHeader({
  userEmail,
  title = 'Administration ACMU',
  backHref,
  backLabel = '← Retour',
}: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600 mt-1">Connecté en tant que {userEmail}</p>
          </div>
          <div className="flex items-center gap-4">
            {backHref ? (
              <Link href={backHref} className="text-gray-600 hover:text-gray-900 font-medium">
                {backLabel}
              </Link>
            ) : (
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Voir le site
              </Link>
            )}
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
