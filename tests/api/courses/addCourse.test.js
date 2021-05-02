const request = require("supertest");
const app = require("../../../app");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers.js");
const { Courses } = require("../../../db/Models");
const jwtGen = require("../../../helpers/jwtGenerate");
const createUser = require("../../../helpers/createUser");

let authCookie;
beforeAll(async() => {
  await createTables();
  await createUser("1", "tutor@email.com", "1234", "tutor");
  const token = await jwtGen("1", "tutor");
  authCookie = `user=${token}`;
});

afterAll(async() =>{
  await wipeDBTables();
});

describe("POST /api/courses", () =>{
  test("adding a course to Courses table", async() =>{
    const res2 = await request(app)
      .post("/api/courses")
      .send({
        courseName: "Algebra",
        initialSessionPrice: 12.50,
        sessionHourlyRate: 30.98
      })
      .set("Accept", "application/json")
      .set("Cookie", [authCookie]);
    const findCourse = await Courses.findOne({ where:{ courseName: "Algebra" } });
    expect(res2.status).toBe(200);
    expect(findCourse.courseName).toBe("Algebra");
    expect(findCourse.initialSessionPrice).toBe(12.50);
    expect(findCourse.sessionHourlyRate).toBe(30.98);
    expect(findCourse.tutorId).toBe("1");
  });
  test("course name not in POST body", async() =>{
    const res2 = await request(app)
      .post("/api/courses")
      .send({
        initialSessionPrice: 12.50,
        sessionHourlyRate: 30.98
      })
      .set("Accept", "application/json")
      .set("Cookie", [authCookie]);
    expect(res2.status).toBe(400);
  });
  test("initial session price is not valid", async() =>{
    const res2 = await request(app)
      .post("/api/courses")
      .send({
        courseName: "Algebra",
        sessionHourlyRate: 30.98
      })
      .set("Accept", "application/json")
      .set("Cookie", [authCookie]);
    expect(res2.status).toBe(400);
  });
  test("session hourly rate is not valid", async() =>{
    const res = await request(app)
      .post("/api/courses")
      .send({
        courseName: "Algebra",
        initialSessionPrice: 12.50
      })
      .set("Accept", "application/json")
      .set("Cookie", [authCookie]);
    expect(res.status).toBe(400);
  });
});