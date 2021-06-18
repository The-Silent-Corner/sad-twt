const jwtVerify = require("../helpers/jwtVerify");
module.exports = async function(req, res, next) {
  const { user } = req.cookies;
  if(!user) {
    return res.sendStatus(401);
  }
  let decoded;
  try {
    decoded = await jwtVerify(user);
    req.user = { id: decoded.user };
    return next();
  } catch(err) {
    return res.status(401).json({ message: "jwt token validation failed" });
  }
};
