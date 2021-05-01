const router = require("express").Router();
const jwtVerify = require("../helpers/jwtVerify");
const UpdateUser = require("../helpers/updateUsers");

router.post("/", require("../routes/middleware/checkLoggedIn"), async(req, res) => {
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