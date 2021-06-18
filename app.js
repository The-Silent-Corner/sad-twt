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
app.use(cors());
app.use(cookieParser(process.env.SECRET));

if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => setTimeout(next, process.env.MOCK_DELAY));
}

/**
 * Define your routes below, or pass them around to an Express router.
 */
app.use("/api", require("./api"));
app.get("/api", async(req, res) => {
  res.json({ message: "welcome to our api!" });
});
app.get("/logout", async(req, res) => {
  res.clearCookie("user");
  res.redirect("/");
});

app.post("/api/getAuth", async(req, res) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json({ message: "Invalid request body." });
  }
  let validity;
  try {
    validity = await isValidUser(email, password);
  } catch(err) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  const iat = 86400000; // 1 day in ms
  const { id: userId, type: userType } = validity;
  const token = jwtGen(userId, userType);
  res.cookie("user", token, {
    httpOnly: true,
    maxAge: iat, // expires 1 day
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });
  res.json({ iat: iat });
});

app.post("/logout", async(req, res) => {
  res.clearCookie("user");
  res.end();
});

module.exports = app;
