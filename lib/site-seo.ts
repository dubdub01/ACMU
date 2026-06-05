import type { Metadata } from 'next';
import { getSiteUrl, isIndexingEnabled } from './site-url';

export const SITE_NAME = 'Allard Centre Médical Uccle';
export const SITE_SHORT_NAME = 'Centre médical ACMU';

export const DEFAULT_DESCRIPTION =
  'Centre médical pluridisciplinaire à Uccle, Bruxelles. Médecine générale, spécialisée, dentisterie et paramédical.';

const OG_IMAGE = '/images/logo-acmu.png';

export const NOINDEX_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export function getDefaultRobots(): Metadata['robots'] {
  if (!isIndexingEnabled()) return NOINDEX_ROBOTS;
  return {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  };
}

function openGraphImage(siteUrl: string) {
  return {
    url: `${siteUrl}${OG_IMAGE}`,
    width: 512,
    height: 512,
    alt: SITE_NAME,
  };
}

export function buildPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = path === '/' ? siteUrl : `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'fr_BE',
      type: 'website',
      images: [openGraphImage(siteUrl)],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [`${siteUrl}${OG_IMAGE}`],
    },
  };
}

export function getRootMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const title = `${SITE_SHORT_NAME} - Uccle`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: '%s',
    },
    description: DEFAULT_DESCRIPTION,
    robots: getDefaultRobots(),
    alternates: { canonical: siteUrl },
    openGraph: {
      title,
      description: DEFAULT_DESCRIPTION,
      url: siteUrl,
      siteName: SITE_NAME,
      locale: 'fr_BE',
      type: 'website',
      images: [openGraphImage(siteUrl)],
    },
    twitter: {
      card: 'summary',
      title,
      description: DEFAULT_DESCRIPTION,
      images: [`${siteUrl}${OG_IMAGE}`],
    },
    icons: {
      icon: [{ url: OG_IMAGE, type: 'image/png' }],
      apple: OG_IMAGE,
    },
  };
}
