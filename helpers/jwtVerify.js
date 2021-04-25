const jwt = require("jsonwebtoken");

async function jwtVerify(token) {
  try
  {
    const decoded = await jwt.verify(token, process.env.SECRET);
    return decoded;
  }catch(err)
  {
    return false;
  }
}
module.exports = jwtVerify;