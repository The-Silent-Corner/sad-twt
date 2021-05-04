const router = require("express").Router();
const createCourse = require("../../helpers/Courses/createCourse");
const loginMiddleware = require("../../middleware/checkLoggedIn");
const searchQuery = require("../../helpers/Courses/searchQuery");
const { Courses } = require("../../db/Models");

router.post("/", loginMiddleware, async(req, res) => {
  let { id, courseName, initialSessionPrice, sessionHourlyRate } = req.body;
  if(!courseName || !initialSessionPrice || !sessionHourlyRate) {
    return res.sendStatus(400);
  }
  await createCourse(id, req.user.id, courseName, initialSessionPrice, sessionHourlyRate);
  res.end();
});

router.get("/", loginMiddleware, async(req, res) => {
  if(req.user.type === "parent") {
    return res.status(401).json({ message: "type must must student or tutor" });
  }
  const { q } = req.query;
  if(!q)
  {
    const courses = await Courses.findAll();
    return res.json({ courses });
  }
  if(q.length < 3) {
    return res.sendStatus(400);
  }
  const list = await searchQuery(q);
  res.json({
    list: list
  });
  res.end();
});
module.exports = router;
