const passport = require('passport');
const createError = require('../../../utils/createError');
const ERROR_TYPES = require('../../../constants/errors');
require('../auth');

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      const error = createError(ERROR_TYPES.UNAUTHORIZED, {
        message: 'Unauthorized',
      });
      next(error);
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;
