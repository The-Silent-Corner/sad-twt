const router = require("express").Router();
const createMessage = require("../../helpers/Messages/createMessage");
const loginMiddleware = require("../../middleware/checkLoggedIn");
const searchQueryMessage = require("../../helpers/Messages/searchQueryMessage");

router.get("/", loginMiddleware, async(req, res)=>{
  const { q } = req.query;
  if(!q) {
    return res.sendStatus(400);
  }
  const message = await searchQueryMessage(q);
  if(message.length === 0) {
    return res.sendStatus(500);
  }
  return res.status(200).json({ message });
});
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