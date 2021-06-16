const bcrypt = require("bcrypt");
const { Users } = require("../db/Models");

/**
 * @param email
 * @param password
 * @returns {Promise<{stackTrace, message: string}|{id, type}|boolean>}
 */
async function isValidUser(email, password) {
  let user;
  try {
    user = await Users.findOne({ where: { email: email } });
  } catch(err) {
    throw {
      statusCode: 500,
      message: "ORM tool failed while trying to query user."
    };
  }
  const errs = {
    statusCode: 401,
    message: "invalid credentials"
  };
  if(!user) throw errs;
  const res = await bcrypt.compare(password, user.password);
  if(!res) {
    throw errs;
  }
  return { type: user.type, id: user.id };
}
module.exports = isValidUser;