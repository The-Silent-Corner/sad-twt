const express = require("express");
const { Parent } = require("../db/Models/index.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4 } = require("uuid");

router.post("/", async(req,res)  => {
  const parent_id = v4();
  let{first_name, last_name, email, password} = req.body;
  const parentData = {
    parent_id: parent_id,
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: null
  };
  if(!first_name || !last_name || !email|| password === null)
  {
    return res.sendStatus(400);
  }
  parentData.password = await bcrypt.hash(password, saltRounds);
  try{
    await Parent.create(parentData);
    const findParent = await Parent.findOne({where: {email: email}});
    if(!findParent)
    {
      return res.sendStatus(401);
    }
  }catch(err){
    console.log(err);
    return res.sendStatus(500);
  }
  res.end()
});
module.exports = router;