/** CSS selector for the search-results summary bar on bahn.de. */
export const REISE_BAR_SELECTOR = '.ReiseDatenBar.ReiseDatenZusammenfassung';

/** DOM ID for the "Verbindung merken" container injected below the bar. */
export const MERKEN_CONTAINER_ID = 'dbhelper-container';

/** DOM ID for the saved-connections panel on the homepage. */
export const SAVED_PANEL_ID = 'dbhelper-saved-panel';

/** DOM ID for toast notifications. */
export const TOAST_ID = 'dbhelper-toast';

/** ID of the bahn.de quickfinder widget (injection anchor for saved panel). */
export const QUICKFINDER_ID = 'db-web-quickfinder-app';

/** Shared font stack matching bahn.de's UI. */
export const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

/** CSS selector for individual search result items. */
export const RESULT_ITEM_SELECTOR = 'li.verbindung-list__result-item';

/** Data attribute marking a result item as having a dismiss button. */
export const DISMISS_ATTR = 'data-dbhelper-dismiss';
