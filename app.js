require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const isValidUser = require("./helpers/isValidUser");
const jwtGen = require("./helpers/jwtGenerate");

/**
 * Middleware Setup
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin:"http://localhost:3000", credentials: true }));
app.use(cookieParser(process.env.SECRET));
/**
 * Define your routes below, or pass them around to an Express router.
 */
app.use("/api", require("./api"));
app.get("/", async(req, res) => {
  res.json({ message: "welcome to our api!" });
});
app.get("/logout", async(req, res) => {
  res.clearCookie("user");
  res.redirect("/");
});

app.post("/login", async(req, res) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json({ message: "INVALID_BODY" });
  }
  const validity = await isValidUser(email, password);
  if(!validity) {
    const { stackTrace, message } = validity;
    if(stackTrace && message) {
      console.error(message);
      console.error(stackTrace);
      return res.sendStatus(500);
    }
    return res.sendStatus(401);
  }
  const { id: userId, type: userType } = validity;
  const token = jwtGen(userId, userType); 
  res.cookie("user", token, {
    httpOnly: true,
    maxAge: 3600 * 24 * 1000, // expires 1 day
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
  res.end();
});
module.exports = app;
