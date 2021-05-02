const router = require("express").Router();
const searchQuery = require("../../helpers/searchQuery");
const createUser = require("../../helpers/createUser");
const { v4 } = require("uuid");
const UpdateUser = require("../../helpers/updateUsers");
const loginMiddleware = require("../../middleware/checkLoggedIn");

//register
router.post("/", async(req, res) =>{
  const { email, password1, password2, type } = req.body;
  if(!email || !password1 || !password2 || !type) {
    return res.sendStatus(400);
  }
  if(password1 != password2) {
    // flash error message later
    return res.sendStatus(400);
  }
  if(type !== "tutor" && type !== "student" && type !== "parent") {
    return res.sendStatus(400);
  }
  try {
    await createUser(v4(), email, password1, type);
  } catch(err) {
    return res.sendStatus(500);
  }
  res.end();
});

//update
router.put("/", loginMiddleware, async(req, res) =>{
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

//search
router.get("/", loginMiddleware, async(req, res) => {
  if(req.user.type === "parent") {
    return res.status(401).json({ message: "type must must student or tutor" });
  }
  const { q } = req.query;
  if(q && q.length < 3) {
    return res.sendStatus(400);
  }
  const list = await searchQuery(q);
  res.json({
    list: list
  });
});

module.exports = router;