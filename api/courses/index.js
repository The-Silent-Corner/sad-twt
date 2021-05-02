const router = require("express").Router();
const createCourse = require("../../helpers/Courses/createCourse");
const loginMiddleware = require("../../middleware/checkLoggedIn");
const searchQuery = require("../../helpers/Courses/searchQuery");

router.post("/", loginMiddleware, async(req, res) => {
  let { courseName, initialSessionPrice, sessionHourlyRate } = req.body;
  if(!courseName || !initialSessionPrice || !sessionHourlyRate) {
    return res.sendStatus(400);
  }
  await createCourse(req.user.id, courseName, initialSessionPrice, sessionHourlyRate);
  res.end();
});

//search
router.get("/", loginMiddleware, async(req, res) => {
  if(req.user.type === "parent") {
    return res.status(401).json({ message: "type must must student or tutor" });
  }
  const { q } = req.query;
  if(!q || q.length < 3) {
    return res.sendStatus(400);
  }
  const list = await searchQuery(q);
  res.json({
    list: list
  });
});
module.exports = router;
