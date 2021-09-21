require('dotenv').config();
const environment = process.env;

const Sequelize = require('sequelize');

const sequelize = environment.JAWSDB_URL
  ? new Sequelize(environment.JAWSDB_URL)
  : new Sequelize(environment.DB_NAME, environment.DB_USER, environment.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
