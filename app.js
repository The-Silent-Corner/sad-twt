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
app.use("/register/student", require("./routes/studentRegister"));
app.use("/register/tutor", require("./routes/tutorRegister"));
app.use("/register/parent", require("./routes/parentRegister"));
app.use("/login/student", require("./routes/studentLogin"));

/**
 * Define your routes below, or pass them around to an Express router.
 */
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});

module.exports = app;
