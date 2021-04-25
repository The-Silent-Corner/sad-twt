const request = require("supertest");
const app = require("../app.js");
const { createTables, wipeDBTables } = require("../db/databaseHelpers.js");
const { Tutor } = require("../db/Models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

let hashedPassword;

beforeAll(async() => {
  await createTables();
  const pw = "jello";
  try{
    hashedPassword = await bcrypt.hash(pw, 10);
  }catch(err)
  {
    console.log("Erros while hashing password for tutor login test");
    console.log(err);
  }
  await Tutor.create({
    tutor_id: "1234",
    first_name: "Jim",
    last_name: "Moua",
    email: "jmoua@",
    gender: "M",
    password: hashedPassword,
    bio: "I love to code"
  });
});
afterAll(async() => {
  await wipeDBTables();
});
describe("POST /login/tutor", () =>{
  let res; 
  beforeAll(async() => {
    res = await request(app)
      .post("/login/tutor")
      .send({
        email: "jmoua@",
        password: "jello"
      })
      .set("Accept", "application/json");
  });
  it("should have a model in the db", async() => {
    const findTutor = Tutor.findOne({ where:{ email:"jmous@" } });
    expect(findTutor).toBeDefined();
    expect(findTutor).not.toBeNull();
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
      expect(decoded.user).toEqual("1234");
    }catch(error)
    {
      console.error(error);
    }
  });
  test("if there is no tutor model in db", async() =>{
    const res = await request(app)
      .post("/login/tutor")
      .send({
        email: "nothing",
        password: "nothing"
      })
      .set("Accept", "application/json");
    expect(res.status).toBe(401);
  });
  test("if password does not match", async() =>{
    const res = await request(app)
      .post("/login/tutor")
      .send({
        email:"jmoua@",
        password: "wrongPassword"
      })
      .set("Accept", "application/json");
    expect(res.status).toBe(401);
  });
});
