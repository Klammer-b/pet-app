const Joi = require('joi');

const createAnimalBodySchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  age: Joi.number().min(1),
  isVaccinated: Joi.bool().required(),
  species: Joi.string().alphanum().min(2).max(30).required(),
  gender: Joi.string()
    .valid(...['male', 'female'])
    .required(),
});

module.exports = createAnimalBodySchema;
