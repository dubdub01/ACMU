'use client';

import DeleteButton from '@/app/components/admin/DeleteButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export type PraticienAdminRow = {
  id: string;
  nom: string;
  titre: string;
  specialite: string | null;
  createdAt: string;
};

export default function PraticienAdminList({
  praticiens: initial,
  ordreEnabled = true,
}: {
  praticiens: PraticienAdminRow[];
  ordreEnabled?: boolean;
}) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(initial);
  }, [initial]);

  const persistOrder = async (ordered: PraticienAdminRow[]) => {
    if (!ordreEnabled) return;
    setSaving(true);
    try {
      const response = await fetch('/api/praticiens/order', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: ordered.map((p) => p.id) }),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Erreur');
      }
      router.refresh();
    } catch {
      alert("Impossible d'enregistrer l'ordre. La liste a été réinitialisée.");
      setItems(initial);
    } finally {
      setSaving(false);
      setDragId(null);
      setOverId(null);
    }
  };

  const reorder = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    const fromIndex = items.findIndex((p) => p.id === fromId);
    const toIndex = items.findIndex((p) => p.id === toId);
    if (fromIndex < 0 || toIndex < 0) return;

    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setItems(next);
    void persistOrder(next);
  };

  const handleDragStart = (id: string) => {
    setDragId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (dragId && id !== dragId) {
      setOverId(id);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (dragId) {
      reorder(dragId, targetId);
    }
  };

  const handleDragEnd = () => {
    setDragId(null);
    setOverId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <p className="px-6 py-3 text-sm text-gray-600 bg-[#67e8cc]/10 border-b border-[#67e8cc]/30">
        {saving ? (
          <span className="text-[#479983] font-medium">Enregistrement de l&apos;ordre…</span>
        ) : ordreEnabled ? (
          <>
            Glissez les lignes par la poignée{' '}
            <span className="inline-block align-middle text-gray-400" aria-hidden>
              ⠿
            </span>{' '}
            pour définir l&apos;ordre sur la page{' '}
            <Link href="/praticiens" className="text-[#479983] font-medium hover:underline">
              Nos praticiens
            </Link>
            .
          </>
        ) : (
          <span className="text-amber-800">
            Tri par glisser-déposer indisponible : exécutez la migration SQL sur o2switch (voir
            SETUP-SITE-TEST.md). Affichage par nom en attendant.
          </span>
        )}
      </p>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {ordreEnabled ? <th className="w-12 px-3 py-4" aria-label="Réordonner" /> : null}
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Titre
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Spécialité
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date d&apos;ajout
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((praticien, index) => {
            const isDragging = dragId === praticien.id;
            const isOver = overId === praticien.id && dragId !== praticien.id;

            return (
              <tr
                key={praticien.id}
                onDragOver={(e) => handleDragOver(e, praticien.id)}
                onDrop={(e) => handleDrop(e, praticien.id)}
                className={[
                  'transition-colors',
                  isDragging ? 'opacity-40 bg-gray-100' : 'hover:bg-gray-50',
                  isOver ? 'bg-[#67e8cc]/15 ring-2 ring-inset ring-[#67e8cc]/50' : '',
                ].join(' ')}
              >
                {ordreEnabled ? (
                  <td className="px-3 py-4 text-center">
                    <div
                      draggable={!saving}
                      onDragStart={(e) => {
                        e.dataTransfer.effectAllowed = 'move';
                        handleDragStart(praticien.id);
                      }}
                      onDragEnd={handleDragEnd}
                      className="inline-flex cursor-grab active:cursor-grabbing text-gray-400 hover:text-[#479983] p-1 rounded touch-none select-none"
                      role="button"
                      tabIndex={0}
                      aria-label={`Déplacer ${praticien.nom}, position ${index + 1}`}
                    >
                      <span className="text-lg leading-none" aria-hidden>
                        ⠿
                      </span>
                    </div>
                  </td>
                ) : null}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{praticien.nom}</div>
                  <div className="text-xs text-gray-400">Position {index + 1}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{praticien.titre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{praticien.specialite || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(praticien.createdAt).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/praticiens/${praticien.id}`}
                    className="text-[#479983] hover:text-[#479983]/80 mr-4"
                  >
                    Modifier
                  </Link>
                  <DeleteButton praticienId={praticien.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
