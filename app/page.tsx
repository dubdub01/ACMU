import Link from 'next/link';
import Image from 'next/image';
import SpecialitesMarquee from './components/SpecialitesMarquee';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Design moderne et professionnel */}
      <section className="relative bg-[#67e8cc] py-24 lg:py-32 overflow-hidden">
        {/* Image en arrière-plan */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-[#479983]/30 to-[#67e8cc]/30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu texte */}
            <div className="text-center lg:text-left">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-white text-[#479983] rounded-full text-sm font-semibold">
                  Centre médical pluridisciplinaire
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Votre santé,
                <br />
                <span className="text-white">notre priorité</span>
              </h1>
              <p className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md">
                Centre médical moderne de 500 m² à Uccle, Bruxelles. 
                Une équipe pluridisciplinaire dédiée à votre bien-être.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/praticiens"
                  className="group bg-[#479983] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#479983]/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Prendre rendez-vous
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/services"
                  className="group bg-[#479983] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#479983]/90 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Découvrir nos services
                </Link>
              </div>
            </div>
            
            {/* Image principale */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
              <Image
                src="/images/hero/centre-medical.jpg"
                alt="Centre médical ACMU - Uccle"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#479983]/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction - Design épuré */}
      <section className="py-20 bg-[#479983]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4">
                <span className="bg-white text-[#479983] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider shadow-sm">
                  À propos
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Un centre médical
                <br />
                <span className="text-[#67e8cc]">moderne et accessible</span>
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-white leading-relaxed">
                Le centre médical ACMU a ouvert ses portes <strong className="text-white">en avril 2021</strong>. 
                C'est un centre pluridisciplinaire de 500 m² qui regroupe plusieurs spécialités 
                médicales pour vous offrir des soins de qualité dans un seul et même lieu.
              </p>
              <p className="text-lg text-white leading-relaxed">
                Notre équipe est composée de professionnels qualifiés et dévoués à votre santé, 
                dans un environnement moderne et accueillant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre équipe - Animation spécialités */}
      <section className="py-20 bg-white border-t-4 border-[#479983]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-[#67e8cc] text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider shadow-sm">
                Notre équipe
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Des spécialités variées
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Une équipe pluridisciplinaire pour répondre à tous vos besoins de santé
            </p>
          </div>

          <div className="relative">
            <SpecialitesMarquee />
          </div>
        </div>
      </section>

      {/* CTA Section - Design moderne */}
      <section className="py-20 bg-[#479983] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à prendre rendez-vous ?
          </h2>
          <p className="text-xl mb-10 text-[#67e8cc] max-w-2xl mx-auto">
            Consultez la liste de nos praticiens et réservez votre consultation directement en ligne.
            Notre équipe est là pour vous accompagner.
          </p>
          <Link
            href="/praticiens"
            className="inline-flex items-center bg-white text-[#479983] px-10 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Voir nos praticiens
            <span className="ml-2 text-xl">→</span>
          </Link>
        </div>
      </section>

      {/* Contact Section - Design épuré */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="inline-block mb-4">
                <span className="text-[#479983] text-sm font-semibold uppercase tracking-wider">
                  Contact
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Comment nous joindre
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#67e8cc]/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      Rue Victor Allard 147<br />
                      1180 Uccle, Belgique
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#67e8cc]/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                    <a href="tel:+3227265667" className="text-[#479983] hover:text-[#479983]/80 font-semibold">
                      02 726 56 67
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚨</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Urgences</h3>
                    <a href="tel:112" className="text-red-600 hover:text-red-700 font-semibold">
                      112
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#67e8cc]/10 to-[#479983]/10 rounded-2xl p-8 flex items-center justify-center">
              <Link
                href="/contact"
                className="text-center group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  💬
                </div>
                <p className="text-[#479983] font-semibold group-hover:text-[#479983]/80">
                  Plus d'informations →
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
