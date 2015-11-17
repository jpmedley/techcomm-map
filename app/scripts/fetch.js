global.toolbox.options.debug = true;

global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
  // Use a dedicated cache for the responses, separate from the default cache.
  cache: {
    name: 'techcomm-events',
    // Store up to 10 entries in that cache.
    maxEntries: 60 * 60 * 24
  }
});