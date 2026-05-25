import Image from 'next/image';

export const metadata = {
  title: 'Nos services - Centre médical ACMU',
  description:
    'Découvrez tous les services proposés par le centre médical ACMU : médecine générale, spécialisée, dentisterie, paramédicaux, prise de sang, tests PCR, épilation laser, électrolyse.',
};

type ServiceItem = {
  title: string;
  description: string;
  icon: string;
  image?: string;
  imageAlt?: string;
};

const SERVICES_WITH_PHOTOS: ServiceItem[] = [
  {
    title: 'Dentisterie',
    description:
      'Soins dentaires complets : consultations, soins préventifs, traitements et suivi dentaire pour toute la famille.',
    icon: '🦷',
    image: '/images/services/dentisterie.png',
    imageAlt: 'Cabinet dentaire au centre médical ACMU à Uccle',
  },
  {
    title: 'Prise de sang',
    description:
      "Analyses médicales et prélèvements sanguins dans un environnement professionnel et rassurant.",
    icon: '🩸',
    image: '/images/services/prise-de-sang.png',
    imageAlt: 'Prise de sang au centre médical ACMU',
  },
  {
    title: 'Épilation laser',
    description:
      "Épilation laser Dépil Beauté : traitements modernes et efficaces pour une épilation durable.",
    icon: '✨',
    image: '/images/services/epilation-laser.png',
    imageAlt: 'Épilation laser au centre médical ACMU',
  },
  {
    title: 'Électrolyse',
    description:
      "Électrolyse et soins esthétiques Pipiù Beauté, réalisés par des professionnel·le·s expérimenté·e·s.",
    icon: '⚡',
    image: '/images/services/electrolyse.png',
    imageAlt: "Appareil d'électrolyse au centre médical ACMU",
  },
];

const OTHER_SERVICES: ServiceItem[] = [
  {
    title: 'Médecine générale',
    description:
      'Consultations médicales générales et suivi de santé pour toute la famille.',
    icon: '🏥',
  },
  {
    title: 'Médecine spécialisée',
    description:
      'Consultations avec nos médecins spécialistes dans différentes disciplines.',
    icon: '👨‍⚕️',
  },
  {
    title: 'Paramédicaux',
    description:
      'Kinésithérapie, soins infirmiers et autres thérapies pour votre bien-être.',
    icon: '💆',
  },
  {
    title: 'Test PCR',
    description:
      'Tests PCR pour le dépistage COVID-19 et autres analyses virologiques.',
    icon: '🧪',
  },
];

function ServicePhotoCard({ service }: { service: ServiceItem }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-xl hover:border-[#67e8cc] transition-all duration-300">
      <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
        <Image
          src={service.image!}
          alt={service.imageAlt ?? service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#67e8cc]/30 text-xl">
            {service.icon}
          </span>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#479983] transition-colors">
            {service.title}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm flex-1">
          {service.description}
        </p>
      </div>
    </article>
  );
}

function ServiceIconCard({ service }: { service: ServiceItem }) {
  return (
    <article className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#67e8cc]">
      <div className="w-16 h-16 rounded-xl bg-[#67e8cc] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <span className="text-3xl">{service.icon}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#479983] transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{service.description}</p>
    </article>
  );
}

export default function Services() {
  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 bg-[#67e8cc] py-16 rounded-2xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES_WITH_PHOTOS.map((service) => (
            <ServicePhotoCard key={service.title} service={service} />
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Autres services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OTHER_SERVICES.map((service) => (
              <ServiceIconCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
