const PRODUCTION_SITE_URL = 'https://acmu.be';

/** URL canonique du site (sans slash final). */
export function getSiteUrl(): string {
  const raw =
    process.env.SITE_URL?.trim() ||
    process.env.NEXTAUTH_URL?.trim() ||
    PRODUCTION_SITE_URL;
  return raw.replace(/\/$/, '');
}

/** Site de production acmu.be (pas le miroir test ni localhost). */
export function isProductionSite(): boolean {
  try {
    const host = new URL(getSiteUrl()).hostname.toLowerCase();
    return host === 'acmu.be';
  } catch {
    return false;
  }
}

/**
 * Indexation moteurs : activée sur acmu.be, désactivée ailleurs (test, local).
 * Forcer avec ALLOW_INDEXING=true|false si besoin.
 */
export function isIndexingEnabled(): boolean {
  const override = process.env.ALLOW_INDEXING?.trim().toLowerCase();
  if (override === 'true') return true;
  if (override === 'false') return false;
  return isProductionSite();
}
