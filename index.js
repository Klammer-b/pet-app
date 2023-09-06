require('./adapters');

// const { Command } = require('commander');
// const path = require('path');
// require('colors');
// const animalsRepository = require('./db/animals');
// const program = new Command();

// program
//   .name('pet-app')
//   .description('CLI for amazing pet shelter')
//   .version('1.0.0');

// // get-animal
// program
//   .command('get-animal')
//   .description('Returns one animal by id or all animals')
//   .option('--id <string>', 'id of an animal we want to get')
//   .action(async ({ id }) => {
//     try {
//       if (id) {
//         const animal = await animalsRepository.findOneById(id);
//         console.log(`Successfully found an animal with id ${id}`.green, animal);
//       } else {
//         const animals = await animalsRepository.find();
//         console.log(`Successfully found animals`.green, animals);
//       }
//     } catch (err) {
//       console.error('Failed to get animals'.red + err.toString().red);
//     }
//   });

// // add-animal
// program
//   .command('add-animal')
//   .description('Adds one animal to pet shelter')
//   .argument('<string>', 'JSON with pet data')
//   .action(async (payload) => {
//     try {
//       const input = JSON.parse(payload);
//       const animal = await animalsRepository.create(input);
//       console.log('Successfully added an animal'.green, animal);
//     } catch (err) {
//       console.error('Failed to add an animal'.red, err.toString().red);
//     }
//   });

// // update-animal
// program
//   .command('update-animal')
//   .argument('<payload>', 'payload in JSON format')
//   .requiredOption('-id, --id <id>, id of the animal')
//   .action(async (payload, { id }) => {
//     try {
//       const animal = await animalsRepository.update(id, JSON.parse(payload));
//       console.log(
//         `Successfully updated an animal with id ${id}!`.green,
//         animal,
//       );
//     } catch (err) {
//       console.error('Failed to update an animal:'.red, err.toString().red);
//     }
//   });

// program.parse(process.argv);
