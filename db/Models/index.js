const db = require("..");
const { DataTypes, Model } = require("sequelize");
// const Student = require("./Student");

const Student = db.define("Student", {
  student_id: {
    primaryKey: true,
    type: DataTypes.STRING
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
  }
});

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
const Tutor = db.define("Tutor", {
  tutor_id:{
    primaryKey: true,
    type: DataTypes.STRING
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

Parent.hasMany(Student);
Student.hasMany(Parent);
Parent.belongsToMany(Student, { through: "ParentStudent" });
Student.belongsToMany(Parent, { through: "ParentStudent" });

module.exports = {
  Student: Student,
  Parent: Parent,
  Tutor: Tutor
};