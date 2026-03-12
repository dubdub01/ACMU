export const metadata = {
  title: 'Nos services - Centre médical ACMU',
  description: 'Découvrez tous les services proposés par le centre médical ACMU : médecine générale, spécialisée, dentisterie, paramédicaux, prise de sang, tests PCR, épilation laser, électrolyse.',
};

export default function Services() {
  const services = [
    {
      title: 'Médecine générale',
      description: 'Consultations médicales générales et suivi de santé pour toute la famille. Prise en charge complète de vos besoins médicaux quotidiens.',
      icon: '🏥',
      color: 'from-blue-500/10 to-blue-600/10',
    },
    {
      title: 'Médecine spécialisée',
      description: 'Consultations avec nos médecins spécialistes dans différentes disciplines pour des soins ciblés et approfondis.',
      icon: '👨‍⚕️',
      color: 'from-purple-500/10 to-purple-600/10',
    },
    {
      title: 'Dentisterie',
      description: 'Soins dentaires complets : consultations, soins préventifs, traitements et suivi dentaire pour toute la famille.',
      icon: '🦷',
      color: 'from-cyan-500/10 to-cyan-600/10',
    },
    {
      title: 'Paramédicaux',
      description: 'Services paramédicaux divers : kinésithérapie, soins infirmiers, et autres thérapies pour votre bien-être.',
      icon: '💆',
      color: 'from-green-500/10 to-green-600/10',
    },
    {
      title: 'Prise de sang',
      description: 'Réalisation d\'analyses médicales et prélèvements sanguins dans un environnement professionnel et rassurant.',
      icon: '🩸',
      color: 'from-red-500/10 to-red-600/10',
    },
    {
      title: 'Test PCR',
      description: 'Tests PCR pour le dépistage COVID-19 et autres analyses virologiques avec résultats rapides.',
      icon: '🧪',
      color: 'from-orange-500/10 to-orange-600/10',
    },
    {
      title: 'Épilation laser',
      description: 'Traitements d\'épilation laser modernes et efficaces pour une épilation durable et confortable.',
      icon: '✨',
      color: 'from-pink-500/10 to-pink-600/10',
    },
    {
      title: 'Électrolyse',
      description: 'Traitements d\'électrolyse pour l\'épilation définitive, réalisés par des professionnels expérimentés.',
      icon: '⚡',
      color: 'from-yellow-500/10 to-yellow-600/10',
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header moderne */}
        <div className="text-center mb-20 bg-[#67e8cc] py-16 rounded-2xl">
          <div className="inline-block mb-4">
            <span className="bg-white text-[#479983] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Nos services
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Une gamme complète
            <br />
            <span className="text-white">de services médicaux</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Le centre médical ACMU propose une large gamme de services médicaux 
            et paramédicaux pour répondre à tous vos besoins de santé dans un seul lieu.
          </p>
        </div>

        {/* Services Grid - Design moderne */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#67e8cc] transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-xl bg-[#67e8cc] flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#479983] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Note pour les photos */}
        <div className="mt-16 bg-[#479983] rounded-2xl p-8 text-center">
          <p className="text-white text-lg font-medium">
            <em>Des photos illustrant nos services et nos installations seront ajoutées prochainement.</em>
          </p>
        </div>
      </div>
    </div>
  );
}
