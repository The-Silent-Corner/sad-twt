const { v4 } = require("uuid");
const express = require("express");
const router = express.Router();
const { Courses } = require("../db/Models");
const jwtVerify = require("../helpers/jwtVerify");

router.post("/", async(req, res) =>{

  const token = req.signedCookies.user;
  const decoded = await jwtVerify(token);
  if(decoded === false)
    return res.sendStatus(401);
  let { course_name, initial_session_price, session_hourly_rate } = req.body;
  if(!course_name || !initial_session_price || !session_hourly_rate)
    return res.sendStatus(400);
  try{
    await Courses.create({
      courses_id: v4(),
      course_name: course_name,
      initial_session_price: initial_session_price, 
      session_hourly_rate: session_hourly_rate,
      tutor_id: decoded.user
    });
  }catch(err)
  {
    return res.sendStatus(500);
  }
  res.end();
});
module.exports = router;