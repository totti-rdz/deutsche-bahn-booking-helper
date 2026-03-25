import { injectMerkenButton } from '@/components/MerkenButton';
import { injectSavedPanel } from '@/components/SavedPanel';
import { injectDismissButtons } from '@/components/DismissButton';

export default defineContentScript({
  matches: ['https://www.bahn.de/*'],
  main() {
    console.log('🚂 Deutsche Bahn Booking Helper is active on this page.');

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

    // Also try immediately in case elements are already present
    injectMerkenButton(extensionIconUrl);
    injectSavedPanel(extensionIconUrl);
    injectDismissButtons(extensionIconUrl);
  },
});
