/**
 * Catalogue des visuels médicaux du site (spécialités + services).
 * Utilisé par le bandeau d'accueil, l'admin recrutement et la page Nous recrutons.
 */

export type MedicalVisualType = 'emoji' | 'image';

export type MedicalVisual = {
  id: string;
  label: string;
  type: MedicalVisualType;
  value: string;
};

function slugId(label: string): string {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const MARQUEE_ENTRIES: { name: string; icon: string }[] = [
  { name: 'Généraliste', icon: '🏥' },
  { name: 'Cardiologue', icon: '❤️' },
  { name: 'Chirurgien digestif', icon: '⚕️' },
  { name: 'Dentisterie', icon: '🦷' },
  { name: 'Diététique', icon: '🥗' },
  { name: 'Gynécologue (F)', icon: '👩‍⚕️' },
  { name: 'Neurochirurgie', icon: '🧠' },
  { name: 'ORL', icon: '👂' },
  { name: 'Phlébologue', icon: '🩸' },
  { name: 'Psychiatre', icon: '🧘' },
  { name: 'Radiologue', icon: '📷' },
  { name: 'Dentiste', icon: '🦷' },
  { name: 'Dentiste pédiatrique', icon: '👶🦷' },
  { name: 'Diététicienne', icon: '🥗' },
  { name: 'Esthéticienne', icon: '✨' },
  { name: 'Kinésithérapeutes', icon: '💪' },
  { name: 'Logopède', icon: '🗣️' },
  { name: 'Ostéopathes', icon: '🦴' },
  { name: 'Pédicure médicale', icon: '🦶' },
  { name: 'Psychologues', icon: '🧠' },
  { name: 'Infirmier·ère', icon: '💉' },
];

const SERVICE_PHOTOS: { label: string; image: string }[] = [
  { label: 'Dentisterie (photo)', image: '/images/services/dentisterie.png' },
  { label: 'Prise de sang (photo)', image: '/images/services/prise-de-sang.png' },
  { label: 'Épilation laser (photo)', image: '/images/services/epilation-laser.png' },
  { label: 'Électrolyse (photo)', image: '/images/services/electrolyse.png' },
];

const EXTRA_EMOJIS: { label: string; icon: string }[] = [
  { label: 'Médecine générale', icon: '🏥' },
  { label: 'Médecine spécialisée', icon: '👨‍⚕️' },
  { label: 'Paramédicaux', icon: '💆' },
  { label: 'Test PCR', icon: '🧪' },
  { label: 'Dermatologie', icon: '🔬' },
  { label: 'Endocrinologie', icon: '💊' },
];

function buildCatalog(): MedicalVisual[] {
  const seen = new Set<string>();
  const items: MedicalVisual[] = [];

  const add = (visual: MedicalVisual) => {
    if (seen.has(visual.id)) return;
    seen.add(visual.id);
    items.push(visual);
  };

  for (const entry of MARQUEE_ENTRIES) {
    add({
      id: slugId(entry.name),
      label: entry.name,
      type: 'emoji',
      value: entry.icon,
    });
  }

  for (const entry of EXTRA_EMOJIS) {
    add({
      id: slugId(entry.label),
      label: entry.label,
      type: 'emoji',
      value: entry.icon,
    });
  }

  for (const entry of SERVICE_PHOTOS) {
    add({
      id: slugId(entry.label),
      label: entry.label,
      type: 'image',
      value: entry.image,
    });
  }

  return items;
}

export const MEDICAL_VISUALS: MedicalVisual[] = buildCatalog();

/** Liste pour le bandeau d'accueil (sans doublons de noms). */
export const SPECIALITES_MARQUEE = MARQUEE_ENTRIES;

const byId = new Map(MEDICAL_VISUALS.map((v) => [v.id, v]));

export function getMedicalVisualById(id: string): MedicalVisual | undefined {
  return byId.get(id);
}

export function isValidMedicalVisualId(id: string): boolean {
  return byId.has(id);
}

export function isMedicalVisualValue(value: string): MedicalVisual | undefined {
  return MEDICAL_VISUALS.find((v) => v.id === value || v.value === value);
}
