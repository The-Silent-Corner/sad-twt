const db = require("../");
const { DataTypes } = require("sequelize");
const Parent = require("./Parent");

const Student = db.define("Student", {
  student_id: {
    primaryKey: true,
    type: DataTypes.STRING,
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
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  parent_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

Student.hasMany(Parent);

Student.has

module.exports = Student;