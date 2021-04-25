const express = require("express");
const router = express.Router();
const { jwtVerify } = require("../helpers/jwtVerify");

router.post("/", async(req,res) =>{
  if(req.signedCookies.user)
  {
    const valid = await jwtVerify(req,res)
    if(!valid)
    {
      res.sendStatus(403)
    }
    else
    {
      if(valid.type === "student")
        res.render("home/student");
      if(valid.type === "parent")
        res.render("home/parent")
      if(valid.type === "tutor")
        res.render("home/tutor");
    }
  }
  else
  {
    res.sendStatus(403)
  }
});