const router = require("express").Router();
const loginMiddleware = require("../../middleware/checkLoggedIn");
const updateAppointment = require("../../helpers/Appointments/updateAppointment");
const searchQueryApp = require("../../helpers/Appointments/searchQueryApp");
const createAppointment = require("../../helpers/Appointments/createAppointment");

router.post("/", loginMiddleware, async(req, res) =>{
  const { id, location, courseId, studentId } = req.body;
  if(!id || !location || !courseId || !studentId) {
    return res.sendStatus(400);
  }
  const { id: user, type } = req.user;
  if(type !== "tutor") {
    return res.sendStatus(401);
  }
  const app = await createAppointment(id, location, courseId, studentId, user);
  if(!app) {
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
});

router.put("/", loginMiddleware, async(req, res) =>{
  const { id, status } = req.body;
  if(!id || !status) {
    return res.sendStatus(400);
  }
  try {
    await updateAppointment(id, status);
    res.sendStatus(204);
  } catch(err) {
    res.status(err.statusCode).json({ message: err.message });
  }
});

router.get("/", loginMiddleware, async(req, res) =>{
  const { q } = req.query;
  if(!q) {
    return res.sendStatus(400);
  }
  try {
    const app = await searchQueryApp(q);

    // If an empty array is returned => no courses matching the string
    if(app.length === 0) {
      return res.sendStatus(404);
    }
    return res.status(200).json(app);
  } catch(err) {
    return res.status(err.statusCode).json({ message: err.message });
  }
});
module.exports = router;