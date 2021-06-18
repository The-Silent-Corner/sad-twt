const bcrypt = require("bcrypt");
const { Users } = require("../db/Models");

/**
 * @param email
 * @param password
 * @returns {Promise<{stackTrace, message: string}|{id, type}|boolean>}
 */
async function isValidUser(email, password) {
  // Try to grab the user through email using the ORM tool
  let user;
  try {
    user = await Users.findOne({ where: { email: email } });
  } catch(err) {
    throw {
      statusCode: 500,
      message: "ORM tool failed while trying to query user."
    };
  }

  // If the ORM tools succeeds, but user variable doesn't have a value defined.
  const errs = {
    statusCode: 401,
    message: "invalid credentials"
  };
  if(!user) throw errs;
  const res = await bcrypt.compare(password, user.password);
  if(!res) {
    throw errs;
  }
  return { id: user.id };
}
module.exports = isValidUser;