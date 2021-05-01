const router = require("express").Router();
const jwtVerify = require("../helpers/jwtVerify");
const searchQuery = require("../helpers/searchQuery");

router.get("/", require("../routes/middleware/checkLoggedIn"), async(req, res) => {
  if(req.user === "parent") {
    return res.status(401).json({ message: "type must must student or tutor" });
  }
  const { q } = req.query;
  if(q && q.length < 3) {
    return res.sendStatus(400);
  }
  const list = await searchQuery(q);
  res.json({
    list: q
  });
});

module.exports = router;