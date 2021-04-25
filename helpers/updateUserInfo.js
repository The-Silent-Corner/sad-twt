const {Student, Parent, Tutor} = require("../db/Models");
module.exports.updateStudentInfo = async function(userId, firstName, lastName, bio){
  const findStudent = await Student.findOne({where:{student_id: userId}})
  findStudent.first_name = firstName;
  findStudent.last_name = lastName;
  findStudent.bio = bio;
  await findStudent.save();
}
