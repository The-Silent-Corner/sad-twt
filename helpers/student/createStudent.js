const { Student } = require("../../db/Models");
const bcrypt = require("bcrypt");

async function createStudent(id, email, password) {
  const findStudent = await Student.findOne({ where:{ email: email } });
  if(findStudent) {
    return false;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await Student.create({
    student_id: id,
    email: email,
    password: hashedPassword
  });
}

module.exports = createStudent;