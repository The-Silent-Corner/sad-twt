const db = require("../");
const { DataTypes } = require("sequelize");
const Student = require("./Student");
const Parent = require("./Parent");

//const Student = sequelize.define('Student', {student_id: DataTypes.STRING});
//const Parent = sequelize.define('Parent', {parent_id: DataTypes.STRING});
const Parent_Student = db.define("Parent_Student", {
  parent_id: {
    type: DataTypes.STRING,
    references:{
      model: Parent,
      key: "parent_id"
    }
  },
  student_id:{
    type: DataTypes.STRING,
    references:{
      model: Student,
      key: "student_id"
    }
  }
});

module.exports = Parent_Student;