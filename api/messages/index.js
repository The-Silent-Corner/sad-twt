const router = require("express").Router();
const createMessage = require("../../helpers/Messages/createMessage");
const loginMiddleware = require("../../middleware/checkLoggedIn");

router.post("/", loginMiddleware, async(req, res)=>{
  const { id, senderId, receiverId, message } = req.body;
  if(!id || !senderId || !receiverId || !message) {
    return res.sendStatus(400);
  }
  const mess = await createMessage(id, senderId, receiverId, message);
  if(!mess) {
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
});
module.exports = router;