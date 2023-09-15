const Joi = require('joi');

const animalIdParamsSchema = Joi.object({
  animalId: Joi.string().length(24),
});

module.exports = animalIdParamsSchema;
