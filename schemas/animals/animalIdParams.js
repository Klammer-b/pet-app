const Joi = require('joi');

const animalIdParamsSchema = Joi.object({
  animalId: Joi.string().length(21),
});

module.exports = animalIdParamsSchema;
