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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

/**
 * Define your routes below, or pass them around to an Express router.
 */
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});

module.exports = app;
