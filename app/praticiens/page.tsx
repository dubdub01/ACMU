import { prisma } from '@/lib/prisma';
import PraticienCard from '@/app/components/PraticienCard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Nos praticiens - Centre médical ACMU',
  description: 'Découvrez notre équipe de praticiens qualifiés au centre médical ACMU.',
};

export default async function Praticiens() {
  // Charger les praticiens depuis la base de données (avec le champ photo)
  const praticiens = await prisma.praticien.findMany({
    orderBy: { nom: 'asc' },
    select: {
      id: true,
      nom: true,
      titre: true,
      specialite: true,
      description: true,
      details: true,
      photo: true,
      tel: true,
      email: true,
      urlRdv: true,
    },
  });

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header moderne */}
        <div className="text-center mb-20 bg-[#67e8cc] py-16 rounded-2xl">
          <div className="inline-block mb-4">
            <span className="bg-white text-[#479983] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Notre équipe
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Rencontrez nos
            <br />
            <span className="text-white">praticiens</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Découvrez notre équipe de professionnels de santé dévoués à votre bien-être, 
            disponibles pour vous accompagner dans votre parcours de soins.
          </p>
        </div>

        {/* Liste des praticiens */}
        {praticiens.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#67e8cc]/20 to-[#479983]/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-5xl">👥</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Notre équipe sera bientôt disponible
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              La liste de nos praticiens sera ajoutée prochainement.
            </p>
            <p className="text-gray-500">
              Les praticiens seront ajoutés via l'espace d'administration.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {praticiens.map((praticien, index) => (
              <PraticienCard
                key={praticien.id}
                id={praticien.id}
                nom={praticien.nom}
                titre={praticien.titre}
                specialite={praticien.specialite}
                description={praticien.description}
                details={praticien.details}
                photo={praticien.photo}
                tel={praticien.tel}
                email={praticien.email}
                urlRdv={praticien.urlRdv}
                variant={index % 2 === 0 ? 'primary' : 'secondary'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
