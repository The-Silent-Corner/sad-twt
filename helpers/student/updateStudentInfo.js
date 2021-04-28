const { Student } = require("../../db/Models");

async function updateStudentInfo(userId, firstName, lastName, bio, gender) {
  try
  {
    const findStudent = await Student.findOne({ where:{ student_id: userId } });
    findStudent.first_name = firstName;
    findStudent.last_name = lastName;
    findStudent.bio = bio;
    findStudent.gender = gender;
    await findStudent.save();
    return true;
  }catch(err)
  {
    return false;
  }
}
module.exports = updateStudentInfo;