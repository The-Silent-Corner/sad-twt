const express = require("express");
const router = express.Router();
const { v4 } = require("uuid");
const createStudent = require("../../helpers/student/createStudent");

router.post("/", async(req, res) =>{
  let { email, password1, password2 } = req.body;
  if(!email || !password1 || !password2) {
    return res.sendStatus(400);
  }
  if(password1 !== password2) {
    return res.sendStatus(400);
  }
  const status = await createStudent(v4(), email, password1);
  if(status === false) {
    return res.sendStatus(409);
  }
  res.render("partials/register_success");
});
module.exports = router;