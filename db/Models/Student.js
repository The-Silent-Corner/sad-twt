// const db = require("../");
// const { DataTypes, Model } = require("sequelize");
// const Parent = require("./Parent");
// const Parent_Student = require("./Parent_Student");

// class Student extends Model {}

// const Student = db.define("Student", {
//   student_id: {
//     primaryKey: true,
//     type: DataTypes.STRING
//   },
//   first_name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   last_name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   gender: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   bio: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   parent_id: {
//     type: DataTypes.STRING,
//     allowNull: true
//   }
// });

// module.exports = Student;