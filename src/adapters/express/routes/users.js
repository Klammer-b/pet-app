const { Router } = require('express');
const upload = require('../middlewares/multer');
const usersService = require('../../../services/users');
const emailsService = require('../../../services/emails');
const checkRoles = require('../middlewares/checkRoles');
const auth = require('../middlewares/auth');
const getFileURL = require('../../../services/files');

const fs = require('fs/promises');
const { UPLOAD_DIR } = require('../../../constants/common');
const { nanoid } = require('nanoid');

const routes = new Router();

routes.post(
  '/register',
  // upload.single('avatar'),
  async (req, res, next) => {
    const { body } = req;

    try {
      const user = await usersService.register(body);

      if (user) {
        res.cookie('jwt', user.token, { secure: true });

        return res.json({
          message: 'User created successfully!',
          data: user,
        });
      }

      return res.status(400).json({ message: 'User created failed!' });
    } catch (err) {
      next(err);
    }
  },
);

routes.post('/login', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await usersService.login(body);

    res.cookie('jwt', user.token, { secure: true });
    return res.json({ data: user, message: 'Successfully logged in a user!' });
  } catch (err) {
    next(err);
  }
});

routes.post('/logout', async (req, res, next) => {
  const { body } = req;
  try {
    res.clearCookie('jwt');
    return res.json({ data: user, message: 'Successfully logged out a user!' });
  } catch (err) {
    next(err);
  }
});

routes.post(
  '/:userId/promote-to-admin',
  [auth, checkRoles(['admin'])],
  async (req, res, next) => {
    const { userId } = req.params;

    try {
      await usersService.promoteToAdmin(userId);
      return res.json({
        message: `Successfully promoted to admin user with id ${userId}`,
      });
    } catch (err) {
      next(err);
    }
  },
);

routes.post('/request-token', async (req, res, next) => {
  const { email } = req.body;
  try {
    await emailsService.sendResetPasswordEmail(email);
    res.json({ message: 'Reset link is sent tp your email!' });
  } catch (err) {
    next(err);
  }
});

module.exports = routes;
