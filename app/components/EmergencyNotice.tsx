type EmergencyNoticeProps = {
  className?: string;
  linkClassName?: string;
};

export default function EmergencyNotice({
  className = 'text-sm text-gray-600',
  linkClassName = 'font-semibold text-red-600 hover:text-red-700',
}: EmergencyNoticeProps) {
  return (
    <p className={className}>
      Ce centre n&apos;est pas un service d&apos;urgences. En cas d&apos;urgence vitale ou
      extrême, veuillez composer le{' '}
      <a href="tel:112" className={linkClassName}>
        112
      </a>
      .
    </p>
  );
}
