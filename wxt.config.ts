import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  runner: {
    startUrls: ['https://www.bahn.de'],
  },
  manifest: {
    name: 'Deutsche Bahn Booking Helper',
    description:
      'Enhances the Deutsche Bahn trip booking experience with filters like max duration.',
    permissions: ['storage'],
    host_permissions: ['https://www.bahn.de/*'],
    web_accessible_resources: [
      {
        resources: ['icon-48.png'],
        matches: ['https://www.bahn.de/*'],
      },
    ],
  },
});
