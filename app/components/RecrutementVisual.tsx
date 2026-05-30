import Image from 'next/image';
import { getMedicalVisualById } from '@/lib/medical-visuals';

type RecrutementVisualProps = {
  imageId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: 'w-14 h-14 text-2xl',
  md: 'w-20 h-20 text-4xl',
  lg: 'w-24 h-24 text-5xl',
};

export default function RecrutementVisual({
  imageId,
  size = 'md',
  className = '',
}: RecrutementVisualProps) {
  const visual = getMedicalVisualById(imageId);
  const boxClass = `bg-[#67e8cc] rounded-xl flex items-center justify-center shadow-md overflow-hidden ${sizeClasses[size]} ${className}`;

  if (!visual) {
    return (
      <div className={boxClass}>
        <span className="text-4xl opacity-60">👤</span>
      </div>
    );
  }

  if (visual.type === 'image') {
    return (
      <div className={`relative ${boxClass} bg-white`}>
        <Image
          src={visual.value}
          alt={visual.label}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
    );
  }

  return (
    <div className={boxClass}>
      <span role="img" aria-label={visual.label}>
        {visual.value}
      </span>
    </div>
  );
}
