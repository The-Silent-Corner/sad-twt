const router = require("express").Router();
const isValidUser = require("../../helpers/isValidUser");
const jwtGen = require("../../helpers/jwtGenerate");

router.post("/", async(req, res) => {
  const { email, password } = req.body;
  if(!email || !password) {
    // TODO flash error
    return res.sendStatus(400);
  }
  const validity = await isValidUser(email, password);
  if(!validity) {
    const { stackTrace, message } = validity;
    if(stackTrace && message) {
      console.error(message);
      console.error(stackTrace);
      return res.sendStatus(500);
    }
    return res.sendStatus(401);
  }
  const { id: userId, type: userType } = validity;
  const token = jwtGen(userId, userType);
  res.cookie("user", token, {
    httpOnly: true,
    maxAge: 3600 * 24 * 1000, // expires 1 day
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });
  res.redirect("/");
});

module.exports = router;