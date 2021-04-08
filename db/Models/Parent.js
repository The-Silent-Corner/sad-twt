const db = require("../");
const { DataTypes } = require("sequelize");
const Student = require("./Student");


const Parent = db.define("Parent", {
  parent_id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Parent.hasMany(Student);

module.exports = Parent;