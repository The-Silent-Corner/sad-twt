const bcrypt = require("bcrypt");
const { Student, Tutor, Parent } = require("../db/Models");

async function comparePassword(email, password, type, res) {
  let pw;
  let userId;
  let user;
  switch(type) {
    case "tutor":
      user = await Tutor.findOne({ where: { email: email } });
      break;
    case "parent":
      user = await Parent.findOne({ where: { email: email } });
      break;
    case "student":
      user = await Student.findOne({ where: { email: email } });
      break;
  }
  pw = user.password;
  userId = user.userId;
  if(!pw) {
    return false;
  }
  try {
    await bcrypt.compare(password, pw);
  } catch(err) {
    return false;
  }
  const token = jwt.sign({ user: userId, type: "student" }, process.env.SECRET, {
    expiresIn: "1h"
  });
  res.cookie("user", token);
  return true;

  if(type === "student")
  {
    const findStudent = await Student.findOne({ where:{ email:email } });
    bcrypt.compare(password, findStudent.password, async(err, result) =>{
      if(result)
      {
        const token = jwt.sign({ user: findStudent.use, type: "student" }, process.env.SECRET, {
          expiresIn: "1h"
        });
        res.cookie("user", token, {
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
  }
  else if(type === "parent")
  {
    const findParent = await Parent.findOne({ where:{ email:email } });
    bcrypt.compare(password, findParent.password, async(err, result) =>{
      if(result)
      {
        const token = jwt.sign({ user: findParent.userId, type: "parent" }, process.env.SECRET, {
          expiresIn: "1h"
        });
        res.cookie("user", token, {
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
  }
  else if(type === "tutor")
  {
    const findTutor = await Tutor.findOne({ where:{ email:email } });
    bcrypt.compare(password, findTutor.password, async(err, result) =>{
      if(result)
      {
        const token = jwt.sign({ user: findTutor.parent_id, type: "tutor" }, process.env.SECRET, {
          expiresIn: "1h"
        });
        res.cookie("user", token, {
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
  }
  
}
module.exports = comparePassword;