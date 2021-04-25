const express = require("express");
const { Student } = require("../../db/Models");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

router.post("/", async(req, res) =>{
  const student_id = v4();
  const saltRounds = 10;
  let { email, password1, password2 } = req.body;
  if(!email || !password1 || !password2) {
    return res.sendStatus(400);
  }
  if((await Student.findOne({ where: { email: email } }))) {
    return res.sendStatus(409);
  }
  const studentData = {
    student_id: student_id,
    email: email,
    password: null
  };
  if(password1 !== password2) {
    return res.sendStatus(400);
  }
  try {
    studentData.password = await bcrypt.hash(password1, saltRounds);
  } catch(err) {
    return res.status(500).json({ message: "bcrypt hash failed" });
  }
  try{
    await Student.create(studentData);
    const findStudent = await Student.findOne({ where:{ email: email } });
    if(!findStudent) {
      return res.sendStatus(401);
    }
  }catch(err) {
    console.error(err);
    return res.sendStatus(500);
  }
  res.render("partials/register_success");
});
module.exports = router;