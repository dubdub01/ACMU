'use client';

const SPECIALITES = [
  { name: 'Généraliste', icon: '🏥' },
  { name: 'Cardiologue', icon: '❤️' },
  { name: 'Chirurgien digestif', icon: '⚕️' },
  { name: 'Dentisterie', icon: '🦷' },
  { name: 'Diététique', icon: '🥗' },
  { name: 'Endocrinologue', icon: '💊' },
  { name: 'Gastro-entérologue', icon: '🔬' },
  { name: 'Gériatrie', icon: '👴' },
  { name: 'Gynécologue (H)', icon: '👩‍⚕️' },
  { name: 'Neurochirurgie', icon: '🧠' },
  { name: 'ORL', icon: '👂' },
  { name: 'Pédiatre', icon: '👶' },
  { name: 'Phlébologue', icon: '🩸' },
  { name: 'Psychiatre', icon: '🧘' },
  { name: 'Radiologue', icon: '📷' },
  { name: 'Dentiste', icon: '🦷' },
  { name: 'Dentiste pédiatrique', icon: '👶🦷' },
  { name: 'Diététicienne', icon: '🥗' },
  { name: 'Drainage lymphatique', icon: '💆' },
  { name: 'Esthéticienne', icon: '✨' },
  { name: 'Kinésithérapeutes', icon: '💪' },
  { name: 'Logopède', icon: '🗣️' },
  { name: 'Massage Thaï', icon: '🙏' },
  { name: 'Ostéopathes', icon: '🦴' },
  { name: 'Pédicure médicale', icon: '🦶' },
  { name: 'Psychologues', icon: '🧠' },
  { name: 'Infirmier·ère', icon: '💉' },
  { name: 'Chirurgienne digestive', icon: '⚕️' },
];

function MarqueeRow({ direction = 'left' }: { direction?: 'left' | 'right' }) {
  const Card = ({ spec, index }: { spec: typeof SPECIALITES[0]; index: number }) => (
    <div className="group shrink-0 relative p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#67e8cc] transform hover:-translate-y-1 w-[200px] h-[200px] flex items-center justify-center overflow-hidden bg-white">
      {/* Icône en arrière-plan */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-15 transition-opacity duration-300">
        <span className="text-9xl">{spec.icon}</span>
      </div>
      {/* Contenu centré */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#479983] transition-colors text-center leading-tight px-2">
          {spec.name}
        </h3>
      </div>
    </div>
  );

  return (
    <div
      className="flex py-6 overflow-hidden select-none"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className={`flex gap-6 shrink-0 ${direction === 'right' ? 'animate-marquee-right' : 'animate-marquee'}`}
      >
        {SPECIALITES.map((spec, i) => (
          <Card key={`a-${i}`} spec={spec} index={i} />
        ))}
        {SPECIALITES.map((spec, i) => (
          <Card key={`b-${i}`} spec={spec} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function SpecialitesMarquee() {
  return (
    <div className="w-full">
      <MarqueeRow direction="left" />
      <MarqueeRow direction="right" />
    </div>
  );
}
