const path = require('path');
const createError = require('../utils/createError');
const ERROR_TYPES = require('../constants/errors');
const AnimalModel = require('./models/animal');

const create = async (data) => {
  const animal = new AnimalModel(data);
  await animal.save();

  return animal;
};

const find = async ({ page, limit, minAge, isVaccinated }) => {
  const skip = (page - 1) * limit;

  const animalsQuery = AnimalModel.find({ deletedAt: null })
    .skip(skip)
    .limit(limit);
  const countQuery = AnimalModel.count().where('deletedAt').equals(null);

  if (minAge) {
    animalsQuery.where('age').gte(+minAge);
    countQuery.where('age').gte(+minAge);
  }

  if (isVaccinated) {
    const isVaccinatedToBoolean = Boolean(+isVaccinated);
    animalsQuery.where('isVaccinated').equals(isVaccinatedToBoolean);
    countQuery.where('isVaccinated').equals(isVaccinatedToBoolean);
  }

  const animals = await animalsQuery.exec();
  const count = await countQuery.exec();

  return { animals, count, page, limit };
};

const findOneById = async (id) => {
  const animal = await AnimalModel.findById(id).where('deletedAt').equals(null);

  if (!animal) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: `Animal with id ${id} not found`,
      data: {},
    });
    throw error;
  }

  return animal;
};

const update = async (id, payload) => {
  const updatedAnimal = await AnimalModel.findByIdAndUpdate(
    id,
    {
      $set: {
        ...payload,
      },
    },
    { returnOriginal: false },
  )
    .where('deletedAt')
    .equals(null);

  if (!updatedAnimal) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: `Animal with id ${id} not found`,
      data: {},
    });
    throw error;
  }

  return updatedAnimal;
};

const deleteSoft = async (id) => {
  const deletedAnimal = await AnimalModel.findByIdAndUpdate(
    id,
    {
      $set: {
        deletedAt: new Date().toISOString(),
      },
    },
    { returnOriginal: false },
  );

  return deletedAnimal;
};

module.exports = {
  create,
  find,
  findOneById,
  update,
  deleteSoft,
};
