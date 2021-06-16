const jwt = require("jsonwebtoken");

async function jwtVerify(token) {
  try
  {
    return await jwt.verify(token, process.env.SECRET);
  }catch(err)
  {
    return false;
  }
}
module.exports = jwtVerify;