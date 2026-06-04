import ContactInfoList from '../components/ContactInfoList';
import ContactMapLazy from '../components/ContactMapLazy';
import EmergencyNotice from '../components/EmergencyNotice';
import Link from 'next/link';

export const metadata = {
  title: 'Contact - Centre médical ACMU',
  description:
    'Contactez le centre médical ACMU à Uccle. Adresse, téléphone, horaires, prise de sang et plan interactif.',
};

const FACEBOOK_URL =
  'https://www.facebook.com/p/Allard-Centre-M%C3%A9dical-Uccle-100078924544744/';
const INSTAGRAM_URL = 'https://www.instagram.com/allardcentremedicaluccle/';

export default function Contact() {
  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 bg-[#67e8cc] py-14 rounded-2xl">
          <span className="bg-white text-[#479983] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
            Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-6 drop-shadow-lg">
            Nous contacter
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-[#479983] text-white rounded-2xl p-8 md:p-10 shadow-lg">
            <ContactInfoList variant="page" />

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-[#67e8cc] font-semibold mb-3">Suivez-nous sur</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20">
              <EmergencyNotice
                className="text-sm text-white/90"
                linkClassName="font-bold text-white hover:text-[#67e8cc]"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Nous trouver</h2>
            <ContactMapLazy />
          </div>
        </div>

        <p className="text-center mt-10 text-gray-600">
          <Link href="/praticiens" className="text-[#479983] font-semibold hover:underline">
            Voir nos praticiens →
          </Link>
        </p>
      </div>
    </div>
  );
}
