'use client';

import dynamic from 'next/dynamic';

const ContactMap = dynamic(() => import('./ContactMap'), {
  ssr: false,
  loading: () => (
    <div
      className="h-[320px] md:h-[420px] w-full rounded-2xl bg-gray-100 animate-pulse border-2 border-[#67e8cc]/20"
      aria-hidden
    />
  ),
});

export default function ContactMapLazy() {
  return <ContactMap />;
}
