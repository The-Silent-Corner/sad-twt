const request = require("supertest");
const app = require("../app.js");
const { createTables, wipeDBTables } = require("../db/databaseHelpers.js");
const { Student } = require("../db/Models/index.js");
const jwt = require("jsonwebtoken");

beforeAll(async() => {
  await createTables();
  await Student.create({
    id: "1",
    first_name: "JIMBO",
    last_name: "Will",
    gender: "M",
    email: "txiong@",
    password: "1234"
  })
});

afterAll(async() =>{
  await wipeDBTables();
});

describe("POST /login/student", async() =>{
  let res;
  beforeAll(async() => {
    res = await request(app)
      .post("/login/student")
      .send({
        email: "txiong@",
        password: "1234"
      })
      .set("Accept", "application/json");
  })
  it("should have a model in the db", async() => {
    const user = await Student.findAll();
    expect(user.length).toEqual(1);
  })
  it("should allow the student to login", async() =>{
    expect(res.status).toBe(200);
  });
  // test("The user should have a cookie called user", async() =>{
  //   console.log(res)
  //   expect(1+1).toEqual(2);
  // });
});