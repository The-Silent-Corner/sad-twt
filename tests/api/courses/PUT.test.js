const createCourse = require("../../../helpers/Courses/createCourse");
const createUser = require("../../../helpers/Users/createUser");
const { createTables, wipeDBTables } = require("../../../db/databaseHelpers");
const request = require("supertest");
const app = require("../../../app");
const jwtGen = require("../../../helpers/jwtGenerate");

let authCookie;
beforeAll(async() =>{
  await createTables();
  await createUser("tutorId", "tutor@email.com", "password", "tutor");
  await createCourse("courseId", "tutorId", "History", 10, 20);
  authCookie = `user=${await jwtGen("tutorId", "tutor")}`;
});

afterAll(async() =>{
  await wipeDBTables();
});

describe("updating a course in database", () =>{
  it("should update the course name 'History' to 'Math'", async() =>{
    const res = await request(app)
      .put("/api/courses")
      .set("Accept", "application/json")
      .set("Cookie", [authCookie])
      .send({
        id: "courseId",
        courseName: "Math"
      });
    expect(res.status).toEqual(200);
    expect(res.body.course.courseName).toEqual("Math");
  });
});
describe("id is not in the body", () =>{
  it("should return 400", async() =>{
    const res = await request(app)
      .put("/api/courses")
      .set("Accept", "application/json")
      .set("Cookie", [authCookie])
      .send({
        courseName: "Math"
      });
    expect(res.status).toEqual(400);

  });
});
describe("updating only the initialSessionPrice", () =>{
  it("should update the initialSession price from 10 to 74", async() =>{
    const res = await request(app)
      .put("/api/courses")
      .set("Accept", "application/json")
      .set("Cookie", [authCookie])
      .send({
        id: "courseId",
        initialSessionPrice: 74
      });
    expect(res.body.course.initialSessionPrice).toEqual(74);
  });
});
describe("updating only the sessionHourlyRate", () =>{
  it("should update the sessionHourlyRate from 20 to 40", async() =>{
    const res = await request(app)
      .put("/api/courses")
      .set("Accept", "application/json")
      .set("Cookie", [authCookie])
      .send({
        id: "courseId",
        sessionHourlyRate: 40
      });
    expect(res.body.course.sessionHourlyRate).toEqual(40);
  });
});
describe("updating every field of a course", () =>{
  it("should update every field", async() =>{
    const res = await request(app)
      .put("/api/courses")
      .set("Accept", "application/json")
      .set("Cookie", [authCookie])
      .send({
        id: "courseId", 
        courseName: "Math",
        initialSessionPrice: 74,
        sessionHourlyRate: 40
      });
    expect(res.body.course.courseName).toEqual("Math");
    expect(res.body.course.sessionHourlyRate).toEqual(40);
    expect(res.body.course.initialSessionPrice).toEqual(74);
  });
});