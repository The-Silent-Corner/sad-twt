const router = require("express").Router();
const jwtVerify = require("../../helpers/jwtVerify");
const updateStudentInfo = require("../../helpers/student/updateStudentInfo");

router.put("/", async(req, res) => {
  const decoded = await jwtVerify(req.signedCookies.user);
  if(!decoded) {
    return res.sendStatus(401);
  }
  const { firstName, lastName, bio, gender } = req.body;
  if(!firstName || !lastName || !bio || !gender) {
    return res.sendStatus(400);
  }
  await updateStudentInfo(decoded.user, firstName, lastName, bio, gender);
  res.end();
});

module.exports = router;