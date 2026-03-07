import { getConnections } from '@/utils/storage';
import { SAVED_PANEL_ID, QUICKFINDER_ID, FONT_STACK } from '@/lib/constants';
import { buildConnectionCard } from '@/components/ConnectionCard';

/**
 * Inject the "Gemerkte Verbindungen" panel after the quickfinder on the homepage.
 * Returns early if the panel already exists or there are no saved connections.
 */
export async function injectSavedPanel(
  extensionIconUrl: string,
): Promise<void> {
  const quickfinder = document.getElementById(QUICKFINDER_ID);
  if (!quickfinder) return;
  if (document.getElementById(SAVED_PANEL_ID)) return;

  const connections = await getConnections();
  if (connections.length === 0) return;

  // Panel wrapper
  const panel = document.createElement('div');
  panel.id = SAVED_PANEL_ID;
  Object.assign(panel.style, {
    maxWidth: '760px',
    margin: '16px auto 0',
    padding: '16px 20px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #e5e5e5',
    borderRadius: '12px',
    fontFamily: FONT_STACK,
  });

  // Header
  const header = document.createElement('div');
  Object.assign(header.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
  });

  const icon = document.createElement('img');
  icon.src = extensionIconUrl;
  icon.alt = 'DB Booking Helper';
  Object.assign(icon.style, {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
  });

  const title = document.createElement('span');
  Object.assign(title.style, {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  });
  title.textContent = 'Gemerkte Verbindungen';

  header.appendChild(icon);
  header.appendChild(title);

  // List
  const list = document.createElement('div');
  list.dataset.role = 'conn-list';
  Object.assign(list.style, {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  });

  const sorted = [...connections].sort(
    (a, b) =>
      new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime(),
  );

  for (const conn of sorted) {
    list.appendChild(buildConnectionCard(conn));
  }

  panel.appendChild(header);
  panel.appendChild(list);

  if (document.getElementById(SAVED_PANEL_ID)) return;
  quickfinder.insertAdjacentElement('afterend', panel);
}

/**
 * Remove and re-inject the saved panel to reflect storage changes.
 */
export async function refreshSavedPanel(
  extensionIconUrl: string,
): Promise<void> {
  const existing = document.getElementById(SAVED_PANEL_ID);
  if (existing) existing.remove();
  await injectSavedPanel(extensionIconUrl);
}
