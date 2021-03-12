const db = require("../");
const { DataTypes } = require("sequelize");

/**
 * This defines a SQL table.
 *
 * Please read the docs here https://sequelize.org/master/
 */
const ExampleModel = db.define("Users", {
  exampleColumn1: {
    primaryKey: true,
    type: DataTypes.STRING,
    required: true
  },
  exampleColumn2: {
    type: DataTypes.STRING,
    required: true
  },
  exampleColumn3: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = ExampleModel;