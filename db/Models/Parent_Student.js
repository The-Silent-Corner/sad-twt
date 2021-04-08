const db = require("../");
const { DataTypes } = require("sequelize");
const { sequelize } = require("./Student");
const Student = require("./Student");
const Parent = require("./Parent");

//const Student = sequelize.define('Student', {student_id: DataTypes.STRING});
//const Parent = sequelize.define('Parent', {parent_id: DataTypes.STRING});
const Parent_Student = sequelize.define('Parent_Student',{
  parent_id: {
    type: DataTypes.STRING,
    references:{
      model: Parent,
      key: 'parent_id'
    }
  },
  student_id:{
    type: DataTypes.STRING,
    references:{
      model: Student,
      key: 'student_id'
    }
  }
});
Parent.belongsToMany(Student, {through: Parent_Student});
Student.belongsToMany(Parent, {through: Parent_Student});
module.exports = Parent_Student;