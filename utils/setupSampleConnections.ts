import { type SavedConnection, saveConnection, getConnections } from '@/utils/storage';

const SAMPLE_CONNECTIONS: SavedConnection[] = [
  {
    id: 'be52436638207ffc',
    from: 'Berlin Hbf',
    to: 'Hamburg Hbf',
    url: 'https://www.bahn.de/buchung/fahrplan/suche#sts=true&so=Berlin+Hbf&zo=Hamburg+Hbf&soid=A%3D1%40O%3DBerlin+Hbf%40X%3D13369549%40Y%3D52525589%40U%3D80%40L%3D8011160%40p%3D1774290781%40i%3DU%C3%97008065969%40&zoid=A%3D1%40O%3DHamburg+Hbf%40X%3D10006909%40Y%3D53552733%40U%3D80%40L%3D8002549%40p%3D1773857730%40i%3DU%C3%97008001071%40&sot=ST&zot=ST&soei=8011160&zoei=8002549',
    savedAt: '2026-03-25T04:56:14.879Z',
  },
  {
    id: '79e9100a47bfe600',
    from: 'München Hbf',
    to: 'Frankfurt(Main)Hbf',
    url: 'https://www.bahn.de/buchung/fahrplan/suche#sts=true&so=M%C3%BCnchen+Hbf&zo=Frankfurt%28Main%29Hbf&soid=A%3D1%40O%3DM%C3%BCnchen+Hbf%40X%3D11558339%40Y%3D48140229%40U%3D80%40L%3D8000261%40p%3D1774290781%40i%3DU%C3%97008020347%40&zoid=A%3D1%40O%3DFrankfurt%28Main%29Hbf%40X%3D8662833%40Y%3D50106682%40U%3D80%40L%3D8000105%40p%3D1774290781%40i%3DU%C3%97008011068%40&sot=ST&zot=ST&soei=8000261&zoei=8000105',
    savedAt: '2026-03-25T04:56:30.479Z',
  },
  {
    id: '815cf91b0aaef5a5',
    from: 'Düsseldorf Hbf',
    to: 'Köln Hbf',
    url: 'https://www.bahn.de/buchung/fahrplan/suche#sts=true&so=D%C3%BCsseldorf+Hbf&zo=K%C3%B6ln+Hbf&soid=A%3D1%40O%3DD%C3%BCsseldorf+Hbf%40X%3D6794317%40Y%3D51219960%40U%3D80%40L%3D8000085%40p%3D1774290781%40i%3DU%C3%97008008094%40&zoid=A%3D1%40O%3DK%C3%B6ln+Hbf%40X%3D6958730%40Y%3D50943029%40U%3D80%40L%3D8000207%40p%3D1774290781%40i%3DU%C3%97008015458%40&sot=ST&zot=ST&soei=8000085&zoei=8000207',
    savedAt: '2026-03-25T04:56:43.694Z',
  },
];

/**
 * Seed a few saved connections into storage for development.
 * Only adds them if storage is empty to avoid duplicating on every reload.
 */
export async function setupSampleConnections(): Promise<void> {
  const existing = await getConnections();
  if (existing.length > 0) return;

  for (const conn of SAMPLE_CONNECTIONS) {
    await saveConnection(conn);
  }

  console.log(`[dbhelper] loaded ${SAMPLE_CONNECTIONS.length} sample connections`);
}
