const express = require("express");
const { Tutor } = require("../../db/Models");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

router.post("/", async(req, res) =>{
  const tutor_id = v4();
  const saltRounds = 10;
  let { first_name, last_name, email, gender, password, bio } = req.body;
  const tutorData = {
    tutor_id: tutor_id,
    first_name: first_name,
    last_name: last_name,
    email: email, 
    gender: gender,
    password: null,
    bio: bio
  };
  if(!first_name || !last_name || !email || !gender || !bio || password === null)
  {
    return res.sendStatus(400);
  }
  tutorData.password = await bcrypt.hash(password, saltRounds);
  try{
    await Tutor.create(tutorData);
    const findTutor = await Tutor.findOne({ where:{ email:email } });
    if(!findTutor)
    {
      return res.sendStatus(401);
    }
  }catch(err)
  {
    console.log(err);
    return res.sendStatus(500);
  }
  res.end();
});
module.exports = router;