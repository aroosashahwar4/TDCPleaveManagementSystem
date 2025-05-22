//const { Sequelize } = require('sequelize');
import { Sequelize } from 'sequelize';
import betterSqlite3 from 'better-sqlite3'; // ✅ Import the module

// This will create (or connect to) a SQLite DB file named 'database.sqlite'
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // This file will be created if it doesn't exist
  dialectModule: betterSqlite3  // ✅ Use it here
});

module.exports = sequelize;
