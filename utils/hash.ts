/**
 * Hash a string into a short, stable hex ID.
 * Uses a fast FNV-1a–style hash — no crypto needed, works in all contexts
 * including Firefox content-script sandboxes.
 */
export function hashId(raw: string): string {
  let h = 0x811c9dc5; // FNV offset basis (32-bit)
  for (let i = 0; i < raw.length; i++) {
    h ^= raw.charCodeAt(i);
    h = Math.imul(h, 0x01000193); // FNV prime
  }
  // produce 16 hex chars by hashing twice with different seeds
  let h2 = 0x41c6ce57;
  for (let i = 0; i < raw.length; i++) {
    h2 ^= raw.charCodeAt(i);
    h2 = Math.imul(h2, 0x01000193);
  }
  return (((h >>> 0).toString(16)).padStart(8, '0')
    + ((h2 >>> 0).toString(16)).padStart(8, '0'));
}

/**
 * Build a stable connection ID from a route's origin and destination.
 */
export function getConnectionId(from: string, to: string): string {
  return hashId(`${from}_${to}`);
}
