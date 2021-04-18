const express = require("express");
const router = express.Router();
const { Student } = require("../db/Models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async(req, res) =>{
  const { username, password } = req.body;
  try{
    const findStudent = await Student.findAll({ where:{ email:username } });
    if(findStudent.length !== 1)
    {
      return res.sendStatus(401);
    }
    bcrypt.compare(password, findStudent[0].password, async(err, result) => {
      if(result == true)
      {
        const token = jwt.sign({ user:findStudent[0].student_id }, process.env.SECRET, {
          expiresIn: "1h"
        });
        res.cookie("user", token, {
          httpOnly: true,
          signed: true,
          maxAge: 1e3 * 3600 //expires in one hour
        });
        res.status(200);
        return res.redirect("/");
      }
      if(result == false)
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