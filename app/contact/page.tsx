export const metadata = {
  title: 'Contact - Centre médical ACMU',
  description: 'Contactez le centre médical ACMU à Uccle, Bruxelles. Adresse, téléphone, horaires d\'ouverture.',
};

export default function Contact() {
  const contactInfo = [
    {
      icon: '📍',
      title: 'Adresse',
      content: 'Rue Victor Allard 147\n1180 Uccle\nBelgique',
      bgColor: 'from-[#67e8cc]/20 to-[#67e8cc]/10',
    },
    {
      icon: '📞',
      title: 'Téléphone',
      content: '02 726 56 67',
      link: 'tel:+3227265667',
      bgColor: 'from-[#479983]/20 to-[#479983]/10',
    },
    {
      icon: '🚨',
      title: 'Urgences',
      content: '112',
      link: 'tel:112',
      bgColor: 'from-red-100 to-red-50',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header moderne */}
        <div className="text-center mb-20 bg-[#67e8cc] py-16 rounded-2xl">
          <div className="inline-block mb-4">
            <span className="bg-white text-[#479983] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Contact
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Comment nous
            <br />
            <span className="text-white">joindre</span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Nous sommes là pour répondre à vos questions et vous accompagner dans vos démarches.
          </p>
        </div>

        {/* Cartes de contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#67e8cc] transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-[#67e8cc] rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">{info.icon}</span>
              </div>
              <h3 className={`text-xl font-bold text-gray-900 mb-3 ${info.textColor || ''}`}>
                {info.title}
              </h3>
              {info.link ? (
                <a
                  href={info.link}
                  className={`block ${info.textColor || 'text-[#479983]'} hover:opacity-80 font-semibold text-lg`}
                >
                  {info.content.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < info.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </a>
              ) : (
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {info.content}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Section horaires */}
        <div className="bg-white rounded-2xl shadow-lg p-10 border-2 border-[#67e8cc]">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <span className="text-[#479983] text-sm font-semibold uppercase tracking-wider">
                Horaires
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Horaires d'ouverture
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 text-center mb-6">
              Les horaires d'ouverture seront définis selon les besoins du centre.
            </p>
            <div className="bg-gradient-to-r from-[#67e8cc]/10 to-[#479983]/10 rounded-xl p-6 border border-[#67e8cc]/30">
              <p className="text-gray-600 text-center text-sm">
                <em>Les horaires peuvent varier selon les praticiens. 
                Veuillez consulter les fiches individuelles des praticiens pour plus de détails.</em>
              </p>
            </div>
          </div>
        </div>

        {/* Note pour carte */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-600">
              <em>Une carte interactive pourra être ajoutée ici pour faciliter l'accès au centre.</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
