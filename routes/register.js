const router = require("express").Router();
const createUser = require("../helpers/createUser");
const { v4 } = require("uuid");

router.post("/", async(req, res) => {
  const { email, password1, password2, type } = req.body;
  if(!email || !password1 || !password2 || !type) {
    return res.sendStatus(400);
  }
  if(password1 != password2) {
    // flash error message later
    return res.sendStatus(400);
  }
  if(type !== "tutor" && type !== "student" && type !== "parent") {
    return res.sendStatus(400);
  }
  try {
    await createUser(v4(), email, password1, type);
  } catch(err) {
    return res.sendStatus(500);
  }
  res.end();
});

module.exports = router;