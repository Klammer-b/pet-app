const { nanoid } = require('nanoid');
const path = require('path');

const readJSONFromFile = require('../utils/readJSONFromFile');
const writeJSONToFile = require('../utils/writeJSONToFile');

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
  return animals;
};

const findOneById = async (id) => {
  const animals = await find();
  const animal = animals.find((animal) => animal.id === id);
  return animal;
};

module.exports = {
  create,
  find,
  findOneById,
};
