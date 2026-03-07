export interface SavedConnection {
  id: string;
  from: string;
  to: string;
  url: string;
  savedAt: string;
}

export const STORAGE_PREFIX = 'dbhelper_connection_';

function storageKey(id: string): string {
  return `${STORAGE_PREFIX}${id}`;
}

export async function saveConnection(conn: SavedConnection): Promise<void> {
  await browser.storage.local.set({ [storageKey(conn.id)]: conn });
}

export async function getConnections(): Promise<SavedConnection[]> {
  const all = await browser.storage.local.get(null);
  return Object.entries(all)
    .filter(([key]) => key.startsWith(STORAGE_PREFIX))
    .map(([, value]) => value as SavedConnection);
}

export async function removeConnection(id: string): Promise<void> {
  await browser.storage.local.remove(storageKey(id));
}

export async function isConnectionSaved(id: string): Promise<boolean> {
  const result = await browser.storage.local.get(storageKey(id));
  return result[storageKey(id)] != null;
}

/**
 * Listen for changes to connection storage keys.
 * Calls the callback with the changed connection ID and whether it was added or removed.
 */
export function onConnectionChanged(
  callback: (id: string, saved: boolean) => void,
): () => void {
  const listener = (
    changes: Record<string, { oldValue?: unknown; newValue?: unknown }>,
  ) => {
    for (const [key, change] of Object.entries(changes)) {
      if (!key.startsWith(STORAGE_PREFIX)) continue;
      const id = key.slice(STORAGE_PREFIX.length);
      const saved = change.newValue != null;
      callback(id, saved);
    }
  };

  browser.storage.onChanged.addListener(listener);
  return () => browser.storage.onChanged.removeListener(listener);
}
