const request = require("supertest");
const app = require("../app.js");
const { createTables, wipeDBTables } = require("../db/databaseHelpers.js");
const { Courses, Tutor } = require("../db/Models/index.js");
const bcrypt = require("bcrypt");

let hashedPassword;
let token;
beforeAll(async() => {
  await createTables();
  const pw = "1234";
  try {
    hashedPassword = await bcrypt.hash(pw, 10);
  } catch(err) {
    console.log("Errors while hashing password for tutor login test:");
    console.error(err);
  }
  await Tutor.create({
    tutor_id: "txiong4",
    first_name: "JIMBO",
    last_name: "Will",
    gender: "M",
    email: "txiong@",
    password: hashedPassword
  });
  const res = await request(app)
    .post("/login/tutor")
    .send({
      email: "txiong@",
      password: "1234"
    })
    .set("Accept", "application/json");
  token = res["headers"]["set-cookie"][0];
});

afterAll(async() =>{
  await wipeDBTables();
});

describe("adding a course", () =>{
  test("adding a course to Courses table", async() =>{
    const res2 = await request(app)
      .post("/addCourse")
      .send({
        course_name: "Algebra",
        initial_session_price: 12.50,
        session_hourly_rate: 30.98
      })
      .set("Accept", "application/json")
      .set("Cookie", [token]);
    const findCourse = await Courses.findOne({ where:{ course_name: "Algebra" } });
    expect(res2.status).toBe(200);
    expect(findCourse.course_name).toBe("Algebra");
    expect(findCourse.initial_session_price).toBe(12.50);
    expect(findCourse.session_hourly_rate).toBe(30.98);
    expect(findCourse.tutor_id).toBe("txiong4");
  });
  test("course name is not valid", async() =>{
    const res2 = await request(app)
      .post("/addCourse")
      .send({
        course_name: null,
        initial_session_price: 12.50,
        session_hourly_rate: 30.98
      })
      .set("Accept", "application/json")
      .set("Cookie", [token]);
    expect(res2.status).toBe(400);
  });
  test("initial session price is not valid", async() =>{
    const res2 = await request(app)
      .post("/addCourse")
      .send({
        course_name: "Algebra",
        initial_session_price: null,
        session_hourly_rate: 30.98
      })
      .set("Accept", "application/json")
      .set("Cookie", [token]);
    expect(res2.status).toBe(400);
  });
  test("session hourly rate is not valid", async() =>{
    const res2 = await request(app)
      .post("/addCourse")
      .send({
        course_name: "Algebra",
        initial_session_price: 12.50,
        session_hourly_rate: null
      })
      .set("Accept", "application/json")
      .set("Cookie", [token]);
    expect(res2.status).toBe(400);
  });
});