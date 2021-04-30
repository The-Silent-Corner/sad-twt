const request = require("supertest");
const app = require("../../app");
const { createTables, wipeDBTables } = require("../../db/databaseHelpers.js");
const { Courses } = require("../../db/Models/index.js");
const createTutor = require("../../helpers/createUser");

let token;
beforeAll(async() => {
  await createTables();
  await createTutor(1, "tutor@email.com", "1234");
  const res = await request(app)
    .post("/login/tutor")
    .send({
      email: "tutor@email.com",
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
      .post("/tutor/addCourse")
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
    expect(findCourse.tutor_id).toBe("1");
  });
  test("course name is not valid", async() =>{
    const res2 = await request(app)
      .post("/tutor/addCourse")
      .send({
        initial_session_price: 12.50,
        session_hourly_rate: 30.98
      })
      .set("Accept", "application/json")
      .set("Cookie", [token]);
    expect(res2.status).toBe(400);
  });
  test("initial session price is not valid", async() =>{
    const res2 = await request(app)
      .post("/tutor/addCourse")
      .send({
        course_name: "Algebra",
        session_hourly_rate: 30.98
      })
      .set("Accept", "application/json")
      .set("Cookie", [token]);
    expect(res2.status).toBe(400);
  });
  test("session hourly rate is not valid", async() =>{
    const res2 = await request(app)
      .post("/tutor/addCourse")
      .send({
        course_name: "Algebra",
        initial_session_price: 12.50
      })
      .set("Accept", "application/json")
      .set("Cookie", [token]);
    expect(res2.status).toBe(400);
  });
});