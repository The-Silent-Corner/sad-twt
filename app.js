require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { updateStudentInfo, updateParentInfo, updateTutorInfo } = require("./helpers/updateUserInfo");
const jwtVerify = require("./helpers/jwtVerify");
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
app.get("/", async(req, res) => {
  const { user } = req.signedCookies;
  const decoded = await jwtVerify(user);
  if(decoded) {
    const { type } = decoded;
    if(type === "student") {
      return res.render("student/home");
    } else if(type === "parent") {
      return res.render("parent/home");
    } else if(type === "tutor") {
      return res.render("tutor/home");
    }
  }
  res.render("index");
});
app.get("/logout", async(req, res) => {
  res.clearCookie("user");
  res.redirect("/");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.put("/:type", async(req, res, next) => {
  const token = await jwtVerify(req.signedCookies.user);
  if(token === false && (type !== "student" || type !== "parent" || type !== "tutor"))
    return res.sendStatus(500);
  const type = token.type;
  if(req.params.type === "student")
  {
    await updateStudentInfo(token.user, req.body.firstName, req.body.lastName, req.body.bio, req.body.gender);
  }
  else if(req.params.type === "parent")
  {
    await updateParentInfo(token.user, req.body.firstName, req.body.lastName);
  }
  else if(req.params.type === "tutor")
  {
    await updateTutorInfo(token.user, req.body.firstName, req.body.lastName, req.body.bio, req.body.gender);
  }
  else
  {
    return next();
  }
  return res.sendStatus(200);
});

module.exports = app;
