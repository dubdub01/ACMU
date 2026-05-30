'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/admin', label: 'Praticiens', match: (p: string) => p === '/admin' || p.startsWith('/admin/praticiens') },
  {
    href: '/admin/recrutements',
    label: 'Recrutements',
    match: (p: string) => p.startsWith('/admin/recrutements'),
  },
];

export default function AdminNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav className="flex gap-2 border-b border-gray-200 mb-8">
      {tabs.map((tab) => {
        const active = tab.match(pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-5 py-3 font-semibold text-sm rounded-t-lg transition border-b-2 -mb-px ${
              active
                ? 'border-[#479983] text-[#479983] bg-[#479983]/5'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
