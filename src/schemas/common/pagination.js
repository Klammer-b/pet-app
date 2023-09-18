const Joi = require('joi');

const paginationSchema = {
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
};

module.exports = paginationSchema;
