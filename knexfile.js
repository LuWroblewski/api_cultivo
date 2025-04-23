const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};

module.exports = config;
