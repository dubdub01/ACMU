'use client';

import React from 'react';

interface PraticienCardProps {
  id: string;
  nom: string;
  titre: string;
  specialite: string | null;
  description: string | null;
  details?: string | null;
  photo: string | null;
  urlRdv: string | null;
  tel?: string | null;
  email?: string | null;
  /**
   * Variante de couleur pour le fond de la photo.
   * 'primary' = turquoise clair (#67e8cc)
   * 'secondary' = vert foncé (#479983)
   */
  variant?: 'primary' | 'secondary';
}

export default function PraticienCard({
  nom,
  titre,
  specialite,
  description,
  details,
  photo,
  urlRdv,
  tel,
  email,
  variant = 'primary',
}: PraticienCardProps) {
  // S'assurer que le chemin de la photo est absolu (commence par / ou https://)
  const photoSrc = photo
    ? photo.startsWith('http')
      ? photo
      : photo.startsWith('/')
        ? photo
        : `/${photo}`
    : null;

  const [imgError, setImgError] = React.useState(false);
  const [showContact, setShowContact] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);

  // Réinitialiser l'erreur si la photo change
  React.useEffect(() => {
    setImgError(false);
  }, [photoSrc]);

  const showImage = photoSrc && !imgError;
  const photoBgClass =
    variant === 'secondary' ? 'bg-[#479983]' : 'bg-[#67e8cc]';
  const hasDetails = !!details;
  const hasLongDescription = (description?.length || 0) > 220 || hasDetails;

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#67e8cc] transform hover:-translate-y-2">
        {/* Photo du praticien */}
        <div className={`relative h-64 ${photoBgClass} overflow-hidden flex items-center justify-center`}>
        {showImage ? (
          <img
            src={photoSrc}
            alt={nom}
            className="max-h-full max-w-full object-contain transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-8xl text-gray-300">👤</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Informations */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#479983] transition-colors">
          {nom}
        </h3>
        <p className="text-[#479983] font-semibold mb-3 text-lg">{titre}</p>
        {specialite && (
          <p className="text-gray-600 text-sm mb-4 font-medium">{specialite}</p>
        )}

        {description && (
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed line-clamp-3">
              {description}
            </p>
            {hasLongDescription && (
              <button
                type="button"
                onClick={() => setShowDetails(true)}
                className="mt-2 text-sm font-semibold text-[#479983] hover:text-[#479983]/80 focus:outline-none"
              >
                En savoir plus
              </button>
            )}
          </div>
        )}

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowContact((prev) => !prev)}
            className="w-full bg-[#479983] text-white text-center py-3 px-6 rounded-xl font-semibold hover:bg-[#479983]/90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {showContact ? 'Fermer les infos de contact' : 'Prendre rendez-vous'}
          </button>

          {showContact && (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 space-y-2">
              {tel && (
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">Téléphone</span>
                  <a
                    href={`tel:${tel.replace(/\s/g, '')}`}
                    className="text-[#479983] font-semibold hover:underline"
                  >
                    {tel}
                  </a>
                </div>
              )}
              {email && (
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">Email</span>
                  <a
                    href={`mailto:${email}`}
                    className="text-[#479983] font-semibold hover:underline break-all"
                  >
                    {email}
                  </a>
                </div>
              )}
              {urlRdv && (
                <div className="pt-1">
                  <a
                    href={urlRdv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-white text-[#479983] border border-[#479983]/40 px-4 py-2 rounded-xl font-semibold hover:bg-[#479983]/5 transition-colors"
                  >
                    Prise de rendez-vous en ligne
                  </a>
                </div>
              )}
              {!tel && !email && !urlRdv && (
                <p className="text-xs text-gray-500">
                  Les informations de contact pour ce praticien seront bientôt disponibles.
                </p>
              )}
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Modal "En savoir plus" */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden relative">
            <button
              type="button"
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/70"
              aria-label="Fermer"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Colonne photo à gauche */}
              <div className="md:w-5/12 w-full relative">
                <div className={`absolute inset-0 ${photoBgClass}`}>
                  {photoSrc ? (
                    <>
                      <img
                        src={photoSrc}
                        alt={nom}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-7xl text-gray-200">👤</span>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-1 drop-shadow-lg">
                    {nom}
                  </h3>
                  <p className="text-sm md:text-base font-semibold text-[#e0fff7] drop-shadow">
                    {titre}
                  </p>
                  {specialite && (
                    <p className="text-xs md:text-sm text-[#f0fffb] mt-1 drop-shadow">
                      {specialite}
                    </p>
                  )}
                </div>
              </div>

              {/* Colonne texte à droite */}
              <div className="md:w-7/12 w-full p-6 md:p-8 overflow-y-auto">
                {(details || description) && (
                  <div className="mb-6 space-y-3">
                    <h4 className="text-sm font-semibold text-gray-800">
                      À propos
                    </h4>
                    {description && (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {description}
                      </p>
                    )}
                    {details && (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {details}
                      </p>
                    )}
                  </div>
                )}

                {(tel || email || urlRdv) && (
                  <div className="space-y-2 border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">
                      Contact
                    </h4>
                    {tel && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">Téléphone</span>
                        <a
                          href={`tel:${tel.replace(/\s/g, '')}`}
                          className="text-[#479983] font-semibold hover:underline"
                        >
                          {tel}
                        </a>
                      </div>
                    )}
                    {email && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">Email</span>
                        <a
                          href={`mailto:${email}`}
                          className="text-[#479983] font-semibold hover:underline break-all"
                        >
                          {email}
                        </a>
                      </div>
                    )}
                    {urlRdv && (
                      <div className="pt-3">
                        <a
                          href={urlRdv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full bg-[#479983] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#479983]/90 transition-colors"
                        >
                          Prise de rendez-vous en ligne
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
