const express = require("express");
const { Parent } = require("../../db/Models");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4 } = require("uuid");

router.post("/", async(req, res) => {
  const parent_id = v4();
  let{ email, password1, password2 } = req.body;
  if(!email || !password1 || !password2)
  {
    return res.sendStatus(400);
  }
  if(password1 !== password2) {
    return res.sendStatus(400);
  }
  if((await Parent.findOne({ where: { email: email } }))) {
    return res.sendStatus(409);
  }
  const parentData = {
    parent_id: parent_id,
    email: email,
    password: null
  };
  parentData.password = await bcrypt.hash(password1, saltRounds);
  try{
    await Parent.create(parentData);
  }catch(err) {
    console.log(err);
    return res.status(500).json({ message: "unable to create parent user" });
  }
  res.render("partials/register_success");
});
module.exports = router;