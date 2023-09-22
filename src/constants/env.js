const dotenv = require('dotenv');

dotenv.config();

const {
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE,
  JWT_SECRET,
} = process.env;

if (!MONGO_DB_USER) {
  throw new Error('Please setup MONGO_DB_USER variable');
}

if (!MONGO_DB_PASSWORD) {
  throw new Error('Please setup MONGO_DB_PASSWORD variable');
}

if (!MONGO_DB_HOST) {
  throw new Error('Please setup MONGO_DB_HOST variable');
}

if (!MONGO_DB_DATABASE) {
  throw new Error('Please setup MONGO_DB_DATABASE variable');
}

if (!JWT_SECRET) {
  throw new Error('Please setup JWT_SECRET variable');
}

module.exports = {
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE,
  JWT_SECRET,
};
