const { Router } = require('express');
const Joi = require('joi');
const animalService = require('../../../services/animals');
const validateBody = require('../middlewares/validateBody');
const validateParams = require('../middlewares/validateParams');
const validateQuery = require('../middlewares/validateQuery');
const createAnimalBodySchema = require('../../../schemas/animals/createAnimal');
const animalIdParamsSchema = require('../../../schemas/animals/animalIdParams');
const updateAnimalBodySchema = require('../../../schemas/animals/updateAnimal');
const paginationSchema = require('../../../schemas/common/pagination');
const animalFilterQueryParams = require('../../../schemas/animals/animalFilterQueryParams');
const createError = require('../../../utils/createError');
const ERROR_TYPES = require('../../../constants/errors');

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

routes.get(
  '/',
  [
    validateQuery(
      Joi.object({ ...paginationSchema, ...animalFilterQueryParams }),
    ),
  ],
  async (req, res, next) => {
    try {
      const { page = 1, limit = 1, ...rest } = req.query;
      const animals = await animalService.find({
        page: +page,
        limit: +limit,
        ...rest,
      });
      res.status(200).json({
        data: animals,
      });
    } catch (err) {
      next(err);
    }
  },
);

const auth = (req, res, next) => {
  const headers = req.headers;

  if (headers.authorization && headers.authorization.includes('Bearer')) {
    next();
  } else {
    const error = createError(ERROR_TYPES.UNAUTHORIZED, {
      message: 'You should provide bearer token',
    });
    next(error);
  }
};

routes.post(
  '/',
  [auth, validateBody(createAnimalBodySchema)],
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
