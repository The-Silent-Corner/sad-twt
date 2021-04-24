const jwt = require("jsonwebtoken");

module.exports.validLogin = async(req,res) => {
  if(req.signedCookie.user)
  {
    try{
      await jwt.verify(req.signedCookie.user, process.env.SECRET);
      return true;
    }catch(err){
      res.sendStatus(401);
      return false
    }
  }
  else
  {
    res.sendStatus(401);
    return false;
  }
};