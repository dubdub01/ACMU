'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteButton({ praticienId }: { praticienId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce praticien ?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/praticiens/${praticienId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.error || 'Erreur lors de la suppression');
        setLoading(false);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error('Erreur suppression:', error);
      alert('Erreur lors de la suppression');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      {loading ? 'Suppression...' : 'Supprimer'}
    </button>
  );
}
