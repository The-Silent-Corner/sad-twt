const router = require("express").Router();
const loginMiddleware = require("../../middleware/checkLoggedIn");
const updateAppointment = require("../../helpers/Appointments/updateAppointment");
const searchQueryApp = require("../../helpers/Appointments/searchQueryApp");

router.put("/", loginMiddleware, async(req, res) =>{
  const { id, status } = req.body;
  if(!id || !status) {
    return res.sendStatus(400);
  }
  const app = await updateAppointment(id, status);
  if(!app) {
    return res.sendStatus(500);
  }
  return res.status(200).json({ app });
});
router.get("/", loginMiddleware, async(req, res) =>{
  const { id } = req.body;
  if(!id) {
    return res.sendStatus(400);
  }
  const app = await searchQueryApp(id);
  if(app.length === 0) {
    return res.sendStatus(500);
  }
  return res.status(200).json(app);
});
module.exports = router;