const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const MAX_KEYS = 10_000;

const requests = new Map<string, { count: number; expiresAt: number }>();

// This is a per-process safeguard; distributed deployments need a shared limiter.
export function checkContactRateLimit(key: string, now = Date.now()) {
  const existing = requests.get(key);
  if (existing && existing.expiresAt > now) {
    if (existing.count >= MAX_REQUESTS) {
      return { allowed: false, retryAfter: Math.ceil((existing.expiresAt - now) / 1000) };
    }
    existing.count += 1;
    return { allowed: true, retryAfter: 0 };
  }

  if (requests.size >= MAX_KEYS) {
    for (const [entryKey, entry] of requests) {
      if (entry.expiresAt <= now) requests.delete(entryKey);
    }
    if (requests.size >= MAX_KEYS) return { allowed: false, retryAfter: 60 };
  }
  requests.set(key, { count: 1, expiresAt: now + WINDOW_MS });
  return { allowed: true, retryAfter: 0 };
}
