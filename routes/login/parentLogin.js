const express = require("express");
const router = express.Router();
const { Parent } = require("../../db/Models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const comparePassword = require("../../helpers/comparePassword");

router.post("/", async(req, res) =>{
  const { email, password } = req.body;
  const type = "parent";
  if(!email || !password) {
    return res.sendStatus(400);
  }

  // try{
  //   const findParent = await Parent.findOne({ where:{ email: email } });
  //   if(!findParent)
  //   {
  //     return res.sendStatus(401);
  //   }
  //   bcrypt.compare(password, findParent.password, async(err, result) =>{
  //     if(result)
  //     {
  //       const token = jwt.sign({ user: findParent.parent_id, type: "parent" }, process.env.SECRET, {
  //         expiresIn: "1h"
  //       });
  //       res.cookie("user", token, {
  //         httpOnly: true, 
  //         secure: process.env.NODE_ENV === "production" ? true : false,
  //         signed: true,
  //         maxAge: 1e3 * 3600
  //       });
  //       return res.redirect("/");
  //     }
  //     else
  //     {
  //       return res.sendStatus(401);
  //     }
  //   });
  // }catch(error)
  // {
  //   console.log(error);
  //   return res.sendStatus(500);
  // }
});
module.exports = router;