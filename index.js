const { Command } = require('commander');
const { nanoid } = require('nanoid');
const path = require('path');
const readJSONFromFile = require('./utils/readJSONFromFile');
const writeJSONToFile = require('./utils/writeJSONToFile');
const animalsRepository = require('./db/animals');
const program = new Command();

const DB_PATH = path.join(__dirname, 'db.json');

program
  .name('pet-app')
  .description('CLI for amazing pet shelter')
  .version('1.0.0');

// get-animal
program
  .command('get-animal')
  .description('Returns one animal by id or all animals')
  .option('--id <string>', 'id of an animal we want to get')
  .action(async ({ id }) => {
    if (id) {
      const animal = await animalsRepository.findOneById(id);
      console.log(`Successfully found an animal with id ${id}`, animal);
    } else {
      const animals = await animalsRepository.find();

      console.log(`Successfully found animals`, animals);
    }
  });

// add-animal
program
  .command('add-animal')
  .description('Adds one animal to pet shelter')
  .argument('<string>', 'JSON with pet data')
  .action(async (str, options) => {
    const input = JSON.parse(str);
    const animal = await animalsRepository.create(input);

    console.log('Successfully added an animal', animal);
  });

// update-animal

program.parse(process.argv);
