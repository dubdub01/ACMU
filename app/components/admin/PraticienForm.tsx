'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Nettoyer les URLs locales lors du démontage du composant

interface Praticien {
  id: string;
  nom: string;
  titre: string;
  specialite: string | null;
  description: string | null;
  details: string | null;
  photo: string | null;
  tel: string | null;
  email: string | null;
  urlRdv: string | null;
}

interface PraticienFormProps {
  praticien?: Praticien;
}

export default function PraticienForm({ praticien }: PraticienFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(praticien?.photo || null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [formData, setFormData] = useState({
    nom: praticien?.nom || '',
    titre: praticien?.titre || '',
    specialite: praticien?.specialite || '',
    description: praticien?.description || '',
    details: praticien?.details || '',
    photo: praticien?.photo || '',
    tel: praticien?.tel || '',
    email: praticien?.email || '',
    urlRdv: praticien?.urlRdv || '',
  });

  const createLocalPreview = (file: File) => {
    // Nettoyer l'ancienne prévisualisation locale si elle existe
    if (localPreview) {
      URL.revokeObjectURL(localPreview);
    }
    // Créer une URL locale pour la prévisualisation
    const previewUrl = URL.createObjectURL(file);
    setLocalPreview(previewUrl);
  };

  const uploadFile = async (file: File) => {
    if (!file) return;

    // Vérifier le type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Format non supporté. Utilisez JPG, PNG ou WebP.');
      return;
    }

    // Vérifier la taille (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Fichier trop volumineux. Maximum 5MB.');
      return;
    }

    // Créer la prévisualisation locale immédiatement
    createLocalPreview(file);

    setUploading(true);
    setError('');

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      // En cas de remplacement (photo existante locale), envoyer l'ancien chemin pour suppression
      const currentPhoto = formData.photo?.trim();
      if (currentPhoto && (currentPhoto.startsWith('/images/praticiens/') || currentPhoto.startsWith('images/praticiens/'))) {
        formDataUpload.append('oldPath', currentPhoto.startsWith('/') ? currentPhoto : `/${currentPhoto}`);
      }

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Erreur lors de l\'upload');
        setUploading(false);
        return;
      }

      // Mettre à jour le chemin de la photo
      setFormData({ ...formData, photo: data.path });
      setPreview(data.path);
      
      // Nettoyer la prévisualisation locale et utiliser l'URL du serveur
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
        setLocalPreview(null);
      }
      
      setUploading(false);
    } catch (err) {
      setError('Erreur lors de l\'upload de l\'image');
      setUploading(false);
    }
  };

  // Nettoyer les URLs locales lors du démontage
  useEffect(() => {
    return () => {
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = praticien
        ? `/api/praticiens/${praticien.id}`
        : '/api/praticiens';
      const method = praticien ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: formData.nom,
          titre: formData.titre,
          specialite: formData.specialite || null,
          description: formData.description || null,
          details: formData.details || null,
          photo: formData.photo || null,
          tel: formData.tel || null,
          email: formData.email || null,
          urlRdv: formData.urlRdv || null,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Erreur lors de la sauvegarde');
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError('Erreur lors de la sauvegarde');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
          Nom <span className="text-red-500">*</span>
        </label>
        <input
          id="nom"
          type="text"
          required
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#479983] focus:border-transparent outline-none transition"
          placeholder="Dr. Dupont"
        />
      </div>

      <div>
        <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-2">
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          id="titre"
          type="text"
          required
          value={formData.titre}
          onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#479983] focus:border-transparent outline-none transition"
          placeholder="Médecin généraliste"
        />
      </div>

      <div>
        <label htmlFor="specialite" className="block text-sm font-medium text-gray-700 mb-2">
          Spécialité
        </label>
        <input
          id="specialite"
          type="text"
          value={formData.specialite}
          onChange={(e) => setFormData({ ...formData, specialite: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#479983] focus:border-transparent outline-none transition"
          placeholder="Cardiologie"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description (courte)
        </label>
        <textarea
          id="description"
          rows={5}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#479983] focus:border-transparent outline-none transition"
          placeholder="Résumé court affiché sur la carte (2–3 phrases)..."
        />
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
          En savoir plus (texte long)
        </label>
        <textarea
          id="details"
          rows={7}
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#479983] focus:border-transparent outline-none transition"
          placeholder="Texte détaillé qui sera affiché dans la fenêtre « En savoir plus »..."
        />
        <p className="mt-1 text-xs text-gray-500">
          Tu peux y mettre le texte complet du praticien (par ex. celui de l'ancien site).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone (Mobminder / secrétariat)
          </label>
          <input
            id="tel"
            type="text"
            value={formData.tel}
            onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#479983] focus:border-transparent outline-none transition"
            placeholder="02 726 56 67"
          />
          <p className="mt-1 text-xs text-gray-500">
            Numéro qui sera affiché dans le menu « Prendre rendez-vous ».
          </p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email de contact
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#479983] focus:border-transparent outline-none transition"
            placeholder="contact@acmu.be"
          />
          <p className="mt-1 text-xs text-gray-500">
            Adresse email qui sera affichée dans le menu « Prendre rendez-vous ».
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
          Photo
        </label>
        
        {/* Aperçu de l'image */}
        {(localPreview || preview) && (
          <div className="mb-4 relative inline-block">
            <img
              src={localPreview || preview || ''}
              alt="Aperçu"
              className="w-48 h-48 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
              onError={() => {
                setPreview(null);
                if (localPreview) {
                  URL.revokeObjectURL(localPreview);
                  setLocalPreview(null);
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setFormData({ ...formData, photo: '' });
                // Nettoyer la prévisualisation locale si elle existe
                if (localPreview) {
                  URL.revokeObjectURL(localPreview);
                  setLocalPreview(null);
                }
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition text-sm"
              title="Supprimer l'image"
            >
              ×
            </button>
          </div>
        )}

        {/* Upload de fichier */}
        <div>
          <label
            htmlFor="file-upload"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center w-full px-6 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
              uploading
                ? 'border-[#479983] bg-[#479983]/5'
                : isDragging
                  ? 'border-[#479983] bg-[#479983]/10'
                  : 'border-gray-300 hover:border-[#479983] hover:bg-gray-50'
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#479983] mb-2"></div>
                <span className="text-sm text-gray-600">Upload en cours...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <svg
                  className="w-12 h-12 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700 mb-1">
                  Cliquez pour télécharger une image
                </span>
                <span className="text-xs text-gray-500">
                  ou glissez-déposez votre fichier ici
                </span>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <p className="mt-2 text-xs text-gray-500 text-center">
            Formats acceptés : JPG, PNG, WebP • Taille maximale : 5MB
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="urlRdv" className="block text-sm font-medium text-gray-700 mb-2">
          URL de prise de rendez-vous (Mobminder)
        </label>
        <input
          id="urlRdv"
          type="url"
          value={formData.urlRdv}
          onChange={(e) => setFormData({ ...formData, urlRdv: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#479983] focus:border-transparent outline-none transition"
          placeholder="https://booking.mobminder.com/praticien"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#479983] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#479983]/90 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Enregistrement...' : praticien ? 'Modifier' : 'Créer'}
        </button>
        <a
          href="/admin"
          className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          Annuler
        </a>
      </div>
    </form>
  );
}
