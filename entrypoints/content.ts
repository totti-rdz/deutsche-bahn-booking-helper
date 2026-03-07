import { injectMerkenButton } from '@/components/MerkenButton';
import { injectSavedPanel } from '@/components/SavedPanel';

export default defineContentScript({
  matches: ['https://www.bahn.de/*'],
  main() {
    console.log('🚂 Deutsche Bahn Booking Helper is active on this page.');

    const extensionIconUrl = browser.runtime.getURL('/icon-48.png');

    // The page is an SPA — observe DOM changes to catch when elements appear
    const observer = new MutationObserver(() => {
      injectMerkenButton(extensionIconUrl);
      injectSavedPanel(extensionIconUrl);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Also try immediately in case elements are already present
    injectMerkenButton(extensionIconUrl);
    injectSavedPanel(extensionIconUrl);
  },
});
