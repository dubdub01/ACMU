'use client';

import Image from 'next/image';
import { MEDICAL_VISUALS } from '@/lib/medical-visuals';

type MedicalVisualPickerProps = {
  value: string;
  onChange: (id: string) => void;
};

export default function MedicalVisualPicker({ value, onChange }: MedicalVisualPickerProps) {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-3">
        Choisissez un pictogramme ou une photo parmi les visuels du site.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 max-h-[420px] overflow-y-auto p-1">
        {MEDICAL_VISUALS.map((visual) => {
          const selected = value === visual.id;
          return (
            <button
              key={visual.id}
              type="button"
              title={visual.label}
              onClick={() => onChange(visual.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition ${
                selected
                  ? 'border-[#479983] bg-[#479983]/10 ring-2 ring-[#479983]/30'
                  : 'border-gray-200 hover:border-[#67e8cc] bg-white'
              }`}
            >
              <div className="relative w-12 h-12 flex items-center justify-center rounded-lg bg-[#67e8cc]/20 overflow-hidden">
                {visual.type === 'image' ? (
                  <Image
                    src={visual.value}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <span className="text-2xl leading-none">{visual.value}</span>
                )}
              </div>
              <span className="text-[10px] leading-tight text-center text-gray-700 line-clamp-2">
                {visual.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
