// const Parent_Student = require("../db/Models/Parent_Student");
const Parent = require("../db/Models/Parent");
const Student = require("../db/Models/Student");

(async() => {
  try {
//     const stu = await Student.findOne({
//       where: {
//         student_id: "2"
//       }
//     });
//     console.log(stu)
const sp = await Parent_Student.findAll();
console.log(sp)

//     await Parent.create({
//       parent_id: "1",
//       first_name: "asdf",
//       last_name: "fdsa",
//       email: "asdf",
//       password: "pw"
//     });
//
//     await Student.create({
//       student_id: "2",
//       first_name: "asdf",
//       last_name: "fdsa",
//       email: "asdf",
//       gender: "m",
//       password: "pw",
//       parent_id: "1"
//     })
  } catch(err) {
    console.error("Errors: ", err);
  }
})()