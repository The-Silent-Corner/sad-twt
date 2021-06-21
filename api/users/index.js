const router = require("express").Router();
const createUser = require("../../helpers/Users/createUser");
const { v4 } = require("uuid");
const UpdateUser = require("../../helpers/Users/updateUsers");
const loginMiddleware = require("../../middleware/checkLoggedIn");
const { Users } = require("../../db/Models");
const Models = require("../../db/Models");

router.post("/", async(req, res) =>{
  const { email, password1, password2, firstName, lastName } = req.body;
  if(!email || !password1 || !password2 || !firstName || !lastName) { return res.sendStatus(400).json({ message: "invalid request body" }); }
  if(password1 !== password2) {
    return res.sendStatus(400);
  }
  try {
    await createUser(v4(), email, password1, firstName, lastName);
  } catch(err) {
    console.log(err.message);
    return res.status(err.statusCode).json(err);
  }
  res.end();
});

router.put("/", loginMiddleware, async(req, res) =>{
  const { firstName, lastName } = req.body;
  if(!firstName || !lastName) {
    return res.status(400).json({ message: "invalid request body" });
  }
  try {
    if(!(await UpdateUser(req.user.id, firstName, lastName))) {
      return res.status(500).json({ message: "UpdateUser function failed" });
    }
  } catch(err) {
    return res.sendStatus(500);
  }
  res.end();
});

router.get("/", loginMiddleware, async(req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.user.id
    }
  });
  res.json({
    user: user
  });
});

router.get("/stats", loginMiddleware, async(req, res) => {
  try {
    const { firstName, lastName, email } = await Users.findOne({
      where: { id: req.user.id }
    });
    const tAppointments = await Models.Appointments.findAll(
      {
        where: {
          tutorId: req.user.id
        }
      }
    );
    const sAppointments = await Models.Appointments.findAll(
      {
        where: {
          studentId: req.user.id
        }
      }
    );
    res.json({
      user: {
        id: req.user.id,
        firstName: firstName,
        lastName: lastName,
        email: email
      },
      numAppointments: {
        tutor: tAppointments.length,
        student: sAppointments.length
      }
    });
  } catch(err) {
    return res.status(500).json({
      message: "ORM tool failed"
    });
  }
});

module.exports = router;