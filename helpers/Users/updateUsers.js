const { Users } = require("../../db/Models");

async function UpdateUser(id, firstName, lastName) {
  try {
    const user = await Users.findOne({ where: { id: id } });
    if(!user) {
      return false;
    }
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
  } catch(err) {
    return false;
  }
  return true;
}

module.exports = UpdateUser;