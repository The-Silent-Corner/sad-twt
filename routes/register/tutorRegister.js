const express = require("express");
const { Tutor } = require("../../db/Models");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

router.post("/", async(req, res) =>{
  const tutor_id = v4();
  const saltRounds = 10;
  let { email, password1, password2 } = req.body;
  if(!email || !password1 || !password2)
  {
    return res.sendStatus(400);
  }
  if(password1 !== password2) {
    return res.sendStatus(400);
  }
  const tutorData = {
    tutor_id: tutor_id,
    email: email,
    password: null
  };
  tutorData.password = await bcrypt.hash(password1, saltRounds);
  try{
    await Tutor.create(tutorData);
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: "unable to create user" });
  }
  res.end();
});
module.exports = router;