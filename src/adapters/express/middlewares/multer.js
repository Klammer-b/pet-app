const path = require('path');
const multer = require('multer');
const { UPLOAD_DIR } = require('../../../constants/common');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString();
    cb(null, timestamp + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
