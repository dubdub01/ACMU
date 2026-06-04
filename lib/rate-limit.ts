type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpiredBuckets(now: number): void {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) {
      buckets.delete(key);
    }
  }
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSec: number };

/**
 * Fenêtre glissante simplifiée : max `limit` requêtes par `windowMs` pour une clé donnée.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  let bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  return { allowed: true };
}

/** IP client derrière proxy / cPanel / o2switch */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  return 'unknown';
}

const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOGIN_IP_LIMIT = 10;
const LOGIN_EMAIL_LIMIT = 5;

export function checkLoginRateLimit(
  request: Request,
  email: string,
): RateLimitResult & { scope?: 'ip' | 'email' } {
  const ip = getClientIp(request);
  const normalizedEmail = email.trim().toLowerCase();

  const ipResult = checkRateLimit(
    `login:ip:${ip}`,
    LOGIN_IP_LIMIT,
    LOGIN_WINDOW_MS,
  );
  if (!ipResult.allowed) {
    return { ...ipResult, scope: 'ip' };
  }

  if (normalizedEmail) {
    const emailResult = checkRateLimit(
      `login:email:${normalizedEmail}`,
      LOGIN_EMAIL_LIMIT,
      LOGIN_WINDOW_MS,
    );
    if (!emailResult.allowed) {
      return { ...emailResult, scope: 'email' };
    }
  }

  return { allowed: true };
}
