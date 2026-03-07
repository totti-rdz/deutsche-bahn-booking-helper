import { type SavedConnection, removeConnection } from '@/utils/storage';
import { starSvg } from '@/utils/dom';
import { SAVED_PANEL_ID } from '@/lib/constants';
import { showToast } from '@/components/Toast';

/**
 * Build a single saved-connection card element.
 */
export function buildConnectionCard(conn: SavedConnection): HTMLElement {
  const card = document.createElement('a');
  card.href = conn.url;
  card.dataset.connId = conn.id;
  Object.assign(card.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'box-shadow 0.15s, border-color 0.15s',
    cursor: 'pointer',
  });

  card.addEventListener('mouseenter', () => {
    card.style.borderColor = '#b0b0b0';
    card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = '#e0e0e0';
    card.style.boxShadow = 'none';
  });

  // Star icon
  const star = document.createElement('span');
  star.innerHTML = starSvg(true);
  Object.assign(star.style, { flexShrink: '0', lineHeight: '0' });

  // Route info
  const info = document.createElement('div');
  info.style.flex = '1';
  info.style.minWidth = '0';

  const route = document.createElement('div');
  Object.assign(route.style, {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
  route.textContent = `${conn.from} → ${conn.to}`;
  info.appendChild(route);

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = '✕';
  removeBtn.title = 'Entfernen';
  Object.assign(removeBtn.style, {
    flexShrink: '0',
    width: '26px',
    height: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    color: '#999',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.15s',
  });

  removeBtn.addEventListener('mouseenter', () => {
    removeBtn.style.backgroundColor = '#fde8e8';
    removeBtn.style.color = '#c0392b';
  });
  removeBtn.addEventListener('mouseleave', () => {
    removeBtn.style.backgroundColor = 'transparent';
    removeBtn.style.color = '#999';
  });

  removeBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await removeConnection(conn.id);
    card.style.transition = 'opacity 0.2s, transform 0.2s';
    card.style.opacity = '0';
    card.style.transform = 'translateX(10px)';
    setTimeout(() => {
      card.remove();
      // Hide panel if no cards left
      const panel = document.getElementById(SAVED_PANEL_ID);
      const list = panel?.querySelector('[data-role="conn-list"]');
      if (list && list.children.length === 0) {
        panel?.remove();
      }
    }, 200);
    showToast('Verbindung entfernt');
  });

  card.appendChild(star);
  card.appendChild(info);
  card.appendChild(removeBtn);

  return card;
}
