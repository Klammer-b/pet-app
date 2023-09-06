const { Router } = require('express');
const animalRepository = require('../../../db/animals');

const routes = new Router();

routes.get('/:animalId', async (req, res, next) => {
  const { animalId } = req.params;
  const animal = await animalRepository.findOneById(animalId);
  res.status(200).json({
    data: animal,
  });
});

routes.put('/:animalId', async (req, res, next) => {
  const { animalId } = req.params;
  const { body } = req;
  const animal = await animalRepository.update(animalId, body);
  res.status(200).json({
    data: animal,
  });
});

routes.get('/', async (req, res, next) => {
  const animals = await animalRepository.find();
  res.status(200).json({
    data: animals,
  });
});

routes.post('/', async (req, res, next) => {
  const animal = await animalRepository.create(req.body);
  res.status(201).json({
    data: animal,
  });
});

module.exports = routes;
