const { Sequelize } = require("sequelize");
const path = require("path");

function databaseSettings() {
  let dbPath;
  let dialect;
  let logging;
  if(process.env.NODE_ENV === "test") {
    dialect = "sqlite";
    dbPath = path.resolve("db/database_test.sqlite3");
    logging = false;
  } else if(process.env.NODE_ENV === "production") {
    dialect = "sqlite";
    dbPath = path.resolve("db/database_prod.sqlite3");
    logging = false;
  } else {
    dialect = "sqlite";
    dbPath = path.resolve("db/database_dev.sqlite3");
    logging = console.log;
  }
  return {
    dialect: dialect,
    storage: dbPath,
    logging: logging
  };
}

const db = new Sequelize(databaseSettings());

module.exports = db;