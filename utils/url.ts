/** Params that define a route — kept when building a minimal URL. */
const ROUTE_PARAMS = [
  'sts',
  'so',
  'zo',
  'soid',
  'zoid',
  'sot',
  'zot',
  'soei',
  'zoei',
];

/**
 * Build a minimal bahn.de search URL from the current page,
 * keeping only station-related hash params and stripping
 * personal/temporal ones (date, BahnCard, class, filters).
 */
export function buildMinimalUrl(): string {
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);
  const minimal = new URLSearchParams();

  for (const key of ROUTE_PARAMS) {
    const val = params.get(key);
    if (val != null) minimal.set(key, val);
  }

  return `${window.location.origin}${window.location.pathname}#${minimal.toString()}`;
}
