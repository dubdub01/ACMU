'use client';

import 'leaflet/dist/leaflet.css';

import { ACMU_ADDRESS, ACMU_COORDS, GOOGLE_MAPS_DIRECTIONS_URL, GOOGLE_MAPS_URL } from '@/lib/contact';
import type { Map as LeafletMap } from 'leaflet';
import { useEffect, useRef } from 'react';

export default function ContactMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initMap() {
      const L = (await import('leaflet')).default;

      if (cancelled || !containerRef.current || mapRef.current) return;

      const iconRetina = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
      const icon = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
      const shadow = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

      const DefaultIcon = L.icon({
        iconRetinaUrl: iconRetina,
        iconUrl: icon,
        shadowUrl: shadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: true,
      }).setView([ACMU_COORDS.lat, ACMU_COORDS.lng], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      L.marker([ACMU_COORDS.lat, ACMU_COORDS.lng])
        .addTo(map)
        .bindPopup(
          `<strong>Centre médical ACMU</strong><br>${ACMU_ADDRESS.street}<br>${ACMU_ADDRESS.city}`,
        )
        .openPopup();

      mapRef.current = map;
    }

    initMap();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={containerRef}
        className="h-[320px] md:h-[420px] w-full rounded-2xl overflow-hidden border-2 border-[#67e8cc]/40 shadow-md z-0"
        aria-label="Carte interactive — Centre médical ACMU à Uccle"
      />
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
