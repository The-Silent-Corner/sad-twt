const express = require("express");
const { Student } = require("../../db/Models");
const router = express.Router();
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

async function registerStudent(email, password) {
  const student_id = v4();
  const saltRounds = 10;
  const studentData = {
    student_id: student_id,
    email: email,
    password: null
  };
  try {
    studentData.password = await bcrypt.hash(password, saltRounds);
  } catch(err) {
    return {
      status: 500,
      message: "bcrypt hash failed"
    };
  }
  try{
    await Student.create(studentData);
    const findStudent = await Student.findOne({ where:{ email: email } });
    if(!findStudent) {
      return { status: 400 };
    }
  }catch(err) {
    console.error(err);
    return { status: 500 };
  }
}

router.post("/", async(req, res) =>{
  let { email, password1, password2 } = req.body;
  if(!email || !password1 || !password2) {
    return res.sendStatus(400);
  }
  if((await Student.findOne({ where: { email: email } }))) {
    return res.sendStatus(409);
  }
  if(password1 !== password2) {
    return res.sendStatus(400);
  }
  registerStudent(email, password1)
    .then(() => {
      res.render("partials/register_success");
    })
    .catch(err => {
      return res.status(err.status).json({ message: err.message });
    });
});
module.exports = router;
module.exports.registerStudent = registerStudent;