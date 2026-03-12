export const metadata = {
  title: 'Nous recrutons - Centre médical ACMU',
  description: 'Rejoignez l\'équipe du centre médical ACMU. Postes disponibles : Dentistes, spécialistes, Dermatologue, Endocrinologue.',
};

export default function Recrutement() {
  const postes = [
    {
      titre: 'Dentistes et spécialistes',
      description: 'Nous recherchons des dentistes et des médecins spécialistes pour rejoindre notre équipe pluridisciplinaire. Un environnement moderne et collaboratif vous attend.',
      icon: '🦷',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
    },
    {
      titre: 'Dermatologue',
      description: 'Poste de dermatologue disponible pour compléter notre offre de soins spécialisés. Rejoignez une équipe dynamique dans un centre médical moderne.',
      icon: '🔬',
      bgColor: 'from-purple-500/10 to-pink-500/10',
    },
    {
      titre: 'Endocrinologue',
      description: 'Recherche d\'un endocrinologue pour renforcer notre équipe médicale. Excellente opportunité de carrière dans un environnement professionnel et bien équipé.',
      icon: '💊',
      bgColor: 'from-green-500/10 to-emerald-500/10',
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header moderne */}
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

        {/* Liste des postes */}
        <div className="space-y-6 mb-16">
          {postes.map((poste, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-10 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#67e8cc] transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-[#67e8cc] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">{poste.icon}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#479983] transition-colors">
                    {poste.titre}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {poste.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section contact */}
        <div className="bg-[#479983] rounded-2xl p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Intéressé(e) ?
            </h2>
            <p className="text-xl mb-8 text-white max-w-2xl mx-auto">
              Pour plus d'informations sur ces postes, n'hésitez pas à nous contacter. 
              Nous serions ravis d'échanger avec vous.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-white text-[#479983] px-10 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Nous contacter
              <span className="ml-2 text-xl">→</span>
            </a>
          </div>
        </div>
      </div>
  );
}
