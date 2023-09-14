const setupMongoConnection = require('./utils/setupMongoConnection');

(async () => {
  await setupMongoConnection();
  require('./adapters/cli');
})();
