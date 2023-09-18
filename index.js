const setupMongoConnection = require('./src/utils/setupMongoConnection');

(async () => {
  await setupMongoConnection();
  require('./src/adapters');
})();
