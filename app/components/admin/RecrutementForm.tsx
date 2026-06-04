'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MedicalVisualPicker from '@/app/components/admin/MedicalVisualPicker';
import RecrutementVisual from '@/app/components/RecrutementVisual';
import { MEDICAL_VISUALS } from '@/lib/medical-visuals';

interface Recrutement {
  id: string;
  titre: string;
  description: string;
  image: string;
}

interface RecrutementFormProps {
  recrutement?: Recrutement;
}

const defaultImageId = MEDICAL_VISUALS[0]?.id ?? 'generaliste';

export default function RecrutementForm({ recrutement }: RecrutementFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    titre: recrutement?.titre ?? '',
    description: recrutement?.description ?? '',
    image: recrutement?.image ?? defaultImageId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.titre.trim() || !formData.description.trim()) {
      setError('Le titre et la description sont obligatoires.');
      return;
    }

    if (!formData.image) {
      setError('Choisissez un visuel.');
      return;
    }

    setLoading(true);

    try {
      const url = recrutement
        ? `/api/recrutements/${recrutement.id}`
        : '/api/recrutements';
      const method = recrutement ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titre: formData.titre.trim(),
          description: formData.description.trim(),
          image: formData.image,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Erreur lors de la sauvegarde');
        setLoading(false);
        return;
      }

      router.push('/admin/recrutements');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la sauvegarde');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-2">
          Titre du poste *
        </label>
        <input
          id="titre"
          type="text"
          required
          value={formData.titre}
          onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#479983] focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          required
          rows={6}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#479983] focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Visuel *
        </label>
        <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
          <RecrutementVisual imageId={formData.image} size="md" />
          <p className="text-sm text-gray-600">Aperçu tel qu&apos;affiché sur le site</p>
        </div>
        <MedicalVisualPicker
          value={formData.image}
          onChange={(id) => setFormData({ ...formData, image: id })}
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#479983] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#479983]/90 transition disabled:opacity-50"
        >
          {loading ? 'Enregistrement...' : recrutement ? 'Mettre à jour' : 'Créer l\'offre'}
        </button>
        <Link
          href="/admin/recrutements"
          className="px-8 py-3 rounded-xl font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
