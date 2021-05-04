const { Messages } = require("../../db/Models");

async function createMessage(id, senderId, receiverId, message) {
  const msg = await Messages.findOne({ where:{ id:id } });
  if(msg) {
    return false;
  }
  try{
    await Messages.create({
      id: id,
      senderId: senderId,
      receiverId: receiverId,
      timeSent: new Date(),
      message: message
    });
  }catch(err) {
    console.log(err);
    return false;
  }
  return true;
}
module.exports = createMessage;