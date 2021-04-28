const router = require("express").Router();
const jwtVerify = require("../../helpers/jwtVerify");
const updateTutorInfo = require("../../helpers/tutor/updateTutorInfo");

router.put("/", async(req, res) => {
  const decoded = jwtVerify(req.signedCookies.user);
  if(!decoded) {
    return res.sendStatus(401);
  }
  const { firstName, lastName, bio, gender } = req.body;
  if(!firstName || !lastName || !bio || !gender) {
    return res.sendStatus(400);
  }
  await updateTutorInfo(decoded.user, firstName, lastName, bio, gender);
});

module.exports = router;