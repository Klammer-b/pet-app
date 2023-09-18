const { Router } = require('express');
const animalRoutes = require('./animals');

const routes = new Router();

routes.use('/animals', animalRoutes);

module.exports = routes;
