const db = require("..");
const { DataTypes } = require("sequelize");

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
  },
  student_id: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

const ParentStudent = db.define("ParentStudent", {
  student_id: { type: DataTypes.STRING, isPrimary: true },
  parent_id: { type: DataTypes.STRING, isPrimary: true }
});

Parent.belongsToMany(Student, { through: ParentStudent, foreignKey: "student_id", foreignKeyConstraint: true });
Student.belongsToMany(Parent, { through: ParentStudent, foreignKey: "parent_id", foreignKeyConstraint: true });

module.exports = {
  Student: Student,
  Parent: Parent,
  Tutor: Tutor,
  ParentStudent: ParentStudent
};