import Link from 'next/link';
import RecrutementVisual from '@/app/components/RecrutementVisual';
import { findRecrutements } from '@/lib/recrutements-list';
import { buildPageMetadata } from '@/lib/site-seo';

export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata({
  title: 'Nous recrutons - Centre médical ACMU',
  description:
    "Rejoignez l'équipe du centre médical ACMU. Découvrez nos postes disponibles.",
  path: '/recrutement',
});

export default async function Recrutement() {
  let postes: Awaited<ReturnType<typeof findRecrutements>> = [];

  try {
    postes = await findRecrutements();
  } catch (error) {
    console.error('Erreur chargement recrutements:', error);
  }

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 bg-[#67e8cc] py-16 rounded-2xl">
          <div className="inline-block mb-4">
            <span className="bg-white text-[#479983] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Carrières
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Rejoignez notre
            <br />
            <span className="text-white">équipe</span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Rejoignez notre équipe de professionnels de santé dévoués dans un environnement moderne et innovant.
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {postes.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-lg text-gray-600">
                Aucune offre publiée pour le moment. Revenez bientôt ou contactez-nous.
              </p>
            </div>
          ) : (
            postes.map((poste) => (
              <div
                key={poste.id}
                className="group bg-white rounded-2xl p-10 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#67e8cc] transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <RecrutementVisual imageId={poste.image} size="md" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#479983] transition-colors">
                      {poste.titre}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                      {poste.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-[#479983] rounded-2xl p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Intéressé(e) ?</h2>
          <p className="text-xl mb-8 text-white max-w-2xl mx-auto">
            Pour plus d&apos;informations sur ces postes, n&apos;hésitez pas à nous contacter.
            Nous serions ravis d&apos;échanger avec vous.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-[#479983] px-10 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Nous contacter
            <span className="ml-2 text-xl">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
