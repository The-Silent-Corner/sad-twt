const db = require("../");
const { DataTypes } = require("sequelize");

const Tutor = db.define('Tutor', {
  tutor_id:{
    primaryKey: true,
    type: DataTypes.STRING,
  },
  first_name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false
  },
  gender:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  bio:{
    type: DataTypes.STRING,
    allowNull: true
  }
});
module.exports = Tutor;