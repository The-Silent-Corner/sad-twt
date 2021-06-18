const jwt = require("jsonwebtoken");

async function jwtVerify(token) {
  try
  {
    return await jwt.verify(token, process.env.SECRET);
  }catch(err)
  {
    throw false;
  }
}
module.exports = jwtVerify;