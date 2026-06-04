import Image from 'next/image';

export const metadata = {
  title: 'Histoire du centre - Centre médical ACMU',
  description:
    'Découvrez l\'histoire du centre médical ACMU à Uccle : un centre pluridisciplinaire moderne, ouvert en avril 2021.',
};

export default function Histoire() {
  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 bg-[#67e8cc] py-16 rounded-2xl">
          <div className="inline-block mb-4">
            <span className="bg-white text-[#479983] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Notre histoire
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            L&apos;histoire du
            <br />
            <span className="text-white">centre ACMU</span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Allard Centre Médical Uccle — un lieu de soins pluridisciplinaires au cœur d&apos;Uccle.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border-2 border-[#67e8cc] mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">
            Une vision moderne de la santé
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <p>
              Le centre médical <strong className="text-[#479983]">ACMU</strong> (Allard Centre
              Médical Uccle) a ouvert ses portes en <strong>avril 2021</strong>. Nous regroupons
              en un seul lieu de nombreuses spécialités médicales et paramédicales pour vous
              offrir des soins de qualité, accessibles et coordonnés.
            </p>
            <p>
              Notre ambition est simple : permettre à chaque patient·e — femmes, hommes, enfants et
              bébés — de bénéficier d&apos;un suivi attentif dans un environnement moderne,
              chaleureux et humain, à Uccle, à deux pas de Forest et Saint-Gilles.
            </p>
            <p>
              Au fil des années, l&apos;équipe s&apos;est enrichie pour répondre aux besoins de
              santé de notre quartier : médecine générale et spécialisée, soins dentaires,
              paramédicaux, prise de sang et services complémentaires, toujours sur rendez-vous.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#67e8cc] mb-12">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[420px] bg-gray-100">
              <Image
                src="/images/histoire/directrice.png"
                alt="Céline Abousleiman, directrice du centre médical ACMU à Uccle"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center bg-[#479983]/5">
              <span className="inline-block w-fit bg-[#67e8cc] text-[#479983] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                Mot de la directrice
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Céline Abousleiman
              </h2>
              <p className="text-[#479983] font-medium mb-4 -mt-2">
                Directrice du centre médical ACMU
              </p>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  C&apos;est avec fierté que je vous accueille au centre médical ACMU. Notre
                  projet est né du souhait de rapprocher les soins, de faciliter le parcours des
                  patient·e·s et de travailler main dans la main avec une équipe pluridisciplinaire
                  engagée·s.
                </p>
                <p>
                  Chaque jour, nous veillons à ce que vous soyez écouté·e, bien informé·e et
                  pris·e en charge dans les meilleures conditions. N&apos;hésitez pas à nous
                  contacter pour toute question ou pour prendre rendez-vous avec l&apos;un·e de
                  nos praticien·ne·s.
                </p>
              </div>
              <p className="mt-6 text-[#479983] font-semibold">
                — Céline Abousleiman
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#479983] rounded-2xl p-10 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Nos valeurs</h2>
          <p className="text-lg max-w-2xl mx-auto text-white/95 leading-relaxed">
            Proximité, excellence des soins, travail d&apos;équipe et accueil bienveillant
            guident chacun·e de nos décisions au service de votre santé.
          </p>
        </div>
      </div>
    </div>
  );
}
