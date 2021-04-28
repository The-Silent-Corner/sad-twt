const express = require("express");
const router = express.Router();
const createParent = require("../../helpers/parent/createParent");
const { v4 } = require("uuid");

router.post("/", async(req, res) => {
  let{ email, password1, password2 } = req.body;
  if(!email || !password1 || !password2)
  {
    return res.sendStatus(400);
  }
  if(password1 !== password2) {
    return res.sendStatus(400);
  }
  await createParent(v4(), email, password1);
  res.render("partials/register_success");
});
module.exports = router;