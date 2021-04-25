const request = require("supertest");
const app = require("../app.js");
const { createTables, wipeDBTables } = require("../db/databaseHelpers.js");
const { Parent } = require("../db/Models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

let hashedPassword;

beforeAll(async() =>{
  await createTables();
  const pw = "thisismypassword";
  try{
    hashedPassword = await bcrypt.hash(pw, 10);
  }catch(error)
  {
    console.log("Errors while hasing password for parent login test");
    console.error(error);
  }
  await Parent.create({
    parent_id: "123",
    first_name: "john",
    last_name: "Pooh",
    email: "JP@gmail.com",
    password: hashedPassword
  });
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("/POST /login/parent", () =>{
  let res; 
  beforeAll(async() =>{
    res = await request(app)
      .post("/login/parent")
      .send({
        email: "JP@gmail.com",
        password: "thisismypassword"
      })
      .set("Accept", "application/json");
  });
  it("should have a model in the db", async() =>{
    const findParent = await Parent.findAll({ where:{ email:"JP@gmail.com" } });
    expect(findParent).toBeDefined();
    expect(findParent).not.toBeNull();
  });
  it("should allow the parent to login", async() =>{
    expect(res.status).toBe(302);
  });
  it("should have a user cookie", async() => {
    const c1 = res["headers"]["set-cookie"][0];
    const pcookie = cookie.parse(c1);
    const findColon = pcookie.user.indexOf(":");
    const firstP = pcookie.user.indexOf(".", findColon);
    const secondP = pcookie.user.indexOf(".", firstP + 1);
    const thirdP = pcookie.user.indexOf(".", secondP + 1);
    const token = pcookie.user.substring(findColon + 1, thirdP);
    try {  
      const decoded = jwt.verify(token, process.env.SECRET);
      expect(decoded.user).toEqual("123");
    }catch(error)
    {
      console.log(error);
    }
  });
  test("if there is no parent model in db", async() =>{
    const res = await request(app)
      .post("/login/parent")
      .send({
        email: "nothing",
        password: "thisismypassword"
      })
      .set("Accept", "application/json");
    expect(res.status).toBe(401);
  });
  test("if password does not match", async() =>{
    const res = await request(app)
      .post("/login/parent")
      .send({
        email: "JP@gmail.com",
        password: "wrongPassword"
      })
      .set("Accept", "application/json");
    expect(res.status).toBe(401);
  });
});