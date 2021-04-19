const express = require("express");
const router = express.Router();
const {Tutor} = require("../db/Models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async(req,res) =>{
  const {email, password} = req.body;
  try{
    const findTutor = await Tutor.findOne({where:{email:email}});
    if(!findTutor)
    {
      return res.sendStatus(403);
    }
    bcrypt.compare(password, findTutor.password, async(err, result) =>{
      if(result)
      {
        const token = jwt.sign({user:findTutor.tutor_id, type: "tutor"}, process.env.SECRET,{
          expiresIn: "1h"
        });
        res.cookie("user", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production"? true : false,
         signed: true, 
         maxAge: 1e3 * 3600
        });
        return res.redirect("/")
      }
      else
      {
        return res.sendStatus(401);
      }
    });
  }catch(err)
  {
    console.log(err);
    return res.sendStatus(500);
  }
});
module.exports = router