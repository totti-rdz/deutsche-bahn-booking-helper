import { injectMerkenButton } from '@/components/MerkenButton';
import { injectSavedPanel } from '@/components/SavedPanel';
import { injectDismissButtons } from '@/components/DismissButton';
import { setupSampleConnections } from '@/utils/setupSampleConnections';
import { MERKEN_CONTAINER_ID } from '@/lib/constants';

export default defineContentScript({
  matches: ['https://www.bahn.de/*'],
  async main() {
    console.log('🚂 Deutsche Bahn Booking Helper is active on this page.');

    if (import.meta.env.DEV) {
      await setupSampleConnections();
    }

    const extensionIconUrl = browser.runtime.getURL('/icon-48.png');

    // The page is an SPA — observe DOM changes to catch when elements appear.
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        injectMerkenButton(extensionIconUrl);
        injectSavedPanel(extensionIconUrl);
        injectDismissButtons(extensionIconUrl);
      }, 150);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // When the route changes via "Ändern", the URL hash updates but the DOM container
    // persists. Remove it so injectMerkenButton re-injects with the correct state.
    window.addEventListener('hashchange', () => {
      document.getElementById(MERKEN_CONTAINER_ID)?.remove();
      injectMerkenButton(extensionIconUrl);
    });

    // Also try immediately in case elements are already present
    injectMerkenButton(extensionIconUrl);
    injectSavedPanel(extensionIconUrl);
    injectDismissButtons(extensionIconUrl);
  },
});
