import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Deutsche Bahn Booking Helper',
    description:
      'Enhances the Deutsche Bahn trip booking experience with filters like max duration.',
    host_permissions: ['https://www.bahn.de/*'],
  },
});
