const router = require("express").Router();
const jwtVerify = require("../helpers/jwtVerify");
const searchQuery = require("../helpers/searchQuery");

router.get("/", async(req, res) => {
  const token = await jwtVerify(req.signedCookies.user);
  const type = token.type;
  if(!token || (type !== "student" || type !== "tutor")) {
    return res.sendStatus(401);
  }
  const { q } = req.query;
  if(q && q.length < 3) {
    return res.sendStatus(400);
  }
  const list = await searchQuery(q);
  if(q) {
    res.render("courseList", { user: token, list: list });
  }
  else {
    res.render("courseSearch", { user: token });
  }
});

module.exports = router;