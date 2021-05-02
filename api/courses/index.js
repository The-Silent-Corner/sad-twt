const router = require("express").Router();
const createCourse = require("../../helpers/createCourse");
const loginMiddleware = require("../../middleware/checkLoggedIn");

router.post("/", loginMiddleware, async(req, res) => {
  let { courseName, initialSessionPrice, sessionHourlyRate } = req.body;
  if(!courseName || !initialSessionPrice || !sessionHourlyRate) {
    return res.sendStatus(400);
  }
  await createCourse(req.user.id, courseName, initialSessionPrice, sessionHourlyRate);
  res.end();
});

module.exports = router;
