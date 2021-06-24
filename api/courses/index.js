const router = require("express").Router();
const createCourse = require("../../helpers/Courses/createCourse");
const loginMiddleware = require("../../middleware/checkLoggedIn");
const searchQuery = require("../../helpers/Courses/searchQuery");
const { Courses } = require("../../db/Models");
const updateCourse = require("../../helpers/Courses/updateCourse");
const deleteCourse = require("../../helpers/Courses/deleteCourse");

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
  if(list.length === 0) {
    return res.sendStatus(500);
  }
  res.json({
    list: list
  });
  res.end();
});

router.put("/", loginMiddleware, async(req, res) =>{
  const { id } = req.body;
  if(!id) {
    return res.sendStatus(400);
  }
  const course = await updateCourse(req.body);
  if(!course) {
    return res.sendStatus(500);
  }
  return res.status(200).json({ course: course });
});
router.delete("/", loginMiddleware, async(req, res)=>{
  const { courseId } = req.body;
  if(!courseId) {
    return res.sendStatus(400);
  }
  try {
    await deleteCourse(courseId);
    return res.sendStatus(204);
  } catch(err) {
    res.status(err.statusCode).json({ message: err.message });
  }
});
module.exports = router;
