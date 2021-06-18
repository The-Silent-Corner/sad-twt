const router = require("express").Router();
const createUser = require("../../helpers/Users/createUser");
const { v4 } = require("uuid");
const UpdateUser = require("../../helpers/Users/updateUsers");
const loginMiddleware = require("../../middleware/checkLoggedIn");

router.post("/", async(req, res) =>{
  const { email, password1, password2, firstName, lastName } = req.body;
  if(!email || !password1 || !password2 || !firstName || !lastName) { return res.sendStatus(400).json({ message: "invalid request body" }); }
  if(password1 !== password2) {
    return res.sendStatus(400);
  }
  try {
    await createUser(v4(), email, password1, firstName, lastName);
  } catch(err) {
    console.log(err.message);
    return res.status(err.statusCode).json(err);
  }
  res.end();
});

router.put("/", loginMiddleware, async(req, res) =>{
  const { firstName, lastName } = req.body;
  if(!firstName || !lastName) {
    return res.status(400).json({ message: "invalid request body" });
  }
  try {
    if(!(await UpdateUser(req.user.id, firstName, lastName))) {
      return res.status(500).json({ message: "UpdateUser function failed" });
    }
  } catch(err) {
    return res.sendStatus(500);
  }
  res.end();
});

module.exports = router;