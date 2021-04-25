require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const jwtVerify = require("./helpers/jwtVerify");
const { updateStudentInfo, updateParentInfo, updateTutorInfo } = require("./helpers/updateUserInfo");
/**
 * Middleware Setup
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // TODO: configure me if needs be
app.use(cookieParser(process.env.SECRET));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
/**
 * Define your routes below, or pass them around to an Express router.
 */
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.put("/:type", async(req, res, next) => {
  const token = await jwtVerify(req.signedCookies.user);
  if(req.params.type === "student")
  {
    if(token === false && type !== "student")
    {
      return res.sendStatus(500);
    }
    const type = token.type;
    await updateStudentInfo(token.user, req.body.firstName, req.body.lastName, req.body.bio, req.body.gender);
  }
  else if(req.params.type === "parent")
  {
    if(token === false && type !== "parent")
      return res.sendStatus(500);
    const type = token.type;
    await updateParentInfo(token.user, req.body.firstName, req.body.lastName);
  }
  else if(req.params.type === "tutor")
  {
    if(token === false && type !== "tutor")
      return res.sendStatus(500);
    const type = token.type;
    await updateTutorInfo(token.user, req.body.firstName, req.body.lastName, req.body.bio, req.body.gender);
    
  }
  else
  {
    return next();
  }
  return res.sendStatus(200);
});

module.exports = app;
