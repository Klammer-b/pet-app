const fs = require('fs/promises');

const createDirIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path);
    }
  }
};

module.exports = createDirIfNotExists;
