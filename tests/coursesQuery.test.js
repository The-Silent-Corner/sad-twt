const app = require("../app");
const { Student, Courses, Tutor, Parent } = require("../db/Models");
const { createTables, wipeDBTables } = require("../db/databaseHelpers");
const request = require("supertest");
const bcrypt = require("bcrypt");
const searchQuery = require("../helpers/searchQuery");

beforeAll(async() =>{
  await createTables();
  const pw = "1234";
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(pw, 10);
  } catch(err) {
    console.log("Errors while hashing password for student login test:");
    console.err(err);
  }
  await Student.create({
    student_id: "1",
    first_name: "JIMBO",
    last_name: "Will",
    gender: "M",
    email: "txiong@",
    password: hashedPassword
  });
  await Tutor.create({
    tutor_id: "1234",
    first_name: "Jim",
    last_name: "Moua",
    email: "jmoua@",
    gender: "M",
    password: "Skyrim",
    bio: "I love to code"
  });
  await Courses.create({
    courses_id: "3",
    course_name: "pre Algebra 3",
    initial_session_price: "100",
    session_hourly_rate: "12.50",
    tutor_id: "1234"
  });
  await Courses.create({
    courses_id: "2",
    course_name: "Algebra 2",
    initial_session_price: "100",
    session_hourly_rate: "12.50",
    tutor_id: "1234"
  });
  await Courses.create({
    courses_id: "1",
    course_name: "Algebra 1",
    initial_session_price: "100",
    session_hourly_rate: "12.50",
    tutor_id: "1234"
  });
  await Courses.create({
    courses_id: "43",
    course_name: "History",
    initial_session_price: "100",
    session_hourly_rate: "12.50",
    tutor_id: "1234"
  });
});
afterAll(async() =>{
  await wipeDBTables();
});
describe("GET /search", () =>{
  describe("no token", () =>{
    it("should return 401", async() =>{
      const res = await request(app)
        .get("/search");
      expect(res.status).toBe(401);
    });
  });
  describe("token type is parent", () =>{
    let token;
    let res;
    beforeAll(async() =>{
      await Parent.create({
        parent_id: "123",
        first_name: "pfname",
        last_name: "plname",
        email: "pemail.com",
        password: "$2a$10$yx0mdXWcFBOQi/Zkdi.1Bepc0ki5Gef3Y02EG7DTjF5FOJYejLKUi" //password is pw
      });
      res = await request(app)
        .post("/login/parent")
        .send({
          email: "pemail.com",
          password: "pw"
        })
        .set("Accept", "application/json");
      token = res["headers"]["set-cookie"][0];
    });
    test("if token is valid", () =>{
      expect(res.status).toBe(302);
      expect(token).toBeDefined();
    });
    it("should return 401", async() =>{
      res = await request(app)
        .get("/search");
      expect(res.status).toBe(401);
    });
  });
  describe("testing the search login ", () =>{
    it("should return 3", async() =>{
      const list = await searchQuery("Algebra");
      expect(list.length).toBe(3);
    });
    it("should return false", async() =>{
      const wrongList = await searchQuery("nothing");
      expect(wrongList).toEqual([]);
    });
  });
});