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

/**
 * Define your routes below, or pass them around to an Express router.
 */

module.exports = app;
