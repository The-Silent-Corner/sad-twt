const request = require("supertest");
const app = require("../app.js");
const { createTables, wipeDBTables } = require("../db/databaseHelpers.js");
const { Student } = require("../db/Models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

let hashedPassword;

beforeAll(async() => {
  await createTables();
  const pw = "1234";
  try {
    hashedPassword = await bcrypt.hash(pw, 10);
  } catch(err) {
    console.log("Errors while hashing password for student login test:");
  }
  await Student.create({
    student_id: "very_fancy_id",
    first_name: "JIMBO",
    last_name: "Will",
    gender: "M",
    email: "txiong@",
    password: hashedPassword
  });
});

afterAll(async() =>{
  await wipeDBTables();
});

describe("POST /login/student", () =>{
  let res;
  beforeAll(async() => {
    res = await request(app)
      .post("/login/student")
      .send({
        email: "txiong@",
        password: "1234"
      })
      .set("Accept", "application/json");
  });
  it("should have a model in the db", async() => {
    const user = await Student.findOne({ where: { student_id:"very_fancy_id" } });
    expect(user).toBeDefined();
    expect(user).not.toBeNull();
  });
  it("should allow the student to login", async() =>{
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
      expect(decoded.user).toEqual("very_fancy_id");
    }catch(error)
    {
      console.log(error);
    }
  });
  test("if there is no student model in db", async() =>{
    const res = await request(app)
      .post("/login/student")
      .send({
        email: "nothing",
        password: "nothing"
      })
      .set("Accept", "application/json");
    expect(res.status).toBe(401);
  });
  test("if password does not match", async() =>{
    const res = await request(app)
      .post("/login/student")
      .send({
        email: "txiong@",
        password: "wrongPassword"
      })
      .set("Accept", "application/json");
    expect(res.status).toBe(401);
  });
});