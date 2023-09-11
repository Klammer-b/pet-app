const animalRepository = require('../db/animals');

const create = async (data) => {
  const animal = await animalRepository.create(data);

  return animal;
};

const find = async () => {
  const animals = await animalRepository.find();

  return animals;
};

const findOneById = async (id) => {
  const animal = await animalRepository.findOneById(id);

  return animal;
};

const update = async (id, payload) => {
  const animal = await animalRepository.update(id, payload);

  return animal;
};

const deleteSoft = async (id) => {
  const animal = await animalRepository.deleteSoft(id);

  return animal;
};

module.exports = {
  create,
  find,
  findOneById,
  update,
  deleteSoft,
};
