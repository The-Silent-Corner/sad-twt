const { Users } = require("../../db/Models");
const bcrypt = require("bcrypt");

async function createUser(id, email, password, type) {
  const user = await Users.findOne({ where:{ email: email } });
  if(user) {
    return false;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await Users.create({
      id: id,
      email: email,
      password: hashedPassword,
      type: type
    });
  } catch(err) {
    return false;
  }
}

module.exports = createUser;