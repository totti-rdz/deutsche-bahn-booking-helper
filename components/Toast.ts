import { TOAST_ID, FONT_STACK } from '@/lib/constants';

/**
 * Show a brief toast notification at the bottom of the page.
 */
export function showToast(message: string): void {
  const existing = document.getElementById(TOAST_ID);
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = TOAST_ID;
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    backgroundColor: '#323232',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: FONT_STACK,
    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
    zIndex: '999999',
    opacity: '0',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    pointerEvents: 'none',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
