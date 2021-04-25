const express = require("express");
const router = express.Router();
const { Student } = require("../db/Models/index.js");
const bcrypt = require("bcrypt");
const jwtGenerate = require("../helpers/jwtGenerate");

router.post("/", async(req, res) =>{
  const { email, password } = req.body;
  try{
    const findStudent = await Student.findOne({ where:{ email: email } });
    if(!findStudent) {
      return res.sendStatus(403);
    }
    bcrypt.compare(password, findStudent.password, async(err, result) => {
      if(result)
      {
        res.cookie("user", jwtGenerate(findStudent.student_id, "student"), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true : false,
          signed: true,
          maxAge: 1e3 * 3600 //expires in one hour
        });
        return res.redirect("/");
      }
      else
      {
        return res.sendStatus(401);
      }
    });
  }catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});
module.exports = router;