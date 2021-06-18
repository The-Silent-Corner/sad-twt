const jwt = require("jsonwebtoken");

function jwtGenerate(id) {
  return jwt.sign({ user: id }, process.env.SECRET, { expiresIn: "1h" });
}
module.exports = jwtGenerate;