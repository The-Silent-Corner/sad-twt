const router = require("express").Router();
const createUser = require("../../helpers/Users/createUser");
const { v4 } = require("uuid");
const UpdateUser = require("../../helpers/Users/updateUsers");
const loginMiddleware = require("../../middleware/checkLoggedIn");

//register
router.post("/", async(req, res) =>{
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

//update
router.put("/", loginMiddleware, async(req, res) =>{
  const { firstName, lastName } = req.body;
  if(!firstName || !lastName) {
    return res.status(400).json({ message: "invalid post body" });
  }
  try {
    if(!(await UpdateUser(req.user.id, firstName, lastName))) {
      res.status(500).json({ message: "UpdateUser function failed" });
    }
  } catch(err) {
    return res.sendStatus(500);
  }
  res.end();
});

module.exports = router;