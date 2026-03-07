/**
 * Parse the origin and destination station names from the bahn.de search results page.
 */
export function parseRouteFromPage(): { from: string; to: string } {
  const startEl = document.querySelector('._name._start');
  const endEl = document.querySelector('._name._end');
  return {
    from: startEl?.textContent?.trim() ?? '',
    to: endEl?.textContent?.trim() ?? '',
  };
}

/**
 * Return an inline SVG string for a star icon.
 */
export function starSvg(filled: boolean): string {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="${filled ? '#f5c518' : 'none'}" stroke="${filled ? '#d4a017' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>`;
}
