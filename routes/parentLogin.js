const express = require("express");
const router = express.Router();
const { Parent } = require("../db/Models/index.js");
const bcrypt = require("bcrypt");
const jwtGenerate = require("../helpers/jwtGenerate");

router.post("/", async(req, res) =>{
  const { email, password } = req.body;
  try{
    const findParent = await Parent.findOne({ where:{ email: email } });
    if(!findParent)
    {
      return res.sendStatus(403);
    }
    bcrypt.compare(password, findParent.password, async(err, result) =>{
      if(result)
      {
        res.cookie("user", jwtGenerate(findParent.parent_id, "parent"), {
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production" ? true : false,
          signed: true,
          maxAge: 1e3 * 3600
        });
        return res.redirect("/");
      }
      else
      {
        return res.sendStatus(401);
      }
    });
  }catch(error)
  {
    console.log(error);
    return res.sendStatus(500);
  }
});
module.exports = router;