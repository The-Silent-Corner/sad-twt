const request = require("supertest");
const app = require("../app.js");
const { createTables, wipeDBTables } = require("../db/databaseHelpers.js");
const { Student } = require("../db/Models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cookie = require("cookie");

let hashedPassword;

beforeAll(async() => {
  await createTables();
  const pw = "1234";
  try {
    hashedPassword = await bcrypt.hash(pw, 10);
  } catch(err) {
    console.log("Errors while hashing password for student login test:");
    console.err(err);
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
    console.log(pcookie.user);
  });
});