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
    if(!user) {
      return false;
    }
  } catch(err) {
    return {
      message: "Querying Users table failed",
      stackTrace: err
    };
  }
  const res = await bcrypt.compare(password, user.password);
  if(!res) {
    return false;
  }
  return { type: user.type, id: user.id };
}
module.exports = isValidUser;