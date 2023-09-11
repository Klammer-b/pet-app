const { nanoid } = require('nanoid');
const path = require('path');

const readJSONFromFile = require('../utils/readJSONFromFile');
const writeJSONToFile = require('../utils/writeJSONToFile');
const createError = require('../utils/createError');
const ERROR_TYPES = require('../constants/errors');

const DB_PATH = path.join(__dirname, 'db.json');

const create = async (data) => {
  const animal = {
    ...data,
    id: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const db = await readJSONFromFile(DB_PATH);
  db.animals.push(animal);
  await writeJSONToFile(DB_PATH, db);
  return animal;
};

const find = async () => {
  const { animals } = await readJSONFromFile(DB_PATH);

  return animals.filter((animal) => !animal.deletedAt);
};

const findOneById = async (id) => {
  const animals = await find();
  const animal = animals.find((animal) => animal.id === id);

  if (!animal || animal.deletedAt) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: `Animal with id ${id} not found`,
      data: {},
    });
    throw error;
  }

  return animal;
};

const update = async (id, payload) => {
  const content = await readJSONFromFile(DB_PATH);
  const animal = await findOneById(id);

  if (!animal || animal.deletedAt) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: `Animal with id ${id} not found`,
      data: {},
    });
    throw error;
  }

  const updatedAnimal = {
    ...animal,
    ...payload,
    updatedAt: new Date().toISOString(),
  };

  const idx = content.animals.indexOf(
    content.animals.find((animal) => animal.id === id),
  );
  content.animals[idx] = updatedAnimal;
  await writeJSONToFile(DB_PATH, content);

  return updatedAnimal;
};

const deleteSoft = async (id) => {
  return update(id, { deletedAt: new Date().toISOString() });
};

module.exports = {
  create,
  find,
  findOneById,
  update,
  deleteSoft,
};
