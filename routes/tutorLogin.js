const express = require("express");
const router = express.Router();
const { Tutor } = require("../db/Models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtGenerate = require("../helpers/jwtGenerate");

router.post("/", async(req, res) =>{
  const { email, password } = req.body;
  try{
    const findTutor = await Tutor.findOne({ where:{ email:email } });
    if(!findTutor)
    {
      return res.sendStatus(401);
    }
    bcrypt.compare(password, findTutor.password, async(err, result) =>{
      if(result)
      {
        res.cookie("user", jwtGenerate(findTutor.tutor_id, "tutor"), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          signed: true, 
          maxAge: 1e3 * 3600
        });
        return res.redirect("/");
      }
      else
      {
        return res.sendStatus(401);
      }
    });
  }catch(err)
  {
    console.log(err);
    return res.sendStatus(500);
  }
});
module.exports = router;
