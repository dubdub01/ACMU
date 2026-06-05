import { getSiteUrl } from './site-url';
import { SITE_NAME, SITE_SHORT_NAME } from './site-seo';

export function getOrganizationJsonLd(): Record<string, unknown> {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: siteUrl,
    image: `${siteUrl}/images/logo-acmu.png`,
    telephone: '+3227265667',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue Victor Allard 147',
      addressLocality: 'Uccle',
      postalCode: '1180',
      addressCountry: 'BE',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/p/Allard-Centre-M%C3%A9dical-Uccle-100078924544744/',
      'https://www.instagram.com/allardcentremedicaluccle/',
    ],
  };
}
