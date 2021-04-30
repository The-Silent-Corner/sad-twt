const router = require("express").Router();
const updateUsers = require("../helpers/updateUsers");

router.post("/", async(req, res) => {
  const decoded = await jwtVerify(req.signedCookies.user);
  const { firstName, lastName } = req.body;
  if(!firstName || !decoded || !lastName) {
    return false;
  }
  try {
    await UpdateUser(decoded.user, firstName, lastName);
  } catch(err) {
    return res.sendStatus(500);
  }
  res.end();
});

module.exports = router;