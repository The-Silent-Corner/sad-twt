const { Users } = require("../../db/Models");
const bcrypt = require("bcrypt");

async function createUser(id, email, password) {
  const user = await Users.findOne({ where:{ email: email } });
  if(user) {
    throw {
      statusCode: 409,
      message: "User already exists."
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await Users.create({
      id: id,
      email: email,
      password: hashedPassword
    });
  } catch(err) {
    throw {
      statusCode: 500,
      message: "ORM tool failed",
      details: err
    };
  }
}

module.exports = createUser;