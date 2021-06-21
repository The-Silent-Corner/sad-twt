const { Messages } = require("../../db/Models");

async function searchQueryMessage(id) {
  try{
    const message = await Messages.findAll({
      where:{
        senderId: id
      }
    });
    return message;
  }catch(err) {
    console.log(err);
    return false;
  }
}
module.exports = searchQueryMessage;