const { Router } = require('express');
const usersService = require('../../../services/users');

const routes = new Router();

routes.post('/register', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await usersService.register(body);

    if (user) {
      return res.json({
        message: 'User created successfully!',
        data: user,
      });
    }
    return res.status(400).json({ message: 'User created failed!' });
  } catch (err) {
    next(err);
  }
});

routes.post('/login', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await usersService.login(body);
    res.json({ data: user, message: 'Successfully logged in a user!' });
  } catch (err) {
    next(err);
  }
});

module.exports = routes;
