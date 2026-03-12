export const metadata = {
  title: 'Histoire du centre - Centre médical ACMU',
  description: 'Découvrez l\'histoire et les valeurs du centre médical ACMU.',
};

export default function Histoire() {
  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header moderne */}
        <div className="text-center mb-20 bg-[#67e8cc] py-16 rounded-2xl">
          <div className="inline-block mb-4">
            <span className="bg-white text-[#479983] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Notre histoire
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            L'histoire du
            <br />
            <span className="text-white">centre ACMU</span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Découvrez l'histoire et les valeurs qui guident notre centre médical.
          </p>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-2xl shadow-lg p-12 border-2 border-[#67e8cc] mb-12">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <div className="w-32 h-32 bg-[#67e8cc] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-6xl">🏥</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Une vision moderne de la santé
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Le contenu de cette page sera rédigé avec la directrice du centre.
              </p>
              <p className="text-lg">
                Cette section présentera l'histoire du centre médical ACMU, ses valeurs, 
                ses dates clés et sa mission de soins de qualité pour tous.
              </p>
              <p className="text-lg">
                Vous découvrirez comment le centre a été créé, les valeurs qui nous animent, 
                et notre engagement envers l'excellence des soins dans un environnement moderne et accueillant.
              </p>
            </div>
          </div>
        </div>

        {/* Placeholder pour images */}
        <div className="bg-[#479983] rounded-2xl p-12 text-center">
          <div className="inline-block mb-4">
            <span className="text-5xl">📸</span>
          </div>
          <p className="text-white text-lg font-medium">
            <em>Des images illustrant l'histoire du centre seront ajoutées ici.</em>
          </p>
        </div>
      </div>
    </div>
  );
}
