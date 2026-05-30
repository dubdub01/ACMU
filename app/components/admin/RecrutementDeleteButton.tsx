'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RecrutementDeleteButton({ recrutementId }: { recrutementId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Supprimer cette offre de recrutement ?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/recrutements/${recrutementId}`, {
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
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-800 disabled:opacity-50 text-sm font-medium"
    >
      {loading ? 'Suppression...' : 'Supprimer'}
    </button>
  );
}
