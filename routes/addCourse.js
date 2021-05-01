const express = require("express");
const router = express.Router();
const createCourse = require("../helpers/createCourse");

router.post("/", require("../routes/middleware/checkLoggedIn"), async(req, res) =>{
  let { courseName, initialSessionPrice, sessionHourlyRate } = req.body;
  if(!courseName || !initialSessionPrice || !sessionHourlyRate) {
    return res.sendStatus(400);
  }
  await createCourse(req.user.id, courseName, initialSessionPrice, sessionHourlyRate);
  res.end();
});
module.exports = router;