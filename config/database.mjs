//const { Sequelize } = require('sequelize');
import { Sequelize } from 'sequelize';


// This will create (or connect to) a SQLite DB file named 'database.sqlite'
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // This file will be created if it doesn't exist
 
});

module.exports = sequelize;
