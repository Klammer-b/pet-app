const setupMongoConnection = require('./src/utils/setupMongoConnection');
const createDirIfNotExists = require('./src/utils/createDirIfNotExists');
const { UPLOAD_DIR } = require('./src/constants/common');

(async () => {
  await setupMongoConnection();
  await createDirIfNotExists(UPLOAD_DIR);
  require('./src/adapters/cli');
})();
