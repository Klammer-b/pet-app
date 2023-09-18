const mongoose = require('mongoose');
const {
  MONGO_DB_HOST,
  MONGO_DB_PASSWORD,
  MONGO_DB_USER,
  MONGO_DB_DATABASE,
} = require('../constants/env');

const setupConnection = async () => {
  try {
    const res = await mongoose.connect(
      `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    );
    console.log('Connection with db successfully established!');
  } catch (err) {
    console.error(err);
  }
};

module.exports = setupConnection;
