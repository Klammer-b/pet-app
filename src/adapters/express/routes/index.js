const { Router } = require('express');
const animalRoutes = require('./animals');
const userRoutes = require('./users');

const routes = new Router();

routes.use('/animals', animalRoutes);
routes.use('/users', userRoutes);

module.exports = routes;
