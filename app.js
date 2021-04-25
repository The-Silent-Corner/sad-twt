require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
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
app.put("/:type", (req,res,next) => {
  if(type === "student")
  {

  }
  else if(type === "parent")
  {

  }
  else if(type === "tutor")
  {

  }
  else
  {
    next();
  }
})

module.exports = app;
