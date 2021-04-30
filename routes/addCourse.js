const express = require("express");
const router = express.Router();
const jwtVerify = require("../../helpers/jwtVerify");
const createCourse = require("../../helpers/createCourse");

router.post("/", async(req, res) =>{
  const decoded = await jwtVerify(req.signedCookies.user);
  if(decoded === false)
    return res.sendStatus(401);
  let { course_name, initial_session_price, session_hourly_rate } = req.body;
  if(!course_name || !initial_session_price || !session_hourly_rate) {
    return res.sendStatus(400);
  }
  await createCourse(decoded.user, course_name, initial_session_price, session_hourly_rate);
  res.end();
});
module.exports = router;