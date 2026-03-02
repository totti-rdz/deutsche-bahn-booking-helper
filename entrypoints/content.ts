export default defineContentScript({
  matches: ['https://www.bahn.de/*'],
  main() {
    console.log('🚂 Deutsche Bahn Booking Helper is active on this page.');
  },
});
