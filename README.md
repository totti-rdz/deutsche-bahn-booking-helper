# Deutsche Bahn Booking Helper

A browser extension for Chrome and Firefox that streamlines trip selection on [bahn.de](https://www.bahn.de).

## Features

### Connection Bookmarking

- **Save connections** — click "Verbindung merken" on any search result to bookmark a route
- **Homepage panel** — view all saved connections directly on the bahn.de start page
- **Clean URLs** — personal data (BahnCard, class, date) is automatically stripped from saved links
- **Cross-tab sync** — bookmarks stay in sync across all open bahn.de tabs
- **Popup overview** — manage saved connections from the extension popup

## Tech Stack

- [WXT](https://wxt.dev) + React + TypeScript
- Tailwind CSS 4
- Chrome (Manifest V3) & Firefox

## Development

```bash
# Install dependencies
npm install

# Start dev mode (Chrome)
npm run dev

# Start dev mode (Firefox)
npm run dev:firefox

# Build for both browsers
npm run build
```

## License

MIT
