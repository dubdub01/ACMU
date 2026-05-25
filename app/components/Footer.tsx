import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#479983] text-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#67e8cc]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Informations de contact */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#67e8cc]">Contact</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[#67e8cc] font-semibold mb-1">Adresse</p>
                <p className="text-white leading-relaxed">
                  Rue Victor Allard 147<br />
                  1180 Uccle<br />
                  Belgique
                </p>
              </div>
              <div>
                <p className="text-[#67e8cc] font-semibold mb-1">Téléphone</p>
                <a href="tel:+3227265667" className="text-white hover:text-[#67e8cc] transition-colors font-bold">
                  02 726 56 67
                </a>
              </div>
              <div>
                <p className="text-[#67e8cc] font-semibold mb-1">Urgences</p>
                <a href="tel:112" className="text-white hover:text-red-300 transition-colors font-bold">
                  112
                </a>
              </div>
            </div>
          </div>

          {/* Navigation rapide */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#67e8cc]">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white hover:text-[#67e8cc] transition-colors inline-block font-medium">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#67e8cc] transition-colors inline-block font-medium">
                  Nos services
                </Link>
              </li>
              <li>
                <Link href="/praticiens" className="text-white hover:text-[#67e8cc] transition-colors inline-block font-medium">
                  Nos praticiens
                </Link>
              </li>
              <li>
                <Link href="/histoire" className="text-white hover:text-[#67e8cc] transition-colors inline-block font-medium">
                  Histoire du centre
                </Link>
              </li>
              <li>
                <Link href="/recrutement" className="text-white hover:text-[#67e8cc] transition-colors inline-block font-medium">
                  Nous recrutons
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-[#67e8cc] transition-colors inline-block font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#67e8cc]">Horaires</h3>
            <p className="text-white leading-relaxed">
              Les horaires d'ouverture seront définis selon les besoins du centre.
            </p>
            <p className="text-white/90 text-sm mt-4">
              <em>Consultez les fiches des praticiens pour leurs horaires spécifiques.</em>
            </p>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-[#67e8cc]/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#67e8cc] text-center md:text-left">
              &copy; {new Date().getFullYear()} Centre médical ACMU. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <span className="text-white/70 text-sm">Centre médical pluridisciplinaire</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
