const Joi = require('joi');

const updateAnimalBodySchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30),
  age: Joi.number().min(1).strict(),
  isVaccinated: Joi.bool(),
  species: Joi.string().alphanum().min(2).max(30),
  gender: Joi.string().valid(...['male', 'female']),
});

module.exports = updateAnimalBodySchema;
