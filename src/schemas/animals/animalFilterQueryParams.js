const Joi = require('joi');

const animalFilterQueryParams = {
  minAge: Joi.number().min(1),
  isVaccinated: Joi.number().valid(0, 1),
};

module.exports = animalFilterQueryParams;
