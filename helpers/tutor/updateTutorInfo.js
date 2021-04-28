const { Tutor } = require("../../db/Models");

async function updateTutorInfo(userId, firstName, lastName, bio, gender) {
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
}
module.exports = updateTutorInfo;