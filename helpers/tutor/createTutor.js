const { Tutor } = require("../../db/Models");
const bcrypt = require("bcrypt");

async function createTutor(id, email, password) {
  const findTutor = await Tutor.findOne({ where:{ email: email } });
  if(findTutor) {
    return false;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await Tutor.create({
    tutor_id: id,
    email: email,
    password: hashedPassword
  });
}

module.exports = createTutor;