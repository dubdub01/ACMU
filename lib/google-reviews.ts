export type GoogleReview = {
  author: string;
  rating: number;
  dateLabel: string;
  text: string;
};

/** Avis Google — Centre médical Allard / ACMU (texte intégré sur le site). */
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author: 'Nicolas Ghy',
    rating: 4,
    dateLabel: 'il y a 3 mois',
    text: "L'endroit est très propre, les employés efficaces et souriants.",
  },
  {
    author: 'Semra',
    rating: 5,
    dateLabel: 'il y a 6 mois',
    text: "Mme Mathilde Burin des Roziers, kinésithérapeute au centre médical Allard à Uccle (ACMU), m'a accompagnée dans ma kiné postnatale (9 sessions). Hyper flexible au niveau des horaires de rendez-vous, super professionnelle, elle a su me mettre immédiatement à l'aise. J'avais eu une expérience négative avec un kiné dans le passé et appréhendais les sessions. Mais tout s'est formidablement bien déroulé et les résultats sont excellents. Je recommande vivement. J'ai également dû faire une prise de sang dans le même centre médical, ainsi que mes filles de 4 et 8 ans. L'infirmière est très chaleureuse et sait s'y prendre avec les enfants. Ma petite est difficile à piquer mais l'infirmière y est arrivée du premier coup. J'espère que ma fille n'aura pas besoin de prise de sang avant longtemps mais si elle devait en avoir une, je retournerais sans hésiter à l'ACMU.",
  },
  {
    author: 'Jean-Philippe BOUCQ',
    rating: 4,
    dateLabel: 'il y a 7 mois',
    text: 'Accueil très agréable et professionnel, la prise de sang tout en douceur.',
  },
  {
    author: 'Julie Mortier',
    rating: 5,
    dateLabel: 'il y a 2 ans',
    text: "Je suis patiente depuis peu au Centre Médical Allard, ce centre est tenu par une gérante qui est très à l'écoute et de bons conseils. Elle sait bien mettre en avant ses praticiens. Personnels très agréables, je vous recommande ce centre.",
  },
  {
    author: 'Ismael Ziani',
    rating: 5,
    dateLabel: 'il y a 2 ans',
    text: "Franchement, il n'y a pas mieux : l'accueil de la directrice est juste magnifique ! Des employés au top, organisation impeccable. Service mieux que beaucoup d'hôpitaux, toujours une oreille à l'écoute et tous avec le sourire ! Je recommande 1000 fois, du kiné (Mme Bragard) au généraliste (M. Reynaert), ils sont vraiment bien qualifiés !",
  },
  {
    author: 'Lima Charlie',
    rating: 5,
    dateLabel: 'il y a 3 ans',
    text: "Excellent centre médical et très pratique. J'ai pu obtenir un rendez-vous chez la généraliste le jour même, ce qui est de plus en plus rare de nos jours, et elle était très à l'écoute. Ils sont également ouverts le samedi matin, ce qui est excellent surtout si on tombe malade un vendredi soir et donc nous ne devons pas nous rendre aux urgences ou pire, attendre le lundi matin… Ils ont aussi d'autres spécialistes, des kinés également que nous pouvons consulter un samedi matin, ce qui est excellent pour les personnes qui travaillent. Je conseille vivement ce centre médical !",
  },
];
