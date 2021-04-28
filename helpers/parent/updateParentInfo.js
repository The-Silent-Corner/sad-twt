const { Parent } = require("../../db/Models");

async function updateParentInfo(userId, firstName, lastName) {
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
}

module.exports = updateParentInfo;