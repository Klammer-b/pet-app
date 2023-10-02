const { nanoid } = require('nanoid');
const fs = require('fs/promises');

const path = require('path');
const { UPLOAD_DIR } = require('../constants/common');
const SERVER_ADDRESS = 'http://localhost:4000';

const getFileURL = (relUrl) => {
  return SERVER_ADDRESS + '/static/' + relUrl;
};

const saveFile = async (base64String) => {
  const [metadata, base64encoded] = base64String.split(';');
  const mimetype = metadata.split(':')[1];
  const ext = mimetype.split('/')[1];
  const clearedBase64 = base64encoded.replace('base64,', '');

  const fileName = `${nanoid()}.${ext}`;
  const pathToImage = path.join(UPLOAD_DIR, fileName);
  const url = getFileURL(fileName);

  await fs.writeFile(pathToImage, clearedBase64, {
    encoding: 'base64',
  });

  return url;
};

module.exports = { getFileURL, saveFile };
