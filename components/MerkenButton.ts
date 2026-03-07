import {
  type SavedConnection,
  saveConnection,
  removeConnection,
  isConnectionSaved,
  onConnectionChanged,
} from '@/utils/storage';
import { getConnectionId } from '@/utils/hash';
import { parseRouteFromPage, starSvg } from '@/utils/dom';
import { buildMinimalUrl } from '@/utils/url';
import { MERKEN_CONTAINER_ID, REISE_BAR_SELECTOR } from '@/lib/constants';
import { showToast } from '@/components/Toast';
import { refreshSavedPanel } from '@/components/SavedPanel';

function updateButtonState(btn: HTMLButtonElement, saved: boolean): void {
  btn.innerHTML = saved
    ? `${starSvg(true)} Verbindung gespeichert`
    : `${starSvg(false)} Verbindung merken`;
}

let injecting = false;

/**
 * Inject the "Verbindung merken" button below the search-results summary bar.
 */
export async function injectMerkenButton(
  extensionIconUrl: string,
): Promise<void> {
  if (injecting) return;

  const bar = document.querySelector(REISE_BAR_SELECTOR);
  if (!bar) return;
  if (document.getElementById(MERKEN_CONTAINER_ID)) return;

  injecting = true;

  try {
    const route = parseRouteFromPage();
    if (!route.from || !route.to) return;

    const connId = getConnectionId(route.from, route.to);
    const saved = await isConnectionSaved(connId);

    // Container
    const container = document.createElement('div');
    container.id = MERKEN_CONTAINER_ID;
    Object.assign(container.style, {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 14px',
      marginTop: '4px',
      backgroundColor: '#f5f5f5',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      fontFamily: 'inherit',
      width: 'fit-content',
    });

    // Extension icon
    const icon = document.createElement('img');
    icon.src = extensionIconUrl;
    icon.alt = 'DB Booking Helper';
    Object.assign(icon.style, {
      width: '28px',
      height: '28px',
      borderRadius: '6px',
      flexShrink: '0',
    });

    // Button
    const btn = document.createElement('button') as HTMLButtonElement;
    btn.id = 'dbhelper-merken-btn';
    updateButtonState(btn, saved);
    Object.assign(btn.style, {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 14px',
      backgroundColor: 'transparent',
      color: '#4a4a4a',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      fontFamily: 'inherit',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      lineHeight: '1',
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.backgroundColor = '#e8e8e8';
      btn.style.borderColor = '#aaa';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.backgroundColor = 'transparent';
      btn.style.borderColor = '#ccc';
    });

    btn.addEventListener('click', async () => {
      const currentRoute = parseRouteFromPage();
      const currentId = getConnectionId(
        currentRoute.from,
        currentRoute.to,
      );
      const isSaved = await isConnectionSaved(currentId);

      if (isSaved) {
        await removeConnection(currentId);
        updateButtonState(btn, false);
        showToast('Verbindung entfernt');
      } else {
        const conn: SavedConnection = {
          id: currentId,
          from: currentRoute.from,
          to: currentRoute.to,
          url: buildMinimalUrl(),
          savedAt: new Date().toISOString(),
        };
        await saveConnection(conn);
        updateButtonState(btn, true);
        showToast('Verbindung gespeichert ✓');
      }
    });

    container.appendChild(icon);
    container.appendChild(btn);

    if (document.getElementById(MERKEN_CONTAINER_ID)) return;
    bar.insertAdjacentElement('afterend', container);

    // Sync button state across tabs
    onConnectionChanged(async (changedId, changedSaved) => {
      const currentRoute = parseRouteFromPage();
      const currentId = getConnectionId(
        currentRoute.from,
        currentRoute.to,
      );
      if (changedId === currentId) {
        updateButtonState(btn, changedSaved);
      }
      refreshSavedPanel(extensionIconUrl);
    });
  } finally {
    injecting = false;
  }
}
