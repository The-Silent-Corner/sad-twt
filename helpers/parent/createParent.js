const { Parent } = require("../../db/Models");
const bcrypt = require("bcrypt");

async function createParent(id, email, password) {
  const findParent = await Parent.findOne({ where:{ email:email } });
  if(findParent)
  {
    return false;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await Parent.create({
    parent_id: id,
    email: email,
    password: hashedPassword
  });
}
module.exports = createParent;