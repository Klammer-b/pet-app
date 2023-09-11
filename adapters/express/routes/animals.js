const { Router } = require('express');
const animalService = require('../../../services/animals');
const validateBody = require('../middlewares/validateBody');
const validateParams = require('../middlewares/validateParams');
const createAnimalBodySchema = require('../../../schemas/animals/createAnimal');
const animalIdParamsSchema = require('../../../schemas/animals/animalIdParams');
const updateAnimalBodySchema = require('../../../schemas/animals/updateAnimal');

const routes = new Router();

routes.get(
  '/:animalId',
  [validateParams(animalIdParamsSchema)],
  async (req, res, next) => {
    const { animalId } = req.params;
    try {
      const animal = await animalService.findOneById(animalId);
      res.status(200).json({
        data: animal,
      });
    } catch (err) {
      next(err);
    }
  },
);

routes.put(
  '/:animalId',
  [validateParams(animalIdParamsSchema), validateBody(updateAnimalBodySchema)],
  async (req, res, next) => {
    const { animalId } = req.params;
    const { body } = req;
    try {
      const animal = await animalService.update(animalId, body);
      res.status(200).json({
        data: animal,
      });
    } catch (err) {
      next(err);
    }
  },
);

routes.delete(
  '/:animalId',
  [validateParams(animalIdParamsSchema)],
  async (req, res, next) => {
    const { animalId } = req.params;

    try {
      const animal = await animalService.deleteSoft(animalId);
      res.status(200).json({
        data: animal,
      });
    } catch (err) {
      next(err);
    }
  },
);

routes.get('/', async (req, res, next) => {
  try {
    const animals = await animalService.find();
    res.status(200).json({
      data: animals,
    });
  } catch (err) {
    next(err);
  }
});

routes.post(
  '/',
  [validateBody(createAnimalBodySchema)],
  async (req, res, next) => {
    try {
      const animal = await animalService.create(req.body);
      res.status(201).json({
        data: animal,
      });
    } catch (err) {
      next(err);
    }
  },
);

module.exports = routes;
