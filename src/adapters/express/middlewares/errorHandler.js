const ERROR_CODES = require('../constants/errorCodes');

const errorHandler = (err, req, res, next) => {
  const status = ERROR_CODES[err.type] || 500;
  res.status(status);
  res.json({
    status,
    message: err.message || 'Oops something went wrong',
    data: err.data || {},
  });
};

module.exports = errorHandler;
