import type { ReactNode } from 'react';

type ContactInfoListProps = {
  variant?: 'footer' | 'page';
};

function Row({
  icon,
  children,
  variant,
}: {
  icon: ReactNode;
  children: ReactNode;
  variant: 'footer' | 'page';
}) {
  const textClass =
    variant === 'footer'
      ? 'text-sm leading-relaxed text-white/95'
      : 'text-base leading-relaxed text-white';

  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-[#67e8cc]"
        aria-hidden
      >
        {icon}
      </span>
      <div className={`min-w-0 flex-1 ${textClass}`}>{children}</div>
    </li>
  );
}

const IconHome = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h14V10" />
  </svg>
);

const IconPhone = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const IconDoc = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const IconClock = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function ContactInfoList({ variant = 'footer' }: ContactInfoListProps) {
  const linkClass =
    variant === 'footer'
      ? 'hover:text-[#67e8cc] transition-colors'
      : 'font-semibold hover:text-[#67e8cc] transition-colors';

  return (
    <ul className="space-y-4">
      <Row icon={<IconHome />} variant={variant}>
        <p>
          Rue Victor Allard 147
          <br />
          1180 Uccle, Belgique
        </p>
      </Row>
      <Row icon={<IconPhone />} variant={variant}>
        <a href="tel:+3227265667" className={linkClass}>
          02/726.56.67
        </a>
      </Row>
      <Row icon={<IconDoc />} variant={variant}>
        <p>N° d&apos;entreprise : BE 0757.867.130</p>
      </Row>
      <Row icon={<IconClock />} variant={variant}>
        <p>Du lundi au vendredi à partir de 8:30 et samedi à partir de 9:00.</p>
      </Row>
      <Row icon={<IconClock />} variant={variant}>
        <p>
          <span className="font-semibold text-white">Prise de sang :</span>
          <br />
          Lundi au vendredi : de 7:30 à 11:30.
          <br />
          Samedi : 8:00 à 11:30.
        </p>
      </Row>
    </ul>
  );
}
