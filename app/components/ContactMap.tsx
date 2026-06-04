'use client';

import {
  ACMU_ADDRESS,
  ACMU_COORDS,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_URL,
} from '@/lib/contact';

/** Carte Google Maps intégrée (fiable sur mobile, sans clé API). */
const GOOGLE_MAP_EMBED_URL = `https://maps.google.com/maps?q=${ACMU_COORDS.lat},${ACMU_COORDS.lng}&hl=fr&z=16&output=embed`;

export default function ContactMap() {
  return (
    <div className="flex flex-col h-full">
      <div className="relative h-[320px] md:h-[420px] w-full rounded-2xl overflow-hidden border-2 border-[#67e8cc]/40 shadow-md bg-gray-100">
        <iframe
          title="Carte Google Maps — Centre médical ACMU à Uccle"
          src={GOOGLE_MAP_EMBED_URL}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {ACMU_ADDRESS.street}, {ACMU_ADDRESS.city}
      </p>
      <div className="flex flex-wrap gap-3 mt-4">
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-[#479983] text-white px-4 py-2 text-sm font-medium hover:bg-[#3d8574] transition-colors"
        >
          Ouvrir dans Google Maps
        </a>
        <a
          href={GOOGLE_MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg border-2 border-[#479983] text-[#479983] px-4 py-2 text-sm font-medium hover:bg-[#479983]/5 transition-colors"
        >
          Itinéraire
        </a>
      </div>
    </div>
  );
}
