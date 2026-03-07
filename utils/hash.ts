/**
 * Hash a string into a short, stable hex ID using SHA-256.
 * Returns the first 16 hex chars (64 bits) — plenty to avoid collisions.
 */
export async function hashId(raw: string): Promise<string> {
  const encoded = new TextEncoder().encode(raw);
  const buffer = await crypto.subtle.digest('SHA-256', encoded);
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes.slice(0, 8))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Build a stable connection ID from a route's origin and destination.
 */
export async function getConnectionId(
  from: string,
  to: string,
): Promise<string> {
  return hashId(`${from}_${to}`);
}
