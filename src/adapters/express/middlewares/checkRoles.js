const ERROR_TYPES = require('../../../constants/errors');
const createError = require('../../../utils/createError');

const checkRoles = (roles) => (req, res, next) => {
  const { role: userRole } = req.user;
  if (roles.includes(userRole)) {
    next();
  } else {
    const error = createError(ERROR_TYPES.FORBIDDEN, {
      message: `User should be one of the following roles: ${roles.join(', ')}`,
    });
    next(error);
  }
};

module.exports = checkRoles;
