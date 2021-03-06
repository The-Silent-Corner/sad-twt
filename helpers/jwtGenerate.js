const jwt = require("jsonwebtoken");

function jwtGenerate(id, type) {
  const token = jwt.sign({ user: id, type: type }, process.env.SECRET, {
    expiresIn: "1h"
  });
  return token;
}
module.exports = jwtGenerate;