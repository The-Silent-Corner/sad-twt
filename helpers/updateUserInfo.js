const { Student, Parent, Tutor } = require("../db/Models");
module.exports.updateStudentInfo = async function(userId, firstName, lastName, bio, gender) {
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
};
module.exports.updateParentInfo = async function(userId, firstName, lastName) {
  try
  {
    const findParent = await Parent.findOne({ where:{ parent_id: userId } });
    findParent.first_name = firstName;
    findParent.last_name = lastName;
    await findParent.save();
    return true;
  }catch(err)
  {
    return false;
  }
};
module.exports.updateTutorInfo = async function(userId, firstName, lastName, bio, gender) {
  try
  {
    const findtutor = await Tutor.findOne({ where:{ tutor_id: userId } });
    findtutor.first_name = firstName;
    findtutor.last_name = lastName;
    findtutor.bio = bio;
    findtutor.gender = gender;
    await findtutor.save();
    return true;
  }catch(err)
  {
    return false;
  }
};
