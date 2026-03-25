import { RESULT_ITEM_SELECTOR, DISMISS_ATTR, FONT_STACK } from '@/lib/constants';
import { showToast } from '@/components/Toast';

/**
 * Session-scoped set of dismissed connection fingerprints.
 * Survives tab switches within the SPA but resets on full page reload.
 * Fingerprint = "departureTime–arrivalTime" (e.g. "05:27–06:42").
 */
const dismissedConnections = new Set<string>();

/** Build a fingerprint from departure/arrival times inside the `<li>`. */
function getConnectionFingerprint(li: Element): string | null {
  const times = li.querySelectorAll<HTMLTimeElement>(
    '.reiseplan__uebersicht-uhrzeit-sollzeit',
  );
  if (times.length < 2) return null;
  const dep = times[0].dateTime || times[0].textContent?.trim();
  const arr = times[1].dateTime || times[1].textContent?.trim();
  if (!dep || !arr) return null;
  return `${dep}–${arr}`;
}

/** Remove an `<li>` immediately without animation. */
function hideImmediately(li: HTMLElement): void {
  li.style.display = 'none';
}

/** Inline SVG for a trash-bin icon (20×20). */
function trashSvg(): string {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/>
    <path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>`;
}

/**
 * Inject a dismiss button (logo + trash icon) on every search result
 * that doesn't already have one.
 */
export function injectDismissButtons(extensionIconUrl: string): void {
  const items = document.querySelectorAll(RESULT_ITEM_SELECTOR);

  items.forEach((li) => {
    // --- Auto-hide previously dismissed connections (even before marking) ---
    const fp = getConnectionFingerprint(li);
    if (fp && dismissedConnections.has(fp) && !li.hasAttribute('data-dbhelper-dismissing')) {
      hideImmediately(li as HTMLElement);
      return; // no need to inject UI on a hidden item
    }

    if (li.hasAttribute(DISMISS_ATTR)) return;
    li.setAttribute(DISMISS_ATTR, 'true');

    const reiseloesung = li.querySelector('.reiseloesung');
    if (!reiseloesung) return;

    // Collapse the bottom margin on reisedetails-container so our button sits flush
    const details = reiseloesung.querySelector('.reisedetails-container') as HTMLElement | null;
    if (details) details.style.marginBottom = '0';

    // Container
    const container = document.createElement('div');
    Object.assign(container.style, {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '2px 8px',
      backgroundColor: '#f5f5f5',
      border: '1px solid #e0e0e0',
      borderRadius: '0 0 8px 8px',
      borderTop: 'none',
      fontFamily: FONT_STACK,
      width: 'fit-content',
      marginLeft: 'auto',
      marginBottom: '8px',
    });

    // Extension icon
    const icon = document.createElement('img');
    icon.src = extensionIconUrl;
    icon.alt = 'DB Booking Helper';
    Object.assign(icon.style, {
      width: '20px',
      height: '20px',
      borderRadius: '4px',
      flexShrink: '0',
    });

    // Trash button
    const btn = document.createElement('button');
    btn.title = 'Verbindung ausblenden';
    btn.innerHTML = trashSvg();
    Object.assign(btn.style, {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4px',
      backgroundColor: 'transparent',
      color: '#888',
      border: '1px solid transparent',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      lineHeight: '0',
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.color = '#c0392b';
      btn.style.backgroundColor = '#fdecea';
      btn.style.borderColor = '#e0b4b4';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.color = '#888';
      btn.style.backgroundColor = 'transparent';
      btn.style.borderColor = 'transparent';
    });

    btn.addEventListener('click', () => {
      const targetLi = btn.closest(RESULT_ITEM_SELECTOR) as HTMLElement | null;
      if (!targetLi) return;

      const fingerprint = getConnectionFingerprint(targetLi);

      // Mark as animating so the auto-hide doesn't interrupt the fade-out
      targetLi.setAttribute('data-dbhelper-dismissing', 'true');

      // Lock the current height so max-height can animate from a real value
      const currentHeight = targetLi.scrollHeight;
      targetLi.style.maxHeight = `${currentHeight}px`;
      targetLi.style.overflow = 'hidden';

      // Force a layout reflow so the browser registers the starting max-height
      void targetLi.offsetHeight;

      // Animate: fade out + collapse to 0 simultaneously
      targetLi.style.transition =
        'opacity 0.35s ease, max-height 0.4s ease, margin 0.4s ease, padding 0.4s ease';
      targetLi.style.opacity = '0';
      targetLi.style.maxHeight = '0';
      targetLi.style.paddingTop = '0';
      targetLi.style.paddingBottom = '0';
      targetLi.style.marginTop = '0';
      targetLi.style.marginBottom = '0';

      // Remove after the longest transition (400ms)
      setTimeout(() => {
        if (fingerprint) dismissedConnections.add(fingerprint);
        targetLi.remove();
      }, 420);

      showToast('Verbindung ausgeblendet');
    });

    container.appendChild(icon);
    container.appendChild(btn);

    // Append inside .reiseloesung so there's no gap from the card's margin
    reiseloesung.appendChild(container);
  });
}
