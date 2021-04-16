const express = require("express");
const { Student } = require("../db/Models/index.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

router.post("/", async(req, res) =>{
  const student_id = v4();
  const saltRounds = 10;
  let { first_name, last_name, email, gender, bio, password } = req.body;
  let studentData = {
    student_id: student_id,
    first_name: first_name,
    last_name: last_name,
    email: email,
    gender: gender,
    bio: bio,
    password: null
  };
  studentData.password = await bcrypt.hash(password, saltRounds);
  try{
    await Student.create(studentData);
    const findStudent = await Student.findOne({ where:{ student_id: student_id } });
    if(!findStudent) {
      return res.sendStatus(401);
    }
  }catch(err) {
    console.error(err);
    return res.sendStatus(500);
  }
  res.end();
});
module.exports = router;